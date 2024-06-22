import { FilterType, PaymentType } from '@/models/Filters';
import { RouteNames } from '@/router/types/routeNames';
import { useQuery } from '@tanstack/vue-query';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { projectApi } from '..';

export const useGetProjectListQuery = () => {
  const route = useRoute();
  const title = ref<string>('');
  const payment = ref<PaymentType[]>([]);
  const skills = ref<number[]>([]);
  const page = ref<number>(1);

  watch(
    () => route.query.title,
    () => {
      if (route.name === RouteNames.PROJECTS) {
        if (route.query.title && typeof route.query.title === 'string') {
          title.value = route.query.title;
          return;
        }
        title.value = '';
      }
    },
    { immediate: true },
  );

  watch(
    () => route.query.payment,
    () => {
      if (route.name === RouteNames.PROJECTS) {
        if (route.query.payment) {
          if (typeof route.query.payment === 'string') {
            payment.value = route.query.payment === 'true' ? ['true'] : ['false'];
            return;
          } else {
            if (route.query.payment.length === 1) {
              payment.value = route.query.payment[0] === 'true' ? ['true'] : ['false'];
              return;
            }
          }
        }
        payment.value = [];
      }
    },
    { immediate: true },
  );

  watch(
    () => route.query.skills,
    () => {
      if (route.name === RouteNames.PROJECTS) {
        if (route.query.skills) {
          if (typeof route.query.skills === 'string') {
            skills.value = [Number(route.query.skills)];
            return;
          } else {
            skills.value = route.query.skills.map((skill) => Number(skill));
            return;
          }
        }
        skills.value = [];
      }
    },
    { immediate: true },
  );

  watch(
    () => route.query.page,
    () => {
      if (route.name === RouteNames.PROJECTS) {
        if (route.query.page && typeof route.query.page === 'string') {
          page.value = Number(route.query.page);
          return;
        }
        page.value = 1;
      }
    },
    { immediate: true },
  );

  const filter = computed<FilterType>(() => {
    return {
      title: title.value,
      payment: payment.value,
      skills: skills.value,
      page: page.value,
    };
  });

  return useQuery({
    queryKey: ['projects', filter],
    queryFn: () => projectApi.getFilteredProjectList(filter.value),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
