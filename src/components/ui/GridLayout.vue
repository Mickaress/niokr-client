<template>
  <div
    :class="['row', { divide: cols !== '1fr' }]"
    :style="{
      gridTemplateColumns: getGridTemplateColumns(cols),
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  type Props = {
    cols: number | string;
  };
  defineProps<Props>();

  function getGridTemplateColumns(cols: number | string): string {
    if (typeof cols === 'string') return cols;
    return '1fr '.repeat(cols).trim();
  }
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .row {
    display: grid;
  }

  .divide {
    & > :deep(*:not(:last-child)) {
      padding-right: 1.875rem;
      margin-right: 1.875rem;
      border-right: 0.0625rem solid var(--medium-gray-color);

      @media (width <= $mobile) {
        border: none;
        padding-right: 0;
        margin-right: 0;
      }
    }
  }
</style>
