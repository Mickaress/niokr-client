import { useQuery } from '@tanstack/vue-query';
import { projectApi } from '..';

export const useGetSingleProjectQuery = (projectId: number) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectApi.getSingleProject(projectId),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
