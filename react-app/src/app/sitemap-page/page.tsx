'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SitemapPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Sitemap</span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <span className="page-header-badge"><i className="bi bi-diagram-3-fill"></i> Navigation</span>
            <h1>Sitemap</h1>
            <p className="page-header-desc">Navigate all pages and services of Better Solano</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Main Navigation */}
          <div className="sitemap-section-new">
            <div className="sitemap-section-header">
              <span className="sitemap-section-icon"><i className="bi bi-house-door"></i></span>
              <h2>Main Navigation</h2>
            </div>
            <div className="sitemap-links-grid">
              <Link href="/" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Home</Link>
              <Link href="/services" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Services</Link>
              <Link href="/government" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Government</Link>
              <Link href="/statistics" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Statistics</Link>
              <Link href="/legislative" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Legislative</Link>
              <Link href="/budget" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Transparency</Link>
              <Link href="/contact" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Contact</Link>
              <Link href="/news" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> News</Link>
              <Link href="/faq" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> FAQ</Link>
              <Link href="/accessibility" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Accessibility</Link>
            </div>
          </div>

          {/* Service Categories */}
          <div className="sitemap-section-new">
            <div className="sitemap-section-header">
              <span className="sitemap-section-icon"><i className="bi bi-grid-3x3-gap"></i></span>
              <h2>Service Categories</h2>
            </div>
            <div className="sitemap-links-grid">
              <Link href="/services/certificates" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Certificates &amp; Vital Records</Link>
              <Link href="/services/business" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Business Services</Link>
              <Link href="/services/social-services" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Social Services</Link>
              <Link href="/services/health" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Health &amp; Wellness</Link>
              <Link href="/services/tax-payments" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Tax &amp; Payments</Link>
              <Link href="/services/agriculture" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Agriculture</Link>
              <Link href="/services/infrastructure" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Infrastructure</Link>
              <Link href="/services/education" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Education</Link>
              <Link href="/services/environment" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Environment</Link>
              <Link href="/services/public-safety" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Public Safety</Link>
            </div>
          </div>

          {/* Municipal Offices */}
          <div className="sitemap-section-new">
            <div className="sitemap-section-header">
              <span className="sitemap-section-icon"><i className="bi bi-building"></i></span>
              <h2>Municipal Offices</h2>
            </div>
            <div className="sitemap-links-grid sitemap-links-grid--4col">
              <Link href="/service-details/civil-registrar" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Local Civil Registrar</Link>
              <Link href="/service-details/municipal-treasurer" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Treasurer&apos;s Office</Link>
              <Link href="/service-details/municipal-assessor" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Assessor&apos;s Office</Link>
              <Link href="/service-details/municipal-budget" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Budget Office</Link>
              <Link href="/service-details/municipal-accounting" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Accounting Office</Link>
              <Link href="/service-details/municipal-engineering" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Engineering Office</Link>
              <Link href="/service-details/municipal-planning" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Planning Office</Link>
              <Link href="/service-details/municipal-agriculture" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Agriculture Office</Link>
              <Link href="/service-details/mswdo-services" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> MSWDO</Link>
              <Link href="/service-details/business-permits-licensing" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> BPLS Office</Link>
              <Link href="/service-details/general-services" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> General Services</Link>
              <Link href="/service-details/human-resource-management" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> HR Management</Link>
              <Link href="/service-details/seedo-public-market" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> SEEDO Public Market</Link>
              <Link href="/service-details/seedo-slaughterhouse" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> SEEDO Slaughterhouse</Link>
              <Link href="/service-details/tricycle-franchising" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Tricycle Franchising</Link>
              <Link href="/service-details/property-declaration" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Property Declaration</Link>
            </div>
          </div>

          {/* Government & Legislative */}
          <div className="sitemap-section-new">
            <div className="sitemap-section-header">
              <span className="sitemap-section-icon"><i className="bi bi-bank"></i></span>
              <h2>Government &amp; Legislative</h2>
            </div>
            <div className="sitemap-links-grid">
              <Link href="/government" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Government Structure</Link>
              <Link href="/government/officials" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Elected Officials</Link>
              <Link href="/legislative" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Legislative Documents</Link>
              <Link href="/legislative/ordinance-framework" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Ordinance Framework</Link>
              <Link href="/legislative/resolution-framework" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Resolution Framework</Link>
            </div>
          </div>

          {/* Online Services */}
          <div className="sitemap-section-new">
            <div className="sitemap-section-header">
              <span className="sitemap-section-icon sitemap-section-icon--online"><i className="bi bi-globe2"></i></span>
              <h2>Online Services</h2>
              <span className="sitemap-badge">via Filipizen</span>
            </div>
            <div className="sitemap-links-grid">
              <a href="https://www.filipizen.com/partners/nuevavizcaya_solano/bpls/billing" target="_blank" rel="noopener noreferrer" className="sitemap-link-item sitemap-link-item--external"><i className="bi bi-box-arrow-up-right"></i> Business Billing &amp; Payment</a>
              <a href="https://www.filipizen.com/partners/nuevavizcaya_solano/bpls/newbusiness" target="_blank" rel="noopener noreferrer" className="sitemap-link-item sitemap-link-item--external"><i className="bi bi-box-arrow-up-right"></i> New Business Application</a>
              <a href="https://www.filipizen.com/partners/nuevavizcaya_solano/bpls/renewbusiness" target="_blank" rel="noopener noreferrer" className="sitemap-link-item sitemap-link-item--external"><i className="bi bi-box-arrow-up-right"></i> Business Permit Renewal</a>
              <a href="https://www.filipizen.com/partners/nuevavizcaya_solano/rptis/billing" target="_blank" rel="noopener noreferrer" className="sitemap-link-item sitemap-link-item--external"><i className="bi bi-box-arrow-up-right"></i> Real Property Tax Payment</a>
              <a href="https://www.filipizen.com/partners/nuevavizcaya_solano/po/billing" target="_blank" rel="noopener noreferrer" className="sitemap-link-item sitemap-link-item--external"><i className="bi bi-box-arrow-up-right"></i> Online Payment Order</a>
            </div>
          </div>

          {/* External Resources */}
          <div className="sitemap-section-new">
            <div className="sitemap-section-header">
              <span className="sitemap-section-icon"><i className="bi bi-link-45deg"></i></span>
              <h2>External Resources</h2>
            </div>
            <div className="sitemap-links-grid">
              <a href="https://solano.gov.ph" target="_blank" rel="noopener noreferrer" className="sitemap-link-item sitemap-link-item--external"><i className="bi bi-box-arrow-up-right"></i> Official Solano Website</a>
              <a href="https://sangguniangbayan.solano.gov.ph/" target="_blank" rel="noopener noreferrer" className="sitemap-link-item sitemap-link-item--external"><i className="bi bi-box-arrow-up-right"></i> Sangguniang Bayan</a>
              <a href="https://www.facebook.com/OfficialLguSolanoFanpage/" target="_blank" rel="noopener noreferrer" className="sitemap-link-item sitemap-link-item--external"><i className="bi bi-box-arrow-up-right"></i> Facebook Page</a>
              <Link href="/terms" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Terms of Use</Link>
              <Link href="/privacy" className="sitemap-link-item"><i className="bi bi-arrow-right"></i> Privacy Policy</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
