<script setup lang="ts">
  import { MINI_CARD_PER_PAGE, PER_PAGE } from '@/constants';
  import BaseEmptyCard from './BaseEmptyCard.vue';

  type Props = {
    isMini: boolean;
  };

  const props = defineProps<Props>();

  const perPage = props.isMini ? MINI_CARD_PER_PAGE : PER_PAGE;
  // TODO: тесты
</script>

<template>
  <ul class="loading__list">
    <li v-for="index of perPage" :key="index">
      <BaseEmptyCard :is-mini="isMini" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .loading__list {
    display: flex;
    flex-direction: column;
    gap: 0.9375rem;
    padding-left: 0;
    list-style: none;
  }
</style>
