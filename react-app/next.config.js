/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  skipTrailingSlashRedirect: true,

  // Clean URLs configuration
  // Next.js automatically handles clean URLs without .html extensions

  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Strict mode for better development experience
  reactStrictMode: true,

  // Compression
  compress: true,

  // Environment variables
  env: {
    SITE_URL: process.env.SITE_URL || 'https://bettersolano.org',
  },
};

module.exports = nextConfig;
