/**
 * Statement of Receipts and Expenditures (SRE) Formatting Utilities
 * Provides currency formatting functions for financial data display
 */

/**
 * Formats a numeric value as Philippine Peso in millions
 * @param {number} value - The numeric value in millions
 * @returns {string} Formatted string like "₱123.45 M" or "₱0.00 M"
 */
function formatPesoMillions(value) {
    // Handle null, undefined, or non-numeric values
    if (value === null || value === undefined || isNaN(Number(value))) {
        return 'N/A';
    }

    const numValue = Number(value);
    
    // Handle zero
    if (numValue === 0) {
        return '₱0.00 M';
    }

    // Handle negative numbers
    const isNegative = numValue < 0;
    const absValue = Math.abs(numValue);

    // Format with 2 decimal places
    const formatted = absValue.toFixed(2);
    
    // Add thousand separators for the integer part
    const parts = formatted.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const decimalPart = parts[1];

    // Construct the final string
    const sign = isNegative ? '-' : '';
    return `${sign}₱${integerPart}.${decimalPart} M`;
}

/**
 * Formats a numeric value as Philippine Peso (not in millions)
 * @param {number} value - The numeric value
 * @returns {string} Formatted string like "₱123,456.78"
 */
function formatPeso(value) {
    if (value === null || value === undefined || isNaN(Number(value))) {
        return 'N/A';
    }

    const numValue = Number(value);
    const isNegative = numValue < 0;
    const absValue = Math.abs(numValue);

    const formatted = absValue.toFixed(2);
    const parts = formatted.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const decimalPart = parts[1];

    const sign = isNegative ? '-' : '';
    return `${sign}₱${integerPart}.${decimalPart}`;
}

// Export for ES modules (Vitest compatibility)
export { formatPesoMillions, formatPeso };
