import { RouteNames } from '@/router/types/routeNames';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { candidateApi } from '..';

export const useGetCandidateResponsesQuery = () => {
  const route = useRoute();

  const page = ref(Number(route.query.page));

  watch(
    () => route.query.page,
    () => {
      if (route.name === RouteNames.RESPONSES) {
        page.value = Number(route.query.page);
      }
    },
    { immediate: true },
  );

  return useQuery({
    queryKey: ['responses', page],
    queryFn: () => candidateApi.getCandidateResponses(page.value),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
