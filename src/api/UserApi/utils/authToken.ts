import Cookies from 'js-cookie';

export const AUTH_TOKEN_KEY = 'token';

export const getAuthTokenFromCookies = () => Cookies.get(AUTH_TOKEN_KEY);
