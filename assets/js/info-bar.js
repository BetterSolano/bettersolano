/**
 * Real-Time Information Bar Module
 * Displays live exchange rates, weather, and Philippine Time
 */

// ============================================
// FORMATTER FUNCTIONS
// ============================================

/**
 * Format exchange rate to 2 decimal places
 * @param {number} rate - The exchange rate value
 * @returns {string} Formatted rate with 2 decimal places
 */
function formatExchangeRate(rate) {
    if (rate === null || rate === undefined || isNaN(rate)) {
        return '--';
    }
    return Number(rate).toFixed(2);
}

/**
 * Format temperature with °C suffix
 * @param {number} temp - Temperature in Celsius
 * @returns {string} Formatted temperature with °C
 */
function formatTemperature(temp) {
    if (temp === null || temp === undefined || isNaN(temp)) {
        return '--°C';
    }
    return `${Math.round(temp)}°C`;
}

/**
 * Format time in 12-hour format with AM/PM
 * @param {Date} date - Date object to format
 * @returns {string} Formatted time (e.g., "2:30 PM")
 */
function formatTime12Hour(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return '--:-- --';
    }
    
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutesStr} ${ampm}`;
}

/**
 * Format date in readable format (e.g., "Dec 1, 2025")
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date
 */
function formatDateShort(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return '--- --, ----';
    }
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month} ${day}, ${year}`;
}

/**
 * Format currency display with code and rate
 * @param {string} code - Currency code (e.g., "USD")
 * @param {number} rate - Exchange rate value
 * @returns {string} Formatted display (e.g., "USD 56.50")
 */
function formatCurrencyDisplay(code, rate) {
    return `${code} ${formatExchangeRate(rate)}`;
}


// ============================================
// CACHE MANAGER
// ============================================

const CacheManager = {
    /**
     * Serialize data to JSON with timestamp
     * @param {any} data - Data to serialize
     * @returns {string} JSON string with timestamp
     */
    serialize(data) {
        return JSON.stringify({
            data: data,
            timestamp: Date.now()
        });
    },

    /**
     * Deserialize JSON string back to object
     * @param {string} json - JSON string to parse
     * @returns {object|null} Parsed object or null if invalid
     */
    deserialize(json) {
        try {
            const parsed = JSON.parse(json);
            return parsed;
        } catch (e) {
            console.error('CacheManager: Failed to deserialize', e);
            return null;
        }
    },

    /**
     * Validate cached data structure
     * @param {object} data - Data to validate
     * @param {object} schema - Schema with required fields
     * @returns {boolean} True if valid
     */
    validate(data, schema) {
        if (!data || typeof data !== 'object') {
            return false;
        }
        
        // Check for timestamp
        if (typeof data.timestamp !== 'number') {
            return false;
        }
        
        // Check for data property
        if (!('data' in data)) {
            return false;
        }
        
        // If schema has required fields, validate them
        if (schema && schema.requiredFields) {
            for (const field of schema.requiredFields) {
                if (!(field in data.data)) {
                    return false;
                }
            }
        }
        
        return true;
    },

    /**
     * Get cached data from LocalStorage
     * @param {string} key - Cache key
     * @returns {object|null} Cached data or null
     */
    get(key) {
        try {
            const json = localStorage.getItem(key);
            if (!json) return null;
            
            const cached = this.deserialize(json);
            if (!cached) return null;
            
            return cached;
        } catch (e) {
            console.error('CacheManager: Failed to get cache', e);
            return null;
        }
    },

    /**
     * Set cached data in LocalStorage
     * @param {string} key - Cache key
     * @param {any} data - Data to cache
     * @param {number} ttl - Time to live in milliseconds
     */
    set(key, data, ttl) {
        try {
            const cacheData = {
                data: data,
                timestamp: Date.now(),
                ttl: ttl
            };
            localStorage.setItem(key, JSON.stringify(cacheData));
        } catch (e) {
            console.error('CacheManager: Failed to set cache', e);
        }
    },

    /**
     * Check if cached data is expired
     * @param {object} cachedData - Cached data object with timestamp and ttl
     * @returns {boolean} True if expired
     */
    isExpired(cachedData) {
        if (!cachedData || !cachedData.timestamp || !cachedData.ttl) {
            return true;
        }
        return Date.now() - cachedData.timestamp > cachedData.ttl;
    }
};


// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    EXCHANGE_RATE_TTL: 30 * 60 * 1000,  // 30 minutes
    WEATHER_TTL: 15 * 60 * 1000,         // 15 minutes
    TIME_UPDATE_INTERVAL: 1000,          // 1 second
    SOLANO_LAT: 16.5167,
    SOLANO_LON: 121.1833,
    CURRENCIES: ['USD', 'GBP', 'SAR', 'AED', 'JPY', 'CAD', 'AUD'],
    CACHE_KEYS: {
        EXCHANGE_RATES: 'infobar_exchange_rates',
        WEATHER: 'infobar_weather'
    }
};

// ============================================
// EXCHANGE RATE SERVICE
// ============================================

const ExchangeRateService = {
    /**
     * Fetch exchange rates from API
     * Uses frankfurter.app (free, no API key required)
     * Note: This API uses EUR as base, so we need to convert to PHP
     * @returns {Promise<object>} Exchange rates relative to PHP
     */
    async fetchRates() {
        try {
            // Using exchangerate.host which is free and supports PHP as base
            const currencies = CONFIG.CURRENCIES.join(',');
            const response = await fetch(
                `https://api.exchangerate.host/latest?base=PHP&symbols=${currencies}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.success && data.rates) {
                // Some APIs return rates directly
                return this.processRates(data.rates);
            }
            
            if (data.rates) {
                return this.processRates(data.rates);
            }
            
            throw new Error('Invalid API response');
        } catch (error) {
            console.error('ExchangeRateService: Failed to fetch rates', error);
            // Try fallback API
            return this.fetchRatesFallback();
        }
    },

    /**
     * Fallback API using Open Exchange Rates style endpoint
     */
    async fetchRatesFallback() {
        try {
            // Using a different free API as fallback
            const response = await fetch(
                'https://open.er-api.com/v6/latest/PHP'
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.rates) {
                return this.processRates(data.rates);
            }
            
            throw new Error('Invalid fallback API response');
        } catch (error) {
            console.error('ExchangeRateService: Fallback also failed', error);
            return null;
        }
    },

    /**
     * Process rates to only include configured currencies
     * @param {object} rates - Raw rates from API
     * @returns {object} Processed rates
     */
    processRates(rates) {
        const processed = {};
        for (const currency of CONFIG.CURRENCIES) {
            if (rates[currency] !== undefined) {
                // API returns how much of each currency equals 1 PHP
                // We want to show how much PHP equals 1 of each currency
                // So we need to invert: 1 / rate
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
    },

    /**
     * Get cached exchange rates
     * @returns {object|null} Cached rates or null
     */
    getCachedRates() {
        const cached = CacheManager.get(CONFIG.CACHE_KEYS.EXCHANGE_RATES);
        if (cached && !CacheManager.isExpired(cached)) {
            return cached.data;
        }
        return null;
    },

    /**
     * Cache exchange rates
     * @param {object} data - Rates data to cache
     */
    cacheRates(data) {
        CacheManager.set(CONFIG.CACHE_KEYS.EXCHANGE_RATES, data, CONFIG.EXCHANGE_RATE_TTL);
    },

    /**
     * Get rates (from cache or API)
     * @returns {Promise<object>} Exchange rates
     */
    async getRates() {
        // Try cache first
        const cached = this.getCachedRates();
        if (cached) {
            return cached;
        }

        // Fetch from API
        const rates = await this.fetchRates();
        if (rates) {
            this.cacheRates(rates);
            return rates;
        }

        // Return fallback structure
        return {
            rates: CONFIG.CURRENCIES.reduce((acc, curr) => {
                acc[curr] = null;
                return acc;
            }, {}),
            timestamp: Date.now(),
            base: 'PHP'
        };
    }
};


// ============================================
// WEATHER SERVICE
// ============================================

const WeatherService = {
    /**
     * Fetch weather data from Open-Meteo API (free, no API key required)
     * @returns {Promise<object>} Weather data
     */
    async fetchWeather() {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${CONFIG.SOLANO_LAT}&longitude=${CONFIG.SOLANO_LON}&current_weather=true`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.current_weather && typeof data.current_weather.temperature === 'number') {
                return {
                    temperature: data.current_weather.temperature,
                    timestamp: Date.now(),
                    location: {
                        lat: CONFIG.SOLANO_LAT,
                        lon: CONFIG.SOLANO_LON,
                        name: 'Solano, Nueva Vizcaya'
                    }
                };
            }
            
            throw new Error('Invalid weather API response');
        } catch (error) {
            console.error('WeatherService: Failed to fetch weather', error);
            return null;
        }
    },

    /**
     * Get cached weather data
     * @returns {object|null} Cached weather or null
     */
    getCachedWeather() {
        const cached = CacheManager.get(CONFIG.CACHE_KEYS.WEATHER);
        if (cached && !CacheManager.isExpired(cached)) {
            return cached.data;
        }
        return null;
    },

    /**
     * Cache weather data
     * @param {object} data - Weather data to cache
     */
    cacheWeather(data) {
        CacheManager.set(CONFIG.CACHE_KEYS.WEATHER, data, CONFIG.WEATHER_TTL);
    },

    /**
     * Get weather (from cache or API)
     * @returns {Promise<object>} Weather data
     */
    async getWeather() {
        // Try cache first
        const cached = this.getCachedWeather();
        if (cached) {
            return cached;
        }

        // Fetch from API
        const weather = await this.fetchWeather();
        if (weather) {
            this.cacheWeather(weather);
            return weather;
        }

        // Return fallback structure
        return {
            temperature: null,
            timestamp: Date.now(),
            location: {
                lat: CONFIG.SOLANO_LAT,
                lon: CONFIG.SOLANO_LON,
                name: 'Solano, Nueva Vizcaya'
            }
        };
    }
};


