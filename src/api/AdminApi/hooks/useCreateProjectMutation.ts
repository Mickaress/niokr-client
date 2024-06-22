import { ProjectFormType } from '@/models/Project';
import { RouteNames } from '@/router/types/routeNames';
import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { adminApi } from '..';

export const useCreateProjectMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (projectData: ProjectFormType) => adminApi.createProject(projectData),
    onMutate: () => {
      const toastId = toast.loading('Обработка запроса');
      return { toastId };
    },
    onSuccess: async (data, variables, context) => {
      toast.remove(context?.toastId);
      router.replace({
        name: RouteNames.PROJECTS,
      });
      toast.success('НИОКР создан');
    },
    onError: (error, variables, context) => {
      toast.remove(context?.toastId);
      toast.error('Ошибка сервера');
    },
  });
};
