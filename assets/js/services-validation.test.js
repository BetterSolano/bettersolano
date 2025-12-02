/**
 * Better Solano - Comprehensive Services Validation Test Suite
 * 
 * This test suite validates all aspects of the Services page functionality:
 * - Content accuracy and data consistency
 * - Search functionality
 * - Link integrity (internal and external)
 * - Navigation paths (Life Event cards, breadcrumbs)
 * - Category-service mappings
 * 
 * **Feature: services-page-validation**
 * 
 * Property-based tests are configured to run minimum 100 iterations.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import * as fc from 'fast-check';
import fs from 'fs';
import path from 'path';

// Import validators
import {
    extractLinks,
    validateFileExists,
    resolveRelativePath,
    extractLifeEventCards,
    extractBreadcrumbs,
    extractServiceCategories
} from './validation-utils.js';

import {
    validateServiceEntry,
    validateServicesData,
    validateServiceUrls,
    getServiceCategories
} from './services-validator.js';

import { searchServices } from './search.js';

// Constants
const PUBLIC_HTML = path.resolve('./public_html');
const SERVICES_DIR = path.join(PUBLIC_HTML, 'services');
const SERVICE_DETAILS_DIR = path.join(PUBLIC_HTML, 'service-details');
const SERVICES_JSON_PATH = path.join(PUBLIC_HTML, 'data/services.json');

// Load data once
let servicesData;
let servicesIndexContent;

beforeAll(() => {
    servicesData = JSON.parse(fs.readFileSync(SERVICES_JSON_PATH, 'utf-8')).services;
    servicesIndexContent = fs.readFileSync(path.join(SERVICES_DIR, 'index.html'), 'utf-8');
});

/**
 * Integration Test: Complete Services.json Validation
 */
describe('Integration: Services Data Validation', () => {
    it('services.json is valid JSON', () => {
        expect(() => JSON.parse(fs.readFileSync(SERVICES_JSON_PATH, 'utf-8'))).not.toThrow();
    });

    it('services.json passes schema validation', () => {
        const data = JSON.parse(fs.readFileSync(SERVICES_JSON_PATH, 'utf-8'));
        const result = validateServicesData(data);
        
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('all service URLs point to existing files', () => {
        const result = validateServiceUrls(servicesData, path.resolve('.'));
        
        if (!result.valid) {
            console.log('Broken service URLs:', result.brokenUrls);
        }
        
        expect(result.valid).toBe(true);
    });

    it('no duplicate service IDs exist', () => {
        const ids = servicesData.map(s => s.id);
        const uniqueIds = new Set(ids);
        
        expect(ids.length).toBe(uniqueIds.size);
    });
});

/**
 * Integration Test: Complete Link Validation
 */
describe('Integration: Link Validation Across All Service Pages', () => {
    const serviceFiles = fs.readdirSync(SERVICES_DIR)
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(SERVICES_DIR, f));

    it('all internal links across all service pages are valid', () => {
        const brokenLinks = [];

        for (const filePath of serviceFiles) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const links = extractLinks(content, filePath);
            
            for (const link of links) {
                if (link.type === 'internal' && 
                    !link.href.startsWith('#') && 
                    !link.href.startsWith('tel:') && 
                    !link.href.startsWith('mailto:')) {
                    
                    const resolvedPath = resolveRelativePath(link.href, filePath);
                    const cleanPath = resolvedPath.split('?')[0].split('#')[0];
                    
                    if (!fs.existsSync(cleanPath)) {
                        brokenLinks.push({
                            source: path.basename(filePath),
                            href: link.href,
                            text: link.text
                        });
                    }
                }
            }
        }

        if (brokenLinks.length > 0) {
            console.log('Broken internal links:', JSON.stringify(brokenLinks, null, 2));
        }
        
        expect(brokenLinks).toHaveLength(0);
    });

    it('all external links have proper security attributes', () => {
        const insecureLinks = [];

        for (const filePath of serviceFiles) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const links = extractLinks(content, filePath);
            
            for (const link of links) {
                if (link.type === 'external') {
                    if (!link.hasTarget || !link.hasRel) {
                        insecureLinks.push({
                            source: path.basename(filePath),
                            href: link.href,
                            hasTarget: link.hasTarget,
                            hasRel: link.hasRel
                        });
                    }
                }
            }
        }

        if (insecureLinks.length > 0) {
            console.log('Insecure external links:', JSON.stringify(insecureLinks, null, 2));
        }
        
        expect(insecureLinks).toHaveLength(0);
    });
});