// ============================================
// TIME SERVICE
// ============================================

const TimeService = {
    /**
     * Get current Philippine Time (UTC+8)
     * @returns {Date} Current PHT date
     */
    getCurrentPHTDate() {
        const now = new Date();
        // Get UTC time and add 8 hours for PHT
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const pht = new Date(utc + (8 * 60 * 60 * 1000));
        return pht;
    },

    /**
     * Get formatted Philippine Time string
     * @returns {string} Formatted time (e.g., "2:30 PM")
     */
    getCurrentPHT() {
        const phtDate = this.getCurrentPHTDate();
        return formatTime12Hour(phtDate);
    },

    /**
     * Get formatted Philippine Date string
     * @returns {string} Formatted date (e.g., "Dec 1, 2025")
     */
    getCurrentPHTDate_Formatted() {
        const phtDate = this.getCurrentPHTDate();
        return formatDateShort(phtDate);
    }
};


// ============================================
// INFO BAR MANAGER
// ============================================

const InfoBarManager = {
    intervals: {
        time: null,
        weather: null,
        exchangeRates: null,
        rateRotation: null
    },
    currentRateIndex: 0,
    currentRates: null,
    
    /**
     * Initialize the info bar
     */
    async init() {
        // Initial render with loading state
        this.renderLoading();
        
        // Fetch and render data
        await this.updateAll();
        
        // Start periodic updates
        this.startUpdates();
    },

    /**
     * Render loading state
     */
    renderLoading() {
        // Time updates immediately
        this.renderTime();
    },

    /**
     * Update all data sources
     */
    async updateAll() {
        await Promise.all([
            this.updateExchangeRates(),
            this.updateWeather()
        ]);
        this.renderTime();
    },

    /**
     * Update exchange rates
     */
    async updateExchangeRates() {
        const data = await ExchangeRateService.getRates();
        this.currentRates = data;
        this.renderCurrentRate();
    },

    /**
     * Update weather
     */
    async updateWeather() {
        const data = await WeatherService.getWeather();
        this.renderWeather(data);
    },

    /**
     * Render the current rotating rate to DOM
     */
    renderCurrentRate() {
        const displayElement = document.querySelector('.rate-display');
        if (!displayElement || !this.currentRates || !this.currentRates.rates) return;
        
        const currency = CONFIG.CURRENCIES[this.currentRateIndex];
        const rate = this.currentRates.rates[currency];
        const formattedRate = formatExchangeRate(rate);
        
        // Update display with animation
        displayElement.style.animation = 'none';
        displayElement.offsetHeight; // Trigger reflow
        displayElement.style.animation = 'rateFadeIn 0.4s ease-out';
        displayElement.textContent = `1 ${currency} = ₱ ${formattedRate}`;
    },

    /**
     * Rotate to next currency
     */
    rotateRate() {
        this.currentRateIndex = (this.currentRateIndex + 1) % CONFIG.CURRENCIES.length;
        this.renderCurrentRate();
    },

    /**
     * Legacy render method for backwards compatibility
     * @param {object} data - Exchange rate data
     */
    renderExchangeRates(data) {
        this.currentRates = data;
        this.renderCurrentRate();
    },

    /**
     * Render weather to DOM
     * @param {object} data - Weather data
     */
    renderWeather(data) {
        const tempElement = document.querySelector('.weather-temp');
        if (tempElement) {
            tempElement.textContent = formatTemperature(data?.temperature);
        }
    },

    /**
     * Render time and date to DOM
     */
    renderTime() {
        const timeElement = document.querySelector('.time-value');
        if (timeElement) {
            timeElement.textContent = TimeService.getCurrentPHT();
        }
        
        const dateElement = document.querySelector('.date-value');
        if (dateElement) {
            dateElement.textContent = TimeService.getCurrentPHTDate_Formatted();
        }
    },

    /**
     * Start periodic updates
     */
    startUpdates() {
        // Time updates every second
        this.intervals.time = setInterval(() => {
            this.renderTime();
        }, CONFIG.TIME_UPDATE_INTERVAL);

        // Rate rotation every 4 seconds
        this.intervals.rateRotation = setInterval(() => {
            this.rotateRate();
        }, 4000);

        // Weather updates every 15 minutes
        this.intervals.weather = setInterval(() => {
            this.updateWeather();
        }, CONFIG.WEATHER_TTL);

        // Exchange rates update every 30 minutes
        this.intervals.exchangeRates = setInterval(() => {
            this.updateExchangeRates();
        }, CONFIG.EXCHANGE_RATE_TTL);
    },

    /**
     * Stop all periodic updates
     */
    stopUpdates() {
        if (this.intervals.time) {
            clearInterval(this.intervals.time);
            this.intervals.time = null;
        }
        if (this.intervals.rateRotation) {
            clearInterval(this.intervals.rateRotation);
            this.intervals.rateRotation = null;
        }
        if (this.intervals.weather) {
            clearInterval(this.intervals.weather);
            this.intervals.weather = null;
        }
        if (this.intervals.exchangeRates) {
            clearInterval(this.intervals.exchangeRates);
            this.intervals.exchangeRates = null;
        }
    }
};

// ============================================
// INITIALIZATION
// ============================================

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Check if info bar exists on page
        const infoBar = document.querySelector('.info-bar');
        if (infoBar) {
            InfoBarManager.init();
        }
    });
}
