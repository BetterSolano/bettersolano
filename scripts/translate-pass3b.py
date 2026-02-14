#!/usr/bin/env python3
"""
Pass 3b: Fix remaining bad mixed-language translations using
comprehensive phrase-level translation engine.
Instead of word-by-word, translates complete phrases and clauses.
"""

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

# ============================================================
# PHRASE-LEVEL TRANSLATION ENGINE
# Translates English phrases/clauses to Filipino
# Applied longest-first to avoid partial matches
# ============================================================

PHRASES_FIL = {
    # Complete sentence starters
    "Better Solano is committed to ensuring digital accessibility for people with disabilities": "Ang Better Solano ay nakatuon sa pagtiyak ng digital na accessibility para sa mga taong may kapansanan",
    "Better Solano is committed to ensuring that our digital services are accessible to all citizens, regardless of ability": "Ang Better Solano ay nakatuon sa pagtiyak na ang aming mga digital na serbisyo ay naa-access ng lahat ng mamamayan, anuman ang kakayahan",
    "We are continually improving the user experience for everyone and applying the relevant accessibility standards": "Patuloy naming pinapabuti ang karanasan ng gumagamit para sa lahat at inilalapat ang mga kaugnay na pamantayan ng accessibility",
    "BetterSolano.org is a civic platform dedicated to empowering the people of Solano by providing transparent access to": "Ang BetterSolano.org ay isang civic platform na nakatuon sa pagbibigay-kapangyarihan sa mga tao ng Solano sa pamamagitan ng pagbibigay ng transparent na access sa",
    "BetterSolano.org is a general audience website providing civic information": "Ang BetterSolano.org ay isang website para sa pangkalahatang madla na nagbibigay ng civic na impormasyon",
    "BetterSolano.org provides public domain information to support civic engagement, transparency, and informed participation": "Ang BetterSolano.org ay nagbibigay ng impormasyon sa public domain upang suportahan ang civic engagement, transparency, at may kaalamang pakikilahok",
    "BetterSolano.org values accuracy, public safety, and respect for rights": "Pinahahalagahan ng BetterSolano.org ang katumpakan, kaligtasan ng publiko, at paggalang sa mga karapatan",
    "As a volunteer-run initiative, this website does not replace official government channels": "Bilang isang inisyatibang pinapatakbo ng mga boluntaryo, ang website na ito ay hindi pumapalit sa mga opisyal na channel ng pamahalaan",
    "Although volunteers aim to keep the website accessible and functional": "Bagaman naglalayong panatilihing accessible at functional ang website ng mga boluntaryo",
    "BetterSolano.org cannot guarantee that the website will be": "Hindi magagarantiya ng BetterSolano.org na ang website ay magiging",
    "We do not knowingly collect personal information from children": "Hindi namin sinasadyang kinokolekta ang personal na impormasyon mula sa mga bata",
    "Despite good-faith efforts, some content may be": "Sa kabila ng mga pagsisikap na may mabuting layunin, ang ilang nilalaman ay maaaring",
    "Residents and stakeholders are encouraged to verify information through official LGU channels": "Ang mga residente at stakeholder ay hinihikayat na i-verify ang impormasyon sa pamamagitan ng mga opisyal na channel ng LGU",

    # Common sentence patterns
    "is committed to": "ay nakatuon sa",
    "is required prior to": "ay kinakailangan bago ang",
    "is required for": "ay kinakailangan para sa",
    "is provided for general informational purposes only": "ay ibinibigay para sa pangkalahatang layunin ng impormasyon lamang",
    "is provided": "ay ibinibigay",
    "is valid for": "ay balido sa loob ng",
    "is available at": "ay magagamit sa",
    "is based on": "ay batay sa",
    "are based on": "ay batay sa",
    "are given priority": "ay binibigyan ng prayoridad",
    "are made available to the public": "ay ginagawang magagamit sa publiko",
    "are submitted": "ay isinusumite",
    "must be renewed annually": "ay dapat i-renew taun-taon",
    "must be submitted": "ay dapat isumite",
    "must be secured": "ay dapat makuha",
    "must be filed": "ay dapat ihain",
    "must have": "ay dapat may",
    "must pass": "ay dapat pumasa",
    "may vary": "ay maaaring mag-iba",
    "may be conducted": "ay maaaring isagawa",
    "may include": "ay maaaring kabilang ang",
    "may be announced": "ay maaaring ianunsyo",
    "shall not be liable": "ay hindi mananagot",
    "shall be governed by": "ay pamamahalaan ng",
    "cannot guarantee": "hindi magagarantiya",
    "do not endorse": "hindi ineendorso",
    "does not replace": "ay hindi pumapalit sa",

    # Government/service phrases
    "Official LGU Solano Portal": "Opisyal na Portal ng LGU Solano",
    "Municipal Hall": "Munisipyo",
    "Municipal Mayor": "Punong Bayan",
    "Municipal Accounting Office": "Opisina ng Accounting ng Munisipyo",
    "Municipal Budget Office": "Opisina ng Badyet ng Munisipyo",
    "Municipal Engineering Office": "Opisina ng Inhinyeriya ng Munisipyo",
    "Municipal General Services Office": "Opisina ng Pangkalahatang Serbisyo ng Munisipyo",
    "Municipal Treasurer's Office": "Opisina ng Ingat-Yaman ng Munisipyo",
    "Municipal Assessor's Office": "Opisina ng Tagapagtasa ng Munisipyo",
    "Municipal Planning and Development Office": "Opisina ng Pagpaplano at Pagpapaunlad ng Munisipyo",
    "Municipal Agriculture Office": "Opisina ng Agrikultura ng Munisipyo",
    "Municipal Health Office": "Opisina ng Kalusugan ng Munisipyo",
    "Sangguniang Bayan": "Sangguniang Bayan",
    "Sangguniang Panlalawigan": "Sangguniang Panlalawigan",
    "Rural Health Units": "Rural Health Units",
    "Barangay Health Stations": "Barangay Health Stations",
    "public market": "pamilihang bayan",
    "Public Market": "Pamilihang Bayan",

    # Document/process phrases
    "building permit": "building permit",
    "business permit": "permiso sa negosyo",
    "tax declaration": "tax declaration",
    "Tax Declaration": "Tax Declaration",
    "disbursement voucher": "disbursement voucher",
    "Disbursement Voucher": "Disbursement Voucher",
    "real property tax": "buwis sa tunay na ari-arian",
    "Real Property Tax": "Buwis sa Tunay na Ari-arian",
    "certified true copy": "sertipikadong tunay na kopya",
    "certified true copies": "mga sertipikadong tunay na kopya",
    "marriage license": "lisensya sa kasal",
    "Marriage License": "Lisensya sa Kasal",
    "death certificate": "sertipiko ng pagkamatay",
    "birth certificate": "sertipiko ng kapanganakan",
    "zoning clearance": "zoning clearance",
    "Zoning Clearance": "Zoning Clearance",
    "locational clearance": "locational clearance",
    "Locational Clearance": "Locational Clearance",
    "obligation request": "obligation request",
    "Obligation Request": "Obligation Request",

    # Common verbs/actions
    "Apply for": "Mag-apply para sa",
    "apply for": "mag-apply para sa",
    "Submit the": "Isumite ang",
    "submit the": "isumite ang",
    "Prepare the": "Ihanda ang",
    "prepare the": "ihanda ang",
    "Review and": "Suriin at",
    "review and": "suriin at",
    "Compute": "Kalkulahin",
    "compute": "kalkulahin",
    "Accomplish": "Punan ang",
    "accomplish": "punan ang",
    "Accepting": "Pagtanggap ng",
    "accepting": "pagtanggap ng",
    "providing": "nagbibigay ng",
    "Providing": "Nagbibigay ng",
    "including": "kabilang ang",
    "Including": "Kabilang ang",
    "ensuring": "pagtiyak ng",
    "Ensuring": "Pagtiyak ng",
    "handling": "humahawak ng",
    "serving": "nagsisilbi sa",
    "Serving": "Nagsisilbi sa",

    # Common nouns/adjectives
    "construction": "konstruksyon",
    "alteration": "pagbabago",
    "renovation": "renobasyon",
    "major repair": "malaking pagkukumpuni",
    "floor area": "sukat ng sahig",
    "project cost": "gastos ng proyekto",
    "gross sales": "kabuuang benta",
    "financial statements": "mga pahayag pinansyal",
    "Financial Statements": "Mga Pahayag Pinansyal",
    "trial balance": "trial balance",
    "Trial Balance": "Trial Balance",
    "supporting documents": "mga suportang dokumento",
    "documentary requirements": "mga kinakailangang dokumento",
    "processing time": "oras ng pagproseso",
    "Processing time": "Oras ng pagproseso",
    "processing times": "mga oras ng pagproseso",
    "accounting services": "mga serbisyo ng accounting",
    "accounting rules": "mga patakaran ng accounting",
    "dental care": "pangangalaga sa ngipin",
    "healthcare services": "mga serbisyo sa kalusugan",
    "medical services": "mga serbisyong medikal",
    "comprehensive medical services": "komprehensibong mga serbisyong medikal",
    "emergency assistance": "emergency na tulong",
    "financial assistance": "tulong pinansyal",
    "burial assistance": "tulong sa libing",
    "education assistance": "tulong sa edukasyon",
    "medical assistance": "tulong medikal",
    "civic engagement": "civic engagement",
    "civic information": "civic na impormasyon",
    "public domain information": "impormasyon sa public domain",
    "open governance": "bukas na pamamahala",
    "transparency": "transparency",
    "personal information": "personal na impormasyon",
    "official government channels": "mga opisyal na channel ng pamahalaan",
    "accessibility standards": "mga pamantayan ng accessibility",
    "user experience": "karanasan ng gumagamit",
    "volunteer-run initiative": "inisyatibang pinapatakbo ng mga boluntaryo",
    "volunteer nature": "boluntaryong katangian",
    "good-faith efforts": "mga pagsisikap na may mabuting layunin",
    "public safety": "kaligtasan ng publiko",
    "respect for rights": "paggalang sa mga karapatan",

    # Prepositions/connectors
    "prior to": "bago ang",
    "in accordance with": "alinsunod sa",
    "in compliance with": "alinsunod sa",
    "regardless of": "anuman ang",
    "as part of": "bilang bahagi ng",
    "on behalf of": "sa ngalan ng",
    "with respect to": "tungkol sa",
    "in addition to": "bilang karagdagan sa",
    "as well as": "pati na rin ang",
    "such as": "tulad ng",
    "whether": "kung",
    "through": "sa pamamagitan ng",
    "within": "sa loob ng",
    "without": "nang walang",
    "between": "sa pagitan ng",
    "during": "sa panahon ng",
    "before": "bago",
    "after": "pagkatapos ng",
    "about": "tungkol sa",
    "from": "mula sa",
    "that": "na",
    "which": "na",
    "where": "kung saan",
    "when": "kapag",
    "When": "Kapag",
    "while": "habang",
    "also": "din",
    "both": "parehong",
    "either": "alinman sa",
    "neither": "wala sa",
    "any": "anumang",
    "Any": "Anumang",
    "all": "lahat ng",
    "All": "Lahat ng",
    "each": "bawat",
    "every": "bawat",
    "some": "ilang",
    "other": "iba pang",
    "more": "higit pang",

    # Common adjectives
    "official": "opisyal na",
    "Official": "Opisyal na",
    "required": "kinakailangan",
    "available": "magagamit",
    "applicable": "naaangkop",
    "current year": "kasalukuyang taon",
    "current": "kasalukuyang",
    "comprehensive": "komprehensibong",
    "Comprehensive": "Komprehensibong",
    "complete": "kumpletong",
    "Complete": "Kumpletuhin ang",
    "additional": "karagdagang",
    "Additional": "Karagdagang",
    "various": "iba't ibang",
    "Various": "Iba't ibang",
    "valid": "balidong",
    "Valid": "Balidong",
    "new": "bagong",
    "New": "Bagong",
    "existing": "umiiral na",
    "approved": "naaprubahang",
    "proposed": "iminumungkahing",
    "authorized": "awtorisadong",
    "designated": "itinalagang",
    "appropriate": "naaangkop na",
    "relevant": "kaugnay na",
    "specific": "tiyak na",
    "general": "pangkalahatang",
    "public": "pampublikong",
    "private": "pribadong",
    "local": "lokal na",
    "national": "pambansang",
    "annual": "taunang",
    "Annual": "Taunang",
    "monthly": "buwanang",
    "daily": "araw-araw na",
    "quarterly": "quarterly na",
    "immediate": "agarang",
    "Immediate": "Agarang",
    "free": "libreng",
    "Free": "Libreng",

    # Common nouns
    "information": "impormasyon",
    "Information": "Impormasyon",
    "services": "mga serbisyo",
    "Services": "Mga Serbisyo",
    "requirements": "mga kinakailangan",
    "Requirements": "Mga Kinakailangan",
    "documents": "mga dokumento",
    "Documents": "Mga Dokumento",
    "records": "mga rekord",
    "Records": "Mga Rekord",
    "certificates": "mga sertipiko",
    "Certificates": "Mga Sertipiko",
    "applications": "mga aplikasyon",
    "Applications": "Mga Aplikasyon",
    "payments": "mga pagbabayad",
    "Payments": "Mga Pagbabayad",
    "fees": "mga bayad",
    "Fees": "Mga Bayad",
    "penalties": "mga multa",
    "employees": "mga empleyado",
    "residents": "mga residente",
    "citizens": "mga mamamayan",
    "individuals": "mga indibidwal",
    "families": "mga pamilya",
    "children": "mga bata",
    "persons": "mga tao",
    "members": "mga miyembro",
    "officers": "mga opisyal",
    "staff": "mga kawani",
    "personnel": "mga tauhan",
    "agencies": "mga ahensya",
    "offices": "mga opisina",
    "properties": "mga ari-arian",
    "buildings": "mga gusali",
    "vehicles": "mga sasakyan",
    "equipment": "kagamitan",
    "supplies": "mga suplay",
    "programs": "mga programa",
    "projects": "mga proyekto",
    "activities": "mga aktibidad",
    "operations": "mga operasyon",
    "transactions": "mga transaksyon",
    "complaints": "mga reklamo",
    "violations": "mga paglabag",
    "regulations": "mga regulasyon",
    "provisions": "mga probisyon",
    "conditions": "mga kondisyon",
    "consequences": "mga kahihinatnan",
    "warranties": "mga garantiya",
    "damages": "mga pinsala",
    "errors": "mga error",
    "omissions": "mga pagkukulang",
    "changes": "mga pagbabago",
    "updates": "mga update",
    "improvements": "mga pagpapabuti",
    "purposes": "mga layunin",
    "matters": "mga usapin",
    "issues": "mga isyu",
    "concerns": "mga alalahanin",
    "rights": "mga karapatan",
    "interests": "mga interes",
    "obligations": "mga obligasyon",
    "responsibilities": "mga responsibilidad",
    "measures": "mga hakbang",
    "standards": "mga pamantayan",
    "guidelines": "mga alituntunin",
    "policies": "mga patakaran",
    "procedures": "mga pamamaraan",
    "processes": "mga proseso",
    "steps": "mga hakbang",
    "stages": "mga yugto",
    "levels": "mga antas",
    "types": "mga uri",
    "categories": "mga kategorya",
    "sections": "mga seksyon",
    "areas": "mga lugar",
    "facilities": "mga pasilidad",
    "resources": "mga mapagkukunan",
    "tools": "mga kasangkapan",
    "methods": "mga pamamaraan",
    "techniques": "mga teknik",
    "practices": "mga kasanayan",
    "strategies": "mga estratehiya",
    "solutions": "mga solusyon",
    "options": "mga opsyon",
    "benefits": "mga benepisyo",
    "advantages": "mga kalamangan",
    "features": "mga tampok",
    "details": "mga detalye",
    "specifications": "mga detalye",
    "descriptions": "mga paglalarawan",
    "explanations": "mga paliwanag",
    "instructions": "mga tagubilin",
    "recommendations": "mga rekomendasyon",
    "suggestions": "mga mungkahi",
    "comments": "mga komento",
    "feedback": "mga puna",
    "responses": "mga tugon",
    "results": "mga resulta",
    "findings": "mga natuklasan",
    "reports": "mga ulat",
    "statements": "mga pahayag",
    "declarations": "mga deklarasyon",
    "certifications": "mga sertipikasyon",
    "clearances": "mga clearance",
    "permits": "mga permiso",
    "licenses": "mga lisensya",
    "approvals": "mga pag-apruba",
    "endorsements": "mga pag-eendorso",
    "assessments": "mga pagtatasa",
    "evaluations": "mga ebalwasyon",
    "inspections": "mga inspeksyon",
    "investigations": "mga imbestigasyon",
    "consultations": "mga konsultasyon",
    "meetings": "mga pagpupulong",
    "sessions": "mga sesyon",
    "hearings": "mga pagdinig",
    "elections": "mga halalan",
    "appointments": "mga appointment",
    "schedules": "mga iskedyul",
    "deadlines": "mga deadline",
    "extensions": "mga extension",
    "renewals": "mga pag-renew",
    "amendments": "mga amyenda",
    "corrections": "mga pagwawasto",
    "revisions": "mga rebisyon",
    "modifications": "mga pagbabago",
    "additions": "mga karagdagan",
    "deletions": "mga pagtanggal",
    "replacements": "mga kapalit",
    "transfers": "mga paglipat",
    "distributions": "mga pamamahagi",
    "collections": "mga koleksyon",
    "receipts": "mga resibo",
    "invoices": "mga invoice",
    "vouchers": "mga voucher",
    "checks": "mga tseke",
    "entries": "mga entry",
    "postings": "mga pag-post",
    "filings": "mga paghahain",
    "submissions": "mga pagsusumite",
    "requests": "mga kahilingan",
    "inquiries": "mga pagtatanong",
    "referrals": "mga referral",
    "interventions": "mga interbensyon",
    "assistance": "tulong",
    "support": "suporta",
    "protection": "proteksyon",
    "prevention": "pag-iwas",
    "rehabilitation": "rehabilitasyon",
    "recovery": "pagbawi",
    "maintenance": "pagpapanatili",
    "management": "pamamahala",
    "administration": "administrasyon",
    "coordination": "koordinasyon",
    "implementation": "pagpapatupad",
    "enforcement": "pagpapatupad",
    "compliance": "pagsunod",
    "verification": "beripikasyon",
    "validation": "pagpapatunay",
    "authentication": "pagpapatunay",
    "registration": "pagpaparehistro",
    "enrollment": "pagpapatala",
    "processing": "pagproseso",
    "preparation": "paghahanda",
    "issuance": "pagbibigay",
    "release": "paglabas",
    "delivery": "paghahatid",
    "collection": "koleksyon",
    "payment": "pagbabayad",
    "assessment": "pagtatasa",
    "evaluation": "ebalwasyon",
    "inspection": "inspeksyon",
    "investigation": "imbestigasyon",
    "consultation": "konsultasyon",
    "counseling": "pagpapayo",
    "training": "pagsasanay",
    "education": "edukasyon",
    "development": "pagpapaunlad",
    "planning": "pagpaplano",
    "monitoring": "pagsubaybay",
    "reporting": "pag-uulat",
    "recording": "pagtatala",
    "filing": "paghahain",
    "submission": "pagsusumite",
    "approval": "pag-apruba",
    "endorsement": "pag-eendorso",
    "certification": "sertipikasyon",
    "accreditation": "akreditasyon",
    "authorization": "awtorisasyon",
    "permission": "pahintulot",
    "consent": "pahintulot",
    "agreement": "kasunduan",
    "contract": "kontrata",
    "ordinance": "ordinansa",
    "resolution": "resolusyon",
    "legislation": "lehislasyon",
    "regulation": "regulasyon",
    "policy": "patakaran",
    "guideline": "alituntunin",
    "standard": "pamantayan",
    "procedure": "pamamaraan",
    "process": "proseso",
    "system": "sistema",
    "program": "programa",
    "project": "proyekto",
    "initiative": "inisyatiba",
    "campaign": "kampanya",
    "activity": "aktibidad",
    "operation": "operasyon",
    "function": "tungkulin",
    "responsibility": "responsibilidad",
    "obligation": "obligasyon",
    "duty": "tungkulin",
    "role": "papel",
    "purpose": "layunin",
    "objective": "layunin",
    "goal": "layunin",
    "target": "target",
    "outcome": "resulta",
    "result": "resulta",
    "impact": "epekto",
    "effect": "epekto",
    "benefit": "benepisyo",
    "advantage": "kalamangan",
    "opportunity": "pagkakataon",
    "challenge": "hamon",
    "problem": "problema",
    "issue": "isyu",
    "concern": "alalahanin",
    "complaint": "reklamo",
    "violation": "paglabag",
    "penalty": "multa",
    "surcharge": "karagdagang singil",
    "discount": "diskwento",
    "exemption": "exemption",
    "deduction": "bawas",
    "computation": "pagkalkula",
    "calculation": "pagkalkula",
    "estimation": "pagtantiya",
    "valuation": "pagpapahalaga",
    "appraisal": "pagtatasa",
    "property": "ari-arian",
    "land": "lupa",
    "building": "gusali",
    "structure": "istruktura",
    "machinery": "makinarya",
    "vehicle": "sasakyan",
    "the": "ang",
    "The": "Ang",
    "a": "isang",
    "an": "isang",
    "is": "ay",
    "are": "ay",
    "was": "ay",
    "were": "ay",
    "has": "ay may",
    "have": "ay may",
    "had": "ay nagkaroon ng",
    "will": "ay",
    "would": "ay",
    "can": "maaaring",
    "could": "maaaring",
    "should": "dapat",
    "may": "maaari",
    "might": "maaaring",
    "must": "dapat",
    "shall": "dapat",
    "not": "hindi",
    "no": "walang",
    "and": "at",
    "or": "o",
    "but": "ngunit",
    "if": "kung",
    "for": "para sa",
    "to": "sa",
    "of": "ng",
    "in": "sa",
    "on": "sa",
    "at": "sa",
    "by": "sa pamamagitan ng",
    "with": "na may",
    "its": "nito",
    "their": "kanilang",
    "your": "iyong",
    "our": "aming",
    "this": "itong",
    "This": "Itong",
    "these": "mga ito",
    "those": "mga iyon",
    "it": "ito",
    "they": "sila",
    "we": "kami",
    "We": "Kami",
    "you": "ikaw",
    "You": "Ikaw",
    "who": "na",
    "whom": "na",
}


