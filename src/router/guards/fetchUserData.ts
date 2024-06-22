import { userApi } from '@/api/UserApi';
import { NavigationGuard } from 'vue-router';

export const fetchUserData: NavigationGuard = async (to, from, next) => {
  if (!from.name) {
    await userApi.getUserInfo();
  }
  return next();
};
