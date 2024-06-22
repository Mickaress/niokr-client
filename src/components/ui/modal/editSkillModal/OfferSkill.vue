<template>
  <div>
    <h1>Предложите новый навык</h1>
    <section class="block">
      <h2>Название навыка</h2>
      <form>
        <BaseTextarea placeholder="Например, Теория вероятностей" v-model="input" />
        <BaseButton variant="outlined" type="button" @click="offerNewSkill">
          Предложить навык
        </BaseButton>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { useOfferSkillMutation } from '@/api/CandidateApi/hooks/useOfferSkillMutation';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseTextarea from '@/components/ui/BaseTextarea.vue';
  import { ref } from 'vue';

  const { mutate: offerSkill } = useOfferSkillMutation();

  const offerNewSkill = () => {
    offerSkill(input.value);
    input.value = '';
  };

  const input = ref('');
</script>

<style scoped lang="scss">
  @import '@styles/breakpoints';

  h1 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
  .block {
    background-color: var(--gray-color);
    width: 25rem;
    padding: 0.875rem;
    border: 1px solid var(--medium-gray-color);
    border-radius: 0.3125rem;

    @media (width <= $tablet) {
      width: 20rem;
    }

    @media (width <= $mobile) {
      width: 100%;
    }

    h2 {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.625rem;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 0.75rem;
  }
</style>
