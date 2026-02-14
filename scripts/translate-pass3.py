#!/usr/bin/env python3
"""
Pass 3: Comprehensive sentence-level translation for all remaining
and badly-translated keys. Uses full sentence dictionaries plus
pattern-based translation for systematic content.

Also detects and replaces ~732 bad mixed-language translations from Pass 1.
"""

import re
import sys

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
# COMPREHENSIVE FILIPINO TRANSLATIONS
# Every remaining English value mapped to proper Filipino
# ============================================================

FIL = {
    # Processing time patterns
    "Total processing time: 1 hour 13 minutes": "Kabuuang oras ng pagproseso: 1 oras 13 minuto",
    "Total processing time: 1 hour 20 minutes": "Kabuuang oras ng pagproseso: 1 oras 20 minuto",
    "Total processing time: 1 hour 30 minutes": "Kabuuang oras ng pagproseso: 1 oras 30 minuto",
    "Total processing time: 1 hour 5 minutes": "Kabuuang oras ng pagproseso: 1 oras 5 minuto",
    "Total processing time: 20 minutes": "Kabuuang oras ng pagproseso: 20 minuto",
    "Total processing time: 25 minutes": "Kabuuang oras ng pagproseso: 25 minuto",
    "Total processing time: 27 minutes": "Kabuuang oras ng pagproseso: 27 minuto",
    "Total processing time: 27-42 minutes": "Kabuuang oras ng pagproseso: 27-42 minuto",
    "Total processing time: 28 minutes": "Kabuuang oras ng pagproseso: 28 minuto",
    "Total processing time: 37 minutes": "Kabuuang oras ng pagproseso: 37 minuto",
    "Total processing time: 45 minutes": "Kabuuang oras ng pagproseso: 45 minuto",
    "Total processing time: 47 minutes": "Kabuuang oras ng pagproseso: 47 minuto",
    "Total processing time: 5 minutes": "Kabuuang oras ng pagproseso: 5 minuto",
    "Total processing time: 55 minutes": "Kabuuang oras ng pagproseso: 55 minuto",
    "Total processing time: 55 minutes to 1 hour (if complete)": "Kabuuang oras ng pagproseso: 55 minuto hanggang 1 oras (kung kumpleto)",
    "Total processing time: 9 minutes": "Kabuuang oras ng pagproseso: 9 minuto",
    "Total response time: 6 minutes (initial filing)": "Kabuuang oras ng pagtugon: 6 minuto (paunang paghahain)",
    "TOTAL RESPONSE TIME (Death at Home)": "KABUUANG ORAS NG PAGTUGON (Pagkamatay sa Bahay)",
    "Approximately 15 minutes for complete processing": "Humigit-kumulang 15 minuto para sa kumpletong pagproseso",
    "Approximately 38-53 minutes for complete processing": "Humigit-kumulang 38-53 minuto para sa kumpletong pagproseso",
    "Mon-Fri: 8:00 AM - 5:00 PM": "Lun-Biy: 8:00 AM - 5:00 PM",
}

FIL2 = {
    # Accounting Office
    "Certify Box A of Disbursement Voucher": "Sertipikahan ang Box A ng Disbursement Voucher",
    "Check releases are on scheduled dates": "Ang paglabas ng tseke ay sa mga naka-iskedyul na petsa",
    "Compute salaries, deductions (GSIS, PhilHealth, Pag-IBIG, taxes)": "Kalkulahin ang mga sahod, mga bawas (GSIS, PhilHealth, Pag-IBIG, mga buwis)",
    "Disbursement Voucher with complete supporting documents": "Disbursement Voucher na may kumpletong mga suportang dokumento",
    "DTR, Leave forms, OT authorization": "DTR, mga form ng Leave, awtorisasyon ng OT",
    "Financial reports are submitted monthly to COA": "Ang mga ulat pinansyal ay isinusumite buwan-buwan sa COA",
    "Gather and consolidate financial data from all funds": "Tipunin at pagsama-samahin ang datos pinansyal mula sa lahat ng pondo",
    "Gather source documents (DVs, ORs, JVs, etc.)": "Tipunin ang mga pinagmulang dokumento (DVs, ORs, JVs, atbp.)",
    "Post entries to General and Subsidiary Ledgers": "I-post ang mga entry sa General at Subsidiary Ledgers",
    "Pre-audit of disbursements, payroll preparation, check issuance, and financial reporting": "Pre-audit ng mga disbursement, paghahanda ng payroll, pagbibigay ng tseke, at pag-uulat pinansyal",
    "Pre-audit of disbursements, payroll, check issuance, and financial reporting": "Pre-audit ng mga disbursement, payroll, pagbibigay ng tseke, at pag-uulat pinansyal",
    "Prepare Financial Statements (Statement of Financial Position, Statement of Financial Performance)": "Ihanda ang mga Pahayag Pinansyal (Pahayag ng Kalagayang Pinansyal, Pahayag ng Pagganap Pinansyal)",
    "Prepare Journal Entry Vouchers (JEV)": "Ihanda ang mga Journal Entry Voucher (JEV)",
    "Receive and log disbursement voucher": "Tanggapin at itala ang disbursement voucher",
    "Receive order of payment (one day after date of submission)": "Tanggapin ang order ng pagbabayad (isang araw pagkatapos ng petsa ng pagsusumite)",
    "Recording of financial transactions and preparation of comprehensive financial statements": "Pagtatala ng mga transaksyong pinansyal at paghahanda ng komprehensibong mga pahayag pinansyal",
    "Preparation and submission of monthly financial reports to oversight agencies": "Paghahanda at pagsusumite ng buwanang mga ulat pinansyal sa mga ahensyang nangangasiwa",
    "Submit to COA, DBM, and other oversight agencies": "Isumite sa COA, DBM, at iba pang mga ahensyang nangangasiwa",
    "Checked/validated Obligation Request (ObR)": "Nasuri/napatunayan na Obligation Request (ObR)",
    "ObR duly signed by the Municipal Budget Officer": "ObR na wastong nilagdaan ng Municipal Budget Officer",
    "Processing of Obligation Request": "Pagproseso ng Obligation Request",
    "Processing of checks for approved disbursements and payments": "Pagproseso ng mga tseke para sa mga naaprubahang disbursement at pagbabayad",
    "Processing of salaries, wages, and other compensation for municipal employees": "Pagproseso ng mga sahod, suweldo, at iba pang kabayaran para sa mga empleyado ng munisipyo",
    "Processing of utility bills for payment": "Pagproseso ng mga bill ng utilidad para sa pagbabayad",
    "Processing of vacation leave, sick leave, and other leave types": "Pagproseso ng vacation leave, sick leave, at iba pang uri ng leave",
    "Processing time may vary depending on document completeness": "Ang oras ng pagproseso ay maaaring mag-iba depende sa pagkakumpleto ng dokumento",
    "Preparation and Issuance of Checks": "Paghahanda at Pagbibigay ng mga Tseke",
    "Preparation of Agency Procurement Request (APR)": "Paghahanda ng Agency Procurement Request (APR)",
    "Preparation of Social Case Study Report": "Paghahanda ng Ulat ng Social Case Study",
    "Preparation, Review and Endorsement of Barangay Budget": "Paghahanda, Pagsusuri at Pag-eendorso ng Badyet ng Barangay",
    "Preparation and Implementation of Special Education Fund Budget": "Paghahanda at Pagpapatupad ng Badyet ng Special Education Fund",
    "Preparation and signing of certificate": "Paghahanda at pagpirma ng sertipiko",

    # Civil Registry / Certificates
    "Registration of Live Birth": "Pagpaparehistro ng Kapanganakan",
    "Registration of birth for children born in Solano, Nueva Vizcaya": "Pagpaparehistro ng kapanganakan para sa mga batang ipinanganak sa Solano, Nueva Vizcaya",
    "Registration of death for persons who died in Solano, Nueva Vizcaya": "Pagpaparehistro ng pagkamatay para sa mga taong namatay sa Solano, Nueva Vizcaya",
    "Registration and issuance of death certificates": "Pagpaparehistro at pagbibigay ng mga sertipiko ng pagkamatay",
    "Register births and deaths within 30 days to avoid penalties": "Irehistro ang mga kapanganakan at pagkamatay sa loob ng 30 araw upang maiwasan ang mga multa",
    "Issuance of certified true copies and registration of births": "Pagbibigay ng mga sertipikadong tunay na kopya at pagpaparehistro ng mga kapanganakan",
    "Issuance and management of real property tax declarations": "Pagbibigay at pamamahala ng mga deklarasyon ng buwis sa tunay na ari-arian",
    "Issuance of Certificate of Employment": "Pagbibigay ng Sertipiko ng Trabaho",
    "Issuance of Certificate of Indigency": "Pagbibigay ng Sertipiko ng Karalitaan",
    "Issuance of Certificate of Leave Credits": "Pagbibigay ng Sertipiko ng mga Kredito ng Leave",
    "Issuance of Social Case Study Report": "Pagbibigay ng Ulat ng Social Case Study",
    "Issuance of official receipts for all payments": "Pagbibigay ng mga opisyal na resibo para sa lahat ng pagbabayad",
    "Search and retrieve record from registry books": "Hanapin at kunin ang rekord mula sa mga libro ng rehistro",
    "Same day registration upon complete submission": "Pagpaparehistro sa parehong araw kapag kumpleto ang pagsusumite",
    "Complete the request form with full name, date of birth, place of birth, parents' names, and purpose": "Kumpletuhin ang request form na may buong pangalan, petsa ng kapanganakan, lugar ng kapanganakan, mga pangalan ng magulang, at layunin",
    "Copy Issuance from PSA": "Pagbibigay ng Kopya mula sa PSA",
    "PSA Copy of document to be corrected": "Kopya ng PSA ng dokumentong iwawasto",
    "PSA negative certification": "Negatibong sertipikasyon ng PSA",
    "Negative Certification from PSA": "Negatibong Sertipikasyon mula sa PSA",
    "Certificate of Attendance - Pre-Marriage Counseling": "Sertipiko ng Pagdalo - Pre-Marriage Counseling",
    "Certificate of Death duly signed by attending physician": "Sertipiko ng Pagkamatay na wastong nilagdaan ng dumadalong doktor",
    "Certificate of Death duly signed by the contracting parties, solemnizing officer and at least two witnesses": "Sertipiko ng Pagkamatay na wastong nilagdaan ng mga partido sa kontrata, opisyal na nagkasal at hindi bababa sa dalawang saksi",
    "Certificate of Marriage duly signed by the contracting parties": "Sertipiko ng Kasal na wastong nilagdaan ng mga partido sa kontrata",
    "Certificate of No Marriage (CENOMAR) from PSA": "Sertipiko ng Walang Kasal (CENOMAR) mula sa PSA",
    "Certificate of No Pending Administrative Case": "Sertipiko ng Walang Nakabinbing Kasong Administratibo",
    "Certificate of occupancy for completed buildings": "Sertipiko ng paninirahan para sa mga natapos na gusali",
    "Certification of crops planted and production data": "Sertipikasyon ng mga pananim na itinanim at datos ng produksyon",
    "Certification of farm location and area cultivated": "Sertipikasyon ng lokasyon ng bukid at lugar na sinasaka",
    "Certification that a person has no declared property in Solano.": "Sertipikasyon na ang isang tao ay walang idineklaang ari-arian sa Solano.",
    "Certification that employee has no pending administrative case": "Sertipikasyon na ang empleyado ay walang nakabinbing kasong administratibo",
    "Clerical error corrections and change of first name": "Mga pagwawasto ng klerikal na error at pagbabago ng unang pangalan",
    "Correction of Day/Month of Birth (RA 10172)": "Pagwawasto ng Araw/Buwan ng Kapanganakan (RA 10172)",
    "Petition for correction of clerical errors and change of first name (RA 9048/RA 10172)": "Petisyon para sa pagwawasto ng mga klerikal na error at pagbabago ng unang pangalan (RA 9048/RA 10172)",
    "RA 10172 - Correction of Sex/Day & Month of Birth": "RA 10172 - Pagwawasto ng Kasarian/Araw at Buwan ng Kapanganakan",
    "RA 9048 - Change of First Name": "RA 9048 - Pagbabago ng Unang Pangalan",
    "Delayed registration is the registration of vital events (birth, marriage, death) beyond the prescribed period": "Ang naantalang pagpaparehistro ay ang pagpaparehistro ng mahahalagang pangyayari (kapanganakan, kasal, pagkamatay) lampas sa itinakdang panahon",
    "Affidavit for Delayed Registration of Marriage (at the back of the document shall be accomplished)": "Sinumpaang Salaysay para sa Naantalang Pagpaparehistro ng Kasal (sa likod ng dokumento ay dapat mapunan)",
    "Affidavit of Death (if unattended)": "Sinumpaang Salaysay ng Pagkamatay (kung walang dumalo)",
    "Affidavit of the solemnizing officer or the person reporting or presenting the marriage certificate": "Sinumpaang Salaysay ng opisyal na nagkasal o ng taong nag-uulat o nagpapakita ng sertipiko ng kasal",
    "Application for Marriage License duly signed by the couple and the MCR": "Aplikasyon para sa Lisensya sa Kasal na wastong nilagdaan ng mag-asawa at ng MCR",
    "Marriage license is valid for 120 days from issuance": "Ang lisensya sa kasal ay balido sa loob ng 120 araw mula sa pagbibigay",
    "For engaged couples intending to get married in Solano": "Para sa mga magkasintahang nagbabalak magpakasal sa Solano",
    "After the PMC, go back to MCRO": "Pagkatapos ng PMC, bumalik sa MCRO",
    "MHO Certification of Cause of Death": "Sertipikasyon ng MHO ng Sanhi ng Pagkamatay",
    "For Death at Home (Unattended)": "Para sa Pagkamatay sa Bahay (Walang Dumalo)",
    "For Delayed Registration (After 30 Days)": "Para sa Naantalang Pagpaparehistro (Pagkatapos ng 30 Araw)",
    "For Timely Registration (Within 15/30 Days)": "Para sa Napapanahong Pagpaparehistro (Sa Loob ng 15/30 Araw)",
    "Legal process to legitimize children born out of wedlock": "Legal na proseso upang gawing lehitimo ang mga batang ipinanganak sa labas ng kasal",
    "Legitimation is the legal process by which children born out of wedlock are legitimized by the subsequent marriage of their parents": "Ang lehitimasyon ay ang legal na proseso kung saan ang mga batang ipinanganak sa labas ng kasal ay ginagawang lehitimo sa pamamagitan ng kasunod na kasal ng kanilang mga magulang",
    "Legal Capacity to Contract Marriage from Embassy": "Legal na Kakayahang Mag-asawa mula sa Embahada",
    "If Previously Married": "Kung Dating May Asawa",
    "If previously married: Death Certificate of spouse, Decree of Divorce, Decree of Annulment, or CENOMAR": "Kung dating may asawa: Sertipiko ng Pagkamatay ng asawa, Decree of Divorce, Decree of Annulment, o CENOMAR",
    "Submit the accomplished Certificate of Marriage (COM) for review. The COM must be duly signed by the contracting parties": "Isumite ang napunang Sertipiko ng Kasal (COM) para sa pagsusuri. Ang COM ay dapat wastong nilagdaan ng mga partido sa kontrata",
    "Get your copy of COM duly registered and signed by the Receiving Officer and MCR or any authorized staff": "Kunin ang iyong kopya ng COM na wastong nairehistro at nilagdaan ng Receiving Officer at MCR o sinumang awtorisadong kawani",
    "At least four (4) public documents showing correct entry": "Hindi bababa sa apat (4) na pampublikong dokumento na nagpapakita ng tamang entry",
    "At least two (2) public documents showing correct entry": "Hindi bababa sa dalawang (2) pampublikong dokumento na nagpapakita ng tamang entry",
    "Birth Certificate or any valid ID showing date of birth": "Sertipiko ng Kapanganakan o anumang balidong ID na nagpapakita ng petsa ng kapanganakan",
    "Birth Certificate or any valid ID showing your age (60 and above)": "Sertipiko ng Kapanganakan o anumang balidong ID na nagpapakita ng iyong edad (60 pataas)",
    "Medical Certificate indicating type of disability": "Medical Certificate na nagpapahiwatig ng uri ng kapansanan",
    "Medical Certificate/Abstract (for medical assistance)": "Medical Certificate/Abstract (para sa tulong medikal)",
    "Medical certificate (for sick leave exceeding 5 days)": "Medical certificate (para sa sick leave na higit sa 5 araw)",
    "Photocopy of Tax Declaration/Title": "Photocopy ng Tax Declaration/Title",
    "Photocopy of your valid ID": "Photocopy ng iyong balidong ID",
    "Valid ID (any government-issued ID)": "Balidong ID (anumang government-issued ID)",
    "Valid ID of applicant or guardian": "Balidong ID ng aplikante o tagapag-alaga",
    "Valid ID of both you and the representative": "Balidong ID ng iyo at ng kinatawan",
    "Valid ID of client/patient": "Balidong ID ng kliyente/pasyente",
    "Valid ID of informant": "Balidong ID ng nagpapaalam",
    "Valid IDs of both parties": "Mga balidong ID ng parehong partido",
    "Valid IDs of parents and informant": "Mga balidong ID ng mga magulang at nagpapaalam",
    "Representatives must have authorization letter and valid IDs": "Ang mga kinatawan ay dapat may sulat ng awtorisasyon at mga balidong ID",
    "Duly accomplished CS Form No. 6 (Application for Leave)": "Wastong napunang CS Form No. 6 (Aplikasyon para sa Leave)",
    "Duly accomplished request form": "Wastong napunang request form",
    "CS Form No. 212 Revised Personal Data Sheet (2017)": "CS Form No. 212 Binagong Personal Data Sheet (2017)",
    "5 sets duly filled-up application forms": "5 set na wastong napunang mga application form",
    "Recent 1x1 or 2x2 Photo": "Kamakailang 1x1 o 2x2 Larawan",
    "Parental Advice (for applicants ages 22-24 years old)": "Payo ng Magulang (para sa mga aplikanteng edad 22-24 taong gulang)",
    "Parental Consent (for applicants ages 18-21 years old)": "Pahintulot ng Magulang (para sa mga aplikanteng edad 18-21 taong gulang)",
    "Parental Advice (if 22-25 years old)": "Payo ng Magulang (kung 22-25 taong gulang)",
    "Parental Consent (if 18-21 years old)": "Pahintulot ng Magulang (kung 18-21 taong gulang)",
    "Signatures of at least two (2) witnesses": "Mga lagda ng hindi bababa sa dalawang (2) saksi",
    "Two (2) documentary evidences": "Dalawang (2) dokumentaryong ebidensya",
}

