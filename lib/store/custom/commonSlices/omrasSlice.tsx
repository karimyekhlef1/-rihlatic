import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OmraDetails {
  result?: {
    omra?: any[]; // Replace 'any' with proper type when available
  };
}

interface OmrasState {
  omraDetails: OmraDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: OmrasState = {
  omraDetails: null,
  loading: false,
  error: null,
};

const omrasSlice = createSlice({
  name: "omras",
  initialState,
  reducers: {
    setOmraDetails: (state, action: PayloadAction<OmraDetails>) => {
      state.omraDetails = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearOmraDetails: (state) => {
      state.omraDetails = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setOmraDetails, setLoading, setError, clearOmraDetails } =
  omrasSlice.actions;

export default omrasSlice.reducer;
