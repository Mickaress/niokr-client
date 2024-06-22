import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import { adminApi } from '..';

export const useReviewVacancyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      vacancyId,
      stateId,
      comment,
    }: {
      vacancyId: number;
      stateId: number;
      comment: string;
    }) => adminApi.reviewVacancy(vacancyId, stateId, comment),
    onMutate: () => {
      const toastId = toast.loading('Обработка запроса');
      return { toastId };
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries();
      toast.remove(context?.toastId);
      toast.success('Вакансия рассмотрена');
    },
    onError: (error, variables, context) => {
      toast.remove(context?.toastId);
      toast.error('Ошибка сервера');
    },
  });
};
