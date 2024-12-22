import apiService from "../apiService";
import {
  omra_endpoint,
  omras_bookings_endpoint,
  omra_cancel_endpoint,
  omra_cancelPenalty_endpoint,
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
  getOmraReservationData: async (data) => {
    try {
      const response = await apiService.get(
        omras_bookings_endpoint,
        data,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  storeOmraReservation: async (data) => {
    try {
      const response = await apiService.post(
        omras_bookings_endpoint,
        data,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  cancelOmraPenalty: async (data) => {
    try {
      const response = await apiService.put(
        omra_cancelPenalty_endpoint,
        data,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default omrasService;
