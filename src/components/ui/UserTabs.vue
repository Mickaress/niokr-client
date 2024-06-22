<script setup lang="ts">
  import { useGetSupervisorActiveProjectsQuery } from '@/api/SupervisorApi/hooks/useGetSupervisorActiveProjectsQuery';
  import { useLogoutMutation } from '@/api/UserApi/hooks/useLogoutMutation';
  import { useRoleUserNavigationRoutes } from '@/hooks/useRoutes';
  import { toProjectVacancies } from '@/router/utils/route';
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import SimpleAccordion from '../ui/accordion/SimpleAccordion.vue';
  import ConfirmModal from '../ui/modal/ConfirmModal.vue';
  const routes = useRoleUserNavigationRoutes();

  const isShowModal = ref<boolean>(false);

  const { mutate: logout } = useLogoutMutation();

  const { data: projects } = useGetSupervisorActiveProjectsQuery();

  // TODO: тесты
</script>

<template>
  <!-- Modals -->
  <ConfirmModal
    v-model:is-show="isShowModal"
    question="Вы уверены, что хотите выйти из аккаунта?"
    agreeAnswer="Выйти из аккаунта"
    disagree-answer="Остаться"
    :agreeAction="logout"
  />
  <!-- Modals -->
  <div class="user-tabs">
    <ul class="user-tabs__list">
      <li class="user-tabs__list-item" v-for="link of routes" :key="link.name">
        <RouterLink class="user-tabs__action" :to="{ name: link.name }" v-if="!link.meta.links">
          {{ link.meta.title }}
        </RouterLink>
        <SimpleAccordion v-else-if="projects && projects?.length !== 0" default-opened disabled>
          <template #title>
            <p class="user-tabs__action">
              {{ link.meta.title }}
            </p>
          </template>
          <template #content>
            <ul class="user-tabs__list">
              <li v-for="childLink in projects" :key="childLink.id" class="user-tabs__list-item">
                <RouterLink class="user-tabs__action" :to="toProjectVacancies(childLink.id)">
                  {{ childLink.title }}
                </RouterLink>
              </li>
            </ul>
          </template>
        </SimpleAccordion>
      </li>
      <li>
        <button class="user-tabs__action" @click="isShowModal = true">Выйти из профиля</button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .user-tabs {
    border: 1px solid var(--medium-gray-color);
    background: var(--light-color);
    border-radius: 0.625rem;

    @media (width < $tablet) {
      overflow-x: visible;
      max-width: calc(100vw - 3rem);
    }

    &__list {
      padding: 0 1.375rem;
      width: 100%;

      @media (width < $tablet) {
        display: flex;
        gap: 1rem;
        overflow-x: auto;
        box-shadow: 0 0.25rem 0.3rem rgb(0 0 0 / 7%);
      }

      &-item {
        @media (width < $tablet) {
          white-space: nowrap;
        }
        &:not(:empty) {
          border-bottom: 1px solid var(--medium-gray-color);
        }
      }
    }
    &__action {
      display: flex;
      width: 100%;
      padding: 1.25rem 0;
      font-size: 1.25rem;
      line-height: 1.625rem;
      color: var(--text-color);
      cursor: pointer;

      @media (width < $tablet) {
        white-space: nowrap;
      }

      &:hover,
      &.router-link-active {
        color: var(--accent-color);
      }
    }
  }
</style>
