import type { Meta, StoryObj } from '@storybook/vue3';
import Form from '@/components/Form/Form.vue';
import Label from '@/components/Label/Label.vue';
import Input from '@/components/Input/Input.vue';
import Button from '@/components/Button/Button.vue';
import Heading from '@/components/Heading/Heading.vue';

const meta = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    validateOnSubmit: {
      control: 'boolean'
    },
    resetOnSubmit: {
      control: 'boolean',
    }
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Элемент формы.',
      },
    },
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: (args) => ({
    components: { Form, Label, Input, Button, Heading },
    setup() {
      return { args };
    },
    template: `
      <Form v-bind="args" @submit="alert('Отправлено!')">
        <template #legend>
          <Heading lv="h1">Настройки профиля</Heading>
        </template>

        <template #default>
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <Input id="name" placeholder="Имя">
              <template #label>
                <Label forId="name">Имя</Label>
              </template>
            </Input>
          </div>

          <div>
            <Input id="surname" placeholder="Фамилия">
              <template #label>
                <Label forId="surname">Фамилия</Label>
              </template>
            </Input>
          </div>
        </div>
        </template>
        <template #actions>
          <div style="width: 100%; gap: 1rem; padding-top: 0.5rem; display: flex; flex-direction: column;">
          <Button type="submit" size="large">Сохранить</Button>  
          <Button variant="secondary" size="large">Отмена</Button>
          </div>
        </template>
      </Form>
    `,
  }),
  args: {
    validateOnSubmit: true,
    resetOnSubmit: true,
  },
};