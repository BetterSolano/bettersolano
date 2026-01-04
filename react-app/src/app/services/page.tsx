'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import { useLanguage } from '@/contexts/LanguageContext';

function ServicesContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">{t('nav-services')}</span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <span className="page-header-badge"><i className="bi bi-grid-fill"></i> {t('nav-services')}</span>
            <h1>{t('services-title')}</h1>
            <p className="page-header-desc">{t('services-subtitle')}</p>
            {/* Search Box */}
            <div className="page-header-search">
              <form className="search-form" role="search" onSubmit={(e) => e.preventDefault()}>
                <div className="search-input-wrapper">
                  <i className="bi bi-search search-icon"></i>
                  <SearchAutocomplete 
                    placeholder="Search services (e.g., birth certificate, business permit)"
                    className="services-page-search"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            <Link href="/services/certificates" className="service-category-card">
              <div className="service-category-icon"><i className="bi bi-file-earmark-text-fill"></i></div>
              <div className="service-category-content">
                <h3 className="service-category-title">{t('cat-certificates')}</h3>
                <p className="service-category-desc">{t('cat-certificates-desc')}</p>
                <span className="service-category-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/services/business" className="service-category-card">
              <div className="service-category-icon"><i className="bi bi-shop"></i></div>
              <div className="service-category-content">
                <h3 className="service-category-title">{t('cat-business')}</h3>
                <p className="service-category-desc">{t('cat-business-desc')}</p>
                <span className="service-category-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/services/social-services" className="service-category-card">
              <div className="service-category-icon"><i className="bi bi-people-fill"></i></div>
              <div className="service-category-content">
                <h3 className="service-category-title">{t('cat-social')}</h3>
                <p className="service-category-desc">{t('cat-social-desc')}</p>
                <span className="service-category-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/services/health" className="service-category-card">
              <div className="service-category-icon"><i className="bi bi-heart-pulse-fill"></i></div>
              <div className="service-category-content">
                <h3 className="service-category-title">{t('cat-health')}</h3>
                <p className="service-category-desc">{t('cat-health-desc')}</p>
                <span className="service-category-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/services/tax-payments" className="service-category-card">
              <div className="service-category-icon"><i className="bi bi-cash-coin"></i></div>
              <div className="service-category-content">
                <h3 className="service-category-title">{t('cat-tax')}</h3>
                <p className="service-category-desc">{t('cat-tax-desc')}</p>
                <span className="service-category-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/services/agriculture" className="service-category-card">
              <div className="service-category-icon"><i className="bi bi-tree-fill"></i></div>
              <div className="service-category-content">
                <h3 className="service-category-title">{t('cat-agriculture')}</h3>
                <p className="service-category-desc">{t('cat-agriculture-desc')}</p>
                <span className="service-category-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/services/infrastructure" className="service-category-card">
              <div className="service-category-icon"><i className="bi bi-building-fill-gear"></i></div>
              <div className="service-category-content">
                <h3 className="service-category-title">{t('cat-infrastructure')}</h3>
                <p className="service-category-desc">{t('cat-infrastructure-desc')}</p>
                <span className="service-category-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/services/education" className="service-category-card">
              <div className="service-category-icon"><i className="bi bi-mortarboard-fill"></i></div>
              <div className="service-category-content">
                <h3 className="service-category-title">{t('cat-education')}</h3>
                <p className="service-category-desc">{t('cat-education-desc')}</p>
                <span className="service-category-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/services/public-safety" className="service-category-card">
              <div className="service-category-icon"><i className="bi bi-shield-fill-check"></i></div>
              <div className="service-category-content">
                <h3 className="service-category-title">{t('cat-safety')}</h3>
                <p className="service-category-desc">{t('cat-safety-desc')}</p>
                <span className="service-category-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/services/environment" className="service-category-card">
              <div className="service-category-icon"><i className="bi bi-globe-americas"></i></div>
              <div className="service-category-content">
                <h3 className="service-category-title">{t('cat-environment')}</h3>
                <p className="service-category-desc">{t('cat-environment-desc')}</p>
                <span className="service-category-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Life Event */}
      <section className="section life-events-section">
        <div className="container">
          <div className="text-center life-events-header">
            <h2>{t('life-events-title')}</h2>
            <p>{t('life-events-subtitle')}</p>
          </div>
          <div className="grid grid-4 life-events-grid">
            <Link href="/services/business" className="life-event-card">
              <i className="bi bi-shop"></i>
              <span>{t('life-starting-business')}</span>
            </Link>
            <Link href="/services/certificates" className="life-event-card">
              <i className="bi bi-heart"></i>
              <span>{t('life-getting-married')}</span>
            </Link>
            <Link href="/services/certificates" className="life-event-card">
              <i className="bi bi-emoji-smile"></i>
              <span>{t('life-having-baby')}</span>
            </Link>
            <Link href="/services/social-services" className="life-event-card">
              <i className="bi bi-wallet2"></i>
              <span>{t('life-financial-help')}</span>
            </Link>
            <Link href="/services/social-services" className="life-event-card">
              <i className="bi bi-person-badge"></i>
              <span>{t('life-senior')}</span>
            </Link>
            <Link href="/services/social-services" className="life-event-card">
              <i className="bi bi-universal-access"></i>
              <span>{t('life-pwd')}</span>
            </Link>
            <Link href="/services/infrastructure" className="life-event-card">
              <i className="bi bi-hammer"></i>
              <span>{t('life-building')}</span>
            </Link>
            <Link href="/services/public-safety" className="life-event-card">
              <i className="bi bi-question-circle"></i>
              <span>{t('life-trouble')}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="container"><p>Loading...</p></div>}>
      <ServicesContent />
    </Suspense>
  );
}
