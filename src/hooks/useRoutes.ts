import { useRouter } from 'vue-router';
import { useCheckRole } from './useCheckRole';

export const useMainNavigationRoutes = () => {
  const router = useRouter();

  return router
    .getRoutes()
    .filter((route) => route.meta.type?.includes('main-nav'))
    .sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0));
};

export const useUserNavigationRoutes = () => {
  const router = useRouter();

  return router
    .getRoutes()
    .filter((route) => route.meta.type?.includes('user-nav'))
    .sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0));
};

export const useRoleUserNavigationRoutes = () => {
  const routes = useUserNavigationRoutes();

  return routes.filter((route) => {
    return !route.meta.role || useCheckRole(route.meta.role);
  });
};
