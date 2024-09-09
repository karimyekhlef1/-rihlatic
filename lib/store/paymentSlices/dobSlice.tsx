import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DobState {
  dob: string | null;
}

const initialDobState: DobState = {
  dob: null,
};

const dobSlice = createSlice({
  name: 'dob',
  initialState: initialDobState,
  reducers: {
    setDob: (state, action: PayloadAction<string | null>) => {
      state.dob = action.payload;
    },
  },
});

export const { setDob } = dobSlice.actions;
export default dobSlice.reducer;