FIL3 = {
    # Business/Permits
    "Application for new business permit for businesses operating in Solano": "Aplikasyon para sa bagong permiso sa negosyo para sa mga negosyong nag-ooperate sa Solano",
    "Annual business tax based on gross sales/receipts": "Taunang buwis sa negosyo batay sa kabuuang benta/resibo",
    "Annual renewal of existing business permit (January 1-20 without surcharge)": "Taunang pag-renew ng umiiral na permiso sa negosyo (Enero 1-20 nang walang karagdagang singil)",
    "Business permit renewal deadline: January 20": "Deadline ng pag-renew ng permiso sa negosyo: Enero 20",
    "Business permits must be renewed annually, preferably in January. The deadline for penalty-free renewal is January 20": "Ang mga permiso sa negosyo ay dapat i-renew taun-taon, mas mainam sa Enero. Ang deadline para sa pag-renew na walang multa ay Enero 20",
    "Business permits, Mayor's clearance, licensing": "Mga permiso sa negosyo, clearance ng Alkalde, paglilisensya",
    "Business Billing & Payment": "Pagsingil at Pagbabayad ng Negosyo",
    "Business Online Billing & Payment": "Online na Pagsingil at Pagbabayad ng Negosyo",
    "Business Permits and Licensing Section handles tricycle franchise applications and documentary requirements": "Ang Seksyon ng mga Permiso sa Negosyo at Paglilisensya ang humahawak ng mga aplikasyon ng prangkisa ng traysikel at mga kinakailangang dokumento",
    "Fee for business permit issuance and renewal": "Bayad para sa pagbibigay at pag-renew ng permiso sa negosyo",
    "Fees vary based on business type, capitalization, and floor area": "Ang mga bayad ay nag-iiba batay sa uri ng negosyo, kapital, at sukat ng sahig",
    "Late renewal incurs 25% surcharge + 2% monthly interest": "Ang huling pag-renew ay may 25% karagdagang singil + 2% buwanang interes",
    "Renew your existing business permit online": "I-renew ang iyong umiiral na permiso sa negosyo online",
    "Tax payments for business operations and permits": "Mga pagbabayad ng buwis para sa mga operasyon at permiso ng negosyo",
    "Transfer of Business Location": "Paglipat ng Lokasyon ng Negosyo",
    "View and pay your business tax bills online": "Tingnan at bayaran ang iyong mga bill ng buwis sa negosyo online",
    "When should I renew my business permit?": "Kailan ko dapat i-renew ang aking permiso sa negosyo?",
    "What do I need to start a new business in Solano?": "Ano ang kailangan ko upang magsimula ng bagong negosyo sa Solano?",
    "Secure zoning clearance before applying for business permit": "Kumuha ng zoning clearance bago mag-apply ng permiso sa negosyo",
    "DTI Certificate of Business Name Registration (for sole proprietorship)": "DTI Certificate ng Pagpaparehistro ng Pangalan ng Negosyo (para sa sole proprietorship)",
    "Contract of Lease (if applicable)": "Kontrata ng Pag-upa (kung naaangkop)",
    "Contract of Lease / Land Title (proof of business location)": "Kontrata ng Pag-upa / Land Title (patunay ng lokasyon ng negosyo)",
    "Fire Safety Inspection Certificate from BFP": "Sertipiko ng Inspeksyon sa Kaligtasan sa Sunog mula sa BFP",
    "Fire Safety Inspection Certificate from BFP (current year)": "Sertipiko ng Inspeksyon sa Kaligtasan sa Sunog mula sa BFP (kasalukuyang taon)",
    "Barangay Business Clearance (current year)": "Barangay Business Clearance (kasalukuyang taon)",
    "Barangay Certificate of Indigency": "Sertipiko ng Karalitaan ng Barangay",
    "BIR Certificate of Closure": "BIR Certificate ng Pagsasara",
    "Gross sales declaration": "Deklarasyon ng kabuuang benta",
    "Sanitary, fire safety, and other regulatory fees": "Mga bayad sa sanitaryo, kaligtasan sa sunog, at iba pang regulasyon",
    "Submit documentary requirements to the BPLS": "Isumite ang mga kinakailangang dokumento sa BPLS",

    # Assessor / Property
    "Property assessment determines the fair market value and assessed value of real properties (land, buildings, and machineries)": "Ang pagtatasa ng ari-arian ay tumutukoy sa patas na halaga sa pamilihan at tinasang halaga ng mga tunay na ari-arian (lupa, gusali, at makinarya)",
    "Property is appraised based on Schedule of Fair Market Values and assessment levels.": "Ang ari-arian ay tinatasa batay sa Iskedyul ng Patas na Halaga sa Pamilihan at mga antas ng pagtatasa.",
    "New Tax Declaration is issued reflecting the assessed value of the property.": "Ang bagong Tax Declaration ay ibinibigay na nagpapakita ng tinasang halaga ng ari-arian.",
    "New Tax Declaration under the new owner's name will be issued.": "Ang bagong Tax Declaration sa pangalan ng bagong may-ari ay ibibigay.",
    "Declaration must be filed within 60 days of acquisition": "Ang deklarasyon ay dapat ihain sa loob ng 60 araw mula sa pagkuha",
    "Declaration of Land, Building and Machineries": "Deklarasyon ng Lupa, Gusali at Makinarya",
    "Tax Declaration is an official document showing the assessed value of a property. It is used as basis for real property tax computation": "Ang Tax Declaration ay isang opisyal na dokumento na nagpapakita ng tinasang halaga ng ari-arian. Ito ay ginagamit bilang batayan para sa pagkalkula ng buwis sa tunay na ari-arian",
    "Tax declaration form for real property assessment in Solano, Nueva Vizcaya": "Form ng tax declaration para sa pagtatasa ng tunay na ari-arian sa Solano, Nueva Vizcaya",
    "Assessor's staff will conduct on-site inspection and measurement of the property.": "Ang kawani ng Tagapagtasa ay magsasagawa ng on-site na inspeksyon at pagsukat ng ari-arian.",
    "For changes in property details, corrections, or general revision updates.": "Para sa mga pagbabago sa detalye ng ari-arian, mga pagwawasto, o mga update sa pangkalahatang rebisyon.",
    "For newly constructed buildings, improvements, or newly discovered properties.": "Para sa mga bagong itinayong gusali, mga pagpapabuti, o mga bagong natuklasang ari-arian.",
    "Replacement for lost, damaged, or additional copies of tax declaration.": "Kapalit para sa nawala, nasira, o karagdagang mga kopya ng tax declaration.",
    "When property changes ownership through sale, donation, inheritance, or other means, the tax declaration must be transferred": "Kapag nagbago ang pagmamay-ari ng ari-arian sa pamamagitan ng pagbebenta, donasyon, mana, o iba pang paraan, ang tax declaration ay dapat ilipat",
    "Land reclassification changes the category of land for assessment purposes, which affects the applicable tax rate": "Ang reklasipikasyon ng lupa ay nagbabago ng kategorya ng lupa para sa layunin ng pagtatasa, na nakakaapekto sa naaangkop na rate ng buwis",
    "Annotations are official notations recorded on tax declarations to reflect encumbrances, liens, or other legal interests": "Ang mga anotasyon ay mga opisyal na tala na naitala sa mga tax declaration upang ipakita ang mga encumbrance, lien, o iba pang legal na interes",
    "Recording of encumbrances and other notations on tax declarations": "Pagtatala ng mga encumbrance at iba pang mga tala sa mga tax declaration",
    "Various certifications related to real property records": "Iba't ibang sertipikasyon na may kaugnayan sa mga rekord ng tunay na ari-arian",
    "Various certifications related to land use and zoning": "Iba't ibang sertipikasyon na may kaugnayan sa paggamit ng lupa at zoning",
    "List of all properties declared under a person's name.": "Listahan ng lahat ng ari-ariang idineklara sa pangalan ng isang tao.",
    "Official copy of tax declaration for legal and banking purposes.": "Opisyal na kopya ng tax declaration para sa legal at layuning pangbangko.",
    "Details needed for the tax declaration form": "Mga detalye na kailangan para sa form ng tax declaration",
    "Kind of Building (Residential, Commercial, etc.)": "Uri ng Gusali (Residensyal, Komersyal, atbp.)",
    "Land Title / Tax Declaration / Lease Contract": "Land Title / Tax Declaration / Kontrata ng Pag-upa",
    "Market Value per Unit Area": "Halaga sa Pamilihan bawat Yunit ng Lugar",
    "Number of Storeys and Floor Area": "Bilang ng mga Palapag at Sukat ng Sahig",
    "Penalties apply for late declaration": "May multa para sa huling deklarasyon",
    "Sub-class and Assessment Level": "Sub-class at Antas ng Pagtatasa",
    "Types of Property Declaration": "Mga Uri ng Deklarasyon ng Ari-arian",
    "Pay early in January for 10% discount": "Magbayad nang maaga sa Enero para sa 10% diskwento",
    "Arrangement for installment payment of taxes": "Kasunduan para sa hulugang pagbabayad ng buwis",
    "How can I pay my real property tax?": "Paano ko mababayaran ang aking buwis sa tunay na ari-arian?",
    "Visit the Municipal Treasurer's Office at the Municipal Hall with your Tax Declaration or latest Official Receipt": "Bumisita sa Opisina ng Ingat-Yaman ng Munisipyo sa Munisipyo na may iyong Tax Declaration o pinakabagong Opisyal na Resibo",
    "Tax Clearance from Treasurer": "Tax Clearance mula sa Ingat-Yaman",
    "Appraisal and valuation of real properties for taxation purposes": "Pagtatasa at pagpapahalaga ng mga tunay na ari-arian para sa layunin ng pagbubuwis",
}

