<script setup lang="ts">
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import SidebarLayout from '@/components/layout/SidebarLayout.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import UserTabs from '@/components/ui/UserTabs.vue';
  import { RouteNames } from '@/router/types/routeNames';
  import { RouterView } from 'vue-router';

  const { data } = useGetUserInfoQuery();
</script>

<template>
  <SidebarLayout>
    <template #header>
      <div class="user__header">
        <h1>Профиль пользователя</h1>
        <BaseButton
          v-if="data && data.role === 'admin'"
          is="router-link"
          :to="{ name: RouteNames.ADMIN_PROJECT_CREATE }"
        >
          Создать НИОКР
        </BaseButton>
      </div>
    </template>
    <template #sidebar>
      <UserTabs />
    </template>
    <template #main>
      <RouterView />
    </template>
  </SidebarLayout>
</template>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .user__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    @media (width <= $mobile) {
      flex-direction: column;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: bold;
    }
  }
</style>
