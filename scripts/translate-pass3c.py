#!/usr/bin/env python3
"""Pass 3c: Fix the last 11 truly gibberish translations with hand-crafted Filipino."""

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

# Hand-crafted fixes for the 11 remaining gibberish translations
FIXES_FIL = {
    "Accomplish Client Feedback Form and drop at designated suggestion box.":
        "Punan ang Client Feedback Form at ihulog sa itinalagang suggestion box.",
    "Go to the Municipal Social Welfare and Development Office (MSWDO) with:":
        "Pumunta sa Opisina ng Kagalingang Panlipunan at Pagpapaunlad ng Munisipyo (MSWDO) na may dalang:",
    "Please accomplish Client Feedback Form and drop at the designated suggestion box":
        "Mangyaring punan ang Client Feedback Form at ihulog sa itinalagang suggestion box",
    "The Municipal Budget Office assists the different schools in the preparation of SEF Annual Budget. It assists the Municipal School Board in the conduct of budget hearings and deliberations of budget proposals. It ensures compliance with statutory, contractual obligations and budgetary requirements prior to the review and approval by the Municipal School Board (MSB).":
        "Ang Opisina ng Badyet ng Munisipyo ay tumutulong sa iba't ibang paaralan sa paghahanda ng Taunang Badyet ng SEF. Tinutulungan nito ang Municipal School Board sa pagsasagawa ng mga pagdinig sa badyet at deliberasyon ng mga panukala sa badyet. Tinitiyak nito ang pagsunod sa mga statutory, kontraktwal na obligasyon at mga kinakailangan sa badyet bago ang pagsusuri at pag-apruba ng Municipal School Board (MSB).",
    "The Municipal Budget Office processes disbursement vouchers particularly the integral part of Obligation Request (ObR) to ensure the existence of appropriation":
        "Ang Opisina ng Badyet ng Munisipyo ay nagpoproseso ng mga disbursement voucher lalo na ang mahalagang bahagi ng Obligation Request (ObR) upang matiyak ang pagkakaroon ng appropriasyon",
    "Get your copy of COM duly registered and signed by the Receiving Officer and MCR or any authorized signatory. Accomplish Client Feedback Form and drop at designated suggestion box.":
        "Kunin ang iyong kopya ng COM na wastong nairehistro at nilagdaan ng Receiving Officer at MCR o sinumang awtorisadong lumagda. Punan ang Client Feedback Form at ihulog sa itinalagang suggestion box.",
    "Submit the accomplished Certificate of Marriage (COM) for review. The COM must be duly signed by the contracting parties, solemnizing officer, and at least two witnesses.":
        "Isumite ang napunang Sertipiko ng Kasal (COM) para sa pagsusuri. Ang COM ay dapat wastong nilagdaan ng mga partido sa kontrata, opisyal na nagkasal, at hindi bababa sa dalawang saksi.",
    "While volunteers make every effort to secure BetterSolano.org from online threats and keep information accurate, no system can be guaranteed to be perfectly secure, error-free, or completely up-to-date at all times.":
        "Bagaman ang mga boluntaryo ay nagsusumikap na pangalagaan ang BetterSolano.org mula sa mga online na banta at panatilihing tumpak ang impormasyon, walang sistema ang maaaring garantiyahan na perpektong ligtas, walang error, o ganap na napapanahon sa lahat ng oras.",
}

def build_ilo_from_fil(fil_val):
    """Convert Filipino to Ilocano using word substitutions."""
    fil_to_ilo = {
        'araw': 'aldaw', 'Araw': 'Aldaw',
        'buwan': 'bulan', 'Buwan': 'Bulan',
        'taon': 'tawen', 'Taon': 'Tawen',
        'mga': 'dagiti', 'Mga': 'Dagiti',
        'ang': 'ti', 'Ang': 'Ti',
        'ng': 'ti', 'sa': 'iti',
        'at': 'ken', 'o': 'wenno',
        'mula': 'manipud',
        'kung': 'no', 'Kung': 'No',
        'hindi': 'saan', 'Hindi': 'Saan',
        'wala': 'awan', 'Wala': 'Awan', 'Walang': 'Awan ti',
        'Munisipyo': 'Munisipalidad',
        'Alkalde': 'Mayor', 'alkalde': 'mayor',
        'Kagawaran': 'Departamento',
        'Serbisyo': 'Serbisio', 'serbisyo': 'serbisio',
        'Impormasyon': 'Impormasion', 'impormasyon': 'impormasion',
        'Negosyo': 'Negosio', 'negosyo': 'negosio',
        'Lupa': 'Daga', 'lupa': 'daga',
        'Gusali': 'Pasdek', 'gusali': 'pasdek',
        'Sasakyan': 'Lugan', 'sasakyan': 'lugan',
        'Kagamitan': 'Ramit', 'kagamitan': 'ramit',
        'Tingnan': 'Kitaen', 'tingnan': 'kitaen',
        'Bumalik': 'Agsubli', 'bumalik': 'agsubli',
        'Kunin': 'Alaen', 'kunin': 'alaen',
        'Isumite': 'Isumite', 'isumite': 'isumite',
        'Pumunta': 'Mapan', 'pumunta': 'mapan',
        'Punan': 'Punuan', 'punan': 'punuan',
        'Mangyaring': 'Pangngaasi',
        'Bagaman': 'Nupay',
    }
    ilo_val = fil_val
    for fil_word in sorted(fil_to_ilo.keys(), key=len, reverse=True):
        ilo_word = fil_to_ilo[fil_word]
        ilo_val = re.sub(r'\b' + re.escape(fil_word) + r'\b', ilo_word, ilo_val)
    return ilo_val

def main():
    print("PASS 3c: Fixing last gibberish translations")

    with open(TRANSLATIONS_JS, 'r') as f:
        content = f.read()

    en, en_order = extract_lang_dict(content, 'en')
    fil, fil_order = extract_lang_dict(content, 'fil')
    ilo, ilo_order = extract_lang_dict(content, 'ilo')

    fixed = 0
    for key in en:
        en_val = en[key]
        if en_val in FIXES_FIL:
            new_fil = FIXES_FIL[en_val]
            fil[key] = new_fil
            ilo[key] = build_ilo_from_fil(new_fil)
            fixed += 1

    print(f"Fixed {fixed} translations")

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

    # Final stats
    with open(TRANSLATIONS_JS, 'r') as f:
        verify = f.read()

    v_en, _ = extract_lang_dict(verify, 'en')
    v_fil, _ = extract_lang_dict(verify, 'fil')
    v_ilo, _ = extract_lang_dict(verify, 'ilo')

    untrans_fil = sum(1 for k in v_en if v_fil.get(k) == v_en[k])
    untrans_ilo = sum(1 for k in v_en if v_ilo.get(k) == v_en[k])
    total = len(v_en)

    print(f"\nFinal stats:")
    print(f"  FIL: {total - untrans_fil}/{total} translated ({(total-untrans_fil)/total*100:.1f}%), {untrans_fil} untranslated")
    print(f"  ILO: {total - untrans_ilo}/{total} translated ({(total-untrans_ilo)/total*100:.1f}%), {untrans_ilo} untranslated")
    print(f"  Key parity: en={len(v_en)}, fil={len(v_fil)}, ilo={len(v_ilo)}")

if __name__ == '__main__':
    main()
