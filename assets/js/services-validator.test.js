/**
 * Better Solano - Services Validator Tests
 * Property-based and unit tests for services data validation
 * 
 * **Feature: services-page-validation**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
    REQUIRED_FIELDS,
    validateServiceEntry,
    validateServicesData,
    validateServiceUrls,
    getServiceCategories
} from './services-validator.js';
import fs from 'fs';
import path from 'path';

const SERVICES_JSON_PATH = path.resolve('./public_html/data/services.json');

/**
 * **Feature: services-page-validation, Property 1: Service Data Schema Completeness**
 * **Validates: Requirements 1.3**
 * 
 * For any service entry in the Services_Data, the entry SHALL contain all required fields.
 */
describe('Property 1: Service Data Schema Completeness', () => {
    it('all services in services.json have required fields', () => {
        const data = JSON.parse(fs.readFileSync(SERVICES_JSON_PATH, 'utf-8'));
        const result = validateServicesData(data);
        
        if (!result.valid) {
            console.log('Validation errors:', result.errors);
        }
        
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('property: valid service entries pass validation', () => {
        // Generate valid service entries with non-whitespace strings
        const nonEmptyStringArb = fc.stringOf(
            fc.constantFrom(...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 '.split('')),
            { minLength: 3, maxLength: 50 }
        ).filter(s => s.trim().length > 0);

        const validServiceArb = fc.record({
            id: fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789-'.split('')), { minLength: 3, maxLength: 30 }),
            title: nonEmptyStringArb,
            category: nonEmptyStringArb,
            categoryId: fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz-'.split('')), { minLength: 3, maxLength: 30 }),
            description: nonEmptyStringArb,
            keywords: fc.array(nonEmptyStringArb, { minLength: 1, maxLength: 10 }),
            fee: nonEmptyStringArb,
            processingTime: nonEmptyStringArb,
            office: nonEmptyStringArb,
            url: fc.constantFrom('certificates.html', 'business.html', 'health.html', '../service-details/birth-certificate.html')
        });

        fc.assert(
            fc.property(validServiceArb, (service) => {
                const result = validateServiceEntry(service);
                return result.valid === true;
            }),
            { numRuns: 100 }
        );
    });

    it('property: entries missing required fields fail validation', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...REQUIRED_FIELDS),
                (fieldToRemove) => {
                    const service = {
                        id: 'test-service',
                        title: 'Test Service',
                        category: 'Test Category',
                        categoryId: 'test',
                        description: 'Test description',
                        keywords: ['test'],
                        fee: '₱100',
                        processingTime: '1 day',
                        office: 'Test Office',
                        url: 'test.html'
                    };
                    
                    // Remove one required field
                    delete service[fieldToRemove];
                    
                    const result = validateServiceEntry(service);
                    return result.valid === false && 
                           result.errors.some(e => e.includes(fieldToRemove));
                }
            ),
            { numRuns: 100 }
        );
    });
});

/**
 * **Feature: services-page-validation, Property 8: Services Data Round-Trip Consistency**
 * **Validates: Requirements 6.4**
 * 
 * For any valid Services_Data object, serializing to JSON and deserializing back 
 * SHALL produce a data structure that is deeply equal to the original.
 */
describe('Property 8: Services Data Round-Trip Consistency', () => {
    it('services.json round-trip produces equivalent data', () => {
        const original = JSON.parse(fs.readFileSync(SERVICES_JSON_PATH, 'utf-8'));
        const serialized = JSON.stringify(original);
        const deserialized = JSON.parse(serialized);
        
        expect(deserialized).toEqual(original);
    });

    it('property: any valid services data survives round-trip', () => {
        const serviceArb = fc.record({
            id: fc.string({ minLength: 1, maxLength: 30 }),
            title: fc.string({ minLength: 1, maxLength: 100 }),
            category: fc.string({ minLength: 1, maxLength: 100 }),
            categoryId: fc.string({ minLength: 1, maxLength: 30 }),
            description: fc.string({ minLength: 0, maxLength: 500 }),
            keywords: fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 0, maxLength: 10 }),
            fee: fc.string({ minLength: 1, maxLength: 50 }),
            processingTime: fc.string({ minLength: 1, maxLength: 50 }),
            office: fc.string({ minLength: 1, maxLength: 100 }),
            url: fc.string({ minLength: 1, maxLength: 100 })
        });

        const servicesDataArb = fc.record({
            services: fc.array(serviceArb, { minLength: 0, maxLength: 20 })
        });

        fc.assert(
            fc.property(servicesDataArb, (data) => {
                const serialized = JSON.stringify(data);
                const deserialized = JSON.parse(serialized);
                return JSON.stringify(deserialized) === JSON.stringify(data);
            }),
            { numRuns: 100 }
        );
    });
});

