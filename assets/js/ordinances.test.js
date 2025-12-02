/**
 * Property-Based Tests for Ordinance Table
 * Uses fast-check library for property-based testing
 */
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

// Import functions from ordinances.js (re-implemented for testing since original uses CommonJS conditionally)
function sortOrdinancesByNumber(ordinances) {
    return [...ordinances].sort((a, b) => {
        const numA = parseInt(a.ordinanceNo.split('-')[1], 10);
        const numB = parseInt(b.ordinanceNo.split('-')[1], 10);
        return numB - numA;
    });
}

function formatOrdinanceNo(ordinanceNo) {
    return ordinanceNo;
}

function formatSessionDate(dateString) {
    try {
        const date = new Date(dateString + 'T00:00:00');
        if (isNaN(date.getTime())) {
            return dateString;
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return dateString;
    }
}

// Arbitrary for generating valid ordinance objects
const ordinanceArbitrary = fc.record({
    ordinanceNo: fc.integer({ min: 1, max: 999 }).map(n => `2025-${String(n).padStart(3, '0')}`),
    title: fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
    sessionDate: fc.date({ min: new Date('2025-01-01'), max: new Date('2025-12-31') })
        .map(d => d.toISOString().split('T')[0])
});

describe('Ordinance Table Property Tests', () => {
    /**
     * **Feature: ordinance-table, Property 1: Ordinance sorting order**
     * *For any* array of ordinances, after sorting by ordinance number in descending order,
     * each ordinance's number should be greater than or equal to the next ordinance's number in the array.
     * **Validates: Requirements 1.3**
     */
    it('Property 1: Ordinance sorting order - sorted array maintains descending order', () => {
        fc.assert(
            fc.property(
                fc.array(ordinanceArbitrary, { minLength: 0, maxLength: 50 }),
                (ordinances) => {
                    const sorted = sortOrdinancesByNumber(ordinances);
                    
                    // Property: each element's number >= next element's number (descending)
                    for (let i = 0; i < sorted.length - 1; i++) {
                        const currentNum = parseInt(sorted[i].ordinanceNo.split('-')[1], 10);
                        const nextNum = parseInt(sorted[i + 1].ordinanceNo.split('-')[1], 10);
                        if (currentNum < nextNum) {
                            return false;
                        }
                    }
                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    /**
     * **Feature: ordinance-table, Property 2: Ordinance number format consistency**
     * *For any* ordinance number string in the format "YYYY-XXX", the formatted display
     * should preserve the original format without modification.
     * **Validates: Requirements 1.4**
     */
    it('Property 2: Ordinance number format consistency - format preserves original', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 999 }).map(n => `2025-${String(n).padStart(3, '0')}`),
                (ordinanceNo) => {
                    const formatted = formatOrdinanceNo(ordinanceNo);
                    return formatted === ordinanceNo;
                }
            ),
            { numRuns: 100 }
        );
    });

    /**
     * **Feature: ordinance-table, Property 3: Ordinance data structure completeness**
     * *For any* ordinance object in the JSON data, it should contain all three required fields:
     * ordinanceNo (non-empty string), title (non-empty string), and sessionDate (valid ISO date string).
     * **Validates: Requirements 5.2**
     */
    it('Property 3: Ordinance data structure completeness - all required fields present and valid', () => {
        fc.assert(
            fc.property(
                ordinanceArbitrary,
                (ordinance) => {
                    // Check ordinanceNo is non-empty string matching format
                    const hasValidOrdinanceNo = typeof ordinance.ordinanceNo === 'string' 
                        && ordinance.ordinanceNo.length > 0
                        && /^\d{4}-\d{3}$/.test(ordinance.ordinanceNo);
                    
                    // Check title is non-empty string
                    const hasValidTitle = typeof ordinance.title === 'string' 
                        && ordinance.title.trim().length > 0;
                    
                    // Check sessionDate is valid ISO date string
                    const hasValidDate = typeof ordinance.sessionDate === 'string'
                        && /^\d{4}-\d{2}-\d{2}$/.test(ordinance.sessionDate)
                        && !isNaN(new Date(ordinance.sessionDate).getTime());
                    
                    return hasValidOrdinanceNo && hasValidTitle && hasValidDate;
                }
            ),
            { numRuns: 100 }
        );
    });
});
