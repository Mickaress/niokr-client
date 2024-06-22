import { UserRole } from '@/models/User';
import { useQueryClient } from '@tanstack/vue-query';

type RoleType = {
  role: UserRole;
};

export const useCheckRole = (roles: UserRole[] = []): boolean => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<RoleType>(['user']);
  const userRole = userData?.role;

  if (userRole && roles.includes(userRole)) {
    return true;
  }
  return false;
};
