import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const carriers = [
  'A.P.G. Distribution System',
  'Aegean',
  'Aer Lingus',
  'Aerolineas Argentinas',
  'Afriqiyah Airways',
  'Air Algerie',
  'Air Arabia',
  'Air Astana',
  'Air Austral',
  'Air Baltic',
];

interface CarrierState {
  carriers: string[];
  searchTerm: string;
  selectedCarriers: string[];
  showAll: boolean;
}

const initialState: CarrierState = {
  carriers,
  searchTerm: '',
  selectedCarriers: [],
  showAll: false,
};

const carrierSlice = createSlice({
  name: 'carriers',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    toggleCarrier: (state, action: PayloadAction<string>) => {
      const carrier = action.payload;
      if (state.selectedCarriers.includes(carrier)) {
        state.selectedCarriers = state.selectedCarriers.filter(
          (c) => c !== carrier
        );
      } else {
        state.selectedCarriers.push(carrier);
      }
    },
    toggleSelectAll: (state) => {
      state.selectedCarriers =
        state.selectedCarriers.length === state.carriers.length
          ? []
          : [...state.carriers];
    },
    toggleShowAll: (state) => {
      state.showAll = !state.showAll;
    },
  },
});

export const { setSearchTerm, toggleCarrier, toggleSelectAll, toggleShowAll } =
  carrierSlice.actions;
export default carrierSlice.reducer;
