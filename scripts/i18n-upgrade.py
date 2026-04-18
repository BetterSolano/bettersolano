#!/usr/bin/env python3
"""
Enterprise-grade i18n upgrade script for BetterSolano.
Phase 1: Scans all HTML files, adds data-i18n attributes to untranslated elements.
Phase 2: Generates Filipino (fil) and Ilocano (ilo) translation entries.
Phase 3: Updates translations.js with all new keys.
"""

import os
import re
import sys
from collections import OrderedDict

# ============================================================
# CONFIGURATION
# ============================================================

EXCLUDE_DIRS = {'dist', 'node_modules', 'react-app', '.git', '.github', '.vscode', '.next'}
TRANSLATIONS_JS_PATH = 'assets/js/translations.js'

# Tags whose text content can be directly replaced via textContent
LEAF_TAGS = {'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'button', 'label',
             'th', 'td', 'li', 'dt', 'dd', 'figcaption', 'strong', 'em', 'summary'}

# Content patterns to skip (not translatable)
SKIP_CONTENT_PATTERNS = [
    r'^[\d\.\,\%\₱\s\-\(\)\+\/\:\;\#\&]+$',
    r'^(AM|PM|hrs?|min|sec|km²?|PHT)$',
    r'^Ver\.\s',
    r'^\d{4}$',
    r'^©',
    r'^https?://',
    r'^\s*$',
    r'^[\d\s\-\(\)\+]+$',
    r'^₱[\d\,\.]+',
    r'^\d+°[CF]$',
    r'^--',
    r'^\d+\s*(sq\.?\s*km|hectares?|ha)$',
    r'^(Police|MSWDO|Fire|DILG|MDRRMO|R2TMC):\s*\d',  # Hotline labels with numbers
    r'^0\d{3}\s',  # Phone numbers starting with 0
    r'^\d{1,2}:\d{2}',  # Time patterns
    r'^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)',  # Day abbreviations in schedules
    r'^(Lunes|Martes|Miyerkules|Huwebes|Biyernes)',  # Filipino days
    r'^[A-Z]{2,5}$',  # Pure acronyms
    r'^(CTC|RSBSA|PSA|LGU|DPWH|MSWDO|SEEDO|MDRRMO|DILG|BIR|DTI|SEC|NBI|PNP)$',
    r'^(img|src|href|class|id|style|data-)',  # Attribute-like content
]

# Classes that indicate non-translatable elements
SKIP_CLASSES_PATTERNS = [
    'footer-version', 'footer-social', 'footer-partner',
    'lang-btn', 'lang-selector', 'header-actions',
    'rate-display', 'weather-temp', 'date-value', 'time-value', 'time-label',
    'rate-rotator', 'weather-location',
]


# ============================================================
# FILE-TO-PREFIX MAPPING
# ============================================================

FILE_PREFIX_MAP = {
    'index.html': 'home',
    '403.html': 'err403',
    '404.html': 'err404',
    '500.html': 'err500',
    'offline.html': 'offline',
    'accessibility/index.html': 'a11y',
    'budget/index.html': 'budget',
    'contact/index.html': 'contact',
    'faq/index.html': 'faq',
    'government/index.html': 'gov',
    'government/officials.html': 'officials',
    'legislative/index.html': 'leg',
    'legislative/ordinance-framework.html': 'ord',
    'legislative/resolution-framework.html': 'reso',
    'news/index.html': 'news',
    'privacy/index.html': 'privacy',
    'terms/index.html': 'terms',
    'sitemap/index.html': 'sitemap',
    'statistics/index.html': 'stats',
    'services/index.html': 'svc',
    'services/certificates.html': 'cert',
    'services/business.html': 'biz',
    'services/tax-payments.html': 'tax',
    'services/social-services.html': 'social',
    'services/health.html': 'health',
    'services/agriculture.html': 'agri',
    'services/infrastructure.html': 'infra',
    'services/education.html': 'edu',
    'services/public-safety.html': 'safety',
    'services/environment.html': 'env',
    'service-details/birth-certificate.html': 'bc',
    'service-details/death-certificate.html': 'dc',
    'service-details/marriage-certificate.html': 'mc',
    'service-details/business-permits-licensing.html': 'bpl',
    'service-details/civil-registrar.html': 'cr',
    'service-details/general-services.html': 'gs',
    'service-details/human-resource-management.html': 'hrm',
    'service-details/mswdo-services.html': 'mswdosvc',
    'service-details/mswdo.html': 'mswdo',
    'service-details/municipal-accounting.html': 'acct',
    'service-details/municipal-agriculture.html': 'magri',
    'service-details/municipal-assessor.html': 'assessor',
    'service-details/municipal-budget.html': 'mbudget',
    'service-details/municipal-civil-registrar.html': 'mcr',
    'service-details/municipal-engineering.html': 'eng',
    'service-details/municipal-general-services.html': 'mgs',
    'service-details/municipal-planning.html': 'mpdo',
    'service-details/municipal-treasurer.html': 'treas',
    'service-details/property-declaration.html': 'propdec',
    'service-details/seedo-public-market.html': 'market',
    'service-details/seedo-slaughterhouse.html': 'slaughter',
    'service-details/tricycle-franchising.html': 'tricycle',
}