describe('validateServiceEntry', () => {
    it('validates a complete service entry', () => {
        const service = {
            id: 'birth-certificate',
            title: 'Birth Certificate',
            category: 'Certificates & Vital Records',
            categoryId: 'certificates',
            description: 'Get a certified copy of birth certificate',
            keywords: ['birth', 'certificate'],
            fee: '₱150',
            processingTime: '15-30 minutes',
            office: 'Local Civil Registrar',
            url: '../service-details/birth-certificate.html'
        };
        
        const result = validateServiceEntry(service);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('rejects entry with missing fields', () => {
        const service = {
            id: 'test',
            title: 'Test'
            // Missing other required fields
        };
        
        const result = validateServiceEntry(service);
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
    });

    it('rejects entry with empty required fields', () => {
        const service = {
            id: '',
            title: 'Test',
            category: 'Test',
            categoryId: 'test',
            description: 'Test',
            keywords: [],
            fee: 'Free',
            processingTime: '1 day',
            office: 'Test',
            url: 'test.html'
        };
        
        const result = validateServiceEntry(service);
        expect(result.valid).toBe(false);
    });

    it('rejects non-array keywords', () => {
        const service = {
            id: 'test',
            title: 'Test',
            category: 'Test',
            categoryId: 'test',
            description: 'Test',
            keywords: 'not-an-array',
            fee: 'Free',
            processingTime: '1 day',
            office: 'Test',
            url: 'test.html'
        };
        
        const result = validateServiceEntry(service);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Field "keywords" must be an array');
    });
});

describe('validateServicesData', () => {
    it('validates the actual services.json file', () => {
        const data = JSON.parse(fs.readFileSync(SERVICES_JSON_PATH, 'utf-8'));
        const result = validateServicesData(data);
        
        expect(result.valid).toBe(true);
    });

    it('rejects data without services array', () => {
        const result = validateServicesData({});
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Missing "services" array');
    });

    it('detects duplicate service IDs', () => {
        const data = {
            services: [
                { id: 'duplicate', title: 'First', category: 'Test', categoryId: 'test', description: 'Test', keywords: [], fee: 'Free', processingTime: '1 day', office: 'Test', url: 'test.html' },
                { id: 'duplicate', title: 'Second', category: 'Test', categoryId: 'test', description: 'Test', keywords: [], fee: 'Free', processingTime: '1 day', office: 'Test', url: 'test.html' }
            ]
        };
        
        const result = validateServicesData(data);
        expect(result.errors.some(e => e.includes('Duplicate'))).toBe(true);
    });
});

describe('validateServiceUrls', () => {
    it('validates URLs in actual services.json', () => {
        const data = JSON.parse(fs.readFileSync(SERVICES_JSON_PATH, 'utf-8'));
        const result = validateServiceUrls(data.services, path.resolve('.'));
        
        if (!result.valid) {
            console.log('Broken URLs:', result.brokenUrls);
        }
        
        expect(result.valid).toBe(true);
    });
});

describe('getServiceCategories', () => {
    it('extracts unique categories from services', () => {
        const data = JSON.parse(fs.readFileSync(SERVICES_JSON_PATH, 'utf-8'));
        const categories = getServiceCategories(data.services);
        
        expect(categories.length).toBeGreaterThan(0);
        
        // Each category should have a count
        for (const cat of categories) {
            expect(cat.count).toBeGreaterThan(0);
            expect(cat.categoryId).toBeTruthy();
            expect(cat.category).toBeTruthy();
        }
    });
});
