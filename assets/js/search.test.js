/**
 * Better Solano - Search Functionality Tests
 * Property-based and unit tests for search functionality
 * 
 * **Feature: services-page-validation**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { searchServices } from './search.js';
import fs from 'fs';
import path from 'path';

const SERVICES_JSON_PATH = path.resolve('./public_html/data/services.json');
const servicesData = JSON.parse(fs.readFileSync(SERVICES_JSON_PATH, 'utf-8')).services;

/**
 * **Feature: services-page-validation, Property 2: Search Results Match Query Terms**
 * **Validates: Requirements 2.2**
 * 
 * For any search query of 2+ characters and any returned search result, 
 * the result SHALL contain the query term in at least one of: title, category, description, or keywords array.
 */
describe('Property 2: Search Results Match Query Terms', () => {
    it('all search results contain the query term in searchable fields', () => {
        // Test with known terms from the services data
        const testQueries = ['birth', 'business', 'tax', 'health', 'permit', 'certificate'];
        
        for (const query of testQueries) {
            const results = searchServices(query, servicesData);
            
            for (const result of results) {
                const titleLower = result.title.toLowerCase();
                const categoryLower = result.category.toLowerCase();
                const descLower = (result.description || '').toLowerCase();
                const keywords = (result.keywords || []).map(k => k.toLowerCase());
                
                const queryLower = query.toLowerCase();
                const matchFound = 
                    titleLower.includes(queryLower) ||
                    categoryLower.includes(queryLower) ||
                    descLower.includes(queryLower) ||
                    keywords.some(k => k.includes(queryLower));
                
                expect(matchFound).toBe(true);
            }
        }
    });

    it('property: search results always contain query term', () => {
        // Generate search queries from actual service data
        const queryArb = fc.constantFrom(
            ...servicesData.flatMap(s => [
                s.title.split(' ')[0],
                s.category.split(' ')[0],
                ...(s.keywords || []).slice(0, 2)
            ]).filter(q => q && q.length >= 2)
        );

        fc.assert(
            fc.property(queryArb, (query) => {
                const results = searchServices(query, servicesData);
                
                // All results should contain the query term somewhere
                for (const result of results) {
                    const queryLower = query.toLowerCase();
                    const titleLower = result.title.toLowerCase();
                    const categoryLower = result.category.toLowerCase();
                    const descLower = (result.description || '').toLowerCase();
                    const keywords = (result.keywords || []).map(k => k.toLowerCase());
                    
                    const matchFound = 
                        titleLower.includes(queryLower) ||
                        categoryLower.includes(queryLower) ||
                        descLower.includes(queryLower) ||
                        keywords.some(k => k.includes(queryLower));
                    
                    if (!matchFound) return false;
                }
                return true;
            }),
            { numRuns: 100 }
        );
    });
});

/**
 * **Feature: services-page-validation, Property 3: Search Results Sorted by Relevance**
 * **Validates: Requirements 2.3**
 * 
 * For any search query that returns multiple results, the results SHALL be sorted 
 * in descending order by relevance score.
 */
describe('Property 3: Search Results Sorted by Relevance', () => {
    it('search results are sorted by score descending', () => {
        const testQueries = ['certificate', 'business', 'tax'];
        
        for (const query of testQueries) {
            const results = searchServices(query, servicesData);
            
            if (results.length > 1) {
                for (let i = 0; i < results.length - 1; i++) {
                    expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
                }
            }
        }
    });

    it('property: results are always sorted by score descending', () => {
        const queryArb = fc.constantFrom(
            ...servicesData.flatMap(s => [
                s.title.split(' ')[0],
                s.category.split(' ')[0]
            ]).filter(q => q && q.length >= 2)
        );

        fc.assert(
            fc.property(queryArb, (query) => {
                const results = searchServices(query, servicesData);
                
                // Check sorting
                for (let i = 0; i < results.length - 1; i++) {
                    if (results[i].score < results[i + 1].score) {
                        return false;
                    }
                }
                return true;
            }),
            { numRuns: 100 }
        );
    });

    it('exact title matches score higher than partial matches', () => {
        // Create test data with exact and partial matches
        const testServices = [
            { id: 'tax', title: 'Tax', category: 'Taxation', keywords: [], description: '' },
            { id: 'tax-clearance', title: 'Tax Clearance', category: 'Taxation', keywords: ['tax'], description: '' },
            { id: 'property-tax', title: 'Property Tax', category: 'Taxation', keywords: [], description: 'Pay your tax' }
        ];
        
        const results = searchServices('tax', testServices);
        
        // The exact match "Tax" should be first
        expect(results[0].title).toBe('Tax');
    });
});

/**
 * **Feature: services-page-validation, Property 4: Search Result URLs Match Service Data**
 * **Validates: Requirements 2.4**
 * 
 * For any search result returned by the Search_System, the result's URL 
 * SHALL exactly match the URL field of the corresponding service entry.
 */
describe('Property 4: Search Result URLs Match Service Data', () => {
    it('search result URLs match original service URLs', () => {
        const testQueries = ['birth', 'business', 'senior'];
        
        for (const query of testQueries) {
            const results = searchServices(query, servicesData);
            
            for (const result of results) {
                // Find the original service
                const original = servicesData.find(s => s.id === result.id);
                expect(original).toBeDefined();
                expect(result.url).toBe(original.url);
            }
        }
    });

    it('property: all search result URLs match service data URLs', () => {
        const queryArb = fc.constantFrom(
            ...servicesData.flatMap(s => s.keywords || []).filter(k => k && k.length >= 2)
        );

        fc.assert(
            fc.property(queryArb, (query) => {
                const results = searchServices(query, servicesData);
                
                for (const result of results) {
                    const original = servicesData.find(s => s.id === result.id);
                    if (!original || result.url !== original.url) {
                        return false;
                    }
                }
                return true;
            }),
            { numRuns: 100 }
        );
    });
});

describe('searchServices', () => {
    it('returns empty array for empty query', () => {
        const results = searchServices('', servicesData);
        expect(results).toEqual([]);
    });

    it('returns empty array for single character query', () => {
        const results = searchServices('a', servicesData);
        expect(results).toEqual([]);
    });

    it('returns results for valid query', () => {
        const results = searchServices('birth', servicesData);
        expect(results.length).toBeGreaterThan(0);
    });

    it('limits results to 10', () => {
        // Use a broad query that might match many services
        const results = searchServices('service', servicesData);
        expect(results.length).toBeLessThanOrEqual(10);
    });

    it('includes score in results', () => {
        const results = searchServices('certificate', servicesData);
        for (const result of results) {
            expect(result.score).toBeDefined();
            expect(result.score).toBeGreaterThan(0);
        }
    });

    it('handles multi-word queries', () => {
        const results = searchServices('birth certificate', servicesData);
        expect(results.length).toBeGreaterThan(0);
        
        // First result should be birth certificate
        expect(results[0].title.toLowerCase()).toContain('birth');
    });

    it('returns empty array for non-matching query', () => {
        const results = searchServices('xyznonexistent', servicesData);
        expect(results).toEqual([]);
    });
});
