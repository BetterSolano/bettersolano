import Link from 'next/link';

export const metadata = {
  title: 'Resolution Framework | BetterSolano.org',
  description: 'Browse resolutions passed by the Sangguniang Bayan of Solano, Nueva Vizcaya.',
};

const resolutionTypes = [
  { icon: 'bi-award', label: 'Commendation' },
  { icon: 'bi-envelope-paper', label: 'Request/Appeal' },
  { icon: 'bi-hand-thumbs-up', label: 'Support/Endorsement' },
  { icon: 'bi-exclamation-circle', label: 'Condolence' },
  { icon: 'bi-clipboard-check', label: 'Authorization' },
];

const resolutions2025 = [
  { no: '2025-205-II', title: 'A Resolution Authorizing the Municipality of Solano, Nueva Vizcaya, thru the Honorable Municipal Mayor, Virginia R. Soriano, to Enter into a Memorandum of Agreement with the Department of Labor and Employment (DOLE) for Youth Employment Program', date: 'April 21, 2025' },
  { no: '2025-204-II', title: 'A Resolution Approving the Municipal and Barangay Council for the Protection of Children (MCPC/BCPC) Work and Financial Plan for CY 2025', date: 'April 21, 2025' },
  { no: '2025-203-II', title: 'A Resolution Authorizing Mayor Virginia R. Soriano to Enter Into Contract with ABC Construction for the Improvement of Road Network in Brgy. Quezon', date: 'April 7, 2025' },
  { no: '2025-202-II', title: 'A Resolution Authorizing the Local Chief Executive, Hon. Virginia R. Soriano, to Procure Various Agricultural Equipment and Supplies for Distribution to Local Farmers', date: 'April 7, 2025' },
  { no: '2025-201-II', title: 'A Resolution Expressing Full Support to the Implementation of Enhanced Community Learning Centers (ECLCs) in All Barangays of Solano, Nueva Vizcaya', date: 'March 24, 2025' },
  { no: '2025-200-II', title: 'A Resolution Commending the Philippine National Police - Solano Municipal Police Station for Exemplary Performance in Crime Prevention and Public Safety', date: 'March 24, 2025' },
  { no: '2025-199-II', title: 'A Resolution Requesting the Department of Public Works and Highways to Expedite the Rehabilitation of the Solano-Bagabag National Road Section', date: 'March 10, 2025' },
  { no: '2025-198-II', title: 'A Resolution Approving the Annual Budget for the Sangguniang Kabataan Federation of Solano, Nueva Vizcaya for Fiscal Year 2025', date: 'March 10, 2025' },
  { no: '2025-197-II', title: 'A Resolution Authorizing the Municipal Mayor to Accept Donation of Lot from the Provincial Government for the Construction of Multi-Purpose Hall', date: 'February 24, 2025' },
  { no: '2025-196-II', title: 'A Resolution Expressing Condolence to the Family of the Late Honorable Councilor Emeritus Ricardo S. Marcos', date: 'February 24, 2025' },
  { no: '2025-195-II', title: 'A Resolution Supporting the National Anti-Drug Campaign and Reiterating the Municipal Government\'s Commitment to Drug-Free Communities', date: 'February 10, 2025' },
  { no: '2025-194-II', title: 'A Resolution Approving the Supplemental Budget No. 1 for Fiscal Year 2025 of the Municipality of Solano, Nueva Vizcaya', date: 'February 10, 2025' },
  { no: '2025-193-II', title: 'A Resolution Authorizing the Creation of Task Force Kalinisan to Implement Solid Waste Management Programs in All Barangays', date: 'January 27, 2025' },
  { no: '2025-192-II', title: 'A Resolution Endorsing the Application of Barangay Roxas for the Seal of Good Local Governance (SGLG) Award', date: 'January 27, 2025' },
  { no: '2025-191-II', title: 'A Resolution Declaring February 2025 as "Solano Heritage Month" and Authorizing Related Cultural Activities and Celebrations', date: 'January 13, 2025' },
  { no: '2025-190-II', title: 'A Resolution Expressing Gratitude to the Department of Health for the Successful Implementation of the COVID-19 Vaccination Program in Solano', date: 'January 13, 2025' },
];

export default function ResolutionFrameworkPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/legislative">Legislative</Link>
          <span>/</span>
          <span aria-current="page">Resolution Framework</span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <span className="page-header-badge"><i className="bi bi-file-earmark-text"></i> Legislative</span>
            <h1>Resolution Framework</h1>
            <p className="page-header-desc">Resolutions passed by the Sangguniang Bayan ng Solano</p>
          </div>
        </div>
      </section>

      {/* About Resolutions */}
      <section className="section">
        <div className="container">
          <div className="info-card">
            <div className="info-card-icon"><i className="bi bi-info-circle"></i></div>
            <div className="info-card-content">
              <h3>What is a Resolution?</h3>
              <p>A resolution is a formal expression of the opinion or will of the Sangguniang Bayan. Unlike ordinances, resolutions do not have the force and effect of law but serve as official statements of the legislative body.</p>
              <p>Resolutions are commonly used for: commendations, requests to higher government agencies, expressions of support or opposition, and administrative matters of the Sangguniang Bayan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resolution Types */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-xs)' }}>Types of Resolutions</h2>
          </div>
          <div className="grid grid-3" style={{ gap: 'var(--spacing-sm)' }}>
            {resolutionTypes.map((type) => (
              <div key={type.label} className="category-tag">
                <i className={`bi ${type.icon}`}></i> {type.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2025 Resolutions Table */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-xs)' }}>2025 Resolutions</h2>
            <p style={{ color: 'var(--color-text-light)' }}>Official resolutions passed by the Sangguniang Bayan ng Solano in 2025</p>
          </div>
          <div className="table-responsive">
            <table className="data-table resolution-table">
              <caption className="sr-only">List of 2025 Resolutions from Sangguniang Bayan ng Solano</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ width: '130px' }}>Resolution No.</th>
                  <th scope="col">Title</th>
                  <th scope="col" style={{ width: '120px' }}>Session Date</th>
                </tr>
              </thead>
              <tbody>
                {resolutions2025.map((res) => (
                  <tr key={res.no}>
                    <td>{res.no}</td>
                    <td>{res.title}</td>
                    <td>{res.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center" style={{ marginTop: 'var(--spacing-lg)' }}>
            <a
              href="https://sangguniangbayan.solano.gov.ph/index.php?page=legislative_framework_reso"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <i className="bi bi-box-arrow-up-right"></i> View All Resolutions on SB Website
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
