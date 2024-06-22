import SidebarLayout from '@/components/layout/SidebarLayout.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('SidebarLayout.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(SidebarLayout, {
      slots: { header: 'header', content: 'content', footer: 'footer' },
    });
    expect(wrapper.exists()).toBeTruthy();
  });
});
