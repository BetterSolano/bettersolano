#!/usr/bin/env python3
"""
Translate remaining ~2988 untranslated keys in translations.js
into Filipino (fil) and Ilocano (ilo).

Strategy:
1. Build comprehensive word/phrase dictionaries for fil and ilo
2. Use pattern matching for common structures (time durations, addresses, etc.)
3. Apply domain-specific government terminology translations
4. Handle proper nouns and untranslatable items (keep as-is)
"""

import re
import json
import sys
import os

TRANSLATIONS_JS = 'assets/js/translations.js'

# ============================================================
# CORE DICTIONARIES
# ============================================================

# Words/phrases that should NOT be translated (proper nouns, acronyms, etc.)
KEEP_AS_IS = {
    'BLGF Portal', 'CMCI DTI Portal', 'LGU Solano Facebook',
    'Open Data Philippines', 'PhilHealth', 'GSIS', 'SSS', 'Pag-IBIG',
    'BFP', 'PNP', 'DILG', 'MDRRMO', 'MSWDO', 'SEEDO', 'MPDO',
    'TB-DOTS', 'BIR', 'DTI', 'SEC', 'DENR', 'DPWH', 'DSWD',
    'PSA', 'NBI', 'CENRO', 'MENRO', 'PENRO', 'TESDA', 'DepEd',
    'CHED', 'COA', 'CSC', 'DBM', 'DOH', 'DOLE', 'DOT', 'DA',
    'DAR', 'DICT', 'DOE', 'DOF', 'DOJ', 'DOST', 'DND', 'NEDA',
    'NAPC', 'PCSO', 'PAGASA', 'PHIVOLCS', 'NDRRMC', 'OCD',
    'R2TMC', 'MTOF', 'BPLS', 'RPT', 'CTC', 'RPTA',
    'Filipizen', 'BetterSolano.org', 'Better Solano',
    'Abakada.org', 'volunteer@bettersolano.org',
    'accounting@solano.gov.ph', 'Facebook', 'Google',
    'Sangguniang Bayan', 'Sangguniang Panlalawigan',
    'Nueva Vizcaya', 'Solano', 'Bayombong',
}

# Patterns that should be kept as-is (regex)
KEEP_PATTERNS = [
    r'^\d+[\.\,\%\₱\s\-\+\/\(\)]*$',  # Pure numbers/amounts
    r'^[\d\:\-\s]+$',  # Time patterns like "8AM - 5PM"
    r'^\d+\s*(AM|PM)\s*-\s*\d+\s*(AM|PM)$',  # Time ranges
    r'^[\d\.\,]+\s*(sq\.?\s*m|km²?|hectares?)$',  # Measurements
    r'^[\₱\$]\s*[\d\,\.]+',  # Currency amounts
    r'^\d+x\d+',  # Photo sizes like "1x1"
    r'^0\d{3}\s*\d{3}\s*\d{4}$',  # Phone numbers
    r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',  # Emails
    r'^https?://',  # URLs
    r'^\d+\s*(days?|hours?|minutes?|mins?|weeks?|months?|years?)(\s*[\(\,].*)?$',  # Durations
    r'^\d+\-\d+\s*(days?|hours?|minutes?|mins?|weeks?|months?|years?)(\s*[\(\,].*)?$',  # Duration ranges
    r'^\d+\s*-\s*\d+\s*(kg|lbs?|g|ml|L)$',  # Weight ranges
]

# ============================================================
# FILIPINO (fil) DICTIONARY
# ============================================================

FIL_WORDS = {
    # Common words
    'the': 'ang', 'a': 'isang', 'an': 'isang', 'is': 'ay', 'are': 'ay',
    'was': 'ay', 'were': 'ay', 'be': 'maging', 'been': 'naging',
    'being': 'pagiging', 'have': 'may', 'has': 'may', 'had': 'nagkaroon',
    'do': 'gawin', 'does': 'ginagawa', 'did': 'ginawa',
    'will': 'ay', 'would': 'ay', 'could': 'maaaring',
    'should': 'dapat', 'may': 'maaari', 'might': 'maaaring',
    'must': 'dapat', 'shall': 'dapat', 'can': 'maaari',
    'and': 'at', 'or': 'o', 'but': 'ngunit', 'if': 'kung',
    'then': 'pagkatapos', 'because': 'dahil', 'as': 'bilang',
    'until': 'hanggang', 'while': 'habang', 'of': 'ng',
    'at': 'sa', 'by': 'sa pamamagitan ng', 'for': 'para sa',
    'with': 'na may', 'about': 'tungkol sa', 'between': 'sa pagitan ng',
    'through': 'sa pamamagitan ng', 'during': 'sa panahon ng',
    'before': 'bago', 'after': 'pagkatapos ng', 'above': 'sa itaas ng',
    'below': 'sa ibaba ng', 'to': 'sa', 'from': 'mula sa',
    'in': 'sa', 'on': 'sa', 'not': 'hindi', 'no': 'hindi',
    'all': 'lahat', 'each': 'bawat', 'every': 'bawat',
    'both': 'pareho', 'few': 'iilan', 'more': 'higit pa',
    'most': 'pinaka', 'other': 'iba', 'some': 'ilan',
    'such': 'tulad ng', 'only': 'lamang', 'own': 'sarili',
    'same': 'pareho', 'so': 'kaya', 'than': 'kaysa',
    'too': 'din', 'very': 'napaka', 'just': 'lamang',
    'also': 'din', 'now': 'ngayon', 'here': 'dito',
    'there': 'doon', 'when': 'kailan', 'where': 'saan',
    'why': 'bakit', 'how': 'paano', 'what': 'ano',
    'which': 'alin', 'who': 'sino', 'whom': 'kanino',
    'this': 'ito', 'that': 'iyon', 'these': 'ang mga ito',
    'those': 'ang mga iyon', 'your': 'iyong', 'our': 'aming',
    'their': 'kanilang', 'its': 'nito', 'my': 'aking',
    'his': 'kanyang', 'her': 'kanyang', 'we': 'kami',
    'they': 'sila', 'you': 'ikaw', 'he': 'siya', 'she': 'siya',
    'it': 'ito', 'i': 'ako',
}