# ============================================================
# COMPREHENSIVE FILIPINO TRANSLATIONS
# ============================================================

FIL_TRANSLATIONS = {
    # Navigation & Common UI
    "Home": "Tahanan",
    "Services": "Mga Serbisyo",
    "Government": "Pamahalaan",
    "Statistics": "Estadistika",
    "Legislative": "Lehislatura",
    "Transparency": "Transparensiya",
    "Contact": "Makipag-ugnayan",
    "Budget": "Badyet",
    "News": "Balita",
    "FAQ": "Mga Madalas Itanong",
    "Sitemap": "Mapa ng Site",
    "Privacy": "Pagkapribado",
    "Terms": "Mga Tuntunin",
    "Accessibility": "Aksesibilidad",
    "Search": "Maghanap",
    "Back to Home": "Bumalik sa Tahanan",
    "Go Back": "Bumalik",
    "Skip to main content": "Lumaktaw sa pangunahing nilalaman",
    "View All": "Tingnan Lahat",
    "View More": "Tingnan Pa",
    "Read More": "Basahin Pa",
    "Learn More": "Alamin Pa",
    "Download": "I-download",
    "Submit": "Isumite",
    "Close": "Isara",
    "Open": "Buksan",
    "Loading...": "Naglo-load...",
    "Loading": "Naglo-load",

    # Service-related common terms
    "Processing": "Pagproseso",
    "Fee": "Bayad",
    "Fees": "Mga Bayad",
    "Who Can Apply": "Sino ang Maaaring Mag-apply",
    "Appointment": "Appointment",
    "Walk-in": "Walk-in",
    "Requirements": "Mga Kinakailangan",
    "Step-by-Step Process": "Prosesong Hakbang-hakbang",
    "Frequently Asked Questions": "Mga Madalas Itanong",
    "Office": "Opisina",
    "Location": "Lokasyon",
    "Office Hours": "Oras ng Opisina",
    "Important Notes": "Mahahalagang Paalala",
    "Downloadable Resources": "Mga Nada-download na Mapagkukunan",
    "Office Personnel": "Mga Tauhan ng Opisina",
    "Form Type": "Uri ng Form",
    "Related Services": "Mga Kaugnay na Serbisyo",
    "Contact Information": "Impormasyon sa Pakikipag-ugnayan",
    "Quick Links": "Mga Mabilisang Link",
    "All Services": "Lahat ng Serbisyo",
    "Officials": "Mga Opisyal",
    "Contact Us": "Makipag-ugnayan sa Amin",
    "Certificates": "Mga Sertipiko",
    "Business": "Negosyo",
    "Tax Payments": "Pagbabayad ng Buwis",
    "Social Services": "Serbisyong Panlipunan",
    "Health": "Kalusugan",
    "Agriculture": "Agrikultura",
    "Infrastructure": "Imprastraktura",
    "Education": "Edukasyon",
    "Public Safety": "Kaligtasang Pampubliko",
    "Environment": "Kapaligiran",
    "Ordinance Framework": "Balangkas ng Ordinansa",
    "Resolution Framework": "Balangkas ng Resolusyon",
    "Owner/Representative": "May-ari/Kinatawan",
    "Valid government-issued ID (original + photocopy)": "Balidong ID mula sa pamahalaan (orihinal + photocopy)",
    "Authorization letter signed by the owner": "Liham ng awtorisasyon na nilagdaan ng may-ari",
    "Valid ID of the owner (photocopy)": "Balidong ID ng may-ari (photocopy)",
    "Valid ID of the representative (original + photocopy)": "Balidong ID ng kinatawan (orihinal + photocopy)",

    # Service detail common terms
    "Check Eligibility": "Suriin ang Pagiging Kwalipikado",
    "Prepare Documents": "Ihanda ang mga Dokumento",
    "Fill Out Request Form": "Punan ang Form ng Kahilingan",
    "Pay the Fee": "Magbayad ng Bayarin",
    "Claim Certificate": "Kunin ang Sertipiko",
    "If You Are the Owner": "Kung Ikaw ang May-ari",
    "If You Are a Representative": "Kung Ikaw ay Kinatawan",
    "Documents needed for your application": "Mga dokumentong kailangan para sa iyong aplikasyon",
    "Follow these steps to request your birth certificate": "Sundin ang mga hakbang na ito upang humiling ng iyong sertipiko ng kapanganakan",
    "Follow these steps to request your death certificate": "Sundin ang mga hakbang na ito upang humiling ng iyong sertipiko ng kamatayan",
    "Follow these steps to request your marriage certificate": "Sundin ang mga hakbang na ito upang humiling ng iyong sertipiko ng kasal",
    "Visit Civil Registrar": "Pumunta sa Civil Registrar",
    "Municipal Civil Registrar": "Tagapagrehistro Sibil ng Munisipalidad",
    "Municipal Treasurer": "Ingat-yaman ng Munisipalidad",
    "Municipal Mayor": "Punong Bayan",
    "Municipal Vice Mayor": "Bise Punong Bayan",
    "Municipal Hall": "Munisipyo",
    "Sangguniang Bayan": "Sangguniang Bayan",

    # Government page
    "Elected Officials": "Mga Halal na Opisyal",
    "Executive Branch": "Ehekutibong Sangay",
    "Legislative Branch": "Sangay ng Lehislatura",
    "Municipal Council": "Konseho ng Munisipalidad",
    "Sangguniang Bayan Members": "Mga Miyembro ng Sangguniang Bayan",
    "Department Heads": "Mga Pinuno ng Departamento",

    # Budget/Transparency
    "Statement of Receipts and Expenditures": "Pahayag ng mga Resibo at Gastusin",
    "Infrastructure Investments": "Mga Pamumuhunan sa Imprastraktura",
    "Income Sources": "Mga Pinagmumulan ng Kita",
    "Expenditure Allocation": "Alokasyon ng Gastusin",
    "Annual Budget": "Taunang Badyet",
    "Fiscal Year": "Taon ng Piskal",
    "Total Revenue": "Kabuuang Kita",
    "Total Expenditure": "Kabuuang Gastusin",

    # Statistics
    "Population": "Populasyon",
    "Land Area": "Lawak ng Lupa",
    "Population Density": "Densidad ng Populasyon",
    "Households": "Mga Sambahayan",
    "Growth Rate": "Rate ng Paglaki",
    "Demographics Overview": "Pangkalahatang Demograpiya",
    "Economic Indicators": "Mga Tagapagpahiwatig ng Ekonomiya",
    "Population by Barangay": "Populasyon Ayon sa Barangay",
    "Barangays": "Mga Barangay",
    "Municipality": "Munisipalidad",
    "Income Classification": "Klasipikasyon ng Kita",

    # Privacy/Terms common
    "Introduction": "Panimula",
    "Legal Basis for Processing": "Legal na Batayan para sa Pagproseso",
    "Information We Collect": "Impormasyong Kinokolekta Namin",
    "How We Use Your Information": "Paano Namin Ginagamit ang Iyong Impormasyon",
    "Cookies and Analytics": "Cookies at Analytics",
    "Data Sharing and Disclosure": "Pagbabahagi at Pagsisiwalat ng Data",
    "Data Security": "Seguridad ng Data",
    "Data Retention": "Pagpapanatili ng Data",
    "Your Rights under the Data Privacy Act": "Ang Iyong mga Karapatan sa ilalim ng Data Privacy Act",
    "Children's Privacy": "Pagkapribado ng mga Bata",
    "Changes to This Policy": "Mga Pagbabago sa Patakarang Ito",
    "Acceptance of Terms": "Pagtanggap ng mga Tuntunin",
    "Limitation of Liability": "Limitasyon ng Pananagutan",
    "User Responsibilities": "Mga Responsibilidad ng Gumagamit",
    "Governing Law": "Namamahalang Batas",
    "Website Availability": "Pagkakaroon ng Website",
    "Modifications to Terms": "Mga Pagbabago sa mga Tuntunin",
    "Privacy Policy": "Patakaran sa Pagkapribado",
    "Terms of Use": "Mga Tuntunin ng Paggamit",

    # Accessibility
    "Keyboard Navigation": "Nabigasyon sa Keyboard",
    "Screen Reader Support": "Suporta sa Screen Reader",
    "Text Alternatives": "Mga Alternatibong Teksto",
    "Color Contrast": "Contrast ng Kulay",
    "Responsive Design": "Responsive na Disenyo",
    "No Time Limits": "Walang Limitasyon sa Oras",
    "Accessibility Statement": "Pahayag ng Aksesibilidad",

    # Error pages
    "Access Forbidden": "Ipinagbabawal ang Pag-access",
    "Page Not Found": "Hindi Nahanap ang Pahina",
    "Server Error": "Error sa Server",
    "You are currently offline": "Kasalukuyan kang offline",
    "Return to Homepage": "Bumalik sa Homepage",
    "The page you are looking for could not be found.": "Hindi mahanap ang pahina na hinahanap mo.",
    "Sorry, you don't have permission to access this page.": "Paumanhin, wala kang pahintulot na i-access ang pahinang ito.",
    "Something went wrong on our end.": "May nangyaring mali sa aming panig.",

    # Footer
    "Resources": "Mga Mapagkukunan",
    "Volunteer with us": "Mag-volunteer sa amin",
    "Contribute code with us": "Mag-ambag ng code sa amin",
    "Solano Quiz": "Solano Quiz",

    # Common descriptive text
    "Phone": "Telepono",
    "Email": "Email",
    "Address": "Adres",
    "Mobile": "Mobile",
    "Fax": "Fax",
    "Schedule": "Iskedyul",
    "Status": "Katayuan",
    "Date": "Petsa",
    "Time": "Oras",
    "Name": "Pangalan",
    "Position": "Posisyon",
    "Description": "Paglalarawan",
    "Category": "Kategorya",
    "Type": "Uri",
    "Number": "Numero",
    "Title": "Pamagat",
    "Year": "Taon",
    "Total": "Kabuuan",
    "Amount": "Halaga",
    "Percentage": "Porsyento",
    "Source": "Pinagmulan",
    "Notes": "Mga Tala",
    "Details": "Mga Detalye",
    "Summary": "Buod",
    "Overview": "Pangkalahatang-ideya",
    "Purpose": "Layunin",
    "Validity": "Bisa",
    "Duration": "Tagal",
    "Deadline": "Deadline",
    "Free": "Libre",
    "Varies": "Nag-iiba",
    "Seasonal": "Pana-panahon",
    "Same Day": "Parehong Araw",
    "Instant": "Agad-agad",
}

