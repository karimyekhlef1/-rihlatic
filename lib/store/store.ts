import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '@/lib/store/custom/mainSlices/accountSlice';
import dialogReducer from '@/lib/store/custom/mainSlices/dialogSlice';
import paginationReducer from '@/lib/store/custom/commonSlices/paginationSlice';
import bookingReducer from '@/lib/store/custom/hotelSlices/bookingSlice';
import paymentStepReducer from '@/lib/store/custom/paymentSlices/paymentStepSlice';
import dobReducer from '@/lib/store/custom/paymentSlices/dobSlice';
import passportNumberReducer from '@/lib/store/custom/paymentSlices/passportNumberSlice';
import expirationDateReducer from '@/lib/store/custom/paymentSlices/expirationDateSlice';
import flightReducer from '@/lib/store/custom/packagesSlices/flightSlice';
import datePickerReducer from '@/lib/store/custom/commonSlices/datePickerSlice';
import priceAlertsReducer from '@/lib/store/custom/searchSlices/priceAlertsSlice';
import baggageReducer from '@/lib/store/custom/searchSlices/baggageSlice';
import sidebarSectionsReducer from '@/lib/store/custom/searchSlices/sidebarSectionsSlice';
import travelOptionsReducer from '@/lib/store/custom/searchSlices/travelOptionsSlice';
import calendarReducer from '@/lib/store/custom/commonSlices/calendarSlice';
import carrierReducer from '@/lib/store/custom/searchSlices/carrierSlice';
import excludedCountriesReducer from '@/lib/store/custom/searchSlices/excludedCountriesSlice';
import LanguageSlice from '@/lib/store/custom/LanguageSlice';

// Home
import homeSlice from '@/lib/store/api/home/homeSlice';
// auth
import accountSlice from '@/lib/store/api/account/accountSlice';
import signupSlice from '@/lib/store/api/signup/signupSlice';
import signinSlice from '@/lib/store/api/signin/signinSlice';
import logoutSlice from '@/lib/store/api/logout/logoutSlice';
import verifyEmailSlice from '@/lib/store/api/verifyEmail/verifyEmailSlice';

//
import packagesSlice from '@/lib/store/api/packages/packagesSlice';
import accountDetailsSlice from './custom/commonSlices/accountDetailsSlice';

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
    carriers: carrierReducer,
    excludedCountries: excludedCountriesReducer,
    langSlice: LanguageSlice,

    // ---------------------------
    // API REDUCERS
    // ---------------------------

    // Account
    authAccount: accountSlice,
    accountDetails: accountDetailsSlice,

    // Auth
    signUp: signupSlice,
    signIn: signinSlice,
    logOut: logoutSlice,
    verifyEmail: verifyEmailSlice,

    // Home
    home: homeSlice,
    //packages
    packages: packagesSlice,
  },
  // we can delete this later it's just to supress serializableCheck warnings
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          'datePicker.date.from',
          'datePicker.date.to',
          'calendar.dateRange.from',
          'calendar.dateRange.to',
        ], // Ignore this path
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
