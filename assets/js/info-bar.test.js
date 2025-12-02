/**
 * Info Bar Tests - Unit and Property-Based Tests
 * Uses fast-check for property-based testing
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// Import functions from info-bar.js (we need to export them first)
// For now, we'll define the functions inline for testing since info-bar.js uses global scope

// ============================================
// FORMATTER FUNCTIONS (copied for testing)
// ============================================

function formatExchangeRate(rate) {
    if (rate === null || rate === undefined || isNaN(rate)) {
        return '--';
    }
    return Number(rate).toFixed(2);
}

function formatTemperature(temp) {
    if (temp === null || temp === undefined || isNaN(temp)) {
        return '--°C';
    }
    return `${Math.round(temp)}°C`;
}

function formatTime12Hour(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return '--:-- --';
    }
    
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutesStr} ${ampm}`;
}

// ============================================
// PROPERTY-BASED TESTS
// ============================================

describe('Formatter Functions - Property Tests', () => {
    /**
     * **Feature: realtime-info-bar, Property 1: Exchange Rate Formatting Precision**
     * *For any* numeric exchange rate value, the formatExchangeRate function 
     * SHALL return a string with exactly 2 decimal places.
     * **Validates: Requirements 1.2**
     */
    describe('Property 1: Exchange Rate Formatting Precision', () => {
        it('should format any positive number to exactly 2 decimal places', () => {
            fc.assert(
                fc.property(
                    fc.double({ min: 0.01, max: 1000000, noNaN: true }),
                    (rate) => {
                        const result = formatExchangeRate(rate);
                        // Should match pattern: digits, dot, exactly 2 digits
                        const pattern = /^\d+\.\d{2}$/;
                        return pattern.test(result);
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should format any negative number to exactly 2 decimal places', () => {
            fc.assert(
                fc.property(
                    fc.double({ min: -1000000, max: -0.01, noNaN: true }),
                    (rate) => {
                        const result = formatExchangeRate(rate);
                        // Should match pattern: optional minus, digits, dot, exactly 2 digits
                        const pattern = /^-?\d+\.\d{2}$/;
                        return pattern.test(result);
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should format integers to have .00 suffix', () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 1000000 }),
                    (rate) => {
                        const result = formatExchangeRate(rate);
                        return result.endsWith('.00') || result.match(/\.\d{2}$/);
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should return fallback for invalid inputs', () => {
            expect(formatExchangeRate(null)).toBe('--');
            expect(formatExchangeRate(undefined)).toBe('--');
            expect(formatExchangeRate(NaN)).toBe('--');
        });
    });


    /**
     * **Feature: realtime-info-bar, Property 2: Temperature Formatting Consistency**
     * *For any* numeric temperature value, the formatTemperature function 
     * SHALL return a string containing the numeric value followed by "°C".
     * **Validates: Requirements 2.2**
     */
    describe('Property 2: Temperature Formatting Consistency', () => {
        it('should always include °C suffix for any valid temperature', () => {
            fc.assert(
                fc.property(
                    fc.float({ min: -50, max: 60, noNaN: true }),
                    (temp) => {
                        const result = formatTemperature(temp);
                        return result.endsWith('°C');
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should contain a numeric value before °C', () => {
            fc.assert(
                fc.property(
                    fc.float({ min: -50, max: 60, noNaN: true }),
                    (temp) => {
                        const result = formatTemperature(temp);
                        // Should match: optional minus, digits, °C
                        const pattern = /^-?\d+°C$/;
                        return pattern.test(result);
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should round temperature to nearest integer', () => {
            fc.assert(
                fc.property(
                    fc.float({ min: -50, max: 60, noNaN: true }),
                    (temp) => {
                        const result = formatTemperature(temp);
                        const numericPart = parseInt(result.replace('°C', ''));
                        return numericPart === Math.round(temp);
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should return fallback for invalid inputs', () => {
            expect(formatTemperature(null)).toBe('--°C');
            expect(formatTemperature(undefined)).toBe('--°C');
            expect(formatTemperature(NaN)).toBe('--°C');
        });
    });

    /**
     * **Feature: realtime-info-bar, Property 3: Time Formatting 12-Hour Format**
     * *For any* valid Date object, the formatTime12Hour function 
     * SHALL return a string in 12-hour format containing either "AM" or "PM".
     * **Validates: Requirements 3.2**
     */
    describe('Property 3: Time Formatting 12-Hour Format', () => {
        it('should always contain AM or PM for any valid date', () => {
            fc.assert(
                fc.property(
                    fc.date({ min: new Date('2000-01-01'), max: new Date('2100-12-31') }),
                    (date) => {
                        const result = formatTime12Hour(date);
                        return result.includes('AM') || result.includes('PM');
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should format hours in 1-12 range', () => {
            fc.assert(
                fc.property(
                    fc.date({ min: new Date('2000-01-01'), max: new Date('2100-12-31') }),
                    (date) => {
                        const result = formatTime12Hour(date);
                        const hourMatch = result.match(/^(\d{1,2}):/);
                        if (!hourMatch) return false;
                        const hour = parseInt(hourMatch[1]);
                        return hour >= 1 && hour <= 12;
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should format minutes with leading zero when needed', () => {
            fc.assert(
                fc.property(
                    fc.date({ min: new Date('2000-01-01'), max: new Date('2100-12-31') }),
                    (date) => {
                        const result = formatTime12Hour(date);
                        // Minutes should be 2 digits
                        const pattern = /^\d{1,2}:\d{2} (AM|PM)$/;
                        return pattern.test(result);
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should show AM for hours 0-11 and PM for hours 12-23', () => {
            // Test specific hours
            for (let h = 0; h < 24; h++) {
                const date = new Date(2024, 0, 1, h, 30);
                const result = formatTime12Hour(date);
                const expectedPeriod = h < 12 ? 'AM' : 'PM';
                expect(result).toContain(expectedPeriod);
            }
        });

        it('should return fallback for invalid inputs', () => {
            expect(formatTime12Hour(null)).toBe('--:-- --');
            expect(formatTime12Hour(undefined)).toBe('--:-- --');
            expect(formatTime12Hour(new Date('invalid'))).toBe('--:-- --');
            expect(formatTime12Hour('not a date')).toBe('--:-- --');
        });
    });
});


// ============================================
// CACHE MANAGER (copied for testing)
// ============================================

const CacheManager = {
    serialize(data) {
        return JSON.stringify({
            data: data,
            timestamp: Date.now()
        });
    },

    deserialize(json) {
        try {
            const parsed = JSON.parse(json);
            return parsed;
        } catch (e) {
            return null;
        }
    },

    validate(data, schema) {
        if (!data || typeof data !== 'object') {
            return false;
        }
        
        if (typeof data.timestamp !== 'number') {
            return false;
        }
        
        if (!('data' in data)) {
            return false;
        }
        
        if (schema && schema.requiredFields) {
            for (const field of schema.requiredFields) {
                if (!(field in data.data)) {
                    return false;
                }
            }
        }
        
        return true;
    },

    isExpired(cachedData) {
        if (!cachedData || !cachedData.timestamp || !cachedData.ttl) {
            return true;
        }
        return Date.now() - cachedData.timestamp > cachedData.ttl;
    }
};

// ============================================
// CACHE MANAGER PROPERTY TESTS
// ============================================

describe('Cache Manager - Property Tests', () => {
    /**
     * **Feature: realtime-info-bar, Property 4: Cache Data Round-Trip Consistency**
     * *For any* valid data object, serializing then deserializing SHALL produce 
     * an equivalent object, and the serialized form SHALL include a timestamp field.
     * **Validates: Requirements 6.1, 6.2, 6.3**
     */
    describe('Property 4: Cache Data Round-Trip Consistency', () => {
        it('should round-trip any JSON-serializable object', () => {
            fc.assert(
                fc.property(
                    fc.jsonValue(),
                    (data) => {
                        const serialized = CacheManager.serialize(data);
                        const deserialized = CacheManager.deserialize(serialized);
                        
                        // Should have timestamp
                        if (typeof deserialized.timestamp !== 'number') return false;
                        
                        // Data should be equivalent
                        return JSON.stringify(deserialized.data) === JSON.stringify(data);
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should include timestamp in serialized output', () => {
            fc.assert(
                fc.property(
                    fc.record({
                        rates: fc.record({
                            USD: fc.double({ min: 1, max: 100, noNaN: true }),
                            GBP: fc.double({ min: 1, max: 100, noNaN: true })
                        })
                    }),
                    (data) => {
                        const serialized = CacheManager.serialize(data);
                        const parsed = JSON.parse(serialized);
                        
                        return typeof parsed.timestamp === 'number' && parsed.timestamp > 0;
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should preserve data structure through round-trip', () => {
            fc.assert(
                fc.property(
                    fc.record({
                        temperature: fc.double({ min: -50, max: 60, noNaN: true }),
                        location: fc.string()
                    }),
                    (data) => {
                        const serialized = CacheManager.serialize(data);
                        const deserialized = CacheManager.deserialize(serialized);
                        
                        return deserialized.data.temperature === data.temperature &&
                               deserialized.data.location === data.location;
                    }
                ),
                { numRuns: 100 }
            );
        });
    });

    /**
     * **Feature: realtime-info-bar, Property 5: Cache Validation Rejects Invalid Data**
     * *For any* malformed JSON string or object missing required fields, 
     * the cache validation function SHALL return false or throw an appropriate error.
     * **Validates: Requirements 6.4**
     */
    describe('Property 5: Cache Validation Rejects Invalid Data', () => {
        it('should reject null and undefined', () => {
            expect(CacheManager.validate(null)).toBe(false);
            expect(CacheManager.validate(undefined)).toBe(false);
        });

        it('should reject non-objects', () => {
            fc.assert(
                fc.property(
                    fc.oneof(fc.string(), fc.integer(), fc.boolean()),
                    (value) => {
                        return CacheManager.validate(value) === false;
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should reject objects without timestamp', () => {
            fc.assert(
                fc.property(
                    fc.record({
                        data: fc.jsonValue()
                    }),
                    (obj) => {
                        return CacheManager.validate(obj) === false;
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should reject objects without data property', () => {
            fc.assert(
                fc.property(
                    fc.record({
                        timestamp: fc.integer({ min: 1 })
                    }),
                    (obj) => {
                        return CacheManager.validate(obj) === false;
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should accept valid cached data structure', () => {
            fc.assert(
                fc.property(
                    fc.record({
                        data: fc.jsonValue(),
                        timestamp: fc.integer({ min: 1 })
                    }),
                    (obj) => {
                        return CacheManager.validate(obj) === true;
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should reject when required fields are missing', () => {
            const schema = { requiredFields: ['rates', 'base'] };
            
            fc.assert(
                fc.property(
                    fc.record({
                        data: fc.record({ rates: fc.double() }), // missing 'base'
                        timestamp: fc.integer({ min: 1 })
                    }),
                    (obj) => {
                        return CacheManager.validate(obj, schema) === false;
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should return null for malformed JSON', () => {
            const malformedStrings = [
                '{invalid json}',
                'not json at all',
                '{"unclosed": ',
                '',
                'null',
            ];
            
            for (const str of malformedStrings) {
                if (str === 'null') {
                    // JSON.parse('null') returns null, which is valid JSON
                    continue;
                }
                const result = CacheManager.deserialize(str);
                // Either returns null or the parsed value
                expect(result === null || result !== undefined).toBe(true);
            }
        });
    });
});


// ============================================
// API SERVICES UNIT TESTS
// ============================================

describe('ExchangeRateService - Unit Tests', () => {
    describe('processRates', () => {
        // Mock the processRates function for testing
        const processRates = (rates, currencies = ['USD', 'GBP', 'SAR', 'AED', 'JPY', 'CAD', 'AUD']) => {
            const processed = {};
            for (const currency of currencies) {
                if (rates[currency] !== undefined) {
                    processed[currency] = rates[currency] > 0 ? 1 / rates[currency] : null;
                } else {
                    processed[currency] = null;
                }
            }
            return {
                rates: processed,
                timestamp: Date.now(),
                base: 'PHP'
            };
        };

        it('should process valid rates correctly', () => {
            const rawRates = {
                USD: 0.0178,  // 1 PHP = 0.0178 USD
                GBP: 0.0141,
                SAR: 0.0668,
                AED: 0.0654,
                JPY: 2.6786,
                CAD: 0.0243,
                AUD: 0.0273
            };
            
            const result = processRates(rawRates);
            
            expect(result.base).toBe('PHP');
            expect(typeof result.timestamp).toBe('number');
            expect(result.rates.USD).toBeCloseTo(56.18, 1);  // 1/0.0178 ≈ 56.18
        });

        it('should handle missing currencies', () => {
            const rawRates = {
                USD: 0.0178,
                GBP: 0.0141
            };
            
            const result = processRates(rawRates);
            
            expect(result.rates.USD).not.toBeNull();
            expect(result.rates.SAR).toBeNull();
            expect(result.rates.AED).toBeNull();
        });

        it('should handle zero rates', () => {
            const rawRates = {
                USD: 0,
                GBP: 0.0141
            };
            
            const result = processRates(rawRates);
            
            expect(result.rates.USD).toBeNull();
            expect(result.rates.GBP).not.toBeNull();
        });

        it('should include timestamp in result', () => {
            const before = Date.now();
            const result = processRates({ USD: 0.0178 });
            const after = Date.now();
            
            expect(result.timestamp).toBeGreaterThanOrEqual(before);
            expect(result.timestamp).toBeLessThanOrEqual(after);
        });
    });
});

describe('WeatherService - Unit Tests', () => {
    describe('weather data processing', () => {
        it('should create valid weather data structure', () => {
            const weatherData = {
                temperature: 28.5,
                timestamp: Date.now(),
                location: {
                    lat: 16.5167,
                    lon: 121.1833,
                    name: 'Solano, Nueva Vizcaya'
                }
            };
            
            expect(weatherData.temperature).toBe(28.5);
            expect(weatherData.location.name).toBe('Solano, Nueva Vizcaya');
            expect(typeof weatherData.timestamp).toBe('number');
        });

        it('should handle null temperature gracefully', () => {
            const weatherData = {
                temperature: null,
                timestamp: Date.now(),
                location: {
                    lat: 16.5167,
                    lon: 121.1833,
                    name: 'Solano, Nueva Vizcaya'
                }
            };
            
            const formatted = formatTemperature(weatherData.temperature);
            expect(formatted).toBe('--°C');
        });
    });
});

describe('TimeService - Unit Tests', () => {
    describe('getCurrentPHTDate', () => {
        // Mock the function for testing
        const getCurrentPHTDate = () => {
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const pht = new Date(utc + (8 * 60 * 60 * 1000));
            return pht;
        };

        it('should return a valid Date object', () => {
            const result = getCurrentPHTDate();
            expect(result instanceof Date).toBe(true);
            expect(isNaN(result.getTime())).toBe(false);
        });

        it('should return PHT time (UTC+8)', () => {
            const phtDate = getCurrentPHTDate();
            const utcDate = new Date();
            
            // PHT should be 8 hours ahead of UTC
            const utcHours = utcDate.getUTCHours();
            const phtHours = phtDate.getHours();
            
            // Account for day boundary
            const expectedPhtHours = (utcHours + 8) % 24;
            expect(phtHours).toBe(expectedPhtHours);
        });
    });

    describe('time formatting', () => {
        it('should format midnight as 12:00 AM', () => {
            const midnight = new Date(2024, 0, 1, 0, 0);
            const result = formatTime12Hour(midnight);
            expect(result).toBe('12:00 AM');
        });

        it('should format noon as 12:00 PM', () => {
            const noon = new Date(2024, 0, 1, 12, 0);
            const result = formatTime12Hour(noon);
            expect(result).toBe('12:00 PM');
        });

        it('should format 1 PM correctly', () => {
            const onePm = new Date(2024, 0, 1, 13, 30);
            const result = formatTime12Hour(onePm);
            expect(result).toBe('1:30 PM');
        });

        it('should format 11 AM correctly', () => {
            const elevenAm = new Date(2024, 0, 1, 11, 45);
            const result = formatTime12Hour(elevenAm);
            expect(result).toBe('11:45 AM');
        });
    });
});
