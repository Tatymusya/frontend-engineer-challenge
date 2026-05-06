import type { Meta, StoryObj } from '@storybook/vue3';
import Paragraph from '@/components/Paragraph/Paragraph.vue';

const meta = {
  title: 'Components/Paragraph',
  component: Paragraph,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select', 
      options: ['large', 'medium', 'small']
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'bold']
    },
    color: {
      control: 'color'
    },
    lineClamp: {
      control: 'select',
      options: [undefined, 1, 2, 3]
    },
    truncate: {
      control: 'boolean'
    },
    as: {
      control: 'select', options: ['p', 'div']
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Абзац текста.',
      },
    },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {
  args: {
    default: 'Обычный абзац текста с хорошей читаемостью.',
  },
};

export const Sizes: Story = {
  render: () => ({
    components: { Paragraph },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem;">
        <Paragraph size="large">Large</Paragraph>
        <Paragraph size="medium">Medium (default)</Paragraph>
        <Paragraph size="small">Small</Paragraph>
      </div>
    `,
  }),
};

export const LineClamp: Story = {
  args: {
    lineClamp: 2,
    default: 'Длинный текст, который обрежется после второй строки. Очень длинный-длинный текст, очень длинный. Это полезно для карточек, списков и превью контента.',
  },
};