# ============================================================
# COMPREHENSIVE ILOCANO TRANSLATIONS
# ============================================================

ILO_TRANSLATIONS = {
    # Navigation & Common UI
    "Home": "Pagtaengan",
    "Services": "Dagiti Serbisio",
    "Government": "Gobierno",
    "Statistics": "Estadistika",
    "Legislative": "Lehislatura",
    "Transparency": "Transparensiya",
    "Contact": "Kontaken",
    "Budget": "Badyet",
    "News": "Damag",
    "FAQ": "Dagiti Masansan a Maisaludsod",
    "Sitemap": "Mapa ti Site",
    "Privacy": "Pagkapribado",
    "Terms": "Dagiti Kondision",
    "Accessibility": "Aksesibilidad",
    "Search": "Agsapul",
    "Back to Home": "Agsubli iti Pagtaengan",
    "Go Back": "Agsubli",
    "Skip to main content": "Lumaktaw iti kangrunaan a linaon",
    "View All": "Kitaen Amin",
    "View More": "Kitaen Pay",
    "Read More": "Basaen Pay",
    "Learn More": "Ammuem Pay",
    "Download": "I-download",
    "Submit": "Iyulat",
    "Close": "Irikep",
    "Open": "Ilukatan",
    "Loading...": "Agkarkarga...",
    "Loading": "Agkarkarga",

    # Service-related common terms
    "Processing": "Panagproseso",
    "Fee": "Bayad",
    "Fees": "Dagiti Bayad",
    "Who Can Apply": "Sino ti Mabalin nga Ag-apply",
    "Appointment": "Appointment",
    "Walk-in": "Walk-in",
    "Requirements": "Dagiti Kasapulan",
    "Step-by-Step Process": "Proseso nga Addang-addang",
    "Frequently Asked Questions": "Dagiti Masansan a Maisaludsod",
    "Office": "Opisina",
    "Location": "Lokasion",
    "Office Hours": "Oras ti Opisina",
    "Important Notes": "Napateg a Paammo",
    "Downloadable Resources": "Dagiti Mai-download a Rekurso",
    "Office Personnel": "Dagiti Tauhan ti Opisina",
    "Form Type": "Kita ti Form",
    "Related Services": "Dagiti Mainaig a Serbisio",
    "Contact Information": "Impormasion ti Panagkontak",
    "Quick Links": "Dagiti Napartak a Silpo",
    "All Services": "Amin a Serbisio",
    "Officials": "Dagiti Opisial",
    "Contact Us": "Kontaken Dakami",
    "Certificates": "Dagiti Sertipiko",
    "Business": "Negosio",
    "Tax Payments": "Panagbayad ti Buwis",
    "Social Services": "Serbisio Sosyal",
    "Health": "Salun-at",
    "Agriculture": "Agrikultura",
    "Infrastructure": "Imprastraktura",
    "Education": "Edukasion",
    "Public Safety": "Kaligtasan Pampubliko",
    "Environment": "Aglawlaw",
    "Ordinance Framework": "Balangkas ti Ordinansa",
    "Resolution Framework": "Balangkas ti Resolusion",
    "Owner/Representative": "Akinkukua/Pannakabagi",
    "Valid government-issued ID (original + photocopy)": "Balido nga ID manipud iti gobierno (orihinal + photocopy)",
    "Authorization letter signed by the owner": "Surat ti awtorisasion a pinirmaan ti akinkukua",
    "Valid ID of the owner (photocopy)": "Balido nga ID ti akinkukua (photocopy)",
    "Valid ID of the representative (original + photocopy)": "Balido nga ID ti pannakabagi (orihinal + photocopy)",

    # Service detail common terms
    "Check Eligibility": "Kitaen ti Kualipikasion",
    "Prepare Documents": "Isaganam dagiti Dokumento",
    "Fill Out Request Form": "Punnuam ti Form ti Dawat",
    "Pay the Fee": "Bayadan ti Bayad",
    "Claim Certificate": "Alaen ti Sertipiko",
    "If You Are the Owner": "No Sika ti Akinkukua",
    "If You Are a Representative": "No Sika ti Pannakabagi",
    "Documents needed for your application": "Dagiti dokumento a kasapulan para iti aplikasionmo",
    "Follow these steps to request your birth certificate": "Suroten dagitoy nga addang tapno agdawat ti sertipiko ti pannakayanak",
    "Follow these steps to request your death certificate": "Suroten dagitoy nga addang tapno agdawat ti sertipiko ti ipapatay",
    "Follow these steps to request your marriage certificate": "Suroten dagitoy nga addang tapno agdawat ti sertipiko ti kasar",
    "Visit Civil Registrar": "Bisitaen ti Civil Registrar",
    "Municipal Civil Registrar": "Civil Registrar ti Munisipalidad",
    "Municipal Treasurer": "Tesorero ti Munisipalidad",
    "Municipal Mayor": "Mayor ti Munisipalidad",
    "Municipal Vice Mayor": "Bise Mayor ti Munisipalidad",
    "Municipal Hall": "Munisipio",
    "Sangguniang Bayan": "Sangguniang Bayan",

    # Government page
    "Elected Officials": "Dagiti Nahalal nga Opisial",
    "Executive Branch": "Ehekutibo a Sanga",
    "Legislative Branch": "Sanga ti Lehislatura",
    "Municipal Council": "Konseho ti Munisipalidad",
    "Sangguniang Bayan Members": "Dagiti Kameng ti Sangguniang Bayan",
    "Department Heads": "Dagiti Pangulo ti Departamento",

    # Budget/Transparency
    "Statement of Receipts and Expenditures": "Pahayag dagiti Resibo ken Gastos",
    "Infrastructure Investments": "Dagiti Pamumuhunan iti Imprastraktura",
    "Income Sources": "Dagiti Pagtaudan ti Kita",
    "Expenditure Allocation": "Alokasion ti Gastos",
    "Annual Budget": "Tinawen a Badyet",
    "Fiscal Year": "Tawen ti Piskal",
    "Total Revenue": "Dagup a Kita",
    "Total Expenditure": "Dagup a Gastos",

    # Statistics
    "Population": "Populasion",
    "Land Area": "Kalawa ti Daga",
    "Population Density": "Densidad ti Populasion",
    "Households": "Dagiti Sangakabbalayan",
    "Growth Rate": "Rate ti Panagdakkel",
    "Demographics Overview": "Pangkabuklan a Demograpiya",
    "Economic Indicators": "Dagiti Pagilasinan ti Ekonomiya",
    "Population by Barangay": "Populasion Sigun iti Barangay",
    "Barangays": "Dagiti Barangay",
    "Municipality": "Munisipalidad",
    "Income Classification": "Klasipikasion ti Kita",

    # Privacy/Terms common
    "Introduction": "Pangyuna",
    "Legal Basis for Processing": "Legal a Batayan para iti Panagproseso",
    "Information We Collect": "Impormasion a Kolektaen Mi",
    "How We Use Your Information": "Kasano Mi a Usaren ti Impormasionmo",
    "Cookies and Analytics": "Cookies ken Analytics",
    "Data Sharing and Disclosure": "Panagibingay ken Panagisiwalat ti Datos",
    "Data Security": "Seguridad ti Datos",
    "Data Retention": "Panagtaginayon ti Datos",
    "Your Rights under the Data Privacy Act": "Dagiti Karbenganmo iti sidong ti Data Privacy Act",
    "Children's Privacy": "Pagkapribado dagiti Ubbing",
    "Changes to This Policy": "Dagiti Panagbaliw iti Daytoy a Pagannurotan",
    "Acceptance of Terms": "Panangawat kadagiti Kondision",
    "Limitation of Liability": "Limitasion ti Responsabilidad",
    "User Responsibilities": "Dagiti Responsabilidad ti Agus-usar",
    "Governing Law": "Mangituray a Linteg",
    "Website Availability": "Pannakagun-od ti Website",
    "Modifications to Terms": "Dagiti Panagbaliw kadagiti Kondision",
    "Privacy Policy": "Pagannurotan ti Pagkapribado",
    "Terms of Use": "Dagiti Kondision ti Panagusar",

    # Accessibility
    "Keyboard Navigation": "Nabigasion ti Keyboard",
    "Screen Reader Support": "Suporta ti Screen Reader",
    "Text Alternatives": "Dagiti Alternatibo a Teksto",
    "Color Contrast": "Kontraste ti Kolor",
    "Responsive Design": "Responsive a Disenio",
    "No Time Limits": "Awan Limitasion ti Tiempo",
    "Accessibility Statement": "Pahayag ti Aksesibilidad",

    # Error pages
    "Access Forbidden": "Maiparit ti Panag-akses",
    "Page Not Found": "Saan a Nasarakan ti Panid",
    "Server Error": "Error ti Server",
    "You are currently offline": "Offline ka ita",
    "Return to Homepage": "Agsubli iti Homepage",
    "The page you are looking for could not be found.": "Saan a nasarakan ti panid a sapulem.",
    "Sorry, you don't have permission to access this page.": "Dispensar, awan ti pammalubosmo nga ag-akses iti daytoy a panid.",
    "Something went wrong on our end.": "Adda napasamak a di umiso iti bangir mi.",

    # Footer
    "Resources": "Dagiti Rekurso",
    "Volunteer with us": "Ag-volunteer kadakami",
    "Contribute code with us": "Ag-ambag ti code kadakami",
    "Solano Quiz": "Solano Quiz",

    # Common descriptive text
    "Phone": "Telepono",
    "Email": "Email",
    "Address": "Adres",
    "Mobile": "Mobile",
    "Fax": "Fax",
    "Schedule": "Iskedyul",
    "Status": "Kasasaad",
    "Date": "Petsa",
    "Time": "Tiempo",
    "Name": "Nagan",
    "Position": "Posision",
    "Description": "Deskripsion",
    "Category": "Kategorya",
    "Type": "Kita",
    "Number": "Numero",
    "Title": "Titulo",
    "Year": "Tawen",
    "Total": "Dagup",
    "Amount": "Gatad",
    "Percentage": "Porsiento",
    "Source": "Pagtaudan",
    "Notes": "Dagiti Nota",
    "Details": "Dagiti Detalye",
    "Summary": "Pakabuklan",
    "Overview": "Pangkabuklan",
    "Purpose": "Panggep",
    "Validity": "Kinabigbig",
    "Duration": "Kaatiddog",
    "Deadline": "Deadline",
    "Free": "Libre",
    "Varies": "Agdumaduma",
    "Seasonal": "Panawen",
    "Same Day": "Iti isu met laeng nga aldaw",
    "Instant": "Dagus",
}

