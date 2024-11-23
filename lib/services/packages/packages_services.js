import apiService from '../apiService';
import { packages_endpoint} from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const packagesService = {
    getPackagesData: async (params) => {
        try {
            const response = await apiService.get(packages_endpoint, commonHeader,params);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default packagesService;