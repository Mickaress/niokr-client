import { useQuery } from '@tanstack/vue-query';
import { vacancyApi } from '..';

export const useGetSingleVacancyQuery = (vacancyId: number) => {
  return useQuery({
    queryKey: ['vacancy', vacancyId],
    queryFn: () => vacancyApi.getSingleVacancy(vacancyId),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
