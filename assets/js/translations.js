/**
 * Better Solano - Enhanced Translation System
 * Supports: English (en), Filipino (fil), Ilocano (ilo)
 * Updated: 2025-12-05
 */

const translations = {
    en: {
        // Navigation
        "nav-home": "Home",
        "nav-services": "Services",
        "nav-government": "Government",
        "nav-statistics": "Statistics",
        "nav-legislative": "Legislative",
        "nav-transparency": "Transparency",
        "nav-contact": "Contact",
        "nav-budget": "Budget",
        "nav-news": "News",
        "nav-faq": "FAQ",
        
        // Statistics Page
        "stats-title": "Municipal Statistics",
        "stats-subtitle": "Data and statistics about Solano, Nueva Vizcaya",
        "stats-demographics": "Demographics Overview",
        "stats-economic": "Economic Indicators",
        "stats-barangay": "Population by Barangay",
        
        // Breadcrumbs
        "breadcrumb-home": "Home",
        "breadcrumb-services": "Services",
        "breadcrumb-government": "Government",
        "breadcrumb-budget": "Budget & Transparency",
        "breadcrumb-contact": "Contact",
        "breadcrumb-faq": "FAQ",
        "breadcrumb-accessibility": "Accessibility",
        "breadcrumb-statistics": "Statistics",
        "breadcrumb-legislative": "Legislative",
        "breadcrumb-news": "News",
        
        // Hero Section
        "hero-welcome": "Welcome to BetterSolano.org",
        "hero-subtitle": "Access government services, information, and resources for the people of Solano, Nueva Vizcaya.",
        "hero-browse": "Browse Services",
        "hero-contact": "Contact Us",
        "hero-search-placeholder": "Search for services...",

        // Popular Services
        "section-popular": "Popular Services",
        "service-certificates": "Certificates",
        "service-certificates-desc": "Birth, marriage, death certificates",
        "service-business": "Business Permits",
        "service-business-desc": "New permits and renewals",
        "service-tax": "Tax Payments",
        "service-tax-desc": "Property and business taxes",
        "service-social": "Social Services",
        "service-social-desc": "Senior citizen & PWD services",
        "service-health": "Health Services",
        "service-health-desc": "Medical assistance & programs",
        "btn-view-all-services": "View All Services",
        "btn-view-services": "View Services",
        "btn-learn-more": "Learn More",
        "btn-apply-now": "Apply Now",
        "btn-download": "Download",
        
        // Latest Updates
        "section-updates": "Latest Updates",
        "btn-view-all": "View All",
        "btn-read-more": "Read More",
        
        // Municipal Leadership
        "section-leadership": "Municipal Leadership",
        "title-mayor": "Municipal Mayor",
        "title-vice-mayor": "Municipal Vice Mayor",
        "btn-view-officials": "View All Officials",
        
        // Contact Section
        "section-contact": "Contact Information",
        "contact-phone": "Phone",
        "contact-email": "Email",
        "contact-address": "Address",
        "contact-visit": "Visit Us",
        "contact-hours": "Mon-Fri: 8:00 AM - 5:00 PM",
        "contact-response": "We'll respond within 24 hours",
        "contact-municipal-hall": "Municipal Hall",
        
        // Footer
        "footer-title": "Better Solano",
        "footer-desc": "A service-first information portal for the Municipality of Solano, Nueva Vizcaya.",
        "footer-quick-links": "Quick Links",
        "footer-all-services": "All Services",
        "footer-officials": "Officials",
        "footer-contact-us": "Contact Us",
        "footer-faq": "FAQ",
        "footer-contact": "Contact",
        "footer-copyright": "Better Solano. All rights reserved.",
        "accessibility-statement": "Accessibility Statement",
        "footer-privacy": "Privacy Policy",
        "footer-terms": "Terms of Use",

        // Services Page
        "services-title": "Municipal Services Directory",
        "services-subtitle": "Browse all services offered by the Municipality of Solano",
        "search-placeholder": "Search services...",
        "search-no-results": "No services found",
        "search-try-different": "Try different keywords or browse categories below",
        "life-events-title": "Browse by Life Event",
        "life-events-subtitle": "Find services based on what's happening in your life",
        "life-starting-business": "Starting a Business",
        "life-getting-married": "Getting Married",
        "life-having-baby": "Having a Baby",
        "life-financial-help": "Need Financial Help",
        "life-senior": "Senior Citizen Services",
        "life-pwd": "Person with Disability",
        "life-building": "Building/Home Improvement",
        "life-trouble": "Got in Trouble",
        "life-death": "Death in Family",
        "life-education": "Education & Scholarship",
        
        // Service Categories
        "cat-certificates": "Certificates & Vital Records",
        "cat-certificates-desc": "Birth, death, marriage certificates, and other vital records.",
        "cat-business": "Business, Trade & Investment",
        "cat-business-desc": "Business permits, licenses, and trade registration services.",
        "cat-social": "Social Services & Assistance",
        "cat-social-desc": "Welfare programs, senior citizen services, PWD benefits, and financial aid.",
        "cat-health": "Health & Wellness",
        "cat-health-desc": "Vaccination programs, health certificates, and medical assistance.",
        "cat-tax": "Taxation & Payments",
        "cat-tax-desc": "Property tax, business tax, payments, and tax clearance.",
        "cat-agriculture": "Agriculture & Economic Development",
        "cat-agriculture-desc": "Agricultural loans, crop insurance, fertilizer assistance, and training.",
        "cat-infrastructure": "Infrastructure & Public Works",
        "cat-infrastructure-desc": "Construction permits, road maintenance requests, and public facilities.",
        "cat-education": "Education & Scholarship",
        "cat-education-desc": "Scholarship programs, student assistance, and educational grants.",
        "cat-safety": "Public Safety & Security",
        "cat-safety-desc": "Emergency services, disaster preparedness, and community safety programs.",
        "cat-environment": "Environment & Natural Resources",
        "cat-environment-desc": "Environmental permits, waste management, and conservation programs.",
        "cat-online": "Online Services",
        "cat-online-desc": "Digital services available through Filipizen and other online platforms.",

        // Service Details
        "service-requirements": "Requirements",
        "service-steps": "Steps",
        "service-fees": "Fees",
        "service-processing-time": "Processing Time",
        "service-office": "Office",
        "service-schedule": "Schedule",
        "service-contact": "Contact",
        "service-notes": "Important Notes",
        "service-related": "Related Services",
        
        // Government Page
        "gov-title": "Government Structure & Officials",
        "gov-subtitle": "Meet the leadership and offices serving Solano",
        "gov-executive": "Executive Branch",
        "gov-sb-members": "Sangguniang Bayan Members",
        "gov-sb-subtitle": "Municipal Councilors serving the people of Solano",
        "gov-departments": "Department Heads & Key Offices",
        "gov-dept-subtitle": "Municipal offices providing services to citizens",
        "gov-barangays": "Barangays of Solano",
        "gov-barangays-count": "22 Barangays serving our community",
        
        // Budget Page
        "budget-title": "Budget & Financial Transparency",
        "budget-subtitle": "Tracking municipal finances and projects for accountability",
        "budget-overview": "2025 Municipal Budget Overview",
        "budget-total": "Total Budget",
        "budget-personnel": "Personnel Services",
        "budget-operations": "Operations",
        "budget-capital": "Capital Outlay",
        "budget-by-dept": "Budget by Department",
        "budget-projects": "Major Projects 2025",
        "budget-reports": "Financial Reports & Documents",
        "budget-metrics": "Transparency Metrics",
        "budget-utilization": "Budget Utilization Rate",
        "budget-foi": "Freedom of Information Requests",
        "budget-response-time": "Average Response Time",
        
        // FAQ Page
        "faq-title": "Frequently Asked Questions",
        "faq-subtitle": "Find answers to common questions about municipal services",
        "faq-general": "General Questions",
        "faq-certificates": "Certificates & Documents",
        "faq-business": "Business & Permits",
        "faq-payments": "Payments & Fees",
        "faq-social": "Social Services",
        "faq-technical": "Technical Questions",
        "faq-still-questions": "Still have questions?",
        "faq-contact-help": "If you didn't find the answer you were looking for, please don't hesitate to contact us. We're here to help!",

        // Contact Page
        "contact-title": "Contact Us",
        "contact-subtitle": "We're here to help. Reach out to us through any of these channels.",
        "contact-send-message": "Send Us a Message",
        "contact-form-subtitle": "Have a question, suggestion, or feedback? Fill out the form below.",
        "contact-office-hours": "Office Hours",
        "contact-regular-hours": "Regular Hours",
        "contact-closed": "Closed",
        "contact-emergency": "Emergency Hotline",
        "contact-hotlines": "Emergency Hotlines",
        "contact-hotlines-desc": "For emergencies and inquiries, contact these numbers anytime.",
        "contact-weekends": "Weekends & Holidays",
        "contact-send-btn": "Send Message",
        
        // Form Labels
        "form-name": "Full Name",
        "form-email": "Email Address",
        "form-phone": "Phone Number",
        "form-subject": "Subject",
        "form-message": "Message",
        "form-select-subject": "Select a subject...",
        "form-service-inquiry": "Service Inquiry",
        "form-complaint": "Complaint",
        "form-suggestion": "Suggestion",
        "form-general": "General Question",
        "form-website-issue": "Website Issue",
        "form-request-response": "I would like to receive a response",
        "form-required": "Required",
        "form-optional": "Optional",
        "form-submit": "Submit",
        "form-cancel": "Cancel",
        "form-success": "Your message has been sent successfully!",
        "form-error": "There was an error sending your message. Please try again.",
        
        // Accessibility Page
        "access-title": "Accessibility Statement",
        "access-subtitle": "Our commitment to digital accessibility for all citizens",
        "access-commitment": "Our Commitment",
        "access-conformance": "Conformance Status",
        "access-features": "Accessibility Features",
        "access-limitations": "Known Limitations",
        "access-alternative": "Alternative Access",
        "access-feedback": "Feedback",
        "access-technical": "Technical Specifications",
        "access-assessment": "Assessment Approach",
        "access-promise": "Our Promise",
        
        // Common UI Elements
        "loading": "Loading...",
        "error": "Error",
        "success": "Success",
        "warning": "Warning",
        "info": "Information",
        "close": "Close",
        "back": "Back",
        "next": "Next",
        "previous": "Previous",
        "save": "Save",
        "delete": "Delete",
        "edit": "Edit",
        "view": "View",
        "print": "Print",
        "share": "Share",
        "copy": "Copy",
        "search": "Search",
        "filter": "Filter",
        "sort": "Sort",
        "all": "All",
        "none": "None",
        "yes": "Yes",
        "no": "No",
        "or": "or",
        "and": "and"
    },


    fil: {
        // Navigation - Filipino (Tagalog)
        "nav-home": "Tahanan",
        "nav-services": "Mga Serbisyo",
        "nav-government": "Pamahalaan",
        "nav-statistics": "Estadistika",
        "nav-legislative": "Lehislatura",
        "nav-transparency": "Transparensiya",
        "nav-contact": "Makipag-ugnayan",
        "nav-budget": "Badyet",
        "nav-news": "Balita",
        "nav-faq": "Mga Tanong",
        
        // Statistics Page
        "stats-title": "Estadistika ng Munisipalidad",
        "stats-subtitle": "Datos at estadistika tungkol sa Solano, Nueva Vizcaya",
        "stats-demographics": "Pangkalahatang-ideya ng Demograpiya",
        "stats-economic": "Mga Tagapagpahiwatig ng Ekonomiya",
        "stats-barangay": "Populasyon Ayon sa Barangay",
        
        // Breadcrumbs
        "breadcrumb-home": "Tahanan",
        "breadcrumb-services": "Mga Serbisyo",
        "breadcrumb-government": "Pamahalaan",
        "breadcrumb-budget": "Badyet at Transparensiya",
        "breadcrumb-contact": "Makipag-ugnayan",
        "breadcrumb-faq": "Mga Madalas Itanong",
        "breadcrumb-accessibility": "Aksesibilidad",
        "breadcrumb-statistics": "Estadistika",
        "breadcrumb-legislative": "Lehislatura",
        "breadcrumb-news": "Balita",
        
        // Hero Section
        "hero-welcome": "Maligayang Pagdating sa BetterSolano.org",
        "hero-subtitle": "I-access ang mga serbisyo ng pamahalaan, impormasyon, at mga mapagkukunan para sa mga mamamayan ng Solano, Nueva Vizcaya.",
        "hero-browse": "Tingnan ang mga Serbisyo",
        "hero-contact": "Makipag-ugnayan sa Amin",
        "hero-search-placeholder": "Maghanap ng serbisyo...",

        // Popular Services
        "section-popular": "Mga Sikat na Serbisyo",
        "service-certificates": "Mga Sertipiko",
        "service-certificates-desc": "Sertipiko ng kapanganakan, kasal, at kamatayan",
        "service-business": "Mga Permit sa Negosyo",
        "service-business-desc": "Bagong permit at pag-renew",
        "service-tax": "Pagbabayad ng Buwis",
        "service-tax-desc": "Buwis sa ari-arian at negosyo",
        "service-social": "Serbisyong Panlipunan",
        "service-social-desc": "Serbisyo para sa senior citizen at PWD",
        "service-health": "Serbisyong Pangkalusugan",
        "service-health-desc": "Tulong medikal at mga programa",
        "btn-view-all-services": "Tingnan Lahat ng Serbisyo",
        "btn-view-services": "Tingnan ang mga Serbisyo",
        "btn-learn-more": "Alamin Pa",
        "btn-apply-now": "Mag-apply Ngayon",
        "btn-download": "I-download",
        
        // Latest Updates
        "section-updates": "Pinakabagong Balita",
        "btn-view-all": "Tingnan Lahat",
        "btn-read-more": "Magbasa Pa",
        
        // Municipal Leadership
        "section-leadership": "Pamunuan ng Munisipalidad",
        "title-mayor": "Punong Bayan",
        "title-vice-mayor": "Bise Punong Bayan",
        "btn-view-officials": "Tingnan Lahat ng Opisyal",
        
        // Contact Section
        "section-contact": "Impormasyon sa Pakikipag-ugnayan",
        "contact-phone": "Telepono",
        "contact-email": "Email",
        "contact-address": "Tirahan",
        "contact-visit": "Bisitahin Kami",
        "contact-hours": "Lunes-Biyernes: 8:00 AM - 5:00 PM",
        "contact-response": "Sasagutin namin sa loob ng 24 na oras",
        "contact-municipal-hall": "Munisipyo",
        
        // Footer
        "footer-title": "Better Solano",
        "footer-desc": "Isang portal ng impormasyon na inuuna ang serbisyo para sa Munisipalidad ng Solano, Nueva Vizcaya.",
        "footer-quick-links": "Mabilis na Links",
        "footer-all-services": "Lahat ng Serbisyo",
        "footer-officials": "Mga Opisyal",
        "footer-contact-us": "Makipag-ugnayan sa Amin",
        "footer-faq": "Mga Madalas Itanong",
        "footer-contact": "Makipag-ugnayan",
        "footer-copyright": "Better Solano. Nakalaan ang lahat ng karapatan.",
        "accessibility-statement": "Pahayag ng Aksesibilidad",
        "footer-privacy": "Patakaran sa Privacy",
        "footer-terms": "Mga Tuntunin ng Paggamit",

        // Services Page
        "services-title": "Direktoryo ng Serbisyong Munisipal",
        "services-subtitle": "Tingnan ang lahat ng serbisyong inaalok ng Munisipalidad ng Solano",
        "search-placeholder": "Maghanap ng serbisyo...",
        "search-no-results": "Walang nahanap na serbisyo",
        "search-try-different": "Subukan ang ibang mga keyword o tingnan ang mga kategorya sa ibaba",
        "life-events-title": "Maghanap Ayon sa Pangyayari sa Buhay",
        "life-events-subtitle": "Hanapin ang mga serbisyo batay sa nangyayari sa iyong buhay",
        "life-starting-business": "Magsimula ng Negosyo",
        "life-getting-married": "Magpakasal",
        "life-having-baby": "Magkaanak",
        "life-financial-help": "Kailangan ng Tulong Pinansyal",
        "life-senior": "Serbisyo para sa Senior Citizen",
        "life-pwd": "Taong may Kapansanan",
        "life-building": "Pagtatayo/Pagpapabuti ng Bahay",
        "life-trouble": "May Problema",
        "life-death": "Pagkamatay sa Pamilya",
        "life-education": "Edukasyon at Iskolarship",
        
        // Service Categories
        "cat-certificates": "Mga Sertipiko at Vital Records",
        "cat-certificates-desc": "Sertipiko ng kapanganakan, kamatayan, kasal, at iba pang vital records.",
        "cat-business": "Negosyo, Kalakalan at Pamumuhunan",
        "cat-business-desc": "Mga permit sa negosyo, lisensya, at serbisyo sa pagpaparehistro ng kalakalan.",
        "cat-social": "Serbisyong Panlipunan at Tulong",
        "cat-social-desc": "Mga programa sa kapakanan, serbisyo para sa senior citizen, benepisyo ng PWD, at tulong pinansyal.",
        "cat-health": "Kalusugan at Kagalingan",
        "cat-health-desc": "Mga programa sa bakuna, health certificates, at tulong medikal.",
        "cat-tax": "Pagbubuwis at Pagbabayad",
        "cat-tax-desc": "Buwis sa ari-arian, buwis sa negosyo, pagbabayad, at tax clearance.",
        "cat-agriculture": "Agrikultura at Pag-unlad ng Ekonomiya",
        "cat-agriculture-desc": "Mga pautang sa agrikultura, insurance sa pananim, tulong sa pataba, at pagsasanay.",
        "cat-infrastructure": "Imprastraktura at Pampublikong Gawa",
        "cat-infrastructure-desc": "Mga permit sa konstruksyon, kahilingan sa pagpapanatili ng kalsada, at pampublikong pasilidad.",
        "cat-education": "Edukasyon at Iskolarship",
        "cat-education-desc": "Mga programa sa iskolarship, tulong sa estudyante, at mga grant sa edukasyon.",
        "cat-safety": "Kaligtasan at Seguridad ng Publiko",
        "cat-safety-desc": "Mga serbisyong pang-emergency, paghahanda sa sakuna, at mga programa sa kaligtasan ng komunidad.",
        "cat-environment": "Kapaligiran at Likas na Yaman",
        "cat-environment-desc": "Mga permit sa kapaligiran, pamamahala ng basura, at mga programa sa konserbasyon.",
        "cat-online": "Mga Online na Serbisyo",
        "cat-online-desc": "Mga digital na serbisyo na makukuha sa Filipizen at iba pang online platform.",

        // Service Details
        "service-requirements": "Mga Kinakailangan",
        "service-steps": "Mga Hakbang",
        "service-fees": "Mga Bayarin",
        "service-processing-time": "Oras ng Pagproseso",
        "service-office": "Opisina",
        "service-schedule": "Iskedyul",
        "service-contact": "Makipag-ugnayan",
        "service-notes": "Mahahalagang Paalala",
        "service-related": "Mga Kaugnay na Serbisyo",
        
        // Government Page
        "gov-title": "Istruktura at Opisyal ng Pamahalaan",
        "gov-subtitle": "Kilalanin ang pamunuan at mga opisina na naglilingkod sa Solano",
        "gov-executive": "Ehekutibong Sangay",
        "gov-sb-members": "Mga Miyembro ng Sangguniang Bayan",
        "gov-sb-subtitle": "Mga Konsehal na naglilingkod sa mga tao ng Solano",
        "gov-departments": "Mga Pinuno ng Departamento at Pangunahing Opisina",
        "gov-dept-subtitle": "Mga opisina ng munisipalidad na nagbibigay ng serbisyo sa mga mamamayan",
        "gov-barangays": "Mga Barangay ng Solano",
        "gov-barangays-count": "22 Barangay na naglilingkod sa ating komunidad",
        
        // Budget Page
        "budget-title": "Badyet at Transparensiya sa Pananalapi",
        "budget-subtitle": "Pagsubaybay sa pananalapi at proyekto ng munisipalidad para sa pananagutan",
        "budget-overview": "Pangkalahatang-ideya ng Badyet ng Munisipalidad 2025",
        "budget-total": "Kabuuang Badyet",
        "budget-personnel": "Serbisyo sa Tauhan",
        "budget-operations": "Operasyon",
        "budget-capital": "Capital Outlay",
        "budget-by-dept": "Badyet Ayon sa Departamento",
        "budget-projects": "Mga Pangunahing Proyekto 2025",
        "budget-reports": "Mga Ulat at Dokumento sa Pananalapi",
        "budget-metrics": "Mga Sukatan ng Transparensiya",
        "budget-utilization": "Rate ng Paggamit ng Badyet",
        "budget-foi": "Mga Kahilingan sa Freedom of Information",
        "budget-response-time": "Average na Oras ng Pagtugon",
        
        // FAQ Page
        "faq-title": "Mga Madalas Itanong",
        "faq-subtitle": "Hanapin ang mga sagot sa mga karaniwang tanong tungkol sa mga serbisyong munisipal",
        "faq-general": "Mga Pangkalahatang Tanong",
        "faq-certificates": "Mga Sertipiko at Dokumento",
        "faq-business": "Negosyo at Permit",
        "faq-payments": "Pagbabayad at Bayarin",
        "faq-social": "Serbisyong Panlipunan",
        "faq-technical": "Mga Teknikal na Tanong",
        "faq-still-questions": "May tanong pa ba?",
        "faq-contact-help": "Kung hindi mo nahanap ang sagot na hinahanap mo, huwag mag-atubiling makipag-ugnayan sa amin. Nandito kami para tumulong!",

        // Contact Page
        "contact-title": "Makipag-ugnayan sa Amin",
        "contact-subtitle": "Nandito kami para tumulong. Makipag-ugnayan sa amin sa alinman sa mga channel na ito.",
        "contact-send-message": "Magpadala ng Mensahe",
        "contact-form-subtitle": "May tanong, mungkahi, o feedback? Punan ang form sa ibaba.",
        "contact-office-hours": "Oras ng Opisina",
        "contact-regular-hours": "Regular na Oras",
        "contact-closed": "Sarado",
        "contact-emergency": "Emergency Hotline",
        "contact-hotlines": "Mga Emergency Hotline",
        "contact-hotlines-desc": "Para sa mga emergency at katanungan, tawagan ang mga numerong ito anumang oras.",
        "contact-weekends": "Sabado, Linggo at Piyesta Opisyal",
        "contact-send-btn": "Ipadala ang Mensahe",
        
        // Form Labels
        "form-name": "Buong Pangalan",
        "form-email": "Email Address",
        "form-phone": "Numero ng Telepono",
        "form-subject": "Paksa",
        "form-message": "Mensahe",
        "form-select-subject": "Pumili ng paksa...",
        "form-service-inquiry": "Katanungan sa Serbisyo",
        "form-complaint": "Reklamo",
        "form-suggestion": "Mungkahi",
        "form-general": "Pangkalahatang Tanong",
        "form-website-issue": "Problema sa Website",
        "form-request-response": "Nais kong makatanggap ng tugon",
        "form-required": "Kinakailangan",
        "form-optional": "Opsyonal",
        "form-submit": "Isumite",
        "form-cancel": "Kanselahin",
        "form-success": "Matagumpay na naipadala ang iyong mensahe!",
        "form-error": "May error sa pagpapadala ng iyong mensahe. Pakisubukan muli.",
        
        // Accessibility Page
        "access-title": "Pahayag ng Aksesibilidad",
        "access-subtitle": "Ang aming pangako sa digital na aksesibilidad para sa lahat ng mamamayan",
        "access-commitment": "Ang Aming Pangako",
        "access-conformance": "Katayuan ng Pagsunod",
        "access-features": "Mga Feature ng Aksesibilidad",
        "access-limitations": "Mga Kilalang Limitasyon",
        "access-alternative": "Alternatibong Paraan ng Pag-access",
        "access-feedback": "Feedback",
        "access-technical": "Mga Teknikal na Detalye",
        "access-assessment": "Paraan ng Pagsusuri",
        "access-promise": "Ang Aming Pangako",
        
        // Common UI Elements
        "loading": "Naglo-load...",
        "error": "Error",
        "success": "Tagumpay",
        "warning": "Babala",
        "info": "Impormasyon",
        "close": "Isara",
        "back": "Bumalik",
        "next": "Susunod",
        "previous": "Nakaraan",
        "save": "I-save",
        "delete": "Burahin",
        "edit": "I-edit",
        "view": "Tingnan",
        "print": "I-print",
        "share": "Ibahagi",
        "copy": "Kopyahin",
        "search": "Maghanap",
        "filter": "Salain",
        "sort": "Ayusin",
        "all": "Lahat",
        "none": "Wala",
        "yes": "Oo",
        "no": "Hindi",
        "or": "o",
        "and": "at"
    },


    ilo: {
        // Navigation - Ilocano (Iloko)
        "nav-home": "Pagtaengan",
        "nav-services": "Dagiti Serbisio",
        "nav-government": "Gobierno",
        "nav-statistics": "Estadistika",
        "nav-legislative": "Lehislatura",
        "nav-transparency": "Kinasiluag",
        "nav-contact": "Kontaken",
        "nav-budget": "Badyet",
        "nav-news": "Damag",
        "nav-faq": "Saludsod",
        
        // Statistics Page
        "stats-title": "Estadistika ti Munisipalidad",
        "stats-subtitle": "Datos ken estadistika maipapan iti Solano, Nueva Vizcaya",
        "stats-demographics": "Pakabuklan ti Demograpiya",
        "stats-economic": "Dagiti Pagilasinan ti Ekonomiya",
        "stats-barangay": "Populasion Sigun iti Barangay",
        
        // Breadcrumbs
        "breadcrumb-home": "Pagtaengan",
        "breadcrumb-services": "Dagiti Serbisio",
        "breadcrumb-government": "Gobierno",
        "breadcrumb-budget": "Badyet ken Kinasiluag",
        "breadcrumb-contact": "Kontaken",
        "breadcrumb-faq": "Masansan a Maisaludsod",
        "breadcrumb-accessibility": "Aksesibilidad",
        "breadcrumb-statistics": "Estadistika",
        "breadcrumb-legislative": "Lehislatura",
        "breadcrumb-news": "Damag",
        
        // Hero Section
        "hero-welcome": "Naragsak a Panangyawat iti BetterSolano.org",
        "hero-subtitle": "Aksesen dagiti serbisio ti gobierno, impormasion, ken dagiti rekurso para kadagiti umili ti Solano, Nueva Vizcaya.",
        "hero-browse": "Kitaen dagiti Serbisio",
        "hero-contact": "Kontaken Dakami",
        "hero-search-placeholder": "Agsapul ti serbisio...",

        // Popular Services
        "section-popular": "Dagiti Pagpilian a Serbisio",
        "service-certificates": "Dagiti Sertipiko",
        "service-certificates-desc": "Sertipiko ti pannakayanak, kasar, ken ipapatay",
        "service-business": "Dagiti Permit ti Negosio",
        "service-business-desc": "Baro a permit ken panagpabaro",
        "service-tax": "Panagbayad ti Buis",
        "service-tax-desc": "Buis ti sanikua ken negosio",
        "service-social": "Serbisio Sosial",
        "service-social-desc": "Serbisio para kadagiti senior citizen ken PWD",
        "service-health": "Serbisio ti Salun-at",
        "service-health-desc": "Tulong medikal ken dagiti programa",
        "btn-view-all-services": "Kitaen Amin a Serbisio",
        "btn-view-services": "Kitaen dagiti Serbisio",
        "btn-learn-more": "Ammuem Pay",
        "btn-apply-now": "Ag-apply Itan",
        "btn-download": "I-download",
        
        // Latest Updates
        "section-updates": "Kabarbaro a Damag",
        "btn-view-all": "Kitaen Amin",
        "btn-read-more": "Agbasa Pay",
        
        // Municipal Leadership
        "section-leadership": "Panangidaulo ti Munisipalidad",
        "title-mayor": "Mayor ti Munisipalidad",
        "title-vice-mayor": "Bise Mayor ti Munisipalidad",
        "btn-view-officials": "Kitaen Amin nga Opisial",
        
        // Contact Section
        "section-contact": "Impormasion ti Panagkontak",
        "contact-phone": "Telepono",
        "contact-email": "Email",
        "contact-address": "Pagtaengan",
        "contact-visit": "Bisitaen Dakami",
        "contact-hours": "Lunes-Biernes: 8:00 AM - 5:00 PM",
        "contact-response": "Sumungbat kami iti uneg ti 24 nga oras",
        "contact-municipal-hall": "Munisipio",
        
        // Footer
        "footer-title": "Better Solano",
        "footer-desc": "Maysa a portal ti impormasion a mangipangpangruna ti serbisio para iti Munisipalidad ti Solano, Nueva Vizcaya.",
        "footer-quick-links": "Dagiti Napartak a Silpo",
        "footer-all-services": "Amin a Serbisio",
        "footer-officials": "Dagiti Opisial",
        "footer-contact-us": "Kontaken Dakami",
        "footer-faq": "Masansan a Maisaludsod",
        "footer-contact": "Kontak",
        "footer-copyright": "Better Solano. Amin a karbengan ket naireserbado.",
        "accessibility-statement": "Pahayag ti Aksesibilidad",
        "footer-privacy": "Pagannurotan ti Pribado",
        "footer-terms": "Dagiti Kondision ti Panagusar",

        // Services Page
        "services-title": "Direktorio ti Serbisio ti Munisipalidad",
        "services-subtitle": "Kitaen amin a serbisio nga i-alok ti Munisipalidad ti Solano",
        "search-placeholder": "Agsapul ti serbisio...",
        "search-no-results": "Awan ti nasarakan a serbisio",
        "search-try-different": "Padasem ti sabali a keyword wenno kitaem dagiti kategorya iti baba",
        "life-events-title": "Agsapul Sigun iti Pasamak iti Biag",
        "life-events-subtitle": "Biroken dagiti serbisio a naibatay iti mapasamak iti biagmo",
        "life-starting-business": "Mangrugi ti Negosio",
        "life-getting-married": "Agkasar",
        "life-having-baby": "Aganak",
        "life-financial-help": "Kasapulan ti Tulong Pinansia",
        "life-senior": "Serbisio para kadagiti Senior Citizen",
        "life-pwd": "Tao nga Addaan Kapansanan",
        "life-building": "Panagpatakder/Panagpasayaat ti Balay",
        "life-trouble": "Adda Problema",
        "life-death": "Ipapatay iti Pamilia",
        "life-education": "Edukasion ken Iskolarship",
        
        // Service Categories
        "cat-certificates": "Dagiti Sertipiko ken Vital Records",
        "cat-certificates-desc": "Sertipiko ti pannakayanak, ipapatay, kasar, ken dadduma pay a vital records.",
        "cat-business": "Negosio, Komersio ken Panagpamuhunan",
        "cat-business-desc": "Dagiti permit ti negosio, lisensia, ken serbisio ti panagparehistro ti komersio.",
        "cat-social": "Serbisio Sosial ken Tulong",
        "cat-social-desc": "Dagiti programa ti welfare, serbisio para kadagiti senior citizen, benepisio ti PWD, ken tulong pinansia.",
        "cat-health": "Salun-at ken Kinasalun-at",
        "cat-health-desc": "Dagiti programa ti bakuna, health certificates, ken tulong medikal.",
        "cat-tax": "Panagbuis ken Panagbayad",
        "cat-tax-desc": "Buis ti sanikua, buis ti negosio, panagbayad, ken tax clearance.",
        "cat-agriculture": "Agrikultura ken Panagrang-ay ti Ekonomiya",
        "cat-agriculture-desc": "Dagiti pautang ti agrikultura, insurance ti mula, tulong ti abono, ken panagsanay.",
        "cat-infrastructure": "Imprastraktura ken Pampubliko nga Obra",
        "cat-infrastructure-desc": "Dagiti permit ti konstruksion, dawat ti panagmantener ti kalsada, ken pampubliko a pasilidad.",
        "cat-education": "Edukasion ken Iskolarship",
        "cat-education-desc": "Dagiti programa ti iskolarship, tulong ti estudiante, ken dagiti grant ti edukasion.",
        "cat-safety": "Kinatalged ken Seguridad ti Publiko",
        "cat-safety-desc": "Dagiti serbisio ti emergency, panagisagana iti didigra, ken dagiti programa ti kinatalged ti komunidad.",
        "cat-environment": "Aglawlaw ken Dagiti Natural a Rekurso",
        "cat-environment-desc": "Dagiti permit ti aglawlaw, panagtaripato ti basura, ken dagiti programa ti konserbasion.",
        "cat-online": "Dagiti Online a Serbisio",
        "cat-online-desc": "Dagiti digital a serbisio a magun-od iti Filipizen ken dadduma pay nga online platform.",

        // Service Details
        "service-requirements": "Dagiti Kasapulan",
        "service-steps": "Dagiti Addang",
        "service-fees": "Dagiti Bayadan",
        "service-processing-time": "Tiempo ti Panagproseso",
        "service-office": "Opisina",
        "service-schedule": "Iskedyul",
        "service-contact": "Kontaken",
        "service-notes": "Napateg a Paammo",
        "service-related": "Dagiti Mainaig a Serbisio",
        
        // Government Page
        "gov-title": "Estruktura ken Opisial ti Gobierno",
        "gov-subtitle": "Ammoen dagiti lider ken opisina a mangserbiserbisio iti Solano",
        "gov-executive": "Ehekutibo a Sanga",
        "gov-sb-members": "Dagiti Kameng ti Sangguniang Bayan",
        "gov-sb-subtitle": "Dagiti Konsehal a mangserbiserbisio kadagiti umili ti Solano",
        "gov-departments": "Dagiti Ulo ti Departamento ken Kangrunaan nga Opisina",
        "gov-dept-subtitle": "Dagiti opisina ti munisipalidad a mangted ti serbisio kadagiti umili",
        "gov-barangays": "Dagiti Barangay ti Solano",
        "gov-barangays-count": "22 a Barangay a mangserbiserbisio iti komunidad tayo",
        
        // Budget Page
        "budget-title": "Badyet ken Kinasiluag ti Pinansia",
        "budget-subtitle": "Panagsubaybay ti pinansia ken proyekto ti munisipalidad para iti panagresponsable",
        "budget-overview": "Pakabuklan ti Badyet ti Munisipalidad 2025",
        "budget-total": "Dagup a Badyet",
        "budget-personnel": "Serbisio ti Tauhan",
        "budget-operations": "Operasion",
        "budget-capital": "Capital Outlay",
        "budget-by-dept": "Badyet Sigun iti Departamento",
        "budget-projects": "Dagiti Kangrunaan a Proyekto 2025",
        "budget-reports": "Dagiti Report ken Dokumento ti Pinansia",
        "budget-metrics": "Dagiti Sukatan ti Kinasiluag",
        "budget-utilization": "Rate ti Panagusar ti Badyet",
        "budget-foi": "Dagiti Dawat ti Freedom of Information",
        "budget-response-time": "Average a Tiempo ti Panagsungbat",
        
        // FAQ Page
        "faq-title": "Dagiti Masansan a Maisaludsod",
        "faq-subtitle": "Biroken dagiti sungbat kadagiti gagangay a saludsod maipapan kadagiti serbisio ti munisipalidad",
        "faq-general": "Dagiti Sapasap a Saludsod",
        "faq-certificates": "Dagiti Sertipiko ken Dokumento",
        "faq-business": "Negosio ken Permit",
        "faq-payments": "Panagbayad ken Bayadan",
        "faq-social": "Serbisio Sosial",
        "faq-technical": "Dagiti Teknikal a Saludsod",
        "faq-still-questions": "Adda pay saludsodmo?",
        "faq-contact-help": "No saanmo a nasarakan ti sungbat a birbiroken mo, saan ka nga agduadua a mangkontak kadakami. Adda kami ditoy tapno tumulong!",

        // Contact Page
        "contact-title": "Kontaken Dakami",
        "contact-subtitle": "Adda kami ditoy tapno tumulong. Kontaken dakami babaen kadagitoy a pamuspusan.",
        "contact-send-message": "Mangiypatulod ti Mensahe",
        "contact-form-subtitle": "Adda saludsod, singasing, wenno feedback? Punnoen ti form iti baba.",
        "contact-office-hours": "Oras ti Opisina",
        "contact-regular-hours": "Regular nga Oras",
        "contact-closed": "Nakaserra",
        "contact-emergency": "Emergency Hotline",
        "contact-hotlines": "Dagiti Emergency Hotline",
        "contact-hotlines-desc": "Para kadagiti emergency ken saludsod, tawagan dagitoy a numero iti aniaman nga oras.",
        "contact-weekends": "Sabado, Domingo ken Piyesta Opisial",
        "contact-send-btn": "Iypatulod ti Mensahe",
        
        // Form Labels
        "form-name": "Kompleto a Nagan",
        "form-email": "Email Address",
        "form-phone": "Numero ti Telepono",
        "form-subject": "Suheto",
        "form-message": "Mensahe",
        "form-select-subject": "Agpili ti suheto...",
        "form-service-inquiry": "Saludsod ti Serbisio",
        "form-complaint": "Reklamo",
        "form-suggestion": "Singasing",
        "form-general": "Sapasap a Saludsod",
        "form-website-issue": "Problema ti Website",
        "form-request-response": "Kayatko a makaawat ti sungbat",
        "form-required": "Kasapulan",
        "form-optional": "Opsional",
        "form-submit": "Iysubmit",
        "form-cancel": "Ikansela",
        "form-success": "Balligi a naiypatulod ti mensahem!",
        "form-error": "Adda error iti panangiypatulod ti mensahem. Pangngaasi a padasem manen.",
        
        // Accessibility Page
        "access-title": "Pahayag ti Aksesibilidad",
        "access-subtitle": "Ti kari mi iti digital nga aksesibilidad para iti amin nga umili",
        "access-commitment": "Ti Kari Mi",
        "access-conformance": "Kasasaad ti Panagtungpal",
        "access-features": "Dagiti Feature ti Aksesibilidad",
        "access-limitations": "Dagiti Ammo a Limitasion",
        "access-alternative": "Alternatibo a Pamuspusan ti Panag-akses",
        "access-feedback": "Feedback",
        "access-technical": "Dagiti Teknikal a Detalye",
        "access-assessment": "Pamuspusan ti Panag-assess",
        "access-promise": "Ti Kari Mi",
        
        // Common UI Elements
        "loading": "Agkarkarga...",
        "error": "Error",
        "success": "Balligi",
        "warning": "Pakdaar",
        "info": "Impormasion",
        "close": "Iserra",
        "back": "Agsubli",
        "next": "Sumaruno",
        "previous": "Napalabas",
        "save": "I-save",
        "delete": "Ikkaten",
        "edit": "I-edit",
        "view": "Kitaen",
        "print": "I-print",
        "share": "Ibingay",
        "copy": "Kopiaen",
        "search": "Agsapul",
        "filter": "Saguten",
        "sort": "Urnosen",
        "all": "Amin",
        "none": "Awan",
        "yes": "Wen",
        "no": "Saan",
        "or": "wenno",
        "and": "ken"
    }
};