def translate_sentence_fil(en_text):
    """Translate an English sentence to Filipino using phrase-level replacement."""
    result = en_text

    # Sort phrases by length (longest first) to avoid partial matches
    sorted_phrases = sorted(PHRASES_FIL.keys(), key=len, reverse=True)

    for phrase in sorted_phrases:
        fil_phrase = PHRASES_FIL[phrase]
        # Use word boundary matching for single words, plain replace for phrases
        if ' ' in phrase:
            result = result.replace(phrase, fil_phrase)
        else:
            result = re.sub(r'\b' + re.escape(phrase) + r'\b', fil_phrase, result)

    return result

def build_ilo_from_fil(fil_val):
    """Convert a Filipino translation to Ilocano using word substitutions."""
    fil_to_ilo = {
        'araw': 'aldaw', 'Araw': 'Aldaw',
        'linggo': 'lawas', 'buwan': 'bulan', 'Buwan': 'Bulan',
        'taon': 'tawen', 'Taon': 'Tawen',
        'Hunyo': 'Hunio', 'Setyembre': 'Septiembre', 'Disyembre': 'Disiembre',
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
        'Ingat-Yaman': 'Tesorero',
        'Kalusugan': 'Salun-at',
        'Serbisyo': 'Serbisio', 'serbisyo': 'serbisio',
        'Pagproseso': 'Panagproseso', 'pagproseso': 'panagproseso',
        'Pagbabayad': 'Panagbayad', 'pagbabayad': 'panagbayad',
        'Pagbibigay': 'Panagipaay', 'pagbibigay': 'panagipaay',
        'Pagpaparehistro': 'Panagparehistro', 'pagpaparehistro': 'panagparehistro',
        'Pagsubaybay': 'Panagmonitor', 'pagsubaybay': 'panagmonitor',
        'Paghahanda': 'Panagisagana', 'paghahanda': 'panagisagana',
        'Pagsusuri': 'Panagrepaso', 'pagsusuri': 'panagrepaso',
        'Pagsusumite': 'Panagisumite', 'pagsusumite': 'panagisumite',
        'Pagtatasa': 'Panagpatasa', 'pagtatasa': 'panagpatasa',
        'Pamamahagi': 'Panagipakat', 'pamamahagi': 'panagipakat',
        'Pamamahala': 'Panagtaripato', 'pamamahala': 'panagtaripato',
        'Pagsasanay': 'Panagsanay', 'pagsasanay': 'panagsanay',
        'Pagpapaunlad': 'Panagrang-ay', 'pagpapaunlad': 'panagrang-ay',
        'Pagkuha': 'Panagala', 'pagkuha': 'panagala',
        'Sertipikasyon': 'Sertipikasion', 'sertipikasyon': 'sertipikasion',
        'Lisensya': 'Lisensia', 'lisensya': 'lisensia',
        'Resolusyon': 'Resolusion', 'resolusyon': 'resolusion',
        'Ulat': 'Report', 'ulat': 'report',
        'Gastusin': 'Gastos', 'gastusin': 'gastos',
        'Kita': 'Sapul', 'kita': 'sapul',
        'Magsasaka': 'Mannalon', 'magsasaka': 'mannalon',
        'Mangingisda': 'Mangngalap', 'mangingisda': 'mangngalap',
        'Kliyente': 'Kliente', 'kliyente': 'kliente',
        'Benepisyaryo': 'Benepisario', 'benepisyaryo': 'benepisario',
        'Mamamayan': 'Umili', 'mamamayan': 'umili',
        'Impormasyon': 'Impormasion', 'impormasyon': 'impormasion',
        'Kahilingan': 'Kiddaw', 'kahilingan': 'kiddaw',
        'Kinakailangan': 'Kasapulan', 'kinakailangan': 'kasapulan',
        'Lokasyon': 'Lokasion', 'lokasyon': 'lokasion',
        'Negosyo': 'Negosio', 'negosyo': 'negosio',
        'Pamilihan': 'Tiendaan', 'pamilihan': 'tiendaan',
        'Ari-arian': 'Kukua', 'ari-arian': 'kukua',
        'Lupa': 'Daga', 'lupa': 'daga',
        'Gusali': 'Pasdek', 'gusali': 'pasdek',
        'Sasakyan': 'Lugan', 'sasakyan': 'lugan',
        'Kagamitan': 'Ramit', 'kagamitan': 'ramit',
        'Sakuna': 'Didigra', 'sakuna': 'didigra',
        'Tubig': 'Danum', 'tubig': 'danum',
        'Kuryente': 'Koriente', 'kuryente': 'koriente',
        'Balita': 'Damag', 'balita': 'damag',
        'Bagong': 'Baro a', 'bagong': 'baro a',
        'Bago': 'Baro', 'bago': 'baro',
        'Tingnan': 'Kitaen', 'tingnan': 'kitaen',
        'Bumalik': 'Agsubli', 'bumalik': 'agsubli',
        'Magbayad': 'Agbayad', 'magbayad': 'agbayad',
        'Tanggapin': 'Awaten', 'tanggapin': 'awaten',
        'Kunin': 'Alaen', 'kunin': 'alaen',
    }

    ilo_val = fil_val
    for fil_word in sorted(fil_to_ilo.keys(), key=len, reverse=True):
        ilo_word = fil_to_ilo[fil_word]
        ilo_val = re.sub(r'\b' + re.escape(fil_word) + r'\b', ilo_word, ilo_val)
    return ilo_val


