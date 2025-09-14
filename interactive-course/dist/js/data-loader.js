// Data Loader Utility
// Handles loading JSON data files asynchronously

class DataLoader {
    constructor() {
        this.cache = new Map();
        this.loading = new Map();
    }

    /**
     * Load JSON data from a file
     * @param {string} filePath - Path to the JSON file
     * @returns {Promise<Object>} Promise that resolves to the JSON data
     */
    async loadJSON(filePath) {
        // Check cache first
        if (this.cache.has(filePath)) {
            return this.cache.get(filePath);
        }

        // Check if already loading
        if (this.loading.has(filePath)) {
            return this.loading.get(filePath);
        }

        // Start loading
        const loadPromise = this._fetchJSON(filePath);
        this.loading.set(filePath, loadPromise);

        try {
            const data = await loadPromise;
            this.cache.set(filePath, data);
            this.loading.delete(filePath);
            return data;
        } catch (error) {
            this.loading.delete(filePath);
            throw error;
        }
    }

    /**
     * Internal method to fetch JSON data
     * @param {string} filePath - Path to the JSON file
     * @returns {Promise<Object>} Promise that resolves to the JSON data
     */
    async _fetchJSON(filePath) {
        try {
            const response = await fetch(filePath);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error loading JSON file ${filePath}:`, error);
            throw error;
        }
    }

    /**
     * Load quiz questions for a specific topic
     * @param {string} topicId - Topic identifier (optional, defaults to 'default')
     * @returns {Promise<Array>} Promise that resolves to quiz questions array
     */
    async loadQuizQuestions(topicId = 'default') {
        try {
            const quizData = await this.loadJSON('../data/quizzes/questions.json');
            return quizData[topicId] || quizData['default'] || [];
        } catch (error) {
            console.error('Error loading quiz questions:', error);
            return [];
        }
    }

    /**
     * Load configuration settings
     * @returns {Promise<Object>} Promise that resolves to configuration object
     */
    async loadConfig() {
        try {
            return await this.loadJSON('../data/config/settings.json');
        } catch (error) {
            console.error('Error loading configuration:', error);
            return {};
        }
    }

    /**
     * Load content examples
     * @returns {Promise<Object>} Promise that resolves to content examples object
     */
    async loadContent() {
        try {
            return await this.loadJSON('../data/content/examples.json');
        } catch (error) {
            console.error('Error loading content:', error);
            return {};
        }
    }

    /**
     * Clear the cache
     */
    clearCache() {
        this.cache.clear();
        this.loading.clear();
    }

    /**
     * Get cache size
     * @returns {number} Number of cached items
     */
    getCacheSize() {
        return this.cache.size;
    }
}

// Create global instance
const dataLoader = new DataLoader();

// Export for use in other modules
window.DataLoader = DataLoader;
window.dataLoader = dataLoader;