# Filipino phrase-level translations (checked before word-level)
FIL_PHRASES = {
    # Government & Municipal
    "Citizen's Charter": "Citizen's Charter",
    "Municipal Hall": "Munisipyo",
    "Municipal Mayor": "Punong Bayan",
    "Municipal Vice Mayor": "Bise Punong Bayan",
    "Mayor's Office": "Opisina ng Punong Bayan",
    "Vice Mayor's Office": "Opisina ng Bise Punong Bayan",
    "Municipal Administrator": "Tagapangasiwa ng Munisipyo",
    "Municipal Accountant": "Akawntant ng Munisipyo",
    "Municipal Assessor": "Tagapagtasa ng Munisipyo",
    "Municipal Budget Officer": "Opisyal ng Badyet ng Munisipyo",
    "Municipal Civil Registrar": "Tagapagrehistro Sibil ng Munisipyo",
    "Municipal Engineer": "Inhinyero ng Munisipyo",
    "Municipal Health Officer": "Opisyal ng Kalusugan ng Munisipyo",
    "Municipal Planning and Development": "Pagpaplano at Pagpapaunlad ng Munisipyo",
    "Municipal Treasurer": "Ingat-Yaman ng Munisipyo",
    "Municipal Social Welfare": "Kagawaran ng Kapakanan ng Munisipyo",
    "Municipal Agriculture": "Kagawaran ng Agrikultura ng Munisipyo",
    "Human Resource Management": "Pamamahala ng Yamang Tao",
    "General Services": "Pangkalahatang Serbisyo",
    "Ground Floor": "Unang Palapag",
    "2nd Floor": "Ikalawang Palapag",
    "3rd Floor": "Ikatlong Palapag",
    "Sangguniang Bayan": "Sangguniang Bayan",
    "Sangguniang Panlalawigan": "Sangguniang Panlalawigan",
    "Barangay Captain": "Kapitan ng Barangay",
    "Barangay Hall": "Barangay Hall",
    "Barangay Clearance": "Barangay Clearance",
    "Barangay ID": "Barangay ID",
    "Police Clearance": "Police Clearance",
    "Public Market": "Pamilihang Bayan",
    "Slaughterhouse": "Katayan",
    "Municipal Slaughterhouse": "Katayan ng Munisipyo",
    "Tricycle Franchise": "Prangkisa ng Traysikel",
    "Business Permit": "Permiso sa Negosyo",
    "Building Permit": "Permiso sa Pagtatayo",
    "Occupancy Permit": "Permiso sa Paninirahan",
    "Real Property Tax": "Buwis sa Ari-arian",
    "Real Property Tax Payment": "Pagbabayad ng Buwis sa Ari-arian",
    "Community Tax Certificate": "Sertipiko ng Buwis Pangkomunidad",
    "Tax Declaration": "Deklarasyon ng Buwis",
    "Transfer of Ownership": "Paglipat ng Pagmamay-ari",
    "Certificate of No Improvement": "Sertipiko ng Walang Pagpapabuti",
    "Certificate of No Property": "Sertipiko ng Walang Ari-arian",
    "Certificate of Land Holding": "Sertipiko ng Pagmamay-ari ng Lupa",

    # Services
    "Birth Certificate": "Sertipiko ng Kapanganakan",
    "Death Certificate": "Sertipiko ng Pagkamatay",
    "Marriage Certificate": "Sertipiko ng Kasal",
    "Marriage License": "Lisensya sa Kasal",
    "Civil Registry": "Rehistro Sibil",
    "Civil Registrar": "Tagapagrehistro Sibil",
    "Late Registration": "Huling Pagpaparehistro",
    "Delayed Registration": "Naantalang Pagpaparehistro",
    "Petition for Correction": "Petisyon para sa Pagwawasto",
    "Change of First Name": "Pagbabago ng Unang Pangalan",
    "Legitimation": "Lehitimasyon",
    "Adoption": "Pag-aampon",
    "Legal Capacity to Contract Marriage": "Legal na Kakayahang Mag-asawa",
    "Certificate of No Marriage": "Sertipiko ng Walang Kasal",
    "Certified True Copy": "Sertipikadong Tunay na Kopya",
    "Local Civil Registry": "Lokal na Rehistro Sibil",
    "Philippine Statistics Authority": "Awtoridad ng Estadistika ng Pilipinas",
    "Foundling Certificate": "Sertipiko ng Natagpuang Bata",
    "Out of Town": "Labas ng Bayan",

    # Process terms
    "Walk-in": "Walk-in",
    "Online": "Online",
    "Appointment": "Appointment",
    "Processing Time": "Oras ng Pagproseso",
    "Requirements": "Mga Kinakailangan",
    "Documents Required": "Mga Dokumentong Kinakailangan",
    "Step": "Hakbang",
    "steps": "mga hakbang",
    "Steps": "Mga Hakbang",
    "Procedure": "Pamamaraan",
    "Application": "Aplikasyon",
    "Approval": "Pag-apruba",
    "Disapproval": "Hindi Pag-apruba",
    "Approval/Disapproval": "Pag-apruba/Hindi Pag-apruba",
    "Verification": "Beripikasyon",
    "Assessment": "Pagtatasa",
    "Payment": "Pagbabayad",
    "Release": "Paglabas",
    "Issuance": "Pagbibigay",
    "Filing": "Paghahain",
    "Submission": "Pagsusumite",
    "Review": "Pagsusuri",
    "Evaluation": "Ebalwasyon",
    "Inspection": "Inspeksyon",
    "Endorsement": "Pag-eendorso",
    "Certification": "Sertipikasyon",
    "Certifications": "Mga Sertipikasyon",
    "Registration": "Pagpaparehistro",
    "Renewal": "Pag-renew",
    "Amendment": "Pag-amyenda",
    "Cancellation": "Pagkansela",
    "Request": "Kahilingan",
    "Inquiry": "Pagtatanong",
    "Complaint": "Reklamo",
    "Feedback": "Puna",
    "Schedule": "Iskedyul",
    "Availability": "Pagkakaroon",
    "Ongoing": "Kasalukuyan",
    "Completed": "Natapos",
    "Pending": "Nakabinbin",
    "Approved": "Naaprubahan",
    "Denied": "Tinanggihan",
    "Processing": "Pinoproseso",
    "Received": "Natanggap",
    "Submitted": "Naisumite",
    "Verified": "Na-verify",
    "Assessed": "Natasa",
    "Paid": "Nabayaran",
    "Released": "Nailabas",
    "Issued": "Naibigay",
    "Filed": "Naihain",
    "Reviewed": "Nasuri",
    "Evaluated": "Na-evaluate",
    "Inspected": "Na-inspeksyon",
    "Endorsed": "Na-endorse",
    "Certified": "Nasertipikahan",
    "Registered": "Nairehistro",
    "Renewed": "Na-renew",
    "Amended": "Na-amyenda",
    "Cancelled": "Nakansela",
    "Requested": "Hiniling",
    "Resolved": "Nalutas",
    "Closed": "Sarado",
    "Open": "Bukas",
    "Active": "Aktibo",
    "Inactive": "Hindi Aktibo",
    "Valid": "Balido",
    "Invalid": "Hindi Balido",
    "Expired": "Nag-expire",
    "Free": "Libre",
    "free": "libre",
    "None": "Wala",
    "none": "wala",
    "N/A": "N/A",
    "Yes": "Oo",
    "No": "Hindi",
    "OK": "OK",
    "Error": "Error",
    "Menu": "Menu",
    "Email": "Email",
    "Email Address": "Email Address",
    "Hotline": "Hotline",
    "Emergency Hotline": "Emergency Hotline",
    "Time:": "Oras:",
    "Date:": "Petsa:",
    "Location:": "Lokasyon:",
    "Address:": "Adres:",
    "Phone:": "Telepono:",
    "Fax:": "Fax:",
    "Website:": "Website:",
    "Office:": "Opisina:",
    "Contact:": "Kontak:",
    "Note:": "Paalala:",
    "Important:": "Mahalaga:",
    "Warning:": "Babala:",
    "Tip:": "Tip:",
    "Fee:": "Bayad:",
    "Total:": "Kabuuan:",
    "Amount:": "Halaga:",
    "Status:": "Katayuan:",
    "Type:": "Uri:",
    "Category:": "Kategorya:",
    "Description:": "Paglalarawan:",
    "Details:": "Detalye:",
    "Summary:": "Buod:",
    "Result:": "Resulta:",
    "Remarks:": "Mga Puna:",
}

# ============================================================
# ILOCANO (ilo) DICTIONARY
# ============================================================

ILO_PHRASES = {
    # Government & Municipal
    "Citizen's Charter": "Citizen's Charter",
    "Municipal Hall": "Munisipalidad",
    "Municipal Mayor": "Mayor ti Munisipalidad",
    "Municipal Vice Mayor": "Bise Mayor ti Munisipalidad",
    "Mayor's Office": "Opisina ti Mayor",
    "Vice Mayor's Office": "Opisina ti Bise Mayor",
    "Municipal Administrator": "Administrador ti Munisipalidad",
    "Municipal Accountant": "Akawntant ti Munisipalidad",
    "Municipal Assessor": "Assessor ti Munisipalidad",
    "Municipal Budget Officer": "Opisyal ti Badyet ti Munisipalidad",
    "Municipal Civil Registrar": "Sibil a Rehistrador ti Munisipalidad",
    "Municipal Engineer": "Inhinyero ti Munisipalidad",
    "Municipal Health Officer": "Opisyal ti Salun-at ti Munisipalidad",
    "Municipal Planning and Development": "Panagplano ken Panagrang-ay ti Munisipalidad",
    "Municipal Treasurer": "Tesorero ti Munisipalidad",
    "Municipal Social Welfare": "Departamento ti Pakasaritaan ti Munisipalidad",
    "Municipal Agriculture": "Departamento ti Agrikultura ti Munisipalidad",
    "Human Resource Management": "Panagtaripato ti Tao a Rekurso",
    "General Services": "Sapasap a Serbisio",
    "Ground Floor": "Umuna a Kadsaaran",
    "2nd Floor": "Maikadua a Kadsaaran",
    "3rd Floor": "Maikatlo a Kadsaaran",
    "Sangguniang Bayan": "Sangguniang Bayan",
    "Sangguniang Panlalawigan": "Sangguniang Panlalawigan",
    "Barangay Captain": "Kapitan ti Barangay",
    "Barangay Hall": "Barangay Hall",
    "Barangay Clearance": "Barangay Clearance",
    "Barangay ID": "Barangay ID",
    "Police Clearance": "Police Clearance",
    "Public Market": "Publiko a Tiendaan",
    "Slaughterhouse": "Pagpartian",
    "Municipal Slaughterhouse": "Pagpartian ti Munisipalidad",
    "Tricycle Franchise": "Prangkisa ti Traysikel",
    "Business Permit": "Permiso ti Negosio",
    "Building Permit": "Permiso ti Panagbangon",
    "Occupancy Permit": "Permiso ti Panagnaed",
    "Real Property Tax": "Buwis ti Kukua",
    "Real Property Tax Payment": "Panagbayad ti Buwis ti Kukua",
    "Community Tax Certificate": "Sertipiko ti Buwis ti Komunidad",
    "Tax Declaration": "Deklarasion ti Buwis",
    "Transfer of Ownership": "Panagyalis ti Panagtagikua",
    "Certificate of No Improvement": "Sertipiko ti Awan Pagrang-ay",
    "Certificate of No Property": "Sertipiko ti Awan Kukua",
    "Certificate of Land Holding": "Sertipiko ti Panagtagikua ti Daga",

    # Services
    "Birth Certificate": "Sertipiko ti Pannakayanak",
    "Death Certificate": "Sertipiko ti Ipapatay",
    "Marriage Certificate": "Sertipiko ti Panagkasar",
    "Marriage License": "Lisensia ti Panagkasar",
    "Civil Registry": "Sibil a Rehistro",
    "Civil Registrar": "Sibil a Rehistrador",
    "Late Registration": "Naladaw a Panagparehistro",
    "Delayed Registration": "Nailadaw a Panagparehistro",
    "Petition for Correction": "Petision para iti Panagkorehir",
    "Change of First Name": "Panagbaliw ti Umuna a Nagan",
    "Legitimation": "Lehitimasion",
    "Adoption": "Panag-adopt",
    "Legal Capacity to Contract Marriage": "Legal a Kabaelan a Makikasar",
    "Certificate of No Marriage": "Sertipiko ti Awan Kasar",
    "Certified True Copy": "Nasertipikaran a Pudno a Kopia",
    "Local Civil Registry": "Lokal a Sibil a Rehistro",
    "Philippine Statistics Authority": "Awtoridad ti Estadistika ti Pilipinas",
    "Foundling Certificate": "Sertipiko ti Nasarakan a Ubing",
    "Out of Town": "Ruar ti Ili",

    # Process terms
    "Walk-in": "Walk-in",
    "Online": "Online",
    "Appointment": "Appointment",
    "Processing Time": "Oras ti Panagproseso",
    "Requirements": "Dagiti Kasapulan",
    "Documents Required": "Dagiti Dokumento a Kasapulan",
    "Step": "Addang",
    "steps": "dagiti addang",
    "Steps": "Dagiti Addang",
    "Procedure": "Prosedimiento",
    "Application": "Aplikasion",
    "Approval": "Panag-apruba",
    "Disapproval": "Saan a Panag-apruba",
    "Approval/Disapproval": "Panag-apruba/Saan a Panag-apruba",
    "Verification": "Beripikasion",
    "Assessment": "Panagpatasa",
    "Payment": "Panagbayad",
    "Release": "Panagiruar",
    "Issuance": "Panagipaay",
    "Filing": "Panagipila",
    "Submission": "Panagisumite",
    "Review": "Panagrepaso",
    "Evaluation": "Ebalwasion",
    "Inspection": "Inspeksion",
    "Endorsement": "Panag-endorse",
    "Certification": "Sertipikasion",
    "Certifications": "Dagiti Sertipikasion",
    "Registration": "Panagparehistro",
    "Renewal": "Panagpabaro",
    "Amendment": "Panag-amyenda",
    "Cancellation": "Panagkansela",
    "Request": "Kiddaw",
    "Inquiry": "Panagsaludsod",
    "Complaint": "Reklamo",
    "Feedback": "Komentario",
    "Schedule": "Iskediul",
    "Availability": "Pannakagun-od",
    "Ongoing": "Agtultuloy",
    "Completed": "Nalpas",
    "Pending": "Agur-uray",
    "Approved": "Naaprubaran",
    "Denied": "Naidian",
    "Processing": "Agproproseso",
    "Received": "Naawat",
    "Submitted": "Naisumite",
    "Verified": "Na-verify",
    "Assessed": "Napatasan",
    "Paid": "Nabayadan",
    "Released": "Nairuar",
    "Issued": "Naipaay",
    "Filed": "Naipila",
    "Reviewed": "Narepaso",
    "Evaluated": "Na-evaluate",
    "Inspected": "Na-inspeksion",
    "Endorsed": "Na-endorse",
    "Certified": "Nasertipikaran",
    "Registered": "Naiparehistro",
    "Renewed": "Napabaro",
    "Amended": "Na-amyenda",
    "Cancelled": "Nakansela",
    "Requested": "Nakiddaw",
    "Resolved": "Narisut",
    "Closed": "Naserraan",
    "Open": "Nakalukat",
    "Active": "Aktibo",
    "Inactive": "Saan nga Aktibo",
    "Valid": "Balido",
    "Invalid": "Saan a Balido",
    "Expired": "Nag-expire",
    "Free": "Libre",
    "free": "libre",
    "None": "Awan",
    "none": "awan",
    "N/A": "N/A",
    "Yes": "Wen",
    "No": "Saan",
    "OK": "OK",
    "Error": "Error",
    "Menu": "Menu",
    "Email": "Email",
    "Email Address": "Email Address",
    "Hotline": "Hotline",
    "Emergency Hotline": "Emergency Hotline",
    "Time:": "Oras:",
    "Date:": "Petsa:",
    "Location:": "Lokasion:",
    "Address:": "Adres:",
    "Phone:": "Telepono:",
    "Fax:": "Fax:",
    "Website:": "Website:",
    "Office:": "Opisina:",
    "Contact:": "Kontak:",
    "Note:": "Pakaammo:",
    "Important:": "Napateg:",
    "Warning:": "Ballaag:",
    "Tip:": "Tip:",
    "Fee:": "Bayad:",
    "Total:": "Dagup:",
    "Amount:": "Kantidad:",
    "Status:": "Kasasaad:",
    "Type:": "Kita:",
    "Category:": "Kategoria:",
    "Description:": "Deskripsion:",
    "Details:": "Detalye:",
    "Summary:": "Pakabuklan:",
    "Result:": "Resulta:",
    "Remarks:": "Dagiti Komentario:",
}

