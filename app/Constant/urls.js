const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.dsonetech.com/api';

// Homes
export const home_endpoint = BASE_URL + '/home';
// Account
export const account_endpoint = BASE_URL + '/front/me';

export const edit_account_endpoint = BASE_URL + '/front/me/details';
// Signup (Register)
export const signup_endpoint = BASE_URL + '/front/user/register';
// Signin (Login)
export const signin_endpoint = BASE_URL + '/login';
// Logout
export const logout_endpoint = BASE_URL + '/logout';
// Verify Email
export const verif_email_endpoint = BASE_URL + '/front/email/verify';
// Resend Verification Code
export const resend_code_endpoint = BASE_URL + '/front/email/resend';
// Packages
export const packages_endpoint = BASE_URL + '/front/packages';
