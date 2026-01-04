'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FAQPage() {
  const { t } = useLanguage();

  return (
    <>
      <link rel="stylesheet" href="/assets/css/accessibility.css" />
      
      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">FAQ</span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <span className="page-header-badge"><i className="bi bi-question-circle-fill"></i> FAQ</span>
            <h1>{t('faq-title') || 'Frequently Asked Questions'}</h1>
            <p className="page-header-desc">{t('faq-subtitle') || 'Find answers to common questions about municipal services'}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="faq-container">
            {/* FAQ Category: General */}
            <div className="faq-category">
              <div className="faq-category-header">
                <i className="bi bi-info-circle-fill"></i>
                <h2>{t('faq-general') || 'General Questions'}</h2>
              </div>
              <div className="faq-list">
                <details className="faq-accordion">
                  <summary>What are the office hours of the Municipal Hall?</summary>
                  <div className="faq-answer">
                    <p>The Municipal Hall is open Monday to Friday, 8:00 AM to 5:00 PM, with a lunch break from 12:00 PM to 1:00 PM. We are closed on weekends and national/local holidays.</p>
                  </div>
                </details>
                <details className="faq-accordion">
                  <summary>How can I contact a specific municipal office?</summary>
                  <div className="faq-answer">
                    <p>Visit our <Link href="/government">Government Directory</Link> page to find contact information for all municipal offices and department heads.</p>
                  </div>
                </details>
                <details className="faq-accordion">
                  <summary>Can I request services online?</summary>
                  <div className="faq-answer">
                    <p>Currently, most services require in-person applications. However, we are working on implementing online services for select transactions. Check individual service pages for updates.</p>
                  </div>
                </details>
              </div>
            </div>

            {/* FAQ Category: Certificates */}
            <div className="faq-category">
              <div className="faq-category-header">
                <i className="bi bi-file-earmark-text-fill"></i>
                <h2>{t('faq-certificates') || 'Certificates & Documents'}</h2>
              </div>
              <div className="faq-list">
                <details className="faq-accordion">
                  <summary>How long does it take to get a birth certificate?</summary>
                  <div className="faq-answer">
                    <p>For birth certificates registered in Solano, it typically takes 15-30 minutes while you wait, provided the record is readily available.</p>
                  </div>
                </details>
                <details className="faq-accordion">
                  <summary>Can someone else request my certificate for me?</summary>
                  <div className="faq-answer">
                    <p>Yes, but they must bring:</p>
                    <ul>
                      <li>An authorization letter signed by you</li>
                      <li>Valid ID of both you and the representative</li>
                      <li>Photocopy of your valid ID</li>
                    </ul>
                  </div>
                </details>
                <details className="faq-accordion">
                  <summary>What is the difference between PSA and local civil registrar certificates?</summary>
                  <div className="faq-answer">
                    <p>Both are certified true copies. PSA certificates are the nationally-recognized version required for passport and visa applications. Local civil registrar certificates are accepted for most local transactions and are often processed faster.</p>
                  </div>
                </details>
              </div>
            </div>

            {/* FAQ Category: Business */}
            <div className="faq-category">
              <div className="faq-category-header">
                <i className="bi bi-shop"></i>
                <h2>{t('faq-business') || 'Business & Permits'}</h2>
              </div>
              <div className="faq-list">
                <details className="faq-accordion">
                  <summary>When should I renew my business permit?</summary>
                  <div className="faq-answer">
                    <p>Business permits must be renewed annually, preferably in January. The deadline for penalty-free renewal is typically January 20th of each year.</p>
                  </div>
                </details>
                <details className="faq-accordion">
                  <summary>What do I need to start a new business in Solano?</summary>
                  <div className="faq-answer">
                    <p>To start a new business, you&apos;ll need:</p>
                    <ul>
                      <li>DTI Registration (for sole proprietorship) or SEC Registration (for corporation)</li>
                      <li>Barangay Clearance</li>
                      <li>Community Tax Certificate (Cedula)</li>
                      <li>Location Sketch/Map</li>
                      <li>Contract of Lease (if renting)</li>
                    </ul>
                    <p>Visit our <Link href="/services/business">Business Permit page</Link> for complete details.</p>
                  </div>
                </details>
              </div>
            </div>

            {/* FAQ Category: Payments */}
            <div className="faq-category">
              <div className="faq-category-header">
                <i className="bi bi-cash-coin"></i>
                <h2>{t('faq-payments') || 'Payments & Fees'}</h2>
              </div>
              <div className="faq-list">
                <details className="faq-accordion">
                  <summary>What payment methods are accepted?</summary>
                  <div className="faq-answer">
                    <p>Currently, we accept cash payments at the Municipal Treasurer&apos;s Office. We are working on implementing online payment options for taxes and fees.</p>
                  </div>
                </details>
                <details className="faq-accordion">
                  <summary>How can I pay my real property tax?</summary>
                  <div className="faq-answer">
                    <p>Visit the Municipal Treasurer&apos;s Office at the Municipal Hall with your Tax Declaration or latest Official Receipt. Payment is in cash. Property taxes are due quarterly, but you may pay annually to avail of discounts.</p>
                  </div>
                </details>
              </div>
            </div>

            {/* FAQ Category: Social Services */}
            <div className="faq-category">
              <div className="faq-category-header">
                <i className="bi bi-people-fill"></i>
                <h2>{t('faq-social') || 'Social Services'}</h2>
              </div>
              <div className="faq-list">
                <details className="faq-accordion">
                  <summary>How do I apply for a Senior Citizen ID?</summary>
                  <div className="faq-answer">
                    <p>Go to the Municipal Social Welfare and Development Office (MSWDO) with:</p>
                    <ul>
                      <li>Birth Certificate or any valid ID showing your age (60 and above)</li>
                      <li>1x1 ID photo</li>
                      <li>Barangay Residence Certificate</li>
                    </ul>
                    <p>The ID is issued for free.</p>
                  </div>
                </details>
                <details className="faq-accordion">
                  <summary>What benefits do senior citizens receive?</summary>
                  <div className="faq-answer">
                    <p>Senior citizens enjoy 20% discount and VAT exemption on purchases (with a minimum purchase amount per establishment), priority lanes, and access to special programs and medical assistance from the municipality.</p>
                  </div>
                </details>
              </div>
            </div>

            {/* FAQ Category: Technical */}
            <div className="faq-category">
              <div className="faq-category-header">
                <i className="bi bi-gear-fill"></i>
                <h2>{t('faq-technical') || 'Technical Questions'}</h2>
              </div>
              <div className="faq-list">
                <details className="faq-accordion">
                  <summary>I found a broken link or error on this website. How do I report it?</summary>
                  <div className="faq-answer">
                    <p>Thank you for helping us improve! Please send us message at <a href="mailto:volunteer@bettersolano.org">volunteer@bettersolano.org</a> and write &quot;Website Issue&quot; as the subject. Describe the problem and include the page URL if possible.</p>
                  </div>
                </details>
                <details className="faq-accordion">
                  <summary>Is this website mobile-friendly?</summary>
                  <div className="faq-answer">
                    <p>Yes! Better Solano is fully responsive and optimized for mobile phones, tablets, and desktop computers.</p>
                  </div>
                </details>
              </div>
            </div>

            {/* FAQ Category: About */}
            <div className="faq-category">
              <div className="faq-category-header">
                <i className="bi bi-person-badge-fill"></i>
                <h2>About the Developer</h2>
              </div>
              <div className="faq-list">
                <details className="faq-accordion">
                  <summary>Who developed Better Solano?</summary>
                  <div className="faq-answer">
                    <p><a href="https://ramonloganjr.com/" target="_blank" rel="noopener noreferrer">Ramon Logan Jr.</a> is the developer behind BetterSolano.org. Based in the United Arab Emirates, he works in IT and practices full-stack development, helping build practical digital solutions in web development, design, cloud services, and cybersecurity. He also started <a href="https://hellopinas.com" target="_blank" rel="noopener noreferrer">HelloPinas.com</a>, a small cloud-based solutions initiative.</p>
                    <p>Ramon contributes to <a href="https://bettergov.ph" target="_blank" rel="noopener noreferrer">BetterGov.ph</a>, a volunteer-driven civic-tech effort focused on improving access to local government information and services in the Philippines. He is also an individual participant of the <a href="https://openjsf.org/" target="_blank" rel="noopener noreferrer">OpenJS Foundation</a>, a nonprofit supporting open-source JavaScript communities worldwide.</p>
                    <p>Ramon has made the Solano Project open source under MIT | CC BY 4.0 to empower community-driven development, and contributions are warmly welcomed from everyone; whether you are a developer, data researcher, designer, content writer, translator, or a concerned citizen of Solano, your participation helps shape the project for all.</p>
                  </div>
                </details>
              </div>
            </div>

            {/* Still Have Questions */}
            <div className="faq-cta">
              <i className="bi bi-chat-dots-fill"></i>
              <div className="faq-cta-content">
                <h3>{t('faq-still-questions') || 'Still have questions?'}</h3>
                <p>{t('faq-contact-help') || "If you didn't find the answer you were looking for, please don't hesitate to contact us."}</p>
              </div>
              <Link href="/contact" className="btn btn-primary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
