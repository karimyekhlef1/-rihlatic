import apiService from "../apiService";
import {
  omra_endpoint,
  omras_bookings_endpoint,
  omra_cancelPenalty_endpoint,
  omras_shopping_card_endpoint,
  omras_get_pricing_endpoint,
} from "@/app/Constant/urls";
import { commonHeader } from "@/app/Constant/headers";

const omrasService = {
  getOmraData: async (data) => {
    try {
      const response = await apiService.get(omra_endpoint, data, commonHeader);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getOmraReservationData: async (params) => {
    try {
      // If endpoint is provided in params, use it, otherwise use the default endpoint
      const endpoint = params.endpoint || omras_bookings_endpoint;
      // Remove endpoint from params to avoid sending it as a query parameter
      const { endpoint: _, ...queryParams } = params;
      
      const response = await apiService.get(
        endpoint,
        queryParams,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  storeOmraReservation: async (formData) => {
    try {
      const response = await apiService.post(
        omras_bookings_endpoint,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelOmraPenalty: async (data, id) => {
    try {
      const endpoint = omra_cancelPenalty_endpoint.replace(":id", id);
      console.log("Cancel Penalty URL:", endpoint);
      console.log("Cancel Penalty Data:", data);
      console.log("Cancel Penalty ID:", id);

      const response = await apiService.put(endpoint, data, commonHeader);
      console.log("Cancel Penalty Response:", response);
      return response;
    } catch (error) {
      console.error("Cancel Penalty Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },
  storeShoppingCard: async (data) => {
    try {
      const response = await apiService.post(
        omras_shopping_card_endpoint,
        data,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  pricingShoppingCard: async (token) => {
    try {
      const response = await apiService.get(
        `${omras_get_pricing_endpoint}/${token}`,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default omrasService;
