import apiService from '../apiService';
import { signup_endpoint } from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const signupService = {
  registerUser: async (userData) => {
    try {
      const response = await apiService.post(
        signup_endpoint,
        userData,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default signupService;
