import apiService from '../apiService';
import { remind_password_endpoint } from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const remindPasswordService = {
  remindPassword: async (userData) => {
    try {
      // Format request data
      const requestData = {
        email: userData.email,
        // Add any other required fields based on API documentation
      };

      const response = await apiService.post(
        remind_password_endpoint,
        requestData,
        {
          ...commonHeader,
          'X-Requested-With': 'XMLHttpRequest', // Add this header for API compatibility
        }
      );
      return response;
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 404) {
        throw new Error('The password reset service is currently unavailable. Please try again later.');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (!error.response) {
        throw new Error('Network error. Please check your connection.');
      }
      throw new Error('An unexpected error occurred. Please try again.');
    }
  },
};

export default remindPasswordService;
