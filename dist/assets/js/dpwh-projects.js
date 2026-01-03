// DPWH Projects Renderer - Progressive Loading Design
(function() {
    'use strict';

    const CONFIG = {
        initialRows: 8,
        loadMoreRows: 8,
        truncateLength: 80
    };

    let allProjects = [];
    let filteredProjects = [];
    let displayedCount = 0;
    let currentFilter = 'all';
    let isLoading = false;

    async function loadDPWHProjects() {
        const container = document.getElementById('dpwh-projects-container');
        if (!container) return;

        try {
            const response = await fetch('../data/dpwh-projects.json');
            const data = await response.json();
            allProjects = data.projects;
            filteredProjects = [...allProjects];
            renderSection(container, data);
        } catch (error) {
            console.error('Failed to load DPWH projects:', error);
        }
    }

    function formatCurrency(amount) {
        return '₱' + amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function formatDate(dateStr) {
        if (!dateStr) return '—';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '…';
    }

    function getCategoryClass(category) {
        if (category.includes('Flood')) return 'flood';
        if (category.includes('Road')) return 'roads';
        if (category.includes('Water')) return 'water';
        return 'buildings';
    }

    function getCategoryLabel(category) {
        if (category.includes('Flood')) return 'Flood Control';
        if (category.includes('Road')) return 'Roads';
        if (category.includes('Water')) return 'Water';
        return 'Buildings';
    }


    function getStatusBadge(status) {
        if (status === 100) return '<span class="dpwh-badge complete">Completed</span>';
        return `<span class="dpwh-badge ongoing">${status.toFixed(0)}%</span>`;
    }

    function getCategoryCounts(projects) {
        const counts = { all: projects.length, buildings: 0, roads: 0, flood: 0, water: 0 };
        projects.forEach(p => {
            if (p.category.includes('Flood')) counts.flood++;
            else if (p.category.includes('Road')) counts.roads++;
            else if (p.category.includes('Water')) counts.water++;
            else counts.buildings++;
        });
        return counts;
    }

    function filterProjects(filter) {
        currentFilter = filter;
        if (filter === 'all') return [...allProjects];
        return allProjects.filter(p => {
            if (filter === 'buildings') return !p.category.includes('Flood') && !p.category.includes('Road') && !p.category.includes('Water');
            if (filter === 'roads') return p.category.includes('Road');
            if (filter === 'flood') return p.category.includes('Flood');
            if (filter === 'water') return p.category.includes('Water');
            return true;
        });
    }

    function renderSection(container, data) {
        const counts = getCategoryCounts(allProjects);
        const completedCount = allProjects.filter(p => p.status === 100).length;

        const html = `
            <div class="dpwh-summary-bar">
                <div class="dpwh-summary-item">
                    <span class="dpwh-summary-value">${data.summary.totalProjects}</span>
                    <span class="dpwh-summary-label">Projects</span>
                </div>
                <div class="dpwh-summary-item">
                    <span class="dpwh-summary-value">₱${(data.summary.totalCost / 1000000).toFixed(1)}M</span>
                    <span class="dpwh-summary-label">Total Investment</span>
                </div>
                <div class="dpwh-summary-item">
                    <span class="dpwh-summary-value">${completedCount}</span>
                    <span class="dpwh-summary-label">Completed</span>
                </div>
                <div class="dpwh-summary-item">
                    <span class="dpwh-summary-value">${data.summary.totalProjects - completedCount}</span>
                    <span class="dpwh-summary-label">Ongoing</span>
                </div>
            </div>

            <div class="dpwh-controls">
                <div class="dpwh-filter-group" role="tablist" aria-label="Filter projects by category">
                    <button class="dpwh-tab active" data-filter="all" role="tab" aria-selected="true">All <span class="dpwh-tab-count">${counts.all}</span></button>
                    <button class="dpwh-tab" data-filter="buildings" role="tab" aria-selected="false">Buildings <span class="dpwh-tab-count">${counts.buildings}</span></button>
                    <button class="dpwh-tab" data-filter="roads" role="tab" aria-selected="false">Roads <span class="dpwh-tab-count">${counts.roads}</span></button>
                    <button class="dpwh-tab" data-filter="flood" role="tab" aria-selected="false">Flood Control <span class="dpwh-tab-count">${counts.flood}</span></button>
                    ${counts.water > 0 ? `<button class="dpwh-tab" data-filter="water" role="tab" aria-selected="false">Water <span class="dpwh-tab-count">${counts.water}</span></button>` : ''}
                </div>
            </div>

            <div class="dpwh-table-wrap">
                <table class="dpwh-table" role="table">
                    <thead>
                        <tr>
                            <th scope="col" class="col-desc">Contract Description</th>
                            <th scope="col" class="col-contractor">Contractor</th>
                            <th scope="col" class="col-cost">Cost</th>
                            <th scope="col" class="col-status">Status</th>
                            <th scope="col" class="col-date">Completed</th>
                        </tr>
                    </thead>
                    <tbody id="dpwh-table-body"></tbody>
                </table>
                <div id="dpwh-load-more" class="dpwh-load-more"></div>
            </div>
        `;

        container.innerHTML = html;
        displayedCount = 0;
        loadMoreRows();
        attachEventListeners();
    }


    function renderRows(projects, startIndex, count) {
        const endIndex = Math.min(startIndex + count, projects.length);
        let html = '';

        for (let i = startIndex; i < endIndex; i++) {
            const p = projects[i];
            html += `
                <tr class="dpwh-row" tabindex="0">
                    <td class="col-desc">
                        <div class="dpwh-desc-wrap">
                            <span class="dpwh-proj-id">${p.id}</span>
                            <span class="dpwh-cat-badge ${getCategoryClass(p.category)}">${getCategoryLabel(p.category)}</span>
                        </div>
                        <span class="dpwh-proj-title" title="${p.name}">${truncateText(p.name, CONFIG.truncateLength)}</span>
                        <span class="dpwh-proj-location"><i class="bi bi-geo-alt"></i>${p.location}</span>
                    </td>
                    <td class="col-contractor">
                        <span class="dpwh-contractor">${p.contractor}</span>
                        <span class="dpwh-contractor-id">#${p.contractorId}</span>
                    </td>
                    <td class="col-cost">${formatCurrency(p.cost)}</td>
                    <td class="col-status">${getStatusBadge(p.status)}</td>
                    <td class="col-date">${formatDate(p.completionDate)}</td>
                </tr>
            `;
        }
        return html;
    }

    function loadMoreRows() {
        if (isLoading) return;
        
        const tbody = document.getElementById('dpwh-table-body');
        const loadMoreEl = document.getElementById('dpwh-load-more');
        if (!tbody || !loadMoreEl) return;

        const remaining = filteredProjects.length - displayedCount;
        if (remaining <= 0) {
            loadMoreEl.innerHTML = '';
            return;
        }

        isLoading = true;
        const rowsToLoad = displayedCount === 0 ? CONFIG.initialRows : CONFIG.loadMoreRows;
        
        // Show skeleton loader
        if (displayedCount > 0) {
            loadMoreEl.innerHTML = '<div class="dpwh-skeleton-row"></div>'.repeat(Math.min(rowsToLoad, remaining));
        }

        // Simulate slight delay for smooth UX
        setTimeout(() => {
            const newRows = renderRows(filteredProjects, displayedCount, rowsToLoad);
            tbody.insertAdjacentHTML('beforeend', newRows);
            displayedCount += rowsToLoad;
            isLoading = false;
            updateLoadMoreButton();
        }, displayedCount === 0 ? 0 : 150);
    }

    function updateLoadMoreButton() {
        const loadMoreEl = document.getElementById('dpwh-load-more');
        if (!loadMoreEl) return;

        const remaining = filteredProjects.length - displayedCount;
        if (remaining <= 0) {
            loadMoreEl.innerHTML = `<span class="dpwh-end-msg">Showing all ${filteredProjects.length} projects</span>`;
        } else {
            loadMoreEl.innerHTML = `
                <button class="dpwh-load-btn" id="dpwh-load-btn">
                    Load More <span class="dpwh-remaining">(${remaining} remaining)</span>
                </button>
            `;
            document.getElementById('dpwh-load-btn').addEventListener('click', loadMoreRows);
        }
    }


    function handleFilterChange(filter) {
        // Update active tab
        document.querySelectorAll('.dpwh-tab').forEach(tab => {
            const isActive = tab.dataset.filter === filter;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive);
        });

        // Filter and reset
        filteredProjects = filterProjects(filter);
        displayedCount = 0;
        
        const tbody = document.getElementById('dpwh-table-body');
        if (tbody) tbody.innerHTML = '';
        
        loadMoreRows();
    }

    function attachEventListeners() {
        // Filter tabs
        document.querySelectorAll('.dpwh-tab').forEach(tab => {
            tab.addEventListener('click', () => handleFilterChange(tab.dataset.filter));
        });

        // Keyboard navigation for rows
        document.querySelectorAll('.dpwh-row').forEach(row => {
            row.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    row.classList.toggle('expanded');
                }
            });
        });

        // Intersection Observer for lazy loading
        const loadMoreEl = document.getElementById('dpwh-load-more');
        if (loadMoreEl && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    const remaining = filteredProjects.length - displayedCount;
                    if (remaining > 0) {
                        loadMoreRows();
                    }
                }
            }, { rootMargin: '100px' });
            observer.observe(loadMoreEl);
        }
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadDPWHProjects);
    } else {
        loadDPWHProjects();
    }
})();