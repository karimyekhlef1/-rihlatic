import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '@/lib/store/mainSlices/accountSlice';
import dialogReducer from '@/lib/store/mainSlices/dialogSlice';
import paginationReducer from '@/lib/store/commonSlices/paginationSlice';
import bookingReducer from '@/lib/store/hotelSlices/bookingSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    dialog: dialogReducer,
    pagination: paginationReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
