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
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default signinService;
