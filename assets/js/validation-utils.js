/**
 * Better Solano - Validation Utilities
 * Utility functions for validating service pages, links, and data
 */

/**
 * Extracts all links (anchor tags) from HTML content
 * @param {string} htmlContent - The HTML content to parse
 * @param {string} sourceFile - The source file path for context
 * @returns {Array<{href: string, text: string, type: 'internal'|'external', hasTarget: boolean, hasRel: boolean, sourceFile: string}>}
 */
function extractLinks(htmlContent, sourceFile = '') {
    const links = [];
    // Match anchor tags with href attributes
    const anchorRegex = /<a\s+([^>]*href\s*=\s*["']([^"']+)["'][^>]*)>([^<]*(?:<[^/a][^<]*)*)<\/a>/gi;
    let match;

    while ((match = anchorRegex.exec(htmlContent)) !== null) {
        const attributes = match[1];
        const href = match[2];
        const text = match[3].replace(/<[^>]+>/g, '').trim();

        // Determine if link is external
        const isExternal = href.startsWith('http://') || 
                          href.startsWith('https://') || 
                          href.startsWith('//');

        // Check for security attributes
        const hasTarget = /target\s*=\s*["']_blank["']/i.test(attributes);
        const hasRel = /rel\s*=\s*["'][^"']*noopener[^"']*noreferrer[^"']*["']/i.test(attributes) ||
                      /rel\s*=\s*["'][^"']*noreferrer[^"']*noopener[^"']*["']/i.test(attributes);

        links.push({
            href,
            text,
            type: isExternal ? 'external' : 'internal',
            hasTarget,
            hasRel,
            sourceFile
        });
    }

    return links;
}

/**
 * Validates if a file exists (for Node.js environment)
 * @param {string} filePath - The file path to check
 * @param {string} basePath - The base path to resolve relative paths
 * @returns {boolean}
 */
function validateFileExists(filePath, basePath = '') {
    // Skip external URLs, anchors, tel:, mailto:, and javascript:
    if (filePath.startsWith('http://') || 
        filePath.startsWith('https://') ||
        filePath.startsWith('//') ||
        filePath.startsWith('#') ||
        filePath.startsWith('tel:') ||
        filePath.startsWith('mailto:') ||
        filePath.startsWith('javascript:')) {
        return true;
    }

    // For browser environment, we can't check file existence
    if (typeof window !== 'undefined') {
        return true;
    }

    // For Node.js environment
    try {
        const fs = require('fs');
        const path = require('path');
        
        // Remove query strings and anchors
        const cleanPath = filePath.split('?')[0].split('#')[0];
        
        // Resolve the full path
        const fullPath = path.resolve(basePath, cleanPath);
        
        return fs.existsSync(fullPath);
    } catch (e) {
        return false;
    }
}

/**
 * Resolves a relative URL path from a source file location
 * @param {string} href - The href to resolve
 * @param {string} sourceFile - The source file path
 * @returns {string} - The resolved path
 */
function resolveRelativePath(href, sourceFile) {
    // Skip non-relative paths
    if (href.startsWith('http://') || 
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('#') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:')) {
        return href;
    }

    // For Node.js environment
    if (typeof require !== 'undefined') {
        const path = require('path');
        const sourceDir = path.dirname(sourceFile);
        return path.normalize(path.join(sourceDir, href));
    }

    // Simple resolution for browser
    const sourceParts = sourceFile.split('/');
    sourceParts.pop(); // Remove filename
    
    const hrefParts = href.split('/');
    
    for (const part of hrefParts) {
        if (part === '..') {
            sourceParts.pop();
        } else if (part !== '.') {
            sourceParts.push(part);
        }
    }
    
    return sourceParts.join('/');
}

/**
 * Extracts Life Event cards from the services index page
 * @param {string} htmlContent - The HTML content of the services index page
 * @returns {Array<{label: string, href: string}>}
 */
function extractLifeEventCards(htmlContent) {
    const cards = [];
    
    // Find the Browse by Life Event section
    const sectionMatch = htmlContent.match(/Browse by Life Event[\s\S]*?<\/section>/i);
    if (!sectionMatch) return cards;
    
    const sectionContent = sectionMatch[0];
    
    // Extract card links with their labels
    const cardRegex = /<a\s+href=["']([^"']+)["'][^>]*class=["'][^"']*card[^"']*["'][^>]*>[\s\S]*?<h4[^>]*>([^<]+)<\/h4>[\s\S]*?<\/a>/gi;
    let match;
    
    while ((match = cardRegex.exec(sectionContent)) !== null) {
        cards.push({
            href: match[1],
            label: match[2].trim()
        });
    }
    
    return cards;
}

/**
 * Extracts breadcrumb links from HTML content
 * @param {string} htmlContent - The HTML content to parse
 * @returns {Array<{text: string, href: string|null}>}
 */
function extractBreadcrumbs(htmlContent) {
    const breadcrumbs = [];
    
    // Find breadcrumb navigation
    const navMatch = htmlContent.match(/<nav[^>]*class=["'][^"']*breadcrumbs[^"']*["'][^>]*>([\s\S]*?)<\/nav>/i);
    if (!navMatch) return breadcrumbs;
    
    const navContent = navMatch[1];
    
    // Extract links
    const linkRegex = /<a\s+href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi;
    let match;
    
    while ((match = linkRegex.exec(navContent)) !== null) {
        breadcrumbs.push({
            href: match[1],
            text: match[2].trim()
        });
    }
    
    // Extract current page (span without link)
    const currentMatch = navContent.match(/<span[^>]*aria-current=["']page["'][^>]*>([^<]+)<\/span>/i);
    if (currentMatch) {
        breadcrumbs.push({
            href: null,
            text: currentMatch[1].trim()
        });
    }
    
    return breadcrumbs;
}

/**
 * Extracts service categories from the services index page
 * @param {string} htmlContent - The HTML content of the services index page
 * @returns {Array<{title: string, href: string}>}
 */
function extractServiceCategories(htmlContent) {
    const categories = [];
    
    // Find category cards with View All buttons
    const cardRegex = /<div\s+class=["']card["'][^>]*>[\s\S]*?<h3[^>]*>([^<]+)<\/h3>[\s\S]*?<a\s+href=["']([^"']+)["'][^>]*class=["'][^"']*btn[^"']*["'][^>]*>/gi;
    let match;
    
    while ((match = cardRegex.exec(htmlContent)) !== null) {
        categories.push({
            title: match[1].trim(),
            href: match[2]
        });
    }
    
    return categories;
}

// Export for Node.js/testing environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        extractLinks,
        validateFileExists,
        resolveRelativePath,
        extractLifeEventCards,
        extractBreadcrumbs,
        extractServiceCategories
    };
}
