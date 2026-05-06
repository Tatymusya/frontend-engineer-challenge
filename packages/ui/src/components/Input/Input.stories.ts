import type { Meta, StoryObj } from '@storybook/vue3';
import Input from '@/components/Input/Input.vue';
import Icon from '@/components/Icon/Icon.vue';
import Label from '@/components/Label/Label.vue';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage.vue';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number']
    },
    disabled: {
      control: 'boolean'
    }
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Поле ввода с поддержкой разных вариантов и состояний.',
      },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => ({
    components: { Input, Label },
    setup() {
      return { args };
    },
    template: `
      <div style="margin: 2rem;">
        <Input v-bind="args">
          <template #label>
            <Label forId="title">Title</Label>
          </template>
        </Input>
      </div>
    `,
  }),
  args: {
    type: 'text',
    placeholder: 'Placeholder',
    id: 'title',
  },
}

export const WithRightIcon: Story = {
  render: (args) => ({
    components: { Input, Icon, Label },
    setup() {
      return { args };
    },
    template: `
      <div style="margin: 2rem;">
        <Input v-bind="args">
          <template #label>
            <Label forId="title">Title</Label>
          </template>
          <template #rightIcon>
            <Icon name="visible" size="large" />
          </template>
        </Input>
      </div>
    `,
  }),
  args: {
    type: 'text',
    placeholder: 'Placeholder',
    modelValue: 'Summary',
    id: 'title',
  },
}

export const WithLeftIcon: Story = {
  render: (args) => ({
    components: { Input, Icon, Label },
    setup() {
      return { args };
    },
    template: `
      <div style="margin: 2rem;">
        <Input v-bind="args">
          <template #label>
            <Label forId="title">Title</Label>
          </template>
          <template #leftIcon>
            <Icon name="union" size="small" />
          </template>
        </Input>
      </div>
    `,
  }),
  args: {
    type: 'text',
    placeholder: 'Placeholder',
    modelValue: 'title',
    id: 'title',
  },
}

export const Valid: Story = {
  render: () => ({
    components: { Input, Label },
    template: `
      <div style="margin: 2rem;">
        <Input type="text" placeholder="Placeholder" modelValue="user" valid="true">
          <template #label>
            <Label forId="user">User</Label>
          </template>
        </Input>
      </div>
    `
  }),
  args: {
    type: 'text',
    placeholder: 'Placeholder',
    modelValue: 'user',
    id: 'user',
  },
}

export const Disabled: Story = {
  render: () => ({
    components: { Input, Label },
    template: `
      <div style="margin: 2rem;">
        <Input type="text" placeholder="Placeholder" disabled="true">
          <template #label>
            <Label forId="ceo">CEO</Label>
          </template>
        </Input>
      </div>
    `
  }),
  args: {
    type: 'text',
    placeholder: 'Placeholder',
    id: 'ceo',
  },
}

export const WithError: Story = {
  render: (args) => ({
    components: { Input, Label, ErrorMessage },
    setup() {
      return { args };
    },
    template: `
      <div style="margin: 2rem;">
        <Input v-bind="args">
          <template #label>
            <Label forId="email">Email</Label>
          </template>
          <template #error>
            <ErrorMessage weight="regular">неправильный email</ErrorMessage>
          </template>
        </Input>
      </div>
    `,
  }),
  args: {
    type: 'text',
    placeholder: 'Placeholder',
    modelValue: 'taty@',
    error: 'неправильный email',
    id: 'email',
  },
}
