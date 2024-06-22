import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppListItem from '../AppListItem.vue';

describe('AppListItem.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(AppListItem, {
      props: { width: 10 },
    });
    expect(wrapper.exists()).toBeTruthy();
  });
});
