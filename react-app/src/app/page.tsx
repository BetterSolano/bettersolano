'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SearchAutocomplete from '@/components/SearchAutocomplete';

export default function HomePage() {
  const { t } = useLanguage();

  useEffect(() => {
    // Load Leaflet map after component mounts - handled by iframe fallback
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="home-hero-v2">
        <div className="container">
          <div className="home-hero-v2-inner">
            <div className="home-hero-v2-text">
              <h1>{t('hero-welcome')}</h1>
              <p>{t('hero-subtitle')}</p>
              <div className="home-hero-v2-actions">
                <Link href="/services" className="btn btn-primary">Browse Services <i className="bi bi-arrow-right"></i></Link>
                <Link href="/contact" className="btn btn-outline">Contact Us</Link>
              </div>
            </div>
            <div className="home-hero-v2-search">
              <div className="home-search-box">
                <h2><i className="bi bi-search"></i> {t('hero-find-service')}</h2>
                <form className="search-form" role="search" onSubmit={(e) => e.preventDefault()}>
                  <div className="search-input-wrapper">
                    <SearchAutocomplete placeholder="e.g., birth certificate, business permit" />
                    <button type="submit" className="search-submit-btn" aria-label="Search"><i className="bi bi-arrow-right"></i></button>
                  </div>
                </form>
                <div className="home-search-tags">
                  <span>Popular:</span>
                  <Link href="/service-details/birth-certificate">Birth Certificate</Link>
                  <Link href="/service-details/business-permits-licensing">Business Permit</Link>
                  <Link href="/service-details/municipal-treasurer">Real Property Tax</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="section">
        <div className="container">
          <div className="home-section-header">
            <h2>{t('section-popular')}</h2>
            <p>Quick access to frequently requested municipal services</p>
          </div>
          <div className="home-services-grid">
            <Link href="/services/certificates" className="home-service-card">
              <div className="home-service-icon"><i className="bi bi-file-earmark-text-fill"></i></div>
              <div className="home-service-content">
                <h3>{t('service-certificates')}</h3>
                <p>{t('service-certificates-desc')}</p>
              </div>
              <i className="bi bi-arrow-right home-service-arrow"></i>
            </Link>
            <Link href="/services/business" className="home-service-card">
              <div className="home-service-icon"><i className="bi bi-shop"></i></div>
              <div className="home-service-content">
                <h3>{t('service-business')}</h3>
                <p>{t('service-business-desc')}</p>
              </div>
              <i className="bi bi-arrow-right home-service-arrow"></i>
            </Link>
            <Link href="/services/tax-payments" className="home-service-card">
              <div className="home-service-icon"><i className="bi bi-cash-coin"></i></div>
              <div className="home-service-content">
                <h3>{t('service-tax')}</h3>
                <p>{t('service-tax-desc')}</p>
              </div>
              <i className="bi bi-arrow-right home-service-arrow"></i>
            </Link>
            <Link href="/services/social-services" className="home-service-card">
              <div className="home-service-icon"><i className="bi bi-people-fill"></i></div>
              <div className="home-service-content">
                <h3>{t('service-social')}</h3>
                <p>{t('service-social-desc')}</p>
              </div>
              <i className="bi bi-arrow-right home-service-arrow"></i>
            </Link>
            <Link href="/services/health" className="home-service-card">
              <div className="home-service-icon"><i className="bi bi-heart-pulse-fill"></i></div>
              <div className="home-service-content">
                <h3>{t('service-health')}</h3>
                <p>{t('service-health-desc')}</p>
              </div>
              <i className="bi bi-arrow-right home-service-arrow"></i>
            </Link>
            <Link href="/services" className="home-service-card home-service-card--all">
              <div className="home-service-icon"><i className="bi bi-grid-fill"></i></div>
              <div className="home-service-content">
                <h3>{t('btn-view-all-services')}</h3>
                <p>Browse complete directory</p>
              </div>
              <i className="bi bi-arrow-right home-service-arrow"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="home-stats-v2">
        <div className="container">
          <div className="home-stats-v2-header">
            <h2>Solano at a Glance</h2>
            <Link href="/statistics" className="home-section-link">View Statistics <i className="bi bi-arrow-right"></i></Link>
          </div>
          <div className="home-stats-v2-grid">
            <Link href="/statistics" className="home-stat-card">
              <div className="home-stat-card-icon"><i className="bi bi-people-fill"></i></div>
              <div className="home-stat-card-content">
                <span className="home-stat-card-value">69,296</span>
                <span className="home-stat-card-label">Population</span>
                <span className="home-stat-card-source">2024 Census</span>
              </div>
            </Link>
            <Link href="/government" className="home-stat-card">
              <div className="home-stat-card-icon"><i className="bi bi-geo-alt-fill"></i></div>
              <div className="home-stat-card-content">
                <span className="home-stat-card-value">22</span>
                <span className="home-stat-card-label">Barangays</span>
                <span className="home-stat-card-source">Administrative Units</span>
              </div>
            </Link>
            <Link href="/budget" className="home-stat-card">
              <div className="home-stat-card-icon"><i className="bi bi-award-fill"></i></div>
              <div className="home-stat-card-content">
                <span className="home-stat-card-value">1st Class</span>
                <span className="home-stat-card-label">Municipality</span>
                <span className="home-stat-card-source">Income Classification</span>
              </div>
            </Link>
            <Link href="/statistics" className="home-stat-card">
              <div className="home-stat-card-icon"><i className="bi bi-rulers"></i></div>
              <div className="home-stat-card-content">
                <span className="home-stat-card-value">162.70 km²</span>
                <span className="home-stat-card-label">Land Area</span>
                <span className="home-stat-card-source">Total Municipal Area</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Weather & Map */}
      <section className="section weather-map-section">
        <div className="container">
          <div className="home-stats-v2-header">
            <h2>Weather and Map of Solano</h2>
          </div>
          <div className="weather-map-grid">
            <div className="weather-column">
              <div id="weather-container" aria-live="polite">
                <div className="weather-widget" role="region" aria-label="Current weather in Solano">
                  <div className="weather-current">
                    <div className="weather-current-icon"><i className="bi bi-cloud-sun-fill"></i></div>
                    <div className="weather-current-info">
                      <div className="weather-current-temp">29°C</div>
                      <div className="weather-current-condition">Mainly clear</div>
                      <div className="weather-current-location"><i className="bi bi-geo-alt"></i> Solano, Nueva Vizcaya</div>
                    </div>
                  </div>
                  <div className="weather-stats">
                    <div className="weather-stat"><i className="bi bi-droplet"></i><span>65%</span></div>
                    <div className="weather-stat"><i className="bi bi-wind"></i><span>12 km/h</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="map-column">
              <div className="map-card">
                <div id="map-container" role="application" aria-label="Interactive map of Solano, Nueva Vizcaya" className="map-container-iframe">
                  <iframe width="100%" height="300" frameBorder="0" scrolling="no" src="https://www.openstreetmap.org/export/embed.html?bbox=121.1633%2C16.5017%2C121.2033%2C16.5317&layer=mapnik&marker=16.5167%2C121.1833" className="map-iframe" title="Map of Solano" loading="lazy"></iframe>
                </div>
                <p className="map-attribution">
                  <i className="bi bi-geo-alt" aria-hidden="true"></i> Solano Municipal Hall, Nueva Vizcaya 3708
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brief History of Solano */}
      <section className="section history-section">
        <div className="container">
          <div className="home-stats-v2-header">
            <h2><i className="bi bi-book" aria-hidden="true"></i> Brief History of Solano</h2>
          </div>
          <div className="history-content">
            <div className="history-timeline">
              <div className="timeline-item" data-year="1760">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">1760</span>
                  <p>The original name of the town was <strong>Bintauan</strong>, then a Gaddang settlement that is now a barangay of Villaverde.</p>
                </div>
              </div>
              <div className="timeline-item" data-year="1767">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">1767</span>
                  <p>The town was formally founded by <strong>Father Alejandro Vidal</strong>, a Dominican priest who led a Spanish mission.</p>
                </div>
              </div>
              <div className="timeline-item" data-year="1768">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">1768</span>
                  <p>Named <strong>Lungabang</strong>, from the Gaddang word for cave, <em>lungab</em>. Later changed to Lumabang by the Spaniards.</p>
                </div>
              </div>
              <div className="timeline-item" data-year="1851">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">1851</span>
                  <p>Governor General Antonio Urbiztondo declared Lumabang a barrio of Bayombong for insufficient inhabitants and revenue.</p>
                </div>
              </div>
              <div className="timeline-item" data-year="1853">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">1853</span>
                  <p>The first <strong>Ilocanos arrived</strong>, brought by Don Diego Lumicao, a former gobernadorcillo.</p>
                </div>
              </div>
              <div className="timeline-item" data-year="1889">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">1889</span>
                  <p>Renamed <strong>Solano</strong> in honor of Governor General <strong>Ramon Solano y Llanderal</strong>. The town was redeveloped by Father Juan Villaverde with 14 parallel wide streets, each 20 meters wide, forming 100 square blocks.</p>
                </div>
              </div>
              <div className="timeline-item" data-year="1957">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">1957</span>
                  <p>The barrios of Ibung and Bintawan were separated to form the town of Ibung, later renamed as <strong>Villaverde</strong>. Solano&apos;s land area was reduced to <strong>13,980 hectares</strong>.</p>
                </div>
              </div>
            </div>
            <div className="history-summary">
              <div className="history-card">
                <div className="history-card-icon"><i className="bi bi-geo-alt-fill"></i></div>
                <div className="history-card-content">
                  <h4>Once the Largest</h4>
                  <p>Solano was the largest municipality in the province until Caliat and Bintawan were separated to become Quezon and Villaverde respectively.</p>
                </div>
              </div>
              <div className="history-card">
                <div className="history-card-icon"><i className="bi bi-grid-3x3"></i></div>
                <div className="history-card-content">
                  <h4>Urban Planning</h4>
                  <p>The 1889 redevelopment created a grid of 100 square blocks, each with an aggregate area of one hectare, with streets running north-south and east-west.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .history-section { background: linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%); }
          .history-section .home-stats-v2-header h2 { display: flex; align-items: center; gap: 10px; }
          .history-section .home-stats-v2-header h2 i { color: var(--color-primary); }
          .history-content { display: grid; grid-template-columns: 1fr 340px; gap: 32px; align-items: start; }
          .history-timeline { position: relative; padding-left: 28px; }
          .history-timeline::before { content: ''; position: absolute; left: 6px; top: 8px; bottom: 8px; width: 2px; background: linear-gradient(180deg, var(--color-primary) 0%, rgba(0,50,160,0.2) 100%); border-radius: 2px; }
          .timeline-item { position: relative; padding-bottom: 20px; opacity: 0; animation: fadeInUp 0.5s ease forwards; }
          .timeline-item:nth-child(1) { animation-delay: 0.1s; }
          .timeline-item:nth-child(2) { animation-delay: 0.2s; }
          .timeline-item:nth-child(3) { animation-delay: 0.3s; }
          .timeline-item:nth-child(4) { animation-delay: 0.4s; }
          .timeline-item:nth-child(5) { animation-delay: 0.5s; }
          .timeline-item:nth-child(6) { animation-delay: 0.6s; }
          .timeline-item:nth-child(7) { animation-delay: 0.7s; }
          .timeline-item:last-child { padding-bottom: 0; }
          .timeline-marker { position: absolute; left: -28px; top: 4px; width: 14px; height: 14px; background: var(--color-bg); border: 3px solid var(--color-primary); border-radius: 50%; transition: all 0.3s ease; z-index: 1; }
          .timeline-item:hover .timeline-marker { background: var(--color-primary); transform: scale(1.2); box-shadow: 0 0 0 4px rgba(0,50,160,0.15); }
          .timeline-content { background: var(--color-bg); border: 1px solid rgba(0,0,0,0.06); border-radius: 10px; padding: 16px 18px; transition: all 0.3s ease; }
          .timeline-item:hover .timeline-content { border-color: var(--color-primary); box-shadow: 0 4px 16px rgba(0,50,160,0.1); transform: translateX(4px); }
          .timeline-year { display: inline-block; background: var(--color-primary); color: white; font-size: 0.75rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; margin-bottom: 8px; }
          .timeline-content p { font-size: 0.875rem; color: var(--color-text); margin: 0; line-height: 1.6; }
          .timeline-content p strong { color: var(--color-primary); }
          .timeline-content p em { font-style: italic; color: var(--color-text-light); }
          .history-summary { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 100px; }
          .history-card { background: var(--color-bg); border: 1px solid rgba(0,0,0,0.06); border-radius: 12px; padding: 20px; display: flex; gap: 14px; align-items: flex-start; transition: all 0.3s ease; }
          .history-card:hover { border-color: var(--color-primary); box-shadow: 0 4px 16px rgba(0,50,160,0.1); transform: translateY(-2px); }
          .history-card-icon { width: 44px; height: 44px; background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
          .history-card-icon i { color: white; font-size: 1.25rem; }
          .history-card-content h4 { font-size: 0.9375rem; font-weight: 600; color: var(--color-text); margin: 0 0 6px 0; }
          .history-card-content p { font-size: 0.8125rem; color: var(--color-text-light); margin: 0; line-height: 1.5; }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          @media (max-width: 900px) { .history-content { grid-template-columns: 1fr; } .history-summary { position: static; flex-direction: row; flex-wrap: wrap; } .history-card { flex: 1 1 280px; } }
          @media (max-width: 575px) { .history-summary { flex-direction: column; } .history-card { flex: 1 1 100%; } }
        `}</style>
      </section>

      {/* Latest Updates */}
      <section className="section">
        <div className="container">
          <div className="home-section-header">
            <h2>{t('section-updates')}</h2>
            <Link href="/news" className="home-section-link"><span>{t('btn-view-all')}</span> <i className="bi bi-arrow-right"></i></Link>
          </div>
          <div className="home-news-grid">
            <article className="home-news-card">
              <div className="home-news-meta">
                <span className="home-news-badge home-news-badge--info">Announcement</span>
                <span className="home-news-date">Nov 28, 2025</span>
              </div>
              <h3><Link href="/news">Business Permit Renewal 2025</Link></h3>
              <p>Deadline for business permit renewal is set for January 20, 2025. Early renewal is encouraged.</p>
            </article>
            <article className="home-news-card">
              <div className="home-news-meta">
                <span className="home-news-badge home-news-badge--success">Project</span>
                <span className="home-news-date">Nov 15, 2025</span>
              </div>
              <h3><Link href="/news">New Public Market Wing Opens</Link></h3>
              <p>The renovated wing of the Solano Public Market is now open to vendors and the public.</p>
            </article>
            <article className="home-news-card">
              <div className="home-news-meta">
                <span className="home-news-badge home-news-badge--warning">Advisory</span>
                <span className="home-news-date">Nov 10, 2025</span>
              </div>
              <h3><Link href="/news">Scheduled Power Interruption</Link></h3>
              <p>Maintenance scheduled for Barangay Osmeña on Dec 1, 8:00 AM - 5:00 PM.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Municipal Leadership */}
      <section className="section home-leadership-section">
        <div className="container">
          <div className="home-section-header">
            <h2>{t('section-leadership')}</h2>
            <Link href="/government" className="home-section-link"><span>{t('btn-view-officials')}</span> <i className="bi bi-arrow-right"></i></Link>
          </div>
          <div className="home-leadership-grid">
            <div className="home-leader-card">
              <div className="home-leader-badge">{t('title-mayor')}</div>
              <h3>Hon. Philip A. Dacayo</h3>
              <div className="home-leader-contacts">
                <a href="mailto:mayor@solano.gov.ph"><i className="bi bi-envelope"></i> mayor@solano.gov.ph</a>
                <a href="tel:0783265002"><i className="bi bi-telephone"></i> (078) 326-5002</a>
              </div>
            </div>
            <div className="home-leader-card">
              <div className="home-leader-badge">{t('title-vice-mayor')}</div>
              <h3>Hon. Eduardo D. Tiongson</h3>
              <div className="home-leader-contacts">
                <a href="mailto:vicemayor@solano.gov.ph"><i className="bi bi-envelope"></i> vicemayor@solano.gov.ph</a>
                <a href="tel:0783265003"><i className="bi bi-telephone"></i> (078) 326-5003</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section">
        <div className="container">
          <div className="home-section-header">
            <h2>{t('section-contact')}</h2>
            <Link href="/contact" className="home-section-link">{t('btn-view-all')} <i className="bi bi-arrow-right"></i></Link>
          </div>
          <div className="home-contact-v2-grid">
            <a href="tel:0788053581" className="home-contact-v2-card">
              <div className="home-contact-v2-icon"><i className="bi bi-telephone-fill"></i></div>
              <div className="home-contact-v2-content">
                <h3>{t('contact-phone')}</h3>
                <p className="home-contact-v2-value">(078) 805-3581</p>
                <span className="home-contact-v2-note">{t('contact-hours')}</span>
              </div>
            </a>
            <a href="mailto:lgusolanonv@gmail.com" className="home-contact-v2-card">
              <div className="home-contact-v2-icon"><i className="bi bi-envelope-fill"></i></div>
              <div className="home-contact-v2-content">
                <h3>{t('contact-email')}</h3>
                <p className="home-contact-v2-value">lgusolanonv@gmail.com</p>
                <span className="home-contact-v2-note">{t('contact-response')}</span>
              </div>
            </a>
            <div className="home-contact-v2-card">
              <div className="home-contact-v2-icon"><i className="bi bi-geo-alt-fill"></i></div>
              <div className="home-contact-v2-content">
                <h3>{t('contact-address')}</h3>
                <p className="home-contact-v2-value">{t('contact-municipal-hall')}</p>
                <span className="home-contact-v2-note">Solano, Nueva Vizcaya 3708</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
