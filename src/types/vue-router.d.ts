import { UserRole } from '@/models/User';
import { RouteNames } from '@/router/types/route-names';
import 'vue-router';

type NavType = 'main-nav' | 'user-nav' | 'mobile-nav';

declare module 'vue-router' {
  interface RouteMeta {
    type?: NavType[];
    role?: UserRole[];
    order?: number;
    title: string;
    requiresAuth?: boolean;
    svg?: string;
    links?: {
      name: RouteNames;
      title: string;
      location: LocationAsRelativeRaw;
    }[];
  }
}
