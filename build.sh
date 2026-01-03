#!/bin/bash

# BetterSolano Build Script
# Creates minified production files in dist/ folder

echo "Building BetterSolano for production..."

# Auto-bump patch version (skip if --no-bump flag is passed)
if [ "$1" != "--no-bump" ] && [ -f "scripts/version.sh" ]; then
    echo "Bumping version..."
    ./scripts/version.sh patch
fi

# Clean dist folder
rm -rf dist
mkdir -p dist

# Copy all files first
echo "Copying files..."
rsync -av --exclude='node_modules' --exclude='dist' --exclude='.git' --exclude='backup-restore-point-*' --exclude='package*.json' --exclude='build.sh' --exclude='.vscode' . dist/

# Minify HTML files
echo "Minifying HTML..."
find dist -name "*.html" -type f | while read file; do
    npx html-minifier-terser \
        --collapse-whitespace \
        --remove-comments \
        --remove-optional-tags \
        --remove-redundant-attributes \
        --remove-script-type-attributes \
        --remove-style-link-type-attributes \
        --minify-css true \
        --minify-js true \
        -o "$file" "$file"
done

# Minify CSS files
echo "Minifying CSS..."
find dist/assets/css -name "*.css" -type f | while read file; do
    npx cleancss -o "$file" "$file"
done

# Transpile JavaScript (ES6+ to ES5 for older browser support)
echo "Transpiling JavaScript with Babel..."
find dist/assets/js -name "*.js" -type f | while read file; do
    npx babel "$file" --out-file "$file"
done

# Minify JS files
echo "Minifying JavaScript..."
find dist/assets/js -name "*.js" -type f | while read file; do
    npx terser "$file" -o "$file" --compress --mangle
done

# Calculate size savings
ORIG_SIZE=$(du -sh . --exclude=node_modules --exclude=dist --exclude=.git 2>/dev/null | cut -f1 || echo "N/A")
DIST_SIZE=$(du -sh dist 2>/dev/null | cut -f1 || echo "N/A")

echo ""
echo "Build complete!"
echo "Original size: $ORIG_SIZE"
echo "Minified size: $DIST_SIZE"
echo "Output: dist/"
echo ""
echo "To preview: cd dist && python3 -m http.server 8080"
