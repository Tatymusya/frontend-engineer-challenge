/**
 * Схема валидации переменных окружения с использованием Zod.
 * Определяет структуру и правила проверки переменных из .env-файлов,
 * обеспечивая типобезопасность и защиту от некорректных значений.
 */
import { z } from 'zod';
import type { EnvVariables } from '@shared/config/env/types';

/**
 * Схема Zod для валидации переменных окружения.
 * Проверяет наличие, типы и формат переменных, объявленных в `.env`.
 * Использует строгие правила и значения по умолчанию для безопасной работы приложения.
 */
const envSchema = z.object({
  // Настройки приложения
  VITE_APP_TITLE: z.string().default('Auth App'), // Название приложения
  VITE_APP_VERSION: z.string().default('0.1.0'), // Версия приложения
  VITE_API_BASE_URL: z.string().url('VITE_API_BASE_URL должен быть корректным URL'), // Базовый URL API
  VITE_DEBUG: z.enum(['true', 'false']).default('false'), // Режим отладки (в виде строки)
  VITE_PORT: z.string().regex(/^\d+$/, 'VITE_PORT должен быть числом'), // Порт приложения

  // Аутентификация и сессии
  VITE_ENABLE_MOCKS: z.enum(['true', 'false']).default('false'), // Включены ли моки API
  VITE_DEFAULT_REDIRECT_PATH: z.string().default('/profile'), // Путь после входа по умолчанию
  VITE_SESSION_TIMEOUT: z.string().regex(/^\d+$/, 'VITE_SESSION_TIMEOUT должен быть числом'), // Таймаут сессии в мс

  // Аналитика и мониторинг
  VITE_PLAUSIBLE_ENABLED: z.enum(['true', 'false']).default('false'), // Включена ли аналитика Plausible
  VITE_PLAUSIBLE_DOMAIN: z.string().optional().default(''), // Домен для Plausible
  VITE_GA_ID: z.string().optional().default(''), // Идентификатор Google Analytics
  VITE_SENTRY_DSN: z.string().optional().default(''), // DSN для Sentry

  // Флаги функций и режимов
  VITE_MAINTENANCE_MODE: z.enum(['true', 'false']).default('false'), // Режим обслуживания
  VITE_ENABLE_EXPERIMENTAL_UI: z.enum(['true', 'false']).default('false'), // Экспериментальный интерфейс
  VITE_SKIP_ENV_VALIDATION: z.enum(['true', 'false']).default('false'), // Пропускать ли валидацию переменных
}) satisfies z.ZodType<EnvVariables>;

export { envSchema };

/**
 * Функция безопасного парсинга переменных окружения.
 * Преобразует строковые значения из `import.meta.env` в соответствующие типы (boolean, number и т.д.).
 *
 * @param env - Объект с переменными окружения (например, `import.meta.env`)
 * @returns Объект с распарсенными и типизированными значениями, готовыми к использованию в приложении
 */
export const parseEnvironmentVariables = (env: Record<string, string | undefined>) => {
  const parsedEnv = envSchema.parse(env);
  
  // Преобразуем строковые флаги в boolean, а числовые строки — в number
  return {
    APP_TITLE: parsedEnv.VITE_APP_TITLE,
    APP_VERSION: parsedEnv.VITE_APP_VERSION,
    API_BASE_URL: parsedEnv.VITE_API_BASE_URL,
    DEBUG: parsedEnv.VITE_DEBUG === 'true',
    PORT: Number.parseInt(parsedEnv.VITE_PORT, 10),
    ENABLE_MOCKS: parsedEnv.VITE_ENABLE_MOCKS === 'true',
    DEFAULT_REDIRECT_PATH: parsedEnv.VITE_DEFAULT_REDIRECT_PATH,
    SESSION_TIMEOUT: Number.parseInt(parsedEnv.VITE_SESSION_TIMEOUT, 10),
    PLAUSIBLE_ENABLED: parsedEnv.VITE_PLAUSIBLE_ENABLED === 'true',
    PLAUSIBLE_DOMAIN: parsedEnv.VITE_PLAUSIBLE_DOMAIN,
    GA_ID: parsedEnv.VITE_GA_ID,
    SENTRY_DSN: parsedEnv.VITE_SENTRY_DSN,
    MAINTENANCE_MODE: parsedEnv.VITE_MAINTENANCE_MODE === 'true',
    ENABLE_EXPERIMENTAL_UI: parsedEnv.VITE_ENABLE_EXPERIMENTAL_UI === 'true',
    SKIP_ENV_VALIDATION: parsedEnv.VITE_SKIP_ENV_VALIDATION === 'true',
  };
};