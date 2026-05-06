/**
 * Модуль инициализации и интеграции Sentry для сбора ошибок и мониторинга производительности.
 * Предоставляет функцию инициализации, которая должна быть вызвана явно в провайдерах приложения.
 * Не выполняет автоматическую инициализацию при импорте — соответствует best practices.
 */

import * as Sentry from '@sentry/browser';
import { sentryConfig } from '@shared/config/sentry/config';

/**
 * Инициализирует Sentry для отслеживания ошибок и производительности.
 * Должна быть вызвана один раз при старте приложения (например, в app/providers).
 *
 * @example
 * initializeSentry();
 */
export const initializeSentry = (): void => {
  // Проверяем, настроен ли DSN
  if (!sentryConfig.dsn) {
    console.warn('Sentry DSN не настроен. Инициализация пропущена.');
    return;
  }

  try {
    // Инициализация Sentry с интеграциями
    Sentry.init({
      ...sentryConfig,
      integrations: [
        // Автоматическая трассировка маршрутов, HTTP-запросов и пользовательских действий
        Sentry.browserTracingIntegration(),
        // Включение воспроизведения сессий (если включено в конфиге)
        Sentry.replayIntegration(),
      ],
    });

    console.warn('Sentry успешно инициализирован');
  } catch (error) {
    console.error('Не удалось инициализировать Sentry:', error);
  }
};

/**
 * Отправляет произвольную ошибку в Sentry.
 *
 * @param error - Объект ошибки (Error или Error-like).
 * @param contexts - Дополнительные контекстные данные (необязательно).
 * @returns ID события в Sentry или undefined.
 */
export const captureException = (error: Error, contexts?: Record<string, unknown>): string | undefined => {
  return Sentry.captureException(error, contexts);
};

/**
 * Отправляет текстовое сообщение в Sentry с указанным уровнем важности.
 *
 * @param message - Сообщение для отправки.
 * @param level - Уровень важности (info, warning, error и т.д.). По умолчанию — 'info'.
 * @returns ID события или undefined.
 */
export const captureMessage = (
  message: string,
  level: Sentry.SeverityLevel = 'info'
): string | undefined => {
  return Sentry.captureMessage(message, level);
};

/**
 * Устанавливает контекст пользователя для последующих событий.
 * Полезно для атрибуции ошибок конкретным пользователям.
 *
 * @param user - Объект пользователя с полями id, email, username и т.д., или null для очистки.
 */
export const setUserContext = (user: Sentry.User | null): void => {
  Sentry.setUser(user);
};

/**
 * Добавляет дополнительные данные к следующим событиям.
 *
 * @param key - Ключ (например, "component", "state").
 * @param value - Любое сериализуемое значение.
 */
export const setExtraContext = (key: string, value: unknown): void => {
  Sentry.setExtra(key, value);
};

/**
 * Добавляет тег к следующим событиям. Теги удобны для фильтрации в интерфейсе Sentry.
 *
 * @param key - Название тега (например, "feature", "environment").
 * @param value - Значение тега (строка).
 */
export const setTagContext = (key: string, value: string): void => {
  Sentry.setTag(key, value);
};

/**
 * Начинает новую временную метку (span) для мониторинга производительности.
 * Рекомендуется использовать с async/await внутри callback'а.
 *
 * @param name - Название операции (например, "load-user-data").
 * @param op - Операция (например, "http", "ui.render").
 * @param callback - Асинхронная или синхронная функция, выполнение которой будет отслеживаться.
 * @returns Результат callback'а.
 *
 * @example
 * await startSpan('fetchUserData', 'http', async () => {
 *   const response = await fetch('/api/user');
 *   return response.json();
 * });
 */
export const startSpan = <T>(
  name: string,
  callback: (span: Sentry.Span) => T | Promise<T>,
  op?: string,
): T | Promise<T> => {
  return Sentry.startSpan({ name, op }, callback);
};


// Экспорт экземпляра Sentry для прямого доступа (если потребуется)
export { Sentry };

