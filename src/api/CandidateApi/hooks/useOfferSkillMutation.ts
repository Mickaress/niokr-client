import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import { candidateApi } from '..';

export const useOfferSkillMutation = () => {
  return useMutation({
    mutationFn: (name: string) => candidateApi.offerSkill(name),
    onMutate: () => {
      const toastId = toast.loading('Обработка запроса');
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      toast.remove(context?.toastId);
      toast.success('Вы предложили новый навык');
    },
    onError: (error, variables, context) => {
      toast.remove(context?.toastId);
      toast.error('Ошибка сервера');
    },
  });
};
