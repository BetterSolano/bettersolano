'use client';

import {
    IncomeSourcesChart,
    ExpenditureChart,
} from '@/components/charts/Charts';

export function IncomeChartSection() {
    return (
        <div className="sre-chart-container" style={{ marginBottom: '20px' }}>
            <IncomeSourcesChart />
        </div>
    );
}

export function ExpenditureChartSection() {
    return (
        <div className="sre-chart-container" style={{ marginBottom: '20px' }}>
            <ExpenditureChart />
        </div>
    );
}
