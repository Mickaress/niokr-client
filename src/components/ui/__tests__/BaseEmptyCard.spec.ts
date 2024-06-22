import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseEmptyCard from '../BaseEmptyCard.vue';

describe('BaseEmptyCard.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BaseEmptyCard);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('компонент не ломается если передать пропсы', async () => {
      const wrapper = shallowMount(BaseEmptyCard, {
        props: { isMini: true },
      });
      expect(wrapper.exists()).toBeTruthy();
      await wrapper.setProps({ isMini: false });
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});
