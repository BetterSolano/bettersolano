/**
 * Weather & Map Section for Better Solano Homepage
 * Displays real-time weather data and interactive map of Solano, Nueva Vizcaya
 * With robust fallback system to ensure content always renders
 */

// Wrap everything in IIFE to prevent redeclaration errors
(function() {
    'use strict';
    
    console.log('=== weather-map.js: Script loading started ===');

// ============================================================================
// Mock/Fallback Data - Always available static data
// ============================================================================
function getMockWeather() {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Generate realistic hourly forecast based on current time
    const hourlyForecast = [];
    for (let i = 0; i < 6; i++) {
        const hour = (currentHour + i) % 24;
        const isPM = hour >= 12;
        const displayHour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);
        const temp = 26 + Math.floor(Math.random() * 5); // 26-30°C range
        
        hourlyForecast.push({
            time: `${displayHour} ${isPM ? 'PM' : 'AM'}`,
            temperature: temp,
            icon: hour >= 6 && hour < 18 ? 'bi-cloud-sun-fill' : 'bi-moon-stars-fill'
        });
    }

    return {
        temperature: 29,
        humidity: 65,
        windSpeed: 12,
        weatherCode: 1,
        condition: 'Mainly clear',
        icon: 'bi-cloud-sun-fill',
        hourlyForecast: hourlyForecast,
        isFallback: true,
        timestamp: Date.now()
    };
}

// ============================================================================
// Utility: Check if running via file: protocol (no network access)
// ============================================================================
function isFileProtocol() {
    try {
        return window.location.protocol === 'file:';
    } catch (e) {
        return false;
    }
}

// ============================================================================
// Weather Service - Handles fetching, caching, and providing weather data
// ============================================================================
const WeatherService = {
    CACHE_KEY: 'solano_weather_cache',
    CACHE_TTL: 30 * 60 * 1000,
    API_URL: 'https://api.open-meteo.com/v1/forecast',
    COORDINATES: { lat: 16.5167, lon: 121.1833 },

    mapWeatherCode(code) {
        const mappings = {
            0: { condition: 'Clear sky', icon: 'bi-sun-fill' },
            1: { condition: 'Mainly clear', icon: 'bi-cloud-sun-fill' },
            2: { condition: 'Partly cloudy', icon: 'bi-cloud-sun-fill' },
            3: { condition: 'Overcast', icon: 'bi-clouds-fill' },
            45: { condition: 'Foggy', icon: 'bi-cloud-fog-fill' },
            48: { condition: 'Depositing rime fog', icon: 'bi-cloud-fog-fill' },
            51: { condition: 'Light drizzle', icon: 'bi-cloud-drizzle-fill' },
            53: { condition: 'Moderate drizzle', icon: 'bi-cloud-drizzle-fill' },
            55: { condition: 'Dense drizzle', icon: 'bi-cloud-drizzle-fill' },
            61: { condition: 'Slight rain', icon: 'bi-cloud-rain-fill' },
            63: { condition: 'Moderate rain', icon: 'bi-cloud-rain-fill' },
            65: { condition: 'Heavy rain', icon: 'bi-cloud-rain-heavy-fill' },
            80: { condition: 'Rain showers', icon: 'bi-cloud-rain-fill' },
            95: { condition: 'Thunderstorm', icon: 'bi-cloud-lightning-rain-fill' }
        };
        return mappings[code] || { condition: 'Partly cloudy', icon: 'bi-cloud-sun-fill' };
    },

    cacheWeather(data) {
        try {
            if (typeof localStorage === 'undefined') return;
            localStorage.setItem(this.CACHE_KEY, JSON.stringify({
                data: data,
                expiresAt: Date.now() + this.CACHE_TTL
            }));
        } catch (e) {
            console.warn('Cache write failed:', e);
        }
    },

    getCachedWeather() {
        try {
            if (typeof localStorage === 'undefined') return null;
            const cached = localStorage.getItem(this.CACHE_KEY);
            if (!cached) return null;
            
            const entry = JSON.parse(cached);
            if (entry && entry.data && Date.now() < entry.expiresAt) {
                return entry.data;
            }
            
            // Clear expired cache
            localStorage.removeItem(this.CACHE_KEY);
        } catch (e) {
            console.warn('Cache read failed:', e);
            // Try to clear corrupted cache
            try { localStorage.removeItem(this.CACHE_KEY); } catch (ex) { /* ignore */ }
        }
        return null;
    },

    async fetchWeather() {
        // If running via file: protocol (no CORS), use mock data immediately
        if (isFileProtocol()) {
            console.log('Weather: File protocol detected, using mock data');
            return getMockWeather();
        }

        // Try cache first
        try {
            const cached = this.getCachedWeather();
            if (cached) {
                console.log('Weather: Using cached data (expires in ' + Math.round((cached.timestamp + this.CACHE_TTL - Date.now()) / 1000) + 's)');
                return cached;
            }
        } catch (e) {
            console.warn('Weather: Cache check failed', e);
        }

        // Try API fetch with timeout
        console.log('Weather: Fetching live data from Open-Meteo API...');
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const params = new URLSearchParams({
                latitude: this.COORDINATES.lat,
                longitude: this.COORDINATES.lon,
                current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
                hourly: 'temperature_2m,weather_code',
                timezone: 'Asia/Manila',
                forecast_days: 1
            });

            const apiUrl = `${this.API_URL}?${params}`;
            console.log('Weather: API URL:', apiUrl);

            const response = await fetch(apiUrl, {
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const apiData = await response.json();
            console.log('Weather: API response received:', apiData);
            const weatherData = this.transformApiResponse(apiData);
            this.cacheWeather(weatherData);
            console.log('Weather: ✓ Live data fetched successfully - Temp:', weatherData.temperature + '°C');
            return weatherData;

        } catch (error) {
            console.warn('Weather: ✗ API fetch failed, using mock data -', error.message);
            return getMockWeather();
        }
    },

    transformApiResponse(apiData) {
        try {
            const current = apiData.current;
            const hourly = apiData.hourly;
            const { condition, icon } = this.mapWeatherCode(current.weather_code);
            const currentHour = new Date().getHours();
            const hourlyForecast = [];
            
            for (let i = 0; i < 6 && (currentHour + i) < hourly.time.length; i++) {
                const idx = currentHour + i;
                const { icon: fIcon } = this.mapWeatherCode(hourly.weather_code[idx]);
                const date = new Date(hourly.time[idx]);
                hourlyForecast.push({
                    time: date.toLocaleTimeString('en-PH', { hour: 'numeric', hour12: true }),
                    temperature: Math.round(hourly.temperature_2m[idx]),
                    icon: fIcon
                });
            }

            return {
                temperature: Math.round(current.temperature_2m),
                humidity: current.relative_humidity_2m,
                windSpeed: Math.round(current.wind_speed_10m),
                condition, icon, hourlyForecast,
                isFallback: false,
                timestamp: Date.now()
            };
        } catch (e) {
            console.warn('Weather: Transform failed, using mock', e);
            return getMockWeather();
        }
    }
};

// ============================================================================
// Weather UI - Renders weather data into the DOM
// ============================================================================
const WeatherUI = {
    render(container, data) {
        if (!container) return;
        
        try {
            // Limit to 4 hours for minimal design
            const forecastHTML = data.hourlyForecast.slice(0, 4).map(h => `
                <div class="weather-hour" role="listitem">
                    <span class="weather-hour-time">${h.time}</span>
                    <i class="bi ${h.icon}" aria-hidden="true"></i>
                    <span class="weather-hour-temp">${h.temperature}°</span>
                </div>
            `).join('');

            const dataSourceBadge = data.isFallback 
                ? '<span style="font-size:0.65rem;color:rgba(255,255,255,0.5);margin-left:4px;" title="Using fallback data">(Demo)</span>'
                : '<span style="font-size:0.65rem;color:#06a77d;margin-left:4px;" title="Live data from Open-Meteo API">●</span>';

            container.innerHTML = `
                <div class="weather-widget" role="region" aria-label="Current weather in Solano">
                    <div class="weather-current">
                        <div class="weather-current-icon" aria-hidden="true">
                            <i class="bi ${data.icon}"></i>
                        </div>
                        <div class="weather-current-info">
                            <div class="weather-current-temp" aria-label="Temperature ${data.temperature} degrees Celsius">${data.temperature}°C</div>
                            <div class="weather-current-condition" aria-label="Condition: ${data.condition}">${data.condition}${dataSourceBadge}</div>
                            <div class="weather-current-location">
                                <i class="bi bi-geo-alt" aria-hidden="true"></i> Solano, Nueva Vizcaya
                            </div>
                        </div>
                    </div>
                    <div class="weather-stats" role="list" aria-label="Weather details">
                        <div class="weather-stat" role="listitem" aria-label="Humidity ${data.humidity} percent">
                            <i class="bi bi-droplet" aria-hidden="true"></i>
                            <span>${data.humidity}%</span>
                        </div>
                        <div class="weather-stat" role="listitem" aria-label="Wind speed ${data.windSpeed} kilometers per hour">
                            <i class="bi bi-wind" aria-hidden="true"></i>
                            <span>${data.windSpeed} km/h</span>
                        </div>
                    </div>
                    <div class="weather-hourly" role="list" aria-label="Hourly forecast">
                        ${forecastHTML}
                    </div>
                </div>
            `;
            
            container.setAttribute('data-weather-loaded', 'true');
            
        } catch (e) {
            console.error('Weather: Render failed', e);
            this.renderError(container);
        }
    },

    renderLoading(container) {
        if (!container) return;
        container.innerHTML = `
            <div class="weather-loading" data-loading="true" aria-busy="true" aria-label="Loading weather data">
                <div class="weather-current">
                    <div class="skeleton-circle"></div>
                    <div class="weather-current-info">
                        <div class="skeleton-text skeleton-lg"></div>
                        <div class="skeleton-text skeleton-md" style="margin-top:8px;"></div>
                        <div class="skeleton-text skeleton-sm" style="margin-top:8px;"></div>
                    </div>
                </div>
                <div class="weather-stats">
                    <div class="skeleton-text skeleton-stat"></div>
                    <div class="skeleton-text skeleton-stat"></div>
                </div>
                <div class="weather-hourly">
                    <div class="skeleton-hour"></div>
                    <div class="skeleton-hour"></div>
                    <div class="skeleton-hour"></div>
                    <div class="skeleton-hour"></div>
                </div>
            </div>
        `;
    },

    renderError(container, retryFn) {
        if (!container) return;
        container.innerHTML = `
            <div class="weather-error" role="alert">
                <div class="weather-error-content">
                    <i class="bi bi-cloud-slash" aria-hidden="true"></i>
                    <p>Weather data unavailable</p>
                    <button type="button" class="btn btn-sm btn-primary weather-retry-btn" onclick="window.WeatherMapInit && window.WeatherMapInit()">
                        <i class="bi bi-arrow-clockwise" aria-hidden="true"></i> Retry
                    </button>
                </div>
            </div>
        `;
        container.setAttribute('data-weather-loaded', 'error');
    }
};

// ============================================================================
// Map Component - Initializes and manages the Leaflet map
// ============================================================================
const MapComponent = {
    SOLANO_CENTER: [16.5167, 121.1833],
    DEFAULT_ZOOM: 14,
    map: null,

    init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Map: Container not found');
            return null;
        }

        // If map already exists, just resize it
        if (this.map) {
            console.log('Map: Already initialized, resizing');
            this.map.invalidateSize();
            return this.map;
        }

        console.log('Map: Starting initialization...');
        console.log('Map: Leaflet available:', typeof L !== 'undefined');

        // Try to initialize Leaflet
        if (typeof L !== 'undefined') {
            return this.initLeaflet(container);
        }

        // Leaflet not ready yet, show loading and retry
        this.renderLoading(container);
        
        // Retry multiple times
        let attempts = 0;
        const maxAttempts = 10;
        const retryInterval = setInterval(() => {
            attempts++;
            console.log(`Map: Retry attempt ${attempts}/${maxAttempts}`);
            
            if (typeof L !== 'undefined') {
                clearInterval(retryInterval);
                this.initLeaflet(container);
            } else if (attempts >= maxAttempts) {
                clearInterval(retryInterval);
                console.warn('Map: Leaflet failed to load after retries');
                this.renderTextFallback(container);
            }
        }, 500);

        return null;
    },

    renderLoading(container) {
        container.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;min-height:300px;background:#f5f5f5;">
                <i class="bi bi-map" style="font-size:2.5rem;color:#0032a0;opacity:0.4;"></i>
                <p style="color:#888;margin-top:0.5rem;font-size:0.875rem;">Loading map...</p>
            </div>
        `;
    },

    renderTextFallback(container) {
        // Use OpenStreetMap iframe embed as fallback - this always works
        container.innerHTML = `
            <iframe 
                width="100%" 
                height="300" 
                frameborder="0" 
                scrolling="no" 
                marginheight="0" 
                marginwidth="0" 
                src="https://www.openstreetmap.org/export/embed.html?bbox=121.1633%2C16.5017%2C121.2033%2C16.5317&layer=mapnik&marker=16.5167%2C121.1833"
                style="border:0;display:block;"
                title="Map of Solano, Nueva Vizcaya"
                loading="lazy">
            </iframe>
        `;
        container.setAttribute('data-map-loaded', 'iframe');
    },

    initLeaflet(container) {
        try {
            console.log('Map: Initializing Leaflet...');
            
            // Clear any existing content
            container.innerHTML = '';
            
            // Create the map with keyboard navigation support (Requirement 5.4)
            this.map = L.map(container, {
                center: this.SOLANO_CENTER,
                zoom: this.DEFAULT_ZOOM,
                scrollWheelZoom: false,
                zoomControl: true,
                keyboard: true,
                keyboardPanDelta: 80
            });

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19
            }).addTo(this.map);

            // Add marker
            const marker = L.marker(this.SOLANO_CENTER).addTo(this.map);
            marker.bindPopup('<strong>Solano Municipal Hall</strong><br>Nueva Vizcaya 3708');

            container.setAttribute('data-map-loaded', 'leaflet');

            // Force resize after a short delay
            setTimeout(() => {
                if (this.map) {
                    this.map.invalidateSize();
                    console.log('Map: Resize complete');
                }
            }, 100);

            // Another resize after tiles might have loaded
            setTimeout(() => {
                if (this.map) {
                    this.map.invalidateSize();
                }
            }, 500);

            console.log('Map: Leaflet initialized successfully');
            return this.map;

        } catch (e) {
            console.error('Map: Leaflet initialization failed:', e);
            this.renderTextFallback(container);
            return null;
        }
    }
};

// ============================================================================
// Main Initialization Function
// ============================================================================
async function WeatherMapInit() {
    console.log('Weather-Map: Initializing...');
    
    const weatherContainer = document.getElementById('weather-container');
    const mapContainer = document.getElementById('map-container');

    // WEATHER: Show loading, then fetch
    if (weatherContainer) {
        try {
            // Show loading state first
            WeatherUI.renderLoading(weatherContainer);
            
            // Fetch weather (will use mock if needed)
            const data = await WeatherService.fetchWeather();
            WeatherUI.render(weatherContainer, data);
            
        } catch (error) {
            console.error('Weather: Init failed', error);
            // Render mock data as last resort
            WeatherUI.render(weatherContainer, getMockWeather());
        }
    }

    // MAP: Initialize
    if (mapContainer) {
        try {
            MapComponent.init('map-container');
        } catch (error) {
            console.error('Map: Init failed', error);
            MapComponent.renderTextFallback(mapContainer);
        }
    }
}

// Expose for retry button and failsafe
window.WeatherMapInit = WeatherMapInit;
console.log('=== weather-map.js: WeatherMapInit exposed to window ===');

// ============================================================================
// Auto-initialization
// ============================================================================
(function() {
    console.log('=== weather-map.js: Auto-init IIFE executing ===');
    console.log('Document readyState:', document.readyState);
    
    function init() {
        console.log('=== weather-map.js: Calling WeatherMapInit() ===');
        WeatherMapInit();
    }

    if (document.readyState === 'loading') {
        console.log('=== weather-map.js: Waiting for DOMContentLoaded ===');
        document.addEventListener('DOMContentLoaded', init);
    } else {
        console.log('=== weather-map.js: DOM already loaded, initializing immediately ===');
        init();
    }
})();

console.log('=== weather-map.js: Script loading completed ===');

    // Export for testing
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { WeatherService, WeatherUI, MapComponent, getMockWeather };
    }

})(); // End of IIFE
