'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language, TranslationKeys } from '@/types';
import { translations } from '@/data/translations';

const STORAGE_KEY = 'bettersolano-lang';

export function useTranslation() {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && ['en', 'fil', 'ilo'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    // Update URL param for SEO
    const url = new URL(window.location.href);
    if (lang === 'en') {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }
    window.history.replaceState({}, '', url.toString());
  }, []);

  const t = useCallback((key: string, fallback?: string): string => {
    const langTranslations = translations[language] || translations.en;
    return langTranslations[key] || translations.en[key] || fallback || key;
  }, [language]);

  return { t, language, setLanguage };
}
