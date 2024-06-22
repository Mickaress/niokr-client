<script setup lang="ts">
  import { useCloseProjectMutation } from '@/api/SupervisorApi/hooks/useCloseProjectMutation';
  import { useGetSupervisorProjectsQuery } from '@/api/SupervisorApi/hooks/useGetSupervisorProjectsQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseCard from '@/components/ui/BaseCard.vue';
  import BaseList from '@/components/ui/BaseList.vue';
  import SkillList from '@/components/ui/SkillList.vue';
  import ConfirmModal from '@/components/ui/modal/ConfirmModal.vue';
  import { StateID } from '@/models/State';
  import { createVacancyRoute, projectRoute } from '@/router/utils/route';
  import { ref } from 'vue';

  const projectsQuery = useGetSupervisorProjectsQuery();
  const { mutate: closeProject } = useCloseProjectMutation();

  const deletableProjectId = ref<number>(0);
  const isShowDeleteModal = ref<boolean>(false);

  const onCloseProject = (projectId: number) => {
    deletableProjectId.value = projectId;
    isShowDeleteModal.value = true;
  };
</script>

<template>
  <!-- Modals -->
  <ConfirmModal
    v-model:is-show="isShowDeleteModal"
    question="Вы уверены, что хотите закрыть этот НИОКР?"
    :agree-action="() => closeProject(deletableProjectId)"
    agree-answer="Закрыть"
    disagree-answer="Отмена"
  />
  <!-- Modals -->
  <BaseList
    :is-loading="projectsQuery.isLoading.value"
    :is-mini="false"
    :is-error="projectsQuery.isError.value"
    empty-title="У вас нет НИОКР"
    empty-subtitle="Пока у вас нет ни одного НИОКР"
    :total-items="projectsQuery.data.value?.quantity || 0"
  >
    <template #list>
      <li v-for="project in projectsQuery.data.value?.projects" :key="project.id">
        <BaseCard
          :title="project.title"
          :link="projectRoute(project.id)"
          :state="project.state"
          is-divide
        >
          <template #header>
            <p>{{ project.supervisor.fio }}</p>
          </template>
          <template #main>
            <p>
              Описание:
              <span>{{ project.description }}</span>
            </p>
            <p>
              Цель:
              <span>{{ project.goal }}</span>
            </p>
            <p>
              Сроки реализации:
              <span> {{ project.period }} </span>
            </p>
          </template>
          <template #footer>
            <SkillList :skillIds="project.skills" />
          </template>
          <template #buttons>
            <template v-if="project.state.id === StateID.Active">
              <BaseButton color="red" variant="outlined" @click="onCloseProject(project.id)">
                Закрыть НИОКР
              </BaseButton>
              <BaseButton is="router-link" variant="outlined" :to="createVacancyRoute(project.id)">
                Добавить вакансию
              </BaseButton>
            </template>
            <BaseButton is="router-link" :to="projectRoute(project.id)"> Подробнее </BaseButton>
          </template>
        </BaseCard>
      </li>
    </template>
  </BaseList>
</template>

<style lang="scss" scoped></style>
