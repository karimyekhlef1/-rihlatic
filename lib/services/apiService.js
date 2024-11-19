import axios from 'axios';
const token = '220|gnFp5e0YXsDXdVVwVslLXWSEkd5NS26A5fOWnnPq67a799e8'; // for testing
const apiService = {
    get: async (url, headers) => {
        try {
           // for testing
            const combinedHeaders = {
                ...headers,
                Authorization: `Bearer ${token}`,
            };
            // 
            const response = await axios.get(url,{headers :combinedHeaders});
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
    patch: async (url, credentials, headers) => {
        try {
                 const combinedHeaders = {
                ...headers,
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.patch(url, credentials, {headers:combinedHeaders});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default apiService;