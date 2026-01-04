import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryContent, categoriesContent } from '@/data/categoriesContent';

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return categoriesContent.map((cat) => ({ category: cat.id }));
}

export function generateMetadata({ params }: Props) {
  const category = getCategoryContent(params.category);
  if (!category) return { title: 'Service Category' };

  return {
    title: `${category.name} | Services`,
    description: category.description,
  };
}

export default function ServiceCategoryPage({ params }: Props) {
  const category = getCategoryContent(params.category);
  if (!category) notFound();

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/services">Services</Link>
          <span>/</span>
          <span aria-current="page">{category.name}</span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <span className="page-header-badge">
              <i className={`bi ${category.icon}`}></i> {category.badgeText}
            </span>
            <h1>{category.name}</h1>
            <p className="page-header-desc">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {category.services.map((service) => {
              const CardContent = (
                <>
                  <h3 className="service-item-title">
                    <i className={`bi ${service.icon}`}></i> {service.title}
                  </h3>
                  <p className="service-item-desc">{service.description}</p>
                  <div className="service-item-meta">
                    <span><strong>Fee:</strong> {service.fee}</span>
                    <span><strong>Time:</strong> {service.time}</span>
                  </div>
                </>
              );

              if (service.link) {
                return (
                  <Link
                    key={service.id}
                    href={service.link}
                    className="service-item-card service-item-link"
                  >
                    {CardContent}
                  </Link>
                );
              }

              return (
                <div key={service.id} className="service-item-card">
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Responsible Offices */}
      {category.offices.length > 0 && (
        <section className="section section-compact bg-alt">
          <div className="container">
            <h2 className="section-title-sm">Responsible Offices</h2>
            <div className="office-cards-grid">
              {category.offices.map((office) => (
                <Link key={office.title} href={office.link} className="office-card">
                  <div className="office-card-icon">
                    <i className={`bi ${office.icon}`}></i>
                  </div>
                  <div className="office-card-content">
                    <h3 className="office-card-title">{office.title}</h3>
                    <p className="office-card-desc">{office.description}</p>
                  </div>
                  <div className="office-card-arrow">
                    <i className="bi bi-arrow-right"></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
