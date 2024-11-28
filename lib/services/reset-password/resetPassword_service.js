import apiService from '../apiService';
import { reset_password_endpoint } from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const resetPasswordService = {
  resetPassword: async (userData) => {
    try {
      const response = await apiService.post(
        reset_password_endpoint,
        userData,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default resetPasswordService;
