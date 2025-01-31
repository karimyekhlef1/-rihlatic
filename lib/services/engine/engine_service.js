import apiService from '../apiService';
import { getDestinationEngineUrl } from '@/app/Helper/engine';
import { commonHeader } from '@/app/Constant/headers';

const engineService = {
  get: async (data) => {
    try {
      const filterKey = data.type === 3 ? 'filter[name_fr]' : 'filter[search]';
      const url = `${getDestinationEngineUrl(data.type)}?${filterKey}=${data.search}`;
      const response = await apiService.get(url, commonHeader);
      return response;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      throw error;
    }
  },
};

export default engineService;
