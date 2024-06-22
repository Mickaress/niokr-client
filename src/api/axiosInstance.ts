import axios from 'axios';
import { getAuthTokenFromCookies } from './UserApi/utils/authToken';

const token = getAuthTokenFromCookies();

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    token: token,
  },
});
