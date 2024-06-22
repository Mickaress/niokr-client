import { StateID } from '@/models/State';
import { RouteNames } from '@/router/types/routeNames';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { supervisorApi } from '..';

export const useGetVacancyResponsesQuery = () => {
  const route = useRoute();

  const vacancyId = ref(Number(route.query.vacancyId));
  const stateId = ref(3);
  const page = ref(Number(route.query.page));

  watch(
    () => route.params || route.query,
    () => {
      if (route.name === RouteNames.SUPERVISOR_VACANCY_RESPONSES) {
        vacancyId.value = Number(route.query.vacancyId);
        // TODO: Костыль
        if (route.params.filterBy === 'review') stateId.value = StateID.Review;
        if (route.params.filterBy === 'approved') stateId.value = StateID.Approved;
        if (route.params.filterBy === 'rejected') stateId.value = StateID.Rejected;
        page.value = Number(route.query.page);
      }
    },
    { immediate: true },
  );

  return useQuery({
    queryKey: ['vacancy_responses', vacancyId, stateId, page],
    queryFn: () => supervisorApi.getVacancyResponses(vacancyId.value, stateId.value, page.value),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
