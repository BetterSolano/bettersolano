'use client';

import { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line, Pie, Doughnut, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

// Population Trends Line Chart
export function PopulationTrendsChart() {
    const data = {
        labels: ['1990', '1995', '2000', '2007', '2010', '2015', '2020', '2024'],
        datasets: [
            {
                label: 'Population',
                data: [38006, 42857, 47288, 53004, 56831, 62649, 65896, 69296],
                borderColor: '#0032a0',
                backgroundColor: 'rgba(0, 50, 160, 0.12)',
                fill: true,
                tension: 0.35,
                pointBackgroundColor: '#0032a0',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 2.5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 50, 160, 0.92)',
                titleFont: { size: 13, weight: 'bold' as const },
                bodyFont: { size: 12 },
                padding: 10,
                cornerRadius: 6,
                displayColors: false,
                callbacks: {
                    label: (context: any) => `Population: ${context.raw.toLocaleString()}`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                min: 30000,
                ticks: {
                    callback: (value: any) => `${(value / 1000).toFixed(0)}K`,
                    font: { size: 11 },
                    color: '#666',
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.04)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: { size: 11, weight: 'bold' as const },
                    color: '#666',
                },
            },
        },
    };

    return (
        <div className="chart-container-full">
            <Line data={data} options={options} />
        </div>
    );
}

// Population Distribution Pie Chart
export function PopulationDistributionChart() {
    const data = {
        labels: ['Roxas', 'Quirino', 'Osmeña', 'Quezon', 'Curifang', 'Bagahabag', 'Uddiawan', 'Bascaran', 'Aggub', 'San Luis'],
        datasets: [
            {
                data: [9088, 6572, 6403, 5758, 4885, 4731, 4217, 3845, 3101, 2668],
                backgroundColor: [
                    '#0032a0',
                    '#F77F00',
                    '#06A77D',
                    '#0077BE',
                    '#8B5CF6',
                    '#EC4899',
                    '#14B8A6',
                    '#F59E0B',
                    '#6366F1',
                    '#003D82',
                ],
                borderColor: '#fff',
                borderWidth: 2,
                hoverBorderWidth: 2,
                hoverOffset: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '58%',
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    padding: 10,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxWidth: 12,
                    font: { size: 11 },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 50, 160, 0.92)',
                titleFont: { size: 13, weight: 'bold' as const },
                bodyFont: { size: 12 },
                padding: 10,
                cornerRadius: 6,
                callbacks: {
                    label: (context: any) => {
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const pct = ((context.raw / total) * 100).toFixed(1);
                        return `${context.raw.toLocaleString()} (${pct}%)`;
                    },
                },
            },
        },
    };

    return (
        <div className="chart-container-full">
            <Doughnut data={data} options={options} />
        </div>
    );
}

// Income Sources Doughnut Chart
export function IncomeSourcesChart({
    localValue = 88.85,
    externalValue = 69.62,
    totalIncome = 158.47
}: {
    localValue?: number;
    externalValue?: number;
    totalIncome?: number;
}) {
    const data = {
        labels: ['Local Sources', 'External Sources (NTA)'],
        datasets: [
            {
                data: [localValue, externalValue],
                backgroundColor: ['#10b981', '#0ea5e9'],
                borderColor: '#fff',
                borderWidth: 2,
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 50, 160, 0.92)',
                titleFont: { size: 12, weight: 'bold' as const },
                bodyFont: { size: 11 },
                padding: 8,
                cornerRadius: 5,
                callbacks: {
                    label: (context: any) => `₱${context.raw.toFixed(2)}M (${((context.raw / totalIncome) * 100).toFixed(1)}%)`,
                },
            },
        },
    };

    return (
        <div className="chart-container-doughnut" style={{ height: '160px', width: '100%', position: 'relative' }}>
            <Doughnut data={data} options={options} />
            <div className="chart-center-label">
                <div className="chart-center-value">₱{totalIncome.toFixed(2)}M</div>
                <div className="chart-center-text">Total Income</div>
            </div>
        </div>
    );
}

// Expenditure Allocation Doughnut Chart
export function ExpenditureChart({
    gpsValue = 42.76,
    socialValue = 13.33,
    economicValue = 11.07,
    debtValue = 0.35,
    totalExpense = 67.51
}: {
    gpsValue?: number;
    socialValue?: number;
    economicValue?: number;
    debtValue?: number;
    totalExpense?: number;
}) {
    const data = {
        labels: ['General Public Services', 'Social Services', 'Economic Services', 'Debt Service'],
        datasets: [
            {
                data: [gpsValue, socialValue, economicValue, debtValue],
                backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
                borderColor: '#fff',
                borderWidth: 2,
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 50, 160, 0.92)',
                titleFont: { size: 12, weight: 'bold' as const },
                bodyFont: { size: 11 },
                padding: 8,
                cornerRadius: 5,
                callbacks: {
                    label: (context: any) => `₱${context.raw.toFixed(2)}M (${((context.raw / totalExpense) * 100).toFixed(1)}%)`,
                },
            },
        },
    };

    return (
        <div className="chart-container-doughnut" style={{ height: '160px', width: '100%', position: 'relative' }}>
            <Doughnut data={data} options={options} />
            <div className="chart-center-label">
                <div className="chart-center-value">₱{totalExpense.toFixed(2)}M</div>
                <div className="chart-center-text">Total Expenses</div>
            </div>
        </div>
    );
}

