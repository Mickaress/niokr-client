<script setup lang="ts">
  import BaseButton from '../BaseButton.vue';
  import BaseModal from './BaseModal.vue';

  type Props = {
    isShow: boolean;
    title: String;
  };
  defineProps<Props>();

  type Emits = {
    (event: 'update:isShow', isShow: boolean): void;
  };
  const emit = defineEmits<Emits>();

  function onCloseModal() {
    emit('update:isShow', false);
  }
</script>

<template>
  <BaseModal :is-show="isShow" @close="onCloseModal">
    <div class="content">
      <h1>{{ title }}</h1>
      <main class="main">
        <slot></slot>
      </main>
      <div class="button">
        <BaseButton @click="onCloseModal">Хорошо</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<style lang="scss">
  @import '@styles/breakpoints';

  .content {
    width: 35rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (width <= $mobile) {
      width: 16.25rem;
    }

    h1 {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    gap: 8px;
    p {
      font-size: 1.125rem;
      font-weight: bold;
      span {
        font-size: 1.125rem;
      }
    }
  }
  .button {
    display: flex;
    justify-content: center;
  }
</style>
