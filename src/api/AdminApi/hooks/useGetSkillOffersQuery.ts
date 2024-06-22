import { RouteNames } from '@/router/types/routeNames';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { adminApi } from '..';

export const useGetSkillOffersQuery = () => {
  const route = useRoute();

  const page = ref(Number(route.query.page));

  watch(
    () => route.query,
    () => {
      if (route.name === RouteNames.ADMIN_SKILL_OFFER) {
        page.value = Number(route.query.page);
      }
    },
    { immediate: true },
  );

  return useQuery({
    queryKey: ['skill_offers', page],
    queryFn: () => adminApi.getSkillOffers(page.value),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
