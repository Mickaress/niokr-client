<template>
  <section class="section" :class="{ divider: props.divider }">
    <div class="meta-info">
      <div class="tag">{{ props.tag }}</div>
      <p class="title">{{ props.title }}</p>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
  type Props = {
    tag: string;
    title: string;
    divider?: boolean;
  };

  const props = withDefaults(defineProps<Props>(), {
    divider: false,
  });
  // TODO: тесты
</script>

<style lang="scss" scoped>
  .section {
    display: flex;
    gap: 1.875rem;
    margin-bottom: 1.875rem;
  }

  .divider {
    padding-bottom: 1.875rem;
    border-bottom: 0.125rem solid var(--medium-gray-color);
  }

  .meta-info {
    width: 15.9375rem;
  }

  .title {
    display: inline;
    font-size: 1.25rem;
    line-height: 130%;
  }

  .tag {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.625rem;
    height: 4.625rem;
    margin-bottom: 1.125rem;
    font-size: 2rem;
    color: var(--accent-color);
    background: #f1f4fe;
    border-radius: 50%;
  }

  .content {
    width: 100%;
  }
</style>
