import apiService from '../apiService';
import { hotel_details} from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const hotelsService = {
    getHotelsData: async (params) => {
        const {id = null, ...restParams} = params
        const endpoint = id ? `${packages_endpoint}/${id}` : packages_endpoint
        try {
            const response = await apiService.get(endpoint, restParams,commonHeader);
            return response;
        } catch (error) {
            throw error;
        }
    },
    getHotelsDetails: async (Data) => {
        try {
            const response = await apiService.post(hotel_details,Data);
            return response;
        } catch (error) {
            throw error;
        }
    },
}
export default hotelsService;