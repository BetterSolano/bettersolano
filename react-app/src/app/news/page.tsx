'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NewsPage() {
  const { t } = useLanguage();

  const newsItems = [
    {
      id: 1,
      title: 'Business Permit Renewal 2025',
      date: 'Nov 28, 2025',
      badge: 'Announcement',
      badgeClass: 'home-news-badge--info',
      description: 'Deadline for business permit renewal is set for January 20, 2025. Early renewal is encouraged to avoid long queues and delays. The Municipal Business Permits and Licensing Office (BPLO) will be open from 8:00 AM to 5:00 PM on weekdays.',
    },
    {
      id: 2,
      title: 'New Public Market Wing Opens',
      date: 'Nov 15, 2025',
      badge: 'Project',
      badgeClass: 'home-news-badge--success',
      description: 'The renovated wing of the Solano Public Market is now open to vendors and the public. The new wing features improved ventilation, modern stalls, and better sanitation facilities.',
    },
    {
      id: 3,
      title: 'Scheduled Power Interruption',
      date: 'Nov 10, 2025',
      badge: 'Advisory',
      badgeClass: 'home-news-badge--warning',
      description: 'Maintenance scheduled for Barangay Osmeña on Dec 1, 8:00 AM - 5:00 PM. Affected areas include the main road and surrounding residential areas. Please prepare accordingly.',
    },
    {
      id: 4,
      title: 'Free Medical Mission',
      date: 'Nov 5, 2025',
      badge: 'Event',
      badgeClass: 'home-news-badge--info',
      description: 'The Municipal Health Office in partnership with the Department of Health will conduct a free medical mission at the Municipal Gymnasium on November 15, 2025.',
    },
    {
      id: 5,
      title: 'Road Improvement Project Completed',
      date: 'Oct 28, 2025',
      badge: 'Project',
      badgeClass: 'home-news-badge--success',
      description: 'The road improvement project along the national highway has been completed. The project includes road widening, drainage improvement, and installation of street lights.',
    },
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">{t('nav-home')}</Link>
          <span>/</span>
          <span aria-current="page">News & Announcements</span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <span className="page-header-badge"><i className="bi bi-newspaper"></i> News</span>
            <h1>News & Announcements</h1>
            <p className="page-header-desc">Stay updated with the latest news and announcements from the Municipality of Solano</p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="section">
        <div className="container">
          <div className="news-list">
            {newsItems.map((item) => (
              <article key={item.id} className="news-card">
                <div className="news-card-meta">
                  <span className={`home-news-badge ${item.badgeClass}`}>{item.badge}</span>
                  <span className="news-card-date"><i className="bi bi-calendar3"></i> {item.date}</span>
                </div>
                <h2 className="news-card-title">{item.title}</h2>
                <p className="news-card-desc">{item.description}</p>
                <Link href={`/news/${item.id}`} className="news-card-link">
                  Read More <i className="bi bi-arrow-right"></i>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
