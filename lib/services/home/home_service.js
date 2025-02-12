import apiService from '../apiService';
import { home_endpoint } from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const homeService = {
    getHomeData: async (params) => {
        try {
            const response = await apiService.get(home_endpoint, params , commonHeader);
            return response.result
        } catch (error) {
            throw error;
        }
    },
};

export default homeService;