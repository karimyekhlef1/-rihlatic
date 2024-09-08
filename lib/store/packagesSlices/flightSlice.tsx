import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FlightInfo {
  from: string;
  to: string;
  duration: string;
  departureAirport: string;
  departureAirportName: string;
  departureCode: string;
  departureTime: string;
  departureDate: string;
  arrivalAirport: string;
  arrivalAirportName: string;
  arrivalCode: string;
  arrivalTime: string;
  arrivalDate: string;
  airline: string;
  flightNumber: string;
  seatPitch: string;
  seatWidth: string;
  seatRecline: string;
  wifiOnBoard: boolean;
}

interface FlightState {
  flightInfo: FlightInfo;
  isExpanded: boolean;
}

const initialState: FlightState = {
  flightInfo: {
    from: 'Algiers',
    to: 'Paris',
    duration: '2h 20m',
    departureAirport: 'Algiers . ALG',
    departureAirportName: 'Houari Boumediene',
    departureCode: 'ALG',
    departureTime: '18:35',
    departureDate: 'Tue 24 Sep',
    arrivalAirport: 'Paris . ORY',
    arrivalAirportName: 'Paris Orly',
    arrivalCode: 'ORY',
    arrivalTime: '21:55',
    arrivalDate: 'Tue 24 Sep',
    airline: 'Air Algerie',
    flightNumber: 'AH 1008',
    seatPitch: '73-76 cm',
    seatWidth: '43 cm',
    seatRecline: '7 cm',
    wifiOnBoard: false,
  },
  isExpanded: false,
};

export const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    toggleExpanded: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    setFlightInfo: (state, action: PayloadAction<FlightInfo>) => {
      state.flightInfo = action.payload;
    },
  },
});

export const { toggleExpanded, setFlightInfo } = flightSlice.actions;

export default flightSlice.reducer;
