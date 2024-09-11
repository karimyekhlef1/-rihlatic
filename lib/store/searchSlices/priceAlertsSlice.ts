import { createSlice } from '@reduxjs/toolkit';

const priceAlertsSlice = createSlice({
  name: 'priceAlerts',
  initialState: false,
  reducers: {
    togglePriceAlerts: (state) => !state,
  },
});

export const { togglePriceAlerts } = priceAlertsSlice.actions;
export default priceAlertsSlice.reducer;
