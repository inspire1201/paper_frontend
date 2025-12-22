import apiClient from './api';

class SurnameService {
    /**
     * Get all assemblies
     */
    async getAssemblies() {
        const response = await apiClient.get('/surname/assemblies');
        return response.data;
    }

    /**
     * Get category statistics
     * @param assemblyId - Single ID, comma-separated IDs, or 'all'
     * @param viewMode - 'separate' or 'combined'
     */
    async getCategoryStats(assemblyId, viewMode = 'separate') {
        const response = await apiClient.get('/surname/category', {
            params: {
                assembly_id: assemblyId,
                view_mode: viewMode
            }
        });
        return response.data;
    }

    /**
     * Get caste details for a category
     * @param category - Category name
     * @param assemblyId - Assembly ID (can be number, string of IDs, or 'all')
     */
    async getCasteDetails(category, assemblyId) {
        // If assemblyId is 0 or undefined, use 'all'
        const assembly_id = assemblyId === 0 || !assemblyId ? 'all' : assemblyId;

        const response = await apiClient.get('/surname/caste-details', {
            params: {
                category,
                assembly_id
            }
        });
        return response.data;
    }

    /**
     * Get caste statistics
     * @param assemblyId - Single ID, comma-separated IDs, or 'all'
     * @param viewMode - 'separate' or 'combined'
     */
    async getCasteStats(assemblyId, viewMode = 'separate') {
        const response = await apiClient.get('/surname/caste', {
            params: {
                assembly_id: assemblyId,
                view_mode: viewMode
            }
        });
        return response.data;
    }

    /**
     * Get surname similar details for a caste
     * @param caste - Caste name
     * @param assemblyId - Assembly ID (can be number, string of IDs, or 'all')
     */
    async getSurnameDetails(caste, assemblyId) {
        // If assemblyId is 0 or undefined, use 'all'
        const assembly_id = assemblyId === 0 || !assemblyId ? 'all' : assemblyId;

        const response = await apiClient.get('/surname/surname-details', {
            params: {
                caste,
                assembly_id
            }
        });
        return response.data;
    }

    /**
     * Get surname similar statistics
     * @param assemblyId - Single ID, comma-separated IDs, or 'all'
     * @param viewMode - 'separate' or 'combined'
     */
    async getSurnameSimilarStats(assemblyId, viewMode = 'separate') {
        const response = await apiClient.get('/surname/surname-similar', {
            params: {
                assembly_id: assemblyId,
                view_mode: viewMode
            }
        });
        return response.data;
    }

    /**
     * Search surnames
     * @param data - Search parameters
     */
    async searchSurnames(data) {
        const response = await apiClient.post('/surname/search', data);
        return response.data;
    }

    /**
     * Get all castes by area (In Area - By Caste)
     * Returns all castes with their total counts
     */
    async getAllCastesByArea() {
        const response = await apiClient.get('/surname/by-caste/all');
        return response.data;
    }

    /**
     * Get assembly-wise distribution for a specific caste
     * @param casteName - Name of the caste
     */
    async getCasteAssemblyDistribution(casteName) {
        const response = await apiClient.get('/surname/by-caste/assembly', {
            params: {
                caste: casteName
            }
        });
        return response.data;
    }

    /**
     * Get all categories by area (In Area - By Category)
     * Returns all categories with their total counts
     */
    async getAllCategoriesByArea() {
        const response = await apiClient.get('/surname/by-category/all');
        return response.data;
    }

    /**
     * Get assembly-wise distribution for a specific category
     * @param categoryName - Name of the category
     */
    async getCategoryAssemblyDistribution(categoryName) {
        const response = await apiClient.get('/surname/by-category/assembly', {
            params: {
                category: categoryName
            }
        });
        return response.data;
    }

    /**
     * Get all assembly caste detail data
     * Returns comprehensive statistics for all assemblies
     */
    async getAllAssemblyCasteDetail() {
        const response = await apiClient.get('/surname/assembly-caste-detail');
        return response.data;
    }

}

export default new SurnameService();
