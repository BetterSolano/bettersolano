'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/legal.css" />
      
      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Terms of Use</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="legal-hero">
        <div className="container">
          <div className="legal-hero-content">
            <span className="legal-hero-badge"><i className="bi bi-file-earmark-text"></i> Legal</span>
            <h1>Terms of Use</h1>
            <p>Guidelines for using BetterSolano.org</p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="legal-content">
        <div className="container">
          <div className="legal-wrapper">
            {/* Table of Contents */}
            <aside className="legal-toc">
              <h4><i className="bi bi-list-ul"></i> Contents</h4>
              <nav>
                <a href="#introduction">Introduction</a>
                <a href="#acceptance">Acceptance of Terms</a>
                <a href="#public-domain">Public Domain Content</a>
                <a href="#disclaimer">&quot;As Is&quot; Disclaimer</a>
                <a href="#limitation">Limitation of Liability</a>
                <a href="#responsibilities">User Responsibilities</a>
                <a href="#no-advice">No Professional Advice</a>
                <a href="#external-links">External References</a>
                <a href="#availability">Website Availability</a>
                <a href="#indemnification">Indemnification</a>
                <a href="#modifications">Modifications</a>
                <a href="#governing-law">Governing Law</a>
                <a href="#severability">Severability</a>
                <a href="#takedown">Content Concerns</a>
                <a href="#contact">Contact Information</a>
              </nav>
            </aside>

            {/* Main Content */}
            <article className="legal-article">
              <section id="introduction" className="legal-section">
                <h2>Introduction</h2>
                <p>BetterSolano.org is a civic platform dedicated to empowering the people of Solano by providing transparent access to the services, programs, and public funds of LGU Solano.</p>
                <p>While volunteers make every effort to secure BetterSolano.org from online threats and keep information accurate, no system can be guaranteed to be perfectly secure, error-free, or completely up-to-date at all times.</p>
                <div className="legal-highlight">
                  <i className="bi bi-heart-fill"></i>
                  <span>This platform is provided <strong>free of charge</strong> as a public service.</span>
                </div>
              </section>

              <section id="acceptance" className="legal-section">
                <h2>Acceptance of Terms</h2>
                <p>By accessing and using this website, you acknowledge and agree to be bound by these terms and conditions. Your continued use of the site signifies your ongoing acceptance of this agreement.</p>
              </section>

              <section id="public-domain" className="legal-section">
                <h2>Public Domain Content and Volunteer Operation</h2>
                <p>This website and its content are provided as a public domain resource and are operated entirely by volunteers. All information, data, documents, and materials on this website are in the public domain unless otherwise stated.</p>
                <p>Public domain content may be freely used, copied, distributed, and modified without permission or attribution, although attribution to BetterSolano.org and LGU Solano is encouraged as a civic courtesy.</p>
                <div className="legal-note">
                  <i className="bi bi-info-circle"></i>
                  <p>As a volunteer-run initiative, this website does not replace official government channels. Residents and stakeholders are encouraged to conduct their own independent research and verification of all information found here and to consult official LGU Solano offices and government agencies when making important decisions.</p>
                </div>
              </section>

              <section id="disclaimer" className="legal-section">
                <h2>&quot;As Is&quot; Disclaimer</h2>
                <p>All information on this website is provided &quot;AS IS&quot; without warranty of any kind, whether express or implied. This includes, but is not limited to:</p>
                <ul className="legal-list">
                  <li>Warranties of merchantability</li>
                  <li>Fitness for a particular purpose</li>
                  <li>Non-infringement of intellectual property rights</li>
                  <li>Accuracy, completeness, or reliability of information</li>
                  <li>Freedom from errors, viruses, or other harmful components</li>
                </ul>
                <p>Users should treat all content as informational and not as a substitute for official records or professional advice.</p>
              </section>

              <section id="limitation" className="legal-section">
                <h2>Limitation of Liability</h2>
                <p>To the fullest extent permitted by law, the website operators, volunteers, contributors, and any affiliated civic partners shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from or related to:</p>
                <ul className="legal-list">
                  <li>Your use of or reliance on this website or its content</li>
                  <li>Any errors, omissions, or outdated information</li>
                  <li>Any interruption, suspension, or cessation of website availability</li>
                  <li>Any bugs, viruses, or other harmful components transmitted through the site</li>
                  <li>Any loss, corruption, or disclosure of data or information</li>
                </ul>
                <p>This limitation applies regardless of the form of action or legal theory, including contract, tort, negligence, or strict liability.</p>
              </section>

              <section id="responsibilities" className="legal-section">
                <h2>User Responsibilities and Research Guidelines</h2>
                <p>Users share responsibility for promoting informed and responsible civic engagement. By using this website, you are solely responsible for:</p>
                <ul className="legal-list">
                  <li>Independently verifying all information obtained from this website</li>
                  <li>Reviewing and visiting original source links and references provided</li>
                  <li>Cross-checking information with multiple reliable and official sources before making decisions</li>
                  <li>Determining whether the information is suitable for your intended use</li>
                  <li>Complying with all applicable laws, regulations, and local ordinances</li>
                  <li>Accepting any consequences that may arise from your use of the website and its content</li>
                </ul>
                <div className="legal-callout">
                  <h4><i className="bi bi-lightbulb"></i> You are strongly encouraged to:</h4>
                  <ul>
                    <li>Use the source links and references on each page to access primary documents and official records</li>
                    <li>Conduct additional research beyond what is presented on this website</li>
                    <li>Consult official government websites, offices, and agencies for the most current information</li>
                    <li>Verify dates, figures, and other details through multiple reputable sources</li>
                  </ul>
                </div>
              </section>

              <section id="no-advice" className="legal-section">
                <h2>No Professional Advice</h2>
                <p>The information on this website is provided for educational, informational, and civic transparency purposes only. It does not constitute legal, medical, financial, or any other form of professional advice.</p>
                <p>Users should consult qualified professionals or appropriate government offices for advice specific to their circumstances.</p>
              </section>

              <section id="external-links" className="legal-section">
                <h2>Source Links and External References</h2>
                <p>This website may provide links to official sources, government documents, and other authoritative materials to support civic awareness and transparency. Users are encouraged to:</p>
                <ul className="legal-list">
                  <li>Click through and review all source links provided</li>
                  <li>Access primary documents and official publications referenced</li>
                  <li>Verify information directly from original and official sources</li>
                  <li>Check for updates, amendments, or corrections to referenced materials</li>
                </ul>
                <p>The continued availability, accuracy, and reliability of external links cannot be guaranteed. Links may change or become unavailable without notice, and users should always confirm information through official channels.</p>
              </section>

              <section id="availability" className="legal-section">
                <h2>Website Availability</h2>
                <p>Although volunteers aim to keep the website accessible and functional, BetterSolano.org cannot guarantee that the website will be:</p>
                <ul className="legal-list">
                  <li>Available or accessible at all times</li>
                  <li>Error-free or uninterrupted</li>
                  <li>Free from technical problems, vulnerabilities, or disruptions</li>
                  <li>Fully compatible with all devices, browsers, or assistive technologies</li>
                </ul>
                <p>Users are encouraged to report technical issues and broken links so volunteers can address them as resources allow.</p>
              </section>

              <section id="indemnification" className="legal-section">
                <h2>Indemnification</h2>
                <p>By using this website, you agree to indemnify and hold harmless the website operators, volunteers, contributors, and affiliated civic partners from any claims, damages, losses, liabilities, or expenses (including reasonable legal fees) arising from your use of the website or your violation of these terms.</p>
              </section>

              <section id="modifications" className="legal-section">
                <h2>Modifications</h2>
                <p>These terms may be updated or modified from time to time to reflect legal requirements, policy changes, or improvements to civic services. Changes may be made without prior notice. Your continued use of the website after any changes are posted constitutes your acceptance of the updated terms.</p>
              </section>

              <section id="governing-law" className="legal-section">
                <h2>Governing Law</h2>
                <p>These terms are governed by and construed in accordance with the laws of the Republic of the Philippines, without regard to any conflict of law principles. Any disputes arising in connection with these terms or your use of the website shall be subject to the jurisdiction of the appropriate courts in the Philippines.</p>
              </section>

              <section id="severability" className="legal-section">
                <h2>Severability</h2>
                <p>If any provision of these terms is found to be invalid, unlawful, or unenforceable, that provision shall be applied to the greatest extent permitted by law, and the remaining provisions shall remain in full force and effect.</p>
              </section>

              <section id="takedown" className="legal-section">
                <h2>Content Concerns and Takedown Requests</h2>
                <p>BetterSolano.org values accuracy, public safety, and respect for rights. Despite good-faith efforts, some content may become outdated, incomplete, or raise legitimate concerns.</p>
                <p>If you believe that any content on this website is:</p>
                <ul className="legal-list">
                  <li>Factually incorrect or misleading</li>
                  <li>Potentially harmful or dangerous</li>
                  <li>In violation of applicable laws or regulations</li>
                  <li>Containing personal information that should not be public</li>
                  <li>Infringing upon legitimate rights or interests</li>
                </ul>
                <p>Please contact us at: <a href="mailto:volunteer@bettersolano.org">volunteer@bettersolano.org</a></p>
                
                <div className="legal-callout">
                  <h4><i className="bi bi-envelope"></i> When reaching out, kindly include:</h4>
                  <ul>
                    <li>The specific URL or page location</li>
                    <li>A clear description of your concern</li>
                    <li>Supporting documentation or evidence, where applicable</li>
                    <li>Your contact information for follow-up</li>
                  </ul>
                </div>

                <h3>Our Response Process</h3>
                <ul className="legal-list">
                  <li>Legitimate concerns will be reviewed in good faith by volunteers.</li>
                  <li>Response times may vary due to the volunteer nature of this initiative.</li>
                  <li>Content may be removed, corrected, updated, or accompanied by additional disclaimers as appropriate.</li>
                  <li>Editorial decisions about content rest with the website team, guided by public interest and civic responsibility.</li>
                  <li>Knowingly false, malicious, or frivolous complaints may result in restricted communication with our volunteers.</li>
                </ul>
              </section>

              <section id="contact" className="legal-section">
                <h2>Contact Information</h2>
                <p>For questions about these terms, feedback on civic information, or content-related concerns, please contact:</p>
                <div className="legal-contact">
                  <a href="mailto:volunteer@bettersolano.org" className="contact-link">
                    <i className="bi bi-envelope-fill"></i>
                    <span>volunteer@bettersolano.org</span>
                  </a>
                </div>
                <p className="legal-closing">BetterSolano.org provides public domain information to support civic engagement, transparency, and informed participation in local governance.</p>
              </section>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
