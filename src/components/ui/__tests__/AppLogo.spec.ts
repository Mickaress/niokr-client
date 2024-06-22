import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppLogo from '../AppLogo.vue';

describe('AppLogo.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(AppLogo);
    expect(wrapper.exists()).toBeTruthy();
  });
});
