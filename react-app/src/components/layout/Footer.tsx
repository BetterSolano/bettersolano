export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main-new">
          <div className="footer-brand">
            <img src="/assets/images/logo/better-solano-logo-white.svg" alt="Better Solano logo" className="footer-logo" />
            <p className="footer-tagline">Empowering the people of Solano with transparent access to the services, programs, and public funds of LGU Solano.</p>
            <div className="footer-social-new">
              <a href="https://www.facebook.com/bettersolano.org" className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="https://www.linkedin.com/company/bettersolano/" className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
              <a href="https://discord.com/invite/qeSu7RJkjQ" className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="Discord"><i className="bi bi-discord"></i></a>
            </div>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul className="footer-links-new">
              <li><a href="/sitemap-page">Sitemap</a></li>
              <li><a href="https://solano.gov.ph/wp-content/uploads/2025/10/As-of-October-21-2025-2.pdf" target="_blank" rel="noopener noreferrer">Citizen&apos;s Charter</a></li>
              <li><a href="/terms">Terms of Use</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/accessibility">Accessibility</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul className="footer-links-new">
              <li><a href="https://data.gov.ph" target="_blank" rel="noopener noreferrer">Open Data Philippines</a></li>
              <li><a href="https://www.foi.gov.ph/" target="_blank" rel="noopener noreferrer">Freedom of Information</a></li>
              <li><a href="https://solano.gov.ph/" target="_blank" rel="noopener noreferrer">Official LGU Solano Portal</a></li>
              <li><a href="https://sangguniangbayan.solano.gov.ph/" target="_blank" rel="noopener noreferrer">Sangguniang Bayan</a></li>
              <li><a href="https://www.facebook.com/OfficialLguSolanoFanpage/" target="_blank" rel="noopener noreferrer">LGU Solano Facebook</a></li>
              <li><a href="https://blgf.gov.ph/" target="_blank" rel="noopener noreferrer">BLGF Portal</a></li>
              <li><a href="https://cmci.dti.gov.ph/" target="_blank" rel="noopener noreferrer">CMCI DTI Portal</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <div className="footer-cost" role="status" aria-label="Cost to the People of Solano: Zero Pesos">
              Cost to the People of Solano = <span className="footer-cost-value">₱0</span>
            </div>
            <a href="mailto:volunteer@bettersolano.org" className="footer-contribute"><i className="bi bi-envelope-heart"></i> Volunteer with us</a>
            <a href="https://github.com/BetterSolano/bettersolano" className="footer-contribute" target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i> Contribute code with us</a>
          </div>
        </div>
        <div className="footer-bottom-new">
          <div className="footer-copyright">
            <span>&copy; {currentYear} Better Solano. MIT | CC BY 4.0 All public information sourced from official government portals.</span>
            <span className="footer-version"><i className="bi bi-boxes"></i> Ver. 1.1.12</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
