import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseModal from '../modal/BaseModal.vue';

describe('BaseModal.vue', () => {
  describe(':props', () => {
    it('видимость зависит от modelValue', async () => {
      const wrapper = mount(BaseModal, {
        props: { isShow: false },
      });
      expect(wrapper.isVisible()).toBeFalsy();
      await wrapper.setProps({ isShow: true });
      expect(wrapper.isVisible()).toBeTruthy();
    });
  });

  describe('@emits', () => {
    it('modelValue обновляется', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          isShow: true,
          onClose: async () => {
            await wrapper.setProps({ isShow: false });
          },
        },
      });
      await wrapper.find('.close-btn').trigger('click');
      expect(wrapper.isVisible()).toBeFalsy();
    });
  });
});
