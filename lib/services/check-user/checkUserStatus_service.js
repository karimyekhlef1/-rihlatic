import apiService from '../apiService';
import { check_user_status_endpoint } from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const checkUserStatusService = {
  checkUserStatus: async (userData) => {
    try {
      const response = await apiService.post(
        check_user_status_endpoint,
        userData,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default checkUserStatusService;
