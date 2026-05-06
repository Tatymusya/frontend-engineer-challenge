import type { Meta, StoryObj } from '@storybook/vue3';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage.vue';

const meta = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium']
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium']
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Сообщение об ошибке.',
      },
    },
  },
} satisfies Meta<typeof ErrorMessage>

export default meta
type Story = StoryObj<typeof meta>

export const SmallRegular: Story = {
  render: (args) => ({
    components: { ErrorMessage },
    setup() { return { args }; },
    template: `
      <div style="max-width: 24rem; padding: 1rem;">
        <ErrorMessage v-bind="args">Минимум 8 символов</ErrorMessage>
      </div>
    `,
  }),
  args: {
    size: 'small',
    weight: 'regular',
  }
}

export const SmallMedium: Story = {
  render: (args) => ({
    components: { ErrorMessage },
    setup() { return { args }; },
    template: `
      <div style="max-width: 24rem; padding: 1rem;">
        <ErrorMessage v-bind="args">Минимум 8 символов</ErrorMessage>
      </div>
    `,
  }),
  args: {
    size: 'small',
    weight: 'medium',
  }
}

export const MediumRegular: Story = {
  render: (args) => ({
    components: { ErrorMessage },
    setup() { return { args }; },
    template: `
      <div style="max-width: 24rem; padding: 1rem;">
        <ErrorMessage v-bind="args">Минимум 8 символов</ErrorMessage>
      </div>
    `,
  }),
  args: {
    size: 'medium',
    weight: 'regular',
  }
}

export const MediumMedium: Story = {
  render: (args) => ({
    components: { ErrorMessage },
    setup() { return { args }; },
    template: `
      <div style="max-width: 24rem; padding: 1rem;">
        <ErrorMessage v-bind="args">Минимум 8 символов</ErrorMessage>
      </div>
    `,
  }),
  args: {
    size: 'medium',
    weight: 'medium',
  }
}