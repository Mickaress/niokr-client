import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseContainer from '../BaseContainer.vue';

describe('BaseContainer.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BaseContainer);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('компонент не ломается если передать пропсы', async () => {
      const wrapper = shallowMount(BaseContainer, {
        slots: { default: 'тестовый текст' },
      });
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});
