import apiService from '../apiService';
import { remind_password_endpoint } from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const remindPasswordService = {
  remindPassword: async (userData) => {
    try {
      const response = await apiService.post(
        remind_password_endpoint,
        userData,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default remindPasswordService;
