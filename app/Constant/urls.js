const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.dsonetech.com/api";

// ENGINE
export const engine_get_vols_endpoint = BASE_URL + "/front/airports";
export const engine_get_destinations_endpoint =
  BASE_URL + "/front/destinations";
export const engine_get_omras_endpoint = BASE_URL + "/front/omra";
export const engine_get_hotels_endpoint =
  BASE_URL + "/front/cities";

// Home
export const home_endpoint = BASE_URL + "/home";
// Account & Profile settings
export const account_endpoint = BASE_URL + "/front/me";
export const edit_account_endpoint = BASE_URL + "/front/me/details";
export const update_password_endpoint = BASE_URL + "/front/me/details/auth";
export const update_avatar_endpoint = BASE_URL + "/front/user/update/avatar";

// Check user status
export const check_user_status_endpoint =
  BASE_URL + "/front/user/check_user_status";
// Signup (Register)
export const signup_endpoint = BASE_URL + "/front/user/register";
// Signin (Login)
export const signin_endpoint = BASE_URL + "/login";
// Remind Password
export const remind_password_endpoint = BASE_URL + "/front/password/remind";
//Reset Password
export const reset_password_endpoint = BASE_URL + "/front/password/reset";
// Logout
export const logout_endpoint = BASE_URL + "/front/logout";
// Verify Email
export const verif_email_endpoint = BASE_URL + "/front/email/verify";
// Resend Verification Code
export const resend_code_endpoint = BASE_URL + "/front/email/resend_code";
// Packages
export const packages_endpoint = BASE_URL + "/front/packages";
export const package_bookings_endpoint = BASE_URL + "/front/package/bookings";
export const package_cancelPenalty_endpoint =
  BASE_URL + "/front/package/bookings/cancelPenalty/";
export const packages_bookingCard_endpoint = BASE_URL + "/front/package/carts";
export const package_Booking_pricing =
  BASE_URL + "/front/package/bookings/pricing";

// Omra
export const omra_endpoint = BASE_URL + "/front/omra";
// Omras Bookings
export const omras_bookings_endpoint = BASE_URL + "/front/omras/bookings";
// Omras Shopping Card
export const omras_shopping_card_endpoint = BASE_URL + "/front/omra/carts";
// Omras Get Pricing
export const omras_get_pricing_endpoint =
  BASE_URL + "/front/omras/bookings/pricing";
//Omra Cancel Penalty
export const omra_cancelPenalty_endpoint =
  BASE_URL + "/front/omras/bookings/cancelPenalty/:id";
//hotels
export const hotel_details = BASE_URL + "/front/hotel_details";
export const search_hotel_endpoint = BASE_URL + "/front/hotels_search";
export const hotel_prebook =  BASE_URL + "/front/hotel_prebook";
// Flights
export const flights_search_endpoint = BASE_URL + "/front/flights_search";
// Airports
export const airports_endpoint =
  BASE_URL + "/front/airports?filter[search]=czl";

// Airline Images
export const AIRLINE_IMAGE_URL = "https://images.kiwi.com/airlines/32x32";

// Flights conditions
export const stor_flights =
  BASE_URL + "/front/amadeus/create-pnr";
export const vol_bookings_endpoint=BASE_URL + "/front/amadeus/bookings";