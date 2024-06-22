import { RouteNames } from '@/router/types/routeNames';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { adminApi } from '..';

export const useGetVacancyOffersQuery = () => {
  const route = useRoute();

  const page = ref(Number(route.query.page));

  watch(
    () => route.query,
    () => {
      if (route.name === RouteNames.ADMIN_VACANCY_OFFER) {
        page.value = Number(route.query.page);
      }
    },
    { immediate: true },
  );

  return useQuery({
    queryKey: ['vacancy_offers', page],
    queryFn: () => adminApi.getVacancyOffers(page.value),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
