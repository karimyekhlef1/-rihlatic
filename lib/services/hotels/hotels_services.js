import apiService from '../apiService';
import { hotel_details,search_hotel_endpoint} from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const hotelsService = {
    getHotelsData: async (params) => {
        const endpoint = search_hotel_endpoint
        try {
            const response = await apiService.get(endpoint, params,commonHeader);
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