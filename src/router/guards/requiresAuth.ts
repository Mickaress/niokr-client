import { useQueryClient } from '@tanstack/vue-query';
import { NavigationGuard } from 'vue-router';
import { RouteNames } from '../types/routeNames';

export const requiresAuth: NavigationGuard = (to, from, next) => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['user']);

  if (to.meta.requiresAuth && !userData) {
    return next(
      from || {
        name: RouteNames.VACANCIES,
      },
    );
  }
  return next();
};
