import { Meta, StoryObj } from '@storybook/vue3';
import BaseButton, { Color, Is, Variant } from '../BaseButton.vue';

const variantProps: Variant[] = ['primary', 'outlined', 'text'];
const isProps: Is[] = ['button', 'router-link', 'a'];
const colorProps: Color[] = ['red'];

const meta: Meta<typeof BaseButton> = {
  title: 'ui/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    is: 'button',
    disabled: false,
    fullWidth: false,
    default: 'Кнопка',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variantProps,
    },
    is: {
      control: 'select',
      options: isProps,
    },
    color: {
      control: 'select',
      options: colorProps,
    },
    default: {
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

export const Default: Story = {};

export const Primary: Story = {
  ...Default,
  args: { ...Default.args, variant: 'primary' },
};

export const Outlined: Story = {
  ...Default,
  args: { ...Default.args, variant: 'outlined' },
};

export const Text: Story = {
  ...Default,
  args: { ...Default.args, variant: 'text' },
};

export const Blocked: Story = {
  ...Default,
  args: { ...Default.args, disabled: true },
};

export const Red: Story = {
  ...Default,
  args: { ...Default.args, color: 'red' },
};
