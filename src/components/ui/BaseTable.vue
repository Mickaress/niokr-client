<script setup lang="ts">
  type Props = {
    headers: string[];
  };

  defineProps<Props>();
  // TODO: тесты
</script>

<template>
  <table class="table">
    <tr>
      <th v-for="header in headers" :key="header">{{ header }}</th>
    </tr>
    <slot></slot>
  </table>
</template>

<style lang="scss">
  .table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    overflow-x: auto;
  }
  th {
    font-weight: bold;
    color: var(--dark-gray-color);
    font-size: 1.125rem;
    padding: 1.25rem 1rem;
  }
  td {
    font-weight: bold;
    font-size: 1.125rem;
    padding: 1.25rem 1rem;
    border-top: 1px solid var(--medium-gray-color);
    a {
      text-decoration: underline;
    }
  }
</style>
