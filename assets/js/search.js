/* Better Solano - Search Functionality */

(function() {
    'use strict';

    // Services database - will be loaded from JSON
    let servicesData = [];
    let isDataLoaded = false;

    // Determine the base path based on current page location
    function getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/services/') || path.includes('/government/') || 
            path.includes('/budget/') || path.includes('/contact/') ||
            path.includes('/faq/') || path.includes('/accessibility/') ||
            path.includes('/news/') || path.includes('/sitemap/') ||
            path.includes('/service-details/')) {
            return '../';
        }
        return '';
    }

    // Load services data from JSON file
    async function loadServicesData() {
        if (isDataLoaded) return servicesData;
        
        try {
            const basePath = getBasePath();
            const response = await fetch(`${basePath}data/services.json`);
            if (!response.ok) throw new Error('Failed to load services data');
            const data = await response.json();
            servicesData = data.services || [];
            isDataLoaded = true;
            return servicesData;
        } catch (error) {
            console.warn('Could not load services data:', error);
            // Fallback to embedded data if JSON fails
            servicesData = getFallbackServices();
            isDataLoaded = true;
            return servicesData;
        }
    }

    // Fallback services data
    function getFallbackServices() {
        return [
            { id: "birth-certificate", title: "Birth Certificate", category: "Certificates & Vital Records", keywords: ["birth", "certificate"], url: "../service-details/birth-certificate.html" },
            { id: "marriage-certificate", title: "Marriage Certificate", category: "Certificates & Vital Records", keywords: ["marriage", "wedding"], url: "certificates.html" },
            { id: "business-permit", title: "Business Permit", category: "Business, Trade & Investment", keywords: ["business", "permit"], url: "business.html" },
            { id: "senior-citizen-id", title: "Senior Citizen ID", category: "Social Services & Assistance", keywords: ["senior", "elderly"], url: "social-services.html" },
            { id: "real-property-tax", title: "Real Property Tax", category: "Taxation & Payments", keywords: ["property", "tax"], url: "tax-payments.html" }
        ];
    }

    // Search function
    function searchServices(query, services) {
        if (!query || query.length < 2) return [];
        
        const searchTerms = query.toLowerCase().trim().split(/\s+/);
        
        const results = services.map(service => {
            let score = 0;
            const titleLower = service.title.toLowerCase();
            const categoryLower = service.category.toLowerCase();
            const descLower = (service.description || '').toLowerCase();
            const keywords = service.keywords || [];
            
            searchTerms.forEach(term => {
                // Exact title match (highest priority)
                if (titleLower === term) score += 100;
                // Title starts with term
                else if (titleLower.startsWith(term)) score += 50;
                // Title contains term
                else if (titleLower.includes(term)) score += 30;
                
                // Category match
                if (categoryLower.includes(term)) score += 20;
                
                // Description match
                if (descLower.includes(term)) score += 10;
                
                // Keyword match
                keywords.forEach(keyword => {
                    if (keyword.toLowerCase().includes(term)) score += 15;
                    if (keyword.toLowerCase() === term) score += 25;
                });
            });
            
            return { ...service, score };
        });
        
        return results
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
    }

    // Create autocomplete dropdown
    function createAutocomplete(input) {
        // Remove existing autocomplete if any
        const existingDropdown = input.parentElement.querySelector('.search-autocomplete');
        if (existingDropdown) existingDropdown.remove();

        const dropdown = document.createElement('div');
        dropdown.className = 'search-autocomplete';
        dropdown.setAttribute('role', 'listbox');
        dropdown.setAttribute('aria-label', 'Search suggestions');
        
        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(dropdown);
        
        return dropdown;
    }

    // Render search results
    function renderResults(results, dropdown, basePath) {
        if (results.length === 0) {
            dropdown.innerHTML = `
                <div class="search-no-results">
                    <i class="bi bi-search"></i>
                    <p>No services found</p>
                    <small>Try different keywords or browse categories below</small>
                </div>
            `;
            dropdown.style.display = 'block';
            return;
        }

        dropdown.innerHTML = results.map((result, index) => {
            // Fix URL path based on current location
            let url = result.url;
            if (!url.startsWith('http') && !url.startsWith('/')) {
                // Relative URL - adjust based on current page
                if (window.location.pathname.includes('/services/')) {
                    // Already in services folder
                    if (url.startsWith('../')) {
                        // Keep as is
                    }
                } else {
                    // From root or other folder
                    if (!url.startsWith('../') && !url.startsWith('services/')) {
                        url = 'services/' + url;
                    }
                }
            }
            
            return `
                <a href="${url}" class="search-result-item" role="option" data-index="${index}">
                    <div class="search-result-title">${highlightMatch(result.title, result._query || '')}</div>
                    <div class="search-result-meta">
                        <span class="search-result-category">${result.category}</span>
                        ${result.fee ? `<span class="search-result-fee">${result.fee}</span>` : ''}
                    </div>
                    ${result.description ? `<div class="search-result-desc">${result.description}</div>` : ''}
                </a>
            `;
        }).join('');
        
        dropdown.style.display = 'block';
    }

    // Highlight matching text
    function highlightMatch(text, query) {
        if (!query) return text;
        const terms = query.toLowerCase().split(/\s+/);
        let result = text;
        terms.forEach(term => {
            if (term.length >= 2) {
                const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
                result = result.replace(regex, '<mark>$1</mark>');
            }
        });
        return result;
    }

    // Escape regex special characters
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Initialize search on an input element
    async function initSearch(input) {
        const services = await loadServicesData();
        const dropdown = createAutocomplete(input);
        const basePath = getBasePath();
        
        let debounceTimer;
        let selectedIndex = -1;

        // Handle input
        input.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            const query = this.value.trim();
            
            if (query.length < 2) {
                dropdown.style.display = 'none';
                selectedIndex = -1;
                return;
            }

            debounceTimer = setTimeout(() => {
                const results = searchServices(query, services);
                results.forEach(r => r._query = query);
                renderResults(results, dropdown, basePath);
                selectedIndex = -1;
            }, 150);
        });

        // Handle keyboard navigation
        input.addEventListener('keydown', function(e) {
            const items = dropdown.querySelectorAll('.search-result-item');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                updateSelection(items, selectedIndex);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, -1);
                updateSelection(items, selectedIndex);
            } else if (e.key === 'Enter') {
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    e.preventDefault();
                    items[selectedIndex].click();
                }
            } else if (e.key === 'Escape') {
                dropdown.style.display = 'none';
                selectedIndex = -1;
            }
        });

        // Update visual selection
        function updateSelection(items, index) {
            items.forEach((item, i) => {
                item.classList.toggle('selected', i === index);
            });
            if (index >= 0 && items[index]) {
                items[index].scrollIntoView({ block: 'nearest' });
            }
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
                selectedIndex = -1;
            }
        });

        // Handle focus
        input.addEventListener('focus', function() {
            if (this.value.trim().length >= 2) {
                const results = searchServices(this.value.trim(), services);
                results.forEach(r => r._query = this.value.trim());
                renderResults(results, dropdown, basePath);
            }
        });

        // Prevent form submission - use inline search instead
        const form = input.closest('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const query = input.value.trim();
                if (query.length >= 2) {
                    const results = searchServices(query, services);
                    if (results.length > 0) {
                        // Navigate to first result
                        let url = results[0].url;
                        if (window.location.pathname.includes('/services/')) {
                            window.location.href = url;
                        } else {
                            if (!url.startsWith('../') && !url.startsWith('services/') && !url.startsWith('http')) {
                                url = 'services/' + url;
                            }
                            window.location.href = url;
                        }
                    }
                }
            });
        }
    }

    // Add search styles
    function addSearchStyles() {
        if (document.getElementById('search-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'search-styles';
        styles.textContent = `
            .search-autocomplete {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #fff;
                border: 1px solid #e0e0e0;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
                max-height: 400px;
                overflow-y: auto;
                z-index: 1000;
                display: none;
                margin-top: 8px;
            }
            
            .search-result-item {
                display: block;
                padding: 12px 16px;
                text-decoration: none;
                color: #1a1a1a;
                border-bottom: 1px solid #f0f0f0;
                transition: background 0.15s ease;
                text-align: left;
            }
            
            .search-result-item:last-child {
                border-bottom: none;
            }
            
            .search-result-item:hover,
            .search-result-item.selected {
                background: #f8f9fa;
                text-decoration: none;
            }
            
            .search-result-title {
                font-weight: 600;
                color: #0032a0;
                margin-bottom: 4px;
                text-align: left;
            }
            
            .search-result-title mark {
                background: #fff3cd;
                color: inherit;
                padding: 0 2px;
                border-radius: 2px;
            }
            
            .search-result-meta {
                display: flex;
                gap: 12px;
                font-size: 0.8125rem;
                margin-bottom: 4px;
                justify-content: flex-start;
                text-align: left;
            }
            
            .search-result-category {
                color: #666;
            }
            
            .search-result-fee {
                color: #06a77d;
                font-weight: 500;
            }
            
            .search-result-desc {
                font-size: 0.8125rem;
                color: #888;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
            }
            
            .search-no-results {
                padding: 24px;
                text-align: center;
                color: #666;
            }
            
            .search-no-results i {
                font-size: 2rem;
                color: #ccc;
                margin-bottom: 8px;
            }
            
            .search-no-results p {
                margin: 0 0 4px;
                font-weight: 500;
            }
            
            .search-no-results small {
                color: #888;
            }
        `;
        document.head.appendChild(styles);
    }

    // Initialize on DOM ready
    if (typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', function() {
            addSearchStyles();
            
            // Find all search inputs
            const searchInputs = document.querySelectorAll('#service-search, #hero-search, .service-search-input');
            searchInputs.forEach(input => {
                if (input) initSearch(input);
            });
        });
    }

    // Export for testing
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { searchServices };
    }
    
    // Also expose globally for browser testing
    if (typeof window !== 'undefined') {
        window.BetterSolanoSearch = { searchServices };
    }
})();
