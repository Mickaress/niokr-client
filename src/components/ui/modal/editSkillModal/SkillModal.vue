<script setup lang="ts">
  // TODO: сделать более общим и перенести в modal
  import { useGetAllSkillsQuery } from '@/api/SkillApi/hooks/useGetAllSkillsQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import SkillList from '@/components/ui/SkillList.vue';
  import BaseModal from '@/components/ui/modal/BaseModal.vue';
  import { computed, ref, watch } from 'vue';
  import ChangeSkill from './ChangeSkill.vue';
  import OfferSkill from './OfferSkill.vue';

  type Props = {
    isShow: boolean;
    skillIds: number[];
    saveFunction: (skillIds: number[]) => void;
  };

  const props = defineProps<Props>();

  type Emits = {
    (event: 'update:isShow', isShow: boolean): void;
  };
  const emit = defineEmits<Emits>();

  function onCloseModal() {
    emit('update:isShow', false);
  }

  const selectedSkillIds = ref(props.skillIds);

  watch(
    () => props.isShow,
    () => {
      selectedSkillIds.value = props.skillIds;
    },
  );

  const { data: allSkills } = useGetAllSkillsQuery();

  const notUserSkills = computed(
    () => allSkills?.value?.filter((skill) => !selectedSkillIds.value.includes(skill.id)),
  );

  function deleteSkill(id: number) {
    selectedSkillIds.value = selectedSkillIds.value.filter((item) => item !== id);
  }

  function addSkill(id: number) {
    selectedSkillIds.value = [...selectedSkillIds.value, id];
  }

  const saveSkills = () => {
    props.saveFunction(selectedSkillIds.value);
    onCloseModal();
  };
</script>

<template>
  <BaseModal class="skill-modal" :is-show="isShow" @close="onCloseModal">
    <h1>Редактирование навыков</h1>
    <div class="skill-modal__selected-skills">
      <h2>Выбранные навыки</h2>
      <SkillList
        v-if="selectedSkillIds?.length"
        :skill-ids="selectedSkillIds"
        :is-visible="true"
        deletable
        :deleteFunc="deleteSkill"
      />
      <p v-else>Навыки не выбраны</p>
    </div>
    <div class="skill-modal__wrapper">
      <ChangeSkill :skills="notUserSkills" :addSkillFunc="addSkill" />
      <OfferSkill />
    </div>
    <div class="skill-modal__button">
      <BaseButton @click="saveSkills()">Сохранить</BaseButton>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
  @import '@styles/breakpoints';

  .skill-modal {
    h1 {
      font-size: 1.875rem;

      @media (width <= $mobile) {
        max-width: 18.75rem;
      }
    }

    &__selected-skills {
      border-bottom: 1px solid var(--medium-gray-color);
      padding-bottom: 1.25rem;
      margin: 1.25rem 0;
      h2 {
        margin-bottom: 0.5rem;
      }
      p {
        font-size: 0.625rem;
        text-transform: uppercase;
        color: var(--dark-gray-color);
      }
    }

    &__wrapper {
      display: flex;
      gap: 1.25rem;
      @media (width <= $mobile) {
        flex-direction: column;
      }
    }

    &__button {
      display: flex;
      justify-content: center;
      margin-top: 1.25rem;
    }
  }
</style>
