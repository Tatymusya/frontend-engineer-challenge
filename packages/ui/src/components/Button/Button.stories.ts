import type { Meta, StoryObj } from '@storybook/vue3';
import Button from '@/components/Button/Button.vue';
import Icon from '@/components/Icon/Icon.vue';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary']
    },
    disabled: {
      control: 'boolean'
    }
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Кнопка с поддержкой разных вариантов и состояний.',
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    default: 'Зарегистрироваться'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    default: 'Зарегистрироваться'
  }
}

export const DisabledPrimary: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    default: 'Зарегистрироваться'
  }
}

export const DisabledSecondary: Story = {
  args: {
    variant: 'secondary',
    disabled: true,
    default: 'Зарегистрироваться'
  }
}