# ============================================================
# COMPREHENSIVE SENTENCE/PHRASE TRANSLATIONS
# These handle the long-form content from service-details pages
# ============================================================

FIL_SENTENCES = {
    # Common footer/sidebar links
    "BLGF Portal": "BLGF Portal",
    "CMCI DTI Portal": "CMCI DTI Portal",
    "LGU Solano Facebook": "LGU Solano Facebook",
    "Open Data Philippines": "Open Data Philippines",
    "Better Solano": "Better Solano",
    "BFP Solano": "BFP Solano",

    # Common service phrases
    "Contact us for assistance with this service.": "Makipag-ugnayan sa amin para sa tulong sa serbisyong ito.",
    "Municipal Hall, Ground Floor Solano, Nueva Vizcaya 3708": "Munisipyo, Unang Palapag, Solano, Nueva Vizcaya 3708",
    "Municipal Hall, 2nd Floor Solano, Nueva Vizcaya 3708": "Munisipyo, Ikalawang Palapag, Solano, Nueva Vizcaya 3708",
    "Municipal Hall, Ground Floor, Solano, Nueva Vizcaya 3708": "Munisipyo, Unang Palapag, Solano, Nueva Vizcaya 3708",
    "2nd Floor, Municipal Hall, Solano, Nueva Vizcaya": "Ikalawang Palapag, Munisipyo, Solano, Nueva Vizcaya",
    "Ground Floor, Municipal Hall, Solano, Nueva Vizcaya": "Unang Palapag, Munisipyo, Solano, Nueva Vizcaya",

    # Time/duration phrases
    "8AM - 5PM": "8AM - 5PM",
    "Monday to Friday": "Lunes hanggang Biyernes",
    "Monday - Friday": "Lunes - Biyernes",
    "Weekdays only": "Araw ng trabaho lamang",
    "Business days": "Araw ng trabaho",
    "business days": "araw ng trabaho",
    "working days": "araw ng trabaho",
    "Working Days": "Araw ng Trabaho",
    "calendar days": "araw ng kalendaryo",

    # Common requirement items
    "Valid ID": "Balidong ID",
    "Valid Government ID": "Balidong Government ID",
    "Photocopy of Valid ID": "Photocopy ng Balidong ID",
    "2 Valid IDs": "2 Balidong ID",
    "Authorization Letter": "Sulat ng Awtorisasyon",
    "Special Power of Attorney": "Espesyal na Kapangyarihan ng Abogado",
    "Affidavit": "Sinumpaang Salaysay",
    "Sworn Statement": "Sinumpaang Pahayag",
    "Notarized Document": "Notaryadong Dokumento",
    "Official Receipt": "Opisyal na Resibo",
    "Proof of Payment": "Patunay ng Pagbabayad",
    "Proof of Ownership": "Patunay ng Pagmamay-ari",
    "Proof of Identity": "Patunay ng Pagkakakilanlan",
    "Proof of Billing": "Patunay ng Pagsingil",
    "Proof of Residency": "Patunay ng Paninirahan",
    "Cedula": "Sedula",
    "Community Tax Certificate (Cedula)": "Sertipiko ng Buwis Pangkomunidad (Sedula)",
    "Duly accomplished application form": "Wastong napunang application form",
    "Duly filled-out application form": "Wastong napunang application form",
    "Filled-out application form": "Napunang application form",
    "Application Form": "Application Form",
    "Request Form": "Request Form",
    "Complaint Form": "Form ng Reklamo",
    "1x1 ID photo": "1x1 ID photo",
    "1x1 or 2x2 ID Photo": "1x1 o 2x2 ID Photo",
    "2x2 ID photo": "2x2 ID photo",
    "2x2 ID Photo": "2x2 ID Photo",
    "Latest Community Tax Certificate": "Pinakabagong Sertipiko ng Buwis Pangkomunidad",
    "Tax Clearance": "Tax Clearance",
    "Zoning Clearance": "Zoning Clearance",
    "Fire Safety Inspection Certificate": "Sertipiko ng Inspeksyon sa Kaligtasan sa Sunog",
    "Sanitary Permit": "Permiso sa Kalinisan",
    "Environmental Compliance Certificate": "Sertipiko ng Pagsunod sa Kapaligiran",
    "Locational Clearance": "Locational Clearance",
    "Electrical Permit": "Permiso sa Elektrikal",
    "Mechanical Permit": "Permiso sa Mekanikal",
    "Plumbing Permit": "Permiso sa Plumbing",
    "Fencing Permit": "Permiso sa Bakod",
    "Demolition Permit": "Permiso sa Paggiba",
    "Excavation Permit": "Permiso sa Paghuhukay",
    "Occupancy Certificate": "Sertipiko ng Paninirahan",

    # Common process descriptions
    "Submit requirements to the office": "Isumite ang mga kinakailangan sa opisina",
    "Pay the required fees at the Treasurer's Office": "Magbayad ng kinakailangang bayad sa Opisina ng Ingat-Yaman",
    "Wait for processing": "Maghintay para sa pagproseso",
    "Claim the document": "Kunin ang dokumento",
    "Present valid ID": "Magpakita ng balidong ID",
    "Fill out the application form": "Punan ang application form",
    "Proceed to the Treasurer's Office for payment": "Pumunta sa Opisina ng Ingat-Yaman para sa pagbabayad",
    "Return to the office with the official receipt": "Bumalik sa opisina na may opisyal na resibo",
    "Wait for the release of the document": "Maghintay para sa paglabas ng dokumento",
    "Receive the document": "Tanggapin ang dokumento",
    "Sign the logbook": "Pumirma sa logbook",
    "Get a claim stub": "Kumuha ng claim stub",
    "Verify the information": "I-verify ang impormasyon",
    "Check the status of your application": "Suriin ang katayuan ng iyong aplikasyon",
    "Follow up on your request": "Mag-follow up sa iyong kahilingan",

    # Privacy/Terms common phrases
    "Access controls and authentication": "Mga kontrol sa pag-access at pagpapatunay",
    "Analytics Cookies:": "Mga Analytics Cookie:",
    "Analytics Data:": "Datos ng Analytics:",
    "We collect the following information:": "Kinokolekta namin ang sumusunod na impormasyon:",
    "We use your information to:": "Ginagamit namin ang iyong impormasyon upang:",
    "Your rights include:": "Kasama sa iyong mga karapatan ang:",
    "You may contact us at:": "Maaari kang makipag-ugnayan sa amin sa:",
    "This policy was last updated on:": "Ang patakarang ito ay huling na-update noong:",
    "By using this website, you agree to:": "Sa paggamit ng website na ito, sumasang-ayon ka sa:",
    "A clear description of your concern": "Isang malinaw na paglalarawan ng iyong alalahanin",
    "Accepting any consequences that may arise from your use of the website": "Pagtanggap ng anumang kahihinatnan na maaaring magmula sa iyong paggamit ng website",
    "Access primary documents and official publications referenced": "I-access ang mga pangunahing dokumento at opisyal na publikasyong binanggit",

    # Statistics
    "2021 City and Municipal Level Poverty Estimates": "2021 Mga Tantiya ng Kahirapan sa Antas ng Lungsod at Munisipyo",
    "2024 Census of Population": "2024 Senso ng Populasyon",

    # Education
    "22 schools": "22 paaralan",
    "6 schools": "6 na paaralan",
    "7 institutions": "7 institusyon",

    # Home page
    "13,980 hectares": "13,980 ektarya",
    "1st Class": "Unang Klase",

    # Offline page
    "Emergency Hotlines - Solano, Nueva Vizcaya": "Mga Emergency Hotline - Solano, Nueva Vizcaya",
    "Fire (BFP)": "Sunog (BFP)",
    "Police (PNP)": "Pulis (PNP)",

    # FAQ
    "An authorization letter signed by you": "Isang sulat ng awtorisasyon na nilagdaan mo",

    # Sitemap categories
    "Assessor's Office": "Opisina ng Tagapagtasa",
    "BPLS Office": "Opisina ng BPLS",
    "Treasurer's Office": "Opisina ng Ingat-Yaman",
    "Accounting Office": "Opisina ng Accounting",
    "Engineering Office": "Opisina ng Inhinyero",
    "Budget Office": "Opisina ng Badyet",
    "Planning Office": "Opisina ng Pagpaplano",
    "Health Office": "Opisina ng Kalusugan",
    "Agriculture Office": "Opisina ng Agrikultura",
    "Social Welfare Office": "Opisina ng Kagawaran ng Kapakanan",
    "Civil Registrar's Office": "Opisina ng Tagapagrehistro Sibil",
    "General Services Office": "Opisina ng Pangkalahatang Serbisyo",
    "Human Resource Office": "Opisina ng Yamang Tao",
    "Market Office": "Opisina ng Pamilihan",
    "Slaughterhouse Office": "Opisina ng Katayan",
    "Tricycle Office": "Opisina ng Traysikel",
    "Environment Office": "Opisina ng Kapaligiran",

    # Browse Services
    "Browse Services": "Mag-browse ng mga Serbisyo",
    "View All Services": "Tingnan ang Lahat ng Serbisyo",
    "View Details": "Tingnan ang Detalye",
    "View More": "Tingnan ang Higit Pa",
    "Back to Services": "Bumalik sa mga Serbisyo",
    "Back to Home": "Bumalik sa Home",
    "Go to Homepage": "Pumunta sa Homepage",
    "Return to Homepage": "Bumalik sa Homepage",
}

