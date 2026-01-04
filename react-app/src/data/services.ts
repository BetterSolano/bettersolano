import { Service, ServiceCategory } from '@/types';

export const serviceCategories: ServiceCategory[] = [
  { id: 'certificates', name: 'Certificates & Vital Records', description: 'Birth, death, marriage certificates, and other vital records.', icon: 'bi-file-earmark-text-fill' },
  { id: 'business', name: 'Business, Trade & Investment', description: 'Business permits, licenses, and trade registration services.', icon: 'bi-shop' },
  { id: 'social-services', name: 'Social Services & Assistance', description: 'Welfare programs, senior citizen services, PWD benefits, and financial aid.', icon: 'bi-people-fill' },
  { id: 'health', name: 'Health & Wellness', description: 'Vaccination programs, health certificates, and medical assistance.', icon: 'bi-heart-pulse-fill' },
  { id: 'tax-payments', name: 'Taxation & Payments', description: 'Property tax, business tax, payments, and tax clearance.', icon: 'bi-cash-coin' },
  { id: 'agriculture', name: 'Agriculture & Economic Development', description: 'Agricultural loans, crop insurance, fertilizer assistance, and training.', icon: 'bi-tree-fill' },
  { id: 'infrastructure', name: 'Infrastructure & Public Works', description: 'Construction permits, road maintenance requests, and public facilities.', icon: 'bi-building' },
  { id: 'education', name: 'Education & Scholarship', description: 'Scholarship programs, student assistance, and educational grants.', icon: 'bi-mortarboard-fill' },
  { id: 'public-safety', name: 'Public Safety & Security', description: 'Emergency services, disaster preparedness, and community safety programs.', icon: 'bi-shield-fill' },
  { id: 'environment', name: 'Environment & Natural Resources', description: 'Environmental permits, waste management, and conservation programs.', icon: 'bi-tree' },
  { id: 'online', name: 'Online Services', description: 'Digital services available through Filipizen and other online platforms.', icon: 'bi-globe' },
  { id: 'government', name: 'Government Services', description: 'General municipal services and administrative functions.', icon: 'bi-bank' },
];

// Services data will be imported from JSON
export { default as services } from './services.json';
