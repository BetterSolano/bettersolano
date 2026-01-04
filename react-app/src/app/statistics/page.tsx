'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import {
  PopulationTrendsChart,
  PopulationDistributionChart,
  BarangayPopulationChart,
  CMCIRankingsChart,
  EconomicSectorsChart,
  KeyIndicatorsTrendChart
} from '@/components/charts/Charts';

export default function StatisticsPage() {
  useEffect(() => {
    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll, .metric-card').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <link rel="stylesheet" href="/assets/css/statistics.css" />

      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Statistics</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="stats-hero">
        <div className="container">
          <div className="stats-hero-content">
            <span className="stats-hero-badge"><i className="bi bi-bar-chart-fill"></i> Municipal Data</span>
            <h1>Municipal Statistics</h1>
            <p>Data and statistics about Solano, Nueva Vizcaya</p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="stats-metrics">
        <div className="container">
          <div className="metrics-grid">
            <div className="metric-card" data-delay="0">
              <div className="metric-icon"><i className="bi bi-people-fill"></i></div>
              <div className="metric-value">69,296</div>
              <div className="metric-label">Population</div>
              <div className="metric-source">2024 Census</div>
            </div>
            <div className="metric-card" data-delay="100">
              <div className="metric-icon"><i className="bi bi-geo-alt-fill"></i></div>
              <div className="metric-value">22</div>
              <div className="metric-label">Barangays</div>
              <div className="metric-source">Administrative Units</div>
            </div>
            <div className="metric-card" data-delay="200">
              <div className="metric-icon"><i className="bi bi-rulers"></i></div>
              <div className="metric-value">162.70</div>
              <div className="metric-label">Land Area (km²)</div>
              <div className="metric-source">Total Municipal Area</div>
            </div>
            <div className="metric-card" data-delay="300">
              <div className="metric-icon"><i className="bi bi-award-fill"></i></div>
              <div className="metric-value">1st</div>
              <div className="metric-label">Income Class</div>
              <div className="metric-source">Municipality Classification</div>
            </div>
          </div>
        </div>
      </section>

      {/* Municipal Finance */}
      <section className="stats-section stats-finance animate-on-scroll">
        <div className="container">
          <div className="section-header-minimal">
            <span className="section-tag"><i className="bi bi-cash-stack"></i> Finance</span>
            <h2>Municipal Income</h2>
            <p>Financial standing for fiscal year 2023</p>
          </div>

          <div className="finance-grid">
            <div className="finance-card finance-card-primary">
              <div className="finance-card-header">
                <i className="bi bi-graph-up-arrow"></i>
                <span>Annual Income</span>
              </div>
              <div className="finance-card-value">₱371.33M</div>
              <div className="finance-card-detail">₱371,329,918.71</div>
            </div>
            <div className="finance-card">
              <div className="finance-card-header">
                <i className="bi bi-bank"></i>
                <span>IRA Share</span>
              </div>
              <div className="finance-card-value">₱220.77M</div>
              <div className="finance-card-detail">Internal Revenue Allotment</div>
            </div>
            <div className="finance-card">
              <div className="finance-card-header">
                <i className="bi bi-pie-chart-fill"></i>
                <span>IRA Dependency</span>
              </div>
              <div className="finance-card-value">59.45%</div>
              <div className="finance-card-detail">National Tax Share</div>
            </div>
          </div>

          <div className="income-breakdown animate-on-scroll">
            <h4>Income Composition</h4>
            <div className="breakdown-bar">
              <div className="breakdown-segment breakdown-ira" style={{ width: '59.45%' }}>
                <span className="breakdown-label">IRA 59.45%</span>
              </div>
              <div className="breakdown-segment breakdown-local" style={{ width: '40.55%' }}>
                <span className="breakdown-label">Local 40.55%</span>
              </div>
            </div>
            <div className="breakdown-legend">
              <div className="legend-item"><span className="legend-dot legend-ira"></span>Internal Revenue Allotment</div>
              <div className="legend-item"><span className="legend-dot legend-local"></span>Local Sources</div>
            </div>
          </div>

          <p className="data-source"><i className="bi bi-info-circle"></i> Source: <a href="https://blgf.gov.ph/" target="_blank" rel="noopener noreferrer">Bureau of Local Government Finance (BLGF)</a> – 2023 SRE Data</p>
        </div>
      </section>

      {/* Population Trends */}
      <section className="stats-section stats-trends animate-on-scroll">
        <div className="container">
          <div className="section-header-minimal">
            <span className="section-tag"><i className="bi bi-graph-up"></i> Growth</span>
            <h2>Population Trends</h2>
            <p>Historical growth from 1990 to 2024</p>
          </div>

          <div className="trends-summary">
            <div className="trend-stat">
              <span className="trend-stat-label">1990</span>
              <span className="trend-stat-value">38,006</span>
            </div>
            <div className="trend-arrow"><i className="bi bi-arrow-right"></i></div>
            <div className="trend-stat trend-stat-current">
              <span className="trend-stat-label">2024</span>
              <span className="trend-stat-value">69,296</span>
            </div>
            <div className="trend-stat trend-stat-growth">
              <span className="trend-stat-label">Growth</span>
              <span className="trend-stat-value">+82.3%</span>
            </div>
          </div>

          <div className="chart-wrapper">
            <PopulationTrendsChart />
          </div>

          <p className="data-source"><i className="bi bi-info-circle"></i> Source: <a href="https://psa.gov.ph/" target="_blank" rel="noopener noreferrer">Philippine Statistics Authority (PSA)</a></p>
        </div>
      </section>

      {/* Population Distribution */}
      <section className="stats-section stats-distribution animate-on-scroll">
        <div className="container">
          <div className="section-header-minimal">
            <span className="section-tag"><i className="bi bi-pie-chart-fill"></i> Distribution</span>
            <h2>Population by Barangay</h2>
            <p>2024 Census of Population</p>
          </div>

          <div className="distribution-layout">
            <div className="distribution-chart">
              <PopulationDistributionChart />
            </div>
            <div className="distribution-list">
              <div className="barangay-row" data-rank="1"><span className="rank">#1</span><span className="name">Roxas</span><div className="bar-wrap"><div className="bar" style={{ width: '100%' }}></div></div><span className="pop">9,088</span></div>
              <div className="barangay-row" data-rank="2"><span className="rank">#2</span><span className="name">Quirino</span><div className="bar-wrap"><div className="bar" style={{ width: '72%' }}></div></div><span className="pop">6,572</span></div>
              <div className="barangay-row" data-rank="3"><span className="rank">#3</span><span className="name">Osmeña</span><div className="bar-wrap"><div className="bar" style={{ width: '70%' }}></div></div><span className="pop">6,403</span></div>
              <div className="barangay-row"><span className="rank">#4</span><span className="name">Quezon</span><div className="bar-wrap"><div className="bar" style={{ width: '63%' }}></div></div><span className="pop">5,758</span></div>
              <div className="barangay-row"><span className="rank">#5</span><span className="name">Curifang</span><div className="bar-wrap"><div className="bar" style={{ width: '54%' }}></div></div><span className="pop">4,885</span></div>
              <div className="barangay-row"><span className="rank">#6</span><span className="name">Bagahabag</span><div className="bar-wrap"><div className="bar" style={{ width: '52%' }}></div></div><span className="pop">4,731</span></div>
              <div className="barangay-row"><span className="rank">#7</span><span className="name">Uddiawan</span><div className="bar-wrap"><div className="bar" style={{ width: '46%' }}></div></div><span className="pop">4,217</span></div>
              <div className="barangay-row"><span className="rank">#8</span><span className="name">Bascaran</span><div className="bar-wrap"><div className="bar" style={{ width: '42%' }}></div></div><span className="pop">3,845</span></div>
              <div className="barangay-row"><span className="rank">#9</span><span className="name">Aggub</span><div className="bar-wrap"><div className="bar" style={{ width: '34%' }}></div></div><span className="pop">3,101</span></div>
              <div className="barangay-row"><span className="rank">#10</span><span className="name">San Luis</span><div className="bar-wrap"><div className="bar" style={{ width: '29%' }}></div></div><span className="pop">2,668</span></div>
            </div>
          </div>

          <details className="more-barangays">
            <summary>View all 22 barangays</summary>
            <div className="distribution-list distribution-list-full">
              <div className="barangay-row"><span className="rank">#11</span><span className="name">Communal</span><div className="bar-wrap"><div className="bar" style={{ width: '28%' }}></div></div><span className="pop">2,586</span></div>
              <div className="barangay-row"><span className="rank">#12</span><span className="name">Lactawan</span><div className="bar-wrap"><div className="bar" style={{ width: '23%' }}></div></div><span className="pop">2,109</span></div>
              <div className="barangay-row"><span className="rank">#13</span><span className="name">San Juan</span><div className="bar-wrap"><div className="bar" style={{ width: '22%' }}></div></div><span className="pop">1,965</span></div>
              <div className="barangay-row"><span className="rank">#14</span><span className="name">Concepcion</span><div className="bar-wrap"><div className="bar" style={{ width: '21%' }}></div></div><span className="pop">1,954</span></div>
              <div className="barangay-row"><span className="rank">#15</span><span className="name">Dadap</span><div className="bar-wrap"><div className="bar" style={{ width: '15%' }}></div></div><span className="pop">1,409</span></div>
              <div className="barangay-row"><span className="rank">#16</span><span className="name">Wacal</span><div className="bar-wrap"><div className="bar" style={{ width: '15%' }}></div></div><span className="pop">1,398</span></div>
              <div className="barangay-row"><span className="rank">#17</span><span className="name">Bangaan</span><div className="bar-wrap"><div className="bar" style={{ width: '14%' }}></div></div><span className="pop">1,284</span></div>
              <div className="barangay-row"><span className="rank">#18</span><span className="name">Tucal</span><div className="bar-wrap"><div className="bar" style={{ width: '14%' }}></div></div><span className="pop">1,244</span></div>
              <div className="barangay-row"><span className="rank">#19</span><span className="name">Bangar</span><div className="bar-wrap"><div className="bar" style={{ width: '13%' }}></div></div><span className="pop">1,146</span></div>
              <div className="barangay-row"><span className="rank">#20</span><span className="name">Pilar D. Galima</span><div className="bar-wrap"><div className="bar" style={{ width: '13%' }}></div></div><span className="pop">1,146</span></div>
              <div className="barangay-row"><span className="rank">#21</span><span className="name">Poblacion North</span><div className="bar-wrap"><div className="bar" style={{ width: '11%' }}></div></div><span className="pop">970</span></div>
              <div className="barangay-row"><span className="rank">#22</span><span className="name">Poblacion South</span><div className="bar-wrap"><div className="bar" style={{ width: '9%' }}></div></div><span className="pop">817</span></div>
            </div>
          </details>

          <p className="data-source"><i className="bi bi-info-circle"></i> Source: <a href="https://psa.gov.ph/" target="_blank" rel="noopener noreferrer">Philippine Statistics Authority (PSA)</a> - 2024 Census</p>
        </div>
      </section>

      {/* Economic Indicators */}
      <section className="stats-section stats-economy animate-on-scroll">
        <div className="container">
          <div className="section-header-minimal">
            <span className="section-tag"><i className="bi bi-briefcase-fill"></i> Economy</span>
            <h2>Economic Indicators</h2>
            <p>Key economic data and business statistics</p>
          </div>

          <div className="economy-grid">
            <div className="economy-card">
              <div className="economy-icon"><i className="bi bi-shop"></i></div>
              <div className="economy-content">
                <div className="economy-value">1,200</div>
                <div className="economy-label">Registered Businesses</div>
                <div className="economy-trend"><i className="bi bi-arrow-up"></i> +8% from last year</div>
              </div>
            </div>
            <div className="economy-card">
              <div className="economy-icon"><i className="bi bi-tree-fill"></i></div>
              <div className="economy-content">
                <div className="economy-value">8,500 ha</div>
                <div className="economy-label">Agricultural Land</div>
                <div className="economy-trend">Rice &amp; Corn Production</div>
              </div>
            </div>
            <div className="economy-card">
              <div className="economy-icon"><i className="bi bi-person-check-fill"></i></div>
              <div className="economy-content">
                <div className="economy-value">94.2%</div>
                <div className="economy-label">Employment Rate</div>
                <div className="economy-trend">Labor Force Participation</div>
              </div>
            </div>
          </div>

          <div className="sectors-chart animate-on-scroll">
            <h4>Economic Sectors</h4>
            <div className="sector-bars">
              <div className="sector-item">
                <div className="sector-info"><span className="sector-name">Agriculture</span><span className="sector-pct">45%</span></div>
                <div className="sector-bar-bg"><div className="sector-bar" style={{ width: '45%' }}></div></div>
              </div>
              <div className="sector-item">
                <div className="sector-info"><span className="sector-name">Trade &amp; Commerce</span><span className="sector-pct">30%</span></div>
                <div className="sector-bar-bg"><div className="sector-bar" style={{ width: '30%' }}></div></div>
              </div>
              <div className="sector-item">
                <div className="sector-info"><span className="sector-name">Services</span><span className="sector-pct">20%</span></div>
                <div className="sector-bar-bg"><div className="sector-bar" style={{ width: '20%' }}></div></div>
              </div>
              <div className="sector-item">
                <div className="sector-info"><span className="sector-name">Industry</span><span className="sector-pct">5%</span></div>
                <div className="sector-bar-bg"><div className="sector-bar" style={{ width: '5%' }}></div></div>
              </div>
            </div>
          </div>

          <p className="data-source"><i className="bi bi-info-circle"></i> Source: <a href="https://blgf.gov.ph/" target="_blank" rel="noopener noreferrer">Bureau of Local Government Finance (BLGF)</a> - 2023</p>
        </div>
      </section>

      {/* Poverty Statistics */}
      <section className="stats-section stats-poverty animate-on-scroll">
        <div className="container">
          <div className="section-header-minimal">
            <span className="section-tag"><i className="bi bi-graph-down-arrow"></i> Poverty</span>
            <h2>Poverty Statistics</h2>
            <p>2021 City and Municipal Level Poverty Estimates</p>
          </div>

          <div className="poverty-comparison">
            <div className="poverty-card poverty-card-2018">
              <span className="poverty-year">2018</span>
              <div className="poverty-rate">
                <span className="rate-value">7.0</span>
                <span className="rate-symbol">%</span>
              </div>
              <div className="poverty-bar"><div className="poverty-fill" style={{ width: '7%' }}></div></div>
              <span className="poverty-ci">90% CI: 4.7% - 9.2%</span>
            </div>
            <div className="poverty-arrow">
              <i className="bi bi-arrow-right"></i>
              <span className="poverty-change">-0.6%</span>
            </div>
            <div className="poverty-card poverty-card-2021">
              <span className="poverty-year">2021</span>
              <div className="poverty-rate">
                <span className="rate-value">6.4</span>
                <span className="rate-symbol">%</span>
              </div>
              <div className="poverty-bar"><div className="poverty-fill" style={{ width: '6.4%' }}></div></div>
              <span className="poverty-ci">90% CI: 4.7% - 8.1%</span>
              <span className="poverty-badge"><i className="bi bi-check-circle-fill"></i> Improved</span>
            </div>
          </div>

          <p className="data-source"><i className="bi bi-info-circle"></i> Source: <a href="https://psa.gov.ph/" target="_blank" rel="noopener noreferrer">Philippine Statistics Authority (PSA)</a> - 2021 Poverty Estimates</p>
        </div>
      </section>

      {/* Competitive Index Section */}
      <section className="stats-section stats-competitive animate-on-scroll" id="competitive-index">
        <div className="container">
          <div className="section-header-minimal">
            <span className="section-tag"><i className="bi bi-trophy-fill"></i> Competitiveness</span>
            <h2>Solano Competitive Index</h2>
            <p>Cities and Municipalities Competitiveness Index (CMCI) Performance 2016-2024</p>
          </div>

          {/* Pillar Selection Tabs */}
          <div className="cmci-tabs">
            <button type="button" className="cmci-tab active" data-pillar="overview"><i className="bi bi-grid-3x3-gap"></i> Overview</button>
            <button type="button" className="cmci-tab" data-pillar="economic-dynamism"><i className="bi bi-graph-up-arrow"></i> Economic Dynamism</button>
            <button type="button" className="cmci-tab" data-pillar="government-efficiency"><i className="bi bi-building-check"></i> Government Efficiency</button>
            <button type="button" className="cmci-tab" data-pillar="infrastructure"><i className="bi bi-building-gear"></i> Infrastructure</button>
            <button type="button" className="cmci-tab" data-pillar="resiliency"><i className="bi bi-shield-check"></i> Resiliency</button>
            <button type="button" className="cmci-tab" data-pillar="innovation"><i className="bi bi-lightbulb"></i> Innovation</button>
          </div>

          {/* Overview Grid */}
          <div className="cmci-overview-grid">
            <div className="cmci-pillar-card">
              <div className="pillar-icon"><i className="bi bi-graph-up-arrow"></i></div>
              <h4>Economic Dynamism</h4>
              <div className="pillar-score">0.23</div>
              <div className="pillar-trend trend-up"><i className="bi bi-arrow-up"></i> +12%</div>
            </div>
            <div className="cmci-pillar-card">
              <div className="pillar-icon"><i className="bi bi-building-check"></i></div>
              <h4>Government Efficiency</h4>
              <div className="pillar-score">1.17</div>
              <div className="pillar-trend trend-down"><i className="bi bi-arrow-down"></i> -8%</div>
            </div>
            <div className="cmci-pillar-card">
              <div className="pillar-icon"><i className="bi bi-building-gear"></i></div>
              <h4>Infrastructure</h4>
              <div className="pillar-score">0.40</div>
              <div className="pillar-trend trend-up"><i className="bi bi-arrow-up"></i> +5%</div>
            </div>
            <div className="cmci-pillar-card">
              <div className="pillar-icon"><i className="bi bi-shield-check"></i></div>
              <h4>Resiliency</h4>
              <div className="pillar-score">1.08</div>
              <div className="pillar-trend trend-stable"><i className="bi bi-dash"></i> Stable</div>
            </div>
            <div className="cmci-pillar-card">
              <div className="pillar-icon"><i className="bi bi-lightbulb"></i></div>
              <h4>Innovation</h4>
              <div className="pillar-score">0.68</div>
              <div className="pillar-trend trend-up"><i className="bi bi-arrow-up"></i> +25%</div>
            </div>
          </div>

          {/* Key Indicators Trend Chart */}
          <div className="cmci-chart-container">
            <h4><i className="bi bi-bar-chart-line"></i> Key Indicators Trend (2016-2024)</h4>
            <div className="chart-wrapper">
              <KeyIndicatorsTrendChart />
            </div>
          </div>

          <p className="data-source"><i className="bi bi-info-circle"></i> Source: <a href="https://cmci.dti.gov.ph/" target="_blank" rel="noopener noreferrer">DTI Cities and Municipalities Competitiveness Index (CMCI)</a></p>
        </div>
      </section>

      {/* Bar Chart Section */}
      <section className="stats-section stats-barchart animate-on-scroll">
        <div className="container">
          <div className="section-header-minimal">
            <span className="section-tag"><i className="bi bi-bar-chart-fill"></i> Visual</span>
            <h2>Population Bar Chart</h2>
            <p>Comparative view of all 22 barangays</p>
          </div>

          <div className="chart-wrapper chart-wrapper-bar">
            <BarangayPopulationChart />
          </div>

          <p className="data-source"><i className="bi bi-info-circle"></i> Source: <a href="https://psa.gov.ph/" target="_blank" rel="noopener noreferrer">Philippine Statistics Authority (PSA)</a> - 2024 Census</p>
        </div>
      </section>
    </>
  );
}
