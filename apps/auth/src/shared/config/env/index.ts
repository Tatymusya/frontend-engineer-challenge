/**
 * Валидация и конфигурация переменных окружения.
 * Централизованная точка доступа к проверенным и распарсенным переменным окружения.
 * Выполняет валидацию при запуске и предоставляет удобные хелперы для проверки режимов и получения значений.
 */
import { parseEnvironmentVariables } from '@shared/config/env/schema';
import type { ParsedEnvVariables } from '@shared/config/env/types';

let validatedEnv: ParsedEnvVariables;

try {
  // Парсим и валидируем переменные окружения
  validatedEnv = parseEnvironmentVariables(import.meta.env);
} catch (error) {
  console.error('Ошибка валидации переменных окружения:', error);
  throw new Error('Ошибка валидации переменных окружения. Проверьте файл .env.');
}

/**
 * Объект с проверенными и преобразованными переменными окружения.
 * Доступны только после успешной валидации.
 */
export const env = validatedEnv;

/**
 * Проверяет, находится ли приложение в режиме разработки.
 *
 * @returns true, если режим разработки (Vite DEV), иначе false.
 */
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};

/**
 * Проверяет, находится ли приложение в режиме продакшена.
 *
 * @returns true, если режим продакшена (Vite PROD), иначе false.
 */
export const isProduction = (): boolean => {
  return import.meta.env.PROD;
};

/**
 * Проверяет, включён ли режим отладки.
 * Определяется по значению переменной DEBUG из .env.
 *
 * @returns true, если отладка включена, иначе false.
 */
export const isDebugEnabled = (): boolean => {
  return env.DEBUG;
};

/**
 * Проверяет, включён ли режим обслуживания.
 * При включении можно показать страницу "Сайт на техобслуживании".
 *
 * @returns true, если режим обслуживания активен, иначе false.
 */
export const isMaintenanceMode = (): boolean => {
  return env.MAINTENANCE_MODE;
};

/**
 * Проверяет, включены ли моки API.
 * Используется для тестирования без бэкенда.
 *
 * @returns true, если моки включены, иначе false.
 */
export const areMocksEnabled = (): boolean => {
  return env.ENABLE_MOCKS;
};

/**
 * Возвращает базовый URL API-сервера.
 *
 * @returns Строка с базовым URL API.
 */
export const getApiBaseUrl = (): string => {
  return env.API_BASE_URL;
};

/**
 * Возвращает таймаут сессии в миллисекундах.
 *
 * @returns Число — длительность таймаута сессии.
 */
export const getSessionTimeout = (): number => {
  return env.SESSION_TIMEOUT;
};

/**
 * Возвращает DSN для интеграции с Sentry.
 * Если значение не задано или пустое — возвращает undefined.
 *
 * @returns Строка с DSN или undefined.
 */
export const getSentryDsn = (): string | undefined => {
  return env.SENTRY_DSN && env.SENTRY_DSN !== '' ? env.SENTRY_DSN : undefined;
};

/**
 * Возвращает домен для интеграции с Plausible.
 * Если значение не задано или пустое — возвращает undefined.
 *
 * @returns Строка с доменом или undefined.
 */
export const getPlausibleDomain = (): string | undefined => {
  return env.PLAUSIBLE_DOMAIN && env.PLAUSIBLE_DOMAIN !== '' ? env.PLAUSIBLE_DOMAIN : undefined;
};

/**
 * Возвращает идентификатор Google Analytics.
 * Если значение не задано или пустое — возвращает undefined.
 *
 * @returns Строка с ID Google Analytics или undefined.
 */
export const getGoogleAnalyticsId = (): string | undefined => {
  return env.GA_ID && env.GA_ID !== '' ? env.GA_ID : undefined;
};