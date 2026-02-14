'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

function isMobileNav(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 991px)').matches;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const scrollYRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const lockBodyScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;
    document.body.classList.add('mobile-menu-open');
    document.body.style.top = `-${scrollYRef.current}px`;
  }, []);

  const unlockBodyScroll = useCallback(() => {
    document.body.classList.remove('mobile-menu-open');
    document.body.style.top = '';
    window.scrollTo(0, scrollYRef.current);
  }, []);

  const closeMenu = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    unlockBodyScroll();
    setTimeout(() => { isAnimatingRef.current = false; }, 320);
  }, [unlockBodyScroll]);

  const toggleDropdown = useCallback((index: number, e: React.MouseEvent) => {
    if (isMobileNav()) {
      e.preventDefault();
      setOpenDropdown(prev => prev === index ? null : index);
    }
  }, []);

  // Close menu on route change
  useEffect(() => {
    isAnimatingRef.current = false;
    closeMenu();
  }, [pathname, closeMenu]);

  // Cleanup body scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.top = '';
    };
  }, []);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        navRef.current && !navRef.current.contains(target) &&
        toggleRef.current && !toggleRef.current.contains(target)
      ) {
        closeMenu();
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileMenuOpen, closeMenu]);

  // Escape key to close
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMenu();
        toggleRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen, closeMenu]);

  // Close mobile menu on resize to desktop (debounced)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function handleResize() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!isMobileNav() && mobileMenuOpen) {
          isAnimatingRef.current = false;
          closeMenu();
        }
      }, 150);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen, closeMenu]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo-container">
          <Link href="/">
            <img src="/assets/images/logo/better-solano-logo.svg" alt="Better Solano Logo" className="logo-img" />
          </Link>
        </div>

        <nav ref={navRef} className={`main-nav ${mobileMenuOpen ? 'active' : ''}`} aria-label="Main Navigation">
          <ul>
            <li><Link href="/" className={pathname === '/' ? 'active' : ''}>{t('nav-home')}</Link></li>
            <li className={`has-dropdown ${openDropdown === 0 ? 'dropdown-open' : ''}`}>
              <Link href="/services" aria-haspopup="true" aria-expanded={openDropdown === 0} onClick={(e) => toggleDropdown(0, e)}>{t('nav-services')}</Link>
              <ul className="dropdown-menu">
                <li><Link href="/services/certificates">{t('dropdown-certificates')}</Link></li>
                <li><Link href="/services/business">{t('dropdown-business')}</Link></li>
                <li><Link href="/services/tax-payments">{t('dropdown-tax-payments')}</Link></li>
                <li><Link href="/services/social-services">{t('dropdown-social-services')}</Link></li>
                <li><Link href="/services/health">{t('dropdown-health')}</Link></li>
                <li><Link href="/services/agriculture">{t('dropdown-agriculture')}</Link></li>
                <li><Link href="/services/infrastructure">{t('dropdown-infrastructure')}</Link></li>
                <li><Link href="/services/education">{t('dropdown-education')}</Link></li>
                <li><Link href="/services/public-safety">{t('dropdown-public-safety')}</Link></li>
                <li><Link href="/services/environment">{t('dropdown-environment')}</Link></li>
              </ul>
            </li>
            <li><Link href="/government">{t('nav-government')}</Link></li>
            <li><Link href="/statistics">{t('nav-statistics')}</Link></li>
            <li className={`has-dropdown ${openDropdown === 1 ? 'dropdown-open' : ''}`}>
              <Link href="/legislative" aria-haspopup="true" aria-expanded={openDropdown === 1} onClick={(e) => toggleDropdown(1, e)}>{t('nav-legislative')}</Link>
              <ul className="dropdown-menu">
                <li><Link href="/legislative/ordinance-framework">{t('dropdown-ordinance-framework')}</Link></li>
                <li><Link href="/legislative/resolution-framework">{t('dropdown-resolution-framework')}</Link></li>
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
          ref={toggleRef}
          type="button"
          className="mobile-menu-toggle btn btn-secondary"
          onClick={() => {
            if (isAnimatingRef.current) return;
            if (mobileMenuOpen) {
              closeMenu();
            } else {
              isAnimatingRef.current = true;
              setMobileMenuOpen(true);
              lockBodyScroll();
              setTimeout(() => { isAnimatingRef.current = false; }, 320);
            }
          }}
          aria-label="Toggle Navigation"
          aria-expanded={mobileMenuOpen}
        >
          <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
}
