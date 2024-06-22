import { useQuery } from '@tanstack/vue-query';
import { skillApi } from '..';

export const useGetAllSkillsQuery = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => skillApi.getAllSkills(),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
