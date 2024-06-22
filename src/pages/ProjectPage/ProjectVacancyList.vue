<script setup lang="ts">
  import { useCreateResponseMutation } from '@/api/CandidateApi/hooks/useCreateResponseMutation';
  import { useGetSingleProjectQuery } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import BaseTable from '@/components/ui/BaseTable.vue';
  import { vacancyRoute } from '@/router/utils/route';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const projectId = Number(route.params.id);

  const projectQuery = useGetSingleProjectQuery(projectId);

  const { mutate: createResponse } = useCreateResponseMutation();

  const { data: userData } = useGetUserInfoQuery();
</script>

<template>
  <BasePanel>
    <BaseStub
      v-if="projectQuery.data.value?.vacancies.length === 0"
      title="У данного НИОКР нет вакансий"
    ></BaseStub>
    <BaseTable v-else class="table" :headers="['Название вакансии', 'Обязанности', 'Оплата', '']">
      <tr v-for="row in projectQuery.data.value?.vacancies" :key="row.id">
        <td>{{ row.title }}</td>
        <td>{{ row.responsibilities }}</td>
        <td>{{ row.salary === 0 ? 'Без оплаты' : `${row.salary} ₽` }}</td>
        <td>
          <div class="buttons">
            <template v-if="userData?.role === 'specialist'">
              <BaseButton v-if="row.isResponse" disabled>Уже откликнулись</BaseButton>
              <BaseButton v-else @click="createResponse(row.id)" variant="outlined">
                Откликнуться
              </BaseButton>
            </template>
            <BaseButton is="router-link" :to="vacancyRoute(row.id)"> Подробнее </BaseButton>
          </div>
        </td>
      </tr>
    </BaseTable>
  </BasePanel>
</template>

<style lang="scss" scoped>
  .buttons {
    display: flex;
    gap: 0.3125rem;
    justify-content: end;
    align-items: center;
    p {
      text-transform: uppercase;
    }
  }
</style>
