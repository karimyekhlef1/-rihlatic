import { createSlice } from "@reduxjs/toolkit";

interface LangState {
  i18LangStatus: string;
}

const initialState: LangState = {
  i18LangStatus: "fr",
};

const LanguageSlice = createSlice({
  name: "LanguageSlice",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.i18LangStatus = action.payload;
      localStorage.setItem("i18LangStatus", action.payload);
    },
  },
});

export const { setLanguage } = LanguageSlice.actions;

export default LanguageSlice.reducer;