FIL4 = {
    # Social Welfare / MSWDO
    "AICS provides emergency assistance to individuals and families in crisis situations including medical assistance": "Ang AICS ay nagbibigay ng emergency na tulong sa mga indibidwal at pamilya sa mga sitwasyon ng krisis kabilang ang tulong medikal",
    "Assistance to Individuals in Crisis Situation (AICS)": "Tulong sa mga Indibidwal sa Sitwasyon ng Krisis (AICS)",
    "Assistance to Persons with Disability (PWD)": "Tulong sa mga Taong may Kapansanan (PWD)",
    "Assistance amount depends on availability of funds and nature of crisis": "Ang halaga ng tulong ay depende sa pagkakaroon ng pondo at katangian ng krisis",
    "Abandoned and neglected children": "Mga inabandona at napabayaang bata",
    "Approval and signing by MSWDO Head": "Pag-apruba at pagpirma ng Pinuno ng MSWDO",
    "Case Management & Assessment": "Pamamahala at Pagtatasa ng Kaso",
    "Child abuse cases are given immediate priority": "Ang mga kaso ng pang-aabuso sa bata ay binibigyan ng agarang prayoridad",
    "Children in Conflict with the Law (CICL) assistance": "Tulong sa mga Batang may Salungatan sa Batas (CICL)",
    "Children in conflict with the law (CICL)": "Mga batang may salungatan sa batas (CICL)",
    "Community-based capacity building and livelihood assistance": "Pagbuo ng kakayahan at tulong sa kabuhayan na batay sa komunidad",
    "Comprehensive rehabilitation programs designed to help individuals recover, heal, and reintegrate into society": "Mga komprehensibong programa ng rehabilitasyon na idinisenyo upang tulungan ang mga indibidwal na makabawi, gumaling, at muling makisama sa lipunan",
    "Comprehensive social welfare programs and services for vulnerable sectors": "Mga komprehensibong programa at serbisyo ng kagalingang panlipunan para sa mga mahihinang sektor",
    "Coordination with PNP, DSWD, and other agencies as needed": "Koordinasyon sa PNP, DSWD, at iba pang ahensya kung kinakailangan",
    "Counseling and psychosocial support": "Pagpapayo at psychosocial na suporta",
    "Emergency financial assistance for various needs": "Emergency na tulong pinansyal para sa iba't ibang pangangailangan",
    "Families in crisis situations": "Mga pamilya sa mga sitwasyon ng krisis",
    "Filipino citizen, 60 years old and above": "Mamamayang Pilipino, 60 taong gulang pataas",
    "Financial and material assistance for individuals and families in crisis": "Tulong pinansyal at materyal para sa mga indibidwal at pamilya sa krisis",
    "Follow-up support and monitoring after rehabilitation.": "Suporta sa follow-up at pagsubaybay pagkatapos ng rehabilitasyon.",
    "Foster care and adoption services": "Mga serbisyo ng foster care at pag-aampon",
    "Home visitation may be conducted for verification": "Maaaring magsagawa ng pagbisita sa bahay para sa beripikasyon",
    "Immediate response and intervention for emergency cases.": "Agarang pagtugon at interbensyon para sa mga kaso ng emergency.",
    "Initial assessment and investigation": "Paunang pagtatasa at imbestigasyon",
    "Interview and assessment of client's situation": "Panayam at pagtatasa ng sitwasyon ng kliyente",
    "Interview and assessment of situation": "Panayam at pagtatasa ng sitwasyon",
    "Low-income families and individuals": "Mga pamilya at indibidwal na mababang kita",
    "No pension from government or private agencies": "Walang pensyon mula sa pamahalaan o pribadong ahensya",
    "No permanent source of income": "Walang permanenteng pinagkukunan ng kita",
    "Nutrition support for malnourished children and vulnerable groups": "Suporta sa nutrisyon para sa mga malnourished na bata at mahihinang grupo",
    "Nutritious hot meals provided daily to beneficiaries.": "Masustansyang mainit na pagkain na ibinibigay araw-araw sa mga benepisyaryo.",
    "Office Head / Social Welfare Officer": "Pinuno ng Opisina / Social Welfare Officer",
    "PWD Affairs & Services": "Mga Usapin at Serbisyo ng PWD",
    "PWD ID entitles holder to 20% discount on goods and services": "Ang PWD ID ay nagbibigay-karapatan sa may-hawak ng 20% diskwento sa mga kalakal at serbisyo",
    "PWD ID is valid for 3 years": "Ang PWD ID ay balido sa loob ng 3 taon",
    "Parent education on proper nutrition and child care.": "Edukasyon ng magulang sa wastong nutrisyon at pangangalaga ng bata.",
    "Police Report/Incident Report (for victims of calamity/disaster)": "Police Report/Incident Report (para sa mga biktima ng kalamidad/sakuna)",
    "Programs and services for women's welfare and protection": "Mga programa at serbisyo para sa kagalingan at proteksyon ng mga kababaihan",
    "Programs to reunite and strengthen family relationships.": "Mga programa upang muling pagsamahin at palakasin ang mga relasyon ng pamilya.",
    "Protective Services for Individuals and Families in Difficult Circumstances": "Mga Serbisyong Proteksiyon para sa mga Indibidwal at Pamilya sa Mahirap na Kalagayan",
    "Provides immediate intervention and support for individuals and families experiencing crisis situations": "Nagbibigay ng agarang interbensyon at suporta para sa mga indibidwal at pamilyang nakakaranas ng mga sitwasyon ng krisis",
    "Provision of immediate intervention/assistance": "Pagbibigay ng agarang interbensyon/tulong",
    "Psychosocial support and counseling for affected individuals.": "Psychosocial na suporta at pagpapayo para sa mga apektadong indibidwal.",
    "Recovery and reintegration programs for individuals in need": "Mga programa ng pagbawi at muling pagsasama para sa mga indibidwal na nangangailangan",
    "Referral and coordination for legal aid services.": "Referral at koordinasyon para sa mga serbisyo ng tulong legal.",
    "Relief goods and evacuation support": "Mga relief goods at suporta sa ebakwasyon",
    "Report/seek assistance at MSWDO": "Mag-ulat/humingi ng tulong sa MSWDO",
    "Safe shelter for victims needing immediate protection.": "Ligtas na tirahan para sa mga biktimang nangangailangan ng agarang proteksyon.",
    "Self-Employment Assistance - Kaunlaran (SEA-K)": "Tulong sa Sariling Negosyo - Kaunlaran (SEA-K)",
    "Senior Citizen ID entitles holder to 20% discount and VAT exemption": "Ang Senior Citizen ID ay nagbibigay-karapatan sa may-hawak ng 20% diskwento at exemption sa VAT",
    "Senior citizens enjoy 20% discount and VAT exemption on purchases (with a minimum purchase amount per transaction)": "Ang mga matatandang mamamayan ay may 20% diskwento at exemption sa VAT sa mga pagbili (na may minimum na halaga ng pagbili bawat transaksyon)",
    "Services and assistance for persons with disabilities": "Mga serbisyo at tulong para sa mga taong may kapansanan",
    "Services and programs for citizens 60 years old and above": "Mga serbisyo at programa para sa mga mamamayang 60 taong gulang pataas",
    "Social case studies, indigency certificates, AICS, PWD & senior citizen assistance": "Mga pag-aaral ng kaso sa lipunan, mga sertipiko ng karalitaan, AICS, tulong sa PWD at matatandang mamamayan",
    "Social welfare programs, assistance, and support services for vulnerable sectors": "Mga programa ng kagalingang panlipunan, tulong, at mga serbisyong suporta para sa mga mahihinang sektor",
    "Social Pension for Indigent Senior Citizens": "Social Pension para sa mga Indigenteng Matatandang Mamamayan",
    "Solo Parent ID and benefits": "Solo Parent ID at mga benepisyo",
    "Support and intervention for vulnerable individuals and families": "Suporta at interbensyon para sa mga mahihinang indibidwal at pamilya",
    "Support for school fees, supplies, and other educational needs.": "Suporta para sa mga bayarin sa paaralan, mga suplay, at iba pang pangangailangang pang-edukasyon.",
    "Sustainable Livelihood Program (SLP)": "Sustainable Livelihood Program (SLP)",
    "Temporary shelter and protection": "Pansamantalang tirahan at proteksyon",
    "The Day Care Service Program provides early childhood care and development (ECCD) services to children ages 3-5": "Ang Programa ng Serbisyo ng Day Care ay nagbibigay ng mga serbisyo ng maagang pangangalaga at pagpapaunlad ng bata (ECCD) sa mga batang edad 3-5",
    "The Self-Employment Assistance - Kaunlaran (SEA-K) program provides capital assistance to disadvantaged groups": "Ang programa ng Tulong sa Sariling Negosyo - Kaunlaran (SEA-K) ay nagbibigay ng tulong sa kapital sa mga disadvantaged na grupo",
    "The Social Pension Program provides monthly stipend to indigent senior citizens aged 60 years old and above": "Ang Programa ng Social Pension ay nagbibigay ng buwanang stipend sa mga indigenteng matatandang mamamayan na edad 60 taong gulang pataas",
    "The Supplementary Feeding Program aims to improve the nutritional status of malnourished children ages 2-5": "Ang Programa ng Karagdagang Pagpapakain ay naglalayong mapabuti ang katayuang nutrisyonal ng mga malnourished na batang edad 2-5",
    "The Sustainable Livelihood Program is a community-based capacity building program that provides participants with skills training": "Ang Sustainable Livelihood Program ay isang programa ng pagbuo ng kakayahan na batay sa komunidad na nagbibigay sa mga kalahok ng pagsasanay sa kasanayan",
    "Travel assistance for medical referrals and emergency situations.": "Tulong sa paglalakbay para sa mga medikal na referral at mga sitwasyon ng emergency.",
    "VAWC (Violence Against Women and Children) assistance": "Tulong sa VAWC (Karahasan Laban sa mga Kababaihan at Bata)",
    "VAWC cases are given priority and immediate attention": "Ang mga kaso ng VAWC ay binibigyan ng prayoridad at agarang pansin",
    "Victims of abuse, neglect, and exploitation": "Mga biktima ng pang-aabuso, kapabayaan, at pagsasamantala",
    "Victims of trafficking": "Mga biktima ng trafficking",
    "Women in especially difficult circumstances": "Mga kababaihan sa espesyal na mahirap na kalagayan",
    "Encoding and processing of Senior Citizen ID": "Pag-encode at pagproseso ng Senior Citizen ID",
    "How do I apply for a Senior Citizen ID?": "Paano ako mag-apply para sa Senior Citizen ID?",
    "Release of PWD ID": "Paglabas ng PWD ID",
    "Release of Social Case Study Report": "Paglabas ng Ulat ng Social Case Study",
    "Requirements for PWD ID": "Mga Kinakailangan para sa PWD ID",
    "The ID is issued for free.": "Ang ID ay ibinibigay nang libre.",
    "For participants seeking employment. Includes skills training, job matching, and employment assistance": "Para sa mga kalahok na naghahanap ng trabaho. Kasama ang pagsasanay sa kasanayan, job matching, at tulong sa trabaho",
    "For participants who want to start or expand their own business. Includes seed capital fund and business development": "Para sa mga kalahok na gustong magsimula o palawakin ang kanilang sariling negosyo. Kasama ang seed capital fund at pagpapaunlad ng negosyo",
    "Capital assistance for micro-enterprise development": "Tulong sa kapital para sa pagpapaunlad ng micro-enterprise",
    "Job placement, employment assistance, career guidance": "Paglalagay sa trabaho, tulong sa trabaho, gabay sa karera",
    "Unemployed or underemployed residents": "Mga walang trabaho o kulang ang trabaho na mga residente",
    "For medical, educational, burial, and other assistance programs": "Para sa mga programa ng tulong medikal, pang-edukasyon, libing, at iba pa",
    "Proof of residence in Solano": "Patunay ng paninirahan sa Solano",
    "Proof of Income (if employed)": "Patunay ng Kita (kung may trabaho)",
    "All information is treated with confidentiality": "Ang lahat ng impormasyon ay tinatrato nang may pagiging kumpidensyal",
    "All information is treated with strict confidentiality": "Ang lahat ng impormasyon ay tinatrato nang may mahigpit na pagiging kumpidensyal",
    "Complaints are handled confidentially": "Ang mga reklamo ay hinahawakan nang kumpidensyal",
}

