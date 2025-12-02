/**
 * Better Solano - Translation System
 * Supports: English (en), Filipino (fil), Ilocano (ilo)
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
        
        // Hero Section
        "hero-welcome": "Welcome to BetterSolano.org",
        "hero-subtitle": "Access government services, information, and resources for the people of Solano, Nueva Vizcaya.",
        "hero-browse": "Browse Services",
        "hero-contact": "Contact Us",
        
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
        
        // Services Page
        "services-title": "Municipal Services Directory",
        "services-subtitle": "Browse all services offered by the Municipality of Solano",
        "search-placeholder": "Search services...",
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
        "access-promise": "Our Promise"
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
        
        // Hero Section
        "hero-welcome": "Maligayang Pagdating sa BetterSolano.org",
        "hero-subtitle": "I-access ang mga serbisyo ng pamahalaan, impormasyon, at mga mapagkukunan para sa mga mamamayan ng Solano, Nueva Vizcaya.",
        "hero-browse": "Tingnan ang mga Serbisyo",
        "hero-contact": "Makipag-ugnayan sa Amin",
        
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
        
        // Services Page
        "services-title": "Direktoryo ng Serbisyong Munisipal",
        "services-subtitle": "Tingnan ang lahat ng serbisyong inaalok ng Munisipalidad ng Solano",
        "search-placeholder": "Maghanap ng serbisyo...",
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
        "access-promise": "Ang Aming Pangako"
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
        
        // Hero Section
        "hero-welcome": "Naragsak a Panangyawat iti BetterSolano.org",
        "hero-subtitle": "Aksesen dagiti serbisio ti gobierno, impormasion, ken dagiti rekurso para kadagiti umili ti Solano, Nueva Vizcaya.",
        "hero-browse": "Kitaen dagiti Serbisio",
        "hero-contact": "Kontaken Dakami",
        
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
        
        // Services Page
        "services-title": "Direktorio ti Serbisio ti Munisipalidad",
        "services-subtitle": "Kitaen amin a serbisio nga i-alok ti Munisipalidad ti Solano",
        "search-placeholder": "Agsapul ti serbisio...",
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
        "access-promise": "Ti Kari Mi"
    }
};


/**
 * Translation Engine - Reliable language switching with fallback support
 */
const TranslationEngine = {
    currentLang: 'en',
    defaultLang: 'en',
    supportedLangs: ['en', 'fil', 'ilo'],
    initialized: false,
    
    init: function() {
        if (this.initialized) return;
        
        const savedLang = localStorage.getItem('selectedLang');
        this.currentLang = this.supportedLangs.includes(savedLang) ? savedLang : this.defaultLang;
        
        this.applyTranslations(this.currentLang);
        this.updateActiveButton(this.currentLang);
        this.setupEventListeners();
        this.initialized = true;
    },
    
    getTranslation: function(key, lang) {
        lang = lang || this.currentLang;
        if (translations[lang] && translations[lang][key]) {
            return translations[lang][key];
        }
        if (translations[this.defaultLang] && translations[this.defaultLang][key]) {
            return translations[this.defaultLang][key];
        }
        return null;
    },
    
    applyTranslations: function(lang) {
        if (!translations[lang]) {
            lang = this.defaultLang;
        }
        
        // Update text content for data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(function(element) {
            var key = element.getAttribute('data-i18n');
            var translation = TranslationEngine.getTranslation(key, lang);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.type === 'submit' || element.type === 'button') {
                        element.value = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(element) {
            var key = element.getAttribute('data-i18n-placeholder');
            var translation = TranslationEngine.getTranslation(key, lang);
            if (translation) {
                element.placeholder = translation;
            }
        });
        
        // Update title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(function(element) {
            var key = element.getAttribute('data-i18n-title');
            var translation = TranslationEngine.getTranslation(key, lang);
            if (translation) {
                element.title = translation;
            }
        });
        
        // Update aria-label attributes
        document.querySelectorAll('[data-i18n-aria]').forEach(function(element) {
            var key = element.getAttribute('data-i18n-aria');
            var translation = TranslationEngine.getTranslation(key, lang);
            if (translation) {
                element.setAttribute('aria-label', translation);
            }
        });
        
        // Update document language
        var langCode = lang === 'fil' ? 'tl' : (lang === 'ilo' ? 'ilo' : 'en');
        document.documentElement.lang = langCode;
        
        this.currentLang = lang;
        localStorage.setItem('selectedLang', lang);
        
        // Dispatch event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang, langCode: langCode }
        }));
    },
    
    updateActiveButton: function(lang) {
        document.querySelectorAll('.lang-btn').forEach(function(btn) {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            }
        });
    },
    
    setupEventListeners: function() {
        var self = this;
        document.querySelectorAll('.lang-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var lang = this.dataset.lang;
                if (self.supportedLangs.includes(lang)) {
                    self.applyTranslations(lang);
                    self.updateActiveButton(lang);
                }
            });
        });
    },
    
    switchLanguage: function(lang) {
        if (this.supportedLangs.includes(lang)) {
            this.applyTranslations(lang);
            this.updateActiveButton(lang);
            return true;
        }
        return false;
    },
    
    getCurrentLanguage: function() {
        return this.currentLang;
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
