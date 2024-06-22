<script setup lang="ts">
  import { useGetVacancyResponsesQuery } from '@/api/SupervisorApi/hooks/useGetVacancyResponsesQuery';
  import { useReviewResponseMutation } from '@/api/SupervisorApi/hooks/useReviewResponseMutation';
  import { useGetSingleVacancyQuery } from '@/api/VacancyApi/hooks/useGetSingleVacancyQuery';
  import BaseList from '@/components/ui/BaseList.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import ProposalCard from '@/components/ui/ProposalCard.vue';
  import SkillList from '@/components/ui/SkillList.vue';
  import { FilterProposalsBy } from '@/models/Proposal';
  import { StateID } from '@/models/State';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  // watch(
  //   () => route.params.filterBy,
  //   (filterBy) => {
  //     if (!filterBy && route.name === RouteNames.SUPERVISOR_VACANCY_RESPONSES) {
  //       router.replace({
  //         ...route,
  //         params: { filterBy: FilterProposalsBy.Review },
  //       });
  //     }
  //   },
  //   { immediate: true },
  // );

  const responsesQuery = useGetVacancyResponsesQuery();
  const vacancyQuery = useGetSingleVacancyQuery(Number(route.query.vacancyId));

  const { mutate: reviewResponse } = useReviewResponseMutation();

  const emptySubtitle = computed<string>(() => {
    switch (route.params.filterBy) {
      case FilterProposalsBy.Review:
        return 'Пока нет ни одного отклика на рассмотрение';
      case FilterProposalsBy.Approved:
        return 'Пока нет ни одного одобренного отклика';
      case FilterProposalsBy.Rejected:
        return 'Пока нет ни одного отклонённого отклика';
      default:
        return '';
    }
  });
</script>

<template>
  <BaseStub v-if="vacancyQuery.isLoading.value" title="Загрузка"></BaseStub>
  <template v-if="vacancyQuery.data.value">
    <h1>{{ vacancyQuery.data.value.title }}</h1>
    <div class="wrapper">
      <RouterLink class="tab" :to="{ ...route, params: { filterBy: FilterProposalsBy.Review } }">
        Новые
      </RouterLink>
      <RouterLink class="tab" :to="{ ...route, params: { filterBy: FilterProposalsBy.Approved } }">
        Одобренные
      </RouterLink>
      <RouterLink class="tab" :to="{ ...route, params: { filterBy: FilterProposalsBy.Rejected } }">
        Отклонённые
      </RouterLink>
    </div>
    <BaseList
      :is-loading="responsesQuery.isLoading.value"
      :is-error="responsesQuery.isError.value"
      empty-title="Нет откликов"
      :empty-subtitle="emptySubtitle"
      :total-items="responsesQuery.data.value?.quantity || 0"
    >
      <template #list>
        <li v-for="response of responsesQuery.data.value?.responses" :key="response.id">
          <ProposalCard
            :title="response.candidate.fio"
            :state="response.state"
            :approve="
              () =>
                reviewResponse({ responseId: response.id, stateId: StateID.Approved, comment: '' })
            "
            :comment-reject="
              (comment) =>
                reviewResponse({
                  responseId: response.id,
                  stateId: StateID.Rejected,
                  comment: comment,
                })
            "
          >
            <template #main>
              <p v-if="response.candidate.post">
                Должность: <span>{{ response.candidate.post }}</span>
              </p>
              <p v-if="response.candidate.group">
                Группа: <span>{{ response.candidate.group }}</span>
              </p>
            </template>
            <template #footer>
              <div class="skills">
                <p>Навыки:</p>
                <SkillList :skill-ids="response.candidate.skills" />
              </div>
            </template>
            <template #info>
              <p>
                Телефон: <span>{{ response.candidate.phone }}</span>
              </p>
              <p>
                Почта: <span>{{ response.candidate.email }}</span>
              </p>
              <p>
                Институт: <span>{{ response.candidate.institute }}</span>
              </p>
              <p v-if="response.candidate.post">
                Должность: <span>{{ response.candidate.post }}</span>
              </p>
              <p v-if="response.candidate.group">
                Группа: <span>{{ response.candidate.group }}</span>
              </p>
              <p v-if="response.candidate.birthday">
                День рождения: <span>{{ response.candidate.birthday }}</span>
              </p>
              <p>
                Компетенции: <span>{{ response.candidate.competencies }}</span>
              </p>
              <div class="skills">
                <p>Навыки:</p>
                <SkillList :skill-ids="response.candidate.skills" />
              </div>
            </template>
          </ProposalCard>
        </li>
      </template>
    </BaseList>
  </template>
</template>

<style lang="scss" scoped>
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
  }
  .wrapper {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
  }
  .tab {
    background-color: white;
    text-transform: uppercase;
    padding: 0.75rem 1rem;
    border: 0.0625rem solid var(--medium-gray-color);
    border-radius: 0.625rem;
  }
  .tab.router-link-exact-active {
    background-color: var(--accent-color);
    color: var(--light-color);
    border: none;
  }
  .skills {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    p {
      font-weight: bold;
    }
  }
</style>
