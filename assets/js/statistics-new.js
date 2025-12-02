/**
 * Statistics Page - Enhanced Animations & Charts
 * Better Solano Portal - Minimal Professional Design
 */

// Brand colors
const COLORS = {
    primary: '#0032a0',
    primaryDark: '#002170',
    secondary: '#003D82',
    accent: '#F77F00',
    success: '#06A77D',
    info: '#0077BE'
};

// Barangay data (2024 Census)
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
    { name: 'Communal', pop: 2586 },
    { name: 'Lactawan', pop: 2109 },
    { name: 'San Juan', pop: 1965 },
    { name: 'Concepcion', pop: 1954 },
    { name: 'Dadap', pop: 1409 },
    { name: 'Wacal', pop: 1398 },
    { name: 'Bangaan', pop: 1284 },
    { name: 'Tucal', pop: 1244 },
    { name: 'Bangar', pop: 1146 },
    { name: 'Pilar D. Galima', pop: 1146 },
    { name: 'Poblacion North', pop: 970 },
    { name: 'Poblacion South', pop: 817 }
];

// Historical data
const historicalData = {
    years: [1990, 1995, 2000, 2007, 2010, 2015, 2020, 2024],
    populations: [38006, 42857, 47288, 53004, 56831, 62649, 65896, 69296]
};

// Chart instances
let charts = {};

/**
 * Animate number counting
 */
function animateCount(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Intersection Observer for scroll animations
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Trigger count animation for metric cards
                    const countEl = entry.target.querySelector('[data-count]');
                    if (countEl) {
                        const target = parseInt(countEl.dataset.count);
                        animateCount(countEl, target);
                    }
                    
                    // Animate bars
                    animateBars(entry.target);
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.animate-on-scroll, .metric-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Animate progress bars within an element
 */
function animateBars(container) {
    // Breakdown bars
    container.querySelectorAll('.breakdown-segment').forEach(bar => {
        const width = bar.dataset.width;
        if (width) {
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 300);
        }
    });
    
    // Barangay bars
    container.querySelectorAll('.bar-wrap .bar').forEach(bar => {
        const width = bar.dataset.width;
        if (width) {
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        }
    });
    
    // Sector bars
    container.querySelectorAll('.sector-bar').forEach(bar => {
        const width = bar.dataset.width;
        if (width) {
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
        }
    });
    
    // Poverty bars
    container.querySelectorAll('.poverty-fill').forEach(bar => {
        const width = bar.dataset.width;
        if (width) {
            setTimeout(() => {
                bar.style.width = (width * 10) + '%';
            }, 300);
        }
    });
}

/**
 * Create Historical Line Chart
 */
function createHistoricalChart() {
    const ctx = document.getElementById('historicalLineChart');
    if (!ctx) return;
    
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 50, 160, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 50, 160, 0)');
    
    charts.historical = new Chart(ctx, {
        type: 'line',
        data: {
            labels: historicalData.years,
            datasets: [{
                label: 'Population',
                data: historicalData.populations,
                borderColor: COLORS.primary,
                backgroundColor: gradient,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: COLORS.primary,
                pointBorderColor: '#fff',
                pointBorderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 50, 160, 0.95)',
                    titleFont: { size: 14, weight: '600' },
                    bodyFont: { size: 13 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: ctx => `Population: ${ctx.raw.toLocaleString()}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 12 } }
                },
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: {
                        font: { size: 12 },
                        callback: v => (v / 1000) + 'K'
                    }
                }
            }
        }
    });
}

/**
 * Create Distribution Pie Chart
 */
function createDistributionChart() {
    const ctx = document.getElementById('distributionPieChart');
    if (!ctx) return;
    
    const top10 = barangayData.slice(0, 10);
    const colors = [
        COLORS.primary, COLORS.accent, COLORS.success, COLORS.info,
        '#8B5CF6', '#EC4899', '#14B8A6', '#F59E0B', '#6366F1', COLORS.secondary
    ];
    
    charts.distribution = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: top10.map(d => d.name),
            datasets: [{
                data: top10.map(d => d.pop),
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 3,
                hoverBorderWidth: 3,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1500,
                easing: 'easeOutQuart'
            },
            cutout: '55%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 14,
                        padding: 12,
                        font: { size: 12 },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 50, 160, 0.95)',
                    titleFont: { size: 14, weight: '600' },
                    bodyFont: { size: 13 },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: ctx => {
                            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            const pct = ((ctx.raw / total) * 100).toFixed(1);
                            return `${ctx.raw.toLocaleString()} (${pct}%)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Create Population Bar Chart
 */
function createBarChart() {
    const ctx = document.getElementById('populationBarChart');
    if (!ctx) return;
    
    const sorted = [...barangayData].sort((a, b) => b.pop - a.pop);
    
    charts.bar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(d => d.name),
            datasets: [{
                label: 'Population',
                data: sorted.map(d => d.pop),
                backgroundColor: sorted.map((_, i) => {
                    const opacity = 1 - (i * 0.03);
                    return `rgba(0, 50, 160, ${opacity})`;
                }),
                borderRadius: 4,
                borderSkipped: false
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
                easing: 'easeOutQuart',
                delay: ctx => ctx.dataIndex * 50
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 50, 160, 0.95)',
                    titleFont: { size: 14, weight: '600' },
                    bodyFont: { size: 13 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: ctx => `Population: ${ctx.raw.toLocaleString()}`
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: {
                        font: { size: 11 },
                        callback: v => v.toLocaleString()
                    }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                }
            }
        }
    });
}

/**
 * Initialize all charts with lazy loading
 */
function initCharts() {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chartId = entry.target.id;
                
                if (chartId === 'historicalLineChart' && !charts.historical) {
                    createHistoricalChart();
                } else if (chartId === 'distributionPieChart' && !charts.distribution) {
                    createDistributionChart();
                } else if (chartId === 'populationBarChart' && !charts.bar) {
                    createBarChart();
                }
                
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('canvas').forEach(canvas => {
        chartObserver.observe(canvas);
    });
}

/**
 * Initialize economy section counters
 */
function initEconomyCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const countEl = entry.target.querySelector('[data-count]');
                if (countEl) {
                    const target = parseInt(countEl.dataset.count);
                    animateCount(countEl, target, 1500);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.economy-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initCharts();
    initEconomyCounters();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        barangayData,
        historicalData,
        COLORS,
        animateCount
    };
}