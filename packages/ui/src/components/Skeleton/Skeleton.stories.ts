import type { Meta, StoryObj } from '@storybook/vue3';
import Skeleton from '@/components/Skeleton/Skeleton.vue';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'select',
      options: ['rect', 'circle', 'text', 'avatar', 'button']
    },
    width: {
      control: 'text'
    },
    height: {
      control: 'text'
    },
    animated: {
      control: 'boolean'
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Скелетон для разметки.',
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  render: (args) => ({
    components: { Skeleton },
    setup() { return { args }; },
    template: `
      <div style="display: flex; gap: 0.5rem; flex-direction: column; align-items: start;">
        <Skeleton v-bind="args" />
        <Skeleton v-bind="args" />
        <Skeleton v-bind="args" />
        <Skeleton v-bind="args" width="8rem" />
      </div>
    `,
  }),
  args: {
    shape: "button",
    width: '19rem',
    height: '0.5rem'
  },
};

export const Circle: Story = {
  render: (args) => ({
    components: { Skeleton },
    setup() { return { args }; },
    template: `
      <div style="display: flex; gap: 0.5rem; flex-direction: column; align-items: start;">
        <Skeleton v-bind="args" />
      </div>
    `,
  }),
  args: {
    shape: 'circle',
    width: '2.5rem',
    height: '2.5rem'
  },
};

export const Avatar: Story = {
  render: (args) => ({
    components: { Skeleton },
    setup() { return { args }; },
    template: `
      <div style="display: flex; gap: 0.5rem; flex-direction: column; align-items: start;">
        <Skeleton v-bind="args" />
      </div>
    `,
  }),
  args: {
    shape: 'avatar',
    width: '3rem',
    height: '3rem'
  },
};

export const Button: Story = {
    render: (args) => ({
    components: { Skeleton },
    setup() { return { args }; },
    template: `
      <div style="display: flex; gap: 0.5rem; flex-direction: column; align-items: start;">
        <Skeleton v-bind="args" />
      </div>
    `,
  }),
  args: {
    shape: 'button',
    width: '19rem',
    height: '2.5rem'
  },
};

export const Card: Story = {
  render: (args) => ({
    components: { Skeleton },
    setup() { return { args }; },
    template: `
      <div style="display: flex; gap: 1rem; align-items: flex-start; justify-content: flex-start; padding: 1rem;">
        <Skeleton v-bind="args" width="2.5rem" height="2.5rem" shape="avatar" />
        <div style="flex: 1; align-items: flex-start; display: flex; flex-direction: column; gap: 0.5rem;">
          <Skeleton v-bind="args" shape="text" width="19rem" />
          <Skeleton v-bind="args" shape="text" width="19rem" />
          <Skeleton v-bind="args" shape="text" width="19rem" />
        </div>
      </div>
    `,
  }),
};