ILO_SENTENCES = {
    # Common footer/sidebar links
    "BLGF Portal": "BLGF Portal",
    "CMCI DTI Portal": "CMCI DTI Portal",
    "LGU Solano Facebook": "LGU Solano Facebook",
    "Open Data Philippines": "Open Data Philippines",
    "Better Solano": "Better Solano",
    "BFP Solano": "BFP Solano",

    # Common service phrases
    "Contact us for assistance with this service.": "Kontakennakami para iti tulong iti daytoy a serbisio.",
    "Municipal Hall, Ground Floor Solano, Nueva Vizcaya 3708": "Munisipalidad, Umuna a Kadsaaran, Solano, Nueva Vizcaya 3708",
    "Municipal Hall, 2nd Floor Solano, Nueva Vizcaya 3708": "Munisipalidad, Maikadua a Kadsaaran, Solano, Nueva Vizcaya 3708",
    "Municipal Hall, Ground Floor, Solano, Nueva Vizcaya 3708": "Munisipalidad, Umuna a Kadsaaran, Solano, Nueva Vizcaya 3708",
    "2nd Floor, Municipal Hall, Solano, Nueva Vizcaya": "Maikadua a Kadsaaran, Munisipalidad, Solano, Nueva Vizcaya",
    "Ground Floor, Municipal Hall, Solano, Nueva Vizcaya": "Umuna a Kadsaaran, Munisipalidad, Solano, Nueva Vizcaya",

    # Time/duration phrases
    "8AM - 5PM": "8AM - 5PM",
    "Monday to Friday": "Lunes agingga iti Biernes",
    "Monday - Friday": "Lunes - Biernes",
    "Weekdays only": "Aldaw ti trabaho laeng",
    "Business days": "Aldaw ti trabaho",
    "business days": "aldaw ti trabaho",
    "working days": "aldaw ti trabaho",
    "Working Days": "Aldaw ti Trabaho",
    "calendar days": "aldaw ti kalendario",

    # Common requirement items
    "Valid ID": "Balido nga ID",
    "Valid Government ID": "Balido a Government ID",
    "Photocopy of Valid ID": "Photocopy ti Balido nga ID",
    "2 Valid IDs": "2 Balido nga ID",
    "Authorization Letter": "Surat ti Autorisasion",
    "Special Power of Attorney": "Espesial a Bileg ti Abogado",
    "Affidavit": "Sinumpaaan a Pahayag",
    "Sworn Statement": "Sinumpaaan a Deklarasion",
    "Notarized Document": "Nanotario a Dokumento",
    "Official Receipt": "Opisial a Resibo",
    "Proof of Payment": "Pammaneknek ti Panagbayad",
    "Proof of Ownership": "Pammaneknek ti Panagtagikua",
    "Proof of Identity": "Pammaneknek ti Kinasiasino",
    "Proof of Billing": "Pammaneknek ti Panagsingir",
    "Proof of Residency": "Pammaneknek ti Panagnaed",
    "Cedula": "Sedula",
    "Community Tax Certificate (Cedula)": "Sertipiko ti Buwis ti Komunidad (Sedula)",
    "Duly accomplished application form": "Naan-anay a napunuan nga application form",
    "Duly filled-out application form": "Naan-anay a napunuan nga application form",
    "Filled-out application form": "Napunuan nga application form",
    "Application Form": "Application Form",
    "Request Form": "Request Form",
    "Complaint Form": "Form ti Reklamo",
    "1x1 ID photo": "1x1 ID photo",
    "1x1 or 2x2 ID Photo": "1x1 wenno 2x2 ID Photo",
    "2x2 ID photo": "2x2 ID photo",
    "2x2 ID Photo": "2x2 ID Photo",
    "Latest Community Tax Certificate": "Kabarbaro a Sertipiko ti Buwis ti Komunidad",
    "Tax Clearance": "Tax Clearance",
    "Zoning Clearance": "Zoning Clearance",
    "Fire Safety Inspection Certificate": "Sertipiko ti Inspeksion ti Kinatalged iti Apuy",
    "Sanitary Permit": "Permiso ti Kinadalus",
    "Environmental Compliance Certificate": "Sertipiko ti Panagtungpal iti Aglawlaw",
    "Locational Clearance": "Locational Clearance",
    "Electrical Permit": "Permiso ti Elektrikal",
    "Mechanical Permit": "Permiso ti Mekanikal",
    "Plumbing Permit": "Permiso ti Plumbing",
    "Fencing Permit": "Permiso ti Alad",
    "Demolition Permit": "Permiso ti Panagrebba",
    "Excavation Permit": "Permiso ti Panagkalot",
    "Occupancy Certificate": "Sertipiko ti Panagnaed",

    # Common process descriptions
    "Submit requirements to the office": "Isumite dagiti kasapulan iti opisina",
    "Pay the required fees at the Treasurer's Office": "Agbayad kadagiti kasapulan a bayad iti Opisina ti Tesorero",
    "Wait for processing": "Aguray para iti panagproseso",
    "Claim the document": "Alaen ti dokumento",
    "Present valid ID": "Ipakita ti balido nga ID",
    "Fill out the application form": "Punuan ti application form",
    "Proceed to the Treasurer's Office for payment": "Mapan iti Opisina ti Tesorero para iti panagbayad",
    "Return to the office with the official receipt": "Agsubli iti opisina nga addaan iti opisial a resibo",
    "Wait for the release of the document": "Aguray para iti panagiruar ti dokumento",
    "Receive the document": "Awaten ti dokumento",
    "Sign the logbook": "Agpirma iti logbook",
    "Get a claim stub": "Alaen ti claim stub",
    "Verify the information": "I-verify ti impormasion",
    "Check the status of your application": "Kitaen ti kasasaad ti aplikasionmo",
    "Follow up on your request": "Ag-follow up iti kiddawmo",

    # Privacy/Terms common phrases
    "Access controls and authentication": "Dagiti kontrol iti panag-access ken panagpaneknek",
    "Analytics Cookies:": "Dagiti Analytics Cookie:",
    "Analytics Data:": "Datos ti Analytics:",
    "We collect the following information:": "Agkolektakami kadagiti sumaganad nga impormasion:",
    "We use your information to:": "Usarenmi ti impormasionmo tapno:",
    "Your rights include:": "Karaman kadagiti karbengam ti:",
    "You may contact us at:": "Mabalinmo a kontaken dakami iti:",
    "This policy was last updated on:": "Daytoy a patakaran ket naudi a na-update idi:",
    "By using this website, you agree to:": "Babaen ti panagusar iti daytoy a website, umanamongka iti:",
    "A clear description of your concern": "Nalawag a deskripsion ti pakaseknaam",
    "Accepting any consequences that may arise from your use of the website": "Panangawat iti aniaman a resulta a mabalin a magtaud iti panagusarmo iti website",
    "Access primary documents and official publications referenced": "Ag-access kadagiti kangrunaan a dokumento ken opisial a publikasion a nadakamat",

    # Statistics
    "2021 City and Municipal Level Poverty Estimates": "2021 Dagiti Tantia ti Kinapanglaw iti Lebel ti Siudad ken Munisipalidad",
    "2024 Census of Population": "2024 Senso ti Populasion",

    # Education
    "22 schools": "22 nga eskuelaan",
    "6 schools": "6 nga eskuelaan",
    "7 institutions": "7 nga institusion",

    # Home page
    "13,980 hectares": "13,980 nga ektarya",
    "1st Class": "Umuna a Klase",

    # Offline page
    "Emergency Hotlines - Solano, Nueva Vizcaya": "Dagiti Emergency Hotline - Solano, Nueva Vizcaya",
    "Fire (BFP)": "Apuy (BFP)",
    "Police (PNP)": "Polis (PNP)",

    # FAQ
    "An authorization letter signed by you": "Maysa a surat ti autorisasion a pinirmaanmo",

    # Sitemap categories
    "Assessor's Office": "Opisina ti Assessor",
    "BPLS Office": "Opisina ti BPLS",
    "Treasurer's Office": "Opisina ti Tesorero",
    "Accounting Office": "Opisina ti Accounting",
    "Engineering Office": "Opisina ti Inhinyero",
    "Budget Office": "Opisina ti Badyet",
    "Planning Office": "Opisina ti Panagplano",
    "Health Office": "Opisina ti Salun-at",
    "Agriculture Office": "Opisina ti Agrikultura",
    "Social Welfare Office": "Opisina ti Pakasaritaan",
    "Civil Registrar's Office": "Opisina ti Sibil a Rehistrador",
    "General Services Office": "Opisina ti Sapasap a Serbisio",
    "Human Resource Office": "Opisina ti Tao a Rekurso",
    "Market Office": "Opisina ti Tiendaan",
    "Slaughterhouse Office": "Opisina ti Pagpartian",
    "Tricycle Office": "Opisina ti Traysikel",
    "Environment Office": "Opisina ti Aglawlaw",

    # Browse Services
    "Browse Services": "Ag-browse kadagiti Serbisio",
    "View All Services": "Kitaen Amin a Serbisio",
    "View Details": "Kitaen ti Detalye",
    "View More": "Kitaen ti Ad-adu Pay",
    "Back to Services": "Agsubli kadagiti Serbisio",
    "Back to Home": "Agsubli iti Home",
    "Go to Homepage": "Mapan iti Homepage",
    "Return to Homepage": "Agsubli iti Homepage",
}

