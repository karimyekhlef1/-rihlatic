import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Traveler {
  first_name: string;
  last_name: string;
  type: "ADT" | "CHD" | "INF" | "INS" | "STD" | "SNR"; // Adult, Child, Infant, Infant with seat, Student, Senior
  nationality: string;
  gender: "male" | "female";
  birth_date: string;
  passport_nbr: string;
  passport_expire_at: string;
  passport_scan: string | null;
}

interface FlightPaymentState {
  currentStep: number;
  selectedFlight: any;
  travelers: Record<string, Traveler>;
  email: string;
  phone: string;
  mobileCountry: string;
  flightType: "ONE_WAY" | "ROUND_TRIP" | "MULTI_DESTINATION";
  flightClass: "NN" | "M" | "W" | "C" | "F";
  price: number;
  tax_price: number;
  price_agency: number;
}

const initialState: FlightPaymentState = {
  currentStep: 1,
  selectedFlight: null,
  travelers: {},
  email: "",
  phone: "",
  mobileCountry: "+213",
  flightType: "ONE_WAY",
  flightClass: "NN",
  price: 0,
  tax_price: 0,
  price_agency: 0,
};

const flightPaymentSlice = createSlice({
  name: "flightPayment",
  initialState,
  reducers: {
    setSelectedFlight: (state, action: PayloadAction<any>) => {
      state.selectedFlight = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateTraveler: (
      state,
      action: PayloadAction<{ index: string; data: Partial<Traveler> }>
    ) => {
      const { index, data } = action.payload;
      state.travelers[index] = { ...state.travelers[index], ...data };
    },
    setContactInfo: (
      state,
      action: PayloadAction<{ email: string; phone: string; mobileCountry: string }>
    ) => {
      const { email, phone, mobileCountry } = action.payload;
      state.email = email;
      state.phone = phone;
      state.mobileCountry = mobileCountry;
    },
    setPricing: (
      state,
      action: PayloadAction<{
        price: number;
        tax_price: number;
        price_agency: number;
      }>
    ) => {
      const { price, tax_price, price_agency } = action.payload;
      state.price = price;
      state.tax_price = tax_price;
      state.price_agency = price_agency;
    },
  },
});

export const {
  setSelectedFlight,
  setCurrentStep,
  updateTraveler,
  setContactInfo,
  setPricing,
} = flightPaymentSlice.actions;

export default flightPaymentSlice.reducer;
