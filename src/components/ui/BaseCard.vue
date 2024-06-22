<script setup lang="ts">
  import BaseBadge from '@/components/ui/BaseBadge.vue';
  import { StateClass, StateType } from '@/models/State';
  import { RouteLocationRaw, RouterLink } from 'vue-router';
  import BasePanel from '../ui/BasePanel.vue';

  type Props = {
    title: String;
    link?: RouteLocationRaw;
    state: StateType;
    isDivide?: boolean;
  };

  withDefaults(defineProps<Props>(), {
    isDivide: false,
  });
</script>

<template>
  <BasePanel>
    <header class="card__header">
      <RouterLink v-if="link" :to="link">
        {{ title }}
      </RouterLink>
      <h1 v-else>{{ title }}</h1>
      <BaseBadge :class="StateClass[state.id]">{{ state.state }}</BaseBadge>
      <slot name="header"></slot>
    </header>
    <div v-if="isDivide" class="card__divider"></div>
    <main class="card__main">
      <slot name="main"> </slot>
    </main>
    <footer class="card__footer">
      <div><slot name="footer"></slot></div>
      <div class="card__buttons">
        <slot name="buttons"></slot>
      </div>
    </footer>
  </BasePanel>
</template>

<style lang="scss">
  @import '@styles/breakpoints';

  .card {
    &__header {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      h1,
      a {
        font-size: 1.5rem;
      }

      a {
        &:hover {
          text-decoration: underline;
        }
      }

      h2 {
        font-size: 1.25rem;
        font-weight: normal;
        grid-column: 1 / -1;
      }

      p {
        font-weight: normal;
        grid-column: 1 / -1;
      }
    }

    &__divider {
      width: 100%;
      height: 0.125rem;
      background-color: var(--medium-gray-color);
      margin: 0.875rem 0;
    }

    &__main {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      p {
        font-weight: bold;
      }
    }

    &__footer {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: start;

      @media (width <= $tablet) {
        flex-direction: column;
        align-items: normal;
      }
    }

    &__buttons {
      margin-top: auto;
      align-items: center;
      display: flex;
      gap: 0.5rem;

      @media (width <= $mobile) {
        flex-direction: column;
      }

      p {
        text-transform: uppercase;
      }

      button,
      a {
        width: 100%;
      }
    }
  }
</style>
