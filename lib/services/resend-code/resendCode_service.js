import apiService from '../apiService';
import { resend_code_endpoint } from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const resendCodeService = {
  resendCode: async (userData) => {
    try {
      const response = await apiService.post(
        resend_code_endpoint,
        userData,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default resendCodeService;
