<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { RouteNames } from '@/router/types/routeNames';

  type Props = {
    isFooter?: boolean;
  };

  const props = withDefaults(defineProps<Props>(), {
    isFooter: false,
  });
</script>

<template>
  <RouterLink class="logo" :to="{ name: RouteNames.VACANCIES }">
    <img src="@/assets/icons/logo.svg" alt="" />
    <div>
      <h1
        class="title"
        :class="props.isFooter ? 'footer-color' : 'header-color'"
      >
        Ярмарка НИОКР
      </h1>
      <p
        class="sub-title"
        :class="props.isFooter ? 'footer-color' : 'header-color'"
      >
        в ИРНИТУ
      </p>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
  .logo {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }
  .title {
    font-size: 1.375rem;
    font-weight: bold;
  }
  .sub-title {
    font-size: 1.125rem;
  }
  .header-color {
    color: var(--accent-color);
  }
  .footer-color {
    color: var(--light-color);
  }
</style>