// CMCI Rankings Line Chart
export function CMCIRankingsChart() {
    const data = {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Overall Rank',
                data: [85, 72, 65, 58, 52, 45, 40, 38, 35],
                borderColor: '#0032a0',
                backgroundColor: 'rgba(0, 50, 160, 0.1)',
                fill: true,
                tension: 0.35,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 50, 160, 0.92)',
                titleFont: { size: 12, weight: 'bold' as const },
                bodyFont: { size: 11 },
                padding: 8,
                cornerRadius: 5,
            },
        },
        scales: {
            y: {
                reverse: true,
                beginAtZero: false,
                min: 0,
                max: 100,
                ticks: {
                    callback: (value: any) => `#${value}`,
                    font: { size: 10 },
                    color: '#666',
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.04)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: { size: 10 },
                    color: '#666',
                },
            },
        },
    };

    return (
        <div className="chart-container-medium">
            <Line data={data} options={options} />
        </div>
    );
}

// Key Indicators Trend Line Chart (2016-2024)
export function KeyIndicatorsTrendChart() {
    const data = {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Health',
                data: [2.40, 0.70, 0.45, 0.35, 0.35, 0.40, 0.38, 0.35, 0.32],
                borderColor: '#0032a0',
                backgroundColor: '#0032a0',
                tension: 0.35,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2,
            },
            {
                label: 'Education',
                data: [0.65, 0.32, 0.28, 0.25, 0.18, 0.15, 0.12, 0.10, 0.08],
                borderColor: '#f59e0b',
                backgroundColor: '#f59e0b',
                tension: 0.35,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2,
            },
            {
                label: 'Social Protection',
                data: [0.25, 0.28, 0.22, 0.05, 0.28, 0.35, 0.30, 0.22, 0.18],
                borderColor: '#10b981',
                backgroundColor: '#10b981',
                tension: 0.35,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2,
            },
            {
                label: 'Peace & Order',
                data: [0.12, 0.35, 0.55, 0.42, 0.38, 0.42, 0.40, 0.38, 0.35],
                borderColor: '#0ea5e9',
                backgroundColor: '#0ea5e9',
                tension: 0.35,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2,
            },
            {
                label: 'LGU Investment',
                data: [0.08, 0.15, 0.18, 0.12, 0.10, 0.15, 0.18, 0.22, 0.25],
                borderColor: '#8b5cf6',
                backgroundColor: '#8b5cf6',
                tension: 0.35,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 15,
                    font: { size: 11 },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 50, 160, 0.92)',
                titleFont: { size: 12, weight: 'bold' as const },
                bodyFont: { size: 11 },
                padding: 10,
                cornerRadius: 6,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 2.5,
                ticks: {
                    font: { size: 10 },
                    color: '#666',
                    stepSize: 0.5,
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.04)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: { size: 10 },
                    color: '#666',
                },
            },
        },
    };

    return (
        <div className="chart-container-full" style={{ height: '320px' }}>
            <Line data={data} options={options} />
        </div>
    );
}

// Barangay Population Horizontal Bar Chart
export function BarangayPopulationChart() {
    const barangayData = [
        { name: 'Roxas', pop: 9088 },
        { name: 'Quirino', pop: 6572 },
        { name: 'Osmeña', pop: 6403 },
        { name: 'Quezon', pop: 5758 },
        { name: 'Curifang', pop: 4885 },
        { name: 'Bagahabag', pop: 4731 },
        { name: 'Uddiawan', pop: 4217 },
        { name: 'Bascaran', pop: 3845 },
        { name: 'Aggub', pop: 3101 },
        { name: 'San Luis', pop: 2668 },
    ];

    const data = {
        labels: barangayData.map(d => d.name),
        datasets: [
            {
                label: 'Population',
                data: barangayData.map(d => d.pop),
                backgroundColor: barangayData.map((_, i) => {
                    const opacity = 1 - (i * 0.07);
                    return `rgba(0, 50, 160, ${opacity})`;
                }),
                borderRadius: 3,
                barThickness: 16,
            },
        ],
    };

    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 50, 160, 0.92)',
                titleFont: { size: 12, weight: 'bold' as const },
                bodyFont: { size: 11 },
                padding: 8,
                cornerRadius: 5,
                displayColors: false,
                callbacks: {
                    label: (context: any) => `Population: ${context.raw.toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.04)',
                },
                ticks: {
                    callback: (value: any) => `${(value / 1000).toFixed(0)}K`,
                    font: { size: 10 },
                    color: '#666',
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: { size: 10, weight: 'bold' as const },
                    color: '#444',
                },
            },
        },
    };

    return (
        <div className="chart-container-bar">
            <Bar data={data} options={options} />
        </div>
    );
}

// Economic Sectors Bar Chart
export function EconomicSectorsChart() {
    const data = {
        labels: ['Agriculture', 'Trade & Commerce', 'Services', 'Industry'],
        datasets: [
            {
                label: 'Share',
                data: [45, 30, 20, 5],
                backgroundColor: ['#0032a0', '#0077BE', '#06A77D', '#F77F00'],
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 50, 160, 0.92)',
                titleFont: { size: 12, weight: 'bold' as const },
                bodyFont: { size: 11 },
                padding: 8,
                cornerRadius: 5,
                callbacks: {
                    label: (context: any) => `${context.raw}%`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 50,
                ticks: {
                    callback: (value: any) => `${value}%`,
                    font: { size: 10 },
                    color: '#666',
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.04)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: { size: 10 },
                    color: '#666',
                },
            },
        },
    };

    return (
        <div className="chart-container-medium">
            <Bar data={data} options={options} />
        </div>
    );
}
