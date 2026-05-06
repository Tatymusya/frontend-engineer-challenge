import type { StorybookConfig } from '@storybook/vue3-vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {builder: { viteConfigPath: './vite.config.ts' }},
  },
  docs: {
    autodocs: true,
  },
  staticDirs: ['../public'],
  async viteFinal(config) {
    config?.plugins?.push(
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      })
    );
    return config;
  },
};

export default config;