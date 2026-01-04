import Link from 'next/link';

export const metadata = {
  title: 'Ordinance Framework | BetterSolano.org',
  description: 'Browse municipal ordinances enacted by the Sangguniang Bayan of Solano, Nueva Vizcaya.',
};

const ordinanceCategories = [
  { icon: 'bi-cash-coin', label: 'Revenue & Taxation' },
  { icon: 'bi-shop', label: 'Business & Trade' },
  { icon: 'bi-shield-check', label: 'Public Safety' },
  { icon: 'bi-tree', label: 'Environment' },
  { icon: 'bi-signpost-2', label: 'Traffic & Transportation' },
  { icon: 'bi-building', label: 'Zoning & Land Use' },
];

const ordinances2025 = [
  { no: '2025-05-II', title: 'An Ordinance Creating the Film Development Council of the Municipality of Solano, Nueva Vizcaya, Providing for Its Powers and Functions, and for Other Purposes', date: 'April 21, 2025' },
  { no: '2025-04-II', title: 'An Ordinance Prohibiting the Entry of Nuisance Contraband Inside the Solano District Jail in the Municipality of Solano, Nueva Vizcaya, and Providing Penalties for Violation Thereof', date: 'April 21, 2025' },
  { no: '2025-03-II', title: 'An Ordinance Creating the Solano Municipal Housing Board, Defining its Powers and Functions, and for Other Purposes', date: 'March 3, 2025' },
  { no: '2025-02-II', title: 'An Ordinance Requiring All Households in the Municipality of Solano, Nueva Vizcaya to Comply with Zero Open Defecation (ZOD), Providing for Its Guidelines and Penalties for Violation and Appropriating Funds Therefor', date: 'February 25, 2025' },
  { no: '2025-01-II', title: 'An Ordinance Revising the Gender and Development Code of the Municipality of Solano, Nueva Vizcaya and for Other Purposes, Subject to All Laws and Existing Rules and Regulations', date: 'February 25, 2025' },
];

export default function OrdinanceFrameworkPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/legislative">Legislative</Link>
          <span>/</span>
          <span aria-current="page">Ordinance Framework</span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <span className="page-header-badge"><i className="bi bi-journal-text"></i> Legislative</span>
            <h1>Ordinance Framework</h1>
            <p className="page-header-desc">Municipal ordinances enacted by the Sangguniang Bayan ng Solano</p>
          </div>
        </div>
      </section>

      {/* About Ordinances */}
      <section className="section">
        <div className="container">
          <div className="info-card">
            <div className="info-card-icon"><i className="bi bi-info-circle"></i></div>
            <div className="info-card-content">
              <h3>What is an Ordinance?</h3>
              <p>A municipal ordinance is a local law enacted by the Sangguniang Bayan (Municipal Council) that governs the municipality and its residents. Ordinances have the force and effect of law within the territorial jurisdiction of the municipality.</p>
              <p>Ordinances may cover various subjects including but not limited to: taxation, business regulations, public safety, environmental protection, traffic management, and zoning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ordinance Categories */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-xs)' }}>Ordinance Categories</h2>
          </div>
          <div className="grid grid-3" style={{ gap: 'var(--spacing-sm)' }}>
            {ordinanceCategories.map((cat) => (
              <div key={cat.label} className="category-tag">
                <i className={`bi ${cat.icon}`}></i> {cat.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2025 Ordinances Table */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-xs)' }}>2025 Ordinances</h2>
            <p style={{ color: 'var(--color-text-light)' }}>Official ordinances enacted by the Sangguniang Bayan ng Solano in 2025</p>
          </div>
          <div className="table-responsive">
            <table className="data-table ordinance-table">
              <caption className="sr-only">List of 2025 Ordinances from Sangguniang Bayan ng Solano</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ width: '120px' }}>Ordinance No.</th>
                  <th scope="col">Title</th>
                  <th scope="col" style={{ width: '120px' }}>Session Date</th>
                </tr>
              </thead>
              <tbody>
                {ordinances2025.map((ord) => (
                  <tr key={ord.no}>
                    <td>{ord.no}</td>
                    <td>{ord.title}</td>
                    <td>{ord.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center" style={{ marginTop: 'var(--spacing-lg)' }}>
            <a
              href="https://sangguniangbayan.solano.gov.ph/index.php?page=legislative_framework_ord"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <i className="bi bi-box-arrow-up-right"></i> View All Ordinances on SB Website
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
