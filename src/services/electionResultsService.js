import apiClient from './api';

/**
 * Service for Election Results API
 */
const electionResultsService = {
    /**
     * Get position-wise analytics data
     * @param {string} position - Position number ('1', '2', or '3')
     */
    getPositionAnalytics: async (position) => {
        try {
            const response = await apiClient.get(`/election-results/analytics/${position}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching position ${position} analytics:`, error);
            throw error;
        }
    },

    /**
     * Get all election results
     */
    getAllResults: async () => {
        try {
            const response = await apiClient.get('/election-results');
            return response.data;
        } catch (error) {
            console.error('Error fetching all election results:', error);
            throw error;
        }
    },

    /**
     * Get election results by type
     * @param {string} electionType - Type of election (e.g., 'Assembly', 'Parliament')
     */
    getResultsByType: async (electionType) => {
        try {
            const response = await apiClient.get(`/election-results/type/${electionType}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching election results for type ${electionType}:`, error);
            throw error;
        }
    },

    /**
     * Get election results by year
     * @param {number} year - Election year
     */
    getResultsByYear: async (year) => {
        try {
            const response = await apiClient.get(`/election-results/year/${year}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching election results for year ${year}:`, error);
            throw error;
        }
    },

    /**
     * Get detailed position data by party, year, and election type
     * @param {string} position - Position number ('1', '2', or '3')
     * @param {string} party - Party name (e.g., 'BJP', 'INC')
     * @param {number} year - Election year
     * @param {string} electionType - Election type ('AC' or 'PE')
     */
    getPositionDetailsByParty: async (position, party, year, electionType) => {
        try {
            const response = await apiClient.get('/election-results/details', {
                params: {
                    position,
                    party,
                    year,
                    electionType
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching position details for ${party} in ${year}:`, error);
            throw error;
        }
    },
};

export default electionResultsService;