# ============================================================
# WORD-LEVEL TRANSLATION MAPS FOR BUILDING SENTENCES
# ============================================================

# Filipino word map for building translations of longer content
FIL_WORD_MAP = {
    # Nouns - Government
    'office': 'opisina', 'offices': 'mga opisina',
    'department': 'kagawaran', 'departments': 'mga kagawaran',
    'division': 'dibisyon', 'section': 'seksyon',
    'unit': 'yunit', 'branch': 'sangay',
    'government': 'pamahalaan', 'municipality': 'munisipyo',
    'province': 'lalawigan', 'barangay': 'barangay',
    'city': 'lungsod', 'town': 'bayan',
    'district': 'distrito', 'region': 'rehiyon',
    'country': 'bansa', 'nation': 'bansa',
    'council': 'konseho', 'board': 'lupon',
    'committee': 'komite', 'commission': 'komisyon',
    'authority': 'awtoridad', 'agency': 'ahensya',
    'mayor': 'alkalde', 'councilor': 'konsehal',
    'secretary': 'kalihim', 'treasurer': 'ingat-yaman',
    'assessor': 'tagapagtasa', 'engineer': 'inhinyero',
    'accountant': 'akawntant', 'administrator': 'tagapangasiwa',
    'officer': 'opisyal', 'director': 'direktor',
    'chief': 'punong', 'head': 'pinuno',
    'staff': 'kawani', 'employee': 'empleyado',
    'employees': 'mga empleyado', 'personnel': 'tauhan',
    'official': 'opisyal', 'officials': 'mga opisyal',
    'resident': 'residente', 'residents': 'mga residente',
    'citizen': 'mamamayan', 'citizens': 'mga mamamayan',
    'applicant': 'aplikante', 'applicants': 'mga aplikante',
    'client': 'kliyente', 'clients': 'mga kliyente',
    'customer': 'kostumer', 'customers': 'mga kostumer',
    'taxpayer': 'nagbabayad ng buwis', 'taxpayers': 'mga nagbabayad ng buwis',
    'owner': 'may-ari', 'owners': 'mga may-ari',
    'representative': 'kinatawan', 'representatives': 'mga kinatawan',

    # Nouns - Documents
    'document': 'dokumento', 'documents': 'mga dokumento',
    'certificate': 'sertipiko', 'certificates': 'mga sertipiko',
    'permit': 'permiso', 'permits': 'mga permiso',
    'license': 'lisensya', 'licenses': 'mga lisensya',
    'clearance': 'clearance', 'form': 'form',
    'forms': 'mga form', 'application': 'aplikasyon',
    'applications': 'mga aplikasyon', 'letter': 'sulat',
    'letters': 'mga sulat', 'notice': 'abiso',
    'notices': 'mga abiso', 'report': 'ulat',
    'reports': 'mga ulat', 'record': 'rekord',
    'records': 'mga rekord', 'receipt': 'resibo',
    'receipts': 'mga resibo', 'copy': 'kopya',
    'copies': 'mga kopya', 'original': 'orihinal',
    'photocopy': 'photocopy', 'photocopies': 'mga photocopy',
    'requirement': 'kinakailangan', 'requirements': 'mga kinakailangan',
    'information': 'impormasyon', 'data': 'datos',
    'signature': 'lagda', 'stamp': 'selyo',
    'seal': 'selyo', 'photo': 'larawan',
    'picture': 'larawan', 'id': 'ID',
    'identification': 'pagkakakilanlan',

    # Nouns - Services
    'service': 'serbisyo', 'services': 'mga serbisyo',
    'process': 'proseso', 'procedure': 'pamamaraan',
    'transaction': 'transaksyon', 'transactions': 'mga transaksyon',
    'request': 'kahilingan', 'requests': 'mga kahilingan',
    'complaint': 'reklamo', 'complaints': 'mga reklamo',
    'inquiry': 'pagtatanong', 'inquiries': 'mga pagtatanong',
    'assistance': 'tulong', 'help': 'tulong',
    'support': 'suporta', 'guidance': 'gabay',
    'consultation': 'konsultasyon', 'assessment': 'pagtatasa',
    'evaluation': 'ebalwasyon', 'inspection': 'inspeksyon',
    'verification': 'beripikasyon', 'validation': 'pagpapatunay',
    'approval': 'pag-apruba', 'endorsement': 'pag-eendorso',
    'recommendation': 'rekomendasyon', 'referral': 'referral',
    'payment': 'pagbabayad', 'fee': 'bayad',
    'fees': 'mga bayad', 'charge': 'singil',
    'charges': 'mga singil', 'cost': 'gastos',
    'costs': 'mga gastos', 'price': 'presyo',
    'amount': 'halaga', 'total': 'kabuuan',
    'balance': 'balanse', 'discount': 'diskwento',
    'penalty': 'multa', 'surcharge': 'karagdagang singil',
    'interest': 'interes', 'tax': 'buwis',
    'taxes': 'mga buwis', 'property': 'ari-arian',
    'land': 'lupa', 'building': 'gusali',
    'house': 'bahay', 'lot': 'lote',
    'area': 'lugar', 'zone': 'zona',
    'boundary': 'hangganan', 'survey': 'surbey',
    'plan': 'plano', 'map': 'mapa',
    'title': 'titulo', 'deed': 'kasulatan',
    'contract': 'kontrata', 'agreement': 'kasunduan',
    'ordinance': 'ordinansa', 'resolution': 'resolusyon',
    'law': 'batas', 'regulation': 'regulasyon',
    'rule': 'panuntunan', 'policy': 'patakaran',
    'guideline': 'alituntunin', 'guidelines': 'mga alituntunin',
    'standard': 'pamantayan', 'standards': 'mga pamantayan',

    # Nouns - People/Family
    'person': 'tao', 'people': 'mga tao',
    'child': 'bata', 'children': 'mga bata',
    'adult': 'matanda', 'adults': 'mga matanda',
    'senior': 'nakatatanda', 'seniors': 'mga nakatatanda',
    'youth': 'kabataan', 'women': 'mga kababaihan',
    'men': 'mga kalalakihan', 'family': 'pamilya',
    'families': 'mga pamilya', 'household': 'sambahayan',
    'households': 'mga sambahayan', 'parent': 'magulang',
    'parents': 'mga magulang', 'mother': 'ina',
    'father': 'ama', 'spouse': 'asawa',
    'husband': 'asawang lalaki', 'wife': 'asawang babae',
    'son': 'anak na lalaki', 'daughter': 'anak na babae',
    'brother': 'kapatid na lalaki', 'sister': 'kapatid na babae',
    'baby': 'sanggol', 'infant': 'sanggol',
    'newborn': 'bagong silang', 'deceased': 'namatay',
    'death': 'kamatayan', 'birth': 'kapanganakan',
    'marriage': 'kasal', 'wedding': 'kasal',
    'burial': 'libing', 'funeral': 'libing',

    # Verbs
    'submit': 'isumite', 'file': 'ihain',
    'apply': 'mag-apply', 'register': 'magparehistro',
    'request': 'humiling', 'pay': 'magbayad',
    'claim': 'kunin', 'receive': 'tanggapin',
    'present': 'ipakita', 'provide': 'magbigay',
    'prepare': 'ihanda', 'complete': 'kumpletuhin',
    'fill': 'punan', 'sign': 'pumirma',
    'verify': 'i-verify', 'check': 'suriin',
    'review': 'suriin', 'approve': 'aprubahan',
    'deny': 'tanggihan', 'reject': 'tanggihan',
    'cancel': 'kanselahin', 'renew': 'i-renew',
    'update': 'i-update', 'amend': 'i-amyenda',
    'correct': 'iwasto', 'change': 'baguhin',
    'transfer': 'ilipat', 'release': 'ilabas',
    'issue': 'ibigay', 'process': 'iproseso',
    'assess': 'tasahin', 'evaluate': 'i-evaluate',
    'inspect': 'inspeksyunin', 'endorse': 'i-endorse',
    'certify': 'sertipikahan', 'notarize': 'ipanotaryo',
    'authenticate': 'patunayan', 'validate': 'patunayan',
    'confirm': 'kumpirmahin', 'acknowledge': 'kilalanin',
    'accept': 'tanggapin', 'decline': 'tanggihan',
    'proceed': 'magpatuloy', 'continue': 'magpatuloy',
    'wait': 'maghintay', 'return': 'bumalik',
    'go': 'pumunta', 'visit': 'bisitahin',
    'contact': 'makipag-ugnayan', 'call': 'tumawag',
    'email': 'mag-email', 'send': 'ipadala',
    'bring': 'dalhin', 'carry': 'dalhin',
    'obtain': 'makuha', 'secure': 'makuha',
    'acquire': 'makuha', 'get': 'kumuha',
    'download': 'i-download', 'upload': 'i-upload',
    'print': 'i-print', 'scan': 'i-scan',
    'attach': 'ilakip', 'include': 'isama',
    'exclude': 'ibukod', 'require': 'kailangan',
    'need': 'kailangan', 'want': 'gusto',
    'use': 'gamitin', 'follow': 'sundin',
    'comply': 'sumunod', 'observe': 'sundin',
    'ensure': 'tiyakin', 'maintain': 'panatilihin',
    'protect': 'protektahan', 'secure': 'siguruhin',
    'collect': 'kolektahin', 'gather': 'tipunin',
    'store': 'itago', 'keep': 'itago',
    'share': 'ibahagi', 'disclose': 'ibunyag',
    'access': 'i-access', 'view': 'tingnan',
    'read': 'basahin', 'write': 'isulat',
    'create': 'gumawa', 'delete': 'burahin',
    'remove': 'alisin', 'add': 'idagdag',
    'modify': 'baguhin', 'edit': 'i-edit',
    'save': 'i-save', 'open': 'buksan',
    'close': 'isara', 'start': 'simulan',
    'begin': 'simulan', 'end': 'tapusin',
    'finish': 'tapusin', 'stop': 'itigil',

    # Adjectives
    'new': 'bago', 'old': 'luma',
    'valid': 'balido', 'invalid': 'hindi balido',
    'required': 'kinakailangan', 'optional': 'opsyonal',
    'available': 'magagamit', 'unavailable': 'hindi magagamit',
    'free': 'libre', 'paid': 'bayad',
    'complete': 'kumpleto', 'incomplete': 'hindi kumpleto',
    'correct': 'tama', 'incorrect': 'mali',
    'original': 'orihinal', 'certified': 'sertipikado',
    'notarized': 'notaryado', 'authenticated': 'napatunayan',
    'official': 'opisyal', 'public': 'pampubliko',
    'private': 'pribado', 'personal': 'personal',
    'local': 'lokal', 'national': 'pambansa',
    'municipal': 'pangmunisipyo', 'provincial': 'panlalawigan',
    'annual': 'taunang', 'monthly': 'buwanang',
    'weekly': 'lingguhang', 'daily': 'araw-araw',
    'current': 'kasalukuyang', 'previous': 'nakaraang',
    'next': 'susunod', 'last': 'huling',
    'first': 'unang', 'second': 'ikalawang',
    'third': 'ikatlong', 'fourth': 'ikaapat',
    'fifth': 'ikalimang',
    'total': 'kabuuang', 'partial': 'bahagyang',
    'full': 'buong', 'empty': 'walang laman',
    'open': 'bukas', 'closed': 'sarado',
    'active': 'aktibo', 'inactive': 'hindi aktibo',
    'pending': 'nakabinbin', 'approved': 'naaprubahan',
    'denied': 'tinanggihan', 'cancelled': 'nakansela',
    'expired': 'nag-expire', 'renewed': 'na-renew',
    'updated': 'na-update', 'amended': 'na-amyenda',
    'important': 'mahalaga', 'urgent': 'agarang',
    'immediate': 'agaran', 'regular': 'regular',
    'special': 'espesyal', 'emergency': 'emergency',
    'temporary': 'pansamantala', 'permanent': 'permanente',
    'additional': 'karagdagang', 'other': 'iba pang',
    'same': 'parehong', 'different': 'ibang',
    'specific': 'tiyak', 'general': 'pangkalahatan',
    'basic': 'pangunahing', 'advanced': 'advanced',
    'simple': 'simple', 'complex': 'kumplikado',
    'small': 'maliit', 'large': 'malaki',
    'long': 'mahaba', 'short': 'maikli',
    'high': 'mataas', 'low': 'mababa',
    'good': 'mabuti', 'bad': 'masama',
    'right': 'tama', 'wrong': 'mali',
    'true': 'totoo', 'false': 'mali',
    'digital': 'digital', 'online': 'online',
    'electronic': 'elektroniko', 'manual': 'manual',
    'automatic': 'awtomatiko', 'comprehensive': 'komprehensibo',
    'transparent': 'transparent', 'accessible': 'naa-access',
    'inclusive': 'inklusibo', 'responsive': 'tumutugon',
    'efficient': 'mahusay', 'effective': 'epektibo',
    'reliable': 'maaasahan', 'secure': 'ligtas',
    'safe': 'ligtas', 'clean': 'malinis',
    'healthy': 'malusog', 'sustainable': 'napapanatili',
}