FIL5 = {
    # Agriculture
    "Agricultural Programs & Services": "Mga Programa at Serbisyo sa Agrikultura",
    "Agricultural loans, crop insurance, fertilizer assistance": "Mga pautang sa agrikultura, seguro sa pananim, tulong sa pataba",
    "AI services for cattle and swine breeding improvement": "Mga serbisyo ng AI para sa pagpapabuti ng pag-aalaga ng baka at baboy",
    "Access to corn planters, shellers, and other equipment": "Access sa mga corn planter, sheller, at iba pang kagamitan",
    "Access to drying facilities and storage warehouses": "Access sa mga pasilidad ng pagpapatuyo at mga bodega",
    "Access to government subsidies, insurance, and agricultural programs": "Access sa mga subsidyo ng pamahalaan, seguro, at mga programang agrikultural",
    "Access to tractors, harvesters, and other farm equipment": "Access sa mga traktor, harvester, at iba pang kagamitan sa bukid",
    "Connection to buyers and market information": "Koneksyon sa mga mamimili at impormasyon ng pamilihan",
    "Distribution of certified corn seeds (OPV and hybrid varieties)": "Pamamahagi ng mga sertipikadong binhi ng mais (OPV at hybrid na mga uri)",
    "Distribution of tilapia, carp, and other fingerlings": "Pamamahagi ng mga tilapia, karpa, at iba pang fingerling",
    "Distribution to requesting offices": "Pamamahagi sa mga humihiling na opisina",
    "Farm registration, certifications, and agricultural programs for Solano farmers": "Pagpaparehistro ng bukid, mga sertipikasyon, at mga programang agrikultural para sa mga magsasaka ng Solano",
    "Fish feeds and pond supplies support": "Suporta sa pagkain ng isda at mga suplay ng palaisdaan",
    "Free certified inbred rice seeds for registered farmers": "Libreng sertipikadong inbred na binhi ng bigas para sa mga rehistradong magsasaka",
    "Free of charge for all farmers": "Libre para sa lahat ng magsasaka",
    "Loan facilitation for rice production through partner institutions": "Pagpapadali ng pautang para sa produksyon ng bigas sa pamamagitan ng mga kasosyong institusyon",
    "Linkage to organic markets and buyers": "Koneksyon sa mga organikong pamilihan at mamimili",
    "Official production records for loan and insurance purposes": "Mga opisyal na rekord ng produksyon para sa layunin ng pautang at seguro",
    "On-site technical support and farm visits": "On-site na teknikal na suporta at pagbisita sa bukid",
    "Registry System for Basic Sectors in Agriculture - Official farmer registration for government programs": "Registry System for Basic Sectors in Agriculture - Opisyal na pagpaparehistro ng magsasaka para sa mga programa ng pamahalaan",
    "Slaughter permit from the Municipal Agriculturist": "Permiso sa pagkatay mula sa Municipal Agriculturist",
    "Support for organic farmers' groups and cooperatives": "Suporta para sa mga grupo ng organikong magsasaka at kooperatiba",
    "Support for organic farming practices and certification": "Suporta para sa mga kasanayan sa organikong pagsasaka at sertipikasyon",
    "Support for PGS and third-party organic certification": "Suporta para sa PGS at third-party na organikong sertipikasyon",
    "Support programs for corn farmers in Solano": "Mga programa ng suporta para sa mga magsasaka ng mais sa Solano",
    "Support programs for rice farmers under the Rice Competitiveness Enhancement Fund (RCEF)": "Mga programa ng suporta para sa mga magsasaka ng bigas sa ilalim ng Rice Competitiveness Enhancement Fund (RCEF)",
    "Support services for fisherfolk and aquaculture operators": "Mga serbisyong suporta para sa mga mangingisda at operator ng akwakultura",
    "Support services for livestock and poultry raisers": "Mga serbisyong suporta para sa mga nag-aalaga ng livestock at manok",
    "Training on fish culture and pond management": "Pagsasanay sa pag-aalaga ng isda at pamamahala ng palaisdaan",
    "Training on modern rice farming techniques and technologies": "Pagsasanay sa mga modernong teknik at teknolohiya sa pagsasaka ng bigas",
    "Training on organic production methods and composting": "Pagsasanay sa mga pamamaraan ng organikong produksyon at pag-compost",
    "Training on proper animal husbandry and management": "Pagsasanay sa wastong pag-aalaga at pamamahala ng mga hayop",
    "Vaccination, deworming, and veterinary consultations": "Bakuna, pagpapapurga, at konsultasyon sa beterinaryo",
    "Carabao slaughter requires special permit from Municipal Agriculturist": "Ang pagkatay ng kalabaw ay nangangailangan ng espesyal na permiso mula sa Municipal Agriculturist",
    "Carabao slaughter service with ante-mortem and post-mortem inspection": "Serbisyo ng pagkatay ng kalabaw na may ante-mortem at post-mortem na inspeksyon",
    "Cattle slaughter service with ante-mortem and post-mortem inspection": "Serbisyo ng pagkatay ng baka na may ante-mortem at post-mortem na inspeksyon",
    "Goat slaughter service with ante-mortem and post-mortem inspection": "Serbisyo ng pagkatay ng kambing na may ante-mortem at post-mortem na inspeksyon",
    "Hog slaughter service with ante-mortem and post-mortem inspection": "Serbisyo ng pagkatay ng baboy na may ante-mortem at post-mortem na inspeksyon",
    "Hog, cattle, goat, and carabao slaughter with meat inspection services": "Pagkatay ng baboy, baka, kambing, at kalabaw na may mga serbisyo ng inspeksyon ng karne",
    "Slaughterhouse services including hog, cattle, goat, and carabao slaughter with meat inspection": "Mga serbisyo ng katayan kabilang ang pagkatay ng baboy, baka, kambing, at kalabaw na may inspeksyon ng karne",
    "All animals must pass ante-mortem inspection before slaughter": "Ang lahat ng hayop ay dapat pumasa sa ante-mortem na inspeksyon bago ang pagkatay",
    "Ante-mortem inspection of carabao": "Ante-mortem na inspeksyon ng kalabaw",
    "Ante-mortem inspection of cattle": "Ante-mortem na inspeksyon ng baka",
    "Ante-mortem inspection of goat": "Ante-mortem na inspeksyon ng kambing",
    "Ante-mortem inspection of hog": "Ante-mortem na inspeksyon ng baboy",
    "Fees are based on animal weight category": "Ang mga bayad ay batay sa kategorya ng timbang ng hayop",
    "Permit for transporting agricultural products": "Permiso para sa transportasyon ng mga produktong agrikultural",
    "Present shipping permit / Certificate of Ownership / Certificate of Transfer and Veterinary Health Certificate": "Ipakita ang shipping permit / Certificate of Ownership / Certificate of Transfer at Veterinary Health Certificate",

    # Market
    "All vendors must have valid stall rental receipts": "Ang lahat ng vendor ay dapat may mga balidong resibo ng pag-upa ng stall",
    "Any individual or entity selling goods in the public market must pay entrance fee": "Ang sinumang indibidwal o entidad na nagbebenta ng mga kalakal sa pamilihang bayan ay dapat magbayad ng bayad sa pagpasok",
    "Any individual or stallholder may file a formal complaint against violations of the Public Market Code": "Ang sinumang indibidwal o stallholder ay maaaring maghain ng pormal na reklamo laban sa mga paglabag sa Public Market Code",
    "Bring goods/merchandise/products for inspection/assessment": "Dalhin ang mga kalakal/paninda/produkto para sa inspeksyon/pagtatasa",
    "CTC is available at the market for convenience": "Ang CTC ay magagamit sa pamilihan para sa kaginhawahan",
    "CTC is valid for one calendar year": "Ang CTC ay balido sa loob ng isang taon ng kalendaryo",
    "Complaints may include sanitation issues, illegal vending, and other violations": "Ang mga reklamo ay maaaring kabilang ang mga isyu sa kalinisan, ilegal na pagbebenta, at iba pang mga paglabag",
    "Entrance fees are based on goods being sold": "Ang mga bayad sa pagpasok ay batay sa mga kalakal na ibinebenta",
    "Fee is being assessed by the Market Collector to determine the amount of Cash Ticket": "Ang bayad ay tinatasa ng Market Collector upang matukoy ang halaga ng Cash Ticket",
    "Filing complaints against violations of sanitation, hygiene, and other market rules and regulations": "Paghahain ng mga reklamo laban sa mga paglabag sa kalinisan, kalinisan, at iba pang mga patakaran at regulasyon ng pamilihan",
    "For vendors and stallholders who need clearance for various transactions": "Para sa mga vendor at stallholder na nangangailangan ng clearance para sa iba't ibang transaksyon",
    "For vendors, traders, and individuals entering the public market to sell goods": "Para sa mga vendor, mangangalakal, at mga indibidwal na pumapasok sa pamilihang bayan upang magbenta ng mga kalakal",
    "Get the market clearance/certification": "Kunin ang market clearance/sertipikasyon",
    "Investigation and resolution time varies depending on the nature of complaint": "Ang oras ng imbestigasyon at resolusyon ay nag-iiba depende sa katangian ng reklamo",
    "Market clearance, entrance fees, vendor services, CTC": "Market clearance, mga bayad sa pagpasok, mga serbisyo sa vendor, CTC",
    "Market clearance, entrance fees, vendor services, and CTC issuance": "Market clearance, mga bayad sa pagpasok, mga serbisyo sa vendor, at pagbibigay ng CTC",
    "Pay entrance fee and get cash ticket at the gate/entrance of the Public Market": "Magbayad ng bayad sa pagpasok at kumuha ng cash ticket sa gate/pasukan ng Pamilihang Bayan",
    "Payment of Entrance Fees and Issuance of Cash Ticket": "Pagbabayad ng mga Bayad sa Pagpasok at Pagbibigay ng Cash Ticket",
}

