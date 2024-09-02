import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '@/lib/store/mainSlices/accountSlice';
import dialogReducer from '@/lib/store/mainSlices/dialogSlice';
import paginationReducer from '@/lib/store/commonSlices/paginationSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    dialog: dialogReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