# ============================================================
# HELPER FUNCTIONS
# ============================================================

def should_skip_content(text):
    """Check if text content should be skipped."""
    text = normalize_text(text)
    if not text or len(text) < 2:
        return True
    for pattern in SKIP_CONTENT_PATTERNS:
        if re.match(pattern, text):
            return True
    return False

def should_skip_by_class(class_attr):
    """Check if element should be skipped based on class."""
    if not class_attr:
        return False
    for skip in SKIP_CLASSES_PATTERNS:
        if skip in class_attr:
            return True
    return False

def normalize_text(text):
    """Normalize whitespace in text content (collapse newlines/spaces)."""
    return re.sub(r'\s+', ' ', text).strip()

def normalize_key(text, prefix=''):
    """Generate a translation key from text content."""
    clean = normalize_text(text).lower()
    clean = re.sub(r'[^a-z0-9\s]', '', clean)
    clean = re.sub(r'\s+', '-', clean.strip())
    if len(clean) > 50:
        clean = clean[:50].rsplit('-', 1)[0]
    if not clean:
        return ''
    if prefix:
        return f"{prefix}-{clean}"
    return clean

def get_file_prefix(filepath):
    """Get the prefix for translation keys based on file path."""
    rel = filepath.lstrip('./')
    if rel in FILE_PREFIX_MAP:
        return FILE_PREFIX_MAP[rel]
    base = os.path.splitext(os.path.basename(rel))[0]
    if base == 'index':
        base = os.path.basename(os.path.dirname(rel))
    return base.replace('-', '')[:8]

