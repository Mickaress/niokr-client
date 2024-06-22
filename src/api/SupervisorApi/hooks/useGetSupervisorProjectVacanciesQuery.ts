import { RouteNames } from '@/router/types/routeNames';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { supervisorApi } from '..';

export const useGetSupervisorProjectVacanciesQuery = () => {
  const route = useRoute();

  const projectId = ref(Number(route.params.projectId));
  const page = ref(Number(route.query.page));

  watch(
    () => route.params || route.query,
    () => {
      if (route.name === RouteNames.SUPERVISOR_PROJECT_VACANCIES) {
        projectId.value = Number(route.params.projectId);
        page.value = Number(route.query.page);
      }
    },
    { immediate: true },
  );

  return useQuery({
    queryKey: ['project_vacancies', projectId, page],
    queryFn: () => supervisorApi.getProjectVacancies(projectId.value, page.value),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
