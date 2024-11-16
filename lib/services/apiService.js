import axios from 'axios';

const apiService = {
    get: async (url, headers) => {
        try {
            const response = await axios.get(url, headers);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    post: async (url, credentials, headers) => {
        try {
            const response = await axios.post(url, credentials, headers);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    put: async (url, credentials, headers) => {
        try {
            const response = await axios.put(url, credentials, headers);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    delete: async (url, headers) => {
        try {
            const response = await axios.delete(url, headers);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default apiService;