def get_existing_translations(translations_js_path):
    """Parse all existing translations from translations.js."""
    with open(translations_js_path, 'r', encoding='utf-8') as f:
        content = f.read()
    result = {}
    for lang in ['en', 'fil', 'ilo']:
        pattern = rf'{lang}:\s*\{{(.*?)\n    \}}'
        match = re.search(pattern, content, re.DOTALL)
        if match:
            pairs = re.findall(r'"([^"]+)":\s*"((?:[^"\\]|\\.)*)"', match.group(1))
            result[lang] = OrderedDict(pairs)
    return result

def strip_head_and_scripts(content):
    """Return a set of character ranges that are inside <head>, <script>, <style>, or HTML comments."""
    excluded = set()
    # Mark <head>...</head> ranges
    for m in re.finditer(r'<head[\s>].*?</head>', content, re.DOTALL | re.IGNORECASE):
        excluded.update(range(m.start(), m.end()))
    # Mark <script>...</script> ranges
    for m in re.finditer(r'<script[\s>].*?</script>', content, re.DOTALL | re.IGNORECASE):
        excluded.update(range(m.start(), m.end()))
    # Mark <style>...</style> ranges
    for m in re.finditer(r'<style[\s>].*?</style>', content, re.DOTALL | re.IGNORECASE):
        excluded.update(range(m.start(), m.end()))
    # Mark HTML comments
    for m in re.finditer(r'<!--.*?-->', content, re.DOTALL):
        excluded.update(range(m.start(), m.end()))
    return excluded

