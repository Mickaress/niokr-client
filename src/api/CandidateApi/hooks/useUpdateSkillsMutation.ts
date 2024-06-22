import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import { candidateApi } from '..';

export const useUpdateSkillsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (skillIds: number[]) => candidateApi.updateSkills(skillIds),
    onMutate: () => {
      const toastId = toast.loading('Изменение навыков');
      return { toastId };
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries(['user']);
      toast.remove(context?.toastId);
      toast.success('Навыки изменены');
    },
    onError: (error, variables, context) => {
      toast.remove(context?.toastId);
      toast.error('Ошибка сервера');
    },
  });
};