FIL6 = {
    # Engineering
    "A building permit is required prior to construction, alteration, major repair, or renovation of any building or structure": "Ang building permit ay kinakailangan bago ang konstruksyon, pagbabago, malaking pagkukumpuni, o renobasyong ng anumang gusali o istruktura",
    "Fees depend on rates stated in Revenue Code and National Building Code": "Ang mga bayad ay depende sa mga rate na nakasaad sa Revenue Code at National Building Code",
    "Permit becomes null and void if work does not commence within 1 year": "Ang permiso ay nagiging walang bisa kung ang trabaho ay hindi magsisimula sa loob ng 1 taon",
    "Permit is suspended or abandoned if work stops for 120 days": "Ang permiso ay sinuspinde o inabandona kung ang trabaho ay huminto sa loob ng 120 araw",
    "Plans & Documents (5 sets each)": "Mga Plano at Dokumento (tig-5 set)",
    "Submit application form and requirements for verification by engineers. Plans must be signed and sealed": "Isumite ang application form at mga kinakailangan para sa beripikasyon ng mga inhinyero. Ang mga plano ay dapat nilagdaan at may selyo",
    "Construction and agricultural equipment for municipal projects": "Mga kagamitan sa konstruksyon at agrikultura para sa mga proyekto ng munisipyo",
    "Equipment rental is subject to availability and approval. Priority is given to municipal projects and emergency situations": "Ang pag-upa ng kagamitan ay depende sa pagkakaroon at pag-apruba. Ang prayoridad ay ibinibigay sa mga proyekto ng munisipyo at mga sitwasyon ng emergency",
    "Management and maintenance of municipal vehicles and heavy equipment": "Pamamahala at pagpapanatili ng mga sasakyan at mabibigat na kagamitan ng munisipyo",
    "Regular maintenance and repair coordination": "Regular na pagpapanatili at koordinasyon ng pagkukumpuni",
    "Request letter addressed to the Municipal Mayor stating purpose and date of use": "Sulat ng kahilingan na nakadirekta sa Punong Bayan na nagsasaad ng layunin at petsa ng paggamit",
    "Service motorcycles for field operations": "Mga motorsiklo ng serbisyo para sa mga operasyon sa field",
    "Service vehicles, patrol cars, and administrative vehicles": "Mga sasakyang panserbisyo, patrol car, at mga sasakyang pang-administrasyon",
    "Vehicle and equipment rental, property management, and procurement services": "Pag-upa ng sasakyan at kagamitan, pamamahala ng ari-arian, at mga serbisyo ng pagkuha",
    "Zoning clearance must be secured from the Zoning Administrator": "Ang zoning clearance ay dapat makuha mula sa Zoning Administrator",
    "Zoning clearance, locational clearance, and development planning services": "Zoning clearance, locational clearance, at mga serbisyo ng pagpaplano ng pagpapaunlad",
    "Application for Locational Clearance / Certificate of Zoning Compliance": "Aplikasyon para sa Locational Clearance / Certificate of Zoning Compliance",
    "Application for Final Approval / Development Permit of Residential Subdivision Project": "Aplikasyon para sa Huling Pag-apruba / Development Permit ng Residential Subdivision Project",
    "Application for Preliminary Approval and Locational Clearance for Residential Subdivision Project": "Aplikasyon para sa Paunang Pag-apruba at Locational Clearance para sa Residential Subdivision Project",
    "For subdivision, land conversion, and development projects": "Para sa subdivision, conversion ng lupa, at mga proyekto ng pagpapaunlad",
    "Developing a comprehensive system plan to mitigate flooding and protect public health.": "Pagbuo ng komprehensibong plano ng sistema upang mapagaan ang pagbaha at protektahan ang kalusugan ng publiko.",
    "Implementing the 10-Year Plan including waste collection, segregation, and environmental protection.": "Pagpapatupad ng 10-Taong Plano kabilang ang koleksyon ng basura, paghihiwalay, at proteksyon ng kapaligiran.",
    "IEC campaigns on RA 9003 (Solid Waste Management) and RA 9275 (Clean Water Act).": "Mga kampanya ng IEC sa RA 9003 (Pamamahala ng Solidong Basura) at RA 9275 (Clean Water Act).",
    "Key Environmental Services and Initiatives": "Mga Pangunahing Serbisyo at Inisyatiba sa Kapaligiran",
    "Management and monitoring of municipal utility accounts including electricity, water, and telephone": "Pamamahala at pagsubaybay ng mga account ng utilidad ng munisipyo kabilang ang kuryente, tubig, at telepono",
    "Property custodianship, supplies management, vehicle services, and utilities": "Pag-iingat ng ari-arian, pamamahala ng mga suplay, mga serbisyo ng sasakyan, at mga utilidad",
    "Property custodianship, supplies management, vehicle services, and utility management": "Pag-iingat ng ari-arian, pamamahala ng mga suplay, mga serbisyo ng sasakyan, at pamamahala ng utilidad",
    "Property management, procurement, administration": "Pamamahala ng ari-arian, pagkuha, administrasyon",
    "Procurement and distribution of common-use supplies and materials for municipal offices": "Pagkuha at pamamahagi ng mga karaniwang suplay at materyales para sa mga opisina ng munisipyo",
    "Receipt and inspection of delivered supplies": "Pagtanggap at inspeksyon ng mga naihatid na suplay",
    "Submission of Purchase Request (PR) from requesting office": "Pagsusumite ng Purchase Request (PR) mula sa humihiling na opisina",
    "Supplies issuance follows FIFO method": "Ang pagbibigay ng suplay ay sumusunod sa FIFO method",
    "The GSO assists in the procurement process for municipal supplies, equipment, and services in accordance with RA 9184": "Ang GSO ay tumutulong sa proseso ng pagkuha para sa mga suplay, kagamitan, at serbisyo ng munisipyo alinsunod sa RA 9184",
    "The Municipal General Services Office takes custody of all properties, real or personal, owned by the municipality": "Ang Opisina ng Pangkalahatang Serbisyo ng Munisipyo ay nag-iingat ng lahat ng ari-arian, tunay o personal, na pagmamay-ari ng munisipyo",

    # Legislative
    "All enacted ordinances and resolutions are made available to the public as part of our commitment to transparency": "Ang lahat ng naipatupad na ordinansa at resolusyon ay ginagawang magagamit sa publiko bilang bahagi ng aming pangako sa transparency",
    "Citizens can attend Sangguniang Bayan sessions and participate in public hearings for proposed ordinances": "Ang mga mamamayan ay maaaring dumalo sa mga sesyon ng Sangguniang Bayan at lumahok sa mga pagdinig publiko para sa mga iminumungkahing ordinansa",
    "Committee conducts public hearing and deliberates on the proposed ordinance": "Ang komite ay nagsasagawa ng pagdinig publiko at nagdedelibera sa iminumungkahing ordinansa",
    "Committee reviews and approves the proposed resolution": "Sinusuri at inaprubahan ng komite ang iminumungkahing resolusyon",
    "Committee submits findings and recommendations to the Sangguniang Bayan": "Isinusumite ng komite ang mga natuklasan at rekomendasyon sa Sangguniang Bayan",
    "Detailed discussion and debate on the proposed ordinance": "Detalyadong talakayan at debate sa iminumungkahing ordinansa",
    "Expressions of the legislative body's will or opinion on specific matters, often used for commendations": "Mga pagpapahayag ng kalooban o opinyon ng lehislatura sa mga tiyak na usapin, kadalasang ginagamit para sa mga pagkilala",
    "Final voting on the proposed ordinance by the Sangguniang Bayan": "Huling pagboto sa iminumungkahing ordinansa ng Sangguniang Bayan",
    "First Reading / Referral to Committee": "Unang Pagbasa / Referral sa Komite",
    "Initial reading and assignment to the relevant committee for review": "Paunang pagbasa at pagtatalaga sa kaugnay na komite para sa pagsusuri",
    "Learn about the legislative process of the Sangguniang Bayan": "Alamin ang tungkol sa prosesong lehislatibo ng Sangguniang Bayan",
    "Legislative staff prepares and prints the final draft of the resolution": "Ang kawani ng lehislatura ay naghahanda at nagpi-print ng huling draft ng resolusyon",
    "Mayor reviews and approves the enacted ordinance within 10 days": "Sinusuri at inaprubahan ng Alkalde ang naipatupad na ordinansa sa loob ng 10 araw",
    "Municipal ordinances enacted by the Sangguniang Bayan — local laws that govern the municipality": "Mga ordinansa ng munisipyo na naipatupad ng Sangguniang Bayan — mga lokal na batas na namamahala sa munisipyo",
    "Ordinance takes effect and is enforced within the municipality": "Ang ordinansa ay nagkakabisa at ipinapatupad sa loob ng munisipyo",
    "Public posting and publication of the approved ordinance": "Pampublikong pag-post at publikasyon ng naaprubahang ordinansa",
    "Resolution is posted publicly and transmitted to concerned parties": "Ang resolusyon ay naka-post sa publiko at ipinadala sa mga kinauukulan",
    "Resolution is scheduled for inclusion in the Sangguniang Bayan session": "Ang resolusyon ay naka-iskedyul para sa pagsasama sa sesyon ng Sangguniang Bayan",
    "Resolutions passed by the Sangguniang Bayan expressing the will or opinion of the legislative body on various matters.": "Mga resolusyong ipinasa ng Sangguniang Bayan na nagpapahayag ng kalooban o opinyon ng lehislatura sa iba't ibang usapin.",
    "Step-by-step process for enacting ordinances and resolutions": "Hakbang-hakbang na proseso para sa pagpapatupad ng mga ordinansa at resolusyon",
    "Submit approved ordinance to Sangguniang Panlalawigan for review within 3 days": "Isumite ang naaprubahang ordinansa sa Sangguniang Panlalawigan para sa pagsusuri sa loob ng 3 araw",
    "Submit the proposed ordinance to the Sangguniang Bayan for consideration": "Isumite ang iminumungkahing ordinansa sa Sangguniang Bayan para sa pagsasaalang-alang",
    "Submit the proposed resolution to the Sangguniang Bayan": "Isumite ang iminumungkahing resolusyon sa Sangguniang Bayan",
    "Submit transmittal letter and franchise applications to the SB": "Isumite ang transmittal letter at mga aplikasyon ng prangkisa sa SB",
    "Third and Final Reading": "Ikatlo at Huling Pagbasa",
    "View All Ordinances on SB Website": "Tingnan ang Lahat ng Ordinansa sa Website ng SB",
    "View All Resolutions on SB Website": "Tingnan ang Lahat ng Resolusyon sa Website ng SB",
    "Sangguniang Bayan Members approve the MTOF": "Ang mga Miyembro ng Sangguniang Bayan ay inaprubahan ang MTOF",
    "Vice Mayor or Secretary to the Sanggunian approves/disapproves the request": "Ang Bise Alkalde o Kalihim ng Sanggunian ay inaprubahan/tinanggihan ang kahilingan",
    "BPLS Inspector inspects the tricycle unit": "Ang BPLS Inspector ay nag-iinspeksyon ng yunit ng traysikel",
    "BPLS Inspector receives the franchise application form": "Ang BPLS Inspector ay tumatanggap ng application form ng prangkisa",
    "BPLS encodes the application into the system": "Ang BPLS ay nag-e-encode ng aplikasyon sa sistema",
    "BPLS prepares the transmittal letter": "Ang BPLS ay naghahanda ng transmittal letter",
    "Franchising Staff processes application and issues certification": "Ang Kawani ng Prangkisa ay nagpoproseso ng aplikasyon at nagbibigay ng sertipikasyon",
    "Franchising Staff receives, inspects, and sorts applications": "Ang Kawani ng Prangkisa ay tumatanggap, nag-iinspeksyon, at nag-aayos ng mga aplikasyon",
    "Franchising Staff releases the MTOF to the applicant": "Ang Kawani ng Prangkisa ay naglalabas ng MTOF sa aplikante",
    "Tricycle Franchising & Records": "Prangkisa ng Traysikel at mga Rekord",
    "Apply for tricycle franchise (MTOF) and request records": "Mag-apply para sa prangkisa ng traysikel (MTOF) at humiling ng mga rekord",

    # Budget
    "Obligation request processing, barangay budget review, and SEF budget preparation": "Pagproseso ng obligation request, pagsusuri ng badyet ng barangay, at paghahanda ng badyet ng SEF",
    "Review and certification of availability of funds": "Pagsusuri at sertipikasyon ng pagkakaroon ng pondo",
    "Review and evaluation of Barangay Budget": "Pagsusuri at ebalwasyon ng Badyet ng Barangay",
    "Review and evaluation of SEF Budget": "Pagsusuri at ebalwasyon ng Badyet ng SEF",
    "Budget preparation, appropriations, fiscal management": "Paghahanda ng badyet, mga appropriasyon, pamamahala ng piskal",
    "The Municipal Budget Office assists barangays in the preparation of their Annual Budget. It conducts review and evaluation": "Ang Opisina ng Badyet ng Munisipyo ay tumutulong sa mga barangay sa paghahanda ng kanilang Taunang Badyet. Nagsasagawa ito ng pagsusuri at ebalwasyon",
    "The Municipal Budget Office processes disbursement vouchers particularly the integral part of Obligation Request": "Ang Opisina ng Badyet ng Munisipyo ay nagpoproseso ng mga disbursement voucher lalo na ang mahalagang bahagi ng Obligation Request",
    "The Municipal Accounting Office pre-audits disbursement vouchers to ensure compliance with accounting rules": "Ang Opisina ng Accounting ng Munisipyo ay nag-pre-audit ng mga disbursement voucher upang matiyak ang pagsunod sa mga patakaran ng accounting",
    "Barangay budgets must be submitted within 10 days of approval": "Ang mga badyet ng barangay ay dapat isumite sa loob ng 10 araw mula sa pag-apruba",
    "Barangay Development Plan and Barangay Annual Investment Plan": "Plano ng Pagpapaunlad ng Barangay at Taunang Plano ng Pamumuhunan ng Barangay",
    "The Authorized Expenditure Program for the Budget Year or Appropriation Ordinance": "Ang Awtorisadong Programa ng Gastusin para sa Taon ng Badyet o Ordinansa ng Appropriasyon",
    "Transmittal letter of the Barangay Secretary": "Transmittal letter ng Kalihim ng Barangay",
    "Within ten days (10) from the approval of the Barangay Budget, copies of their Annual Budget shall be submitted": "Sa loob ng sampung araw (10) mula sa pag-apruba ng Badyet ng Barangay, ang mga kopya ng kanilang Taunang Badyet ay dapat isumite",

    # HR
    "Computation and verification of leave balances": "Pagkalkula at beripikasyon ng mga balanse ng leave",
    "Leave applications should be filed in advance": "Ang mga aplikasyon ng leave ay dapat ihain nang maaga",
    "Official certification of current or previous employment status": "Opisyal na sertipikasyon ng kasalukuyan o nakaraang katayuan ng trabaho",
    "Official record of employment history for LGU employees": "Opisyal na rekord ng kasaysayan ng trabaho para sa mga empleyado ng LGU",
    "Official statement of accumulated leave credits (vacation and sick leave)": "Opisyal na pahayag ng naipon na mga kredito ng leave (vacation at sick leave)",
    "Recording and release of approved leave": "Pagtatala at paglabas ng naaprubahang leave",
    "Review and signing by HRMO Head": "Pagsusuri at pagpirma ng Pinuno ng HRMO",
    "Service records, employment certifications, and leave management for LGU employees": "Mga rekord ng serbisyo, mga sertipikasyon ng trabaho, at pamamahala ng leave para sa mga empleyado ng LGU",
    "Verification of leave credits and computation": "Beripikasyon ng mga kredito ng leave at pagkalkula",
    "Key personnel handling business permits and licensing": "Mga pangunahing tauhan na humahawak ng mga permiso sa negosyo at paglilisensya",
    "Key personnel handling civil registry services": "Mga pangunahing tauhan na humahawak ng mga serbisyo ng rehistro sibil",
    "Key personnel handling human resource management services": "Mga pangunahing tauhan na humahawak ng mga serbisyo ng pamamahala ng yamang tao",
    "Key personnel handling social welfare services": "Mga pangunahing tauhan na humahawak ng mga serbisyo ng kagalingang panlipunan",
    "105 days for female employees": "105 araw para sa mga babaeng empleyado",
    "7 days for male employees": "7 araw para sa mga lalaking empleyado",
    "Payroll cut-off is every 10th and 25th of the month": "Ang cut-off ng payroll ay tuwing ika-10 at ika-25 ng buwan",
    "Records Officer II reviews and determines document availability": "Ang Records Officer II ay nagsusuri at tinutukoy ang pagkakaroon ng dokumento",
    "Records Officer III releases and stamps the requested documents": "Ang Records Officer III ay naglalabas at nagtatak ng mga hiniling na dokumento",
    "Records Staff retrieves and reproduces the requested documents": "Ang Records Staff ay kumukuha at nagre-reproduce ng mga hiniling na dokumento",
}

