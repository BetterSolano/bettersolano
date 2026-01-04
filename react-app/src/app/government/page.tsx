import Link from 'next/link';

export const metadata = {
  title: 'Government Officials & Structure',
  description: 'Meet the leadership and offices serving Solano, Nueva Vizcaya',
};

export default function GovernmentPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Government</span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <span className="page-header-badge"><i className="bi bi-building-fill"></i> Government</span>
            <h1>Government Structure &amp; Officials</h1>
            <p className="page-header-desc">Meet the leadership and offices serving Solano</p>
          </div>
        </div>
      </section>

      {/* Executive Branch */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'white', padding: '8px 20px', borderRadius: '50px', fontSize: '0.875rem', marginBottom: 'var(--spacing-sm)' }}>
              <i className="bi bi-star-fill"></i> Executive Branch
            </span>
            <h3 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-xs)' }}>Municipal Leadership</h3>
            <p style={{ color: 'var(--color-text-light)' }}>The executive officials leading Solano&apos;s governance</p>
          </div>

          <div className="grid grid-2" style={{ gap: 'var(--spacing-lg)' }}>
            <div className="executive-card">
              <div className="executive-card-header">
                <span className="executive-badge">Municipal Mayor</span>
                <h4 className="executive-name">Hon. Philip A. Dacayo</h4>
              </div>
              <div className="executive-card-body">
                <div className="executive-contacts">
                  <a href="mailto:mayor@solano.gov.ph"><i className="bi bi-envelope"></i> mayor@solano.gov.ph</a>
                  <a href="tel:0783265002"><i className="bi bi-telephone"></i> (078) 326-5002</a>
                  <span><i className="bi bi-clock"></i> Mon-Fri: 8:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>

            <div className="executive-card">
              <div className="executive-card-header">
                <span className="executive-badge">Municipal Vice Mayor</span>
                <h4 className="executive-name">Hon. Eduardo D. Tiongson</h4>
              </div>
              <div className="executive-card-body">
                <div className="executive-contacts">
                  <a href="mailto:vicemayor@solano.gov.ph"><i className="bi bi-envelope"></i> vicemayor@solano.gov.ph</a>
                  <a href="tel:0783265003"><i className="bi bi-telephone"></i> (078) 326-5003</a>
                  <span><i className="bi bi-clock"></i> Mon-Fri: 8:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Municipal Council */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, var(--color-success) 0%, #05c793 100%)', color: 'white', padding: '8px 20px', borderRadius: '50px', fontSize: '0.875rem', marginBottom: 'var(--spacing-sm)' }}>
              <i className="bi bi-people-fill"></i> Legislative Branch
            </span>
            <h3 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-xs)' }}>Sangguniang Bayan Members</h3>
            <p style={{ color: 'var(--color-text-light)' }}>Municipal Councilors serving the people of Solano</p>
          </div>

          <div className="grid grid-3" style={{ gap: 'var(--spacing-md)' }}>
            <div className="councilor-card">
              <h4 className="councilor-name">Hon. Thomas Dave C. Santos</h4>
              <span className="councilor-badge">SB Member</span>
              <p className="councilor-committees">Entrepreneurship &amp; Economic Development, Historical Records &amp; Preservation of Heritage, Culture and the Arts</p>
            </div>
            <div className="councilor-card">
              <h4 className="councilor-name">Hon. Edwin Clifford F. Tito, O.D.</h4>
              <span className="councilor-badge">SB Member</span>
              <p className="councilor-committees">Health &amp; Sanitation, Finance Appropriation and Budget</p>
            </div>
            <div className="councilor-card">
              <h4 className="councilor-name">Hon. Michael Dl. Tiongson, LPT</h4>
              <span className="councilor-badge">SB Member</span>
              <p className="councilor-committees">Education, Science &amp; Technology, Transportation, Commerce, Trade &amp; Industry</p>
            </div>
            <div className="councilor-card">
              <h4 className="councilor-name">Hon. Walter D. Savedra, Sr.</h4>
              <span className="councilor-badge">SB Member</span>
              <p className="councilor-committees">Cooperative Development, Senior Citizens and Disability Affairs</p>
            </div>
            <div className="councilor-card">
              <h4 className="councilor-name">Hon. Atty. Jerome G. Marcos</h4>
              <span className="councilor-badge">SB Member</span>
              <p className="councilor-committees">Legal, Good Governance, Justice, Human Rights, Environmental Management</p>
            </div>
            <div className="councilor-card">
              <h4 className="councilor-name">Hon. Roland M. Carub, J.D.</h4>
              <span className="councilor-badge">SB Member</span>
              <p className="councilor-committees">Agriculture, Aquaculture &amp; Food Security, Overseas Filipino Workers Affairs</p>
            </div>
            <div className="councilor-card">
              <h4 className="councilor-name">Hon. Joseph T. Alindada</h4>
              <span className="councilor-badge">SB Member</span>
              <p className="councilor-committees">Games, Entertainment &amp; Amusement, Internal Affairs</p>
            </div>
            <div className="councilor-card">
              <h4 className="councilor-name">Hon. Luisito L. Lannu</h4>
              <span className="councilor-badge">SB Member</span>
              <p className="councilor-committees">Public Safety, Peace &amp; Order, Family, Women, Children &amp; Social Services</p>
            </div>
            <div className="councilor-card councilor-card--liga">
              <h4 className="councilor-name">Hon. Melchor E. Marzo</h4>
              <span className="councilor-badge councilor-badge--liga">Liga ng mga Barangay President</span>
              <p className="councilor-committees">Barangay Affairs, Tourism</p>
            </div>
            <div className="councilor-card councilor-card--sk">
              <h4 className="councilor-name">Hon. Isaac R. Divina</h4>
              <span className="councilor-badge councilor-badge--sk">SK Federation President</span>
              <p className="councilor-committees">Youth &amp; Sports Development, Legislative Drafting</p>
            </div>
            <div className="councilor-card councilor-card--ipmr">
              <h4 className="councilor-name">Hon. IPMR Leon G. Dumani</h4>
              <span className="councilor-badge councilor-badge--ipmr">IPMR</span>
              <p className="councilor-committees">Indigenous People Affairs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Department Heads */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, var(--color-info) 0%, #0099cc 100%)', color: 'white', padding: '8px 20px', borderRadius: '50px', fontSize: '0.875rem', marginBottom: 'var(--spacing-sm)' }}>
              <i className="bi bi-building-fill"></i> Municipal Offices
            </span>
            <h3 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-xs)' }}>Department Heads &amp; Key Offices</h3>
            <p style={{ color: 'var(--color-text-light)' }}>Municipal offices providing services to citizens</p>
          </div>

          <div className="grid grid-3" style={{ gap: 'var(--spacing-md)' }}>
            <Link href="/service-details/municipal-civil-registrar" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-file-earmark-text-fill"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">Municipal Civil Registrar</h4>
                <p className="dept-card-desc">Birth, death, marriage certificates, CENOMAR</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5011</span>
                  <span><i className="bi bi-envelope"></i> civilreg@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/service-details/municipal-treasurer" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-cash-coin"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">Municipal Treasurer&apos;s Office</h4>
                <p className="dept-card-desc">Tax payments, real property tax, revenue collection</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5012</span>
                  <span><i className="bi bi-envelope"></i> treasurer@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/service-details/municipal-engineering" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-building-fill-gear"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">Municipal Engineering Office</h4>
                <p className="dept-card-desc">Building permits, construction permits, infrastructure</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5013</span>
                  <span><i className="bi bi-envelope"></i> engineer@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/service-details/mswdo-services" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-people-fill"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">MSWDO</h4>
                <p className="dept-card-desc">Social services, PWD &amp; senior citizen IDs, financial assistance</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5014</span>
                  <span><i className="bi bi-envelope"></i> mswdo@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/service-details/municipal-agriculture" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-tree-fill"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">Municipal Agriculture Office</h4>
                <p className="dept-card-desc">Agricultural loans, crop insurance, fertilizer assistance</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5015</span>
                  <span><i className="bi bi-envelope"></i> agri@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/service-details/municipal-planning" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-clipboard-data-fill"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">Municipal Planning &amp; Development</h4>
                <p className="dept-card-desc">Development planning, project monitoring, zoning</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5016</span>
                  <span><i className="bi bi-envelope"></i> mpdo@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/service-details/municipal-assessor" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-house-door-fill"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">Municipal Assessor&apos;s Office</h4>
                <p className="dept-card-desc">Property assessment, tax declarations, land records</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5017</span>
                  <span><i className="bi bi-envelope"></i> assessor@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/service-details/municipal-accounting" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-calculator-fill"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">Municipal Accounting Office</h4>
                <p className="dept-card-desc">Financial records, disbursements, accounting services</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5001</span>
                  <span><i className="bi bi-envelope"></i> accounting@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/service-details/municipal-budget" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-piggy-bank-fill"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">Municipal Budget Office</h4>
                <p className="dept-card-desc">Budget preparation, appropriations, fiscal management</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5001</span>
                  <span><i className="bi bi-envelope"></i> budget@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/service-details/municipal-general-services" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-gear-fill"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">Municipal General Services Office</h4>
                <p className="dept-card-desc">Property management, procurement, administration</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5001</span>
                  <span><i className="bi bi-envelope"></i> gso@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/services/health" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-heart-pulse-fill"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">Municipal Health Office</h4>
                <p className="dept-card-desc">Vaccination, health certificates, medical assistance</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5010</span>
                  <span><i className="bi bi-envelope"></i> mho@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/service-details/business-permits-licensing" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-shop"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">Business Permits &amp; Licensing</h4>
                <p className="dept-card-desc">Business permits, Mayor&apos;s clearance, licensing</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5002</span>
                  <span><i className="bi bi-envelope"></i> bpls@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/service-details/human-resource-management" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-person-badge-fill"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">Human Resource Management</h4>
                <p className="dept-card-desc">Personnel services, recruitment, employee records</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5002</span>
                  <span><i className="bi bi-envelope"></i> hrmo@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/services/public-safety" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-exclamation-triangle-fill"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">MDRRMO</h4>
                <p className="dept-card-desc">Disaster preparedness, emergency response, risk reduction</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> 0926 383 3744</span>
                  <span><i className="bi bi-envelope"></i> mdrrmo@solano.gov.ph</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/service-details/seedo-public-market" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-shop-window"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">SEEDO – Public Market</h4>
                <p className="dept-card-desc">Market clearance, entrance fees, vendor services, CTC</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5001</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/service-details/seedo-slaughterhouse" className="dept-card dept-card-link-wrap">
              <div className="dept-card-icon"><i className="bi bi-box-seam"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">SEEDO – Slaughterhouse</h4>
                <p className="dept-card-desc">Hog, cattle, goat, carabao slaughter with meat inspection</p>
                <div className="dept-card-contacts">
                  <span><i className="bi bi-telephone"></i> (078) 326-5001</span>
                </div>
                <span className="dept-card-link">View Services <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <div className="dept-card">
              <div className="dept-card-icon"><i className="bi bi-briefcase-fill"></i></div>
              <div className="dept-card-content">
                <h4 className="dept-card-title">PESO</h4>
                <p className="dept-card-desc">Job placement, employment assistance, career guidance</p>
                <div className="dept-card-contacts">
                  <a href="tel:09171551043"><i className="bi bi-telephone"></i> 0917-155-1043</a>
                  <a href="https://www.facebook.com/profile.php?id=61564916854423" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i> View Job Vacancies</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barangays */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'white', padding: '8px 20px', borderRadius: '50px', fontSize: '0.875rem', marginBottom: 'var(--spacing-sm)' }}>
              <i className="bi bi-geo-alt-fill"></i> Barangay Units
            </span>
            <h3 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-xs)' }}>Barangays of Solano</h3>
            <p style={{ color: 'var(--color-text-light)' }}>22 Barangays serving our community</p>
          </div>

          <div className="grid grid-4" style={{ gap: 'var(--spacing-sm)' }}>
            {[
              { name: 'Aggub', captain: 'Kap. Felix Caramat Tolentino Sr.', phone: '0975 177 2529' },
              { name: 'Bagahabag', captain: 'Kap. Eduardo Abu Bangad Sr.', phone: '0936 655 1984' },
              { name: 'Bangaan', captain: 'Kap. Isidro Baliza Prado', phone: '0935 242 5023' },
              { name: 'Bangar', captain: 'Kap. Victor Tubay Adalin Jr.', phone: '0935 806 6847' },
              { name: 'Bascaran', captain: 'Kap. Federico Vienes Asuncion', phone: '0926 187 9385' },
              { name: 'Communal', captain: 'Kap. Renaldo Gin-Om Nabad-Aw', phone: '0905 841 1484' },
              { name: 'Concepcion', captain: 'Kap. Jenny Gomez Marquez', phone: '0927 464 6243' },
              { name: 'Curifang', captain: 'Kap. Elmer Zabala Lingayu', phone: '0936 360 7880' },
              { name: 'Dadap', captain: 'Kap. Rudy Eugenio Paranis', phone: '0905 341 2755' },
              { name: 'Lactawan', captain: 'Kap. Sherwin Elevazo Vicente', phone: '0916 995 8916' },
              { name: 'Osmeña', captain: 'Kap. Danilo Estacio Domingo', phone: '0906 384 3974' },
              { name: 'Pilar D. Galima', captain: 'Kap. Dexter Yaranon Ruiz', phone: '0965 551 6034' },
              { name: 'Poblacion North', captain: 'Kap. Angelito De Leon Tiongson', phone: '0917 147 5710' },
              { name: 'Poblacion South', captain: 'Kap. Melchor Esmedina Marzo', phone: '0906 268 5095' },
              { name: 'Quezon', captain: 'Kap. Luis Amangi Castillo', phone: '0920 945 4538' },
              { name: 'Quirino', captain: 'Kap. Walter Dalupang Savedra Sr.', phone: '0935 198 7103' },
              { name: 'Roxas', captain: 'Kap. Edwin Bungan Dacayo', phone: '0936 450 4413' },
              { name: 'San Juan', captain: 'Kap. Nardo Eustaquio Ramel', phone: '0965 348 0556' },
              { name: 'San Luis', captain: 'Kap. Ernesto Domingo Ramones Jr.', phone: '0936 368 0681' },
              { name: 'Tucal', captain: 'Kap. Roberto Ojastro Dizon', phone: '0966 176 9302' },
              { name: 'Uddiawan', captain: 'Kap. Jessie Concepcion Delos Reyes', phone: '0935 546 0625' },
              { name: 'Wacal', captain: 'Kap. Janette Quines Cristobal', phone: '0915 962 1403' },
            ].map((brgy) => (
              <a key={brgy.name} href={`tel:${brgy.phone.replace(/\s/g, '')}`} className="barangay-card">
                <div className="barangay-card-header">
                  <i className="bi bi-geo-alt-fill"></i>
                  <span className="barangay-name">{brgy.name}</span>
                </div>
                <div className="barangay-card-body">
                  <span className="barangay-captain">{brgy.captain}</span>
                  <span className="barangay-contact"><i className="bi bi-telephone"></i> {brgy.phone}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
