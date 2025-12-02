document.addEventListener('DOMContentLoaded', () => {
    const officialsContainer = document.getElementById('officials-container');
    if (!officialsContainer) return;

    fetch('../data/officials.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderOfficials(data);
        })
        .catch(error => {
            console.error('Error fetching officials data:', error);
            officialsContainer.innerHTML = '<p class="text-center text-danger">Failed to load officials data.</p>';
        });

    function renderOfficials(data) {
        let html = '';

        // Mayor & Vice Mayor
        html += '<div class="grid grid-2 mb-5">';

        // Mayor
        if (data.mayor) {
            html += createOfficialCard(data.mayor, 'Mayor');
        }

        // Vice Mayor
        if (data.vice_mayor) {
            html += createOfficialCard(data.vice_mayor, 'Vice Mayor');
        }

        html += '</div>';

        // Councilors
        if (data.councilors && data.councilors.length > 0) {
            html += '<h3 class="text-center mt-5 mb-4">Sangguniang Bayan Members</h3>';
            html += '<div class="grid grid-4">';
            data.councilors.forEach(councilor => {
                html += createOfficialCard(councilor, 'SB Member');
            });
            html += '</div>';
        }

        officialsContainer.innerHTML = html;
    }

    function createOfficialCard(official, role) {
        return `
            <div class="card text-center">
                <div class="card-body">
                    <div class="avatar-placeholder" style="width: 100px; height: 100px; background: #ddd; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center;">
                        <i class="bi bi-person-fill" style="font-size: 3rem; color: #666;"></i>
                    </div>
                    <h3 class="card-title">${official.name}</h3>
                    <p class="text-primary font-weight-bold">${official.title || role}</p>
                </div>
            </div>
        `;
    }
});
