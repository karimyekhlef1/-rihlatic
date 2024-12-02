import axios from 'axios';

const getAuthToken = () => localStorage.getItem('auth_token');

const apiService = {
  get: async (url, params, headers = {}) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(url, {
        params,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  post: async (url, credentials, headers = {}) => {
    try {
      const token = getAuthToken();
      const combinedHeaders = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(url, credentials, {
        headers: combinedHeaders,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  put: async (url, credentials, headers = {}) => {
    try {
      const token = getAuthToken();
      const combinedHeaders = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(url, credentials, {
        headers: combinedHeaders,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  delete: async (url, headers = {}) => {
    try {
      const token = getAuthToken();
      const combinedHeaders = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(url, {
        headers: combinedHeaders,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  patch: async (url, credentials, headers = {}) => {
    try {
      const token = getAuthToken();
      const combinedHeaders = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.patch(url, credentials, {
        headers: combinedHeaders,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;