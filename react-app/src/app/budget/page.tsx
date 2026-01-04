'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { IncomeSourcesChart, ExpenditureChart } from '@/components/charts/Charts';

// Budget data for Q1 and Q2
const budgetData = {
  q1: {
    totalIncome: '₱158.47 M',
    totalExpense: '₱67.51 M',
    netIncome: '₱90.96 M',
    fundBalance: '₱283.29 M',
    income: {
      local: { amount: '₱88.85 M', pct: '56.1%', value: 88.85 },
      external: { amount: '₱69.62 M', pct: '43.9%', value: 69.62 }
    },
    expenditure: {
      gps: { amount: '₱42.76 M', pct: '63.3%', value: 42.76 },
      social: { amount: '₱13.33 M', pct: '19.7%', value: 13.33 },
      economic: { amount: '₱11.07 M', pct: '16.4%', value: 11.07 },
      debt: { amount: '₱0.35 M', pct: '0.5%', value: 0.35 }
    },
    totalIncomeValue: 158.47,
    totalExpenseValue: 67.51
  },
  q2: {
    totalIncome: '₱172.34 M',
    totalExpense: '₱78.92 M',
    netIncome: '₱93.42 M',
    fundBalance: '₱376.71 M',
    income: {
      local: { amount: '₱95.28 M', pct: '55.3%', value: 95.28 },
      external: { amount: '₱77.06 M', pct: '44.7%', value: 77.06 }
    },
    expenditure: {
      gps: { amount: '₱48.15 M', pct: '61.0%', value: 48.15 },
      social: { amount: '₱16.82 M', pct: '21.3%', value: 16.82 },
      economic: { amount: '₱13.16 M', pct: '16.7%', value: 13.16 },
      debt: { amount: '₱0.79 M', pct: '1.0%', value: 0.79 }
    },
    totalIncomeValue: 172.34,
    totalExpenseValue: 78.92
  }
};

