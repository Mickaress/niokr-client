<script setup lang="ts">
  import { useGetAllSkillsQuery } from '@/api/SkillApi/hooks/useGetAllSkillsQuery';
  import { declOfNum } from '@/helpers/string';
  import { computed, ref, withDefaults } from 'vue';
  import BaseButton from './BaseButton.vue';
  import BaseTag from './BaseTag.vue';

  type Props = {
    skillIds: number[];
    defaultVisible?: number;
    declWords?: [string, string, string];
    isVisible?: boolean;
    deletable?: boolean;
    deleteFunc?: (id: number) => void;
  };

  const props = withDefaults(defineProps<Props>(), {
    defaultVisible: 3,
    declWords: () => ['навык', 'навыка', 'навыков'],
    isVisible: false,
  });

  const { data: allSkills } = useGetAllSkillsQuery();
  const skills = computed(
    () => allSkills.value?.filter((skill) => props.skillIds.includes(skill.id)) || [],
  );

  const isTagsVisible = ref(props.isVisible);

  const hiddenTagsCount = props.skillIds.length - props.defaultVisible;
  const BtnText = computed(() =>
    isTagsVisible.value
      ? props.isVisible
        ? ''
        : 'Скрыть'
      : `+${hiddenTagsCount} ${declOfNum(hiddenTagsCount, props.declWords)}`,
  );

  const visibleSkills = computed(() =>
    isTagsVisible.value ? skills.value : skills.value.slice(0, props.defaultVisible),
  );

  // TODO: тесты
</script>

<template>
  <ul class="skill-list">
    <li v-for="skill of visibleSkills" :key="skill.id">
      <BaseTag :deletable="props.deletable" @click="props.deleteFunc && props.deleteFunc(skill.id)">
        {{ skill.name }}
      </BaseTag>
    </li>
    <li v-if="hiddenTagsCount > 0" class="button">
      <BaseButton variant="text" @click="isTagsVisible = !isTagsVisible">
        {{ BtnText }}
      </BaseButton>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }
  .button {
    display: flex;
    align-items: center;
  }
</style>
