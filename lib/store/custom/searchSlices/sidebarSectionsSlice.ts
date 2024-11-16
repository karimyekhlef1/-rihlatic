import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarSectionsState {
  [key: string]: boolean;
}

const initialState: SidebarSectionsState = {
  bags: true,
  stops: false,
  connections: false,
  carriers: false,
  bookingOptions: false,
  travelHacks: false,
  excludeCountries: false,
};

const sidebarSectionsSlice = createSlice({
  name: 'sidebarSections',
  initialState,
  reducers: {
    toggleSection: (state, action: PayloadAction<string>) => {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { toggleSection } = sidebarSectionsSlice.actions;
export default sidebarSectionsSlice.reducer;
