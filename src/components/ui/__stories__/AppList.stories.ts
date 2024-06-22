import { Meta, StoryObj } from '@storybook/vue3';
import ToUpButton from '../ToUpButton.vue';

const meta: Meta<typeof ToUpButton> = {
  title: 'ui/AppList',
  component: ToUpButton,
  tags: ['autodocs'],
  args: {
    visible: true,
    topOffset: 0,
  },
};

export default meta;
type Story = StoryObj<typeof ToUpButton>;

export const Default: Story = {};
