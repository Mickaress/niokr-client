<script setup lang="ts">
  import { useCreateResponseMutation } from '@/api/CandidateApi/hooks/useCreateResponseMutation';
  import { useGetAllSkillsQuery } from '@/api/SkillApi/hooks/useGetAllSkillsQuery';
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import { useGetVacancyListQuery } from '@/api/VacancyApi/hooks/useGetVacancyListQuery';
  import searchIconUrl from '@/assets/icons/search.svg?url';
  import SidebarLayout from '@/components/layout/SidebarLayout.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseCard from '@/components/ui/BaseCard.vue';
  import BaseCheckbox from '@/components/ui/BaseCheckbox.vue';
  import BaseInput from '@/components/ui/BaseInput.vue';
  import BaseList from '@/components/ui/BaseList.vue';
  import FilterModal from '@/components/ui/FilterModal.vue';
  import SkillList from '@/components/ui/SkillList.vue';
  import { useFilters } from '@/hooks/useFilters';
  import { vacancyRoute } from '@/router/utils/route';
  import VMultiselect from '@vueform/multiselect';
  import { watch } from 'vue';

  const vacancyListQuery = useGetVacancyListQuery();

  const skillListQuery = useGetAllSkillsQuery();

  const { data: userData } = useGetUserInfoQuery();

  const { mutate: createResponse } = useCreateResponseMutation();

  const { clearFilter, filter, filters, debouncedInput } = useFilters();

  watch(
    () => filters.value.title,
    () => {
      debouncedInput();
    },
  );

  // TODO: Вынести фильтр в отдельный компонент
  // TODO: что-то со skillListQuery
</script>

<template>
  <SidebarLayout>
    <template #header>
      <h1>Все вакансии</h1>
      <h2>На этой странице размещены открытые вакансии в НИОКР</h2>
      <div class="test">
        <BaseInput
          v-model="filters.title"
          :icon="searchIconUrl"
          placeholder="Поиск по вакансиям..."
          type="text"
          inputmode="email"
          maxlength="100"
        />
        <FilterModal />
      </div>
    </template>
    <template #sidebar>
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
    </template>
    <template #main>
      <BaseList
        :is-loading="vacancyListQuery.isLoading.value"
        :is-mini="false"
        :is-error="vacancyListQuery.isError.value"
        empty-title="Вакансии не найдены"
        empty-subtitle="Пока нет ни одной вакансии с введённым названием и/или выбранными фильтрами"
        :total-items="vacancyListQuery.data.value?.quantity || 0"
      >
        <template #empty-button>
          <BaseButton @click="clearFilter"> Сбросить фильтры </BaseButton>
        </template>
        <template #list>
          <li v-for="vacancy in vacancyListQuery.data.value?.vacancies" :key="vacancy.id">
            <BaseCard
              :title="vacancy.title"
              :link="vacancyRoute(vacancy.id)"
              :state="vacancy.state"
              is-divide
            >
              <template #header>
                <h2>{{ vacancy.project.title }}</h2>
                <p>{{ vacancy.project.supervisor.fio }}</p>
              </template>
              <template #main>
                <p>
                  Обязанности: <span>{{ vacancy.responsibilities }}</span>
                </p>
                <p>
                  Требования: <span>{{ vacancy.requirements }}</span>
                </p>
                <p>
                  Период работы: <span>{{ vacancy.period }}</span>
                </p>
                <p>
                  Оплата:
                  <span>{{ vacancy.salary === 0 ? 'Без оплаты' : `${vacancy.salary} ₽` }}</span>
                </p>
              </template>
              <template #footer>
                <SkillList :skillIds="vacancy.skills" />
              </template>
              <template #buttons>
                <template
                  v-if="
                    userData &&
                    userData.role === 'specialist' &&
                    vacancy.project.supervisor.id !== userData.id
                  "
                >
                  <BaseButton v-if="vacancy.isResponse" disabled> Уже откликнулись </BaseButton>
                  <BaseButton v-else @click="createResponse(vacancy.id)" variant="outlined">
                    Откликнуться
                  </BaseButton>
                </template>
                <BaseButton is="router-link" :to="vacancyRoute(vacancy.id)"> Подробнее </BaseButton>
              </template>
            </BaseCard>
          </li>
        </template>
      </BaseList>
    </template>
  </SidebarLayout>
</template>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .test {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .filter {
    background-color: var(--light-color);
    padding: 1.25rem;
    border-radius: 0.625rem;
    border: 0.0625rem solid var(--medium-gray-color);

    @media (width <= $tablet) {
      display: none;
    }

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
