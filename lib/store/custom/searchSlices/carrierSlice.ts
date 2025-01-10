import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Carrier {
  code: string;
  name: string;
  logo?: string;
}

interface CarrierState {
  carriers: Carrier[];
  searchTerm: string;
  selectedCarriers: string[];
  showAll: boolean;
}

const initialState: CarrierState = {
  carriers: [],
  searchTerm: '',
  selectedCarriers: [],
  showAll: false,
};

const carrierSlice = createSlice({
  name: 'carriers',
  initialState,
  reducers: {
    setCarriers: (state, action: PayloadAction<Carrier[]>) => {
      console.log('Setting carriers:', action.payload);
      state.carriers = action.payload;
      state.selectedCarriers = action.payload.map(carrier => carrier.code);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    toggleCarrier: (state, action: PayloadAction<string>) => {
      const carrierCode = action.payload;
      if (state.selectedCarriers.includes(carrierCode)) {
        state.selectedCarriers = state.selectedCarriers.filter(
          (code) => code !== carrierCode
        );
      } else {
        state.selectedCarriers.push(carrierCode);
      }
    },
    toggleSelectAll: (state) => {
      state.selectedCarriers =
        state.selectedCarriers.length === state.carriers.length
          ? []
          : state.carriers.map(carrier => carrier.code);
    },
    toggleShowAll: (state) => {
      state.showAll = !state.showAll;
    },
  },
});

export const { setCarriers, setSearchTerm, toggleCarrier, toggleSelectAll, toggleShowAll } =
  carrierSlice.actions;

export default carrierSlice.reducer;
