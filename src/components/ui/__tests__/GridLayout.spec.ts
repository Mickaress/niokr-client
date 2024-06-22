import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import GridLayout from '../GridLayout.vue';

describe('GridLayout.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(GridLayout);
    expect(wrapper.exists()).toBeTruthy();
  });
});
