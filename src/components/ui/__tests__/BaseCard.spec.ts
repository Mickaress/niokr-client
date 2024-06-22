import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseCard from '../BaseCard.vue';
// TODO: доделать
describe('BaseCard.vue', () => {
  it('renders title and state badge', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'My State Card',
        state: { id: 1, state: 'Active' },
      },
    });

    const title = wrapper.find('h1');

    expect(title.text()).toBe('My State Card');
  });
});
