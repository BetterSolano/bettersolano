'use client';

import {
    PopulationTrendsChart,
    PopulationDistributionChart,
    CMCIRankingsChart,
    BarangayPopulationChart,
} from '@/components/charts/Charts';

export function PopulationTrendsSection() {
    return (
        <div className="chart-wrapper" style={{ background: '#fff', borderRadius: '12px', padding: '24px', marginTop: '24px', border: '1px solid rgba(0,0,0,0.08)' }}>
            <PopulationTrendsChart />
        </div>
    );
}

export function PopulationDistributionSection() {
    return (
        <div className="chart-wrapper" style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div style={{ flex: '0 0 320px' }}>
                <PopulationDistributionChart />
            </div>
            <div style={{ flex: 1 }}>
                <BarangayPopulationChart />
            </div>
        </div>
    );
}

export function CMCISection() {
    return (
        <div className="chart-wrapper" style={{ background: '#fff', borderRadius: '12px', padding: '24px', marginTop: '24px', border: '1px solid rgba(0,0,0,0.08)' }}>
            <CMCIRankingsChart />
        </div>
    );
}