export default function BudgetPage() {
  const [activeQuarter, setActiveQuarter] = useState<'q1' | 'q2'>('q1');
  const currentData = budgetData[activeQuarter];

  useEffect(() => {
    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <link rel="stylesheet" href="/assets/css/transparency-v2.css" />
      
      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Budget &amp; Transparency</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="trans-hero-v2">
        <div className="container">
          <div className="trans-hero-content-v2">
            <span className="trans-hero-badge-v2"><i className="bi bi-shield-check"></i> Financial Transparency</span>
            <h1>Budget &amp; Financial Transparency</h1>
            <p>Tracking municipal finances and projects for accountability</p>
          </div>
        </div>
      </section>

      {/* SRE Section */}
      <section className="sre-section-v2 animate-on-scroll">
        <div className="container">
          <div className="sre-header-v2">
            <div className="sre-title-group">
              <span className="sre-label"><i className="bi bi-graph-up-arrow"></i> Financial Report</span>
              <h2>Statement of Receipts &amp; Expenditures</h2>
              <p>FY 2025 quarterly financial performance</p>
            </div>
            <div className="sre-period-toggle" aria-label="Select fiscal quarter">
              <button 
                type="button" 
                className={`sre-period-btn ${activeQuarter === 'q1' ? 'active' : ''}`}
                onClick={() => setActiveQuarter('q1')}
              >
                <span className="sre-period-q">Q1</span>
                <span className="sre-period-range">Jan - Mar</span>
              </button>
              <button 
                type="button" 
                className={`sre-period-btn ${activeQuarter === 'q2' ? 'active' : ''}`}
                onClick={() => setActiveQuarter('q2')}
              >
                <span className="sre-period-q">Q2</span>
                <span className="sre-period-range">Apr - Jun</span>
              </button>
            </div>
          </div>

          <div className="sre-metrics-row">
            <div className="sre-metric-card sre-metric-income">
              <div className="sre-metric-icon"><i className="bi bi-arrow-down-circle"></i></div>
              <div className="sre-metric-data">
                <span className="sre-metric-value" id="sre-total-income">{currentData.totalIncome}</span>
                <span className="sre-metric-label">Total Income</span>
              </div>
            </div>
            <div className="sre-metric-card sre-metric-expense">
              <div className="sre-metric-icon"><i className="bi bi-arrow-up-circle"></i></div>
              <div className="sre-metric-data">
                <span className="sre-metric-value" id="sre-total-expense">{currentData.totalExpense}</span>
                <span className="sre-metric-label">Total Expenditures</span>
              </div>
            </div>
            <div className="sre-metric-card sre-metric-net">
              <div className="sre-metric-icon"><i className="bi bi-plus-slash-minus"></i></div>
              <div className="sre-metric-data">
                <span className="sre-metric-value" id="sre-net-income">{currentData.netIncome}</span>
                <span className="sre-metric-label">Net Operating Income</span>
              </div>
            </div>
            <div className="sre-metric-card sre-metric-balance">
              <div className="sre-metric-icon"><i className="bi bi-wallet2"></i></div>
              <div className="sre-metric-data">
                <span className="sre-metric-value" id="sre-fund-balance">{currentData.fundBalance}</span>
                <span className="sre-metric-label">Fund Balance (End)</span>
              </div>
            </div>
          </div>

          <div className="sre-breakdown-v2">
            <div className="sre-breakdown-panel">
              <div className="sre-panel-header">
                <h3><i className="bi bi-pie-chart"></i> Income Sources</h3>
              </div>
              <div className="sre-panel-body">
                <div className="sre-chart-container">
                  <IncomeSourcesChart 
                    localValue={currentData.income.local.value} 
                    externalValue={currentData.income.external.value}
                    totalIncome={currentData.totalIncomeValue}
                  />
                </div>
                <div className="sre-breakdown-list">
                  <div className="sre-breakdown-item" data-type="local">
                    <span className="sre-item-indicator sre-indicator-local"></span>
                    <div className="sre-item-info">
                      <span className="sre-item-name">Local Sources</span>
                      <span className="sre-item-detail">Tax &amp; Non-Tax Revenue</span>
                    </div>
                    <div className="sre-item-values">
                      <span className="sre-item-amount" id="sre-income-local">{currentData.income.local.amount}</span>
                      <span className="sre-item-pct" id="sre-income-local-pct">{currentData.income.local.pct}</span>
                    </div>
                  </div>
                  <div className="sre-breakdown-item" data-type="external">
                    <span className="sre-item-indicator sre-indicator-external"></span>
                    <div className="sre-item-info">
                      <span className="sre-item-name">External Sources</span>
                      <span className="sre-item-detail">National Tax Allotment</span>
                    </div>
                    <div className="sre-item-values">
                      <span className="sre-item-amount" id="sre-income-external">{currentData.income.external.amount}</span>
                      <span className="sre-item-pct" id="sre-income-external-pct">{currentData.income.external.pct}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sre-breakdown-panel">
              <div className="sre-panel-header">
                <h3><i className="bi bi-bar-chart"></i> Expenditure Allocation</h3>
              </div>
              <div className="sre-panel-body">
                <div className="sre-chart-container">
                  <ExpenditureChart 
                    gpsValue={currentData.expenditure.gps.value}
                    socialValue={currentData.expenditure.social.value}
                    economicValue={currentData.expenditure.economic.value}
                    debtValue={currentData.expenditure.debt.value}
                    totalExpense={currentData.totalExpenseValue}
                  />
                </div>
                <div className="sre-breakdown-list">
                  <div className="sre-breakdown-item" data-type="gps">
                    <span className="sre-item-indicator sre-indicator-gps"></span>
                    <div className="sre-item-info">
                      <span className="sre-item-name">General Public Services</span>
                      <span className="sre-item-detail">Administration &amp; Operations</span>
                    </div>
                    <div className="sre-item-values">
                      <span className="sre-item-amount" id="sre-exp-gps">{currentData.expenditure.gps.amount}</span>
                      <span className="sre-item-pct" id="sre-exp-gps-pct">{currentData.expenditure.gps.pct}</span>
                    </div>
                  </div>
                  <div className="sre-breakdown-item" data-type="social">
                    <span className="sre-item-indicator sre-indicator-social"></span>
                    <div className="sre-item-info">
                      <span className="sre-item-name">Social Services</span>
                      <span className="sre-item-detail">Health, Education, Welfare</span>
                    </div>
                    <div className="sre-item-values">
                      <span className="sre-item-amount" id="sre-exp-social">{currentData.expenditure.social.amount}</span>
                      <span className="sre-item-pct" id="sre-exp-social-pct">{currentData.expenditure.social.pct}</span>
                    </div>
                  </div>
                  <div className="sre-breakdown-item" data-type="economic">
                    <span className="sre-item-indicator sre-indicator-economic"></span>
                    <div className="sre-item-info">
                      <span className="sre-item-name">Economic Services</span>
                      <span className="sre-item-detail">Infrastructure &amp; Development</span>
                    </div>
                    <div className="sre-item-values">
                      <span className="sre-item-amount" id="sre-exp-economic">{currentData.expenditure.economic.amount}</span>
                      <span className="sre-item-pct" id="sre-exp-economic-pct">{currentData.expenditure.economic.pct}</span>
                    </div>
                  </div>
                  <div className="sre-breakdown-item" data-type="debt">
                    <span className="sre-item-indicator sre-indicator-debt"></span>
                    <div className="sre-item-info">
                      <span className="sre-item-name">Debt Service</span>
                      <span className="sre-item-detail">Interest &amp; Charges</span>
                    </div>
                    <div className="sre-item-values">
                      <span className="sre-item-amount" id="sre-exp-debt">{currentData.expenditure.debt.amount}</span>
                      <span className="sre-item-pct" id="sre-exp-debt-pct">{currentData.expenditure.debt.pct}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="sre-source"><i className="bi bi-info-circle"></i> Source: <a href="https://blgf.gov.ph/" target="_blank" rel="noopener noreferrer">Bureau of Local Government Finance (BLGF)</a></p>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="infra-section-v5 animate-on-scroll">
        <div className="container">
          <div className="infra-header-v5">
            <span className="infra-label-v5"><i className="bi bi-building-gear"></i> Public Works</span>
            <h2>Infrastructure Investments</h2>
            <p>Major development projects serving the community</p>
          </div>

          <div className="infra-project-v5">
            <div className="infra-project-main">
              <div className="infra-project-tags">
                <span className="infra-tag-year">2024</span>
                <span className="infra-tag-category"><i className="bi bi-water"></i> Flood Control</span>
              </div>
              <h3>FCDS Package 5 - Magat River Flood Control</h3>
              <p className="infra-location"><i className="bi bi-geo-alt"></i> Magat River, Bagahabag Section, Solano, Nueva Vizcaya</p>
            </div>
            <div className="infra-project-details">
              <div className="infra-detail-row">
                <div className="infra-detail-col">
                  <span className="infra-detail-label">Type of Work</span>
                  <span className="infra-detail-value">Construction of Flood Mitigation Structure</span>
                </div>
                <div className="infra-detail-col">
                  <span className="infra-detail-label">Contractor</span>
                  <span className="infra-detail-value">EGB Construction Corporation</span>
                </div>
                <div className="infra-detail-col infra-detail-cost">
                  <span className="infra-detail-label">Contract Cost</span>
                  <span className="infra-detail-value">₱144,750,000</span>
                </div>
              </div>
            </div>
            <div className="infra-project-footer">
              <span className="infra-source"><i className="bi bi-info-circle"></i> Source: Sumbong sa Pangulo</span>
              <a href="https://sumbongsapangulo.ph/flood-control-map/" target="_blank" rel="noopener noreferrer" className="infra-link">
                View on Map <i className="bi bi-arrow-up-right"></i>
              </a>
            </div>
          </div>

          <div className="infra-project-v5">
            <div className="infra-project-main">
              <div className="infra-project-tags">
                <span className="infra-tag-year">2021</span>
                <span className="infra-tag-category"><i className="bi bi-water"></i> Flood Control</span>
              </div>
              <h3>Repair/Rehabilitation of Flood Control and Drainage Structure - Section 1</h3>
              <p className="infra-location"><i className="bi bi-geo-alt"></i> Magat River, Bangar Section 1, Brgy. Bangar, Solano, Nueva Vizcaya</p>
            </div>
            <div className="infra-project-details">
              <div className="infra-detail-row">
                <div className="infra-detail-col">
                  <span className="infra-detail-label">Type of Work</span>
                  <span className="infra-detail-value">Rehabilitation / Major Repair of Flood Control Structure</span>
                </div>
                <div className="infra-detail-col">
                  <span className="infra-detail-label">Contractor</span>
                  <span className="infra-detail-value">Shanley Construction</span>
                </div>
                <div className="infra-detail-col infra-detail-cost">
                  <span className="infra-detail-label">Contract Cost</span>
                  <span className="infra-detail-value">₱29,700,000</span>
                </div>
              </div>
            </div>
            <div className="infra-project-footer">
              <span className="infra-source"><i className="bi bi-info-circle"></i> Source: Sumbong sa Pangulo</span>
              <a href="https://sumbongsapangulo.ph/flood-control-map/" target="_blank" rel="noopener noreferrer" className="infra-link">
                View on Map <i className="bi bi-arrow-up-right"></i>
              </a>
            </div>
          </div>

          <div className="infra-project-v5">
            <div className="infra-project-main">
              <div className="infra-project-tags">
                <span className="infra-tag-year">2021</span>
                <span className="infra-tag-category"><i className="bi bi-water"></i> Flood Control</span>
              </div>
              <h3>Repair/Rehabilitation of Flood Control and Drainage Structure - Section 2</h3>
              <p className="infra-location"><i className="bi bi-geo-alt"></i> Magat River, Bangar Section 2, Brgy. Bangar, Solano, Nueva Vizcaya</p>
            </div>
            <div className="infra-project-details">
              <div className="infra-detail-row">
                <div className="infra-detail-col">
                  <span className="infra-detail-label">Type of Work</span>
                  <span className="infra-detail-value">Rehabilitation / Major Repair of Flood Control Structure</span>
                </div>
                <div className="infra-detail-col">
                  <span className="infra-detail-label">Contractor</span>
                  <span className="infra-detail-value">Shanley Construction</span>
                </div>
                <div className="infra-detail-col infra-detail-cost">
                  <span className="infra-detail-label">Contract Cost</span>
                  <span className="infra-detail-value">₱29,700,000</span>
                </div>
              </div>
            </div>
            <div className="infra-project-footer">
              <span className="infra-source"><i className="bi bi-info-circle"></i> Source: Sumbong sa Pangulo</span>
              <a href="https://sumbongsapangulo.ph/flood-control-map/" target="_blank" rel="noopener noreferrer" className="infra-link">
                View on Map <i className="bi bi-arrow-up-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DPWH Projects Section */}
      <section className="infra-section-v5 infra-section-alt animate-on-scroll">
        <div className="container">
          <div className="infra-header-v5">
            <span className="infra-label-v5"><i className="bi bi-building"></i> National Government Projects</span>
            <h2>DPWH Infrastructure Projects in Solano</h2>
            <p>Implementing Agency: Nueva Vizcaya District Engineering Office</p>
          </div>

          <div id="dpwh-projects-container">
            {/* DPWH projects will be loaded dynamically */}
            <p className="loading-text">Loading DPWH projects...</p>
          </div>

          <p className="sre-source dpwh-source-margin"><i className="bi bi-info-circle"></i> Source: <a href="https://transparency.dpwh.gov.ph/" target="_blank" rel="noopener noreferrer">DPWH Transparency Portal</a></p>
        </div>
      </section>

      <Script src="/assets/js/dpwh-projects.js" strategy="lazyOnload" />
    </>
  );
}
