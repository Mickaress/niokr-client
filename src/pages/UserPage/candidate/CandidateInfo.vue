<script setup lang="ts">
  import AppList from '@/components/ui/AppList.vue';
  import GridLayout from '@/components/ui/GridLayout.vue';
  import CandidateCompetencies from '@/components/user/candidate/CandidateCompetencies.vue';
  import CandidateSkills from '@/components/user/candidate/CandidateSkills.vue';
  import { useMobile } from '@/hooks/useBreakpoints';
  import { SpecialistType } from '@/models/User';

  type Props = {
    userInfo: SpecialistType;
  };

  const props = defineProps<Props>();

  const items = [
    {
      title: 'Институт:',
      content: `${props.userInfo.institute}`,
    },
  ];
  if (props.userInfo.group) {
    items.push({
      title: 'Группа:',
      content: `${props.userInfo.group}`,
    });
  }
  if (props.userInfo.birthday) {
    items.push({
      title: 'День рождения:',
      content: `${props.userInfo.birthday}`,
    });
  }
  if (props.userInfo.post) {
    items.push({
      title: 'Должность: ',
      content: `${props.userInfo.post}`,
    });
  }

  const isSmallDevice = useMobile();
</script>

<template>
  <GridLayout :cols="isSmallDevice ? '1fr' : '1fr 1fr'">
    <div>
      <section class="section">
        <h1>Контактная информация</h1>
        <AppList
          class="app-list"
          :width="10"
          :items="[
            {
              title: 'E-Mail:',
              content: `${userInfo.email}`,
            },
            {
              title: 'Телефон:',
              content: `${userInfo.phone}`,
            },
          ]"
        />
      </section>
      <section class="section">
        <h1>Дополнительная информация</h1>
        <AppList class="app-list" :width="10" :items="items" />
      </section>
    </div>
    <div>
      <CandidateSkills />
      <CandidateCompetencies />
    </div>
  </GridLayout>
</template>

<style lang="scss" scoped>
  .section {
    margin-bottom: 1.625rem;
    h1 {
      font-size: 1.125rem;
      font-weight: bold;
      margin-bottom: 1.0625rem;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .app-list {
    &:deep(h1) {
      color: var(--dark-gray-color);
    }
  }
</style>
