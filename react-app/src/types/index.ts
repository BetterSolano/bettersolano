// Service types
export interface Service {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  description: string;
  keywords: string[];
  fee: string;
  processingTime: string;
  office: string;
  url: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Officials types
export interface Official {
  id: string;
  name: string;
  position: string;
  title: string;
  image?: string;
  term?: string;
}

// Translation types
export type Language = 'en' | 'fil' | 'ilo';

export interface TranslationKeys {
  [key: string]: string;
}

// Weather types
export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  location: string;
}

// Exchange rate types
export interface ExchangeRate {
  currency: string;
  rate: number;
}

// Ordinance/Resolution types
export interface LegislativeItem {
  id: string;
  number: string;
  title: string;
  date: string;
  status: 'pending' | 'approved' | 'enacted';
  category?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  i18nKey: string;
  children?: NavItem[];
}

// Hotline types
export interface Hotline {
  name: string;
  number: string;
  icon: string;
}
