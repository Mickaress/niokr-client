<script setup lang="ts">
  import { StateID, StateType } from '@/models/State';
  import { ref } from 'vue';
  import BaseButton from './BaseButton.vue';
  import BaseCard from './BaseCard.vue';
  import InformationModal from './modal/InformationModal.vue';
  import InputModal from './modal/InputModal.vue';

  type Props = {
    title: String;
    state: StateType;
    approve: () => void;
    reject?: () => void;
    commentReject?: (comment: string) => void;
  };

  const props = defineProps<Props>();

  const isShowInfoModal = ref<boolean>(false);
  const isShowRejectModal = ref<boolean>(false);

  const onReject = () => {
    if (props.reject) {
      props.reject();
      return;
    }
    isShowRejectModal.value = true;
  };

  const onCommentReject = (comment: string) => {
    if (props.commentReject) props.commentReject(comment);
  };

  // TODO: тесты
</script>

<template>
  <!-- modals -->
  <InformationModal :title="title" v-model:is-show="isShowInfoModal">
    <slot name="info"></slot>
  </InformationModal>
  <InputModal
    v-model:is-show="isShowRejectModal"
    title="Причина отклонения"
    placeholder="Например, Ошибки"
    :submit-function="(comment) => onCommentReject(comment)"
    submit-text="Отправить"
  />
  <!-- modals -->
  <BaseCard :title="title" :state="state">
    <template #main><slot name="main"></slot></template>
    <template #footer><slot name="footer"></slot></template>
    <template #buttons>
      <BaseButton variant="outlined" v-if="state.id !== StateID.Approved" @click="approve">
        Одобрить
      </BaseButton>
      <BaseButton
        variant="outlined"
        color="red"
        v-if="state.id !== StateID.Rejected"
        @click="onReject"
      >
        Отклонить
      </BaseButton>
      <BaseButton v-if="$slots['info']" @click="isShowInfoModal = true">Подробнее</BaseButton>
    </template>
  </BaseCard>
</template>

<style lang="scss" scoped></style>
