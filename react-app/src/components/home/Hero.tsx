'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

export default function Hero() {
  const { t } = useTranslation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="home-hero-v2">
      <div className="container">
        <div className="home-hero-v2-inner">
          <div className="home-hero-v2-text">
            <h1>{t('hero-welcome')}</h1>
            <p>{t('hero-subtitle')}</p>
            <div className="home-hero-v2-actions">
              <Link href="/services" className="btn btn-primary">
                Browse Services <i className="bi bi-arrow-right" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="home-hero-v2-search">
            <div className="home-search-box">
              <h2><i className="bi bi-search" /> Find a Service</h2>
              <form className="search-form" role="search" onSubmit={handleSearch}>
                <div className="search-input-wrapper">
                  <input
                    type="search"
                    id="hero-search"
                    className="service-search-input"
                    placeholder="e.g., birth certificate, business permit"
                    aria-label="Search services"
                    autoComplete="off"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="search-submit-btn" aria-label="Search">
                    <i className="bi bi-arrow-right" />
                  </button>
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
  );
}