# Ilocano word map
ILO_WORD_MAP = {
    # Nouns - Government
    'office': 'opisina', 'offices': 'dagiti opisina',
    'department': 'departamento', 'departments': 'dagiti departamento',
    'division': 'dibision', 'section': 'seksion',
    'unit': 'yunit', 'branch': 'sanga',
    'government': 'gobierno', 'municipality': 'munisipalidad',
    'province': 'probinsia', 'barangay': 'barangay',
    'city': 'siudad', 'town': 'ili',
    'district': 'distrito', 'region': 'rehion',
    'country': 'pagilian', 'nation': 'nasion',
    'council': 'konseho', 'board': 'lupon',
    'committee': 'komite', 'commission': 'komisyon',
    'authority': 'awtoridad', 'agency': 'ahensia',
    'mayor': 'mayor', 'councilor': 'konsehal',
    'secretary': 'sekretario', 'treasurer': 'tesorero',
    'assessor': 'assessor', 'engineer': 'inhinyero',
    'accountant': 'akawntant', 'administrator': 'administrador',
    'officer': 'opisyal', 'director': 'direktor',
    'chief': 'puno', 'head': 'puno',
    'staff': 'kawani', 'employee': 'empleado',
    'employees': 'dagiti empleado', 'personnel': 'tauhan',
    'official': 'opisyal', 'officials': 'dagiti opisyal',
    'resident': 'residente', 'residents': 'dagiti residente',
    'citizen': 'umili', 'citizens': 'dagiti umili',
    'applicant': 'aplikante', 'applicants': 'dagiti aplikante',
    'client': 'kliente', 'clients': 'dagiti kliente',
    'customer': 'kostumer', 'customers': 'dagiti kostumer',
    'taxpayer': 'agbabayad ti buwis', 'taxpayers': 'dagiti agbabayad ti buwis',
    'owner': 'akinkukua', 'owners': 'dagiti akinkukua',
    'representative': 'pannakabagi', 'representatives': 'dagiti pannakabagi',

    # Nouns - Documents
    'document': 'dokumento', 'documents': 'dagiti dokumento',
    'certificate': 'sertipiko', 'certificates': 'dagiti sertipiko',
    'permit': 'permiso', 'permits': 'dagiti permiso',
    'license': 'lisensia', 'licenses': 'dagiti lisensia',
    'clearance': 'clearance', 'form': 'form',
    'forms': 'dagiti form', 'application': 'aplikasion',
    'applications': 'dagiti aplikasion', 'letter': 'surat',
    'letters': 'dagiti surat', 'notice': 'pakaammo',
    'notices': 'dagiti pakaammo', 'report': 'report',
    'reports': 'dagiti report', 'record': 'rekord',
    'records': 'dagiti rekord', 'receipt': 'resibo',
    'receipts': 'dagiti resibo', 'copy': 'kopia',
    'copies': 'dagiti kopia', 'original': 'orihinal',
    'photocopy': 'photocopy', 'photocopies': 'dagiti photocopy',
    'requirement': 'kasapulan', 'requirements': 'dagiti kasapulan',
    'information': 'impormasion', 'data': 'datos',
    'signature': 'pirma', 'stamp': 'selyo',
    'seal': 'selyo', 'photo': 'ladawan',
    'picture': 'ladawan', 'id': 'ID',
    'identification': 'panagbiag',

    # Nouns - Services
    'service': 'serbisio', 'services': 'dagiti serbisio',
    'process': 'proseso', 'procedure': 'prosedimiento',
    'transaction': 'transaksion', 'transactions': 'dagiti transaksion',
    'request': 'kiddaw', 'requests': 'dagiti kiddaw',
    'complaint': 'reklamo', 'complaints': 'dagiti reklamo',
    'inquiry': 'panagsaludsod', 'inquiries': 'dagiti panagsaludsod',
    'assistance': 'tulong', 'help': 'tulong',
    'support': 'suporta', 'guidance': 'giya',
    'consultation': 'konsultasion', 'assessment': 'panagpatasa',
    'evaluation': 'ebalwasion', 'inspection': 'inspeksion',
    'verification': 'beripikasion', 'validation': 'panagpaneknek',
    'approval': 'panag-apruba', 'endorsement': 'panag-endorse',
    'recommendation': 'rekomendasion', 'referral': 'referral',
    'payment': 'panagbayad', 'fee': 'bayad',
    'fees': 'dagiti bayad', 'charge': 'singir',
    'charges': 'dagiti singir', 'cost': 'gastos',
    'costs': 'dagiti gastos', 'price': 'presio',
    'amount': 'kantidad', 'total': 'dagup',
    'balance': 'balanse', 'discount': 'diskuento',
    'penalty': 'multa', 'surcharge': 'karagdagan a singir',
    'interest': 'interes', 'tax': 'buwis',
    'taxes': 'dagiti buwis', 'property': 'kukua',
    'land': 'daga', 'building': 'pasdek',
    'house': 'balay', 'lot': 'lote',
    'area': 'lugar', 'zone': 'zona',
    'boundary': 'beddeng', 'survey': 'surbey',
    'plan': 'plano', 'map': 'mapa',
    'title': 'titulo', 'deed': 'kasuratan',
    'contract': 'kontrata', 'agreement': 'tulagan',
    'ordinance': 'ordinansa', 'resolution': 'resolusion',
    'law': 'linteg', 'regulation': 'regulasion',
    'rule': 'pagannurotan', 'policy': 'patakaran',
    'guideline': 'giya', 'guidelines': 'dagiti giya',
    'standard': 'pagalagadan', 'standards': 'dagiti pagalagadan',

    # Nouns - People/Family
    'person': 'tao', 'people': 'dagiti tao',
    'child': 'ubing', 'children': 'dagiti ubbing',
    'adult': 'nataengan', 'adults': 'dagiti nataengan',
    'senior': 'nataengan', 'seniors': 'dagiti nataengan',
    'youth': 'agtutubo', 'women': 'dagiti babbai',
    'men': 'dagiti lallaki', 'family': 'pamilia',
    'families': 'dagiti pamilia', 'household': 'sangakabbalayan',
    'households': 'dagiti sangakabbalayan', 'parent': 'nagannak',
    'parents': 'dagiti nagannak', 'mother': 'ina',
    'father': 'ama', 'spouse': 'asawa',
    'husband': 'asawa a lalaki', 'wife': 'asawa a babai',
    'baby': 'maladaga', 'infant': 'maladaga',
    'newborn': 'kabarbaro a nayanak', 'deceased': 'natay',
    'death': 'ipapatay', 'birth': 'pannakayanak',
    'marriage': 'kasar', 'wedding': 'kasar',
    'burial': 'pannakaitalon', 'funeral': 'pannakaitalon',

    # Verbs
    'submit': 'isumite', 'file': 'ipila',
    'apply': 'ag-apply', 'register': 'agparehistro',
    'request': 'agkiddaw', 'pay': 'agbayad',
    'claim': 'alaen', 'receive': 'awaten',
    'present': 'ipakita', 'provide': 'mangipaay',
    'prepare': 'isaganad', 'complete': 'kompleto',
    'fill': 'punuan', 'sign': 'agpirma',
    'verify': 'i-verify', 'check': 'kitaen',
    'review': 'repasuen', 'approve': 'aprubaran',
    'deny': 'ididian', 'reject': 'ididian',
    'cancel': 'kanselaen', 'renew': 'pabaruen',
    'update': 'i-update', 'amend': 'i-amyenda',
    'correct': 'korehiren', 'change': 'baliwan',
    'transfer': 'iyalis', 'release': 'iruar',
    'issue': 'ipaay', 'process': 'iproseso',
    'assess': 'patasan', 'evaluate': 'i-evaluate',
    'inspect': 'inspeksionen', 'endorse': 'i-endorse',
    'certify': 'sertipikaran', 'notarize': 'ipanotario',
    'authenticate': 'paneknekan', 'validate': 'paneknekan',
    'confirm': 'kumpirmaen', 'acknowledge': 'bigbigen',
    'accept': 'awaten', 'decline': 'ididian',
    'proceed': 'agtuloy', 'continue': 'agtuloy',
    'wait': 'aguray', 'return': 'agsubli',
    'go': 'mapan', 'visit': 'bisitaen',
    'contact': 'kontaken', 'call': 'agtawag',
    'email': 'ag-email', 'send': 'ipatulod',
    'bring': 'iyeg', 'carry': 'iyeg',
    'obtain': 'maala', 'secure': 'maala',
    'acquire': 'maala', 'get': 'alaen',
    'download': 'i-download', 'upload': 'i-upload',
    'print': 'i-print', 'scan': 'i-scan',
    'attach': 'ilakip', 'include': 'iraman',
    'exclude': 'ikkaten', 'require': 'kasapulan',
    'need': 'kasapulan', 'want': 'kayat',
    'use': 'usaren', 'follow': 'suroten',
    'comply': 'agtungpal', 'observe': 'suroten',
    'ensure': 'siguraduen', 'maintain': 'taginayonen',
    'protect': 'salakniban', 'collect': 'kolektaen',
    'gather': 'urnonguen', 'store': 'itago',
    'keep': 'itago', 'share': 'ibingay',
    'disclose': 'ipalgak', 'access': 'ag-access',
    'view': 'kitaen', 'read': 'basaen',
    'write': 'isurat', 'create': 'agaramid',
    'delete': 'ikkaten', 'remove': 'ikkaten',
    'add': 'inayon', 'modify': 'baliwan',
    'edit': 'i-edit', 'save': 'i-save',
    'open': 'lukatan', 'close': 'serraan',
    'start': 'rugian', 'begin': 'rugian',
    'end': 'gibusanen', 'finish': 'gibusanen',
    'stop': 'isardeng',

    # Adjectives
    'new': 'baro', 'old': 'daan',
    'valid': 'balido', 'invalid': 'saan a balido',
    'required': 'kasapulan', 'optional': 'opsional',
    'available': 'magun-od', 'unavailable': 'saan a magun-od',
    'free': 'libre', 'paid': 'nabayadan',
    'complete': 'kompleto', 'incomplete': 'saan a kompleto',
    'correct': 'umiso', 'incorrect': 'saan nga umiso',
    'original': 'orihinal', 'certified': 'nasertipikaran',
    'notarized': 'nanotario', 'authenticated': 'napaneknekan',
    'official': 'opisial', 'public': 'publiko',
    'private': 'pribado', 'personal': 'personal',
    'local': 'lokal', 'national': 'nailian',
    'municipal': 'munisipal', 'provincial': 'probinsial',
    'annual': 'tinawen', 'monthly': 'binulan',
    'weekly': 'linawas', 'daily': 'inaldaw',
    'current': 'agdama', 'previous': 'napalabas',
    'next': 'sumaruno', 'last': 'naudi',
    'first': 'umuna', 'second': 'maikadua',
    'third': 'maikatlo', 'fourth': 'maikapat',
    'fifth': 'maikalima',
    'total': 'dagup', 'partial': 'paset',
    'full': 'naan-anay', 'empty': 'awan linaonna',
    'open': 'nakalukat', 'closed': 'naserraan',
    'active': 'aktibo', 'inactive': 'saan nga aktibo',
    'pending': 'agur-uray', 'approved': 'naaprubaran',
    'denied': 'naidian', 'cancelled': 'nakansela',
    'expired': 'nag-expire', 'renewed': 'napabaro',
    'updated': 'na-update', 'amended': 'na-amyenda',
    'important': 'napateg', 'urgent': 'naganat',
    'immediate': 'dagus', 'regular': 'regular',
    'special': 'espesial', 'emergency': 'emergency',
    'temporary': 'temporario', 'permanent': 'permanente',
    'additional': 'karagdagan', 'other': 'sabali',
    'same': 'isu met laeng', 'different': 'naiduma',
    'specific': 'espesipiko', 'general': 'sapasap',
    'basic': 'batayan', 'advanced': 'advanced',
    'simple': 'simple', 'complex': 'komplikado',
    'small': 'bassit', 'large': 'dakkel',
    'long': 'atiddog', 'short': 'ababa',
    'high': 'nangato', 'low': 'nababa',
    'good': 'nasayaat', 'bad': 'dakes',
    'right': 'umiso', 'wrong': 'kamali',
    'true': 'pudno', 'false': 'saan a pudno',
    'digital': 'digital', 'online': 'online',
    'electronic': 'elektroniko', 'manual': 'manual',
    'automatic': 'automatiko', 'comprehensive': 'komprehensibo',
    'transparent': 'transparente', 'accessible': 'magun-od',
    'inclusive': 'inklusibo', 'responsive': 'responsibo',
    'efficient': 'episiente', 'effective': 'epektibo',
    'reliable': 'mapagtalkan', 'secure': 'natalged',
    'safe': 'natalged', 'clean': 'nadalus',
    'healthy': 'nasalun-at', 'sustainable': 'mapagtaginayon',
}

