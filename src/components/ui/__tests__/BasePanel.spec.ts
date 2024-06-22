import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BasePanel from '../BasePanel.vue';

describe('BasePanel.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BasePanel, {
      slots: { default: 'default' },
    });
    expect(wrapper.exists()).toBeTruthy();
  });
});
