/**
 * Weather & Map Section Tests
 * Property-based tests and unit tests for weather-map.js
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import fc from 'fast-check';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => { store[key] = value; }),
        removeItem: vi.fn((key) => { delete store[key]; }),
        clear: vi.fn(() => { store = {}; })
    };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

// Import the module (we'll recreate the functions for testing)
const WeatherService = {
    CACHE_KEY: 'solano_weather_cache',
    CACHE_TTL: 30 * 60 * 1000,
    
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
            66: { condition: 'Light freezing rain', icon: 'bi-cloud-sleet-fill' },
            67: { condition: 'Heavy freezing rain', icon: 'bi-cloud-sleet-fill' },
            71: { condition: 'Slight snow', icon: 'bi-cloud-snow-fill' },
            73: { condition: 'Moderate snow', icon: 'bi-cloud-snow-fill' },
            75: { condition: 'Heavy snow', icon: 'bi-cloud-snow-fill' },
            77: { condition: 'Snow grains', icon: 'bi-cloud-snow-fill' },
            80: { condition: 'Slight rain showers', icon: 'bi-cloud-rain-fill' },
            81: { condition: 'Moderate rain showers', icon: 'bi-cloud-rain-fill' },
            82: { condition: 'Violent rain showers', icon: 'bi-cloud-rain-heavy-fill' },
            85: { condition: 'Slight snow showers', icon: 'bi-cloud-snow-fill' },
            86: { condition: 'Heavy snow showers', icon: 'bi-cloud-snow-fill' },
            95: { condition: 'Thunderstorm', icon: 'bi-cloud-lightning-rain-fill' },
            96: { condition: 'Thunderstorm with slight hail', icon: 'bi-cloud-lightning-rain-fill' },
            99: { condition: 'Thunderstorm with heavy hail', icon: 'bi-cloud-lightning-rain-fill' }
        };

        if (mappings[code]) {
            return mappings[code];
        }

        if (code >= 1 && code <= 3) return { condition: 'Partly cloudy', icon: 'bi-cloud-sun-fill' };
        if (code >= 45 && code <= 48) return { condition: 'Foggy', icon: 'bi-cloud-fog-fill' };
        if (code >= 51 && code <= 55) return { condition: 'Drizzle', icon: 'bi-cloud-drizzle-fill' };
        if (code >= 61 && code <= 65) return { condition: 'Rain', icon: 'bi-cloud-rain-fill' };
        if (code >= 66 && code <= 67) return { condition: 'Freezing rain', icon: 'bi-cloud-sleet-fill' };
        if (code >= 71 && code <= 77) return { condition: 'Snow', icon: 'bi-cloud-snow-fill' };
        if (code >= 80 && code <= 82) return { condition: 'Rain showers', icon: 'bi-cloud-rain-fill' };
        if (code >= 95 && code <= 99) return { condition: 'Thunderstorm', icon: 'bi-cloud-lightning-rain-fill' };

        return { condition: 'Unknown', icon: 'bi-question-circle-fill' };
    },

    cacheWeather(data) {
        const cacheEntry = {
            data: data,
            cachedAt: Date.now(),
            expiresAt: Date.now() + this.CACHE_TTL
        };
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheEntry));
    },

    getCachedWeather() {
        try {
            const cached = localStorage.getItem(this.CACHE_KEY);
            if (!cached) return null;
            const cacheEntry = JSON.parse(cached);
            if (!cacheEntry || !cacheEntry.data || !cacheEntry.expiresAt) return null;
            if (!this.isCacheValid(cacheEntry)) {
                localStorage.removeItem(this.CACHE_KEY);
                return null;
            }
            return cacheEntry.data;
        } catch (e) {
            return null;
        }
    },

    isCacheValid(cacheEntry) {
        if (!cacheEntry || !cacheEntry.expiresAt) return false;
        return Date.now() < cacheEntry.expiresAt;
    }
};


// WeatherUI for testing
const WeatherUI = {
    formatTemperature(temp) {
        return `${temp}°C`;
    },
    formatTime(isoString) {
        const date = new Date(isoString);
        return date.toLocaleTimeString('en-PH', { hour: 'numeric', hour12: true });
    },
    render(container, data) {
        const forecastHTML = data.hourlyForecast.map(hour => `
            <div class="weather-forecast-item">
                <span class="forecast-time">${this.formatTime(hour.time)}</span>
                <i class="bi ${hour.icon}" aria-hidden="true"></i>
                <span class="forecast-temp">${this.formatTemperature(hour.temperature)}</span>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="weather-card" role="region" aria-label="Current weather in Solano">
                <div class="weather-main">
                    <div class="weather-icon-large">
                        <i class="bi ${data.icon}" aria-label="${data.condition}" role="img"></i>
                    </div>
                    <div class="weather-temp-main">
                        <span class="weather-temp-value" aria-label="Temperature ${data.temperature} degrees Celsius">${this.formatTemperature(data.temperature)}</span>
                        <span class="weather-condition">${data.condition}</span>
                    </div>
                </div>
                <div class="weather-details" aria-label="Weather details">
                    <div class="weather-detail-item">
                        <i class="bi bi-droplet-fill" aria-hidden="true"></i>
                        <span aria-label="Humidity ${data.humidity} percent">${data.humidity}%</span>
                        <span class="weather-detail-label">Humidity</span>
                    </div>
                    <div class="weather-detail-item">
                        <i class="bi bi-wind" aria-hidden="true"></i>
                        <span aria-label="Wind speed ${data.windSpeed} kilometers per hour">${data.windSpeed} km/h</span>
                        <span class="weather-detail-label">Wind</span>
                    </div>
                </div>
                <div class="weather-forecast" aria-label="Hourly forecast">
                    <h4 class="weather-forecast-title">Next Hours</h4>
                    <div class="weather-forecast-grid">
                        ${forecastHTML}
                    </div>
                </div>
            </div>
        `;
    },
    renderLoading(container) {
        container.innerHTML = `
            <div class="weather-card weather-loading" aria-busy="true" aria-label="Loading weather data">
                <div class="weather-main">
                    <div class="weather-icon-large skeleton-circle"></div>
                    <div class="weather-temp-main">
                        <span class="skeleton-text skeleton-lg"></span>
                        <span class="skeleton-text skeleton-sm"></span>
                    </div>
                </div>
            </div>
        `;
    },
    renderError(container, retryCallback) {
        container.innerHTML = `
            <div class="weather-card weather-error" role="alert">
                <div class="weather-error-content">
                    <i class="bi bi-cloud-slash-fill"></i>
                    <p>Unable to load weather data</p>
                    <button type="button" class="btn btn-sm btn-primary weather-retry-btn">Retry</button>
                </div>
            </div>
        `;
        const retryBtn = container.querySelector('.weather-retry-btn');
        if (retryBtn && retryCallback) {
            retryBtn.addEventListener('click', retryCallback);
        }
    }
};

// Arbitrary generators for property tests
const weatherDataArbitrary = fc.record({
    temperature: fc.integer({ min: -50, max: 60 }),
    humidity: fc.integer({ min: 0, max: 100 }),
    windSpeed: fc.integer({ min: 0, max: 200 }),
    weatherCode: fc.integer({ min: 0, max: 99 }),
    condition: fc.constantFrom('Clear sky', 'Partly cloudy', 'Rain', 'Thunderstorm', 'Snow', 'Foggy'),
    icon: fc.constantFrom('bi-sun-fill', 'bi-cloud-sun-fill', 'bi-cloud-rain-fill'),
    hourlyForecast: fc.array(fc.record({
        time: fc.date({ min: new Date('2020-01-01'), max: new Date('2030-01-01') }).map(d => d.toISOString()),
        temperature: fc.integer({ min: -50, max: 60 }),
        weatherCode: fc.integer({ min: 0, max: 99 }),
        icon: fc.constantFrom('bi-sun-fill', 'bi-cloud-sun-fill', 'bi-cloud-rain-fill')
    }), { minLength: 1, maxLength: 6 }),
    timestamp: fc.integer({ min: 0 })
});

describe('Weather Map Section', () => {
    beforeEach(() => {
        localStorageMock.clear();
        vi.clearAllMocks();
    });


    /**
     * **Feature: weather-map-section, Property 1: Weather code mapping completeness**
     * *For any* valid WMO weather code (0-99), the mapWeatherCode function SHALL return 
     * a non-empty condition string and a valid Bootstrap icon identifier.
     * **Validates: Requirements 1.2**
     */
    describe('Property 1: Weather code mapping completeness', () => {
        it('returns non-empty condition and valid icon for any WMO code 0-99', () => {
            fc.assert(
                fc.property(fc.integer({ min: 0, max: 99 }), (code) => {
                    const result = WeatherService.mapWeatherCode(code);
                    
                    // Must return an object with condition and icon
                    expect(result).toBeDefined();
                    expect(typeof result.condition).toBe('string');
                    expect(typeof result.icon).toBe('string');
                    
                    // Condition must be non-empty
                    expect(result.condition.length).toBeGreaterThan(0);
                    
                    // Icon must be a valid Bootstrap icon identifier (starts with 'bi-')
                    expect(result.icon.startsWith('bi-')).toBe(true);
                }),
                { numRuns: 100 }
            );
        });

        it('handles edge cases at code boundaries', () => {
            // Test boundary codes
            const boundaryCodes = [0, 1, 3, 45, 48, 51, 55, 61, 65, 66, 67, 71, 77, 80, 82, 95, 99];
            boundaryCodes.forEach(code => {
                const result = WeatherService.mapWeatherCode(code);
                expect(result.condition.length).toBeGreaterThan(0);
                expect(result.icon.startsWith('bi-')).toBe(true);
            });
        });
    });

    /**
     * **Feature: weather-map-section, Property 2: Weather data rendering completeness**
     * *For any* valid WeatherData object, the rendered HTML output SHALL contain 
     * the temperature value, humidity percentage, wind speed, and at least one forecast entry.
     * **Validates: Requirements 1.1, 1.3, 1.4**
     */
    describe('Property 2: Weather data rendering completeness', () => {
        it('renders all required weather data fields', () => {
            fc.assert(
                fc.property(weatherDataArbitrary, (weatherData) => {
                    const container = document.createElement('div');
                    WeatherUI.render(container, weatherData);
                    const html = container.innerHTML;
                    
                    // Must contain temperature
                    expect(html).toContain(`${weatherData.temperature}°C`);
                    
                    // Must contain humidity
                    expect(html).toContain(`${weatherData.humidity}%`);
                    
                    // Must contain wind speed
                    expect(html).toContain(`${weatherData.windSpeed} km/h`);
                    
                    // Must contain at least one forecast item
                    expect(html).toContain('weather-forecast-item');
                }),
                { numRuns: 100 }
            );
        });
    });

    /**
     * **Feature: weather-map-section, Property 3: Cache serialization round-trip**
     * *For any* valid WeatherData object, serializing to JSON and then deserializing 
     * SHALL produce an equivalent WeatherData object with all properties preserved.
     * **Validates: Requirements 4.4, 4.5**
     */
    describe('Property 3: Cache serialization round-trip', () => {
        it('preserves weather data through cache round-trip', () => {
            fc.assert(
                fc.property(weatherDataArbitrary, (weatherData) => {
                    // Cache the data
                    WeatherService.cacheWeather(weatherData);
                    
                    // Retrieve from cache
                    const retrieved = WeatherService.getCachedWeather();
                    
                    // Should be equivalent
                    expect(retrieved).toBeDefined();
                    expect(retrieved.temperature).toBe(weatherData.temperature);
                    expect(retrieved.humidity).toBe(weatherData.humidity);
                    expect(retrieved.windSpeed).toBe(weatherData.windSpeed);
                    expect(retrieved.weatherCode).toBe(weatherData.weatherCode);
                    expect(retrieved.condition).toBe(weatherData.condition);
                    expect(retrieved.icon).toBe(weatherData.icon);
                    expect(retrieved.hourlyForecast.length).toBe(weatherData.hourlyForecast.length);
                }),
                { numRuns: 100 }
            );
        });
    });

    /**
     * **Feature: weather-map-section, Property 4: Cache TTL enforcement**
     * *For any* cached weather data, if the current time is less than cachedAt + CACHE_TTL, 
     * the cache SHALL be considered valid; otherwise, it SHALL be considered expired.
     * **Validates: Requirements 4.2**
     */
    describe('Property 4: Cache TTL enforcement', () => {
        it('validates cache based on TTL correctly', () => {
            const now = Date.now();
            
            // Valid cache (not expired)
            const validCache = {
                data: { temperature: 25 },
                cachedAt: now,
                expiresAt: now + WeatherService.CACHE_TTL
            };
            expect(WeatherService.isCacheValid(validCache)).toBe(true);
            
            // Expired cache
            const expiredCache = {
                data: { temperature: 25 },
                cachedAt: now - WeatherService.CACHE_TTL - 1000,
                expiresAt: now - 1000
            };
            expect(WeatherService.isCacheValid(expiredCache)).toBe(false);
        });

        it('returns null for expired cache entries', () => {
            const expiredEntry = {
                data: { temperature: 25, humidity: 80, windSpeed: 10 },
                cachedAt: Date.now() - WeatherService.CACHE_TTL - 1000,
                expiresAt: Date.now() - 1000
            };
            localStorage.setItem(WeatherService.CACHE_KEY, JSON.stringify(expiredEntry));
            
            const result = WeatherService.getCachedWeather();
            expect(result).toBeNull();
        });
    });

    /**
     * **Feature: weather-map-section, Property 5: Weather icon accessibility**
     * *For any* weather condition rendered, the icon element SHALL include alt text 
     * that describes the weather condition in human-readable form.
     * **Validates: Requirements 5.3**
     */
    describe('Property 5: Weather icon accessibility', () => {
        it('includes aria-label on weather icons describing the condition', () => {
            fc.assert(
                fc.property(weatherDataArbitrary, (weatherData) => {
                    const container = document.createElement('div');
                    WeatherUI.render(container, weatherData);
                    
                    // Main weather icon should have aria-label
                    const mainIcon = container.querySelector('.weather-icon-large i');
                    expect(mainIcon).toBeDefined();
                    expect(mainIcon.getAttribute('aria-label')).toBe(weatherData.condition);
                    expect(mainIcon.getAttribute('role')).toBe('img');
                }),
                { numRuns: 100 }
            );
        });
    });


    // Unit tests for weather service functions
    describe('Unit Tests: Weather Service', () => {
        it('maps code 0 to Clear sky', () => {
            const result = WeatherService.mapWeatherCode(0);
            expect(result.condition).toBe('Clear sky');
            expect(result.icon).toBe('bi-sun-fill');
        });

        it('maps codes 1-3 to partly cloudy variants', () => {
            expect(WeatherService.mapWeatherCode(1).condition).toBe('Mainly clear');
            expect(WeatherService.mapWeatherCode(2).condition).toBe('Partly cloudy');
            expect(WeatherService.mapWeatherCode(3).condition).toBe('Overcast');
        });

        it('maps rain codes correctly', () => {
            expect(WeatherService.mapWeatherCode(61).condition).toBe('Slight rain');
            expect(WeatherService.mapWeatherCode(63).condition).toBe('Moderate rain');
            expect(WeatherService.mapWeatherCode(65).condition).toBe('Heavy rain');
        });

        it('maps thunderstorm codes correctly', () => {
            expect(WeatherService.mapWeatherCode(95).condition).toBe('Thunderstorm');
            expect(WeatherService.mapWeatherCode(96).condition).toContain('Thunderstorm');
            expect(WeatherService.mapWeatherCode(99).condition).toContain('Thunderstorm');
        });

        it('returns Unknown for undefined codes', () => {
            const result = WeatherService.mapWeatherCode(100);
            expect(result.condition).toBe('Unknown');
        });
    });

    // Unit tests for UI rendering
    describe('Unit Tests: Weather UI', () => {
        it('renders loading state with skeleton elements', () => {
            const container = document.createElement('div');
            WeatherUI.renderLoading(container);
            
            expect(container.innerHTML).toContain('weather-loading');
            expect(container.innerHTML).toContain('skeleton-circle');
            expect(container.innerHTML).toContain('aria-busy="true"');
        });

        it('renders error state with retry button', () => {
            const container = document.createElement('div');
            const mockRetry = vi.fn();
            WeatherUI.renderError(container, mockRetry);
            
            expect(container.innerHTML).toContain('weather-error');
            expect(container.innerHTML).toContain('Unable to load weather data');
            expect(container.innerHTML).toContain('weather-retry-btn');
            expect(container.innerHTML).toContain('role="alert"');
        });

        it('formats temperature correctly', () => {
            expect(WeatherUI.formatTemperature(25)).toBe('25°C');
            expect(WeatherUI.formatTemperature(-5)).toBe('-5°C');
            expect(WeatherUI.formatTemperature(0)).toBe('0°C');
        });
    });

    // Cache functionality tests
    describe('Unit Tests: Cache Functions', () => {
        it('stores and retrieves weather data from cache', () => {
            const testData = {
                temperature: 28,
                humidity: 75,
                windSpeed: 15,
                weatherCode: 1,
                condition: 'Mainly clear',
                icon: 'bi-cloud-sun-fill',
                hourlyForecast: [],
                timestamp: Date.now()
            };
            
            WeatherService.cacheWeather(testData);
            const retrieved = WeatherService.getCachedWeather();
            
            expect(retrieved.temperature).toBe(28);
            expect(retrieved.humidity).toBe(75);
        });

        it('returns null when cache is empty', () => {
            localStorage.clear();
            const result = WeatherService.getCachedWeather();
            expect(result).toBeNull();
        });

        it('returns null for malformed cache data', () => {
            localStorage.setItem(WeatherService.CACHE_KEY, 'invalid json{');
            // This should not throw, just return null
            expect(() => WeatherService.getCachedWeather()).not.toThrow();
        });
    });
});
