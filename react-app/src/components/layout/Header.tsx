'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo-container">
          <Link href="/">
            <img src="/assets/images/logo/better-solano-logo.svg" alt="Better Solano Logo" className="logo-img" />
          </Link>
        </div>

        <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`} aria-label="Main Navigation">
          <ul>
            <li><Link href="/" className={pathname === '/' ? 'active' : ''}>{t('nav-home')}</Link></li>
            <li className="has-dropdown">
              <Link href="/services" aria-haspopup="true" aria-expanded="false">{t('nav-services')}</Link>
              <ul className="dropdown-menu">
                <li><Link href="/services/certificates">Certificates</Link></li>
                <li><Link href="/services/business">Business</Link></li>
                <li><Link href="/services/tax-payments">Tax Payments</Link></li>
                <li><Link href="/services/social-services">Social Services</Link></li>
                <li><Link href="/services/health">Health</Link></li>
                <li><Link href="/services/agriculture">Agriculture</Link></li>
                <li><Link href="/services/infrastructure">Infrastructure</Link></li>
                <li><Link href="/services/education">Education</Link></li>
                <li><Link href="/services/public-safety">Public Safety</Link></li>
                <li><Link href="/services/environment">Environment</Link></li>
              </ul>
            </li>
            <li><Link href="/government">{t('nav-government')}</Link></li>
            <li><Link href="/statistics">{t('nav-statistics')}</Link></li>
            <li className="has-dropdown">
              <Link href="/legislative" aria-haspopup="true" aria-expanded="false">{t('nav-legislative')}</Link>
              <ul className="dropdown-menu">
                <li><Link href="/legislative/ordinance-framework">Ordinance Framework</Link></li>
                <li><Link href="/legislative/resolution-framework">Resolution Framework</Link></li>
              </ul>
            </li>
            <li><Link href="/budget">{t('nav-transparency')}</Link></li>
            <li><Link href="/contact">{t('nav-contact')}</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="lang-selector">
            <button 
              type="button" 
              className={`btn btn-secondary btn-sm lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button 
              type="button" 
              className={`btn btn-secondary btn-sm lang-btn ${language === 'fil' ? 'active' : ''}`}
              onClick={() => setLanguage('fil')}
              aria-label="Switch to Filipino"
            >
              FIL
            </button>
            <button 
              type="button" 
              className={`btn btn-secondary btn-sm lang-btn ${language === 'ilo' ? 'active' : ''}`}
              onClick={() => setLanguage('ilo')}
              aria-label="Switch to Ilocano"
            >
              ILO
            </button>
          </div>
        </div>

        <button
          type="button"
          className="mobile-menu-toggle btn btn-secondary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
}
