import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const countries = [
  'Algeria',
  'Argentina',
  'Australia',
  'Brazil',
  'Canada',
  'Chile',
  'Colombia',
  'Egypt',
  'India',
  'Indonesia',
  'Japan',
  'Mexico',
  'Peru',
  'Russia',
  'South Africa',
  'South Korea',
  'Taiwan',
  'Thailand',
  'Turkey',
  'United Kingdom',
  'Vietnam',
];

interface ExcludedCountriesState {
  countries: string[];
  searchTerm: string;
  selectedCountries: string[];
  showAll: boolean;
}

const initialState: ExcludedCountriesState = {
  countries,
  searchTerm: '',
  selectedCountries: [],
  showAll: false,
};

const excludedCountriesSlice = createSlice({
  name: 'excludedCountries',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    toggleCountry: (state, action: PayloadAction<string>) => {
      const country = action.payload;
      if (state.selectedCountries.includes(country)) {
        state.selectedCountries = state.selectedCountries.filter(
          (c) => c !== country
        );
      } else {
        state.selectedCountries.push(country);
      }
    },
    toggleSelectAll: (state) => {
      state.selectedCountries =
        state.selectedCountries.length === state.countries.length
          ? []
          : [...state.countries];
    },
    toggleShowAll: (state) => {
      state.showAll = !state.showAll;
    },
  },
});

export const { setSearchTerm, toggleCountry, toggleSelectAll, toggleShowAll } =
  excludedCountriesSlice.actions;
export default excludedCountriesSlice.reducer;
