import { Breadcrumb } from '@/models/components/BaseBreadcrumbs';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseBreadcrumbs from '../BaseBreadcrumbs.vue';

describe('BaseBreadcrumbs.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BaseBreadcrumbs, {
      props: { breadcrumbs: [] },
      global: { stubs: ['router-link'] },
    });
    expect(wrapper.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('отображается правильное количество ссылок', async () => {
      const breadcrumbs: Breadcrumb[] = [
        { title: '1', to: { path: '/' } },
        { title: '', to: { path: '/' } },
      ];
      const wrapper = shallowMount(BaseBreadcrumbs, {
        props: { breadcrumbs },
        global: { stubs: ['router-link'] },
      });
      expect(wrapper.findAll('.breadcrumbs-item')).toHaveLength(breadcrumbs.length);
    });
  });
});
