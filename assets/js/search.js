/* Better Solano - Enhanced Search Functionality */
/* Updated: 2025-12-05 */

(function() {
    'use strict';

    // Services database
    let servicesData = [];
    let isDataLoaded = false;
    let searchIndex = null;

    // Search analytics storage
    const ANALYTICS_KEY = 'bettersolano_search_analytics';
    const RECENT_SEARCHES_KEY = 'bettersolano_recent_searches';
    const MAX_RECENT_SEARCHES = 10;
    const MAX_ANALYTICS_ENTRIES = 100;

    // Popular searches (curated + dynamic)
    const CURATED_POPULAR = [
        'birth certificate', 'business permit', 'cedula', 'real property tax',
        'senior citizen id', 'pwd id', 'barangay clearance', 'building permit'
    ];

    // Determine the base path based on current page location
    function getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/services/') || path.includes('/government/') || 
            path.includes('/budget/') || path.includes('/contact/') ||
            path.includes('/faq/') || path.includes('/accessibility/') ||
            path.includes('/news/') || path.includes('/sitemap/') ||
            path.includes('/statistics/') || path.includes('/legislative/') ||
            path.includes('/privacy/') || path.includes('/terms/') ||
            path.includes('/service-details/')) {
            return '../';
        }
        return '';
    }

    // ==================== SEARCH INDEX ====================
    
    // Build search index for faster lookups
    function buildSearchIndex(services) {
        const index = {
            titleIndex: new Map(),
            keywordIndex: new Map(),
            categoryIndex: new Map(),
            officeIndex: new Map(),
            allTerms: new Set()
        };

        services.forEach((service, idx) => {
            // Index title words
            const titleWords = tokenize(service.title);
            titleWords.forEach(word => {
                if (!index.titleIndex.has(word)) index.titleIndex.set(word, []);
                index.titleIndex.get(word).push(idx);
                index.allTerms.add(word);
            });

            // Index keywords
            (service.keywords || []).forEach(keyword => {
                const kw = keyword.toLowerCase();
                if (!index.keywordIndex.has(kw)) index.keywordIndex.set(kw, []);
                index.keywordIndex.get(kw).push(idx);
                index.allTerms.add(kw);
            });

            // Index category
            const catWords = tokenize(service.category);
            catWords.forEach(word => {
                if (!index.categoryIndex.has(word)) index.categoryIndex.set(word, []);
                index.categoryIndex.get(word).push(idx);
            });

            // Index office
            if (service.office) {
                const officeWords = tokenize(service.office);
                officeWords.forEach(word => {
                    if (!index.officeIndex.has(word)) index.officeIndex.set(word, []);
                    index.officeIndex.get(word).push(idx);
                });
            }
        });

        return index;
    }

    // Tokenize text into searchable words
    function tokenize(text) {
        if (!text) return [];
        return text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(w => w.length >= 2);
    }

    // ==================== FUZZY MATCHING ====================

    // Levenshtein distance for fuzzy matching
    function levenshteinDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    // Check if terms are similar (fuzzy match)
    function isFuzzyMatch(term, target, threshold = 0.3) {
        if (target.includes(term) || term.includes(target)) return true;
        if (target.startsWith(term) || term.startsWith(target)) return true;
        
        const distance = levenshteinDistance(term, target);
        const maxLen = Math.max(term.length, target.length);
        const similarity = 1 - (distance / maxLen);
        
        return similarity >= (1 - threshold);
    }

    // Find fuzzy matches in index
    function findFuzzyMatches(term, indexMap) {
        const matches = new Set();
        
        // Exact match first
        if (indexMap.has(term)) {
            indexMap.get(term).forEach(idx => matches.add(idx));
        }
        
        // Fuzzy matches
        indexMap.forEach((indices, key) => {
            if (isFuzzyMatch(term, key)) {
                indices.forEach(idx => matches.add(idx));
            }
        });
        
        return matches;
    }

    // ==================== DATA LOADING ====================

    async function loadServicesData() {
        if (isDataLoaded) return servicesData;
        
        try {
            const basePath = getBasePath();
            const response = await fetch(`${basePath}data/services.json`);
            if (!response.ok) throw new Error('Failed to load services data');
            const data = await response.json();
            servicesData = data.services || [];
            searchIndex = buildSearchIndex(servicesData);
            isDataLoaded = true;
            return servicesData;
        } catch (error) {
            console.warn('Could not load services data:', error);
            servicesData = getFallbackServices();
            searchIndex = buildSearchIndex(servicesData);
            isDataLoaded = true;
            return servicesData;
        }
    }

    function getFallbackServices() {
        return [
            { id: "birth-certificate", title: "Birth Certificate", category: "Certificates & Vital Records", keywords: ["birth", "certificate"], office: "Local Civil Registrar", fee: "₱150", processingTime: "15-30 minutes", url: "../service-details/birth-certificate.html" },
            { id: "business-permit", title: "Business Permit", category: "Business, Trade & Investment", keywords: ["business", "permit"], office: "BPLS", fee: "Varies", processingTime: "3-5 days", url: "business.html" }
        ];
    }


    // ==================== ENHANCED SEARCH ====================

    function searchServices(query, services, options = {}) {
        if (!query || query.length < 2) return [];
        
        const { category = null, limit = 10 } = options;
        const searchTerms = tokenize(query);
        if (searchTerms.length === 0) return [];

        const candidateIndices = new Set();
        
        // Use index for fast candidate lookup
        if (searchIndex) {
            searchTerms.forEach(term => {
                // Title matches (highest priority)
                findFuzzyMatches(term, searchIndex.titleIndex).forEach(idx => candidateIndices.add(idx));
                // Keyword matches
                findFuzzyMatches(term, searchIndex.keywordIndex).forEach(idx => candidateIndices.add(idx));
                // Category matches
                findFuzzyMatches(term, searchIndex.categoryIndex).forEach(idx => candidateIndices.add(idx));
                // Office matches
                findFuzzyMatches(term, searchIndex.officeIndex).forEach(idx => candidateIndices.add(idx));
            });
        } else {
            // Fallback: check all services
            services.forEach((_, idx) => candidateIndices.add(idx));
        }

        // Score candidates
        const results = [];
        candidateIndices.forEach(idx => {
            const service = services[idx];
            if (!service) return;
            
            // Category filter
            if (category && service.categoryId !== category && !service.category.toLowerCase().includes(category.toLowerCase())) {
                return;
            }

            const score = calculateScore(service, searchTerms, query);
            if (score > 0) {
                results.push({ ...service, score, _query: query });
            }
        });

        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    function calculateScore(service, searchTerms, originalQuery) {
        let score = 0;
        const titleLower = service.title.toLowerCase();
        const categoryLower = service.category.toLowerCase();
        const descLower = (service.description || '').toLowerCase();
        const officeLower = (service.office || '').toLowerCase();
        const processingTime = (service.processingTime || '').toLowerCase();
        const keywords = service.keywords || [];
        const queryLower = originalQuery.toLowerCase();

        // Exact full query match in title (highest priority)
        if (titleLower === queryLower) score += 200;
        else if (titleLower.includes(queryLower)) score += 100;

        searchTerms.forEach(term => {
            // Title scoring
            if (titleLower === term) score += 80;
            else if (titleLower.startsWith(term)) score += 60;
            else if (titleLower.includes(term)) score += 40;
            else if (isFuzzyMatch(term, titleLower, 0.25)) score += 20;

            // Keyword scoring
            keywords.forEach(keyword => {
                const kw = keyword.toLowerCase();
                if (kw === term) score += 35;
                else if (kw.includes(term)) score += 20;
                else if (isFuzzyMatch(term, kw, 0.3)) score += 10;
            });

            // Category scoring
            if (categoryLower.includes(term)) score += 15;
            else if (isFuzzyMatch(term, categoryLower, 0.3)) score += 8;

            // Description scoring
            if (descLower.includes(term)) score += 10;

            // Office scoring
            if (officeLower.includes(term)) score += 12;
            else if (isFuzzyMatch(term, officeLower, 0.3)) score += 6;

            // Processing time scoring (for queries like "same day", "fast")
            if (processingTime.includes(term)) score += 8;
        });

        // Boost for services with more complete data
        if (service.fee) score += 2;
        if (service.processingTime) score += 2;
        if (service.description) score += 1;

        return score;
    }

    // ==================== CATEGORY FILTER ====================

    function getCategories(services) {
        const categories = new Map();
        services.forEach(service => {
            if (service.categoryId && service.category) {
                categories.set(service.categoryId, service.category);
            }
        });
        return Array.from(categories.entries()).map(([id, name]) => ({ id, name }));
    }

    // ==================== RECENT SEARCHES ====================

    function getRecentSearches() {
        try {
            const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    function addRecentSearch(query) {
        if (!query || query.length < 2) return;
        
        try {
            let recent = getRecentSearches();
            // Remove if already exists
            recent = recent.filter(q => q.toLowerCase() !== query.toLowerCase());
            // Add to front
            recent.unshift(query);
            // Limit size
            recent = recent.slice(0, MAX_RECENT_SEARCHES);
            localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent));
        } catch {
            // localStorage not available
        }
    }

    function clearRecentSearches() {
        try {
            localStorage.removeItem(RECENT_SEARCHES_KEY);
        } catch {
            // localStorage not available
        }
    }

    // ==================== SEARCH ANALYTICS ====================

    function trackSearch(query, resultsCount) {
        try {
            let analytics = getSearchAnalytics();
            const existing = analytics.find(a => a.query.toLowerCase() === query.toLowerCase());
            
            if (existing) {
                existing.count++;
                existing.lastSearched = Date.now();
            } else {
                analytics.push({
                    query: query,
                    count: 1,
                    resultsCount: resultsCount,
                    lastSearched: Date.now()
                });
            }

            // Sort by count and limit
            analytics.sort((a, b) => b.count - a.count);
            analytics = analytics.slice(0, MAX_ANALYTICS_ENTRIES);
            
            localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
        } catch {
            // localStorage not available
        }
    }

    function getSearchAnalytics() {
        try {
            const stored = localStorage.getItem(ANALYTICS_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    function getPopularSearches(limit = 5) {
        const analytics = getSearchAnalytics();
        const popular = analytics
            .filter(a => a.count >= 2)
            .slice(0, limit)
            .map(a => a.query);
        
        // Fill with curated if not enough
        if (popular.length < limit) {
            CURATED_POPULAR.forEach(term => {
                if (popular.length < limit && !popular.includes(term)) {
                    popular.push(term);
                }
            });
        }
        
        return popular;
    }

    // ==================== SEARCH SUGGESTIONS ====================

    function getSuggestions(query, services) {
        if (!query || query.length < 1) {
            // Return popular + recent when no query
            const popular = getPopularSearches(4);
            const recent = getRecentSearches().slice(0, 3);
            return {
                popular: popular,
                recent: recent,
                suggestions: []
            };
        }

        const queryLower = query.toLowerCase();
        const suggestions = new Set();

        // Add matching service titles
        services.forEach(service => {
            if (service.title.toLowerCase().includes(queryLower)) {
                suggestions.add(service.title);
            }
        });

        // Add matching keywords
        if (searchIndex) {
            searchIndex.allTerms.forEach(term => {
                if (term.startsWith(queryLower) && term !== queryLower) {
                    suggestions.add(term);
                }
            });
        }

        // Add fuzzy matches from popular searches
        CURATED_POPULAR.forEach(term => {
            if (term.includes(queryLower) || isFuzzyMatch(queryLower, term, 0.4)) {
                suggestions.add(term);
            }
        });

        return {
            popular: [],
            recent: [],
            suggestions: Array.from(suggestions).slice(0, 8)
        };
    }


    // ==================== UI COMPONENTS ====================

    function createAutocomplete(input) {
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

    function renderResults(results, dropdown, options = {}) {
        const { showSuggestions = false, suggestions = {}, categories = [], selectedCategory = null } = options;

        let html = '';

        // Category filter (if categories provided)
        if (categories.length > 0) {
            html += `
                <div class="search-filters">
                    <button class="search-filter-btn ${!selectedCategory ? 'active' : ''}" data-category="">All</button>
                    ${categories.slice(0, 5).map(cat => `
                        <button class="search-filter-btn ${selectedCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">${cat.name.split(' ')[0]}</button>
                    `).join('')}
                </div>
            `;
        }

        // Show suggestions when no results or empty query
        if (showSuggestions && (suggestions.popular?.length || suggestions.recent?.length)) {
            if (suggestions.recent?.length) {
                html += `
                    <div class="search-section">
                        <div class="search-section-header">
                            <span><i class="bi bi-clock-history"></i> Recent Searches</span>
                            <button class="search-clear-recent" type="button">Clear</button>
                        </div>
                        ${suggestions.recent.map(term => `
                            <a href="#" class="search-suggestion-item" data-suggestion="${escapeHtml(term)}">
                                <i class="bi bi-arrow-counterclockwise"></i> ${escapeHtml(term)}
                            </a>
                        `).join('')}
                    </div>
                `;
            }
            if (suggestions.popular?.length) {
                html += `
                    <div class="search-section">
                        <div class="search-section-header">
                            <span><i class="bi bi-fire"></i> Popular Searches</span>
                        </div>
                        ${suggestions.popular.map(term => `
                            <a href="#" class="search-suggestion-item" data-suggestion="${escapeHtml(term)}">
                                <i class="bi bi-search"></i> ${escapeHtml(term)}
                            </a>
                        `).join('')}
                    </div>
                `;
            }
            dropdown.innerHTML = html;
            dropdown.style.display = 'block';
            return;
        }

        // Show autocomplete suggestions
        if (suggestions.suggestions?.length && results.length === 0) {
            html += `
                <div class="search-section">
                    <div class="search-section-header">
                        <span><i class="bi bi-lightbulb"></i> Did you mean?</span>
                    </div>
                    ${suggestions.suggestions.slice(0, 5).map(term => `
                        <a href="#" class="search-suggestion-item" data-suggestion="${escapeHtml(term)}">
                            <i class="bi bi-search"></i> ${escapeHtml(term)}
                        </a>
                    `).join('')}
                </div>
            `;
        }

        // No results
        if (results.length === 0) {
            html += `
                <div class="search-no-results">
                    <i class="bi bi-search"></i>
                    <p>No services found</p>
                    <small>Try different keywords or check spelling</small>
                </div>
            `;
            dropdown.innerHTML = html;
            dropdown.style.display = 'block';
            return;
        }

        // Render results
        html += results.map((result, index) => {
            let url = result.url;
            if (!url.startsWith('http') && !url.startsWith('/')) {
                if (window.location.pathname.includes('/services/')) {
                    // Already in services folder
                } else if (!url.startsWith('../') && !url.startsWith('services/')) {
                    url = 'services/' + url;
                }
            }
            
            return `
                <a href="${url}" class="search-result-item" role="option" data-index="${index}">
                    <div class="search-result-title">${highlightMatch(result.title, result._query || '')}</div>
                    <div class="search-result-meta">
                        <span class="search-result-category"><i class="bi bi-folder"></i> ${escapeHtml(result.category)}</span>
                        ${result.fee ? `<span class="search-result-fee"><i class="bi bi-cash"></i> ${escapeHtml(result.fee)}</span>` : ''}
                        ${result.processingTime ? `<span class="search-result-time"><i class="bi bi-clock"></i> ${escapeHtml(result.processingTime)}</span>` : ''}
                    </div>
                    ${result.office ? `<div class="search-result-office"><i class="bi bi-building"></i> ${escapeHtml(result.office)}</div>` : ''}
                    ${result.description ? `<div class="search-result-desc">${escapeHtml(result.description)}</div>` : ''}
                </a>
            `;
        }).join('');

        dropdown.innerHTML = html;
        dropdown.style.display = 'block';
    }

    function highlightMatch(text, query) {
        if (!query) return escapeHtml(text);
        const terms = tokenize(query);
        let result = escapeHtml(text);
        terms.forEach(term => {
            if (term.length >= 2) {
                const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
                result = result.replace(regex, '<mark>$1</mark>');
            }
        });
        return result;
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // ==================== INITIALIZATION ====================

    async function initSearch(input) {
        const services = await loadServicesData();
        const dropdown = createAutocomplete(input);
        const categories = getCategories(services);
        
        let debounceTimer;
        let selectedIndex = -1;
        let currentCategory = null;
        let currentResults = [];

        // Show suggestions on focus with empty input
        input.addEventListener('focus', function() {
            const query = this.value.trim();
            if (query.length < 2) {
                const suggestions = getSuggestions('', services);
                renderResults([], dropdown, { showSuggestions: true, suggestions, categories });
            } else {
                performSearch(query);
            }
        });

        // Handle input
        input.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            const query = this.value.trim();
            
            if (query.length < 2) {
                const suggestions = getSuggestions(query, services);
                renderResults([], dropdown, { showSuggestions: true, suggestions, categories });
                selectedIndex = -1;
                return;
            }

            debounceTimer = setTimeout(() => performSearch(query), 150);
        });

        function performSearch(query) {
            const results = searchServices(query, services, { category: currentCategory });
            currentResults = results;
            const suggestions = getSuggestions(query, services);
            
            renderResults(results, dropdown, { 
                suggestions, 
                categories, 
                selectedCategory: currentCategory 
            });
            
            // Track search
            trackSearch(query, results.length);
            selectedIndex = -1;
        }

        // Handle keyboard navigation
        input.addEventListener('keydown', function(e) {
            const items = dropdown.querySelectorAll('.search-result-item, .search-suggestion-item');
            
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
                    const item = items[selectedIndex];
                    if (item.dataset.suggestion) {
                        input.value = item.dataset.suggestion;
                        performSearch(item.dataset.suggestion);
                    } else {
                        addRecentSearch(input.value.trim());
                        item.click();
                    }
                } else if (currentResults.length > 0) {
                    e.preventDefault();
                    addRecentSearch(input.value.trim());
                    const firstResult = dropdown.querySelector('.search-result-item');
                    if (firstResult) firstResult.click();
                }
            } else if (e.key === 'Escape') {
                dropdown.style.display = 'none';
                selectedIndex = -1;
            }
        });

        function updateSelection(items, index) {
            items.forEach((item, i) => {
                item.classList.toggle('selected', i === index);
            });
            if (index >= 0 && items[index]) {
                items[index].scrollIntoView({ block: 'nearest' });
            }
        }

        // Handle clicks in dropdown
        dropdown.addEventListener('click', function(e) {
            // Handle suggestion clicks
            const suggestionItem = e.target.closest('.search-suggestion-item');
            if (suggestionItem) {
                e.preventDefault();
                const suggestion = suggestionItem.dataset.suggestion;
                input.value = suggestion;
                performSearch(suggestion);
                return;
            }

            // Handle category filter clicks
            const filterBtn = e.target.closest('.search-filter-btn');
            if (filterBtn) {
                e.preventDefault();
                currentCategory = filterBtn.dataset.category || null;
                dropdown.querySelectorAll('.search-filter-btn').forEach(btn => btn.classList.remove('active'));
                filterBtn.classList.add('active');
                if (input.value.trim().length >= 2) {
                    performSearch(input.value.trim());
                }
                return;
            }

            // Handle clear recent
            const clearBtn = e.target.closest('.search-clear-recent');
            if (clearBtn) {
                e.preventDefault();
                clearRecentSearches();
                const suggestions = getSuggestions('', services);
                renderResults([], dropdown, { showSuggestions: true, suggestions, categories });
                return;
            }

            // Handle result clicks - add to recent
            const resultItem = e.target.closest('.search-result-item');
            if (resultItem) {
                addRecentSearch(input.value.trim());
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
                selectedIndex = -1;
            }
        });

        // Prevent form submission
        const form = input.closest('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const query = input.value.trim();
                if (query.length >= 2 && currentResults.length > 0) {
                    addRecentSearch(query);
                    let url = currentResults[0].url;
                    if (!url.startsWith('http') && !url.startsWith('/') && !url.startsWith('../') && !url.startsWith('services/')) {
                        if (!window.location.pathname.includes('/services/')) {
                            url = 'services/' + url;
                        }
                    }
                    window.location.href = url;
                }
            });
        }
    }


    // ==================== STYLES ====================

    function addSearchStyles() {
        if (document.getElementById('search-styles-v2')) return;
        
        const styles = document.createElement('style');
        styles.id = 'search-styles-v2';
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
                max-height: 450px;
                overflow-y: auto;
                z-index: 1000;
                display: none;
                margin-top: 8px;
            }
            
            .search-filters {
                display: flex;
                gap: 6px;
                padding: 10px 12px;
                border-bottom: 1px solid #f0f0f0;
                overflow-x: auto;
                flex-wrap: nowrap;
            }
            
            .search-filter-btn {
                padding: 5px 12px;
                border: 1px solid #e0e0e0;
                border-radius: 20px;
                background: #fff;
                font-size: 0.75rem;
                color: #666;
                cursor: pointer;
                white-space: nowrap;
                transition: all 0.15s ease;
            }
            
            .search-filter-btn:hover {
                border-color: #0032a0;
                color: #0032a0;
            }
            
            .search-filter-btn.active {
                background: #0032a0;
                border-color: #0032a0;
                color: #fff;
            }
            
            .search-section {
                border-bottom: 1px solid #f0f0f0;
            }
            
            .search-section:last-child {
                border-bottom: none;
            }
            
            .search-section-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 14px 6px;
                font-size: 0.6875rem;
                font-weight: 600;
                color: #888;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .search-section-header i {
                margin-right: 4px;
            }
            
            .search-clear-recent {
                background: none;
                border: none;
                color: #0032a0;
                font-size: 0.6875rem;
                cursor: pointer;
                padding: 2px 6px;
            }
            
            .search-clear-recent:hover {
                text-decoration: underline;
            }
            
            .search-suggestion-item {
                display: block;
                padding: 10px 14px;
                text-decoration: none;
                color: #333;
                font-size: 0.875rem;
                transition: background 0.15s ease;
            }
            
            .search-suggestion-item i {
                color: #999;
                margin-right: 8px;
                font-size: 0.75rem;
            }
            
            .search-suggestion-item:hover,
            .search-suggestion-item.selected {
                background: #f8f9fa;
                text-decoration: none;
            }
            
            .search-result-item {
                display: block;
                padding: 12px 14px;
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
                font-size: 0.9375rem;
            }
            
            .search-result-title mark {
                background: #fff3cd;
                color: inherit;
                padding: 0 2px;
                border-radius: 2px;
            }
            
            .search-result-meta {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                font-size: 0.75rem;
                margin-bottom: 4px;
            }
            
            .search-result-meta span {
                display: inline-flex;
                align-items: center;
                gap: 4px;
            }
            
            .search-result-meta i {
                font-size: 0.6875rem;
                opacity: 0.7;
            }
            
            .search-result-category {
                color: #666;
            }
            
            .search-result-fee {
                color: #06a77d;
                font-weight: 500;
            }
            
            .search-result-time {
                color: #0066cc;
            }
            
            .search-result-office {
                font-size: 0.75rem;
                color: #888;
                margin-bottom: 4px;
            }
            
            .search-result-office i {
                margin-right: 4px;
                font-size: 0.6875rem;
            }
            
            .search-result-desc {
                font-size: 0.8125rem;
                color: #666;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
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
                display: block;
            }
            
            .search-no-results p {
                margin: 0 0 4px;
                font-weight: 500;
            }
            
            .search-no-results small {
                color: #888;
            }
            
            @media (max-width: 575px) {
                .search-filters {
                    padding: 8px 10px;
                    gap: 4px;
                }
                
                .search-filter-btn {
                    padding: 4px 10px;
                    font-size: 0.6875rem;
                }
                
                .search-result-meta {
                    gap: 8px;
                }
                
                .search-result-item {
                    padding: 10px 12px;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // ==================== INIT ====================

    if (typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', function() {
            addSearchStyles();
            
            const searchInputs = document.querySelectorAll('#service-search, #hero-search, .service-search-input');
            searchInputs.forEach(input => {
                if (input) initSearch(input);
            });
        });
    }

    // ==================== EXPORTS ====================

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { 
            searchServices, 
            getSuggestions, 
            getPopularSearches, 
            getRecentSearches,
            getSearchAnalytics,
            trackSearch
        };
    }
    
    if (typeof window !== 'undefined') {
        window.BetterSolanoSearch = { 
            searchServices, 
            getSuggestions, 
            getPopularSearches, 
            getRecentSearches,
            getSearchAnalytics,
            trackSearch,
            clearRecentSearches
        };
    }
})();