FIL7 = {
    # Privacy Policy
    "This Privacy Policy explains how BetterSolano.org collects, uses, and protects your information": "Ang Patakaran sa Privacy na ito ay nagpapaliwanag kung paano kinokolekta, ginagamit, at pinoprotektahan ng BetterSolano.org ang iyong impormasyon",
    "We are committed to protecting your privacy and ensuring the security of your personal information": "Kami ay nakatuon sa pagprotekta ng iyong privacy at pagtiyak ng seguridad ng iyong personal na impormasyon",
    "We do not sell, trade, or rent your personal information to third parties": "Hindi namin ibinebenta, ipinagpapalit, o ipinapaupa ang iyong personal na impormasyon sa mga third party",
    "We may update this Privacy Policy from time to time": "Maaari naming i-update ang Patakaran sa Privacy na ito paminsan-minsan",
    "We use Google Analytics to understand how visitors interact with our website": "Gumagamit kami ng Google Analytics upang maunawaan kung paano nakikipag-ugnayan ang mga bisita sa aming website",
    "Information We Collect": "Impormasyon na Aming Kinokolekta",
    "How We Use Your Information": "Paano Namin Ginagamit ang Iyong Impormasyon",
    "How We Protect Your Information": "Paano Namin Pinoprotektahan ang Iyong Impormasyon",
    "Information Sharing": "Pagbabahagi ng Impormasyon",
    "Changes to This Policy": "Mga Pagbabago sa Patakarang Ito",
    "Contact Us About Privacy": "Makipag-ugnayan sa Amin Tungkol sa Privacy",
    "Your continued use of this website after any changes constitutes acceptance of the updated policy": "Ang iyong patuloy na paggamit ng website na ito pagkatapos ng anumang mga pagbabago ay nangangahulugang pagtanggap ng na-update na patakaran",
    "We implement appropriate technical and organizational measures to protect your data": "Nagpapatupad kami ng naaangkop na teknikal at organisasyonal na mga hakbang upang protektahan ang iyong datos",
    "We may share anonymized, aggregated data for research or statistical purposes": "Maaari naming ibahagi ang anonymized, pinagsama-samang datos para sa layunin ng pananaliksik o estadistika",
    "This website uses cookies to enhance your browsing experience": "Ang website na ito ay gumagamit ng mga cookie upang mapahusay ang iyong karanasan sa pag-browse",
    "Cookies are small text files stored on your device": "Ang mga cookie ay maliliit na text file na naka-imbak sa iyong device",
    "You can control cookies through your browser settings": "Maaari mong kontrolin ang mga cookie sa pamamagitan ng mga setting ng iyong browser",
    "Disabling cookies may affect some website functionality": "Ang pag-disable ng mga cookie ay maaaring makaapekto sa ilang functionality ng website",
    "Number of visitors and page views": "Bilang ng mga bisita at page view",
    "Browser type and version": "Uri at bersyon ng browser",
    "Device type and operating system": "Uri ng device at operating system",
    "Geographic location (country/city level)": "Heograpikong lokasyon (antas ng bansa/lungsod)",
    "Pages visited and time spent on pages": "Mga pahinang binisita at oras na ginugol sa mga pahina",
    "Traffic sources and user flow": "Mga pinagmulan ng trapiko at daloy ng gumagamit",
    "Referring website or source": "Pinanggalingang website o pinagmulan",
    "IP address (anonymized where possible)": "IP address (anonymized kung maaari)",
    "To analyze website traffic and usage patterns": "Upang suriin ang trapiko ng website at mga pattern ng paggamit",
    "To improve website functionality and user experience": "Upang mapabuti ang functionality ng website at karanasan ng gumagamit",
    "Regular security assessments": "Regular na pagtatasa ng seguridad",
    "Regular software updates and patches": "Regular na pag-update at pag-patch ng software",

    # Terms of Use
    "By accessing and using this website, you agree to be bound by these Terms of Use": "Sa pag-access at paggamit ng website na ito, sumasang-ayon ka na sumunod sa mga Tuntunin ng Paggamit na ito",
    "These Terms of Use govern your access to and use of the BetterSolano.org website": "Ang mga Tuntunin ng Paggamit na ito ay namamahala sa iyong pag-access at paggamit ng website ng BetterSolano.org",
    "We reserve the right to modify these terms at any time": "Inilalaan namin ang karapatan na baguhin ang mga tuntuning ito sa anumang oras",
    "The content on this website is provided for general informational purposes only": "Ang nilalaman sa website na ito ay ibinibigay para sa pangkalahatang layunin ng impormasyon lamang",
    "We make no warranties or representations about the accuracy or completeness of the content": "Wala kaming mga garantiya o representasyon tungkol sa katumpakan o pagkakumpleto ng nilalaman",
    "This website is not intended to provide professional, legal, or financial advice": "Ang website na ito ay hindi nilalayong magbigay ng propesyonal, legal, o pinansiyal na payo",
    "We shall not be liable for any damages arising from the use of this website": "Hindi kami mananagot para sa anumang pinsala na nagmumula sa paggamit ng website na ito",
    "All content on this website is the property of BetterSolano.org unless otherwise stated": "Ang lahat ng nilalaman sa website na ito ay pag-aari ng BetterSolano.org maliban kung iba ang nakasaad",
    "Links to third-party websites are provided for convenience only": "Ang mga link sa mga third-party na website ay ibinibigay para sa kaginhawahan lamang",
    "We do not endorse or assume responsibility for third-party content": "Hindi namin ineendorso o inaako ang responsibilidad para sa nilalaman ng third-party",
    "If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in effect": "Kung ang anumang probisyon ng mga tuntuning ito ay matuklasang hindi maipapatupad, ang mga natitirang probisyon ay mananatiling may bisa",
    "These terms shall be governed by the laws of the Republic of the Philippines": "Ang mga tuntuning ito ay pamamahalaan ng mga batas ng Republika ng Pilipinas",
    "Any interruption, suspension, or cessation of website availability": "Anumang pagkaantala, pagsuspinde, o pagtigil ng availability ng website",
    "Warranties of merchantability": "Mga garantiya ng kakayahang ibenta",
    "Fitness for a particular purpose": "Angkop para sa isang partikular na layunin",
    "If you believe that any content on this website is:": "Kung naniniwala ka na ang anumang nilalaman sa website na ito ay:",
    "In violation of applicable laws or regulations": "Lumalabag sa mga naaangkop na batas o regulasyon",
    "Infringing upon legitimate rights or interests": "Lumalabag sa mga lehitimong karapatan o interes",
    "Potentially harmful or dangerous": "Posibleng nakakapinsala o mapanganib",
    "You are strongly encouraged to:": "Lubos kang hinihikayat na:",
    "Supporting documentation or evidence, where applicable": "Mga suportang dokumento o ebidensya, kung naaangkop",
    "Material changes may be announced on our website": "Ang mga mahahalagang pagbabago ay maaaring ianunsyo sa aming website",

    # FAQ
    "Frequently Asked Questions": "Mga Madalas Itanong",
    "Find answers to common questions about Solano municipal services": "Maghanap ng mga sagot sa mga karaniwang tanong tungkol sa mga serbisyo ng munisipyo ng Solano",
    "Is this website mobile-friendly?": "Ang website ba na ito ay mobile-friendly?",
    "Who developed Better Solano?": "Sino ang gumawa ng Better Solano?",
    "What if I missed the registration deadline?": "Paano kung napalampas ko ang deadline ng pagpaparehistro?",
    "Select the scenario that applies to your situation": "Piliin ang senaryo na naaangkop sa iyong sitwasyon",
    "Response times may vary due to the volunteer nature of this initiative.": "Ang oras ng pagtugon ay maaaring mag-iba dahil sa boluntaryong katangian ng inisyatibang ito.",
    "How do I contact the municipal government?": "Paano ako makikipag-ugnayan sa pamahalaang munisipal?",
    "What services are available online?": "Anong mga serbisyo ang magagamit online?",
    "Where is the Municipal Hall located?": "Nasaan ang Munisipyo?",

    # Accessibility
    "Accessibility Statement": "Pahayag ng Accessibility",
    "We are committed to ensuring digital accessibility for people with disabilities": "Kami ay nakatuon sa pagtiyak ng digital na accessibility para sa mga taong may kapansanan",
    "We strive to meet WCAG 2.1 Level AA standards": "Nagsusumikap kaming matugunan ang mga pamantayan ng WCAG 2.1 Level AA",
    "If you encounter any accessibility barriers, please contact us": "Kung makatagpo ka ng anumang mga hadlang sa accessibility, mangyaring makipag-ugnayan sa amin",
    "Keyboard navigation support": "Suporta sa nabigasyon sa keyboard",
    "Screen reader compatibility": "Pagkakatugma sa screen reader",
    "Alternative text for images": "Alternatibong teksto para sa mga larawan",
    "Sufficient color contrast": "Sapat na contrast ng kulay",
    "Resizable text without loss of functionality": "Nababagong laki ng teksto nang walang pagkawala ng functionality",
    "Fully compatible with all devices, browsers, or assistive technologies": "Ganap na tugma sa lahat ng device, browser, o assistive technology",

    # Statistics
    "Municipal Statistics": "Estadistika ng Munisipyo",
    "Data and statistics about Solano, Nueva Vizcaya": "Datos at estadistika tungkol sa Solano, Nueva Vizcaya",
    "Demographics Overview": "Pangkalahatang Demograpiya",
    "Economic Indicators": "Mga Tagapagpahiwatig ng Ekonomiya",
    "Population by Barangay": "Populasyon ayon sa Barangay",
    "Historical growth from 1990 to 2024": "Makasaysayang paglago mula 1990 hanggang 2024",
    "Cities and Municipalities Competitiveness Index (CMCI) Performance 2016-2024": "Pagganap ng Cities and Municipalities Competitiveness Index (CMCI) 2016-2024",
    "Solano at a Glance": "Solano sa Isang Tingin",
    "Brief History of Solano": "Maikling Kasaysayan ng Solano",
    "Major development projects serving the community": "Mga pangunahing proyekto ng pagpapaunlad na nagsisilbi sa komunidad",
    "DPWH Infrastructure Projects in Solano": "Mga Proyekto ng Imprastraktura ng DPWH sa Solano",

    # Home page
    "Welcome to Better Solano": "Maligayang Pagdating sa Better Solano",
    "Your gateway to Solano municipal services and information": "Ang iyong daan patungo sa mga serbisyo at impormasyon ng munisipyo ng Solano",
    "Fetching news and updates from Solano.": "Kinukuha ang mga balita at update mula sa Solano.",
    "Fetching the latest news from Solano.": "Kinukuha ang pinakabagong balita mula sa Solano.",
    "Stay informed about the latest happenings in Solano": "Manatiling may kaalaman tungkol sa mga pinakabagong pangyayari sa Solano",
    "Loading news...": "Naglo-load ng balita...",
    "Loading updates...": "Naglo-load ng mga update...",
    "Schedule Appointment": "Mag-iskedyul ng Appointment",

    # Error pages
    "Page Not Found": "Hindi Natagpuan ang Pahina",
    "The page you are looking for might have been removed or is temporarily unavailable": "Ang pahina na iyong hinahanap ay maaaring natanggal na o pansamantalang hindi magagamit",
    "Go Back to Home": "Bumalik sa Home",
    "Server Error": "Error sa Server",
    "Something went wrong on our end": "May nangyaring mali sa aming panig",
    "Access Denied": "Tinanggihan ang Access",
    "You do not have permission to access this page": "Wala kang pahintulot na ma-access ang pahinang ito",
    "You are currently offline": "Kasalukuyan kang offline",
    "Please check your internet connection and try again": "Mangyaring suriin ang iyong koneksyon sa internet at subukan muli",

    # Contact
    "Contact the Municipal Government": "Makipag-ugnayan sa Pamahalaang Munisipal",
    "Get in touch with the municipal government of Solano": "Makipag-ugnayan sa pamahalaang munisipal ng Solano",
    "Office Hours": "Oras ng Opisina",
    "Municipal Hall Address": "Adres ng Munisipyo",

    # Sitemap
    "Site Map": "Mapa ng Site",
    "Complete listing of all pages and sections": "Kumpletong listahan ng lahat ng pahina at seksyon",

    # Common UI
    "Back to Top": "Bumalik sa Itaas",
    "Read More": "Magbasa Pa",
    "Show More": "Ipakita Pa",
    "Show Less": "Ipakita ang Mas Kaunti",
    "Search": "Maghanap",
    "Search...": "Maghanap...",
    "Close": "Isara",
    "Open": "Buksan",
    "Submit": "Isumite",
    "Cancel": "Kanselahin",
    "Save": "I-save",
    "Delete": "Tanggalin",
    "Edit": "I-edit",
    "View": "Tingnan",
    "Download": "I-download",
    "Print": "I-print",
    "Share": "Ibahagi",
    "Copy": "Kopyahin",
    "Next": "Susunod",
    "Previous": "Nakaraan",
    "First": "Una",
    "Last": "Huli",
    "Loading...": "Naglo-load...",
    "No results found": "Walang nahanap na resulta",
    "Please wait...": "Mangyaring maghintay...",
    "Error occurred": "May naganap na error",
    "Try again": "Subukan muli",
    "Learn More": "Matuto Pa",
    "View All": "Tingnan Lahat",
    "See All": "Tingnan Lahat",
    "All Rights Reserved": "Lahat ng Karapatan ay Nakalaan",
    "Quick Links": "Mga Mabilisang Link",
    "Useful Links": "Mga Kapaki-pakinabang na Link",
    "Follow Us": "Sundan Kami",
    "Connect With Us": "Makipag-ugnayan sa Amin",
    "About Us": "Tungkol sa Amin",
    "Our Mission": "Ang Aming Misyon",
    "Our Vision": "Ang Aming Bisyon",
}

