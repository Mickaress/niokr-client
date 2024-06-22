import BaseEmptyCard from '@/components/ui/BaseEmptyCard.vue';
import { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BaseEmptyCard> = {
  title: 'ui/BaseList',
  component: BaseEmptyCard,
  tags: ['autodocs'],
  args: {
    isMini: true,
  },
};

export default meta;
type Story = StoryObj<typeof BaseEmptyCard>;

export const Default: Story = {};
