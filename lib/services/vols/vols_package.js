import apiService from "../apiService";
import {
  flights_search_endpoint,
  airports_endpoint,
} from "@/app/Constant/urls";
import { commonHeader } from "@/app/Constant/headers";

const volsService = {
  searchFlights: async (data) => {
    try {
      const response = await apiService.post(
        flights_search_endpoint,
        data,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  getAirportsData: async (searchTerm) => {
    try {
      const endpoint = `${airports_endpoint.split("?")[0]}?filter[search]=${searchTerm}`;
      const response = await apiService.get(endpoint, null, commonHeader);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default volsService;
