import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import { candidateApi } from '..';

export const useUpdateCompetenciesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (competencies: string) => candidateApi.updateCompetencies(competencies),
    onMutate: () => {
      const toastId = toast.loading('Изменение компетенций');
      return { toastId };
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries(['user']);
      toast.remove(context?.toastId);
      toast.success('Компетенции изменены');
    },
    onError: (error, variables, context) => {
      toast.remove(context?.toastId);
      toast.error('Ошибка сервера');
    },
  });
};
