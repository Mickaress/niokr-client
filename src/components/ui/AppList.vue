<script setup lang="ts">
  import { AppListItemType } from '@/models/components/AppList';
  import { withDefaults } from 'vue';
  import AppListItem from './AppListItem.vue';

  type Props = {
    items?: AppListItemType[];
    width?: number;
  };

  const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    width: 16,
  });
</script>

<template>
  <ul class="info-list">
    <slot>
      <template v-for="{ title, content } in props.items" :key="title + content">
        <AppListItem :width="width">
          <template #title>{{ title }}</template>
          <template #default>
            {{ content || '-' }}
          </template>
        </AppListItem>
      </template>
    </slot>
  </ul>
</template>

<style scoped>
  .info-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
