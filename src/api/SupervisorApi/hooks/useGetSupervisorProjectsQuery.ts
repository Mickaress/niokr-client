import { RouteNames } from '@/router/types/routeNames';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { supervisorApi } from '..';

export const useGetSupervisorProjectsQuery = () => {
  const route = useRoute();

  const page = ref(Number(route.query.page));

  watch(
    () => route.query,
    () => {
      if (route.name === RouteNames.SUPERVISOR_PROJECTS) {
        page.value = Number(route.query.page);
      }
    },
    { immediate: true },
  );

  return useQuery({
    queryKey: ['supervisor_projects', page],
    queryFn: () => supervisorApi.getSupervisorProjects(page.value),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
