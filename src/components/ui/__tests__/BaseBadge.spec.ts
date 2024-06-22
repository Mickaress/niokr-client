import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseBadge from '../BaseBadge.vue';

describe('BaseBadge.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BaseBadge);
    expect(wrapper.exists()).toBeTruthy();
  });
});