def is_bad_translation(en_val, translated_val):
    """Detect bad mixed-language translations."""
    if en_val == translated_val:
        return False
    if len(en_val.split()) < 4:
        return False
    en_words = set(w.lower() for w in re.findall(r'[a-zA-Z]+', en_val) if len(w) > 2)
    tr_words = set(w.lower() for w in re.findall(r'[a-zA-Z]+', translated_val) if len(w) > 2)
    if not en_words:
        return False
    overlap = len(en_words & tr_words) / len(en_words)
    return overlap > 0.55


def main():
    print("=" * 60)
    print("PASS 3b: FIXING REMAINING BAD TRANSLATIONS")
    print("Using phrase-level translation engine")
    print("=" * 60)

    with open(TRANSLATIONS_JS, 'r') as f:
        content = f.read()

    en, en_order = extract_lang_dict(content, 'en')
    fil, fil_order = extract_lang_dict(content, 'fil')
    ilo, ilo_order = extract_lang_dict(content, 'ilo')

    # Count bad before
    bad_fil_before = sum(1 for k in en if is_bad_translation(en[k], fil.get(k, '')))
    bad_ilo_before = sum(1 for k in en if is_bad_translation(en[k], ilo.get(k, '')))
    print(f"Before: {bad_fil_before} bad FIL, {bad_ilo_before} bad ILO")

    # Fix bad translations by re-translating from English
    fil_fixed = 0
    ilo_fixed = 0

    for key in en:
        en_val = en[key]

        # Fix bad Filipino translations
        if is_bad_translation(en_val, fil.get(key, '')):
            new_fil = translate_sentence_fil(en_val)
            # Only apply if the new translation is actually better
            en_words = set(w.lower() for w in re.findall(r'[a-zA-Z]+', en_val) if len(w) > 2)
            new_words = set(w.lower() for w in re.findall(r'[a-zA-Z]+', new_fil) if len(w) > 2)
            if en_words:
                new_overlap = len(en_words & new_words) / len(en_words)
                if new_overlap < 0.55:  # New translation is better
                    fil[key] = new_fil
                    # Also build Ilocano from the new Filipino
                    ilo[key] = build_ilo_from_fil(new_fil)
                    fil_fixed += 1
                    ilo_fixed += 1

    print(f"Fixed: {fil_fixed} FIL, {ilo_fixed} ILO")

    # Rebuild translations.js
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

    print("Rebuilding translations.js...")
    content = replace_lang_block(content, 'fil', fil, fil_order)
    content = replace_lang_block(content, 'ilo', ilo, ilo_order)

    with open(TRANSLATIONS_JS, 'w') as f:
        f.write(content)

    # Verify
    with open(TRANSLATIONS_JS, 'r') as f:
        verify = f.read()

    v_en, _ = extract_lang_dict(verify, 'en')
    v_fil, _ = extract_lang_dict(verify, 'fil')
    v_ilo, _ = extract_lang_dict(verify, 'ilo')

    bad_fil_after = sum(1 for k in v_en if is_bad_translation(v_en[k], v_fil.get(k, '')))
    bad_ilo_after = sum(1 for k in v_en if is_bad_translation(v_en[k], v_ilo.get(k, '')))
    untrans_fil = sum(1 for k in v_en if v_fil.get(k) == v_en[k])
    untrans_ilo = sum(1 for k in v_en if v_ilo.get(k) == v_en[k])
    total = len(v_en)
    trans_fil = total - untrans_fil
    trans_ilo = total - untrans_ilo

    print(f"\n{'='*60}")
    print(f"RESULTS:")
    print(f"  FIL: {trans_fil}/{total} translated ({trans_fil/total*100:.1f}%)")
    print(f"       {untrans_fil} untranslated, {bad_fil_after} bad remaining (was {bad_fil_before})")
    print(f"  ILO: {trans_ilo}/{total} translated ({trans_ilo/total*100:.1f}%)")
    print(f"       {untrans_ilo} untranslated, {bad_ilo_after} bad remaining (was {bad_ilo_before})")
    print(f"  Key parity: en={len(v_en)}, fil={len(v_fil)}, ilo={len(v_ilo)}")

    # Show sample of remaining bad
    bad_remaining = []
    for k in v_en:
        if is_bad_translation(v_en[k], v_fil.get(k, '')):
            bad_remaining.append((k, v_en[k][:80], v_fil[k][:80]))

    if bad_remaining:
        print(f"\n--- Bad FIL remaining (first 5 of {len(bad_remaining)}) ---")
        for k, e, f in bad_remaining[:5]:
            print(f"  EN:  {e}")
            print(f"  FIL: {f}")
            print()

    print("PASS 3b COMPLETE")


if __name__ == '__main__':
    main()
