import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseTag from '../BaseTag.vue';

describe('BaseTag.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BaseTag);
    expect(wrapper.exists()).toBeTruthy();
  });
});
