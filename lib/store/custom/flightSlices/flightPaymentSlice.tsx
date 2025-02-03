import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Traveler {
  first_name: string;
  last_name: string;
  type: "ADT" | "CHD" | "INF" | "INS" | "STD" | "YTH";
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
  dataOfSearch: any;
}

// Constants
const STORAGE_KEY = 'flightPaymentState';

// Initial state creator
const createInitialState = (): FlightPaymentState => ({
  currentStep: 2,
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
  dataOfSearch: null
});

// Storage utilities
const storage = {
  load: (): FlightPaymentState => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : createInitialState();
    } catch (err) {
      console.error('Failed to load flight payment state:', err);
      return createInitialState();
    }
  },
  
  save: (state: FlightPaymentState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Failed to save flight payment state:', err);
    }
  }
};

const flightPaymentSlice = createSlice({
  name: "flightPayment",
  initialState: storage.load(),
  reducers: {
    setDataOfSearch: (state, action: PayloadAction<any>) => {
      state.dataOfSearch = action.payload;
      storage.save(state);
    },
    
    setSelectedFlight: (state, action: PayloadAction<any>) => {
      state.selectedFlight = action.payload;
      storage.save(state);
    },
    
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      storage.save(state);
    },
    
    updateTraveler: (
      state,
      action: PayloadAction<{ index: string; data: Partial<Traveler> }>
    ) => {
      const { index, data } = action.payload;
      state.travelers[index] = { ...state.travelers[index], ...data };
      storage.save(state);
    },
    deletTravelers: (state) => {
      state.travelers = {} ;
      storage.save(state);
    },
    setContactInfo: (
      state,
      action: PayloadAction<{ email: string; phone: string; mobileCountry: string }>
    ) => {
      const { email, phone, mobileCountry } = action.payload;
      state.email = email;
      state.phone = phone;
      state.mobileCountry = mobileCountry;
      storage.save(state);
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
      storage.save(state);
    },
    clearState: () => {
      localStorage.removeItem(STORAGE_KEY);
      return createInitialState();
    }
  },
});

export const {
  setSelectedFlight,
  setCurrentStep,
  updateTraveler,
  setContactInfo,
  setPricing,
  setDataOfSearch,
  clearState,
  deletTravelers
} = flightPaymentSlice.actions;

export default flightPaymentSlice.reducer;