# ============================================================
# ILOCANO - Build from Filipino with systematic substitutions
# ============================================================

def build_ilo_from_fil(fil_dict):
    """Build Ilocano translations using Filipino as reference + systematic word substitutions."""
    fil_to_ilo = {
        # Time
        'araw': 'aldaw', 'Araw': 'Aldaw',
        'oras': 'oras', 'minuto': 'minuto',
        'linggo': 'lawas', 'buwan': 'bulan', 'Buwan': 'Bulan',
        'taon': 'tawen', 'Taon': 'Tawen',
        # Months
        'Enero': 'Enero', 'Pebrero': 'Pebrero',
        'Marso': 'Marso', 'Hunyo': 'Hunio',
        'Setyembre': 'Septiembre', 'Disyembre': 'Disiembre',
        # Days
        'Lun-Biy': 'Lun-Biy',
        # Common words
        'mga': 'dagiti', 'Mga': 'Dagiti',
        'ang': 'ti', 'Ang': 'Ti',
        'ng': 'ti', 'sa': 'iti',
        'at': 'ken', 'o': 'wenno',
        'para': 'para', 'mula': 'manipud',
        'kung': 'no', 'Kung': 'No',
        'hindi': 'saan', 'Hindi': 'Saan',
        'wala': 'awan', 'Wala': 'Awan', 'Walang': 'Awan ti',
        'oo': 'wen', 'Oo': 'Wen',
        'libre': 'libre', 'Libre': 'Libre',
        # Government
        'Munisipyo': 'Munisipalidad',
        'Alkalde': 'Mayor', 'alkalde': 'mayor',
        'Opisina': 'Opisina', 'opisina': 'opisina',
        'Kagawaran': 'Departamento',
        'Ingat-Yaman': 'Tesorero',
        'Tagapagtasa': 'Assessor',
        'Inhinyeriya': 'Inhinyeria',
        'Kalusugan': 'Salun-at',
        # Services
        'Serbisyo': 'Serbisio', 'serbisyo': 'serbisio',
        'Serbisyong': 'Serbisio a',
        'Pagproseso': 'Panagproseso', 'pagproseso': 'panagproseso',
        'Pagbabayad': 'Panagbayad', 'pagbabayad': 'panagbayad',
        'Pagbibigay': 'Panagipaay', 'pagbibigay': 'panagipaay',
        'Pagpaparehistro': 'Panagparehistro', 'pagpaparehistro': 'panagparehistro',
        'Pagsubaybay': 'Panagmonitor', 'pagsubaybay': 'panagmonitor',
        'Pagpapanatili': 'Panagtaginayon',
        'Paghahanda': 'Panagisagana', 'paghahanda': 'panagisagana',
        'Pagsusuri': 'Panagrepaso', 'pagsusuri': 'panagrepaso',
        'Pagsusumite': 'Panagisumite', 'pagsusumite': 'panagisumite',
        'Pagtatasa': 'Panagpatasa', 'pagtatasa': 'panagpatasa',
        'Pagwawasto': 'Panagkorehir', 'pagwawasto': 'panagkorehir',
        'Pamamahagi': 'Panagipakat', 'pamamahagi': 'panagipakat',
        'Pamamahala': 'Panagtaripato', 'pamamahala': 'panagtaripato',
        'Pagsasanay': 'Panagsanay', 'pagsasanay': 'panagsanay',
        'Pagpapatupad': 'Panangipakat',
        'Pagpapaunlad': 'Panagrang-ay', 'pagpapaunlad': 'panagrang-ay',
        'Pagkuha': 'Panagala', 'pagkuha': 'panagala',
        'Pagkatay': 'Panagparti', 'pagkatay': 'panagparti',
        'Paglabas': 'Panagiruar', 'paglabas': 'panagiruar',
        'Pagtanggap': 'Panagawat', 'pagtanggap': 'panagawat',
        'Pag-upa': 'Panagabang', 'pag-upa': 'panagabang',
        'Pag-renew': 'Panagpabaro', 'pag-renew': 'panagpabaro',
        'Pag-apruba': 'Panag-apruba', 'pag-apruba': 'panag-apruba',
        # Documents
        'Sertipiko': 'Sertipiko', 'sertipiko': 'sertipiko',
        'Sertipikasyon': 'Sertipikasion', 'sertipikasyon': 'sertipikasion',
        'Permiso': 'Permiso', 'permiso': 'permiso',
        'Lisensya': 'Lisensia', 'lisensya': 'lisensia',
        'Resolusyon': 'Resolusion', 'resolusyon': 'resolusion',
        'Ordinansa': 'Ordinansa', 'ordinansa': 'ordinansa',
        'Rekord': 'Rekord', 'rekord': 'rekord',
        'Ulat': 'Report', 'ulat': 'report',
        'Badyet': 'Badyet', 'badyet': 'badyet',
        'Bayad': 'Bayad', 'bayad': 'bayad',
        'Gastusin': 'Gastos', 'gastusin': 'gastos',
        'Kita': 'Sapul', 'kita': 'sapul',
        'Buwis': 'Buwis', 'buwis': 'buwis',
        # People
        'Magsasaka': 'Mannalon', 'magsasaka': 'mannalon',
        'Mangingisda': 'Mangngalap', 'mangingisda': 'mangngalap',
        'Kliyente': 'Kliente', 'kliyente': 'kliente',
        'Benepisyaryo': 'Benepisario', 'benepisyaryo': 'benepisario',
        'May-ari': 'Akinkukua', 'may-ari': 'akinkukua',
        'Kamag-anak': 'Kabagian', 'kamag-anak': 'kabagian',
        'Kinatawan': 'Pannakabagi', 'kinatawan': 'pannakabagi',
        'Mamamayan': 'Umili', 'mamamayan': 'umili',
        'Matatandang': 'Nataengan a',
        # Nouns
        'Impormasyon': 'Impormasion', 'impormasyon': 'impormasion',
        'Kahilingan': 'Kiddaw', 'kahilingan': 'kiddaw',
        'Kinakailangan': 'Kasapulan', 'kinakailangan': 'kasapulan',
        'Kinakailangang': 'Kasapulan a',
        'Lokasyon': 'Lokasion', 'lokasyon': 'lokasion',
        'Negosyo': 'Negosio', 'negosyo': 'negosio',
        'Trabaho': 'Trabaho', 'trabaho': 'trabaho',
        'Pamilihan': 'Tiendaan', 'pamilihan': 'tiendaan',
        'Katayan': 'Pagpartian', 'katayan': 'pagpartian',
        'Ari-arian': 'Kukua', 'ari-arian': 'kukua',
        'Lupa': 'Daga', 'lupa': 'daga',
        'Gusali': 'Pasdek', 'gusali': 'pasdek',
        'Sasakyan': 'Lugan', 'sasakyan': 'lugan',
        'Kagamitan': 'Ramit', 'kagamitan': 'ramit',
        'Kapaligiran': 'Aglawlaw', 'kapaligiran': 'aglawlaw',
        'Sakuna': 'Didigra', 'sakuna': 'didigra',
        'Tubig': 'Danum', 'tubig': 'danum',
        'Kuryente': 'Koriente', 'kuryente': 'koriente',
        'Pagkain': 'Makan', 'pagkain': 'makan',
        'Balita': 'Damag', 'balita': 'damag',
        # Adjectives
        'Bagong': 'Baro a', 'bagong': 'baro a',
        'Bago': 'Baro', 'bago': 'baro',
        'Mahalagang': 'Napateg a', 'mahalagang': 'napateg a',
        'Mahalaga': 'Napateg', 'mahalaga': 'napateg',
        'Pangunahing': 'Kangrunaan a', 'pangunahing': 'kangrunaan a',
        'Kasalukuyan': 'Agtultuloy',
        'Natapos': 'Nalpas',
        'Nakabinbin': 'Agur-uray',
        'Naaprubahan': 'Naaprubaran',
        'Natanggap': 'Naawat',
        'Nabayaran': 'Nabayadan',
        'Nailabas': 'Nairuar',
        'Naibigay': 'Naipaay',
        'Nasuri': 'Narepaso',
        'Nasertipikahan': 'Nasertipikaran',
        'Nairehistro': 'Naiparehistro',
        'Nalutas': 'Narisut',
        'Balido': 'Balido',
        # Verbs
        'Isumite': 'Isumite', 'isumite': 'isumite',
        'Tingnan': 'Kitaen', 'tingnan': 'kitaen',
        'Bumalik': 'Agsubli', 'bumalik': 'agsubli',
        'Magbayad': 'Agbayad', 'magbayad': 'agbayad',
        'Tanggapin': 'Awaten', 'tanggapin': 'awaten',
        'Kunin': 'Alaen', 'kunin': 'alaen',
        'Piliin': 'Pilien', 'piliin': 'pilien',
        'Maghanap': 'Agsapul', 'maghanap': 'agsapul',
        'Isara': 'Irikep', 'isara': 'irikep',
        'Buksan': 'Lukatan', 'buksan': 'lukatan',
        'Kanselahin': 'Ikansela', 'kanselahin': 'ikansela',
        'Ibahagi': 'Ibingay', 'ibahagi': 'ibingay',
        'Kopyahin': 'Kopiaen', 'kopyahin': 'kopiaen',
        # UI terms
        'Susunod': 'Sumaruno', 'susunod': 'sumaruno',
        'Nakaraan': 'Napalabas', 'nakaraan': 'napalabas',
        'Una': 'Umuna', 'una': 'umuna',
        'Huli': 'Maudi', 'huli': 'maudi',
    }

    ilo = {}
    for en_key, fil_val in fil_dict.items():
        ilo_val = fil_val
        # Apply word substitutions (longest first to avoid partial matches)
        for fil_word in sorted(fil_to_ilo.keys(), key=len, reverse=True):
            ilo_word = fil_to_ilo[fil_word]
            ilo_val = re.sub(r'\b' + re.escape(fil_word) + r'\b', ilo_word, ilo_val)
        ilo[en_key] = ilo_val
    return ilo


