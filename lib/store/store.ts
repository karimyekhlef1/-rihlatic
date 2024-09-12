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
import datePickerReducer from '@/lib/store/commonSlices/datePickerSlice';
import priceAlertsReducer from '@/lib/store/searchSlices/priceAlertsSlice';
import baggageReducer from '@/lib/store/searchSlices/baggageSlice';
import sidebarSectionsReducer from '@/lib/store/searchSlices/sidebarSectionsSlice';
import travelOptionsReducer from '@/lib/store/searchSlices/travelOptionsSlice';
import calendarReducer from '@/lib/store/commonSlices/calendarSlice';

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
    datePicker: datePickerReducer,
    priceAlerts: priceAlertsReducer,
    baggage: baggageReducer,
    sidebarSections: sidebarSectionsReducer,
    travelOptions: travelOptionsReducer,
    calendar: calendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
