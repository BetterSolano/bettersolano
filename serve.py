#!/usr/bin/env python3
"""
Local Development Server with Clean URL Support
Mimics Apache's mod_rewrite behavior for testing cPanel deployment locally
"""

import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, unquote

class CleanURLHandler(SimpleHTTPRequestHandler):
    """
    Custom HTTP handler that supports clean URLs (without .html extension)
    Mimics the .htaccess rewrite rules used in cPanel deployment
    """
    
    def do_GET(self):
        # Parse the URL path
        parsed_path = urlparse(self.path)
        path = unquote(parsed_path.path)
        
        # Remove trailing slash for non-root paths
        if path != '/' and path.endswith('/'):
            # Check if this is a directory with index.html
            dir_path = '.' + path
            index_path = dir_path + 'index.html'
            if os.path.isdir(dir_path) and os.path.isfile(index_path):
                # Serve index.html from directory
                return super().do_GET()
        
        # Try to serve the file directly first
        file_path = '.' + path
        
        # If path doesn't have extension and file doesn't exist
        if not os.path.exists(file_path) and not path.endswith('/'):
            # Try adding .html extension
            html_path = file_path + '.html'
            if os.path.isfile(html_path):
                # Internally rewrite to serve the .html file
                self.path = path + '.html'
                if parsed_path.query:
                    self.path += '?' + parsed_path.query
                return super().do_GET()
        
        # If it's a directory, try index.html
        if os.path.isdir(file_path):
            index_path = os.path.join(file_path, 'index.html')
            if os.path.isfile(index_path):
                self.path = path.rstrip('/') + '/index.html'
                if parsed_path.query:
                    self.path += '?' + parsed_path.query
                return super().do_GET()
        
        # Fall back to default behavior
        return super().do_GET()
    
    def log_message(self, format, *args):
        # Custom logging with color for clean URL rewrites
        message = format % args
        if '.html' not in self.path and 'GET' in message:
            # This was a clean URL that got rewritten
            print(f"\033[0;32m{self.address_string()}\033[0m - {message}")
        else:
            print(f"{self.address_string()} - {message}")

def run_server(port=8888, directory='dist'):
    """Run the development server with clean URL support"""
    
    # Change to the specified directory
    if directory != '.':
        if not os.path.isdir(directory):
            print(f"Error: Directory '{directory}' not found")
            sys.exit(1)
        os.chdir(directory)
    
    server_address = ('', port)
    httpd = HTTPServer(server_address, CleanURLHandler)
    
    print("=" * 60)
    print("Clean URL Development Server")
    print("=" * 60)
    print(f"Serving from: {os.getcwd()}")
    print(f"Server running at: http://localhost:{port}")
    print()
    print("Clean URLs supported:")
    print("  /services/certificates  →  serves certificates.html")
    print("  /legislative/resolution-framework  →  serves resolution-framework.html")
    print()
    print("Press Ctrl+C to stop")
    print("=" * 60)
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        httpd.server_close()

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Local server with clean URL support')
    parser.add_argument('-p', '--port', type=int, default=8888, help='Port number (default: 8888)')
    parser.add_argument('-d', '--directory', type=str, default='dist', help='Directory to serve (default: dist)')
    args = parser.parse_args()
    
    run_server(port=args.port, directory=args.directory)
