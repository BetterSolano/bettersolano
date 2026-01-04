'use client';

import Link from 'next/link';

interface StatCard {
  href: string;
  icon: string;
  value: string;
  label: string;
  source: string;
}

const stats: StatCard[] = [
  { href: '/statistics', icon: 'bi-people-fill', value: '69,296', label: 'Population', source: '2024 Census' },
  { href: '/government', icon: 'bi-geo-alt-fill', value: '22', label: 'Barangays', source: 'Administrative Units' },
  { href: '/budget', icon: 'bi-award-fill', value: '1st Class', label: 'Municipality', source: 'Income Classification' },
  { href: '/statistics', icon: 'bi-rulers', value: '162.70 km²', label: 'Land Area', source: 'Total Municipal Area' },
];

export default function QuickStats() {
  return (
    <section className="home-stats-v2">
      <div className="container">
        <div className="home-stats-v2-header">
          <h2>Solano at a Glance</h2>
          <Link href="/statistics" className="home-section-link">
            View Statistics <i className="bi bi-arrow-right" />
          </Link>
        </div>
        <div className="home-stats-v2-grid">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href} className="home-stat-card">
              <div className="home-stat-card-icon">
                <i className={`bi ${stat.icon}`} />
              </div>
              <div className="home-stat-card-content">
                <span className="home-stat-card-value">{stat.value}</span>
                <span className="home-stat-card-label">{stat.label}</span>
                <span className="home-stat-card-source">{stat.source}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
