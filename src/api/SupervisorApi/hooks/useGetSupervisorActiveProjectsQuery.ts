import { useQuery } from '@tanstack/vue-query';
import { supervisorApi } from '..';

export const useGetSupervisorActiveProjectsQuery = () => {
  return useQuery({
    queryKey: ['active_projects'],
    queryFn: () => supervisorApi.getActiveProjects(),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
