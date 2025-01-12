import { Flight } from "./flight";

export interface RootState {
  vols: VolsState;
  volSearchSlice: VolSearchState;
}

export interface VolsState {
  loading: boolean;
  flightsData: Flight[];
  airportsData: any;
  error: string | null;
}

export interface VolSearchState {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  volType: string;
  volMethod: string;
  volPassanger: {
    adults: number;
    children: number;
    infants: number;
    infantsSeat: number;
    students: number;
    thirdAge: number;
  };
  volPackage: {
    uniquePackage: boolean;
    refundable: boolean;
    directFlight: boolean;
    openReturn: boolean;
  };
  volError: string;
  searchData: any | null;
  departureAirport: string;
  arrivalAirport: string;
}
