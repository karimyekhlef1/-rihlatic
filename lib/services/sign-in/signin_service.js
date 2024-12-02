import apiService from '../apiService';
import { signin_endpoint } from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const signinService = {
  loginUser: async (credentials) => {
    try {
      const response = await apiService.post(
        signin_endpoint,
        credentials,
        commonHeader
      );
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },
  verifyToken: async (token) => {
    const response = await apiService.post(
      signin_endpoint,
      credentials,
      commonHeader
    );
    return {
      authToken: response?.result?.token === token,
      isValid: response?.success === true && response?.result?.auth === true,
      userData: response?.result?.user || null,
    };
  },
};

export default signinService;
