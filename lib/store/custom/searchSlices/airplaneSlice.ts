import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AirplaneType {
  code: string;
  name: string;
}

interface AirplaneState {
  airplaneTypes: AirplaneType[];
  searchTerm: string;
  selectedAirplaneTypes: string[];
  showAll: boolean;
}

const initialState: AirplaneState = {
  airplaneTypes: [],
  searchTerm: '',
  selectedAirplaneTypes: [],
  showAll: false,
};

const airplaneSlice = createSlice({
  name: 'airplanes',
  initialState,
  reducers: {
    setAirplaneTypes: (state, action: PayloadAction<AirplaneType[]>) => {
      console.log('Setting airplane types:', action.payload);
      state.airplaneTypes = action.payload;
      // Initialize selected airplane types with all available types
      state.selectedAirplaneTypes = action.payload.map(type => type.code);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    toggleAirplaneType: (state, action: PayloadAction<string>) => {
      const typeCode = action.payload;
      if (state.selectedAirplaneTypes.includes(typeCode)) {
        state.selectedAirplaneTypes = state.selectedAirplaneTypes.filter(
          (code) => code !== typeCode
        );
      } else {
        state.selectedAirplaneTypes.push(typeCode);
      }
    },
    toggleSelectAll: (state) => {
      state.selectedAirplaneTypes =
        state.selectedAirplaneTypes.length === state.airplaneTypes.length
          ? []
          : state.airplaneTypes.map(type => type.code);
    },
    toggleShowAll: (state) => {
      state.showAll = !state.showAll;
    },
  },
});

export const {
  setAirplaneTypes,
  setSearchTerm,
  toggleAirplaneType,
  toggleSelectAll,
  toggleShowAll,
} = airplaneSlice.actions;

export default airplaneSlice.reducer;
