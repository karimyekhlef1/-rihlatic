import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateRange } from "react-day-picker";

interface VolSearchState {
  dateRange: DateRange;
  volType: string;
  volMethod: string;
  volPassanger: volPassanger;
  volPackage: volPackage;
  volError: string;
  searchData: any | null;
  departureAirport: string;
  arrivalAirport: string;
}

interface volPassanger {
  adults: number;
  children: number;
  infants: number;
  infantsSeat: number;
  students: number;
  thirdAge: number;
}

interface volPackage {
  uniquePackage: boolean;
  refundable: boolean;
  directFlight: boolean;
  openReturn: boolean;
}

export const volEngineTypes = ["One Way", "Round Trip", "Multi Destinations"];
export const volEngineMethods = [
  "Not Specified",
  "Economy",
  "Premium Economy",
  "Business",
  "First Class",
];

const initialState: VolSearchState = {
  dateRange: {
    from: new Date(),
    to: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  volType: volEngineTypes[0],
  volMethod: volEngineMethods[0],
  volPassanger: {
    adults: 1,
    children: 0,
    infants: 0,
    infantsSeat: 0,
    students: 0,
    thirdAge: 0,
  },
  volPackage: {
    uniquePackage: false,
    refundable: false,
    directFlight: false,
    openReturn: false,
  },
  volError: "",
  searchData: null,
  departureAirport: "",
  arrivalAirport: "",
};

const volSearchSlice = createSlice({
  name: "volSearch",
  initialState,
  reducers: {
    setVolType: (state, action: PayloadAction<string>) => {
      state.volType = action.payload;
    },
    setVolMethod: (state, action: PayloadAction<string>) => {
      state.volMethod = action.payload;
    },
    setVolPassanger: (state, action: PayloadAction<volPassanger>) => {
      state.volPassanger = action.payload;
    },
    setVolPackage: (state, action: PayloadAction<volPackage>) => {
      state.volPackage = action.payload;
      console.log(state.volPackage);
    },
    setVolError: (state, action: PayloadAction<string>) => {
      state.volError = action.payload;
    },
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
    },
    setDepartureAirport: (state, action: PayloadAction<string>) => {
      state.departureAirport = action.payload;
    },
    setArrivalAirport: (state, action: PayloadAction<string>) => {
      state.arrivalAirport = action.payload;
    },
    setSearchData: (state) => {
      const flightClass = state.volMethod === "Not Specified" ? "NN" :
                         state.volMethod === "Economy" ? "M" :
                         state.volMethod === "Premium Economy" ? "W" :
                         state.volMethod === "Business" ? "C" :
                         state.volMethod === "First Class" ? "F" : "NN";

      state.searchData = {
        flightType: state.volType === "One Way" ? "ONE_WAY" :
                    state.volType === "Round Trip" ? "ROUND_TRIP" :
                    "MULTI_CITY",
        flightClass,
        quantityAdults: state.volPassanger.adults,
        quantityChild: state.volPassanger.children,
        quantityInfant: state.volPassanger.infants,
        quantityInfantWithSeat: state.volPassanger.infantsSeat,
        quantityStudent: state.volPassanger.students,
        quantitySenior: state.volPassanger.thirdAge,
        departureId: state.departureAirport,
        arrivalId: state.arrivalAirport,
        departureDate: state.dateRange.from?.toISOString().split('T')[0],
        arrivalDate: state.volType !== "ONE_WAY" ? state.dateRange.to?.toISOString().split('T')[0] : null,
        flightRefundable: state.volPackage.refundable,
        flightWithBaggage: state.volPackage.uniquePackage,
        directFlightsOnly: state.volPackage.directFlight,
        openReturn: state.volPackage.openReturn
      };
    },
  },
});

export const {
  setVolType,
  setVolMethod,
  setVolPassanger,
  setVolPackage,
  setDateRange,
  setVolError,
  setSearchData,
  setDepartureAirport,
  setArrivalAirport,
} = volSearchSlice.actions;

export default volSearchSlice.reducer;
