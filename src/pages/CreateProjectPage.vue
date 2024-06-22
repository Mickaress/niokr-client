<script setup lang="ts">
  import { useCreateProjectMutation } from '@/api/AdminApi/hooks/useCreateProjectMutation';
  import { useGetSupervisorListQuery } from '@/api/AdminApi/hooks/useGetSupervisorListQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseTextarea from '@/components/ui/BaseTextarea.vue';
  import FormSection from '@/components/ui/FormSection.vue';
  import { ProjectFormType } from '@/models/Project';
  import { MultiselectObjectItem } from '@/models/components/VMultiselect';
  import { RouteNames } from '@/router/types/routeNames';
  import VMultiselect from '@vueform/multiselect';
  import { computed, ref } from 'vue';
  import { toast } from 'vue3-toastify';

  const supervisorListQuery = useGetSupervisorListQuery();

  const defaultProjectFormValue: ProjectFormType = {
    title: '',
    supervisorId: undefined,
    dateStart: undefined,
    dateEnd: undefined,
    description: '',
    goal: '',
    conditions: '',
  };

  const supervisorListMultiselect = computed<MultiselectObjectItem<number>[]>(
    () =>
      supervisorListQuery.data.value?.map((supervisor) => ({
        label: supervisor.fio,
        value: supervisor.id,
      })) || [],
  );

  const projectFormValue = ref<ProjectFormType>({
    ...defaultProjectFormValue,
  });

  const { mutate: createProject } = useCreateProjectMutation();

  const onCreate = () => {
    if (!projectFormValue.value.title) {
      toast.warning('Заполните название НИОКР');
      return;
    }
    if (!projectFormValue.value.supervisorId) {
      toast.warning('Выберите руководителя НИОКР');
      return;
    }
    if (!projectFormValue.value.dateStart) {
      toast.warning('Выберите дату начала');
      return;
    }
    if (!projectFormValue.value.dateEnd) {
      toast.warning('Выберите дату окончания');
      return;
    }
    if (!projectFormValue.value.description) {
      toast.warning('Заполните описание НИОКР');
      return;
    }
    if (!projectFormValue.value.goal) {
      toast.warning('Заполните ожидаемые результаты НИОКР');
      return;
    }
    if (!projectFormValue.value.conditions) {
      toast.warning('Заполните условия НИОКР');
      return;
    }
    createProject(projectFormValue.value);
  };
</script>

<template>
  <BasePanel class="panel">
    <FormSection tag="1" title="Данные о НИОКР" divider>
      <div class="block">
        <div>
          <h1 class="header">Название НИОКР</h1>
          <BaseTextarea
            v-model="projectFormValue.title"
            placeholder="Например, Разработка интерактивных веб-приложений"
          />
        </div>
        <div>
          <h1 class="header">Руководитель</h1>
          <VMultiselect
            v-model="projectFormValue.supervisorId"
            placeholder="Выберите руководителя НИОКР"
            no-results-text="Руководитель не найден"
            no-options-text="Руководители не найдены"
            :searchable="true"
            :options="supervisorListMultiselect"
            :disabled="supervisorListQuery.isLoading.value"
            :loading="supervisorListQuery.isLoading.value"
          />
        </div>
        <div>
          <h1 class="header">Сроки реализации</h1>
          <div class="date">
            <input v-model="projectFormValue.dateStart" type="date" name="" id="" />
            <span>—</span>
            <input v-model="projectFormValue.dateEnd" type="date" name="" id="" />
          </div>
        </div>
      </div>
    </FormSection>
    <FormSection tag="2" title="Описание, ожидаемые результаты и условия">
      <div class="block">
        <div>
          <h1 class="header">Описание</h1>
          <BaseTextarea
            v-model="projectFormValue.description"
            placeholder="Например, В этом проекте вы будете заниматься разработкой интерактивных веб-приложений. Это отличная возможность применить свои навыки веб-разработки и создать увлекательные веб-приложения."
          />
        </div>
        <div>
          <h1 class="header">Ожидаемые результаты</h1>
          <BaseTextarea
            v-model="projectFormValue.goal"
            placeholder="Например, Разработать интерактивные веб-приложения, которые предоставят пользователю уникальный и привлекательный опыт."
          />
        </div>
        <div>
          <h1 class="header">Условия труда</h1>
          <BaseTextarea
            v-model="projectFormValue.conditions"
            placeholder="Например, Полный день, полная занятость."
          />
        </div>
      </div>
    </FormSection>
  </BasePanel>
  <div class="buttons">
    <BaseButton variant="outlined" color="red" is="router-link" :to="{ name: RouteNames.USER_INFO }"
      >Сбросить и выйти</BaseButton
    >
    <BaseButton @click="onCreate">Создать НИОКР</BaseButton>
  </div>
</template>

<style lang="scss" scoped>
  .panel {
    margin-top: 3.625rem;
  }
  .search-input {
    max-width: 50%;
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
</style>
