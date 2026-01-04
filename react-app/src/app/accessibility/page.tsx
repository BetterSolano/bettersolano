'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AccessibilityPage() {
  const { t } = useLanguage();

  return (
    <>
      <link rel="stylesheet" href="/assets/css/accessibility.css" />
      
      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Accessibility</span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <span className="page-header-badge"><i className="bi bi-universal-access"></i> Accessibility</span>
            <h1>{t('access-title') || 'Accessibility Statement'}</h1>
            <p className="page-header-desc">{t('access-subtitle') || 'Our commitment to digital accessibility for all citizens'}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="a11y-container">
            {/* Conformance Badge */}
            <div className="a11y-badge-section">
              <div className="a11y-conformance-badge">
                <i className="bi bi-check-circle-fill"></i>
                <div>
                  <span className="a11y-badge-label">WCAG 2.1 Level AA</span>
                  <span className="a11y-badge-text">Conformant</span>
                </div>
              </div>
            </div>

            {/* Commitment Section */}
            <div className="a11y-section">
              <h2>{t('access-commitment') || 'Our Commitment'}</h2>
              <p>Better Solano is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
            </div>

            {/* Features Grid */}
            <div className="a11y-section">
              <h2>{t('access-features') || 'Accessibility Features'}</h2>
              <div className="a11y-features-grid">
                <div className="a11y-feature">
                  <i className="bi bi-keyboard"></i>
                  <h3>Keyboard Navigation</h3>
                  <p>All functionality available using only a keyboard.</p>
                </div>
                <div className="a11y-feature">
                  <i className="bi bi-eye"></i>
                  <h3>Screen Reader Support</h3>
                  <p>Compatible with JAWS, NVDA, and VoiceOver.</p>
                </div>
                <div className="a11y-feature">
                  <i className="bi bi-type"></i>
                  <h3>Text Alternatives</h3>
                  <p>All images have descriptive alt text.</p>
                </div>
                <div className="a11y-feature">
                  <i className="bi bi-palette"></i>
                  <h3>Color Contrast</h3>
                  <p>Meets WCAG AA contrast requirements.</p>
                </div>
                <div className="a11y-feature">
                  <i className="bi bi-phone"></i>
                  <h3>Responsive Design</h3>
                  <p>Works on all devices and screen sizes.</p>
                </div>
                <div className="a11y-feature">
                  <i className="bi bi-hourglass-split"></i>
                  <h3>No Time Limits</h3>
                  <p>No time limits on reading or interacting.</p>
                </div>
              </div>
            </div>

            {/* Known Limitations */}
            <div className="a11y-section">
              <h2>{t('access-limitations') || 'Known Limitations'}</h2>
              <ul className="a11y-list">
                <li><i className="bi bi-exclamation-circle"></i> Some PDF documents may not be fully accessible to screen readers</li>
                <li><i className="bi bi-exclamation-circle"></i> Some third-party embedded content may have accessibility issues</li>
              </ul>
            </div>

            {/* Alternative Access */}
            <div className="a11y-section">
              <h2>{t('access-alternative') || 'Alternative Access'}</h2>
              <p>If you encounter difficulty accessing any information, contact us:</p>
              <div className="a11y-contact-grid">
                <a href="mailto:volunteer@bettersolano.org" className="a11y-contact-item">
                  <i className="bi bi-envelope-fill"></i>
                  <span>volunteer@bettersolano.org</span>
                </a>
              </div>
            </div>

            {/* Technical Info */}
            <div className="a11y-section">
              <h2>{t('access-technical') || 'Technical Specifications'}</h2>
              <div className="a11y-tech-tags">
                <span className="a11y-tag">HTML5</span>
                <span className="a11y-tag">CSS3</span>
                <span className="a11y-tag">JavaScript</span>
                <span className="a11y-tag">ARIA</span>
              </div>
            </div>

            {/* Promise Card */}
            <div className="a11y-promise">
              <i className="bi bi-heart-fill"></i>
              <div>
                <h3>{t('access-promise') || 'Our Promise'}</h3>
                <p>Better Solano is committed to ensuring that our digital services are accessible to all citizens, regardless of ability. We view accessibility not as a feature, but as a fundamental right.</p>
              </div>
            </div>

            <p className="a11y-date">Last updated: November 29, 2025</p>
          </div>
        </div>
      </section>
    </>
  );
}
