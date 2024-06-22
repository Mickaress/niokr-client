<script setup lang="ts">
  import { useGetVacancyOffersQuery } from '@/api/AdminApi/hooks/useGetVacancyOffersQuery';
  import { useReviewVacancyMutation } from '@/api/AdminApi/hooks/useReviewVacancyMutation';
  import AppList from '@/components/ui/AppList.vue';
  import BaseList from '@/components/ui/BaseList.vue';
  import ProposalCard from '@/components/ui/ProposalCard.vue';
  import { StateID } from '@/models/State';

  const vacancyOffersQuery = useGetVacancyOffersQuery();

  const { mutate: reviewVacancy } = useReviewVacancyMutation();
</script>

<template>
  <BaseList
    :is-loading="vacancyOffersQuery.isLoading.value"
    :is-error="vacancyOffersQuery.isError.value"
    empty-title="Нет заявок на вакансии"
    empty-subtitle="Пока нет ни одной заявки на вакансию"
    :total-items="vacancyOffersQuery.data.value?.quantity || 0"
  >
    <template #list>
      <li v-for="vacancy of vacancyOffersQuery.data.value?.vacancies" :key="vacancy.id">
        <ProposalCard
          :title="vacancy.title"
          :state="vacancy.state"
          :approve="
            () => reviewVacancy({ vacancyId: vacancy.id, stateId: StateID.Active, comment: '' })
          "
          :comment-reject="
            (comment) =>
              reviewVacancy({ vacancyId: vacancy.id, stateId: StateID.Rejected, comment: comment })
          "
        >
          <template #main>
            <p>
              НИОКР: <span>{{ vacancy.project.title }}</span>
            </p>
            <p>
              Руководитель: <span>{{ vacancy.project.supervisor.fio }}</span>
            </p>
          </template>
          <template #info>
            <AppList
              :width="10"
              :items="[
                {
                  title: 'НИОКР',
                  content: vacancy.project.title,
                },
                {
                  title: 'Оплата',
                  content: vacancy.salary === 0 ? 'Без оплаты' : `${vacancy.salary} ₽`,
                },
                {
                  title: 'Период работы',
                  content: `${vacancy.period}`,
                },
                {
                  title: 'Обязанности',
                  content: vacancy.responsibilities,
                },
                {
                  title: 'Требования',
                  content: vacancy.requirements,
                },
                {
                  title: 'Условия труда',
                  content: `${vacancy.conditions}`,
                },
              ]"
            />
          </template>
        </ProposalCard>
      </li>
    </template>
  </BaseList>
</template>

<style lang="scss" scoped></style>
