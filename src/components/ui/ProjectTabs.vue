<template>
  <div class="wrapper">
    <RouterLink class="project-tab" :to="{ name: RouteNames.PROJECT_DETAILS }">
      О НИОКР
    </RouterLink>
    <RouterLink class="project-tab" :to="{ name: RouteNames.PROJECT_VACANCIES }">
      Список вакансий
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
  import { RouteNames } from '@/router/types/routeNames';
  import { RouterLink } from 'vue-router';

  // TODO: тесты
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
  }

  .project-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 3rem;
    color: var(--text-color);
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
  }

  .project-tab.router-link-exact-active {
    position: relative;
    background: #fff;
    border-radius: 0.625rem 0.625rem 0 0;
    box-shadow: 0 0 0.3125rem rgb(0 0 0 / 18%);

    &::before {
      position: absolute;
      bottom: -0.3125rem;
      left: 0;
      width: 100%;
      height: 0.4rem;
      content: '';
      background-color: #fff;
      border-radius: 0.625rem;
    }

    &:first-child::after,
    &:last-child::after {
      position: absolute;
      bottom: -0.5625rem;
      width: 0.3125rem;
      height: 0.5625rem;
      content: '';
      background-color: #fff;
    }

    &:first-child::after {
      left: 0;
    }

    &:last-child::after {
      right: 0;
    }
  }

  .project-tab:hover {
    color: var(--accent-color);
  }
</style>
