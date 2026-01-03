#!/bin/bash

# Version Management Script for BetterSolano
# Usage: ./scripts/version.sh [major|minor|patch]

VERSION_FILE="version.json"
PACKAGE_FILE="package.json"

if [ ! -f "$VERSION_FILE" ]; then
    echo "Error: version.json not found"
    exit 1
fi

CURRENT_VERSION=$(grep -o '"version": "[^"]*"' $VERSION_FILE | head -1 | cut -d'"' -f4)
MAJOR=$(echo $CURRENT_VERSION | cut -d. -f1)
MINOR=$(echo $CURRENT_VERSION | cut -d. -f2)
PATCH=$(echo $CURRENT_VERSION | cut -d. -f3)

BUMP_TYPE=${1:-""}

if [ -z "$BUMP_TYPE" ]; then
    echo "Current version: $CURRENT_VERSION"
    echo "Usage: ./scripts/version.sh [major|minor|patch]"
    exit 0
fi

case $BUMP_TYPE in
    major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
    minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
    patch) PATCH=$((PATCH + 1)) ;;
    *) echo "Invalid: $BUMP_TYPE"; exit 1 ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"
TODAY=$(date +%Y-%m-%d)

echo "Bumping: $CURRENT_VERSION -> $NEW_VERSION"

node -e "
const fs = require('fs');
let v = JSON.parse(fs.readFileSync('$VERSION_FILE'));
v.version = '$NEW_VERSION';
v.major = $MAJOR;
v.minor = $MINOR;
v.patch = $PATCH;
v.lastUpdated = '$TODAY';
fs.writeFileSync('$VERSION_FILE', JSON.stringify(v, null, 2));
"

node -e "
const fs = require('fs');
let p = JSON.parse(fs.readFileSync('$PACKAGE_FILE'));
p.version = '$NEW_VERSION';
fs.writeFileSync('$PACKAGE_FILE', JSON.stringify(p, null, 2));
"

find . -name "*.html" -not -path "./node_modules/*" -not -path "./dist/*" -not -path "./backup-*" -exec sed -i '' "s/Ver\. $CURRENT_VERSION/Ver. $NEW_VERSION/g" {} \;

echo "Done! Updated to $NEW_VERSION"
