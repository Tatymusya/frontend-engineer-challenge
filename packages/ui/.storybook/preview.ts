import type { Decorator } from '@storybook/vue3';
import 'virtual:svg-icons-register';

export const decorators = [
  ((story) => ({
    template: `
      <div style="
        border: 2px solid #e7d7fc;
        border-radius: 1.2rem;
        font-family: 'Inter', system-ui, sans-serif;
        background: var(--bg-surface);
        color: var(--color-text-primary);
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 37.5rem; 
        width: 100cqw;
      ">
        <story />
      </div>
    `,
  })) satisfies Decorator,
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#1a1a1a' },
    ],
  },
  docs: {
    iframeHeight: '120px',
  },
};