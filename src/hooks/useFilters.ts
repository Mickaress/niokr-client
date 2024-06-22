import { FilterType } from '@/models/Filters';
import { debounce } from 'lodash';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const useFilters = () => {
  const route = useRoute();
  const router = useRouter();

  const defaultFilters: FilterType = {
    title: '',
    payment: [],
    skills: [],
    page: 1,
  };
  const filters = ref<FilterType>({ ...defaultFilters });

  if (route.query.title) {
    filters.value.title = route.query.title as string;
  }

  if (route.query.payment) {
    if (typeof route.query.payment === 'string') {
      filters.value.payment = route.query.payment === 'true' ? ['true'] : ['false'];
    } else {
      filters.value.payment = ['true', 'false'];
    }
  }

  if (route.query.skills) {
    if (typeof route.query.skills === 'string') {
      filters.value.skills = [Number(route.query.skills)];
    } else {
      filters.value.skills = route.query.skills.map((skill) => Number(skill));
    }
  }

  if (route.query.page) {
    filters.value.page = Number(route.query.page);
  }

  function filter() {
    router.replace({
      ...route,
      query: {
        ...filters.value,
        page: 1,
      },
    });
  }

  function clearFilter() {
    filters.value = { ...defaultFilters };
    router.replace({ ...route, query: defaultFilters });
  }

  const debouncedInput = debounce(filter, 1000);

  return {
    filter,
    clearFilter,
    filters,
    debouncedInput,
  };
};
