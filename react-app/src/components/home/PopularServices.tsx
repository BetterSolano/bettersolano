'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

interface ServiceCard {
  href: string;
  icon: string;
  titleKey: string;
  descKey: string;
  isViewAll?: boolean;
}

const services: ServiceCard[] = [
  { href: '/services/certificates', icon: 'bi-file-earmark-text-fill', titleKey: 'service-certificates', descKey: 'service-certificates-desc' },
  { href: '/services/business', icon: 'bi-shop', titleKey: 'service-business', descKey: 'service-business-desc' },
  { href: '/services/tax-payments', icon: 'bi-cash-coin', titleKey: 'service-tax', descKey: 'service-tax-desc' },
  { href: '/services/social-services', icon: 'bi-people-fill', titleKey: 'service-social', descKey: 'service-social-desc' },
  { href: '/services/health', icon: 'bi-heart-pulse-fill', titleKey: 'service-health', descKey: 'service-health-desc' },
  { href: '/services', icon: 'bi-grid-fill', titleKey: 'btn-view-all-services', descKey: '', isViewAll: true },
];

export default function PopularServices() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <div className="container">
        <div className="home-section-header">
          <h2>{t('section-popular')}</h2>
          <p>Quick access to frequently requested municipal services</p>
        </div>
        <div className="home-services-grid">
          {services.map((service) => (
            <Link
              key={service.href + service.titleKey}
              href={service.href}
              className={`home-service-card ${service.isViewAll ? 'home-service-card--all' : ''}`}
            >
              <div className="home-service-icon">
                <i className={`bi ${service.icon}`} />
              </div>
              <div className="home-service-content">
                <h3>{t(service.titleKey)}</h3>
                {service.descKey && <p>{t(service.descKey)}</p>}
                {service.isViewAll && <p>Browse complete directory</p>}
              </div>
              <i className="bi bi-arrow-right home-service-arrow" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
