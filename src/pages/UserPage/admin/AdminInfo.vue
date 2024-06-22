<script setup lang="ts">
  import GridLayout from '@/components/ui/GridLayout.vue';
  import { AdminType } from '@/models/User';

  type Props = {
    userInfo: AdminType;
  };

  defineProps<Props>();
</script>

<template>
  <GridLayout cols="1fr 1fr"> </GridLayout>
</template>

<style lang="scss" scoped></style>
