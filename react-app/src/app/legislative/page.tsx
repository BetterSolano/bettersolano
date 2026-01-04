'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LegislativePage() {
  const [activeTab, setActiveTab] = useState('ordinances');

  return (
    <>
      <link rel="stylesheet" href="/assets/css/legislative.css" />
      
      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Legislative</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="leg-hero">
        <div className="container">
          <div className="leg-hero-content">
            <span className="leg-hero-badge"><i className="bi bi-bank2"></i> Sangguniang Bayan</span>
            <h1>Legislative Documents</h1>
            <p>Ordinances and resolutions of the Sangguniang Bayan ng Solano</p>
          </div>
        </div>
      </section>

      {/* Document Categories */}
      <section className="leg-categories">
        <div className="container">
          <div className="leg-categories-grid">
            <Link href="/legislative/ordinance-framework" className="leg-category-card">
              <div className="leg-category-icon"><i className="bi bi-journal-bookmark-fill"></i></div>
              <div className="leg-category-content">
                <h2>Ordinance Framework</h2>
                <p>Municipal ordinances enacted by the Sangguniang Bayan — local laws that govern the municipality and its residents.</p>
                <span className="leg-category-link">Browse Ordinances <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
            <Link href="/legislative/resolution-framework" className="leg-category-card">
              <div className="leg-category-icon"><i className="bi bi-file-earmark-ruled-fill"></i></div>
              <div className="leg-category-content">
                <h2>Resolution Framework</h2>
                <p>Resolutions passed by the Sangguniang Bayan expressing the will or opinion of the legislative body on various matters.</p>
                <span className="leg-category-link">Browse Resolutions <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Legislative Process Flowchart Section */}
      <section className="leg-process">
        <div className="container">
          <div className="leg-process-header">
            <span className="leg-info-tag"><i className="bi bi-diagram-3-fill"></i> Process Flow</span>
            <h2>Flowchart for Legislative Proposal</h2>
            <p>Step-by-step process for enacting ordinances and resolutions</p>
          </div>

          {/* Process Tabs */}
          <div className="leg-process-tabs">
            <button
              type="button"
              className={`leg-tab-btn ${activeTab === 'ordinances' ? 'active' : ''}`}
              onClick={() => setActiveTab('ordinances')}
            >
              <i className="bi bi-journal-bookmark-fill"></i>
              <span>For Ordinances</span>
              <small>11 Steps</small>
            </button>
            <button
              type="button"
              className={`leg-tab-btn ${activeTab === 'resolutions' ? 'active' : ''}`}
              onClick={() => setActiveTab('resolutions')}
            >
              <i className="bi bi-file-earmark-ruled-fill"></i>
              <span>For Resolutions</span>
              <small>6 Steps</small>
            </button>
          </div>

          {/* Ordinances Process Flow */}
          {activeTab === 'ordinances' && (
            <div className="leg-flow-container">
              {[
                { num: '01', icon: 'bi-file-earmark-plus', title: 'File Proposed Ordinance', desc: 'Submit the proposed ordinance to the Sangguniang Bayan for consideration' },
                { num: '02', icon: 'bi-book', title: 'First Reading / Referral to Committee', desc: 'Initial reading and assignment to the relevant committee for review' },
                { num: '03', icon: 'bi-people', title: 'Public Hearing / Committee Action', desc: 'Committee conducts public hearing and deliberates on the proposed ordinance' },
                { num: '04', icon: 'bi-file-text', title: 'Committee Report', desc: 'Committee submits findings and recommendations to the Sangguniang Bayan' },
                { num: '05', icon: 'bi-journal-text', title: 'Second Reading', desc: 'Detailed discussion and debate on the proposed ordinance' },
                { num: '06', icon: 'bi-check2-square', title: 'Third and Final Reading', desc: 'Final voting on the proposed ordinance by the Sangguniang Bayan' },
                { num: '07', icon: 'bi-calendar-check', title: "10-Day Mayor's Approval", desc: 'Mayor reviews and approves the enacted ordinance within 10 days' },
                { num: '08', icon: 'bi-send', title: '3-Day Submission to SP', desc: 'Submit approved ordinance to Sangguniang Panlalawigan for review within 3 days' },
                { num: '09', icon: 'bi-hourglass-split', title: 'SP Review Period', desc: '60-day review for appropriation ordinances; 30-day review for others' },
                { num: '10', icon: 'bi-megaphone', title: 'Posting / Publication', desc: 'Public posting and publication of the approved ordinance' },
                { num: '11', icon: 'bi-rocket-takeoff', title: 'Implementation', desc: 'Ordinance takes effect and is enforced within the municipality', final: true },
              ].map((step) => (
                <div key={step.num} className={`leg-flow-step ${step.final ? 'leg-flow-final' : ''}`}>
                  <div className={`leg-flow-card ${step.final ? 'leg-flow-card-final' : ''}`}>
                    <div className="leg-flow-number">{step.num}</div>
                    <div className="leg-flow-icon"><i className={`bi ${step.icon}`}></i></div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Resolutions Process Flow */}
          {activeTab === 'resolutions' && (
            <div className="leg-flow-container">
              {[
                { num: '01', icon: 'bi-file-earmark-plus', title: 'File Proposed Resolution', desc: 'Submit the proposed resolution to the Sangguniang Bayan' },
                { num: '02', icon: 'bi-calendar-event', title: 'Inclusion in Session Agenda', desc: 'Resolution is scheduled for inclusion in the Sangguniang Bayan session' },
                { num: '03', icon: 'bi-people-fill', title: 'Committee Meeting / Approval', desc: 'Committee reviews and approves the proposed resolution' },
                { num: '04', icon: 'bi-printer', title: 'Final Draft Printing', desc: 'Legislative staff prepares and prints the final draft of the resolution' },
                { num: '05', icon: 'bi-pen', title: 'Official Signing', desc: 'Secretary to the Sanggunian and Presiding Officer sign the resolution' },
                { num: '06', icon: 'bi-send-check', title: 'Posting / Transmittal', desc: 'Resolution is posted publicly and transmitted to concerned parties', final: true },
              ].map((step) => (
                <div key={step.num} className={`leg-flow-step ${step.final ? 'leg-flow-final' : ''}`}>
                  <div className={`leg-flow-card ${step.final ? 'leg-flow-card-final' : ''}`}>
                    <div className="leg-flow-number">{step.num}</div>
                    <div className="leg-flow-icon"><i className={`bi ${step.icon}`}></i></div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="leg-info">
        <div className="container">
          <div className="leg-info-content">
            <div className="leg-info-header">
              <span className="leg-info-tag"><i className="bi bi-info-circle-fill"></i> About</span>
              <h2>Understanding Local Legislation</h2>
              <p>Learn about the legislative process of the Sangguniang Bayan</p>
            </div>
            <div className="leg-info-cards">
              <div className="leg-info-card">
                <div className="leg-info-card-icon"><i className="bi bi-journal-bookmark"></i></div>
                <h3>Ordinances</h3>
                <p>Local laws with permanent and general application that require compliance from residents and businesses within the municipality.</p>
              </div>
              <div className="leg-info-card">
                <div className="leg-info-card-icon"><i className="bi bi-file-earmark-text"></i></div>
                <h3>Resolutions</h3>
                <p>Expressions of the legislative body&apos;s will or opinion on specific matters, often used for commendations, requests, or policy positions.</p>
              </div>
              <div className="leg-info-card">
                <div className="leg-info-card-icon"><i className="bi bi-people"></i></div>
                <h3>Public Participation</h3>
                <p>Citizens can attend Sangguniang Bayan sessions and participate in public hearings for proposed ordinances.</p>
              </div>
              <div className="leg-info-card">
                <div className="leg-info-card-icon"><i className="bi bi-shield-check"></i></div>
                <h3>Transparency</h3>
                <p>All enacted ordinances and resolutions are made available to the public as part of our commitment to open governance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
