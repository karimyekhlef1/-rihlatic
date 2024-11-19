import apiService from '../apiService';
import { account_endpoint } from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const accountService = {
    getAccountData : async ()=> {
        try {
            const response = await apiService.get(account_endpoint,commonHeader);
            return response;
        } catch (error) {
            throw error;
        }
    },
};
export default accountService;