import type { Meta, StoryObj } from '@storybook/vue3';
import Link from '@/components/Link/Link.vue';
import Icon from '@/components/Icon/Icon.vue';

const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Ссылка с поддержкой разных вариантов и состояний. Использует семантические CSS-переменные.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Стилевое оформление ссылки',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Размер текста',
    },
    disabled: {
      control: 'boolean',
      description: 'Состояние "отключено"',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof Link>;

export const Primary: Story = {
  render: () => ({
    components: { Link, Icon },
    template: `
      <div style="font-size: 0.875rem; line-height: 100%;">
        <Link href="#" variant="primary">
          <template #leftIcon>
            <Icon name="union" size="small" />
          </template>
          Назад
        </Link>
      </div>
    `
  }),
};

export const Secondary: Story = {
  args: {
    href: '#',
    variant: 'secondary',
    default: 'Go home',
  },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    target: '_blank',
    variant: 'primary',
    default: 'External',
  },
};

export const Underline: Story = {
  args: {
    href: 'https://example.com',
    target: '_blank',
    variant: 'secondary',
    isUnderline: true,
    default: 'Перейти',
  },
};

// ✅ Новый: States — показывает все состояния в одном месте
export const States: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; gap: 32px;">
        <div>
          <p><strong>:link</strong></p>
          <Link href="#" variant="primary">Перейти</Link>
        </div>

        <div>
          <p><strong>:hover</strong></p>
          <Link href="#" variant="primary" style="color: var(--color-link-hover);">Перейти</Link>
        </div>

        <div>
          <p><strong>:active</strong></p>
          <Link href="#" variant="primary" style="color: var(--color-link-press);">Перейти</Link>
        </div>

        <div>
          <p><strong>:disabled</strong></p>
          <Link href="#" variant="primary" disabled>Перейти</Link>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Все состояния ссылки: обычное, наведение, активное, отключённое.',
      },
    },
  },
};