/**
 * Enhanced Translation Engine
 * Features: Auto-detection, fallback support, dynamic content, pluralization
 * Updated: 2025-12-05
 */
const TranslationEngine = {
    currentLang: 'en',
    defaultLang: 'en',
    supportedLangs: ['en', 'fil', 'ilo'],
    langNames: {
        'en': 'English',
        'fil': 'Filipino',
        'ilo': 'Ilocano'
    },
    langCodes: {
        'en': 'en',
        'fil': 'tl',
        'ilo': 'ilo'
    },
    initialized: false,
    observers: [],
    
    /**
     * Initialize the translation engine
     */
    init: function() {
        if (this.initialized) return;
        
        // Try to get saved language, then browser preference
        let savedLang = localStorage.getItem('selectedLang');
        if (!savedLang || !this.supportedLangs.includes(savedLang)) {
            savedLang = this.detectBrowserLanguage();
        }
        
        this.currentLang = savedLang;
        this.applyTranslations(this.currentLang);
        this.updateActiveButton(this.currentLang);
        this.setupEventListeners();
        this.setupMutationObserver();
        this.initialized = true;
        
        console.log('[TranslationEngine] Initialized with language:', this.currentLang);
    },
    
    /**
     * Detect browser language preference
     */
    detectBrowserLanguage: function() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();
        
        // Map common codes
        if (langCode === 'tl' || langCode === 'fil') return 'fil';
        if (langCode === 'ilo') return 'ilo';
        if (langCode === 'en') return 'en';
        
        return this.defaultLang;
    },

    /**
     * Get translation with fallback support
     */
    getTranslation: function(key, lang, params) {
        lang = lang || this.currentLang;
        let translation = null;
        
        // Try current language
        if (translations[lang] && translations[lang][key]) {
            translation = translations[lang][key];
        }
        // Fallback to default language
        else if (translations[this.defaultLang] && translations[this.defaultLang][key]) {
            translation = translations[this.defaultLang][key];
        }
        
        // Apply parameters if provided
        if (translation && params) {
            translation = this.interpolate(translation, params);
        }
        
        return translation;
    },
    
    /**
     * Interpolate parameters into translation string
     * Usage: getTranslation('greeting', 'en', { name: 'Juan' })
     * Translation: "Hello, {{name}}!" -> "Hello, Juan!"
     */
    interpolate: function(text, params) {
        return text.replace(/\{\{(\w+)\}\}/g, function(match, key) {
            return params.hasOwnProperty(key) ? params[key] : match;
        });
    },
    
    /**
     * Get plural form of translation
     * Usage: getPlural('items', 5, 'en')
     */
    getPlural: function(key, count, lang) {
        lang = lang || this.currentLang;
        const singularKey = key;
        const pluralKey = key + '_plural';
        
        if (count === 1) {
            return this.getTranslation(singularKey, lang, { count: count });
        }
        
        // Try plural form first
        let translation = this.getTranslation(pluralKey, lang, { count: count });
        if (!translation) {
            translation = this.getTranslation(singularKey, lang, { count: count });
        }
        
        return translation;
    },
    
    /**
     * Translate a specific element
     */
    translateElement: function(element, lang) {
        lang = lang || this.currentLang;
        
        // Text content
        const i18nKey = element.getAttribute('data-i18n');
        if (i18nKey) {
            const translation = this.getTranslation(i18nKey, lang);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.type === 'submit' || element.type === 'button') {
                        element.value = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            }
        }
        
        // Placeholder
        const placeholderKey = element.getAttribute('data-i18n-placeholder');
        if (placeholderKey) {
            const translation = this.getTranslation(placeholderKey, lang);
            if (translation) element.placeholder = translation;
        }
        
        // Title attribute
        const titleKey = element.getAttribute('data-i18n-title');
        if (titleKey) {
            const translation = this.getTranslation(titleKey, lang);
            if (translation) element.title = translation;
        }
        
        // Aria-label
        const ariaKey = element.getAttribute('data-i18n-aria');
        if (ariaKey) {
            const translation = this.getTranslation(ariaKey, lang);
            if (translation) element.setAttribute('aria-label', translation);
        }
        
        // Alt text for images
        const altKey = element.getAttribute('data-i18n-alt');
        if (altKey) {
            const translation = this.getTranslation(altKey, lang);
            if (translation) element.alt = translation;
        }
    },

    /**
     * Apply translations to all elements
     */
    applyTranslations: function(lang) {
        if (!translations[lang]) {
            console.warn('[TranslationEngine] Language not found:', lang, '- using default');
            lang = this.defaultLang;
        }
        
        const self = this;
        
        // Translate all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            self.translateElement(el, lang);
        });
        
        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
            self.translateElement(el, lang);
        });
        
        // Translate titles
        document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
            self.translateElement(el, lang);
        });
        
        // Translate aria-labels
        document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
            self.translateElement(el, lang);
        });
        
        // Translate alt texts
        document.querySelectorAll('[data-i18n-alt]').forEach(function(el) {
            self.translateElement(el, lang);
        });
        
        // Update document language attribute
        document.documentElement.lang = this.langCodes[lang] || lang;
        
        // Save preference
        this.currentLang = lang;
        localStorage.setItem('selectedLang', lang);
        
        // Dispatch event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { 
                language: lang, 
                langCode: this.langCodes[lang],
                langName: this.langNames[lang]
            }
        }));
        
        // Notify observers
        this.notifyObservers(lang);
    },
    
    /**
     * Update active state on language buttons
     */
    updateActiveButton: function(lang) {
        document.querySelectorAll('.lang-btn').forEach(function(btn) {
            const isActive = btn.dataset.lang === lang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            btn.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    },
    
    /**
     * Setup event listeners for language buttons
     */
    setupEventListeners: function() {
        const self = this;
        
        document.querySelectorAll('.lang-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.dataset.lang;
                if (self.supportedLangs.includes(lang)) {
                    self.switchLanguage(lang);
                }
            });
        });
        
        // Also handle select dropdowns
        document.querySelectorAll('.lang-select').forEach(function(select) {
            select.addEventListener('change', function(e) {
                const lang = this.value;
                if (self.supportedLangs.includes(lang)) {
                    self.switchLanguage(lang);
                }
            });
        });
    },

    /**
     * Setup mutation observer for dynamically added content
     */
    setupMutationObserver: function() {
        const self = this;
        
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Translate the new element if it has i18n attributes
                        if (node.hasAttribute && (
                            node.hasAttribute('data-i18n') ||
                            node.hasAttribute('data-i18n-placeholder') ||
                            node.hasAttribute('data-i18n-title') ||
                            node.hasAttribute('data-i18n-aria') ||
                            node.hasAttribute('data-i18n-alt')
                        )) {
                            self.translateElement(node, self.currentLang);
                        }
                        
                        // Also check children
                        if (node.querySelectorAll) {
                            node.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-title], [data-i18n-aria], [data-i18n-alt]').forEach(function(el) {
                                self.translateElement(el, self.currentLang);
                            });
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },
    
    /**
     * Switch to a different language
     */
    switchLanguage: function(lang) {
        if (!this.supportedLangs.includes(lang)) {
            console.warn('[TranslationEngine] Unsupported language:', lang);
            return false;
        }
        
        this.applyTranslations(lang);
        this.updateActiveButton(lang);
        
        console.log('[TranslationEngine] Switched to:', lang);
        return true;
    },
    
    /**
     * Get current language
     */
    getCurrentLanguage: function() {
        return this.currentLang;
    },
    
    /**
     * Get language name
     */
    getLanguageName: function(lang) {
        return this.langNames[lang || this.currentLang] || lang;
    },
    
    /**
     * Get all supported languages
     */
    getSupportedLanguages: function() {
        return this.supportedLangs.map(function(lang) {
            return {
                code: lang,
                name: this.langNames[lang],
                htmlCode: this.langCodes[lang]
            };
        }, this);
    },
    
    /**
     * Add observer for language changes
     */
    addObserver: function(callback) {
        if (typeof callback === 'function') {
            this.observers.push(callback);
        }
    },
    
    /**
     * Remove observer
     */
    removeObserver: function(callback) {
        const index = this.observers.indexOf(callback);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    },
    
    /**
     * Notify all observers of language change
     */
    notifyObservers: function(lang) {
        this.observers.forEach(function(callback) {
            try {
                callback(lang);
            } catch (e) {
                console.error('[TranslationEngine] Observer error:', e);
            }
        });
    },
    
    /**
     * Translate text directly (for dynamic content)
     */
    t: function(key, params) {
        return this.getTranslation(key, this.currentLang, params) || key;
    },
    
    /**
     * Check if a translation key exists
     */
    hasTranslation: function(key, lang) {
        lang = lang || this.currentLang;
        return !!(translations[lang] && translations[lang][key]);
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        TranslationEngine.init();
    });
} else {
    TranslationEngine.init();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TranslationEngine, translations };
}

// Global access
if (typeof window !== 'undefined') {
    window.TranslationEngine = TranslationEngine;
    window.t = function(key, params) {
        return TranslationEngine.t(key, params);
    };
}
