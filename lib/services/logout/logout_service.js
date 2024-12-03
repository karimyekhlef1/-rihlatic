import apiService from '../apiService';
import { logout_endpoint } from '@/app/Constant/urls';

const logoutService = {
  logoutUser: async (token) => {
    if (!token) {
      throw new Error('No token provided');
    }
    try {
      const response = await apiService.post(logout_endpoint, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default logoutService;
