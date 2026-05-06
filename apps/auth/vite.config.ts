import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';

export default defineConfig({
  plugins: [vue()],
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
    ],
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(__dirname, 'src/vitest.setup.ts')],
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,

    // Покрытие кода
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov', 'html', 'clover', 'json'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        'src/main.ts',
        'src/vite-env.d.ts',
        'src/**/*.types.ts',
        'src/app/providers/router/**',
        'src/shared/ui/**',
        'src/entities/**/model/index.ts',
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'test/**',
        '__tests__/**',
      ],
      thresholds: {
        lines: 80,
        functions: 75,
        branches: 70,
        statements: 80,
      },
    },

    // snapshot-тесты
    snapshotFormat: {
      escapeString: true,
      printBasicPrototype: false,
    },

    // Типизация
    typecheck: {
      enabled: true,
      include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@services': path.resolve(__dirname, 'src/services')
    }
  },
  server: {
    port: 3000
  }
})