# ============================================================
# KEEP-AS-IS patterns (proper nouns, acronyms, numbers, etc.)
# ============================================================

KEEP_AS_IS = {
    'BLGF Portal', 'CMCI DTI Portal', 'LGU Solano Facebook',
    'PhilHealth', 'GSIS', 'SSS', 'Pag-IBIG', 'BFP', 'PNP', 'DILG',
    'MDRRMO', 'MSWDO', 'SEEDO', 'MPDO', 'BIR', 'DTI', 'SEC', 'DENR',
    'DPWH', 'DSWD', 'PSA', 'NBI', 'COA', 'CSC', 'DBM', 'DOH',
    'MTOF', 'BPLS', 'RPT', 'CTC', 'RPTA', 'Filipizen',
    'BetterSolano.org', 'Better Solano', 'Abakada.org',
    'Sangguniang Bayan', 'Sangguniang Panlalawigan',
    'Nueva Vizcaya', 'Solano', 'Bayombong', 'Facebook', 'Google',
}

KEEP_PATTERNS = [
    r'^\d[\d\.\,\%\₱\s\-\+\/\(\)]*$',
    r'^\d+\s*(AM|PM)\s*-\s*\d+\s*(AM|PM)',
    r'^[\₱\$]\s*[\d\,\.]+',
    r'^\d+x\d+',
    r'^0\d{3}\s*\d{3}\s*\d{4}$',
    r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    r'^https?://',
]


def is_bad_translation(en_val, translated_val):
    """Detect bad mixed-language translations from Pass 1 word-by-word approach."""
    if en_val == translated_val:
        return False  # Not translated at all, not "bad"
    if len(en_val.split()) < 4:
        return False  # Short phrases are usually OK

    en_words = set(w.lower() for w in re.findall(r'[a-zA-Z]+', en_val) if len(w) > 2)
    tr_words = set(w.lower() for w in re.findall(r'[a-zA-Z]+', translated_val) if len(w) > 2)

    if not en_words:
        return False

    # Calculate overlap of English words still present in translation
    overlap = len(en_words & tr_words) / len(en_words)
    return overlap > 0.55  # More than 55% English words remain = bad translation


def should_keep(val):
    """Check if a value should be kept as-is (proper nouns, numbers, etc.)."""
    if val in KEEP_AS_IS:
        return True
    for pat in KEEP_PATTERNS:
        if re.match(pat, val):
            return True
    # Single word or very short
    if len(val.split()) <= 1 and len(val) < 20:
        # Check if it's a proper noun, acronym, or number
        if re.match(r'^[A-Z]{2,}', val) or re.match(r'^\d', val):
            return True
    return False

# ============================================================
# MAIN EXECUTION
# ============================================================

def main():
    print("=" * 60)
    print("PASS 3: COMPREHENSIVE SENTENCE-LEVEL TRANSLATION")
    print("Also fixes bad mixed-language translations from Pass 1")
    print("=" * 60)

    with open(TRANSLATIONS_JS, 'r') as f:
        content = f.read()

    en, en_order = extract_lang_dict(content, 'en')
    fil, fil_order = extract_lang_dict(content, 'fil')
    ilo, ilo_order = extract_lang_dict(content, 'ilo')

    print(f"Total keys: en={len(en)}, fil={len(fil)}, ilo={len(ilo)}")

    # Merge all Filipino dictionaries
    all_fil = {}
    for d in [FIL, FIL2, FIL3, FIL4, FIL5, FIL6, FIL7]:
        all_fil.update(d)

    print(f"Pass 3 dictionary size: {len(all_fil)} entries")

    # Build Ilocano from Filipino
    all_ilo = build_ilo_from_fil(all_fil)

    # Count states before
    untranslated_fil = sum(1 for k in en if fil.get(k) == en[k])
    untranslated_ilo = sum(1 for k in en if ilo.get(k) == en[k])
    bad_fil = sum(1 for k in en if is_bad_translation(en[k], fil.get(k, '')))
    bad_ilo = sum(1 for k in en if is_bad_translation(en[k], ilo.get(k, '')))

    print(f"\nBefore:")
    print(f"  FIL untranslated: {untranslated_fil}, bad translations: {bad_fil}")
    print(f"  ILO untranslated: {untranslated_ilo}, bad translations: {bad_ilo}")

    # Apply translations - both untranslated AND bad translations
    fil_new = 0
    fil_fixed = 0
    ilo_new = 0
    ilo_fixed = 0

    for key in en:
        en_val = en[key]

        # Skip keep-as-is values
        if should_keep(en_val):
            continue

        # Filipino: apply if untranslated OR bad translation
        if en_val in all_fil:
            new_val = all_fil[en_val]
            if new_val != en_val:
                if fil.get(key) == en_val:
                    fil[key] = new_val
                    fil_new += 1
                elif is_bad_translation(en_val, fil.get(key, '')):
                    fil[key] = new_val
                    fil_fixed += 1

        # Ilocano: apply if untranslated OR bad translation
        if en_val in all_ilo:
            new_val = all_ilo[en_val]
            if new_val != en_val:
                if ilo.get(key) == en_val:
                    ilo[key] = new_val
                    ilo_new += 1
                elif is_bad_translation(en_val, ilo.get(key, '')):
                    ilo[key] = new_val
                    ilo_fixed += 1

    print(f"\nApplied:")
    print(f"  FIL: {fil_new} new + {fil_fixed} fixed = {fil_new + fil_fixed}")
    print(f"  ILO: {ilo_new} new + {ilo_fixed} fixed = {ilo_new + ilo_fixed}")

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

    print("\nRebuilding translations.js...")
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

    after_untrans_fil = sum(1 for k in v_en if v_fil.get(k) == v_en[k])
    after_untrans_ilo = sum(1 for k in v_en if v_ilo.get(k) == v_en[k])
    after_bad_fil = sum(1 for k in v_en if is_bad_translation(v_en[k], v_fil.get(k, '')))
    after_bad_ilo = sum(1 for k in v_en if is_bad_translation(v_en[k], v_ilo.get(k, '')))

    total_en = len(v_en)
    trans_fil = total_en - after_untrans_fil
    trans_ilo = total_en - after_untrans_ilo

    print(f"\n{'='*60}")
    print(f"RESULTS:")
    print(f"  FIL: {trans_fil}/{total_en} translated ({trans_fil/total_en*100:.1f}%)")
    print(f"       {after_untrans_fil} untranslated, {after_bad_fil} bad remaining")
    print(f"  ILO: {trans_ilo}/{total_en} translated ({trans_ilo/total_en*100:.1f}%)")
    print(f"       {after_untrans_ilo} untranslated, {after_bad_ilo} bad remaining")
    print(f"  Key parity: en={len(v_en)}, fil={len(v_fil)}, ilo={len(v_ilo)}")

    # Show remaining untranslated (first 20)
    remaining = []
    for k in v_en:
        if v_fil.get(k) == v_en[k] and not should_keep(v_en[k]):
            remaining.append((k, v_en[k]))

    if remaining:
        print(f"\n--- Still untranslated FIL ({len(remaining)} translatable, first 20) ---")
        for k, v in remaining[:20]:
            print(f"  {k}: \"{v[:80]}\"")

    # Show remaining bad translations (first 10)
    bad_remaining = []
    for k in v_en:
        if is_bad_translation(v_en[k], v_fil.get(k, '')):
            bad_remaining.append((k, v_en[k], v_fil[k]))

    if bad_remaining:
        print(f"\n--- Bad FIL translations remaining ({len(bad_remaining)}, first 10) ---")
        for k, en_v, fil_v in bad_remaining[:10]:
            print(f"  {k}:")
            print(f"    EN:  \"{en_v[:70]}\"")
            print(f"    FIL: \"{fil_v[:70]}\"")

    print(f"\n{'='*60}")
    print("PASS 3 COMPLETE")


if __name__ == '__main__':
    main()
