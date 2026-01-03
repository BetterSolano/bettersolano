/**
 * Transparency Page V2 - Interactive Financial Dashboard
 * Modern, minimal design with smooth animations
 */

// Financial data for FY 2025
const FINANCIAL_DATA = {
    q1: {
        period: "Q1 2025",
        periodLabel: "Jan - Mar",
        income: {
            local: 88.85,
            external: 69.62,
            total: 158.47
        },
        expenditures: {
            gps: 42.76,
            social: 13.33,
            economic: 11.07,
            debt: 0.35,
            total: 67.51
        },
        netIncome: 90.96,
        fundBalance: 283.29
    },
    q2: {
        period: "Q2 2025",
        periodLabel: "Apr - Jun",
        income: {
            local: 114.15,
            external: 139.25,
            total: 253.40
        },
        expenditures: {
            gps: 88.31,
            social: 30.56,
            economic: 20.32,
            debt: 1.29,
            total: 140.48
        },
        netIncome: 112.92,
        fundBalance: 275.20
    }
};

// Chart instances
let incomeChart = null;
let expenditureChart = null;
let currentQuarter = 'q1';

/**
 * Format number as Philippine Peso in millions
 */
function formatPeso(value) {
    return `₱${value.toFixed(2)} M`;
}

/**
 * Calculate percentage
 */
function calcPercent(value, total) {
    return ((value / total) * 100).toFixed(1) + '%';
}

/**
 * Animate value change
 */
function animateValue(element, newValue) {
    element.classList.add('updating');
    setTimeout(() => {
        element.textContent = newValue;
        element.classList.remove('updating');
    }, 150);
}

/**
 * Update all displayed values for selected quarter
 */
function updateDisplay(quarter) {
    const data = FINANCIAL_DATA[quarter];
    
    // Update metrics
    animateValue(document.getElementById('sre-total-income'), formatPeso(data.income.total));
    animateValue(document.getElementById('sre-total-expense'), formatPeso(data.expenditures.total));
    animateValue(document.getElementById('sre-net-income'), formatPeso(data.netIncome));
    animateValue(document.getElementById('sre-fund-balance'), formatPeso(data.fundBalance));
    
    // Update income breakdown
    const incomeTotal = data.income.total;
    document.getElementById('sre-income-local').textContent = formatPeso(data.income.local);
    document.getElementById('sre-income-local-pct').textContent = calcPercent(data.income.local, incomeTotal);
    document.getElementById('sre-income-external').textContent = formatPeso(data.income.external);
    document.getElementById('sre-income-external-pct').textContent = calcPercent(data.income.external, incomeTotal);
    
    // Update expenditure breakdown
    const expTotal = data.expenditures.total;
    document.getElementById('sre-exp-gps').textContent = formatPeso(data.expenditures.gps);
    document.getElementById('sre-exp-gps-pct').textContent = calcPercent(data.expenditures.gps, expTotal);
    document.getElementById('sre-exp-social').textContent = formatPeso(data.expenditures.social);
    document.getElementById('sre-exp-social-pct').textContent = calcPercent(data.expenditures.social, expTotal);
    document.getElementById('sre-exp-economic').textContent = formatPeso(data.expenditures.economic);
    document.getElementById('sre-exp-economic-pct').textContent = calcPercent(data.expenditures.economic, expTotal);
    document.getElementById('sre-exp-debt').textContent = formatPeso(data.expenditures.debt);
    document.getElementById('sre-exp-debt-pct').textContent = calcPercent(data.expenditures.debt, expTotal);
    
    // Update charts
    if (incomeChart) {
        incomeChart.data.datasets[0].data = [data.income.local, data.income.external];
        incomeChart.update('active');
    }
    
    if (expenditureChart) {
        expenditureChart.data.datasets[0].data = [
            data.expenditures.gps,
            data.expenditures.social,
            data.expenditures.economic,
            data.expenditures.debt
        ];
        expenditureChart.update('active');
    }
}


/**
 * Initialize charts with Chart.js
 */
function initCharts() {
    const incomeCtx = document.getElementById('incomeChartV2');
    const expenditureCtx = document.getElementById('expenditureChartV2');
    
    if (!incomeCtx || !expenditureCtx || typeof Chart === 'undefined') return;
    
    const data = FINANCIAL_DATA[currentQuarter];
    
    // Chart.js default options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: 12,
                titleFont: { size: 13, weight: '600' },
                bodyFont: { size: 12 },
                cornerRadius: 8,
                callbacks: {
                    label: function(context) {
                        return `₱${context.raw.toFixed(2)} M`;
                    }
                }
            }
        },
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 600,
            easing: 'easeOutQuart'
        }
    };
    
    // Income Chart
    incomeChart = new Chart(incomeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Local Sources', 'External Sources'],
            datasets: [{
                data: [data.income.local, data.income.external],
                backgroundColor: ['#10b981', '#0ea5e9'],
                borderWidth: 0,
                hoverOffset: 6
            }]
        },
        options: chartOptions
    });
    
    // Expenditure Chart
    expenditureChart = new Chart(expenditureCtx, {
        type: 'doughnut',
        data: {
            labels: ['General Public Services', 'Social Services', 'Economic Services', 'Debt Service'],
            datasets: [{
                data: [
                    data.expenditures.gps,
                    data.expenditures.social,
                    data.expenditures.economic,
                    data.expenditures.debt
                ],
                backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
                borderWidth: 0,
                hoverOffset: 6
            }]
        },
        options: chartOptions
    });
}

/**
 * Initialize period toggle buttons
 */
function initPeriodToggle() {
    const buttons = document.querySelectorAll('.sre-period-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const quarter = this.dataset.quarter;
            if (quarter === currentQuarter) return;
            
            // Update button states
            buttons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Update data
            currentQuarter = quarter;
            updateDisplay(quarter);
        });
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    if (typeof IntersectionObserver === 'undefined') {
        // Fallback: show all elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize breakdown item hover effects
 */
function initBreakdownInteractions() {
    const items = document.querySelectorAll('.sre-breakdown-item');
    
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const type = this.dataset.type;
            highlightChartSegment(type, true);
        });
        
        item.addEventListener('mouseleave', function() {
            const type = this.dataset.type;
            highlightChartSegment(type, false);
        });
    });
}

/**
 * Highlight chart segment on hover
 */
function highlightChartSegment(type, highlight) {
    const incomeTypes = ['local', 'external'];
    const expTypes = ['gps', 'social', 'economic', 'debt'];
    
    let chart = null;
    let index = -1;
    
    if (incomeTypes.includes(type)) {
        chart = incomeChart;
        index = incomeTypes.indexOf(type);
    } else if (expTypes.includes(type)) {
        chart = expenditureChart;
        index = expTypes.indexOf(type);
    }
    
    if (chart && index >= 0) {
        const meta = chart.getDatasetMeta(0);
        if (meta.data[index]) {
            meta.data[index].options.offset = highlight ? 8 : 0;
            chart.update('none');
        }
    }
}

/**
 * Initialize the page
 */
function init() {
    initPeriodToggle();
    initCharts();
    initScrollAnimations();
    initBreakdownInteractions();
}

// Run when DOM is ready
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FINANCIAL_DATA, formatPeso, calcPercent };
}


// DPWH Table Filter
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.dpwh-filter-btn');
    const tableRows = document.querySelectorAll('.dpwh-table tbody tr');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            tableRows.forEach(row => {
                if (filter === 'all' || row.dataset.category === filter) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
});
