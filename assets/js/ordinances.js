/* Better Solano - Ordinance Table JavaScript */

/**
 * Fetches ordinance data from the JSON file
 * @returns {Promise<Array>} Array of ordinance objects
 */
async function fetchOrdinances() {
    try {
        const response = await fetch('../data/ordinances.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.ordinances || [];
    } catch (error) {
        console.error('Error fetching ordinances:', error);
        return [];
    }
}

/**
 * Sorts ordinances by ordinance number in descending order (newest first)
 * Ordinance format: "YYYY-XX-SS" (year-sequence-session)
 * @param {Array} ordinances - Array of ordinance objects
 * @returns {Array} Sorted array of ordinances
 */
function sortOrdinancesByNumber(ordinances) {
    return [...ordinances].sort((a, b) => {
        // Extract sequence number from second segment (e.g., "05" from "2025-05-11")
        const numA = parseInt(a.ordinanceNo.split('-')[1], 10);
        const numB = parseInt(b.ordinanceNo.split('-')[1], 10);
        return numB - numA;
    });
}

/**
 * Formats ordinance number for display
 * @param {string} ordinanceNo - Ordinance number (e.g., "2025-001")
 * @returns {string} Ordinance number as-is
 */
function formatOrdinanceNo(ordinanceNo) {
    return ordinanceNo;
}

/**
 * Formats session date for display
 * @param {string} dateString - ISO date string (e.g., "2025-01-06")
 * @returns {string} Formatted date (e.g., "January 6, 2025")
 */
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
        console.warn('Invalid date format:', dateString);
        return dateString;
    }
}


/**
 * Renders the ordinance table to the DOM
 * @param {Array} ordinances - Array of ordinance objects
 */
function renderOrdinanceTable(ordinances) {
    const tableBody = document.getElementById('ordinance-table-body');
    
    if (!tableBody) {
        console.error('Ordinance table body element not found');
        return;
    }
    
    // Clear existing content
    tableBody.innerHTML = '';
    
    // Handle empty data
    if (!ordinances || ordinances.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="3" class="text-center text-muted">
                No ordinances found for 2025
            </td>
        `;
        tableBody.appendChild(emptyRow);
        return;
    }
    
    // Render each ordinance
    ordinances.forEach(ordinance => {
        // Skip invalid records
        if (!ordinance.ordinanceNo || !ordinance.title || !ordinance.sessionDate) {
            console.warn('Skipping invalid ordinance record:', ordinance);
            return;
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Ordinance No.">${formatOrdinanceNo(ordinance.ordinanceNo)}</td>
            <td data-label="Title">${ordinance.title}</td>
            <td data-label="Session Date">${formatSessionDate(ordinance.sessionDate)}</td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Main initialization function for the ordinance table
 */
async function initOrdinanceTable() {
    try {
        const ordinances = await fetchOrdinances();
        const sortedOrdinances = sortOrdinancesByNumber(ordinances);
        renderOrdinanceTable(sortedOrdinances);
    } catch (error) {
        console.error('Error initializing ordinance table:', error);
        const tableBody = document.getElementById('ordinance-table-body');
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3" class="text-center text-muted">
                        Unable to load ordinances. Please try again later.
                    </td>
                </tr>
            `;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initOrdinanceTable);

// Export functions for testing (if module system is available)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchOrdinances,
        sortOrdinancesByNumber,
        formatOrdinanceNo,
        formatSessionDate,
        renderOrdinanceTable,
        initOrdinanceTable
    };
}
