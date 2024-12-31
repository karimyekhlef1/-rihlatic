import apiService from '../apiService';
import { engine_get_destinations_endpoint } from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const engineService = {
  get: async (search) => {
    try {
      const url = engine_get_destinations_endpoint + `?filter[search]=${search}`;
      const response = await apiService.get(
        url,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default engineService;