# ============================================================
# TRANSLATION ENGINE
# ============================================================

def extract_lang_dict(content, lang):
    """Extract key-value pairs for a language section from translations.js."""
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


def should_keep_as_is(text):
    """Check if text should be kept as-is (proper nouns, numbers, etc.)."""
    # Exact match in keep-as-is set
    if text in KEEP_AS_IS:
        return True
    # Check regex patterns
    for pattern in KEEP_PATTERNS:
        if re.match(pattern, text, re.IGNORECASE):
            return True
    return False


def translate_text(text, lang):
    """Translate a single text value to the target language."""
    if not text or not text.strip():
        return text

    # 1. Keep as-is check
    if should_keep_as_is(text):
        return text

    # 2. Exact sentence match
    sentences = FIL_SENTENCES if lang == 'fil' else ILO_SENTENCES
    if text in sentences:
        return sentences[text]

    # 3. Exact phrase match
    phrases = FIL_PHRASES if lang == 'fil' else ILO_PHRASES
    if text in phrases:
        return phrases[text]

    # 4. Check if it's a barangay name or proper noun (capitalized single/double word)
    if re.match(r'^[A-Z][a-z]+(\s+[A-Z][a-z]+)?$', text) and len(text.split()) <= 2:
        # Could be a proper noun - check if it's a known word
        lower = text.lower()
        word_map = FIL_WORD_MAP if lang == 'fil' else ILO_WORD_MAP
        if lower not in word_map:
            return text  # Keep proper nouns as-is

    # 5. Handle patterns with numbers/units that have text parts
    # e.g., "3-5 Working Days" -> translate "Working Days" part
    m = re.match(r'^([\d\-\+\.\,\s\₱\%]+)\s*(.+)$', text)
    if m:
        num_part = m.group(1).strip()
        text_part = m.group(2).strip()
        translated_text = translate_text(text_part, lang)
        if translated_text != text_part:
            return f"{num_part} {translated_text}"

    # 6. Handle "X per Y" patterns
    m = re.match(r'^(.+)\s+per\s+(.+)$', text, re.IGNORECASE)
    if m:
        part1 = translate_text(m.group(1), lang)
        part2 = translate_text(m.group(2), lang)
        connector = 'bawat' if lang == 'fil' else 'tunggal'
        return f"{part1} {connector} {part2}"

    # 7. Handle parenthetical content: "Main text (detail)"
    m = re.match(r'^(.+?)\s*\((.+)\)\s*$', text)
    if m:
        main = translate_text(m.group(1), lang)
        detail = translate_text(m.group(2), lang)
        return f"{main} ({detail})"

    # 8. Handle colon-separated: "Label: Value"
    m = re.match(r'^(.+?):\s*(.+)$', text)
    if m and not text.startswith('http'):
        label = translate_text(m.group(1), lang)
        value = m.group(2).strip()
        # Don't translate values that look like data (numbers, emails, etc.)
        if not re.match(r'^[\d\₱\$\.\,\-\+\%\s]+$', value) and '@' not in value:
            value = translate_text(value, lang)
        return f"{label}: {value}"

    # 9. Handle slash-separated options: "Option A / Option B"
    if ' / ' in text:
        parts = text.split(' / ')
        translated = [translate_text(p.strip(), lang) for p in parts]
        return ' / '.join(translated)

    # 10. Handle comma-separated lists
    if ', ' in text and len(text.split(', ')) >= 3:
        parts = text.split(', ')
        translated = [translate_text(p.strip(), lang) for p in parts]
        return ', '.join(translated)

    # 11. Word-by-word translation for longer text
    word_map = FIL_WORD_MAP if lang == 'fil' else ILO_WORD_MAP
    words = text.split()
    if len(words) >= 2:
        translated_words = []
        i = 0
        changed = False
        while i < len(words):
            word = words[i]
            # Try to match multi-word phrases first (2-3 words)
            matched = False
            for phrase_len in [3, 2]:
                if i + phrase_len <= len(words):
                    phrase = ' '.join(words[i:i+phrase_len])
                    if phrase in phrases:
                        translated_words.append(phrases[phrase])
                        i += phrase_len
                        matched = True
                        changed = True
                        break
                    if phrase in sentences:
                        translated_words.append(sentences[phrase])
                        i += phrase_len
                        matched = True
                        changed = True
                        break

            if not matched:
                # Single word lookup
                lower = word.lower().rstrip('.,;:!?')
                punct = ''
                if word and word[-1] in '.,;:!?':
                    punct = word[-1]
                    word_clean = word[:-1]
                else:
                    word_clean = word

                lower_clean = word_clean.lower()
                if lower_clean in word_map:
                    translated = word_map[lower_clean]
                    # Preserve capitalization
                    if word_clean[0].isupper() and translated[0].islower():
                        translated = translated[0].upper() + translated[1:]
                    if word_clean.isupper() and len(word_clean) > 1:
                        translated = translated.upper()
                    translated_words.append(translated + punct)
                    changed = True
                else:
                    translated_words.append(word)
                i += 1

        if changed:
            return ' '.join(translated_words)

    # 12. Single word lookup
    if len(words) == 1:
        word = text.strip()
        lower = word.lower().rstrip('.,;:!?')
        punct = ''
        if word and word[-1] in '.,;:!?':
            punct = word[-1]
            word_clean = word[:-1]
        else:
            word_clean = word

        lower_clean = word_clean.lower()
        word_map = FIL_WORD_MAP if lang == 'fil' else ILO_WORD_MAP
        if lower_clean in word_map:
            translated = word_map[lower_clean]
            if word_clean[0].isupper() and translated[0].islower():
                translated = translated[0].upper() + translated[1:]
            return translated + punct

    # 13. Fallback: return original
    return text

