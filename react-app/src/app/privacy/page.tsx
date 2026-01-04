'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/legal.css" />
      
      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Privacy Policy</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="legal-hero">
        <div className="container">
          <div className="legal-hero-content">
            <span className="legal-hero-badge"><i className="bi bi-shield-lock"></i> Privacy</span>
            <h1>Privacy Policy</h1>
            <p>How we collect, use, and protect your information</p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="legal-content">
        <div className="container">
          <div className="legal-wrapper">
            {/* Table of Contents */}
            <aside className="legal-toc">
              <h4><i className="bi bi-list-ul"></i> Contents</h4>
              <nav>
                <a href="#introduction">Introduction</a>
                <a href="#legal-basis">Legal Basis</a>
                <a href="#information-collected">Information We Collect</a>
                <a href="#how-we-use">How We Use Information</a>
                <a href="#cookies">Cookies &amp; Analytics</a>
                <a href="#data-sharing">Data Sharing</a>
                <a href="#data-security">Data Security</a>
                <a href="#data-retention">Data Retention</a>
                <a href="#your-rights">Your Rights</a>
                <a href="#childrens-privacy">Children&apos;s Privacy</a>
                <a href="#third-party">Third-Party Links</a>
                <a href="#changes">Policy Changes</a>
                <a href="#contact">Contact Us</a>
              </nav>
            </aside>

            {/* Main Content */}
            <article className="legal-article">
              <section id="introduction" className="legal-section">
                <h2>Introduction</h2>
                <p>BetterSolano.org (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
                <p>This policy is designed to comply with the <strong>Data Privacy Act of 2012 (Republic Act No. 10173)</strong> of the Philippines and its Implementing Rules and Regulations (IRR).</p>
                <div className="legal-highlight">
                  <i className="bi bi-shield-check"></i>
                  <span>We are committed to <strong>transparency</strong> and <strong>data minimization</strong> — we only collect what is necessary.</span>
                </div>
              </section>

              <section id="legal-basis" className="legal-section">
                <h2>Legal Basis for Processing</h2>
                <p>Under the Data Privacy Act of 2012, we process personal information based on the following lawful criteria:</p>
                <ul className="legal-list">
                  <li><strong>Consent:</strong> When you voluntarily provide information through contact forms or email communications</li>
                  <li><strong>Legitimate Interest:</strong> To improve our website, ensure security, and provide better civic services</li>
                  <li><strong>Legal Obligation:</strong> When required by Philippine law or government authorities</li>
                  <li><strong>Public Interest:</strong> To promote transparency and civic engagement in local governance</li>
                </ul>
              </section>

              <section id="information-collected" className="legal-section">
                <h2>Information We Collect</h2>
                <p>We collect minimal information necessary to operate this civic platform effectively:</p>
                
                <h3>Information You Provide Voluntarily</h3>
                <ul className="legal-list">
                  <li>Email address (when you contact us or submit feedback)</li>
                  <li>Name (if provided in correspondence)</li>
                  <li>Message content and inquiries</li>
                </ul>

                <h3>Information Collected Automatically</h3>
                <ul className="legal-list">
                  <li>IP address (anonymized where possible)</li>
                  <li>Browser type and version</li>
                  <li>Device type and operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website or source</li>
                  <li>General geographic location (country/region level)</li>
                </ul>

                <div className="legal-note">
                  <i className="bi bi-info-circle"></i>
                  <p>We do <strong>not</strong> collect sensitive personal information such as government-issued ID numbers, financial information, health records, or biometric data through this website.</p>
                </div>
              </section>

              <section id="how-we-use" className="legal-section">
                <h2>How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul className="legal-list">
                  <li>To respond to your inquiries and feedback</li>
                  <li>To improve website functionality and user experience</li>
                  <li>To analyze website traffic and usage patterns</li>
                  <li>To ensure website security and prevent abuse</li>
                  <li>To comply with legal obligations</li>
                  <li>To maintain and improve civic services information</li>
                </ul>
              </section>

              <section id="cookies" className="legal-section">
                <h2>Cookies and Analytics</h2>
                <p>We use cookies and similar technologies to enhance your browsing experience:</p>
                
                <h3>Types of Cookies We Use</h3>
                <ul className="legal-list">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality (e.g., language preferences)</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                </ul>

                <h3>Google Analytics</h3>
                <p>We use Google Analytics to collect anonymized data about website usage. Google Analytics uses cookies to collect information such as:</p>
                <ul className="legal-list">
                  <li>Number of visitors and page views</li>
                  <li>Traffic sources and user flow</li>
                  <li>Device and browser information</li>
                  <li>Geographic location (country/city level)</li>
                </ul>

                <div className="legal-callout">
                  <h4><i className="bi bi-gear"></i> Managing Cookies</h4>
                  <ul>
                    <li>You can disable cookies through your browser settings</li>
                    <li>You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                    <li>Disabling cookies may affect some website functionality</li>
                  </ul>
                </div>
              </section>

              <section id="data-sharing" className="legal-section">
                <h2>Data Sharing and Disclosure</h2>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:</p>
                <ul className="legal-list">
                  <li><strong>Service Providers:</strong> With trusted third-party services (e.g., web hosting, analytics) that assist in operating our website, subject to confidentiality agreements</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or government authority under Philippine jurisdiction</li>
                  <li><strong>Protection of Rights:</strong> To protect the rights, property, or safety of BetterSolano.org, our users, or the public</li>
                  <li><strong>Consent:</strong> With your explicit consent for any other purpose</li>
                </ul>
              </section>

              <section id="data-security" className="legal-section">
                <h2>Data Security</h2>
                <p>We implement appropriate technical and organizational measures to protect your personal information, including:</p>
                <ul className="legal-list">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Secure hosting infrastructure</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Regular software updates and patches</li>
                </ul>
                <p>While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to maintaining industry-standard protections.</p>
              </section>

              <section id="data-retention" className="legal-section">
                <h2>Data Retention</h2>
                <p>We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy:</p>
                <ul className="legal-list">
                  <li><strong>Contact Information:</strong> Retained for the duration needed to respond to inquiries, then deleted within 1 year of last contact</li>
                  <li><strong>Analytics Data:</strong> Aggregated and anonymized data may be retained indefinitely for statistical purposes</li>
                  <li><strong>Server Logs:</strong> Automatically deleted after 90 days</li>
                </ul>
              </section>

              <section id="your-rights" className="legal-section">
                <h2>Your Rights Under the Data Privacy Act</h2>
                <p>Under the Data Privacy Act of 2012, you have the following rights regarding your personal information:</p>
                <ul className="legal-list">
                  <li><strong>Right to Be Informed:</strong> To be informed of the collection and processing of your personal data</li>
                  <li><strong>Right to Access:</strong> To request access to your personal data held by us</li>
                  <li><strong>Right to Object:</strong> To object to the processing of your personal data</li>
                  <li><strong>Right to Erasure or Blocking:</strong> To request deletion or blocking of your personal data</li>
                  <li><strong>Right to Rectification:</strong> To request correction of inaccurate or incomplete personal data</li>
                  <li><strong>Right to Data Portability:</strong> To obtain your personal data in a structured, commonly used format</li>
                  <li><strong>Right to File a Complaint:</strong> To file a complaint with the National Privacy Commission (NPC)</li>
                  <li><strong>Right to Damages:</strong> To be indemnified for damages sustained due to inaccurate, incomplete, outdated, false, unlawfully obtained, or unauthorized use of personal data</li>
                </ul>

                <div className="legal-callout">
                  <h4><i className="bi bi-person-check"></i> Exercising Your Rights</h4>
                  <p>To exercise any of these rights, please contact us at <a href="mailto:volunteer@bettersolano.org">volunteer@bettersolano.org</a>. We will respond to your request within 30 days as required by law.</p>
                </div>
              </section>

              <section id="childrens-privacy" className="legal-section">
                <h2>Children&apos;s Privacy</h2>
                <p>BetterSolano.org is a general audience website providing civic information. We do not knowingly collect personal information from children under 18 years of age without parental consent.</p>
                <p>If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at <a href="mailto:volunteer@bettersolano.org">volunteer@bettersolano.org</a>, and we will take steps to delete such information.</p>
              </section>

              <section id="third-party" className="legal-section">
                <h2>Third-Party Links</h2>
                <p>Our website may contain links to external websites, including official government portals and other resources. We are not responsible for the privacy practices or content of these third-party sites.</p>
                <p>We encourage you to review the privacy policies of any external websites you visit through links on our platform.</p>
              </section>

              <section id="changes" className="legal-section">
                <h2>Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or for other operational reasons. When we make changes:</p>
                <ul className="legal-list">
                  <li>The &quot;Last Updated&quot; date at the bottom of this page will be revised</li>
                  <li>Material changes may be announced on our website</li>
                  <li>Your continued use of the website after changes constitutes acceptance of the updated policy</li>
                </ul>
              </section>

              <section id="contact" className="legal-section">
                <h2>Contact Us</h2>
                <p>If you have questions about this Privacy Policy, wish to exercise your data privacy rights, or have concerns about how your information is handled, please contact us:</p>
                <div className="legal-contact">
                  <a href="mailto:volunteer@bettersolano.org" className="contact-link">
                    <i className="bi bi-envelope-fill"></i>
                    <span>volunteer@bettersolano.org</span>
                  </a>
                </div>
                
                <h3>National Privacy Commission</h3>
                <p>You may also file a complaint with the National Privacy Commission if you believe your data privacy rights have been violated:</p>
                <div className="legal-note">
                  <i className="bi bi-building"></i>
                  <p><strong>National Privacy Commission</strong><br />
                  3rd Floor, Core G, GSIS Headquarters Building<br />
                  Financial Center, Pasay City 1308<br />
                  Website: <a href="https://www.privacy.gov.ph" target="_blank" rel="noopener noreferrer">www.privacy.gov.ph</a></p>
                </div>

                <p className="legal-closing">Last Updated: December 2, 2025</p>
              </section>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
