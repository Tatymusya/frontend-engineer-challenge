/**
 * Конфигурация Sentry для централизованного сбора ошибок и мониторинга производительности.
 * Настройки включают фильтрацию ошибок, выборку трейсов и повторных сессий, а также кастомные метки.
 * Инициализация выполняется в файле `./index.ts`.
 */

import type { BrowserOptions } from '@sentry/browser';
import { env, isProduction, isDevelopment } from '@shared/config/env';

// Определение режимов выполнения
const IS_PROD = isProduction();
const IS_DEV = isDevelopment();

/**
 * Основная конфигурация Sentry для браузера.
 * Включает DSN, фильтрацию, семплирование и кастомную обработку событий.
 */
export const sentryConfig: BrowserOptions = {
  dsn: env.SENTRY_DSN,

  // Активировать только при наличии DSN и в production или при включённом DEBUG
  enabled: Boolean(env.SENTRY_DSN) && (IS_PROD || env.DEBUG),

  // Сбор 10% транзакций для мониторинга производительности
  tracesSampleRate: 0.1,

  // URL, для которых включена распределённая трассировка
  tracePropagationTargets: [
    /^https:\/\/yourserver\.io\/api/,
    /^https:\/\/api\.yourapp\.com/,
    env.API_BASE_URL,
  ],

  // Сбор сессий воспроизведения: 10% обычных, 100% с ошибками
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Исключение часто встречающихся ложных срабатываний
  ignoreErrors: [
    'top.GLOBALS',
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    'http://tt.epicplay.com',
    "Can't find variable: ZiteReader",
    'jigsaw is not defined',
    'ComboSearch is not defined',
    'http://loading.retry.widdit.com/',
    'atomicFindClose',
    'Extension context invalidated.',
    'Network Error',
    'Failed to fetch',
    'Load failed',
  ],

  // Исключение сторонних скриптов и расширений из breadcrumbs
  denyUrls: [
    /extensions\//i,
    /^chrome:\/\//i,
    /.*\.js.map$/i,
  ],

  // Окружение (production, development, staging)
  environment: IS_PROD ? 'production' : IS_DEV ? 'development' : 'staging',

  // Версия приложения
  release: `auth-app@${env.APP_VERSION}`,

  // Интеграции будут добавлены динамически в index.ts
  integrations: [],

  // Добавление дополнительного контекста перед отправкой события
  beforeSend: (event, hint) => {
    if (!event.extra) event.extra = {};

    // Расширяем данные события
    event.extra = {
      ...event.extra,
      appVersion: env.APP_VERSION,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    return event;
  },
};

/**
 * Дополнительные настройки для мониторинга производительности.
 * Отдельно вынесены для возможного расширения и читаемости.
 */
export const performanceMonitoringConfig = {
  /**
   * Включить ли мониторинг производительности.
   */
  enablePerformance: true,

  /**
   * Минимальная длительность транзакции (в мс), чтобы считать её «медленной».
   */
  minTransactionDuration: 500,

  /**
   * Список транзакций (по шаблону), которые следует игнорировать.
   */
  ignoreTransactions: [/^\/health$/, /^\/status$/],
};