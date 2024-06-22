import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseButton from '../BaseButton.vue';

describe('BaseButton.vue', () => {
  it('Компонент отображается', async () => {
    const wrapper = shallowMount(BaseButton);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('Компонент работает корректно при передаче параметров', async () => {
      const wrapper = shallowMount(BaseButton, {
        props: {
          variant: 'outlined',
          disabled: true,
          fullWidth: true,
          color: 'red',
          is: 'button',
        },
      });
      expect(wrapper.exists()).toBeTruthy();

      await isExistsWithProps({ variant: 'primary' });
      await isExistsWithProps({ variant: 'outlined' });
      await isExistsWithProps({ variant: 'text' });
      await isExistsWithProps({ variant: 'tag' });
      await isExistsWithProps({ is: 'router-link' });
      await isExistsWithProps({ is: 'a' });
      await isExistsWithProps({ disabled: false });
      await isExistsWithProps({ fullWidth: false });

      async function isExistsWithProps(props: typeof wrapper.vm.$props) {
        await wrapper.setProps(props);
        expect(wrapper.exists()).toBeTruthy();
      }
    });
  });

  it('При передаче параметра disabled кнопка неактивна', async () => {
    const wrapper = shallowMount(BaseButton, {
      props: { disabled: true },
    });
    expect(wrapper.find('button').element.disabled).toBeTruthy();
  });
});
