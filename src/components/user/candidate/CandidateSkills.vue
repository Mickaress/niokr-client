<script setup lang="ts">
  import { useUpdateSkillsMutation } from '@/api/CandidateApi/hooks/useUpdateSkillsMutation';
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import SkillList from '@/components/ui/SkillList.vue';
  import SkillsEditModal from '@/components/ui/modal/editSkillModal/SkillModal.vue';
  import { CandidateType } from '@/models/User';
  import { computed, ref } from 'vue';

  const { data: userData } = useGetUserInfoQuery();

  const candidateData = computed(() => userData.value as CandidateType);

  const isShowModal = ref<boolean>(false);

  const { mutate: updateSkills } = useUpdateSkillsMutation();
</script>

<template>
  <section v-if="candidateData.skills" class="section">
    <div class="title">
      <h1>Навыки</h1>
      <BaseButton variant="text" @click="isShowModal = true"> Изменить </BaseButton>
    </div>
    <p v-if="candidateData.skills.length === 0">Навыки не выбраны</p>
    <SkillList v-else is-visible :skill-ids="candidateData.skills" />
  </section>
  <SkillsEditModal
    :skillIds="candidateData.skills"
    v-model:isShow="isShowModal"
    :save-function="(skillIds) => updateSkills(skillIds)"
  />
</template>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .section {
    margin-bottom: 1.625rem;
    p {
      color: var(--dark-gray-color);
    }
    @media (width <= $mobile) {
      margin-top: 1.625rem;
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
