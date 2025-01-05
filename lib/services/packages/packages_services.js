import apiService from '../apiService';
import { packages_endpoint ,package_bookings_endpoint , package_cancelPenalty_endpoint} from '@/app/Constant/urls';
import { commonHeader } from '@/app/Constant/headers';

const packagesService = {
    getPackagesData: async (params) => {
        const {id = null, ...restParams} = params
        const endpoint = id ? `${packages_endpoint}/${id}` : packages_endpoint
        try {
            const response = await apiService.get(endpoint, restParams,commonHeader);
            return response;
        } catch (error) {
            throw error;
        }
    },
    getPackagesReservationData: async (params) => {
      const {id = null, ...restParams} = params
      const endpoint = id ? `${package_bookings_endpoint}/${id}` : package_bookings_endpoint

        try {
          const response = await apiService.get(
            endpoint, restParams,commonHeader
          );
          return response;
        } catch (error) {
          throw error;
        }
      },
      storePackageReservation: async (data) => {
        try {
          const response = await apiService.post(
            package_bookings_endpoint,
            data,
            commonHeader
          );
          return response;
        } catch (error) {
          throw error;
        }
      },
      cancelPackagePenalty: async (id) => {
       
        const endpoint = `${package_cancelPenalty_endpoint}${id}`
        try {
          const response = await apiService.put(
            endpoint,
            commonHeader
          );
          console.log("response",response)
          return response;
        } catch (error) {
          throw error;
        }
      },

};

export default packagesService;