<script setup lang="ts">
  import { useGetSingleProjectQuery } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';
  import { useCreateVacancyMutation } from '@/api/SupervisorApi/hooks/useCreateVacancyMutation';
  import { useUpdateVacancyMutation } from '@/api/SupervisorApi/hooks/useUpdateVacancyMutation';
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import { useGetSingleVacancyQuery } from '@/api/VacancyApi/hooks/useGetSingleVacancyQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseInput from '@/components/ui/BaseInput.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseTextarea from '@/components/ui/BaseTextarea.vue';
  import FormSection from '@/components/ui/FormSection.vue';
  import SkillList from '@/components/ui/SkillList.vue';
  import SkillsEditModal from '@/components/ui/modal/editSkillModal/SkillModal.vue';
  import { VacancyFormType } from '@/models/Vacancy';
  import { RouteNames } from '@/router/types/routeNames';
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { toast } from 'vue3-toastify';

  const route = useRoute();
  const router = useRouter();

  const projectId = Number(route.params.id);
  const vacancyId = Number(route.query.vacancyId);

  const { data: project } = useGetSingleProjectQuery(projectId);
  const { data: vacancy } = useGetSingleVacancyQuery(Number(vacancyId) || 1);
  const { data: userData } = useGetUserInfoQuery();

  const defaultVacancyFormValue: VacancyFormType = {
    title: '',
    salary: '',
    dateStart: undefined,
    dateEnd: undefined,
    requirements: '',
    responsibilities: '',
    conditions: '',
    skillIds: [],
    projectId: projectId,
  };

  const vacancyFormValue = ref<VacancyFormType>({
    ...defaultVacancyFormValue,
  });

  watch(
    () => project.value,
    () => {
      if (project.value?.supervisor.id !== userData.value?.id) {
        router.replace(RouteNames.VACANCIES);
      }
    },
  );

  watch(
    () => vacancy.value,
    () => {
      if (vacancyId && vacancy.value) {
        vacancyFormValue.value.title = vacancy.value.title;
        vacancyFormValue.value.salary = String(vacancy.value.salary);
        vacancyFormValue.value.dateStart = vacancy.value.dateStart;
        vacancyFormValue.value.dateEnd = vacancy.value.dateEnd;
        vacancyFormValue.value.responsibilities = vacancy.value.responsibilities;
        vacancyFormValue.value.requirements = vacancy.value.requirements;
        vacancyFormValue.value.conditions = vacancy.value.conditions;
        vacancyFormValue.value.skillIds = vacancy.value.skills;
      }
    },
  );

  const isShowModal = ref<boolean>(false);
  const { mutate: createVacancy } = useCreateVacancyMutation();
  const { mutate: updateVacancy } = useUpdateVacancyMutation();
  const onSubmit = () => {
    if (!vacancyFormValue.value.title) {
      toast.warning('Заполните название вакансии');
      return;
    }
    if (!vacancyFormValue.value.dateStart) {
      toast.warning('Выберите дату начала');
      return;
    }
    if (!vacancyFormValue.value.dateEnd) {
      toast.warning('Выберите дату окончания');
      return;
    }
    if (!vacancyFormValue.value.responsibilities) {
      toast.warning('Заполните обязанности');
      return;
    }
    if (!vacancyFormValue.value.requirements) {
      toast.warning('Заполните требования');
      return;
    }
    if (!vacancyFormValue.value.conditions) {
      toast.warning('Заполните условия');
      return;
    }

    if (vacancyId) {
      updateVacancy({ vacancyData: vacancyFormValue.value, vacancyId: Number(vacancyId) });
      return;
    }
    createVacancy(vacancyFormValue.value);
  };
</script>

<template>
  <BasePanel v-if="project" class="panel">
    <FormSection tag="1" title="НИОКР" divider>
      <h1 class="header">Название НИОКР</h1>
      <BaseTextarea disabled :modelValue="project.title" />
    </FormSection>
    <FormSection tag="2" title="Данные о вакансии" divider>
      <div class="block">
        <div>
          <h1 class="header">Название вакансии</h1>
          <BaseTextarea v-model="vacancyFormValue.title" placeholder="Например, UI/UX-дизайнер" />
        </div>
        <div>
          <h1 class="header">Оплата</h1>
          <div class="payment">
            <BaseInput v-model="vacancyFormValue.salary" placeholder="0" />
            <span>₽</span>
          </div>
        </div>
        <div>
          <h1 class="header">Период работы</h1>
          <div class="date">
            <input v-model="vacancyFormValue.dateStart" type="date" name="" id="" />
            <span>—</span>
            <input v-model="vacancyFormValue.dateEnd" type="date" name="" id="" />
          </div>
        </div>
      </div>
    </FormSection>
    <FormSection tag="3" title="Обязанности, требования и условия" divider>
      <div class="block">
        <div>
          <h1 class="header">Обязанности</h1>
          <BaseTextarea
            v-model="vacancyFormValue.responsibilities"
            placeholder="Например, создать платформу (страничку) для рекламы олимпиад."
          />
        </div>
        <div>
          <h1 class="header">Требования</h1>
          <BaseTextarea
            v-model="vacancyFormValue.requirements"
            placeholder="Например, знание основ верстки и дизайна веб-страниц."
          />
        </div>
        <div>
          <h1 class="header">Условия труда</h1>
          <BaseTextarea
            v-model="vacancyFormValue.conditions"
            placeholder="Например, полный день, полная занятость."
          />
        </div>
      </div>
    </FormSection>
    <FormSection tag="4" title="Навыки">
      <h1 class="header">Навыки</h1>
      <div class="wrapper">
        <SkillList :skill-ids="vacancyFormValue.skillIds" />
        <BaseButton variant="text" @click="isShowModal = true"> Редактировать навыки + </BaseButton>
      </div>
    </FormSection>
  </BasePanel>
  <div class="buttons">
    <BaseButton variant="outlined" color="red">Сбросить и выйти</BaseButton>
    <BaseButton @click="onSubmit">Подать заявку</BaseButton>
  </div>
  <SkillsEditModal
    :skillIds="vacancyFormValue.skillIds"
    v-model:isShow="isShowModal"
    :save-function="(skillIds) => (vacancyFormValue.skillIds = skillIds)"
  />
</template>

<style lang="scss" scoped>
  .panel {
    margin-top: 3.625rem;
  }
  .block {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .header {
    font-weight: bold;
    font-size: 1.125rem;
    line-height: 2.375rem;
  }
  .input {
    max-width: 10%;
    text-align: right;
    padding-right: 0.5rem;
  }
  .payment {
    span {
      font-size: 1.25rem;
      margin-left: 0.5rem;
    }
  }
  .date {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    input {
      font-size: 1.125rem;
      border: 1px solid var(--medium-gray-color);
      border-radius: 0.3125rem;
      padding: 0.75rem;
      outline: none;
      &:focus {
        border-color: var(--accent-color);
      }
    }
  }
  .buttons {
    display: flex;
    justify-content: end;
    gap: 1rem;
    margin-top: 2.5rem;
  }
  .wrapper {
    display: flex;
    gap: 0.5rem;
  }
</style>
