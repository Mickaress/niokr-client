import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import { candidateApi } from '..';

export const useCreateResponseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vacancyId: number) => candidateApi.createResponse(vacancyId),
    onMutate: () => {
      const toastId = toast.loading('Обработка запроса');
      return { toastId };
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries();
      toast.remove(context?.toastId);
      toast.success('Вы откликнулись на вакансию');
    },
    onError: (error, variables, context) => {
      toast.remove(context?.toastId);
      toast.error('Ошибка сервера');
    },
  });
};
