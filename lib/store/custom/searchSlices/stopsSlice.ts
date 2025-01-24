import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StopValue = 'any' | 'direct' | 'up-to-1-stop' | 'up-to-2-stops';

interface StopsState {
  selectedStops: StopValue;
  loading: boolean;
}

const initialState: StopsState = {
  selectedStops: 'any',
  loading: false,
};

const stopsSlice = createSlice({
  name: 'stops',
  initialState,
  reducers: {
    setSelectedStops: (state, action: PayloadAction<StopValue>) => {
      state.selectedStops = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setSelectedStops, setLoading } = stopsSlice.actions;

export default stopsSlice.reducer;
