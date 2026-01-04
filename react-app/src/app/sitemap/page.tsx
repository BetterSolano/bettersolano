import Link from 'next/link';
import { serviceCategories } from '@/data/services';

export const metadata = { title: 'Sitemap', description: 'Complete directory of all pages on this website' };

const pages = [
  { title: 'Home', href: '/' },
  { title: 'Services', href: '/services' },
  { title: 'Government', href: '/government' },
  { title: 'Statistics', href: '/statistics' },
  { title: 'Legislative', href: '/legislative' },
  { title: 'Transparency', href: '/budget' },
  { title: 'Contact', href: '/contact' },
  { title: 'FAQ', href: '/faq' },
  { title: 'Accessibility', href: '/accessibility' },
  { title: 'Privacy Policy', href: '/privacy' },
  { title: 'Terms of Use', href: '/terms' },
];

export default function SitemapPage() {
  return (
    <div className="sitemap-page">
      <section className="page-header">
        <div className="container">
          <nav className="breadcrumb"><Link href="/">Home</Link> / Sitemap</nav>
          <h1>Sitemap</h1>
          <p>Complete directory of all pages on this website</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="sitemap-grid">
            <div className="sitemap-section">
              <h2>Main Pages</h2>
              <ul>{pages.map((p) => <li key={p.href}><Link href={p.href}>{p.title}</Link></li>)}</ul>
            </div>
            <div className="sitemap-section">
              <h2>Service Categories</h2>
              <ul>{serviceCategories.map((c) => <li key={c.id}><Link href={`/services/${c.id}`}>{c.name}</Link></li>)}</ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