def is_in_excluded_zone(pos, excluded_ranges):
    """Check if a position is inside an excluded zone."""
    return pos in excluded_ranges

# ============================================================
# MAIN PROCESSING LOGIC
# ============================================================

def find_html_files():
    """Find all HTML files to process."""
    html_files = []
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in files:
            if f.endswith('.html') and not f.endswith('.backup'):
                html_files.append(os.path.join(root, f))
    return sorted(html_files)

def process_file(filepath, existing_keys, new_translations):
    """Process a single HTML file: add data-i18n attributes."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    prefix = get_file_prefix(filepath)
    excluded = strip_head_and_scripts(content)
    changes = 0

    # Pass 1: Leaf elements with pure text (no child elements)
    for tag in LEAF_TAGS:
        pattern = rf'(<{tag}(\s[^>]*)?>)((?:(?!<{tag}[\s>]).)*?)(</{tag}>)'

        def make_replacer(tag_name):
            def replacer(match):
                nonlocal changes, content
                open_tag = match.group(1)
                attrs = match.group(2) or ''
                inner = match.group(3)
                close_tag = match.group(4)

                # Skip if in excluded zone
                if match.start() in excluded:
                    return match.group(0)

                # Skip if already has data-i18n
                if 'data-i18n' in open_tag:
                    return match.group(0)

                # Skip by class
                class_match = re.search(r'class="([^"]*)"', open_tag)
                if class_match and should_skip_by_class(class_match.group(1)):
                    return match.group(0)

                # Skip if has child elements (except <i> icons)
                has_children = re.search(r'<(?!i\s|/i>|br\s*/?)[a-zA-Z]', inner)
                if has_children:
                    return match.group(0)

                # Extract text (strip icon tags)
                text = re.sub(r'<i\s[^>]*></i>', '', inner).strip()
                text = re.sub(r'<br\s*/?>', ' ', text).strip()

                if not text or should_skip_content(text):
                    return match.group(0)

                # Skip onclick handlers
                if 'onclick=' in open_tag:
                    return match.group(0)

                # Skip hotline items (contain phone numbers)
                if 'hotline-item' in (class_match.group(1) if class_match else ''):
                    return match.group(0)

                # Skip breadcrumb current page (dynamic)
                if 'aria-current' in open_tag:
                    return match.group(0)

                # Generate key
                key = normalize_key(text, prefix)
                if not key or len(key) < 3:
                    return match.group(0)

                # Handle icon + text: wrap text in span
                has_icon = re.search(r'<i\s[^>]*></i>', inner)
                if has_icon:
                    # Don't add data-i18n to parent, wrap text in span
                    icon_part = re.search(r'(<i\s[^>]*></i>)', inner).group(1)
                    text_part = re.sub(r'<i\s[^>]*></i>\s*', '', inner).strip()

                    if not text_part or should_skip_content(text_part):
                        return match.group(0)

                    key = normalize_key(text_part, prefix)
                    if not key or len(key) < 3:
                        return match.group(0)

                    _register_key(key, text_part, existing_keys, new_translations)
                    changes += 1
                    return f'{open_tag}{icon_part} <span data-i18n="{key}">{text_part}</span>{close_tag}'

                # Simple text element
                _register_key(key, text, existing_keys, new_translations)
                new_open = open_tag[:-1] + f' data-i18n="{key}">'
                changes += 1
                return new_open + inner + close_tag

            return replacer

        content = re.sub(pattern, make_replacer(tag), content, flags=re.DOTALL)

    # Pass 2: <a> tags with pure text (special handling - skip nav links that already have i18n)
    a_pattern = r'(<a(\s[^>]*)?>)((?:(?!<a[\s>]).)*?)(</a>)'

    def a_replacer(match):
        nonlocal changes
        open_tag = match.group(1)
        attrs = match.group(2) or ''
        inner = match.group(3)
        close_tag = match.group(4)

        if match.start() in excluded:
            return match.group(0)
        if 'data-i18n' in open_tag:
            return match.group(0)

        class_match = re.search(r'class="([^"]*)"', open_tag)
        if class_match and should_skip_by_class(class_match.group(1)):
            return match.group(0)

        # Skip links with child elements (images, icons+text combos, etc.)
        has_children = re.search(r'<(?!i\s|/i>|br\s*/?|span\s)[a-zA-Z]', inner)
        if has_children:
            return match.group(0)

        # If has icon, handle icon+text
        has_icon = re.search(r'<i\s[^>]*></i>', inner)
        if has_icon:
            text = re.sub(r'<i\s[^>]*></i>', '', inner).strip()
            text = re.sub(r'<span[^>]*>|</span>', '', text).strip()
        else:
            # Check for span children
            span_match = re.search(r'<span[^>]*>(.*?)</span>', inner)
            if span_match:
                return match.group(0)  # Has span children, skip
            text = inner.strip()

        if not text or should_skip_content(text):
            return match.group(0)

        # Skip external links with full URLs as text
        if text.startswith('http') or text.startswith('www.'):
            return match.group(0)

        key = normalize_key(text, prefix)
        if not key or len(key) < 3:
            return match.group(0)

        if has_icon:
            icon_part = re.search(r'(<i\s[^>]*></i>)', inner).group(1)
            _register_key(key, text, existing_keys, new_translations)
            changes += 1
            return f'{open_tag}{icon_part} <span data-i18n="{key}">{text}</span>{close_tag}'

        _register_key(key, text, existing_keys, new_translations)
        new_open = open_tag[:-1] + f' data-i18n="{key}">'
        changes += 1
        return new_open + inner + close_tag

    content = re.sub(a_pattern, a_replacer, content, flags=re.DOTALL)

    return content, changes

def _register_key(key, text, existing_keys, new_translations):
    """Register a new translation key if it doesn't exist."""
    # Normalize text for storage (collapse whitespace)
    clean_text = normalize_text(text)
    
    if key in existing_keys:
        return key
    if key in new_translations:
        if new_translations[key]['en'] == clean_text:
            return key
        # Need unique key
        base_key = key
        counter = 2
        while key in existing_keys or (key in new_translations and new_translations[key]['en'] != clean_text):
            key = f"{base_key}-{counter}"
            counter += 1
        if key in existing_keys:
            return key

    fil_text = FIL_TRANSLATIONS.get(clean_text, clean_text)
    ilo_text = ILO_TRANSLATIONS.get(clean_text, clean_text)
    new_translations[key] = {
        'en': clean_text,
        'fil': fil_text,
        'ilo': ilo_text,
    }
    return key

