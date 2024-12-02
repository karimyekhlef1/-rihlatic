import apiService from '../apiService';
import { account_endpoint , edit_account_endpoint, update_password_endpoint, update_avatar_endpoint} from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const accountService = {
    getAccountData : async ()=> {
        try {
            const response = await apiService.get(account_endpoint, null, {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            });
            return response?.result?.user || null;
        } catch (error) {
            console.error('Account service error:', error);
            throw error;
        }
    },
    updateAccount: async (accountData)=> {
        try {
            const response = await apiService.patch(edit_account_endpoint,accountData , {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
            return response;
        } catch (error) {
            console.error('Account service error:', error);
            throw error;
        }
    },
    updatePassword: async (accountData)=> {
        try {
            const response = await apiService.patch(update_password_endpoint,accountData , {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
            return response;
        } catch (error) {
            console.error('Account service error:', error);
            throw error;
        }
    },
    updateAvatar: async (file)=> {
        try {
            const response = await apiService.post(update_avatar_endpoint,file , {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                },
              });
            return response;
        } catch (error) {
            console.error('Account service error:', error);
            throw error;
        }
    },

};
export default accountService;