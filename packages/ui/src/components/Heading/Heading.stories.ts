import type { Meta, StoryObj } from '@storybook/vue3';
import Heading from '@/components/Heading/Heading.vue';

const meta = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    lv: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'bold']
    },
    color: {
      control: {
        type: 'color',
      },
    },
    truncate: {
      control: 'boolean'
    },
    lineClamp: {
      control: 'select',
      options: ['1', '2', '3']
    }
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Заголовок с поддержкой разных вариантов, с возможностью выбрать тег от H1-H6.',
      },
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof Heading>;

export const Truncate: Story = {
  render: (args) => ({
    components: { Heading },
    setup() { return { args }; },
    template: `
      <div style="max-width: 24rem; padding: 1rem;">
        <Heading v-bind="args">Регистрация в системе</Heading>
      </div>
    `,
  }),
  args: {
    lv: 'h1',
    weight: 'medium',
  },
};

export const LineClamp: Story = {
  render: (args) => ({
    components: { Heading },
    setup() { return { args }; },
    template: `
      <div style="max-width: 24rem; padding: 1rem;">
        <Heading v-bind="args">Регистрация в системе</Heading>
      </div>
    `,
  }),
  args: {
    lv: 'h1',
    weight: 'medium',
    lineClamp: 2,
  },
};