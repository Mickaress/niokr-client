import { AdminType, SpecialistType } from '@/models/User';
import { axiosInstance } from '../axiosInstance';
import UserApiType from './UserApiType';
import { askForUserRole, setUserToCookies } from './utils/mockCookie';

export default class UserApi implements UserApiType {
  async auth(): Promise<void> {
    if (import.meta.env.VITE_MOCK_AUTH) {
      const token = askForUserRole();
      if (!token) return;

      setUserToCookies(token);
      window.location.reload();
      return;
    }

    await axiosInstance.get('campus_auth');
  }

  async logout(): Promise<void> {
    if (import.meta.env.VITE_MOCK_AUTH) {
      setUserToCookies(undefined);
      window.location.reload();
      return;
    }

    await axiosInstance.get('logout');
  }

  async getUserInfo(): Promise<SpecialistType | AdminType | null> {
    try {
      const response = await axiosInstance.get('user');

      return response.data;
    } catch (error) {
      return null;
    }
  }
}
