/**
 * Better Solano - Services Data Validator
 * Validates the structure and content of services.json
 */

/**
 * Required fields for a service entry
 */
const REQUIRED_FIELDS = [
    'id',
    'title',
    'category',
    'categoryId',
    'description',
    'keywords',
    'fee',
    'processingTime',
    'office',
    'url'
];

/**
 * Validates a single service entry has all required fields
 * @param {object} entry - The service entry to validate
 * @returns {{valid: boolean, errors: string[], warnings: string[]}}
 */
function validateServiceEntry(entry) {
    const errors = [];
    const warnings = [];

    if (!entry || typeof entry !== 'object') {
        return { valid: false, errors: ['Entry is not an object'], warnings: [] };
    }

    // Check required fields
    for (const field of REQUIRED_FIELDS) {
        if (!(field in entry)) {
            errors.push(`Missing required field: ${field}`);
        } else if (entry[field] === null || entry[field] === undefined) {
            errors.push(`Field "${field}" is null or undefined`);
        } else if (field !== 'keywords' && typeof entry[field] === 'string' && entry[field].trim() === '') {
            errors.push(`Field "${field}" is empty`);
        }
    }

    // Validate keywords is an array
    if ('keywords' in entry && !Array.isArray(entry.keywords)) {
        errors.push('Field "keywords" must be an array');
    }

    // Validate URL format
    if ('url' in entry && typeof entry.url === 'string') {
        if (!entry.url.endsWith('.html') && !entry.url.startsWith('http')) {
            warnings.push(`URL "${entry.url}" may not be a valid page reference`);
        }
    }

    // Validate id format (should be kebab-case)
    if ('id' in entry && typeof entry.id === 'string') {
        if (!/^[a-z0-9-]+$/.test(entry.id)) {
            warnings.push(`ID "${entry.id}" should be kebab-case (lowercase with hyphens)`);
        }
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Validates the entire services.json structure
 * @param {object} data - The parsed services.json data
 * @returns {{valid: boolean, errors: string[], warnings: string[], entryResults: Array}}
 */
function validateServicesData(data) {
    const errors = [];
    const warnings = [];
    const entryResults = [];

    // Check top-level structure
    if (!data || typeof data !== 'object') {
        return { 
            valid: false, 
            errors: ['Data is not an object'], 
            warnings: [], 
            entryResults: [] 
        };
    }

    if (!('services' in data)) {
        return { 
            valid: false, 
            errors: ['Missing "services" array'], 
            warnings: [], 
            entryResults: [] 
        };
    }

    if (!Array.isArray(data.services)) {
        return { 
            valid: false, 
            errors: ['"services" is not an array'], 
            warnings: [], 
            entryResults: [] 
        };
    }

    if (data.services.length === 0) {
        warnings.push('Services array is empty');
    }

    // Validate each entry
    const seenIds = new Set();
    for (let i = 0; i < data.services.length; i++) {
        const entry = data.services[i];
        const result = validateServiceEntry(entry);
        
        entryResults.push({
            index: i,
            id: entry?.id || `entry-${i}`,
            ...result
        });

        // Check for duplicate IDs
        if (entry?.id) {
            if (seenIds.has(entry.id)) {
                errors.push(`Duplicate service ID: ${entry.id}`);
            }
            seenIds.add(entry.id);
        }

        // Aggregate errors and warnings
        result.errors.forEach(e => errors.push(`Entry ${i} (${entry?.id || 'unknown'}): ${e}`));
        result.warnings.forEach(w => warnings.push(`Entry ${i} (${entry?.id || 'unknown'}): ${w}`));
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
        entryResults
    };
}

/**
 * Validates that service URLs point to existing files
 * @param {Array} services - Array of service entries
 * @param {string} basePath - Base path for resolving URLs
 * @returns {{valid: boolean, brokenUrls: Array}}
 */
function validateServiceUrls(services, basePath = '') {
    const brokenUrls = [];

    // Only works in Node.js environment
    if (typeof require === 'undefined') {
        return { valid: true, brokenUrls: [] };
    }

    const fs = require('fs');
    const path = require('path');

    for (const service of services) {
        if (!service.url) continue;

        // Skip external URLs
        if (service.url.startsWith('http://') || service.url.startsWith('https://')) {
            continue;
        }

        // Resolve the URL relative to services directory
        const servicesDir = path.join(basePath, 'public_html', 'services');
        let resolvedPath;

        if (service.url.startsWith('../')) {
            resolvedPath = path.resolve(servicesDir, service.url);
        } else {
            resolvedPath = path.resolve(servicesDir, service.url);
        }

        const cleanPath = resolvedPath.split('?')[0].split('#')[0];

        if (!fs.existsSync(cleanPath)) {
            brokenUrls.push({
                serviceId: service.id,
                url: service.url,
                resolvedPath: cleanPath
            });
        }
    }

    return {
        valid: brokenUrls.length === 0,
        brokenUrls
    };
}

/**
 * Gets all unique categories from services data
 * @param {Array} services - Array of service entries
 * @returns {Array<{categoryId: string, category: string, count: number}>}
 */
function getServiceCategories(services) {
    const categoryMap = new Map();

    for (const service of services) {
        if (service.categoryId && service.category) {
            if (!categoryMap.has(service.categoryId)) {
                categoryMap.set(service.categoryId, {
                    categoryId: service.categoryId,
                    category: service.category,
                    count: 0
                });
            }
            categoryMap.get(service.categoryId).count++;
        }
    }

    return Array.from(categoryMap.values());
}

// Export for Node.js/testing environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        REQUIRED_FIELDS,
        validateServiceEntry,
        validateServicesData,
        validateServiceUrls,
        getServiceCategories
    };
}
