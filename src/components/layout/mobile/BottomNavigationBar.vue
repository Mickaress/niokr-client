<template>
  <transition name="nav">
    <nav v-if="visible" class="navigation">
      <BaseContainer class="container">
        <RouterLink
          v-for="link in mobileRoutes"
          :key="link.name"
          class="link"
          :to="{ name: link.name }"
        >
          <div v-if="link.meta.svg" v-html="link.meta.svg"></div>
          {{ link.meta.title }}
        </RouterLink>
        <RouterLink v-if="userInfo" class="link" :to="{ name: RouteNames.USER_INFO }">
          <div>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.0005 21.5001V19.5001C20.0005 18.4393 19.5791 17.4218 18.8289 16.6717C18.0788 15.9216 17.0614 15.5001 16.0005 15.5001H8.00049C6.93962 15.5001 5.92221 15.9216 5.17206 16.6717C4.42192 17.4218 4.00049 18.4393 4.00049 19.5001V21.5001"
                stroke="#A4A4A4"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.0005 11.5001C14.2096 11.5001 16.0005 9.70926 16.0005 7.50012C16.0005 5.29098 14.2096 3.50012 12.0005 3.50012C9.79135 3.50012 8.00049 5.29098 8.00049 7.50012C8.00049 9.70926 9.79135 11.5001 12.0005 11.5001Z"
                stroke="#A4A4A4"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          Мой профиль
        </RouterLink>
        <button v-else @click="auth()" class="link">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.0005 21.5001V19.5001C20.0005 18.4393 19.5791 17.4218 18.8289 16.6717C18.0788 15.9216 17.0614 15.5001 16.0005 15.5001H8.00049C6.93962 15.5001 5.92221 15.9216 5.17206 16.6717C4.42192 17.4218 4.00049 18.4393 4.00049 19.5001V21.5001"
              stroke="#A4A4A4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.0005 11.5001C14.2096 11.5001 16.0005 9.70926 16.0005 7.50012C16.0005 5.29098 14.2096 3.50012 12.0005 3.50012C9.79135 3.50012 8.00049 5.29098 8.00049 7.50012C8.00049 9.70926 9.79135 11.5001 12.0005 11.5001Z"
              stroke="#A4A4A4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Войти
        </button>
      </BaseContainer>
    </nav>
  </transition>
</template>

<script setup lang="ts">
  import { useAuthMutation } from '@/api/UserApi/hooks/useAuthMutation';
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import BaseContainer from '@/components/ui/BaseContainer.vue';
  import { useMainNavigationRoutes } from '@/hooks/useRoutes';
  import { RouteNames } from '@/router/types/routeNames';
  import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
  import { RouterLink } from 'vue-router';

  const mobileRoutes = useMainNavigationRoutes();
  const { data: userInfo } = useGetUserInfoQuery();
  const { mutate: auth } = useAuthMutation();

  const lastScroll = ref<number>(Number.MAX_SAFE_INTEGER);
  const visible = ref<boolean>(true);

  function onScroll() {
    visible.value = lastScroll.value > scrollY;
    lastScroll.value = scrollY;
  }

  onBeforeMount(() => {
    window.addEventListener('scroll', onScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .navigation {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background: #fff;
    border-radius: 1.25rem 1.25rem 0 0;
    box-shadow: 0 -0.4375rem 1.25rem rgb(0 0 0 / 7%);

    @media (width > $tablet) {
      display: none;
    }
  }

  .nav-enter-active,
  .nav-leave-active {
    transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .nav-enter-from,
  .nav-leave-to {
    transform: translateY(100%);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .link {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.5625rem;
    align-items: center;
    min-width: 4.375rem;
    padding-top: 0.875rem;
    padding-bottom: 0.875rem;
    font-family: Mont, Arial, Helvetica, sans-serif;
    font-size: 0.625rem;
    font-weight: 600;
    color: var(--dark-gray-color);
    text-decoration: none;

    &:deep(svg) {
      width: 1.875rem;
      height: 1.875rem;
    }

    &:deep(path) {
      stroke: var(--dark-gray-color);
    }

    &:hover,
    &:active,
    &:focus-visible,
    &.router-link-exact-active {
      color: var(--accent-color);

      &:deep(svg),
      &:deep(path) {
        stroke: var(--accent-color);
      }
    }
  }
</style>
