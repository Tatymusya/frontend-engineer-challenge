import { faker } from '@faker-js/faker';
import { cleanup } from '@testing-library/vue';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';

// Импортируем MSW
import { server } from '@/mock-server/handlers/server.handlers';
/**
 * Глобальные настройки для Vitest.
 *
 * Выполняется перед каждым тестом.
 */

// Устанавливаем фиксированный seed
faker.seed(12345);

// Устанавливаем фиксированное время для всех тестов
const TEST_BASE_DATE = new Date('2026-01-01T00:00:00.000Z');

// Активируем моки времени
vi.useFakeTimers();

// Устанавливаем системное время
beforeEach(() => {
  vi.setSystemTime(TEST_BASE_DATE);
  vi.clearAllMocks();
});

// Очищаем DOM после каждого теста
afterEach(() => {
  cleanup();
  server.resetHandlers();
  vi.restoreAllMocks();
});

// Мокаем консоль, чтобы предупреждения не засоряли вывод
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  // Запускаем MSW-сервер перед всеми тестами
  server.listen({ onUnhandledRequest: 'error' });

  console.warn = (...args) => {
    if (String(args[0]).includes('Test is not defined')) return;
    originalWarn.call(console, ...args);
  };

  console.error = (...args) => {
    originalError.call(console, ...args);
  };
});

afterEach(() => {
  // Сбрасываем обработчики между тестами
  server.resetHandlers();
});

afterAll(() => {
  // Останавливаем сервер
  server.close();

  console.warn = originalWarn;
  console.error = originalError;
});