#!/usr/bin/env python3
"""
Scan HTML files for data-i18n keys that are missing from translations.js,
and add them with appropriate translations.
"""

import re
import glob

# Read translations.js
with open('assets/js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract existing keys from en section
en_match = re.search(r'en:\s*\{(.*?)\n    \},', content, re.DOTALL)
en_block = en_match.group(1)
existing_keys = set(re.findall(r'"([^"]+)":', en_block))
print(f"Existing keys in translations.js: {len(existing_keys)}")

# Scan all HTML files for data-i18n attributes
html_files = []
for pattern in ['*.html', '*/*.html', '*/*/*.html']:
    for f in glob.glob(pattern):
        if not f.startswith('dist/') and not f.startswith('node_modules/') and not f.startswith('react-app/') and not f.endswith('.backup'):
            html_files.append(f)

all_keys = set()
key_to_text = {}  # key -> English text from HTML

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Find data-i18n="key">text</
    for match in re.finditer(r'data-i18n="([^"]+)"[^>]*>([^<]+)<', html):
        key = match.group(1)
        text = match.group(2).strip()
        all_keys.add(key)
        if key not in key_to_text and text:
            key_to_text[key] = text

missing_keys = all_keys - existing_keys
print(f"Total data-i18n keys in HTML: {len(all_keys)}")
print(f"Missing from translations.js: {len(missing_keys)}")

if missing_keys:
    # Sort for readability
    missing_sorted = sorted(missing_keys)
    print("\nMissing keys:")
    for k in missing_sorted:
        text = key_to_text.get(k, k)
        print(f'  "{k}": "{text}"')
