<template>
  <DropdownList
    :handle-node="props.handleNode"
    :is-open="props.isOpen"
    :item-list="items"
    @update:is-open="(value) => emit('update:isOpen', value)"
  />
  <ConfirmModal
    v-model:is-show="isShowModal"
    question="Вы уверены, что хотите выйти из аккаунта?"
    agreeAnswer="Выйти из аккаунта"
    disagree-answer="Остаться"
    :agreeAction="logout"
  />
</template>

<script setup lang="ts">
  import { useLogoutMutation } from '@/api/UserApi/hooks/useLogoutMutation';
  import DropdownList from '@/components/ui/DropdownList.vue';
  import ConfirmModal from '@/components/ui/modal/ConfirmModal.vue';
  import { useRoleUserNavigationRoutes } from '@/hooks/useRoutes';
  import { DropdownItem } from '@/models/components/DropdownItem';
  import { RouteNames } from '@/router/types/routeNames';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  type Props = {
    isOpen: boolean;
    handleNode?: HTMLElement;
  };

  type Emits = {
    (e: 'update:isOpen', isOpen: boolean): void;
  };

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const route = useRoute();
  const routes = useRoleUserNavigationRoutes();
  const { mutate: logout } = useLogoutMutation();

  watch(
    () => route.path,
    () => emit('update:isOpen', false),
  );

  const filteredItems = routes.filter(
    (route) => route.name !== RouteNames.SUPERVISOR_PROJECT_VACANCIES,
  );

  const items = filteredItems.map<DropdownItem>((route) => ({
    content: route.meta.title,
    location: { name: route.name },
    type: 'link',
  }));

  const isShowModal = ref<boolean>(false);

  items.push({
    content: 'Выйти',
    type: 'button',
    action: () => (isShowModal.value = true),
  });
</script>
