<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterView } from 'vue-router';
  import { useGetUserInfoQuery } from './api/UserApi/hooks/useGetUserInfoQuery';
  import PageLayout from './components/layout/PageLayout.vue';
  import ToUpButton from './components/ui/ToUpButton.vue';

  const { isLoading } = useGetUserInfoQuery();

  const toUpButtonVisible = ref(false);
</script>

<template>
  <PageLayout v-if="!isLoading">
    <RouterView />
  </PageLayout>
  <ToUpButton v-model:visible="toUpButtonVisible" />
</template>

<style lang="scss" scoped></style>
