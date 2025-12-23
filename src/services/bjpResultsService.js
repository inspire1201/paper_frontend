import apiClient from './api';

/**
 * Service for BJP Results API
 */
const bjpResultsService = {
    /**
     * Get all BJP results
     */
    getAllResults: async () => {
        try {
            const response = await apiClient.get('/bjp-results/all');
            return response.data;
        } catch (error) {
            console.error('Error fetching all BJP results:', error);
            throw error;
        }
    },

    /**
     * Get BJP results by election type
     * @param {string} electionType - Type of election (e.g., 'Assembly', 'Parliament')
     */
    getResultsByType: async (electionType) => {
        try {
            const response = await apiClient.get(`/bjp-results/type/${electionType}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching BJP results for type ${electionType}:`, error);
            throw error;
        }
    },

    /**
     * Get BJP results by year
     * @param {number} year - Election year
     */
    getResultsByYear: async (year) => {
        try {
            const response = await apiClient.get(`/bjp-results/year/${year}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching BJP results for year ${year}:`, error);
            throw error;
        }
    },
};

export default bjpResultsService;
