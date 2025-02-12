import { configureStore } from '@reduxjs/toolkit';
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
import verificationReducer from './custom/mainSlices/verificationSlice';
import airplaneReducer from './custom/searchSlices/airplaneSlice';
import priceReducer from './custom/searchSlices/priceSlice';
import hoursReducer from './custom/searchSlices/hoursSlice';
import stopsReducer from './custom/searchSlices/stopsSlice';
import flightPaymentReducer from './custom/flightSlices/flightPaymentSlice';

// Home
import homeSlice from '@/lib/store/api/home/homeSlice';

// auth
import accountSlice from '@/lib/store/api/account/accountSlice';
import signupSlice from '@/lib/store/api/signup/signupSlice';
import signinSlice from '@/lib/store/api/signin/signinSlice';
import logoutSlice from '@/lib/store/api/logout/logoutSlice';
import verifyEmailSlice from '@/lib/store/api/verifyEmail/verifyEmailSlice';
import resendCodeSlice from '@/lib/store/api/resendCode/resendCodeSlice';
import checkUserStatusSlice from '@/lib/store/api/checkUserStatus/checkUserStatusSlice';
import remindPasswordSlice from '@/lib/store/api/remindPassword/remindPasswordSlice';
import resetPasswordSlice from '@/lib/store/api/resetPassword/resetPasswordSlice';

//
import packagesSlice from '@/lib/store/api/packages/packagesSlice';
import accountDetailsSlice from './custom/commonSlices/accountDetailsSlice';
//
import paymentPackageSlice from '@/lib/store/custom/packagesSlices/paymentPachageSlices';
import paymentOmraSlice from '@/lib/store/custom/omraSlices/paymentOmraSlice';

// Engine
import volSearchSlice from '@/lib/store/engine/vol_search_slice';
import packageSearchSlice from '@/lib/store/engine/package_search_slice';
import hotelSearchSlice from '@/lib/store/engine/hotel_search_slice';
import omraSearchSlice from '@/lib/store/engine/omra_search_slice';

// Engine Api
import getDestinationSlice from '@/lib/store/api/engine/destinationsSlice';

import omraSlice from '@/lib/store/api/omras/omrasSlice';
import omrasReducer from '@/lib/store/api/omras/omrasSlice';
import omraReservationSlice from './custom/commonSlices/omraReservationSlice';

//
import HotelStateSlice from './custom/hotelSlices/HotelStateSlice'
import HotelSlice from './api/hotels/hotelsSlice'
import volsReducer from '@/lib/store/api/vols/volsSlice';
import hotelPaymentSlice from '@/lib/store/custom/hotelSlices/paymentHotelSlices'
export const store = configureStore({
  reducer: {

    // Engine
    getDestinations: getDestinationSlice,
    
    account: accountSlice,
    dialog: dialogReducer,
    verification: verificationReducer,
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
    airplanes: airplaneReducer,
    excludedCountries: excludedCountriesReducer,
    langSlice: LanguageSlice,
    //payment
    paymentPackage: paymentPackageSlice,
    paymentOmra: paymentOmraSlice,
    
    // Search Engine
    volSearchSlice: volSearchSlice,
    packageSearchSlice: packageSearchSlice,
    hotelSearchSlice: hotelSearchSlice,
    omraSearchSlice: omraSearchSlice,
    
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
    resendCode: resendCodeSlice,
    checkUserStatus: checkUserStatusSlice,
    remindPassword: remindPasswordSlice,
    resetPassword: resetPasswordSlice,
    
    // Home
    home: homeSlice,
    //packages
    packages: packagesSlice,
    // Omras
    omras: omraSlice,
    omrasSlice: omrasReducer,
    omreaReservationInfos: omraReservationSlice,
    
    //hotel
    hotelState:HotelStateSlice,
    hotels:HotelSlice,
    hotelPayment:hotelPaymentSlice,
    // vols
    vols: volsReducer,
    price: priceReducer,
    hours: hoursReducer,
    stops: stopsReducer,
    flightPayment: flightPaymentReducer,
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

export interface RootState {
  getDestinations: ReturnType<typeof getDestinationSlice>;
  account: ReturnType<typeof accountSlice>;
  dialog: ReturnType<typeof dialogReducer>;
  verification: ReturnType<typeof verificationReducer>;
  pagination: ReturnType<typeof paginationReducer>;
  booking: ReturnType<typeof bookingReducer>;
  paymentStep: ReturnType<typeof paymentStepReducer>;
  dob: ReturnType<typeof dobReducer>;
  passportNumber: ReturnType<typeof passportNumberReducer>;
  expirationDate: ReturnType<typeof expirationDateReducer>;
  flight: ReturnType<typeof flightReducer>;
  datePicker: ReturnType<typeof datePickerReducer>;
  priceAlerts: ReturnType<typeof priceAlertsReducer>;
  baggage: ReturnType<typeof baggageReducer>;
  sidebarSections: ReturnType<typeof sidebarSectionsReducer>;
  travelOptions: ReturnType<typeof travelOptionsReducer>;
  calendar: ReturnType<typeof calendarReducer>;
  carriers: ReturnType<typeof carrierReducer>;
  airplanes: ReturnType<typeof airplaneReducer>;
  excludedCountries: ReturnType<typeof excludedCountriesReducer>;
  langSlice: ReturnType<typeof LanguageSlice>;
  paymentPackage: ReturnType<typeof paymentPackageSlice>;
  paymentOmra: ReturnType<typeof paymentOmraSlice>;
  volSearchSlice: ReturnType<typeof volSearchSlice>;
  packageSearchSlice: ReturnType<typeof packageSearchSlice>;
  hotelSearchSlice: ReturnType<typeof hotelSearchSlice>;
  omraSearchSlice: ReturnType<typeof omraSearchSlice>;
  authAccount: ReturnType<typeof accountSlice>;
  accountDetails: ReturnType<typeof accountDetailsSlice>;
  signUp: ReturnType<typeof signupSlice>;
  signIn: ReturnType<typeof signinSlice>;
  logOut: ReturnType<typeof logoutSlice>;
  verifyEmail: ReturnType<typeof verifyEmailSlice>;
  resendCode: ReturnType<typeof resendCodeSlice>;
  checkUserStatus: ReturnType<typeof checkUserStatusSlice>;
  remindPassword: ReturnType<typeof remindPasswordSlice>;
  resetPassword: ReturnType<typeof resetPasswordSlice>;
  home: ReturnType<typeof homeSlice>;
  packages: ReturnType<typeof packagesSlice>;
  omras: ReturnType<typeof omraSlice>;
  omrasSlice: ReturnType<typeof omrasReducer>;
  omreaReservationInfos: ReturnType<typeof omraReservationSlice>;
  hotelState: ReturnType<typeof HotelStateSlice>;
  hotels: ReturnType<typeof HotelSlice>;
  vols: ReturnType<typeof volsReducer>;
  price: ReturnType<typeof priceReducer>;
  hours: ReturnType<typeof hoursReducer>;
  stops: ReturnType<typeof stopsReducer>;
  flightPayment: ReturnType<typeof flightPaymentReducer>;
}

export type AppDispatch = typeof store.dispatch;
