/**
 * Tests for SRE Formatter utilities
 * Includes property-based tests using fast-check
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { formatPesoMillions, formatPeso } from './sre-formatter.js';

describe('formatPesoMillions', () => {
    /**
     * **Feature: receipts-expenditures-2023, Property 1: Currency formatting produces valid peso format**
     * **Validates: Requirements 1.3**
     * 
     * For any numeric value, the formatting function SHALL produce a string that:
     * - Starts with the Philippine Peso symbol (₱) or negative sign followed by ₱
     * - Contains the numeric value with 2 decimal places
     * - Includes the "M" suffix for millions
     */
    it('should always produce valid peso format for any numeric input', () => {
        fc.assert(
            fc.property(
                fc.double({ min: -1e12, max: 1e12, noNaN: true }),
                (value) => {
                    const result = formatPesoMillions(value);
                    
                    // Must contain peso symbol
                    expect(result).toContain('₱');
                    
                    // Must end with " M" suffix
                    expect(result).toMatch(/ M$/);
                    
                    // Must have 2 decimal places before M
                    expect(result).toMatch(/\.\d{2} M$/);
                    
                    // If negative, must start with -₱
                    if (value < 0) {
                        expect(result).toMatch(/^-₱/);
                    } else {
                        expect(result).toMatch(/^₱/);
                    }
                }
            ),
            { numRuns: 100 }
        );
    });

    // Unit tests for edge cases
    it('should format zero correctly', () => {
        expect(formatPesoMillions(0)).toBe('₱0.00 M');
    });

    it('should format positive numbers correctly', () => {
        expect(formatPesoMillions(371.33)).toBe('₱371.33 M');
        expect(formatPesoMillions(1.5)).toBe('₱1.50 M');
        expect(formatPesoMillions(1000.99)).toBe('₱1,000.99 M');
    });

    it('should format negative numbers correctly', () => {
        expect(formatPesoMillions(-50.25)).toBe('-₱50.25 M');
    });

    it('should handle very small decimals', () => {
        expect(formatPesoMillions(0.01)).toBe('₱0.01 M');
        expect(formatPesoMillions(0.001)).toBe('₱0.00 M');
    });

    it('should add thousand separators for large numbers', () => {
        expect(formatPesoMillions(1234567.89)).toBe('₱1,234,567.89 M');
    });

    it('should return N/A for null or undefined', () => {
        expect(formatPesoMillions(null)).toBe('N/A');
        expect(formatPesoMillions(undefined)).toBe('N/A');
    });

    it('should return N/A for non-numeric values', () => {
        expect(formatPesoMillions('abc')).toBe('N/A');
        expect(formatPesoMillions(NaN)).toBe('N/A');
    });

    it('should handle string numbers', () => {
        expect(formatPesoMillions('123.45')).toBe('₱123.45 M');
    });
});

describe('formatPeso', () => {
    it('should format values without M suffix', () => {
        expect(formatPeso(1234.56)).toBe('₱1,234.56');
        expect(formatPeso(0)).toBe('₱0.00');
    });

    it('should return N/A for invalid values', () => {
        expect(formatPeso(null)).toBe('N/A');
        expect(formatPeso(undefined)).toBe('N/A');
    });
});
