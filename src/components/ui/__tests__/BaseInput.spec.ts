import { VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseInput from '../BaseInput.vue';

const getInputValue = (wrapper: VueWrapper) => wrapper.find('input').element.value;

describe('BaseInput.vue', () => {
  describe(':props', () => {
    it('modelValue изменяет input.value', async () => {
      const modelValue = '123';
      const wrapper = shallowMount(BaseInput, { props: { modelValue } });
      expect(getInputValue(wrapper)).toEqual(modelValue);
    });
  });

  describe('@emits', () => {
    it('ввод в input изменяет modelValue', async () => {
      const wrapper = shallowMount(BaseInput, {
        props: {
          'onUpdate:modelValue': async (modelValue: any) => {
            await wrapper.setProps({ modelValue });
          },
        },
      });
      // по дефолту пустая строка
      expect(getInputValue(wrapper)).toEqual('');
      const newValue = 'new value';
      await wrapper.find('input').setValue(newValue);
      expect(wrapper.vm.modelValue).toEqual(newValue);
    });
  });
});
