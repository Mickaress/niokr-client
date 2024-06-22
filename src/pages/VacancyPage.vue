<script setup lang="ts">
  import { useCreateResponseMutation } from '@/api/CandidateApi/hooks/useCreateResponseMutation';
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import { useGetSingleVacancyQuery } from '@/api/VacancyApi/hooks/useGetSingleVacancyQuery';
  import AppList from '@/components/ui/AppList.vue';
  import BaseBadge from '@/components/ui/BaseBadge.vue';
  import BaseBreadcrumbs from '@/components/ui/BaseBreadcrumbs.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseCard from '@/components/ui/BaseCard.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import GridLayout from '@/components/ui/GridLayout.vue';
  import SkillList from '@/components/ui/SkillList.vue';
  import { useDesktop, useMobile } from '@/hooks/useBreakpoints';
  import { StateClass } from '@/models/State';
  import { RouteNames } from '@/router/types/routeNames';
  import { projectRoute } from '@/router/utils/route';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const vacancyId = Number(route.params.id);

  const vacancyQuery = useGetSingleVacancyQuery(vacancyId);

  const { mutate: createResponse } = useCreateResponseMutation();
  const { data: userData } = useGetUserInfoQuery();

  const isDesktop = useDesktop();

  const isMobile = useMobile();

  const response = (id: number) => {
    createResponse(id);
  };
</script>

<template>
  <BaseStub v-if="vacancyQuery.isLoading.value" title="Загрузка..."></BaseStub>
  <BaseStub
    v-if="vacancyQuery.isError.value"
    title="Ошибка сервера"
    subtitle="В данный момент сервер не отвечает"
  ></BaseStub>
  <template v-if="vacancyQuery.data.value">
    <BaseBreadcrumbs
      :breadcrumbs="[
        { title: 'Все вакансии', to: { name: RouteNames.VACANCIES } },
        { title: vacancyQuery.data.value.title || '' },
      ]"
    />
    <header class="header">
      <div class="header_h1">
        <h1>{{ vacancyQuery.data.value.title }}</h1>
        <BaseBadge :class="StateClass[vacancyQuery.data.value.state.id]">
          {{ vacancyQuery.data.value.state.state }}
        </BaseBadge>
      </div>
      <template v-if="userData && userData.id !== vacancyQuery.data.value.project.supervisor.id">
        <template
          v-if="
            userData &&
            userData.role === 'specialist' &&
            vacancyQuery.data.value.project.supervisor.id !== userData.id
          "
        >
          <BaseButton v-if="vacancyQuery.data.value.isResponse" disabled>
            Уже откликнулись
          </BaseButton>
          <BaseButton v-else @click="response(vacancyQuery.data.value.id)" variant="outlined">
            Откликнуться
          </BaseButton>
        </template>
      </template>
    </header>
    <BasePanel>
      <GridLayout :cols="isDesktop ? '2fr 1fr 1fr 1fr' : '1fr'">
        <AppList
          :width="isMobile ? 10 : 16"
          :items="[
            {
              title: 'Оплата',
              content:
                vacancyQuery.data.value.salary === 0
                  ? 'Без оплаты'
                  : `${vacancyQuery.data.value.salary} ₽`,
            },
            {
              title: 'Период работы',
              content: `${vacancyQuery.data.value.period}`,
            },
            {
              title: 'Условия труда',
              content: `${vacancyQuery.data.value.conditions}`,
            },
            {
              title: 'Руководитель',
              content: `${vacancyQuery.data.value.project.supervisor.fio}`,
            },
            {
              title: 'Контакты руководителя',
              content: `${vacancyQuery.data.value.project.supervisor.email} ${vacancyQuery.data.value.project.supervisor.phone}`,
            },
          ]"
        />
        <div class="info">
          <h1>Требуемые навыки:</h1>
          <SkillList isVisible :skill-ids="vacancyQuery.data.value.skills" />
        </div>
        <div class="info">
          <h1>Обязанности:</h1>
          <p>{{ vacancyQuery.data.value.responsibilities }}</p>
        </div>
        <div class="info">
          <h1>Требования:</h1>
          <p>{{ vacancyQuery.data.value.requirements }}</p>
        </div>
      </GridLayout>
    </BasePanel>
    <footer class="footer">
      <BaseCard
        :title="vacancyQuery.data.value.project.title"
        :link="projectRoute(vacancyQuery.data.value.project.id)"
        :state="vacancyQuery.data.value.project.state"
        is-divide
      >
        <template #header>
          <p>{{ vacancyQuery.data.value.project.supervisor.fio }}</p>
        </template>
        <template #main>
          <p>
            Описание:
            <span>{{ vacancyQuery.data.value.project.description }}</span>
          </p>
          <p>
            Цель:
            <span>{{ vacancyQuery.data.value.project.goal }}</span>
          </p>
          <p>
            Период работы:
            <span> {{ vacancyQuery.data.value.project.period }} </span>
          </p>
        </template>
        <template #footer>
          <SkillList :skillIds="vacancyQuery.data.value.project.skills" />
        </template>
        <template #buttons>
          <BaseButton is="router-link" :to="projectRoute(vacancyQuery.data.value.project.id)">
            Подробнее
          </BaseButton>
        </template>
      </BaseCard>
      <BaseButton variant="text" @click="$router.push({ name: RouteNames.VACANCIES })">
        Назад к списку
      </BaseButton>
    </footer>
  </template>
</template>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1.6875rem;
    margin-bottom: 1.875rem;
    &_h1 {
      display: flex;
      align-items: center;
      gap: 1.25rem;

      h1 {
        font-size: 2.25rem;
        font-weight: bold;
      }
    }

    @media (width <= $mobile) {
      align-items: normal;
      flex-direction: column;
    }
  }

  .info {
    @media (width <= $tablet) {
      margin-top: 1.5rem;
    }

    h1 {
      font-size: 1.125rem;
      margin-bottom: 0.625rem;
    }
    p {
      font-size: 1.125rem;
      font-weight: bold;
    }
  }

  .footer {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.25rem;
  }
</style>
