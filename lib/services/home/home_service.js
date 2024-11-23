import apiService from '../apiService';
import { home_endpoint } from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const homeService = {
    getHomeData: async (params) => {
        try {
            const response = await apiService.get(home_endpoint, commonHeader,params);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default homeService;