def update_translations_js(translations_js_path, new_translations, existing):
    """Update translations.js with new translation entries."""
    with open(translations_js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if not new_translations:
        print("  No new translations to add.")
        return

    for lang in ['en', 'fil', 'ilo']:
        new_entries = []
        for key, trans in sorted(new_translations.items()):
            if key not in existing.get(lang, {}):
                value = trans.get(lang, trans.get('en', key))
                value = value.replace('\\', '\\\\').replace('"', '\\"')
                new_entries.append(f'        "{key}": "{value}"')

        if not new_entries:
            continue

        # Find the closing of this language section
        lang_pattern = rf'({lang}:\s*\{{.*?)((\n    \}}[,\s]))'
        match = re.search(lang_pattern, content, re.DOTALL)
        if match:
            insert_point = match.start(2)
            new_block = ',\n\n        // === Auto-generated i18n keys ===\n'
            new_block += ',\n'.join(new_entries)
            new_block += '\n'
            content = content[:insert_point] + new_block + content[insert_point:]

    with open(translations_js_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  Added {len(new_translations)} new keys to translations.js")

def main():
    """Main entry point."""
    print("=" * 60)
    print("BetterSolano i18n Upgrade Script")
    print("=" * 60)

    # Phase 0: Load existing translations
    print("\n[Phase 0] Loading existing translations...")
    existing = get_existing_translations(TRANSLATIONS_JS_PATH)
    existing_keys = set(existing.get('en', {}).keys())
    print(f"  Existing keys: {len(existing_keys)}")

    # Phase 1: Scan and tag HTML files
    print("\n[Phase 1] Scanning and tagging HTML files...")
    html_files = find_html_files()
    print(f"  Found {len(html_files)} HTML files")

    new_translations = OrderedDict()
    total_changes = 0

    for filepath in html_files:
        modified, changes = process_file(filepath, existing_keys, new_translations)
        if changes > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(modified)
            print(f"  {filepath}: +{changes} i18n attributes")
        total_changes += changes

    print(f"\n  Total data-i18n attributes added: {total_changes}")
    print(f"  Total new translation keys: {len(new_translations)}")

    # Phase 2: Update translations.js
    print("\n[Phase 2] Updating translations.js...")
    update_translations_js(TRANSLATIONS_JS_PATH, new_translations, existing)

    # Phase 3: Summary
    untranslated_fil = sum(1 for k, v in new_translations.items() if v['fil'] == v['en'])
    untranslated_ilo = sum(1 for k, v in new_translations.items() if v['ilo'] == v['en'])
    translated_fil = len(new_translations) - untranslated_fil
    translated_ilo = len(new_translations) - untranslated_ilo

    print(f"\n[Phase 3] Summary")
    print(f"  New i18n attributes: {total_changes}")
    print(f"  New translation keys: {len(new_translations)}")
    print(f"  Filipino translated: {translated_fil}/{len(new_translations)}")
    print(f"  Ilocano translated: {translated_ilo}/{len(new_translations)}")

    if untranslated_fil > 0:
        print(f"\n  {untranslated_fil} keys need Filipino translation")
        print(f"  {untranslated_ilo} keys need Ilocano translation")

    print("\n" + "=" * 60)
    print("Done!")
    print("=" * 60)

if __name__ == '__main__':
    main()
