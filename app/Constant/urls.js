const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.dsonetech.com/api/';

// HOME
export const home_endpoint = BASE_URL + 'home';
// Account
export const account_endpoint = BASE_URL + 'front/me';

export const edit_account_endpoint = BASE_URL + 'front/me/details';
//Signup (Register)
export const signup_endpoint = BASE_URL + 'front/user/register';
//Signin (Login)
export const signin_endpoint = BASE_URL + '/login';
//Logout
export const logout_endpoint = BASE_URL + '/logout';

//packages
export const packages_endpoint = BASE_URL + 'front/packages'