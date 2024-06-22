<script setup lang="ts">
  import { useUpdateCompetenciesMutation } from '@/api/CandidateApi/hooks/useUpdateCompetenciesMutation';
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import InputModal from '@/components/ui/modal/InputModal.vue';
  import { CandidateType } from '@/models/User';
  import { computed, ref } from 'vue';

  const { data: userData } = useGetUserInfoQuery();

  const candidateData = computed(() => userData.value as CandidateType);

  const isShowModal = ref<boolean>(false);

  const { mutate: updateCompetencies } = useUpdateCompetenciesMutation();
</script>

<template>
  <section class="section">
    <div class="title">
      <h1>Компетенции</h1>
      <BaseButton variant="text" @click="isShowModal = true"> Изменить </BaseButton>
      <InputModal
        v-model:isShow="isShowModal"
        title="Редактирование компетенций"
        :baseText="candidateData.competencies"
        placeholder="Например, Умение работать в команде"
        :submitFunction="(text) => updateCompetencies(text)"
        submit-text="Сохранить"
      />
    </div>
    <p>{{ candidateData.competencies }}</p>
  </section>
</template>

<style lang="scss" scoped>
  .section {
    margin-bottom: 3.125rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.0625rem;
    h1 {
      font-size: 1.125rem;
      font-weight: bold;
    }
  }
</style>
