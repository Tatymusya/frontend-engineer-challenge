import type { Meta, StoryObj } from '@storybook/vue3';
import Label from '@/components/Label/Label.vue';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
    },
    description: {
      control: {
        type: 'text'
      }
    },
    color: {
      control: {
        type: 'color',
      },
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Заголовок для элементов формы',
      },
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const SmallRegular: Story = {
  render: (args) => ({
    components: { Label },
    setup() { return { args }; },
    template: `
      <div style="max-width: 24rem; padding: 1rem;">
        <Label v-bind="args">Пароль</Label>
      </div>
    `,
  }),
  args: {
    forId: 'email',
    required: true,
    description: 'Минимум 8 символов'
  }
}
