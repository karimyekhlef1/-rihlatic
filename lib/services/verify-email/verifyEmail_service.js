import apiService from '../apiService';
import { verif_email_endpoint } from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const verifyEmailService = {
  verifyEmail: async (userData) => {
    try {
      const response = await apiService.post(
        verif_email_endpoint,
        userData,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default verifyEmailService;
