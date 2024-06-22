<script setup lang="ts">
  import { useGetSingleProjectQuery } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';
  import BaseBadge from '@/components/ui/BaseBadge.vue';
  import BaseBreadcrumbs from '@/components/ui/BaseBreadcrumbs.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import ProjectTabs from '@/components/ui/ProjectTabs.vue';
  import { StateClass } from '@/models/State';
  import { RouteNames } from '@/router/types/routeNames';
  import { RouterView, useRoute } from 'vue-router';

  const route = useRoute();

  const projectId = Number(route.params.id);
  const projectQuery = useGetSingleProjectQuery(projectId);
</script>

<template>
  <BaseStub v-if="projectQuery.isLoading.value" title="Загрузка..."></BaseStub>
  <BaseStub
    v-if="projectQuery.isError.value"
    title="Ошибка сервера"
    subtitle="В данный момент сервер не отвечает"
  ></BaseStub>
  <template v-if="projectQuery.data.value">
    <BaseBreadcrumbs
      :breadcrumbs="[
        { title: 'Все НИОКР', to: { name: RouteNames.PROJECTS } },
        { title: projectQuery.data.value?.title || '' },
      ]"
    />
    <header class="header">
      <h1>{{ projectQuery.data.value?.title }}</h1>
      <BaseBadge :class="StateClass[projectQuery.data.value.state.id]">
        {{ projectQuery.data.value.state.state }}
      </BaseBadge>
    </header>
    <ProjectTabs v-if="projectQuery.data.value" />
    <RouterView />
    <footer class="footer">
      <BaseButton variant="text" @click="$router.push({ name: RouteNames.PROJECTS })">
        Назад к списку
      </BaseButton>
    </footer>
  </template>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    justify-content: space-between;
    margin-top: 1.6875rem;
    margin-bottom: 1.875rem;

    h1 {
      font-size: 2.25rem;
      font-weight: bold;
    }
  }
  .info {
    h1 {
      font-weight: 400;
      font-size: 1.125rem;
      margin-bottom: 0.625rem;
    }
    p {
      font-size: 1.125rem;
      font-weight: 700;
    }
  }
  .footer {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.25rem;
  }
</style>
