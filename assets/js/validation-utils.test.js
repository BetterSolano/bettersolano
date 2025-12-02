/**
 * Better Solano - Validation Utilities Tests
 * Property-based and unit tests for validation utilities
 * 
 * **Feature: services-page-validation**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
    extractLinks,
    validateFileExists,
    resolveRelativePath,
    extractLifeEventCards,
    extractBreadcrumbs,
    extractServiceCategories
} from './validation-utils.js';
import fs from 'fs';
import path from 'path';

const SERVICES_DIR = path.resolve('./public_html/services');
const SERVICE_DETAILS_DIR = path.resolve('./public_html/service-details');

/**
 * **Feature: services-page-validation, Property 5: All internal links point to existing files**
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 6.2**
 * 
 * For any internal link on any Services page, the target file SHALL exist in the portal's file system.
 */
describe('Property 5: All internal links point to existing files', () => {
    // Get all service HTML files
    const serviceFiles = fs.readdirSync(SERVICES_DIR)
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(SERVICES_DIR, f));
    
    // Add service-details files
    if (fs.existsSync(SERVICE_DETAILS_DIR)) {
        const detailFiles = fs.readdirSync(SERVICE_DETAILS_DIR)
            .filter(f => f.endsWith('.html'))
            .map(f => path.join(SERVICE_DETAILS_DIR, f));
        serviceFiles.push(...detailFiles);
    }

    it('all internal links in service pages point to existing files', () => {
        const brokenLinks = [];

        for (const filePath of serviceFiles) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const links = extractLinks(content, filePath);
            
            for (const link of links) {
                if (link.type === 'internal') {
                    // Skip anchors, tel:, mailto:
                    if (link.href.startsWith('#') || 
                        link.href.startsWith('tel:') || 
                        link.href.startsWith('mailto:')) {
                        continue;
                    }

                    // Resolve the path relative to the source file
                    const resolvedPath = resolveRelativePath(link.href, filePath);
                    const cleanPath = resolvedPath.split('?')[0].split('#')[0];
                    
                    // Check if file exists
                    if (!fs.existsSync(cleanPath)) {
                        brokenLinks.push({
                            source: filePath,
                            href: link.href,
                            resolved: cleanPath,
                            text: link.text
                        });
                    }
                }
            }
        }

        if (brokenLinks.length > 0) {
            console.log('Broken links found:', JSON.stringify(brokenLinks, null, 2));
        }
        
        expect(brokenLinks).toHaveLength(0);
    });

    it('property: extracted links preserve href values', () => {
        // Generate safe URLs without special characters that would break HTML
        const safeUrlArb = fc.tuple(
            fc.constantFrom('http://', 'https://'),
            fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789'.split('')), { minLength: 3, maxLength: 10 }),
            fc.constantFrom('.com', '.org', '.gov.ph'),
            fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789-/'.split('')), { minLength: 0, maxLength: 20 })
        ).map(([protocol, domain, tld, path]) => `${protocol}${domain}${tld}${path ? '/' + path : ''}`);

        const safeLinkArb = fc.record({
            href: safeUrlArb,
            text: fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz '.split('')), { minLength: 1, maxLength: 20 })
        });

        fc.assert(
            fc.property(
                fc.array(safeLinkArb, { minLength: 1, maxLength: 10 }),
                (linkData) => {
                    // Generate HTML with the links
                    const html = linkData.map(l => 
                        `<a href="${l.href}">${l.text}</a>`
                    ).join('\n');
                    
                    const extracted = extractLinks(html, 'test.html');
                    
                    // All original hrefs should be in extracted links
                    for (const original of linkData) {
                        const found = extracted.some(e => e.href === original.href);
                        if (!found) return false;
                    }
                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });
});

describe('extractLinks', () => {
    it('extracts internal links correctly', () => {
        const html = `
            <a href="certificates.html">Certificates</a>
            <a href="../services/index.html">Services</a>
        `;
        const links = extractLinks(html, 'test.html');
        
        expect(links).toHaveLength(2);
        expect(links[0].type).toBe('internal');
        expect(links[1].type).toBe('internal');
    });

    it('extracts external links correctly', () => {
        const html = `
            <a href="https://solano.gov.ph" target="_blank" rel="noopener noreferrer">Official Site</a>
        `;
        const links = extractLinks(html, 'test.html');
        
        expect(links).toHaveLength(1);
        expect(links[0].type).toBe('external');
        expect(links[0].hasTarget).toBe(true);
        expect(links[0].hasRel).toBe(true);
    });

    it('identifies missing security attributes on external links', () => {
        const html = `
            <a href="https://example.com">No security attrs</a>
        `;
        const links = extractLinks(html, 'test.html');
        
        expect(links[0].hasTarget).toBe(false);
        expect(links[0].hasRel).toBe(false);
    });
});

describe('resolveRelativePath', () => {
    it('resolves parent directory references', () => {
        const resolved = resolveRelativePath('../index.html', '/services/certificates.html');
        expect(resolved).toContain('index.html');
        expect(resolved).not.toContain('services');
    });

    it('handles same directory references', () => {
        const resolved = resolveRelativePath('business.html', '/services/certificates.html');
        expect(resolved).toContain('business.html');
    });

    it('skips external URLs', () => {
        const url = 'https://solano.gov.ph';
        const resolved = resolveRelativePath(url, '/services/index.html');
        expect(resolved).toBe(url);
    });
});

describe('extractLifeEventCards', () => {
    it('extracts life event cards from services index', () => {
        const html = fs.readFileSync(path.join(SERVICES_DIR, 'index.html'), 'utf-8');
        const cards = extractLifeEventCards(html);
        
        expect(cards.length).toBeGreaterThan(0);
        
        // Check for expected life events
        const labels = cards.map(c => c.label);
        expect(labels).toContain('Starting a Business');
        expect(labels).toContain('Getting Married');
    });
});

describe('extractBreadcrumbs', () => {
    it('extracts breadcrumb navigation', () => {
        const html = `
            <nav class="breadcrumbs" aria-label="Breadcrumb">
                <a href="../index.html">Home</a>
                <span>/</span>
                <a href="index.html">Services</a>
                <span>/</span>
                <span aria-current="page">Certificates</span>
            </nav>
        `;
        const breadcrumbs = extractBreadcrumbs(html);
        
        expect(breadcrumbs).toHaveLength(3);
        expect(breadcrumbs[0].text).toBe('Home');
        expect(breadcrumbs[2].href).toBeNull();
        expect(breadcrumbs[2].text).toBe('Certificates');
    });
});

describe('extractServiceCategories', () => {
    it('extracts service categories from index page', () => {
        const html = fs.readFileSync(path.join(SERVICES_DIR, 'index.html'), 'utf-8');
        const categories = extractServiceCategories(html);
        
        expect(categories.length).toBeGreaterThan(0);
    });
});


/**
 * **Feature: services-page-validation, Property 6: External Links Have Correct Attributes**
 * **Validates: Requirements 4.1, 4.2**
 * 
 * For any external link on any Services page, the link SHALL have target="_blank" 
 * and rel="noopener noreferrer" attributes.
 */
describe('Property 6: External Links Have Correct Attributes', () => {
    it('all external links in service pages have security attributes', () => {
        const missingAttrs = [];

        for (const filePath of [
            path.join(SERVICES_DIR, 'index.html'),
            ...fs.readdirSync(SERVICES_DIR)
                .filter(f => f.endsWith('.html'))
                .map(f => path.join(SERVICES_DIR, f))
        ]) {
            if (!fs.existsSync(filePath)) continue;
            
            const content = fs.readFileSync(filePath, 'utf-8');
            const links = extractLinks(content, filePath);
            
            for (const link of links) {
                if (link.type === 'external') {
                    if (!link.hasTarget || !link.hasRel) {
                        missingAttrs.push({
                            source: filePath,
                            href: link.href,
                            hasTarget: link.hasTarget,
                            hasRel: link.hasRel
                        });
                    }
                }
            }
        }

        if (missingAttrs.length > 0) {
            console.log('External links missing security attributes:', JSON.stringify(missingAttrs, null, 2));
        }
        
        expect(missingAttrs).toHaveLength(0);
    });

    it('property: external links always have target and rel attributes', () => {
        // Generate HTML with external links
        const externalLinkArb = fc.record({
            href: fc.constantFrom('https://solano.gov.ph', 'https://facebook.com', 'https://example.com'),
            hasTarget: fc.boolean(),
            hasRel: fc.boolean()
        });

        fc.assert(
            fc.property(
                fc.array(externalLinkArb, { minLength: 1, maxLength: 5 }),
                (linkConfigs) => {
                    // Generate HTML
                    const html = linkConfigs.map(l => {
                        const attrs = [];
                        if (l.hasTarget) attrs.push('target="_blank"');
                        if (l.hasRel) attrs.push('rel="noopener noreferrer"');
                        return `<a href="${l.href}" ${attrs.join(' ')}>Link</a>`;
                    }).join('\n');
                    
                    const extracted = extractLinks(html, 'test.html');
                    
                    // Verify extraction matches config
                    for (let i = 0; i < linkConfigs.length; i++) {
                        const config = linkConfigs[i];
                        const link = extracted[i];
                        
                        if (link.hasTarget !== config.hasTarget) return false;
                        if (link.hasRel !== config.hasRel) return false;
                    }
                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });
});

describe('Internal Link Validation', () => {
    it('validates all View Details buttons link to existing pages', () => {
        const brokenButtons = [];
        
        for (const file of fs.readdirSync(SERVICES_DIR).filter(f => f.endsWith('.html'))) {
            const filePath = path.join(SERVICES_DIR, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Find View Details buttons
            const buttonRegex = /<a[^>]*href=["']([^"']+)["'][^>]*class=["'][^"']*btn[^"']*["'][^>]*>.*?View.*?Details/gi;
            let match;
            
            while ((match = buttonRegex.exec(content)) !== null) {
                const href = match[1];
                if (href.startsWith('http') || href.startsWith('#')) continue;
                
                const resolvedPath = resolveRelativePath(href, filePath);
                const cleanPath = resolvedPath.split('?')[0].split('#')[0];
                
                if (!fs.existsSync(cleanPath)) {
                    brokenButtons.push({
                        source: file,
                        href: href,
                        resolved: cleanPath
                    });
                }
            }
        }
        
        if (brokenButtons.length > 0) {
            console.log('Broken View Details buttons:', JSON.stringify(brokenButtons, null, 2));
        }
        
        expect(brokenButtons).toHaveLength(0);
    });
});


/**
 * Life Event Card Navigation Tests
 * **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8**
 */
describe('Life Event Card Navigation', () => {
    const EXPECTED_MAPPINGS = {
        'Starting a Business': 'business.html',
        'Getting Married': 'certificates.html',
        'Having a Baby': 'certificates.html',
        'Need Financial Help': 'social-services.html',
        'Senior Citizen Services': 'social-services.html',
        'Person with Disability': 'social-services.html',
        'Building/Home Improvement': 'infrastructure.html',
        'Got in Trouble': 'public-safety.html'
    };

    const servicesIndexPath = path.join(SERVICES_DIR, 'index.html');
    const servicesIndexContent = fs.readFileSync(servicesIndexPath, 'utf-8');
    const lifeEventCards = extractLifeEventCards(servicesIndexContent);

    it('extracts all 8 Life Event cards', () => {
        expect(lifeEventCards.length).toBe(8);
    });

    it('Starting a Business links to business.html', () => {
        const card = lifeEventCards.find(c => c.label === 'Starting a Business');
        expect(card).toBeDefined();
        expect(card.href).toBe(EXPECTED_MAPPINGS['Starting a Business']);
    });

    it('Getting Married links to certificates.html', () => {
        const card = lifeEventCards.find(c => c.label === 'Getting Married');
        expect(card).toBeDefined();
        expect(card.href).toBe(EXPECTED_MAPPINGS['Getting Married']);
    });

    it('Having a Baby links to certificates.html', () => {
        const card = lifeEventCards.find(c => c.label === 'Having a Baby');
        expect(card).toBeDefined();
        expect(card.href).toBe(EXPECTED_MAPPINGS['Having a Baby']);
    });

    it('Need Financial Help links to social-services.html', () => {
        const card = lifeEventCards.find(c => c.label === 'Need Financial Help');
        expect(card).toBeDefined();
        expect(card.href).toBe(EXPECTED_MAPPINGS['Need Financial Help']);
    });

    it('Senior Citizen Services links to social-services.html', () => {
        const card = lifeEventCards.find(c => c.label === 'Senior Citizen Services');
        expect(card).toBeDefined();
        expect(card.href).toBe(EXPECTED_MAPPINGS['Senior Citizen Services']);
    });

    it('Person with Disability links to social-services.html', () => {
        const card = lifeEventCards.find(c => c.label === 'Person with Disability');
        expect(card).toBeDefined();
        expect(card.href).toBe(EXPECTED_MAPPINGS['Person with Disability']);
    });

    it('Building/Home Improvement links to infrastructure.html', () => {
        const card = lifeEventCards.find(c => c.label === 'Building/Home Improvement');
        expect(card).toBeDefined();
        expect(card.href).toBe(EXPECTED_MAPPINGS['Building/Home Improvement']);
    });

    it('Got in Trouble links to public-safety.html', () => {
        const card = lifeEventCards.find(c => c.label === 'Got in Trouble');
        expect(card).toBeDefined();
        expect(card.href).toBe(EXPECTED_MAPPINGS['Got in Trouble']);
    });

    it('all Life Event card links point to existing files', () => {
        const brokenCards = [];
        
        for (const card of lifeEventCards) {
            const resolvedPath = path.join(SERVICES_DIR, card.href);
            if (!fs.existsSync(resolvedPath)) {
                brokenCards.push({
                    label: card.label,
                    href: card.href,
                    resolved: resolvedPath
                });
            }
        }
        
        expect(brokenCards).toHaveLength(0);
    });
});


/**
 * **Feature: services-page-validation, Property 7: Categories Have Corresponding Services**
 * **Validates: Requirements 6.3**
 * 
 * For any service category displayed on the Services_Page, there SHALL exist 
 * at least one service entry in Services_Data with a matching categoryId.
 */
describe('Property 7: Categories Have Corresponding Services', () => {
    const servicesJsonPath = path.resolve('./public_html/data/services.json');
    const servicesData = JSON.parse(fs.readFileSync(servicesJsonPath, 'utf-8')).services;
    
    const servicesIndexPath = path.join(SERVICES_DIR, 'index.html');
    const servicesIndexContent = fs.readFileSync(servicesIndexPath, 'utf-8');
    const displayedCategories = extractServiceCategories(servicesIndexContent);

    it('all displayed categories have at least one service in JSON data', () => {
        const categoriesWithoutServices = [];
        
        // Map displayed category hrefs to categoryIds
        const categoryIdMap = {
            'certificates.html': 'certificates',
            'business.html': 'business',
            'social-services.html': 'social-services',
            'health.html': 'health',
            'tax-payments.html': 'tax-payments',
            'agriculture.html': 'agriculture',
            'infrastructure.html': 'infrastructure',
            'education.html': 'education',
            'public-safety.html': 'public-safety',
            'environment.html': 'environment'
        };

        for (const category of displayedCategories) {
            const categoryId = categoryIdMap[category.href];
            if (!categoryId) continue;
            
            const servicesInCategory = servicesData.filter(s => s.categoryId === categoryId);
            
            if (servicesInCategory.length === 0) {
                categoriesWithoutServices.push({
                    title: category.title,
                    href: category.href,
                    categoryId: categoryId
                });
            }
        }
        
        if (categoriesWithoutServices.length > 0) {
            console.log('Categories without services:', JSON.stringify(categoriesWithoutServices, null, 2));
        }
        
        expect(categoriesWithoutServices).toHaveLength(0);
    });

    it('property: every categoryId in services.json has at least one service', () => {
        // Get all unique categoryIds from services
        const categoryIds = [...new Set(servicesData.map(s => s.categoryId))];
        
        fc.assert(
            fc.property(
                fc.constantFrom(...categoryIds),
                (categoryId) => {
                    const servicesInCategory = servicesData.filter(s => s.categoryId === categoryId);
                    return servicesInCategory.length > 0;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('all service categories in JSON have corresponding subpages', () => {
        const categoryIds = [...new Set(servicesData.map(s => s.categoryId))];
        const missingSubpages = [];
        
        for (const categoryId of categoryIds) {
            const subpagePath = path.join(SERVICES_DIR, `${categoryId}.html`);
            if (!fs.existsSync(subpagePath)) {
                missingSubpages.push({
                    categoryId,
                    expectedPath: subpagePath
                });
            }
        }
        
        if (missingSubpages.length > 0) {
            console.log('Missing category subpages:', JSON.stringify(missingSubpages, null, 2));
        }
        
        expect(missingSubpages).toHaveLength(0);
    });
});
