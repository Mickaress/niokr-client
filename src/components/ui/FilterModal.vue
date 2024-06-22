<template>
  <button class="open-project-filter-btn" @click="isVisible = true">
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
        stroke="#383838"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle v-if="!isEmptyFilters" class="active-indicator" cx="18.5" cy="4.5" r="3.5" />
    </svg>
    Фильтры
  </button>

  <BaseModal class="test" :is-show="isVisible" size="m" @close="isVisible = false">
    <form class="filter" @submit.prevent="filter">
      <div>
        <h1 class="filter__title">Оплата проекта</h1>
        <BaseCheckbox value="true" v-model="filters.payment"> С оплатой </BaseCheckbox>
        <BaseCheckbox value="false" v-model="filters.payment"> Без оплаты </BaseCheckbox>
      </div>
      <div class="filter__divider"></div>
      <div>
        <h1 class="filter__title">Навыки</h1>
        <VMultiselect
          v-model="filters.skills"
          mode="tags"
          placeholder="Введите навык"
          no-results-text="Навык не найдена"
          no-options-text="Навыки не найдены"
          :close-on-select="false"
          :searchable="true"
          :options="skillListQuery.data.value"
          :disabled="skillListQuery.isFetching.value"
          :loading="skillListQuery.isFetching.value"
          label="name"
          track-by="name"
          value-prop="id"
        />
      </div>
      <div class="filter__divider"></div>
      <footer class="filter__footer">
        <BaseButton full-width type="submit"> Найти </BaseButton>
        <BaseButton variant="text" type="button" @click="clearFilter" full-width>
          Сбросить фильтры
        </BaseButton>
      </footer>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
  import { useGetAllSkillsQuery } from '@/api/SkillApi/hooks/useGetAllSkillsQuery';
  import { useFilters } from '@/hooks/useFilters';
  import VMultiselect from '@vueform/multiselect';
  import { computed, ref } from 'vue';
  import BaseButton from './BaseButton.vue';
  import BaseCheckbox from './BaseCheckbox.vue';
  import BaseModal from './modal/BaseModal.vue';

  const isEmptyFilters = computed(() => {
    return false;
  });

  const skillListQuery = useGetAllSkillsQuery();
  const { clearFilter, filter, filters } = useFilters();

  const isVisible = ref(false);

  // синхрон с основным сделать
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .open-project-filter-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.3em 0.5em;
    font-family: Mont, Arial, Helvetica, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-radius: 0.3125rem;

    @media (width > $tablet) {
      display: none;
    }

    &:hover,
    &:focus-visible {
      background-color: rgb(0 0 0 / 3%);
    }

    &:active {
      background-color: rgb(0 0 0 / 5%);
    }

    & > svg {
      min-width: 1.875rem;
      height: 1.875rem;
      margin-bottom: 0.3125rem;

      path {
        stroke: var(--dark-color);
      }
    }
  }

  .active-indicator {
    fill: var(--accent-color-2);
  }

  .test {
    &:deep(.modal-content) {
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
    }
  }

  .filter {
    margin-top: 4rem;
    padding: 1rem;
    &__title {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    &__divider {
      width: 100%;
      background: var(--medium-gray-color);
      height: 0.0625rem;
      margin: 1.25rem 0;
    }

    &__footer {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }
  }
</style>
