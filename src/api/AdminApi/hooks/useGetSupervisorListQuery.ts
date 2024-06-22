import { useQuery } from '@tanstack/vue-query';
import { adminApi } from '..';

export const useGetSupervisorListQuery = () => {
  return useQuery({
    queryKey: ['supervisors'],
    queryFn: () => adminApi.getSupervisorList(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
