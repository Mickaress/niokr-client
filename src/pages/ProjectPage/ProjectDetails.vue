<script setup lang="ts">
  import { useGetSingleProjectQuery } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';
  import AppList from '@/components/ui/AppList.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import GridLayout from '@/components/ui/GridLayout.vue';
  import SkillList from '@/components/ui/SkillList.vue';
  import { useDesktop, useMobile } from '@/hooks/useBreakpoints';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const isDesktop = useDesktop();
  const isMobile = useMobile();

  const projectId = Number(route.params.id);
  const projectQuery = useGetSingleProjectQuery(projectId);
</script>

<template>
  <BasePanel class="panel" v-if="projectQuery.data.value">
    <GridLayout :cols="isDesktop ? '1fr 1fr' : '1fr'">
      <AppList
        :items="[
          {
            title: 'Научный руководитель',
            content: projectQuery.data.value.supervisor.fio,
          },
          {
            title: 'Сроки реализации',
            content: projectQuery.data.value.period,
          },
        ]"
      />
      <div class="info">
        <h1>Условия труда</h1>
        <p>{{ projectQuery.data.value.conditions }}</p>
      </div>
    </GridLayout>
  </BasePanel>
  <BasePanel v-if="projectQuery.data.value">
    <AppList
      :width="isMobile ? 10 : 16"
      :items="[
        {
          title: 'Описание',
          content: `${projectQuery.data.value.description}`,
        },
        {
          title: 'Ожидаемые результаты',
          content: `${projectQuery.data.value.goal}`,
        },
      ]"
    />
    <div class="skills">
      <h1>Требуемые навыки</h1>
      <SkillList isVisible :skill-ids="projectQuery.data.value.skills" />
    </div>
  </BasePanel>
</template>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .panel {
    margin-bottom: 1rem;
  }

  .info {
    @media (width <= $tablet) {
      margin-top: 1.5rem;
    }

    h1 {
      font-size: 1.125rem;
      margin-bottom: 0.625rem;
    }
    p {
      font-size: 1.125rem;
      font-weight: 700;
    }
  }

  .skills {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    h1 {
      min-width: 16rem;
      font-weight: 600;
      font-size: 1.125rem;

      @media (width < $mobile) {
        min-width: 10rem;
      }
    }
  }
</style>
