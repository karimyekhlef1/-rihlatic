import apiService from '../apiService';
import { logout_endpoint } from '@/app/Constant/urls';
import { authHeader } from '@/app/Constant/headers';

const logoutService = {
  logoutUser: async (token) => {
    try {
      const response = await apiService.delete(
        logout_endpoint,
        authHeader(token)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default logoutService;
