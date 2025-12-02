/**
 * Tests for Transparency 2025 utilities
 * **Feature: transparency-2025-update**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// Import the module
const { SRE_DATA, formatPesoMillions, calculatePercentage } = await import('./transparency-2025.js');

describe('formatPesoMillions', () => {
    /**
     * **Feature: transparency-2025-update, Property 1: Currency formatting produces valid peso format**
     * **Validates: Requirements 1.4, 7.4**
     */
    it('should always produce valid peso format for any numeric input', () => {
        fc.assert(
            fc.property(fc.double({ min: -1000000, max: 1000000, noNaN: true }), (value) => {
                const result = formatPesoMillions(value);
                
                // Must start with peso symbol
                expect(result.startsWith('₱')).toBe(true);
                
                // Must end with M suffix
                expect(result.endsWith(' M')).toBe(true);
                
                // Must contain a numeric value with 2 decimal places
                const numericPart = result.slice(1, -2); // Remove ₱ and " M"
                expect(/^-?\d+\.\d{2}$/.test(numericPart)).toBe(true);
            }),
            { numRuns: 100 }
        );
    });

    it('should handle zero correctly', () => {
        expect(formatPesoMillions(0)).toBe('₱0.00 M');
    });

    it('should handle null/undefined correctly', () => {
        expect(formatPesoMillions(null)).toBe('₱0.00 M');
        expect(formatPesoMillions(undefined)).toBe('₱0.00 M');
    });

    it('should handle NaN correctly', () => {
        expect(formatPesoMillions(NaN)).toBe('₱0.00 M');
    });

    it('should round to 2 decimal places', () => {
        expect(formatPesoMillions(123.456)).toBe('₱123.46 M');
        expect(formatPesoMillions(123.454)).toBe('₱123.45 M');
    });

    it('should handle negative numbers', () => {
        expect(formatPesoMillions(-50.5)).toBe('₱-50.50 M');
    });
});