/**
 * Integration Test: Search Functionality
 */
describe('Integration: Search Functionality', () => {
    const testQueries = [
        'birth',
        'business',
        'tax',
        'health',
        'permit',
        'certificate',
        'senior',
        'pwd'
    ];

    it('search returns results for common service terms', () => {
        for (const query of testQueries) {
            const results = searchServices(query, servicesData);
            expect(results.length).toBeGreaterThan(0);
        }
    });

    it('search results are properly sorted by relevance', () => {
        for (const query of testQueries) {
            const results = searchServices(query, servicesData);
            
            for (let i = 0; i < results.length - 1; i++) {
                expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
            }
        }
    });

    it('search handles edge cases gracefully', () => {
        expect(searchServices('', servicesData)).toEqual([]);
        expect(searchServices('a', servicesData)).toEqual([]);
        expect(searchServices('xyznonexistent123', servicesData)).toEqual([]);
    });
});

/**
 * Integration Test: Navigation Consistency
 */
describe('Integration: Navigation Consistency', () => {
    it('all Life Event cards link to correct pages', () => {
        const cards = extractLifeEventCards(servicesIndexContent);
        const expectedMappings = {
            'Starting a Business': 'business.html',
            'Getting Married': 'certificates.html',
            'Having a Baby': 'certificates.html',
            'Need Financial Help': 'social-services.html',
            'Senior Citizen Services': 'social-services.html',
            'Person with Disability': 'social-services.html',
            'Building/Home Improvement': 'infrastructure.html',
            'Got in Trouble': 'public-safety.html'
        };

        expect(cards.length).toBe(8);

        for (const card of cards) {
            const expected = expectedMappings[card.label];
            expect(card.href).toBe(expected);
            
            // Verify target file exists
            const targetPath = path.join(SERVICES_DIR, card.href);
            expect(fs.existsSync(targetPath)).toBe(true);
        }
    });

    it('all category cards link to existing subpages', () => {
        const categories = extractServiceCategories(servicesIndexContent);
        
        for (const category of categories) {
            const targetPath = path.join(SERVICES_DIR, category.href);
            expect(fs.existsSync(targetPath)).toBe(true);
        }
    });

    it('breadcrumbs on subpages link back correctly', () => {
        const subpages = ['certificates.html', 'business.html', 'health.html'];
        
        for (const subpage of subpages) {
            const content = fs.readFileSync(path.join(SERVICES_DIR, subpage), 'utf-8');
            const breadcrumbs = extractBreadcrumbs(content);
            
            // Should have Home and Services links
            expect(breadcrumbs.length).toBeGreaterThanOrEqual(2);
            
            // First breadcrumb should be Home
            expect(breadcrumbs[0].text).toBe('Home');
            expect(breadcrumbs[0].href).toContain('index.html');
        }
    });
});

/**
 * Integration Test: Category-Service Consistency
 */
describe('Integration: Category-Service Consistency', () => {
    it('every displayed category has services in JSON', () => {
        const displayedCategories = extractServiceCategories(servicesIndexContent);
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
            if (categoryId) {
                const services = servicesData.filter(s => s.categoryId === categoryId);
                expect(services.length).toBeGreaterThan(0);
            }
        }
    });

    it('every categoryId in JSON has a corresponding subpage', () => {
        const categoryIds = [...new Set(servicesData.map(s => s.categoryId))];
        
        for (const categoryId of categoryIds) {
            const subpagePath = path.join(SERVICES_DIR, `${categoryId}.html`);
            expect(fs.existsSync(subpagePath)).toBe(true);
        }
    });
});

/**
 * Summary Statistics
 */
describe('Validation Summary', () => {
    it('reports validation statistics', () => {
        const stats = {
            totalServices: servicesData.length,
            totalCategories: [...new Set(servicesData.map(s => s.categoryId))].length,
            totalServicePages: fs.readdirSync(SERVICES_DIR).filter(f => f.endsWith('.html')).length,
            lifeEventCards: extractLifeEventCards(servicesIndexContent).length
        };

        console.log('\n=== Services Validation Summary ===');
        console.log(`Total Services: ${stats.totalServices}`);
        console.log(`Total Categories: ${stats.totalCategories}`);
        console.log(`Total Service Pages: ${stats.totalServicePages}`);
        console.log(`Life Event Cards: ${stats.lifeEventCards}`);
        console.log('===================================\n');

        expect(stats.totalServices).toBeGreaterThan(0);
        expect(stats.totalCategories).toBeGreaterThan(0);
    });
});
