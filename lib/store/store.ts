import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '@/lib/store/mainSlices/accountSlice';
import dialogReducer from '@/lib/store/mainSlices/dialogSlice';
import paginationReducer from '@/lib/store/commonSlices/paginationSlice';
import bookingReducer from '@/lib/store/hotelSlices/bookingSlice';
import paymentStepReducer from '@/lib/store/paymentSlices/paymentStepSlice';
import dobReducer from '@/lib/store/paymentSlices/dobSlice';
import passportNumberReducer from '@/lib/store/paymentSlices/passportNumberSlice';
import expirationDateReducer from '@/lib/store/paymentSlices/expirationDateSlice';
import flightReducer from '@/lib/store/packagesSlices/flightSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    dialog: dialogReducer,
    pagination: paginationReducer,
    booking: bookingReducer,
    paymentStep: paymentStepReducer,
    dob: dobReducer,
    passportNumber: passportNumberReducer,
    expirationDate: expirationDateReducer,
    flight: flightReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
