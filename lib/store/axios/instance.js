import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

let token = '';

export function sessionExpired() {
  localStorage.clear();
  // Clear cookies
  // Cookies.remove('riho_token');
  window.location.reload();
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    token = localStorage.getItem('auth_token');
    if (!token || token.length < 40) {
      sessionExpired();
      return;
    }
    const user = jwtDecode(token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (isExpired) {
      sessionExpired();
      return;
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 401 || response.data.payload === 'undefined') {
      sessionExpired();
      return;
    }
    return response;
  },
  (error) => {
    if (error.message && error.message.includes('Invalid token specified')) {
      sessionExpired();
      return;
    }
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data.payload === 'undefined')
    ) {
      sessionExpired();
      return;
    }
    return Promise.reject(error);
  }
);

// Request interceptor to add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = storageUtils.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error (e.g., clear token and redirect to login)
      storageUtils.removeToken();
      // You might want to dispatch an action to reset the auth state
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
