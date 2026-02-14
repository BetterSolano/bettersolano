#!/usr/bin/env python3
"""Pass 3d: Fix last 18 partially-translated gibberish entries."""

import re

TRANSLATIONS_JS = 'assets/js/translations.js'

def extract_lang_dict(content, lang):
    d = {}
    keys_order = []
    pattern = rf'^\s*{lang}:\s*\{{'
    lines = content.split('\n')
    in_block = False
    brace_depth = 0
    for line in lines:
        if not in_block:
            if re.match(pattern, line):
                in_block = True
                brace_depth = 1
                continue
        else:
            brace_depth += line.count('{') - line.count('}')
            if brace_depth <= 0:
                break
            m = re.match(r'\s*"([^"]+)":\s*"(.*)"', line)
            if m:
                key = m.group(1)
                val = m.group(2)
                if val.endswith('",'):
                    val = val[:-2]
                elif val.endswith(','):
                    val = val[:-1]
                d[key] = val
                keys_order.append(key)
    return d, keys_order

# Map English values to proper Filipino translations
FIXES = {
    "File application at the Assessor's Office with required documents including proof of ownership":
        "Ihain ang aplikasyon sa Opisina ng Tagapagtasa na may mga kinakailangang dokumento kabilang ang patunay ng pagmamay-ari",
    "Pay the required transfer tax at the Treasurer's Office (0.5% of selling price or fair market value, whichever is higher)":
        "Magbayad ng kinakailangang buwis sa paglipat sa Opisina ng Ingat-Yaman (0.5% ng presyo ng pagbebenta o patas na halaga sa pamilihan, alinman ang mas mataas)",
    "Additional permits and clearances issued by the Office of the Mayor":
        "Mga karagdagang permiso at clearance na ibinibigay ng Opisina ng Punong Bayan",
    "Pay building permit fee and other fees at the Municipal Treasurer's Office":
        "Magbayad ng bayad sa building permit at iba pang mga bayad sa Opisina ng Ingat-Yaman ng Munisipyo",
    "Various permit types issued by the Municipal Engineering Office":
        "Iba't ibang uri ng permiso na ibinibigay ng Opisina ng Inhinyeriya ng Munisipyo",
    "Visit the Municipal Treasurer's Office at the Municipal Hall with your Tax Declaration or latest Official Receipt":
        "Bumisita sa Opisina ng Ingat-Yaman ng Munisipyo sa Munisipyo na may iyong Tax Declaration o pinakabagong Opisyal na Resibo",
    "The Municipal General Services Office manages and maintains municipal vehicles":
        "Ang Opisina ng Pangkalahatang Serbisyo ng Munisipyo ay namamahala at nagpapanatili ng mga sasakyan ng munisipyo",
    "Wait for approval from the Office of the Mayor":
        "Maghintay ng pag-apruba mula sa Opisina ng Punong Bayan",
    "Official certifications issued by the Municipal Agriculture Office":
        "Mga opisyal na sertipikasyon na ibinibigay ng Opisina ng Agrikultura ng Munisipyo",
    "As deputized by the Municipal Treasurer":
        "Bilang kinatawan ng Ingat-Yaman ng Munisipyo",
    "Pay clearance fee to the Municipal Treasurer's Office":
        "Magbayad ng bayad sa clearance sa Opisina ng Ingat-Yaman ng Munisipyo",
    "Pay the required fee at Treasurer's Office":
        "Magbayad ng kinakailangang bayad sa Opisina ng Ingat-Yaman",
    "For indigent residents requiring certification for various purposes":
        "Para sa mga indigenteng residente na nangangailangan ng sertipikasyon para sa iba't ibang layunin",
    "Pay slaughter fee at the Slaughterhouse Office":
        "Magbayad ng bayad sa pagkatay sa Opisina ng Katayan",
    "Additional services offered by the Municipal Treasurer's Office":
        "Mga karagdagang serbisyo na inaalok ng Opisina ng Ingat-Yaman ng Munisipyo",
}

