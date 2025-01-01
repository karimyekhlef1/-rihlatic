import apiService from '../apiService';
import { engine_get_destinations_endpoint } from '@/app/Constant/urls';
import { getDestinationEngineUrl } from '@/app/Helper/engine';
import { commonHeader } from '@/app/Constant/headers';

const engineService = {
  get: async (data) => {
    try {
      const url = getDestinationEngineUrl(data.type) + `?filter[search]=${data.search}`;
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
