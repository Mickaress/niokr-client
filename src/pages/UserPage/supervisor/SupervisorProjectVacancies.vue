<script setup lang="ts">
  import { useCloseVacancyMutation } from '@/api/SupervisorApi/hooks/useCloseVacancyMutation';
  import { useGetSupervisorProjectVacanciesQuery } from '@/api/SupervisorApi/hooks/useGetSupervisorProjectVacanciesQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseCard from '@/components/ui/BaseCard.vue';
  import BaseList from '@/components/ui/BaseList.vue';
  import SkillList from '@/components/ui/SkillList.vue';
  import ConfirmModal from '@/components/ui/modal/ConfirmModal.vue';
  import InformationModal from '@/components/ui/modal/InformationModal.vue';
  import { StateID } from '@/models/State';
  import { createVacancyRoute, toVacancyResponses, vacancyRoute } from '@/router/utils/route';
  import { ref } from 'vue';

  const projectVacanciesQuery = useGetSupervisorProjectVacanciesQuery();

  const deletableVacancyId = ref<number>(0);
  const selectedVacancyComment = ref<string>('');
  const isShowCommentModal = ref<boolean>(false);
  const isShowDeleteModal = ref<boolean>(false);

  const { mutate: closeVacancy } = useCloseVacancyMutation();

  const onCloseVacancy = (vacancyId: number) => {
    deletableVacancyId.value = vacancyId;
    isShowDeleteModal.value = true;
  };

  const onShowComment = (comment: string) => {
    selectedVacancyComment.value = comment;
    isShowCommentModal.value = true;
  };
  // TODO: добавить кнопку на BASESTUB "Добавить вакансию" или мб вообще добавить кнопку
</script>

<template>
  <!-- Modals -->
  <ConfirmModal
    v-model:is-show="isShowDeleteModal"
    question="Вы уверены, что хотите закрыть вакансию?"
    :agree-action="() => closeVacancy(deletableVacancyId)"
    agree-answer="Закрыть"
    disagree-answer="Отмена"
  />
  <InformationModal title="Причина отклонения заявки" v-model:is-show="isShowCommentModal">
    {{ selectedVacancyComment }}
  </InformationModal>
  <!-- Modals -->
  <BaseList
    :is-loading="projectVacanciesQuery.isLoading.value"
    :is-mini="false"
    :is-error="projectVacanciesQuery.isError.value"
    empty-title="Вакансии не найдены"
    empty-subtitle="Пока нет ни одной вакансии в выбранном НИОКР"
    :total-items="projectVacanciesQuery.data.value?.quantity || 0"
  >
    <template #list>
      <li v-for="vacancy in projectVacanciesQuery.data.value?.vacancies" :key="vacancy.id">
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
            <BaseButton
              v-if="vacancy.state.id === StateID.Active || vacancy.state.id === StateID.Rejected"
              @click="onCloseVacancy(vacancy.id)"
              variant="outlined"
              color="red"
            >
              Закрыть вакансию
            </BaseButton>
            <BaseButton
              v-if="vacancy.state.id === StateID.Active"
              variant="outlined"
              is="router-link"
              :to="toVacancyResponses(vacancy.id)"
            >
              Отклики
            </BaseButton>
            <template v-if="vacancy.state.id === StateID.Rejected">
              <BaseButton
                variant="outlined"
                is="router-link"
                :to="createVacancyRoute(vacancy.project.id, vacancy.id)"
              >
                Редактировать
              </BaseButton>
              <BaseButton color="red" @click="onShowComment(vacancy.comment)">Причина</BaseButton>
            </template>
            <BaseButton
              v-if="vacancy.state.id === StateID.Active"
              is="router-link"
              :to="vacancyRoute(vacancy.id)"
            >
              Подробнее
            </BaseButton>
          </template>
        </BaseCard>
      </li>
    </template>
  </BaseList>
</template>

<style lang="scss" scoped></style>
