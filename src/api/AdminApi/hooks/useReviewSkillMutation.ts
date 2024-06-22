import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import { adminApi } from '..';

export const useReviewSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ skillId, stateId }: { skillId: number; stateId: number }) =>
      adminApi.reviewSkill(skillId, stateId),
    onMutate: () => {
      const toastId = toast.loading('Обработка запроса');
      return { toastId };
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries();
      toast.remove(context?.toastId);
      toast.success('Навык рассмотрен');
    },
    onError: (error, variables, context) => {
      toast.remove(context?.toastId);
      toast.error('Ошибка сервера');
    },
  });
};
