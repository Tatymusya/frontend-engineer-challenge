/**
 * Централизованный экспорт всех конфигурационных модулей приложения.
 * Объединяет настройки, константы, параметры окружения и конфигурацию сторонних инструментов.
 *
 * Предоставляет единую точку доступа для:
 * - API-конфигурации (базовые URL, таймауты).
 * - Глобальных констант (например, лимиты, сообщения).
 * - Переменных окружения (env-настройки).
 * - Конфигурации мониторинга (Sentry).
 * - Правил валидации (схемы, сообщения об ошибках).
 *
 * Используется для удобного импорта конфигураций без указания глубоких путей.
 *
 */
export {
  API_ENDPOINTS,
  apiClient,
  apiService,
  CONTENT_TYPES,
  HTTP_METHODS,
  RESPONSE_STATUS,
  TIMEOUT_CONFIG
} from '@shared/config/api';
export type { ApiService } from '@shared/config/api';
export {
  APP_CONSTANTS, COOKIE_KEYS,
  HTTP_STATUS,
  HTTP_STATUS_GROUPS,
  HTTP_STATUS_MESSAGES, ROUTE_NAMES, ROUTES, SESSION_STORAGE_KEYS, STORAGE_KEYS, VALIDATION_LIMITS,
  VALIDATION_MESSAGES,
  VALIDATION_VERIFICATION_PATTERNS
} from '@shared/config/constants';
export {
  areMocksEnabled, env, getApiBaseUrl,
  getGoogleAnalyticsId,
  getPlausibleDomain,
  getSentryDsn,
  getSessionTimeout, isDebugEnabled, isDevelopment, isMaintenanceMode, isProduction
} from '@shared/config/env/';
export {
  parseEnvironmentVariables
} from '@shared/config/env/schema';
export type { EnvVariables, ParsedEnvVariables } from '@shared/config/env/types';
export {
  captureException,
  captureMessage, initializeSentry, setExtraContext,
  setTagContext,
  setUserContext,
  startSpan
} from '@shared/config/sentry/';
export {
  performanceMonitoringConfig, sentryConfig
} from '@shared/config/sentry/config';
export {
  baseResponseSchema,
  validateData
} from '@shared/config/validation/';
export type {
  BaseResponseFormData
} from '@shared/config/validation/global.schema';

