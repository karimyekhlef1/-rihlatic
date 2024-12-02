const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.dsonetech.com/api';

// Home
export const home_endpoint = BASE_URL + '/home';
// Account
export const account_endpoint = BASE_URL + '/front/me';

export const edit_account_endpoint = BASE_URL + '/front/me/details';
// Check user status
export const check_user_status_endpoint =
  BASE_URL + '/front/user/check_user_status';
// Signup (Register)
export const signup_endpoint = BASE_URL + '/front/user/register';
// Signin (Login)
export const signin_endpoint = BASE_URL + '/login';
// Remind Password
export const remind_password_endpoint = BASE_URL + '/front/password/remind';
//Reset Password
export const reset_password_endpoint = BASE_URL + '/front/password/reset';
// Logout
export const logout_endpoint = BASE_URL + '/logout';
// Verify Email
export const verif_email_endpoint = BASE_URL + '/front/email/verify';
// Resend Verification Code
export const resend_code_endpoint = BASE_URL + '/front/email/resend_code';
// Packages
export const packages_endpoint = BASE_URL + '/front/packages';
