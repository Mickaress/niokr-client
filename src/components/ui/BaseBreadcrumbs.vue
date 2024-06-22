<template>
  <ul class="breadcrumbs">
    <li
      v-for="({ to, title }, index) in props.breadcrumbs"
      :key="index"
      class="breadcrumbs-item"
    >
      <RouterLink v-if="to" :to="to" class="breadcrumbs-link">
        {{ title }}
      </RouterLink>
      <span v-else>{{ title }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { Breadcrumb } from '@/models/components/BaseBreadcrumbs';
  import { RouterLink } from 'vue-router';

  type Props = {
    breadcrumbs: Breadcrumb[];
  };

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  .breadcrumbs {
    display: flex;
  }
  .breadcrumbs-item {
    font-size: 0.875rem;
    font-weight: normal;
    span {
      color: var(--dark-gray-color);
      font-weight: normal;
    }
  }
  .breadcrumbs-item:not(:last-child)::after {
    margin-right: 0.375rem;
    margin-left: 0.375rem;
    font-weight: normal;
    color: var(--dark-color);
    content: '/';
  }
  .breadcrumbs-link {
    color: var(--dark-color);
    font-weight: normal;
    cursor: pointer;
  }
  .breadcrumbs-link:hover {
    text-decoration: underline;
  }
</style>
