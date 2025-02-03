import apiService from "../apiService";
import {
  flights_search_endpoint,
  airports_endpoint,
  flights_conditions_endpoint,
  stor_flights,
  vol_bookings_endpoint
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
  getVolsReservation:async (params) => {
    const {id = null, ...restParams} = params
   const endpoint = id ? `${vol_bookings_endpoint}/${id}` : vol_bookings_endpoint

    try {
      const response = await apiService.get(endpoint, restParams, commonHeader);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getFlightsConditions: async (data) => {
    try {
      const response = await apiService.post(
        flights_conditions_endpoint,
        data,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  storReservationFlights:async(data)=>{
    try {
      const response = await apiService.post(
        stor_flights,
        data,
        commonHeader
      );
      return response;
    } catch (error) {
      throw error;
    }

  }
};

export default volsService;
