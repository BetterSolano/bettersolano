#!/usr/bin/env python3
"""
Add missing Solano Quiz and Quiz CTA translation keys to translations.js.
"""

import re

with open('assets/js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

# All the page-prefix variants for "Solano Quiz" footer link
prefixes = [
    'accessibility', 'acct', 'agri', 'assessor', 'birth', 'biz', 'bpls',
    'budget', 'cert', 'civil', 'contact', 'death', 'edu', 'eng', 'env',
    'err403', 'err404', 'err500', 'faq', 'gensvc', 'gov', 'health', 'home',
    'hr', 'infra', 'legis', 'magri', 'market', 'marriage', 'mbudget',
    'mcivil', 'mgensvc', 'mswdo', 'mswdo-svc', 'news', 'officials', 'ord',
    'plan', 'privacy', 'propdec', 'reso', 'safety', 'sitemap', 'slaughter',
    'social', 'stats', 'svc', 'tax', 'terms', 'treas', 'tricycle'
]

# Quiz CTA keys (homepage only)
quiz_cta_en = {
    'home-solano-quiz': 'Solano Quiz',
    'home-how-well-do-you-know-solano-nueva-vizcaya': 'How well do you know Solano, Nueva Vizcaya?',
    'home-evaluate-your-familiarity-with-the-municipalitys': "Evaluate your familiarity with the municipality's heritage, cultural identity, and geographic significance through an interactive knowledge assessment designed to showcase one of Nueva Vizcaya's most prominent localities.",
    'home-take-the-quiz': 'Take the Quiz',
}

quiz_cta_fil = {
    'home-solano-quiz': 'Solano Quiz',
    'home-how-well-do-you-know-solano-nueva-vizcaya': 'Gaano mo kakilala ang Solano, Nueva Vizcaya?',
    'home-evaluate-your-familiarity-with-the-municipalitys': "Suriin ang iyong kaalaman sa pamana, pagkakakilanlan sa kultura, at kahalagahang heograpiko ng munisipalidad sa pamamagitan ng isang interactive na pagtatasa ng kaalaman na idinisenyo upang ipakita ang isa sa mga pinakatanyag na lokalidad ng Nueva Vizcaya.",
    'home-take-the-quiz': 'Subukin ang Quiz',
}

quiz_cta_ilo = {
    'home-solano-quiz': 'Solano Quiz',
    'home-how-well-do-you-know-solano-nueva-vizcaya': 'Kasano ti pannakaammom iti Solano, Nueva Vizcaya?',
    'home-evaluate-your-familiarity-with-the-municipalitys': "Evaluaren ti pannakaammom iti tawid, kultural a pagbigbigan, ken heograpiko a kapatgan ti munisipalidad babaen ti maysa nga interactive a panagsubok ti pannakaammo a naidisinio tapno ipakita ti maysa kadagiti kalatakan a lokalidad ti Nueva Vizcaya.",
    'home-take-the-quiz': 'Subokan ti Quiz',
}

def build_entries(lang):
    """Build all new key-value entries for a language."""
    entries = []
    
    # Page-prefix Solano Quiz keys
    for prefix in prefixes:
        key = f'{prefix}-solano-quiz'
        # "Solano Quiz" stays the same in all languages (it's a proper name)
        entries.append(f'        "{key}": "Solano Quiz"')
    
    # Quiz CTA keys
    if lang == 'en':
        for k, v in quiz_cta_en.items():
            # Skip home-solano-quiz since it's already in the prefix list
            if k == 'home-solano-quiz':
                continue
            v_escaped = v.replace("'", "\\'").replace('"', '\\"')
            entries.append(f'        "{k}": "{v_escaped}"')
    elif lang == 'fil':
        for k, v in quiz_cta_fil.items():
            if k == 'home-solano-quiz':
                continue
            v_escaped = v.replace("'", "\\'").replace('"', '\\"')
            entries.append(f'        "{k}": "{v_escaped}"')
    elif lang == 'ilo':
        for k, v in quiz_cta_ilo.items():
            if k == 'home-solano-quiz':
                continue
            v_escaped = v.replace("'", "\\'").replace('"', '\\"')
            entries.append(f'        "{k}": "{v_escaped}"')
    
    return ',\n'.join(entries)

# Insert entries at the end of each language block
# Find the last entry before the closing }, for each language
for lang in ['en', 'fil', 'ilo']:
    # Find the language block
    # Pattern: the last key-value pair before the closing },
    # We need to find the end of the last entry in each lang block
    
    # Strategy: find "lang: {" then find the matching "},"
    lang_start = content.find(f'    {lang}: {{')
    if lang_start == -1:
        print(f"Could not find {lang} block!")
        continue
    
    # Find the closing }, for this block
    # We need to find the }, that closes this specific block
    brace_count = 0
    pos = lang_start
    block_end = -1
    while pos < len(content):
        if content[pos] == '{':
            brace_count += 1
        elif content[pos] == '}':
            brace_count -= 1
            if brace_count == 0:
                block_end = pos
                break
        pos += 1
    
    if block_end == -1:
        print(f"Could not find end of {lang} block!")
        continue
    
    # Find the last comma or last value before the closing }
    # Insert new entries before the closing }
    # Find the position just before the closing }
    # Look backwards from block_end for the last non-whitespace
    insert_pos = block_end
    while insert_pos > 0 and content[insert_pos-1] in ' \t\n\r':
        insert_pos -= 1
    
    new_entries = build_entries(lang)
    
    # Add comma after last existing entry, then new entries
    content = content[:insert_pos] + ',\n\n        // Solano Quiz\n' + new_entries + '\n    ' + content[block_end:]
    
    print(f"Added entries to {lang} block")

with open('assets/js/translations.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone! Verifying...")

# Verify
with open('assets/js/translations.js', 'r', encoding='utf-8') as f:
    verify = f.read()

for prefix in prefixes[:3]:
    key = f'{prefix}-solano-quiz'
    count = verify.count(f'"{key}"')
    print(f'  "{key}" appears {count} times (expect 3)')

for k in ['home-take-the-quiz', 'home-how-well-do-you-know-solano-nueva-vizcaya']:
    count = verify.count(f'"{k}"')
    print(f'  "{k}" appears {count} times (expect 3)')
