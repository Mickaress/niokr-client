<script setup lang="ts">
  import { useGetSkillOffersQuery } from '@/api/AdminApi/hooks/useGetSkillOffersQuery';
  import { useReviewSkillMutation } from '@/api/AdminApi/hooks/useReviewSkillMutation';
  import BaseList from '@/components/ui/BaseList.vue';
  import ProposalCard from '@/components/ui/ProposalCard.vue';
  import { StateID } from '@/models/State';

  const skillOffersQuery = useGetSkillOffersQuery();

  const { mutate: reviewSkill } = useReviewSkillMutation();
</script>

<template>
  <BaseList
    :is-loading="skillOffersQuery.isLoading.value"
    :is-error="skillOffersQuery.isError.value"
    empty-title="Нет заявок на навыки"
    empty-subtitle="Пока нет ни одной заявки на навык"
    :total-items="skillOffersQuery.data.value?.quantity || 0"
  >
    <template #list>
      <li v-for="skill of skillOffersQuery.data.value?.skills" :key="skill.id">
        <ProposalCard
          :title="skill.name"
          :state="skill.state"
          :approve="() => reviewSkill({ skillId: skill.id, stateId: StateID.Active })"
          :reject="() => reviewSkill({ skillId: skill.id, stateId: StateID.Rejected })"
        >
        </ProposalCard>
      </li>
    </template>
  </BaseList>
</template>

<style lang="scss" scoped></style>
