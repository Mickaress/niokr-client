<script setup lang="ts">
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import { AdminType, SpecialistType } from '@/models/User';
  import AdminInfo from './admin/AdminInfo.vue';
  import CandidateInfo from './candidate/CandidateInfo.vue';

  const { data } = useGetUserInfoQuery();

  const SpecialistData = data.value as SpecialistType;
  const AdminData = data.value as AdminType;
</script>

<template>
  <BasePanel v-if="data" class="info">
    <h1 class="fio">{{ data.fio }}</h1>
    <CandidateInfo v-if="SpecialistData.institute" :user-info="SpecialistData" />
    <AdminInfo v-else :user-info="AdminData" />
    <BaseButton variant="outlined" is="a" href="https://int.istu.edu/" target="_blank">
      Редактировать профиль
    </BaseButton>
  </BasePanel>
</template>

<style lang="scss" scoped>
  .info {
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 1.875rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      white-space: pre-wrap;
    }
    a {
      align-self: flex-end;
      margin-top: 1.5rem;
    }
  }
</style>
