<template>
  <input
    v-bind="$attrs"
    :ref="props.inputRef"
    :value="props.modelValue"
    :class="['input', { 'with-icon': props.icon }]"
    :style="{
      backgroundImage: props.icon && `url(${props.icon})`,
    }"
    @input="onInput"
  />
</template>

<script setup lang="ts">
  import { withDefaults, type Ref } from 'vue';

  type Props = {
    modelValue?: string;
    icon?: string;
    inputRef?: Ref<HTMLInputElement | null>;
  };

  type Emits = {
    (e: 'update:modelValue', value: string): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    icon: undefined,
    inputRef: undefined,
  });
  const emit = defineEmits<Emits>();

  function onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  }
</script>

<style lang="scss" scoped>
  .input {
    width: 100%;
    padding-left: 0.8rem;
    font-size: 1.125rem;
    height: 2.75rem;
    border: 1px solid var(--medium-gray-color);
    border-radius: 0.3125rem;
    transition: border 100ms ease;
    outline: none;
  }

  .input.with-icon {
    background: calc(100% - 1rem) center / 1.5rem no-repeat #fff;
  }

  .input::placeholder {
    color: var(--dark-gray-color);
  }

  .input:disabled {
    color: var(--dark-gray-color);
    cursor: default;
    background-color: var(--light-gray-color);
  }

  .input:focus-visible {
    border-color: var(--accent-color);
  }
</style>
