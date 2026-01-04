'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Translation data
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    "nav-home": "Home",
    "nav-services": "Services",
    "nav-government": "Government",
    "nav-statistics": "Statistics",
    "nav-legislative": "Legislative",
    "nav-transparency": "Transparency",
    "nav-contact": "Contact",

    // Hero Section
    "hero-welcome": "Welcome to BetterSolano.org",
    "hero-subtitle": "Access government services, information, and resources for the people of Solano, Nueva Vizcaya.",
    "hero-find-service": "Find a Service",

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

    // Latest Updates
    "section-updates": "Latest Updates",
    "btn-view-all": "View All",

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
    "contact-hours": "Mon-Fri: 8:00 AM - 5:00 PM",
    "contact-response": "We'll respond within 24 hours",
    "contact-municipal-hall": "Municipal Hall",

    // Services Page
    "services-title": "Municipal Services Directory",
    "services-subtitle": "Browse all services offered by the Municipality of Solano",
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
    "cat-business": "Business & Trade",
    "cat-business-desc": "Business permits, licenses, and trade registration services.",
    "cat-social": "Social Services",
    "cat-social-desc": "Welfare programs, senior citizen services, PWD benefits, and financial aid.",
    "cat-health": "Health & Wellness",
    "cat-health-desc": "Vaccination programs, health certificates, and medical assistance.",
    "cat-tax": "Taxation & Payments",
    "cat-tax-desc": "Property tax, business tax, payments, and tax clearance.",
    "cat-agriculture": "Agriculture",
    "cat-agriculture-desc": "Agricultural loans, crop insurance, fertilizer assistance, and training.",
    "cat-infrastructure": "Infrastructure",
    "cat-infrastructure-desc": "Construction permits, road maintenance requests, and public facilities.",
    "cat-education": "Education & Scholarship",
    "cat-education-desc": "Scholarship programs, student assistance, and educational grants.",
    "cat-safety": "Public Safety",
    "cat-safety-desc": "Emergency services, disaster preparedness, and community safety programs.",
    "cat-environment": "Environment",
    "cat-environment-desc": "Environmental permits, waste management, and conservation programs.",

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
    "faq-contact-help": "If you didn't find the answer you were looking for, please don't hesitate to contact us.",
  },
  fil: {
    // Navigation - Filipino
    "nav-home": "Tahanan",
    "nav-services": "Mga Serbisyo",
    "nav-government": "Pamahalaan",
    "nav-statistics": "Estadistika",
    "nav-legislative": "Lehislatura",
    "nav-transparency": "Transparensiya",
    "nav-contact": "Makipag-ugnayan",

    // Hero Section
    "hero-welcome": "Maligayang Pagdating sa BetterSolano.org",
    "hero-subtitle": "I-access ang mga serbisyo ng pamahalaan, impormasyon, at mga mapagkukunan para sa mga mamamayan ng Solano, Nueva Vizcaya.",
    "hero-find-service": "Maghanap ng Serbisyo",

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

    // Latest Updates
    "section-updates": "Pinakabagong Balita",
    "btn-view-all": "Tingnan Lahat",

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
    "contact-hours": "Lunes-Biyernes: 8:00 AM - 5:00 PM",
    "contact-response": "Sasagutin namin sa loob ng 24 na oras",
    "contact-municipal-hall": "Munisipyo",

    // Services Page
    "services-title": "Direktoryo ng Serbisyong Munisipal",
    "services-subtitle": "Tingnan ang lahat ng serbisyong inaalok ng Munisipalidad ng Solano",
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
    "cat-business": "Negosyo at Kalakalan",
    "cat-business-desc": "Mga permit sa negosyo, lisensya, at serbisyo sa pagpaparehistro ng kalakalan.",
    "cat-social": "Serbisyong Panlipunan",
    "cat-social-desc": "Mga programa sa kapakanan, serbisyo para sa senior citizen, benepisyo ng PWD, at tulong pinansyal.",
    "cat-health": "Kalusugan at Kagalingan",
    "cat-health-desc": "Mga programa sa bakuna, health certificates, at tulong medikal.",
    "cat-tax": "Pagbubuwis at Pagbabayad",
    "cat-tax-desc": "Buwis sa ari-arian, buwis sa negosyo, pagbabayad, at tax clearance.",
    "cat-agriculture": "Agrikultura",
    "cat-agriculture-desc": "Mga pautang sa agrikultura, insurance sa pananim, tulong sa pataba, at pagsasanay.",
    "cat-infrastructure": "Imprastraktura",
    "cat-infrastructure-desc": "Mga permit sa konstruksyon, kahilingan sa pagpapanatili ng kalsada, at pampublikong pasilidad.",
    "cat-education": "Edukasyon at Iskolarship",
    "cat-education-desc": "Mga programa sa iskolarship, tulong sa estudyante, at mga grant sa edukasyon.",
    "cat-safety": "Kaligtasan ng Publiko",
    "cat-safety-desc": "Mga serbisyong pang-emergency, paghahanda sa sakuna, at mga programa sa kaligtasan ng komunidad.",
    "cat-environment": "Kapaligiran",
    "cat-environment-desc": "Mga permit sa kapaligiran, pamamahala ng basura, at mga programa sa konserbasyon.",

    // FAQ Page
    "faq-title": "Mga Madalas Itanong",
    "faq-subtitle": "Hanapin ang mga sagot sa mga karaniwang tanong tungkol sa mga serbisyong munisipal",
    "faq-general": "Mga Pangkalahatang Tanong",
    "faq-certificates": "Mga Sertipiko at Dokumento",
    "faq-business": "Negosyo at Permit",
    "faq-payments": "Pagbabayad at Bayarin",
    "faq-social": "Serbisyong Panlipunan",
    "faq-technical": "Mga Teknikal na Tanong",
    "faq-still-questions": "May tanong pa ba kayo?",
    "faq-contact-help": "Kung hindi ninyo nakita ang sagot na hinahanap, huwag mag-atubiling makipag-ugnayan sa amin.",
  },
  ilo: {
    // Navigation - Ilocano
    "nav-home": "Pagtaengan",
    "nav-services": "Dagiti Serbisyo",
    "nav-government": "Gobierno",
    "nav-statistics": "Estadistika",
    "nav-legislative": "Lehislatura",
    "nav-transparency": "Transparensiya",
    "nav-contact": "Kontaken",

    // Hero Section
    "hero-welcome": "Naragsak nga Isasangbay iti BetterSolano.org",
    "hero-subtitle": "Aksesen dagiti serbisyo ti gobierno, impormasyon, ken dagiti resources para kadagiti umili ti Solano, Nueva Vizcaya.",
    "hero-find-service": "Agsapul ti Serbisyo",

    // Popular Services
    "section-popular": "Dagiti Popular a Serbisyo",
    "service-certificates": "Dagiti Sertipiko",
    "service-certificates-desc": "Sertipiko ti pannakayanak, kasar, ken patay",
    "service-business": "Permit ti Negosyo",
    "service-business-desc": "Baro a permit ken panagrenew",
    "service-tax": "Panagbayad ti Buwis",
    "service-tax-desc": "Buwis ti sanikua ken negosyo",
    "service-social": "Serbisyo Sosyal",
    "service-social-desc": "Serbisyo para kadagiti senior citizen ken PWD",
    "service-health": "Serbisyo ti Salun-at",
    "service-health-desc": "Tulong medikal ken dagiti programa",
    "btn-view-all-services": "Kitaen Amin a Serbisyo",

    // Latest Updates
    "section-updates": "Kabarbaro a Damag",
    "btn-view-all": "Kitaen Amin",

    // Municipal Leadership
    "section-leadership": "Panguluan ti Munisipalidad",
    "title-mayor": "Mayor ti Munisipalidad",
    "title-vice-mayor": "Bise Mayor ti Munisipalidad",
    "btn-view-officials": "Kitaen Amin nga Opisyal",

    // Contact Section
    "section-contact": "Impormasyon ti Panagkontak",
    "contact-phone": "Telepono",
    "contact-email": "Email",
    "contact-address": "Pagtaengan",
    "contact-hours": "Lunes-Biernes: 8:00 AM - 5:00 PM",
    "contact-response": "Sumungbat kami iti uneg ti 24 nga oras",
    "contact-municipal-hall": "Municipal Hall",

    // Services Page
    "services-title": "Direktorio ti Serbisyo ti Munisipalidad",
    "services-subtitle": "Kitaen amin a serbisyo nga idatag ti Munisipalidad ti Solano",
    "life-events-title": "Agsapul Segun iti Pasamak iti Biag",
    "life-events-subtitle": "Biroken dagiti serbisyo segun iti mapasamak iti biagmo",
    "life-starting-business": "Mangrugi ti Negosyo",
    "life-getting-married": "Agkasar",
    "life-having-baby": "Addaan ti Ubing",
    "life-financial-help": "Kasapulan ti Tulong Pinansyal",
    "life-senior": "Serbisyo para kadagiti Senior Citizen",
    "life-pwd": "Tao nga Addaan Kapansanan",
    "life-building": "Panagbangon/Panagpasayaat ti Balay",
    "life-trouble": "Adda Problema",

    // Service Categories
    "cat-certificates": "Dagiti Sertipiko ken Vital Records",
    "cat-certificates-desc": "Sertipiko ti pannakayanak, patay, kasar, ken dadduma pay a vital records.",
    "cat-business": "Negosyo ken Kalakalan",
    "cat-business-desc": "Dagiti permit ti negosyo, lisensya, ken serbisyo ti panagparehistro ti kalakalan.",
    "cat-social": "Serbisyo Sosyal",
    "cat-social-desc": "Dagiti programa ti welfare, serbisyo para kadagiti senior citizen, benepisyo ti PWD, ken tulong pinansyal.",
    "cat-health": "Salun-at ken Wellness",
    "cat-health-desc": "Dagiti programa ti bakuna, health certificates, ken tulong medikal.",
    "cat-tax": "Panagbuwis ken Panagbayad",
    "cat-tax-desc": "Buwis ti sanikua, buwis ti negosyo, panagbayad, ken tax clearance.",
    "cat-agriculture": "Agrikultura",
    "cat-agriculture-desc": "Dagiti pautang ti agrikultura, insurance ti mula, tulong ti abono, ken panagsanay.",
    "cat-infrastructure": "Imprastraktura",
    "cat-infrastructure-desc": "Dagiti permit ti konstruksyon, dawat ti panagmantener ti kalsada, ken pampubliko a pasilidad.",
    "cat-education": "Edukasyon ken Iskolarship",
    "cat-education-desc": "Dagiti programa ti iskolarship, tulong ti estudiante, ken dagiti grant ti edukasyon.",
    "cat-safety": "Kinatalged ti Publiko",
    "cat-safety-desc": "Dagiti serbisyo ti emergency, panagisagana ti kalamidad, ken dagiti programa ti kinatalged ti komunidad.",
    "cat-environment": "Aglawlaw",
    "cat-environment-desc": "Dagiti permit ti aglawlaw, panagtaripato ti basura, ken dagiti programa ti konserbasyon.",

    // FAQ Page
    "faq-title": "Masansan a Maisaludsod",
    "faq-subtitle": "Biruken dagiti sungbat kadagiti gagangay a saludsod maipapan kadagiti serbisyo ti munisipalidad",
    "faq-general": "Dagiti Gagangay a Saludsod",
    "faq-certificates": "Dagiti Sertipiko ken Dokumento",
    "faq-business": "Negosyo ken Permit",
    "faq-payments": "Panagbayad ken Bayadan",
    "faq-social": "Serbisyo Sosyal",
    "faq-technical": "Dagiti Teknikal a Saludsod",
    "faq-still-questions": "Adda pay saludsodyo?",
    "faq-contact-help": "No saandayo a nasarakan ti sungbat a sapulenyo, dikay agmuna nga agkontak kadakami.",
  }
};

type Language = 'en' | 'fil' | 'ilo';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('bettersolano_lang') as Language;
    if (savedLang && ['en', 'fil', 'ilo'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bettersolano_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
