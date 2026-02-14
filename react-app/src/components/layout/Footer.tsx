'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main-new">
          <div className="footer-brand">
            <img src="/assets/images/logo/better-solano-logo-white.svg" alt="Better Solano logo" className="footer-logo" />
            <p className="footer-tagline">{t('footer-tagline')}</p>
            <div className="footer-social-new">
              <a href="https://www.facebook.com/bettersolano.org" className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="https://www.linkedin.com/company/bettersolano/" className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
              <a href="https://discord.com/invite/qeSu7RJkjQ" className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="Discord"><i className="bi bi-discord"></i></a>
            </div>
          </div>
          <div className="footer-column">
            <h4>{t('footer-quick-links')}</h4>
            <ul className="footer-links-new">
              <li><a href="https://quiz.bettersolano.org/" target="_blank" rel="noopener noreferrer">{t('footer-solano-quiz')}</a></li>
              <li><a href="/sitemap-page">{t('footer-sitemap')}</a></li>
              <li><a href="https://solano.gov.ph/wp-content/uploads/2025/10/As-of-October-21-2025-2.pdf" target="_blank" rel="noopener noreferrer">{t('footer-citizens-charter')}</a></li>
              <li><a href="/terms">{t('footer-terms')}</a></li>
              <li><a href="/privacy">{t('footer-privacy')}</a></li>
              <li><a href="/accessibility">{t('footer-accessibility')}</a></li>
              <li><a href="/faq">{t('footer-faq')}</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>{t('footer-resources')}</h4>
            <ul className="footer-links-new">
              <li><a href="https://data.gov.ph" target="_blank" rel="noopener noreferrer">{t('footer-open-data')}</a></li>
              <li><a href="https://www.foi.gov.ph/" target="_blank" rel="noopener noreferrer">{t('footer-foi')}</a></li>
              <li><a href="https://solano.gov.ph/" target="_blank" rel="noopener noreferrer">{t('footer-lgu-portal')}</a></li>
              <li><a href="https://sangguniangbayan.solano.gov.ph/" target="_blank" rel="noopener noreferrer">{t('footer-sb')}</a></li>
              <li><a href="https://www.facebook.com/OfficialLguSolanoFanpage/" target="_blank" rel="noopener noreferrer">{t('footer-lgu-facebook')}</a></li>
              <li><a href="https://blgf.gov.ph/" target="_blank" rel="noopener noreferrer">{t('footer-blgf')}</a></li>
              <li><a href="https://cmci.dti.gov.ph/" target="_blank" rel="noopener noreferrer">{t('footer-cmci')}</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <div className="footer-cost" role="status" aria-label="Cost to the People of Solano: Zero Pesos">
              {t('footer-cost')} <span className="footer-cost-value">₱0</span>
            </div>
            <a href="mailto:volunteer@bettersolano.org" className="footer-contribute"><i className="bi bi-envelope-heart"></i> {t('footer-volunteer')}</a>
            <a href="https://github.com/BetterSolano/bettersolano" className="footer-contribute" target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i> {t('footer-contribute')}</a>
            <div className="footer-partners">
              <a href="https://abakada.org" target="_blank" rel="noopener noreferrer" aria-label="Abakada.org"><img src="/assets/images/logo/abakada-footer.svg" alt="Abakada.org" className="footer-partner-logo" width="120" height="28" loading="lazy" /></a>
              <a href="https://bettergov.ph" target="_blank" rel="noopener noreferrer" aria-label="BetterGov.ph"><img src="/assets/images/logo/bettergov-footer.svg" alt="BetterGov.ph" className="footer-partner-logo" width="120" height="28" loading="lazy" /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom-new">
          <div className="footer-copyright">
            <span className="footer-copyright-text">&copy; {currentYear} {t('footer-copyright-text')}</span>
            <span className="footer-copyright-license">MIT | CC BY 4.0</span>
            <span className="footer-copyright-disclaimer">{t('footer-copyright-disclaimer')}</span>
            <span className="footer-version"><i className="bi bi-boxes"></i> Ver. 1.1.14</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
