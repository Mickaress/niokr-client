<script setup lang="ts">
  import BaseContainer from '../ui/BaseContainer.vue';
  import AppFooter from './AppFooter.vue';
  import AppHeader from './header/AppHeader.vue';
  import BottomNavigationBar from './mobile/BottomNavigationBar.vue';
</script>

<template>
  <AppHeader />
  <BottomNavigationBar />
  <BaseContainer class="container">
    <slot></slot>
  </BaseContainer>
  <AppFooter />
</template>

<style lang="scss" scoped>
  .container {
    max-width: 87.5rem;
    margin-bottom: auto;
  }
</style>
