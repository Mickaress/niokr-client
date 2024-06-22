<script setup lang="ts">
  import { useGetCandidateResponsesQuery } from '@/api/CandidateApi/hooks/useGetCandidateResponsesQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseCard from '@/components/ui/BaseCard.vue';
  import BaseList from '@/components/ui/BaseList.vue';
  import InformationModal from '@/components/ui/modal/InformationModal.vue';
  import { StateID } from '@/models/State';
  import { vacancyRoute } from '@/router/utils/route';
  import { ref } from 'vue';

  const candidateResponsesQuery = useGetCandidateResponsesQuery();

  const isShowModal = ref(false);
  const modalText = ref('');

  const onShow = (comment: string) => {
    modalText.value = comment;
    isShowModal.value = true;
  };
</script>

<template>
  <BaseList
    :is-loading="candidateResponsesQuery.isLoading.value"
    :is-error="candidateResponsesQuery.isError.value"
    empty-title="Нет откликов"
    empty-subtitle="Пока нет ни одного отклика"
    :total-items="candidateResponsesQuery.data.value?.quantity || 0"
  >
    <template #list>
      <li v-for="response in candidateResponsesQuery.data.value?.responses" :key="response.id">
        <BaseCard
          :title="response.vacancy.title"
          :link="vacancyRoute(response.vacancy.id)"
          :state="response.state"
        >
          <template #footer>
            <p>Дата отклика: {{ response.date }}</p>
          </template>
          <template #buttons>
            <BaseButton
              v-if="response.state.id === StateID.Rejected"
              @click="onShow(response.comment)"
              color="red"
            >
              Причина
            </BaseButton>
          </template>
        </BaseCard>
      </li>
    </template>
  </BaseList>
  <InformationModal v-model:is-show="isShowModal" title="Причина">
    {{ modalText }}
  </InformationModal>
</template>
