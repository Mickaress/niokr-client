import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import { supervisorApi } from '..';

export const useCloseVacancyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vacancyId: number) => supervisorApi.closeVacancy(vacancyId),
    onMutate: () => {
      const toastId = toast.loading('Обработка запроса');
      return { toastId };
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries();
      toast.remove(context?.toastId);
      toast.success('Вакансия закрыта');
    },
    onError: (error, variables, context) => {
      toast.remove(context?.toastId);
      toast.error('Ошибка сервера');
    },
  });
};