describe('calculatePercentage', () => {
    /**
     * **Feature: transparency-2025-update, Property 2: Percentage calculations sum correctly**
     * **Validates: Requirements 3.5**
     */
    it('should produce percentages that sum to approximately 100%', () => {
        fc.assert(
            fc.property(
                fc.array(fc.double({ min: 0.01, max: 1000, noNaN: true }), { minLength: 2, maxLength: 10 }),
                (values) => {
                    const total = values.reduce((sum, v) => sum + v, 0);
                    const percentages = values.map(v => calculatePercentage(v, total));
                    const sum = percentages.reduce((s, p) => s + p, 0);
                    
                    // Sum should be approximately 100% (within rounding tolerance)
                    expect(sum).toBeGreaterThanOrEqual(99.5);
                    expect(sum).toBeLessThanOrEqual(100.5);
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should handle zero total', () => {
        expect(calculatePercentage(50, 0)).toBe(0);
    });

    it('should calculate correct percentage', () => {
        expect(calculatePercentage(25, 100)).toBe(25);
        expect(calculatePercentage(1, 3)).toBeCloseTo(33.3, 1);
    });

    it('should round to 1 decimal place', () => {
        expect(calculatePercentage(1, 7)).toBe(14.3);
    });
});

describe('SRE_DATA', () => {
    it('should have Q1 and Q2 data', () => {
        expect(SRE_DATA.q1).toBeDefined();
        expect(SRE_DATA.q2).toBeDefined();
    });

    it('should have correct Q1 total income', () => {
        expect(SRE_DATA.q1.income.total).toBe(158.47);
    });

    it('should have correct Q2 total income', () => {
        expect(SRE_DATA.q2.income.total).toBe(253.40);
    });

    it('should have correct Q1 total expenditures', () => {
        expect(SRE_DATA.q1.expenditures.total).toBe(67.51);
    });

    it('should have correct Q2 total expenditures', () => {
        expect(SRE_DATA.q2.expenditures.total).toBe(140.48);
    });

    it('should have all required income categories', () => {
        const q1Income = SRE_DATA.q1.income;
        expect(q1Income.local.taxRevenue).toBeDefined();
        expect(q1Income.local.nonTaxRevenue).toBeDefined();
        expect(q1Income.external.nationalTaxAllotment).toBeDefined();
    });

    it('should have all required expenditure categories', () => {
        const q1Exp = SRE_DATA.q1.expenditures;
        expect(q1Exp.generalPublicServices).toBeDefined();
        expect(q1Exp.socialServices).toBeDefined();
        expect(q1Exp.economicServices).toBeDefined();
        expect(q1Exp.debtService).toBeDefined();
    });
});


describe('Quarter Selection Consistency', () => {
    /**
     * **Feature: transparency-2025-update, Property 3: Quarter selection updates all displayed values**
     * **Validates: Requirements 1.3**
     */
    it('should have consistent data for each quarter', () => {
        fc.assert(
            fc.property(fc.constantFrom('q1', 'q2'), (quarter) => {
                const data = SRE_DATA[quarter];
                
                // Verify data structure exists
                expect(data).toBeDefined();
                expect(data.income).toBeDefined();
                expect(data.expenditures).toBeDefined();
                
                // Verify income totals are consistent
                const localTotal = data.income.local.total;
                const externalTotal = data.income.external.total;
                const incomeTotal = data.income.total;
                
                // Local + External should approximately equal total income
                expect(Math.abs((localTotal + externalTotal) - incomeTotal)).toBeLessThan(0.1);
                
                // Verify expenditure totals are consistent
                const gps = data.expenditures.generalPublicServices;
                const social = data.expenditures.socialServices.total;
                const economic = data.expenditures.economicServices;
                const debt = data.expenditures.debtService;
                const expTotal = data.expenditures.total;
                
                // Sum of categories should approximately equal total
                expect(Math.abs((gps + social + economic + debt) - expTotal)).toBeLessThan(0.1);
                
                // Net operating income should be income - expenditures
                const calculatedNet = incomeTotal - expTotal;
                expect(Math.abs(calculatedNet - data.netOperatingIncome)).toBeLessThan(0.1);
            }),
            { numRuns: 100 }
        );
    });

    it('should have all required fields for Q1', () => {
        const q1 = SRE_DATA.q1;
        expect(q1.period).toBe('Q1 2025');
        expect(q1.periodLabel).toBe('Jan - Mar');
        expect(q1.fundBalanceEnd).toBeDefined();
    });

    it('should have all required fields for Q2', () => {
        const q2 = SRE_DATA.q2;
        expect(q2.period).toBe('Q2 2025');
        expect(q2.periodLabel).toBe('Apr - Jun');
        expect(q2.fundBalanceEnd).toBeDefined();
    });
});


import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('DOM Structure Tests', () => {
    let dom;
    let document;

    beforeAll(() => {
        const htmlPath = resolve(process.cwd(), 'public_html/budget/index.html');
        const html = readFileSync(htmlPath, 'utf-8');
        dom = new JSDOM(html);
        document = dom.window.document;
    });

    describe('SRE Section', () => {
        it('should have SRE section with proper structure', () => {
            const sreSection = document.querySelector('.sre-section');
            expect(sreSection).not.toBeNull();
        });

        it('should have Q1 and Q2 quarter cards', () => {
            const q1Card = document.querySelector('.sre-quarter-card[data-quarter="q1"]');
            const q2Card = document.querySelector('.sre-quarter-card[data-quarter="q2"]');
            expect(q1Card).not.toBeNull();
            expect(q2Card).not.toBeNull();
        });

        it('should have quarter selector tabs with ARIA attributes', () => {
            const tabsContainer = document.querySelector('.sre-quarter-selector');
            expect(tabsContainer).not.toBeNull();
            expect(tabsContainer.getAttribute('role')).toBe('tablist');
        });

        it('should have Q1 tab as active by default', () => {
            const q1Tab = document.querySelector('.sre-tab[data-quarter="q1"]');
            expect(q1Tab).not.toBeNull();
            expect(q1Tab.classList.contains('active')).toBe(true);
        });
    });

    describe('Income Breakdown', () => {
        it('should have income breakdown elements', () => {
            expect(document.getElementById('income-local-amount')).not.toBeNull();
            expect(document.getElementById('income-external-amount')).not.toBeNull();
        });

        it('should have income chart canvas', () => {
            const canvas = document.getElementById('incomeChart');
            expect(canvas).not.toBeNull();
            expect(canvas.tagName.toLowerCase()).toBe('canvas');
        });
    });

    describe('Expenditure Breakdown', () => {
        it('should have expenditure breakdown elements', () => {
            expect(document.getElementById('exp-gps-amount')).not.toBeNull();
            expect(document.getElementById('exp-social-amount')).not.toBeNull();
            expect(document.getElementById('exp-economic-amount')).not.toBeNull();
            expect(document.getElementById('exp-debt-amount')).not.toBeNull();
        });

        it('should have expenditure chart canvas', () => {
            const canvas = document.getElementById('expenditureChart');
            expect(canvas).not.toBeNull();
            expect(canvas.tagName.toLowerCase()).toBe('canvas');
        });
    });

    describe('2023 Data Removal', () => {
        it('should not contain 2023 references in data source citations', () => {
            const dataSources = document.querySelectorAll('.data-source');
            dataSources.forEach(source => {
                expect(source.textContent).not.toContain('2023');
            });
        });

        it('should reference 2025 data in SRE section', () => {
            const sreSection = document.querySelector('.sre-section');
            expect(sreSection.textContent).toContain('2025');
        });
    });

    describe('CSV Download Links', () => {
        it('should have download links for Q1 and Q2 CSV files', () => {
            const q1Link = document.querySelector('a[href*="2025 Q1.csv"]');
            const q2Link = document.querySelector('a[href*="2025 Q2.csv"]');
            expect(q1Link).not.toBeNull();
            expect(q2Link).not.toBeNull();
        });

        it('should have download attribute on CSV links', () => {
            const downloadLinks = document.querySelectorAll('.sre-download-btn');
            expect(downloadLinks.length).toBeGreaterThanOrEqual(2);
            downloadLinks.forEach(link => {
                expect(link.hasAttribute('download')).toBe(true);
            });
        });
    });
});