# ============================================================
# MAIN: Read, translate, write back
# ============================================================

def main():
    print("=" * 60)
    print("TRANSLATING REMAINING KEYS")
    print("=" * 60)

    with open(TRANSLATIONS_JS, 'r') as f:
        content = f.read()

    en, en_order = extract_lang_dict(content, 'en')
    fil, fil_order = extract_lang_dict(content, 'fil')
    ilo, ilo_order = extract_lang_dict(content, 'ilo')

    print(f"EN keys: {len(en)}")
    print(f"FIL keys: {len(fil)}")
    print(f"ILO keys: {len(ilo)}")

    # Find untranslated keys (where fil/ilo == en)
    untranslated = []
    for key in en:
        if fil.get(key) == en[key] or ilo.get(key) == en[key]:
            untranslated.append(key)

    print(f"\nUntranslated keys: {len(untranslated)}")

    # Translate
    fil_translated = 0
    ilo_translated = 0
    fil_kept = 0
    ilo_kept = 0

    for key in untranslated:
        en_val = en[key]

        # Translate Filipino
        if fil.get(key) == en_val:
            new_fil = translate_text(en_val, 'fil')
            if new_fil != en_val:
                fil[key] = new_fil
                fil_translated += 1
            else:
                fil_kept += 1

        # Translate Ilocano
        if ilo.get(key) == en_val:
            new_ilo = translate_text(en_val, 'ilo')
            if new_ilo != en_val:
                ilo[key] = new_ilo
                ilo_translated += 1
            else:
                ilo_kept += 1

    print(f"\nFIL translated: {fil_translated}, kept as-is: {fil_kept}")
    print(f"ILO translated: {ilo_translated}, kept as-is: {ilo_kept}")

    # Now rebuild the translations.js file
    # We need to replace the fil and ilo sections while preserving structure

    def build_lang_block(lang_dict, order, indent='        '):
        lines = []
        for i, key in enumerate(order):
            val = lang_dict.get(key, '')
            # Escape quotes in value
            escaped_val = val.replace('\\', '\\\\').replace('"', '\\"')
            comma = ',' if i < len(order) - 1 else ''
            lines.append(f'{indent}"{key}": "{escaped_val}"{comma}')
        return '\n'.join(lines)

    # Find and replace the fil block
    def replace_lang_block(content, lang, lang_dict, order):
        # Find the start of the language block
        pattern = rf'(\s*{lang}:\s*\{{)\n(.*?)(\n\s*\}})'
        
        # Build new block content
        new_block = build_lang_block(lang_dict, order)
        
        # Use a more robust approach: find start and end positions
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
            # Reconstruct
            new_lines = lines[:start_idx + 1]  # Include the opening line
            new_lines.append(new_block)
            new_lines.extend(lines[end_idx:])  # Include the closing brace line
            return '\n'.join(new_lines)
        
        return content

    print("\nRebuilding translations.js...")
    content = replace_lang_block(content, 'fil', fil, fil_order)
    content = replace_lang_block(content, 'ilo', ilo, ilo_order)

    with open(TRANSLATIONS_JS, 'w') as f:
        f.write(content)

    print("Done writing translations.js")

    # Verify
    with open(TRANSLATIONS_JS, 'r') as f:
        verify_content = f.read()

    new_en, _ = extract_lang_dict(verify_content, 'en')
    new_fil, _ = extract_lang_dict(verify_content, 'fil')
    new_ilo, _ = extract_lang_dict(verify_content, 'ilo')

    print(f"\nVerification:")
    print(f"  EN keys: {len(new_en)}")
    print(f"  FIL keys: {len(new_fil)}")
    print(f"  ILO keys: {len(new_ilo)}")

    # Count remaining untranslated
    still_untranslated_fil = sum(1 for k in new_en if new_fil.get(k) == new_en[k])
    still_untranslated_ilo = sum(1 for k in new_en if new_ilo.get(k) == new_en[k])
    print(f"  FIL still untranslated: {still_untranslated_fil}")
    print(f"  ILO still untranslated: {still_untranslated_ilo}")

    # Show some examples of what was translated
    print(f"\n--- Sample translations ---")
    count = 0
    for key in untranslated[:30]:
        en_val = new_en.get(key, '')
        fil_val = new_fil.get(key, '')
        ilo_val = new_ilo.get(key, '')
        if fil_val != en_val or ilo_val != en_val:
            print(f"  {key}:")
            print(f"    EN:  {en_val[:70]}")
            if fil_val != en_val:
                print(f"    FIL: {fil_val[:70]}")
            if ilo_val != en_val:
                print(f"    ILO: {ilo_val[:70]}")
            count += 1
            if count >= 15:
                break


if __name__ == '__main__':
    main()