def build_ilo(fil_val):
    subs = {
        'mga': 'dagiti', 'Mga': 'Dagiti',
        'ang': 'ti', 'Ang': 'Ti',
        'ng': 'ti', 'sa': 'iti',
        'at': 'ken', 'o': 'wenno',
        'mula': 'manipud',
        'Munisipyo': 'Munisipalidad',
        'Opisina': 'Opisina',
        'Serbisyo': 'Serbisio', 'serbisyo': 'serbisio',
        'Ingat-Yaman': 'Tesorero',
        'Kagamitan': 'Ramit', 'kagamitan': 'ramit',
        'Sasakyan': 'Lugan', 'sasakyan': 'lugan',
        'Lupa': 'Daga', 'lupa': 'daga',
        'Negosyo': 'Negosio', 'negosyo': 'negosio',
        'Impormasyon': 'Impormasion', 'impormasyon': 'impormasion',
        'Magbayad': 'Agbayad', 'magbayad': 'agbayad',
        'Maghintay': 'Aguray', 'maghintay': 'aguray',
        'Bumisita': 'Bisitaen', 'bumisita': 'bisitaen',
        'Ihain': 'Ipila', 'ihain': 'ipila',
        'Bilang': 'Kas', 'bilang': 'kas',
        'Para': 'Para', 'para': 'para',
    }
    result = fil_val
    for k in sorted(subs.keys(), key=len, reverse=True):
        result = re.sub(r'\b' + re.escape(k) + r'\b', subs[k], result)
    return result

def main():
    print("PASS 3d: Fixing last gibberish translations")

    with open(TRANSLATIONS_JS, 'r') as f:
        content = f.read()

    en, en_order = extract_lang_dict(content, 'en')
    fil, fil_order = extract_lang_dict(content, 'fil')
    ilo, ilo_order = extract_lang_dict(content, 'ilo')

    fixed = 0
    for key in en:
        en_val = en[key]
        if en_val in FIXES:
            fil[key] = FIXES[en_val]
            ilo[key] = build_ilo(FIXES[en_val])
            fixed += 1
        # Also fix the escaped quotes issue
        if '\\\\\\\\\\\\' in fil.get(key, ''):
            # Fix over-escaped quotes
            fil[key] = fil[key].replace('\\\\\\\\\\\\\\\\', '\\\\')
            ilo[key] = ilo[key].replace('\\\\\\\\\\\\\\\\', '\\\\')
            fixed += 1

    print(f"Fixed {fixed} translations")

    # Also fix the "AS IS" terms page entry
    for key in en:
        en_val = en[key]
        fil_val = fil.get(key, '')
        if 'AS IS' in en_val and 'warranty' in en_val and '\\\\' in fil_val:
            fil[key] = 'Ang lahat ng impormasyon sa website na ito ay ibinibigay \\"AS IS\\" nang walang warranty ng anumang uri, maging hayag o ipinahiwatig. Kabilang dito ngunit hindi limitado sa:'
            ilo[key] = 'Ti amin nga impormasion iti daytoy a website ket maipaay a \\"AS IS\\" nga awan ti warranty ti aniaman a kita, hayag man wenno ipinahiwatig. Karaman ditoy ngem saan a limitado iti:'
            fixed += 1

    # Rebuild
    def build_lang_block(lang_dict, order, indent='        '):
        lines = []
        for i, key in enumerate(order):
            val = lang_dict.get(key, '')
            escaped_val = val.replace('\\', '\\\\').replace('"', '\\"')
            comma = ',' if i < len(order) - 1 else ''
            lines.append(f'{indent}"{key}": "{escaped_val}"{comma}')
        return '\n'.join(lines)

    def replace_lang_block(content, lang, lang_dict, order):
        lines = content.split('\n')
        start_idx = None
        end_idx = None
        brace_depth = 0
        for i, line in enumerate(lines):
            if start_idx is None:
                if re.match(rf'\s*{lang}:\s*\{{', line):
                    start_idx = i
                    brace_depth = 1
                    continue
            else:
                brace_depth += line.count('{') - line.count('}')
                if brace_depth <= 0:
                    end_idx = i
                    break
        if start_idx is not None and end_idx is not None:
            new_lines = lines[:start_idx + 1]
            new_lines.append(build_lang_block(lang_dict, order))
            new_lines.extend(lines[end_idx:])
            return '\n'.join(new_lines)
        return content

    content = replace_lang_block(content, 'fil', fil, fil_order)
    content = replace_lang_block(content, 'ilo', ilo, ilo_order)

    with open(TRANSLATIONS_JS, 'w') as f:
        f.write(content)

    print("Done. Rebuild dist to apply.")

if __name__ == '__main__':
    main()
