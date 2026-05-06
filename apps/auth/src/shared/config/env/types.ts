/**
 * Типы для переменных окружения.
 * Определяют структуру переменных, загружаемых из .env-файлов,
 * а также их преобразованные (распарсенные) значения, используемые в приложении.
 */

/**
 * Интерфейс исходных переменных окружения.
 * Содержит все переменные, как они объявлены в .env-файлах (в виде строк).
 */
export interface EnvVariables {
  /** Название приложения */
  VITE_APP_TITLE: string;

  /** Версия приложения */
  VITE_APP_VERSION: string;

  /** Базовый URL API-сервера */
  VITE_API_BASE_URL: string;

  /** Флаг режима отладки ('true' или 'false') */
  VITE_DEBUG: string;

  /** Порт, на котором запускается приложение */
  VITE_PORT: string;

  /** Флаг включения моков API ('true' или 'false') */
  VITE_ENABLE_MOCKS: string;

  /** Путь по умолчанию после входа в систему */
  VITE_DEFAULT_REDIRECT_PATH: string;

  /** Таймаут сессии в миллисекундах */
  VITE_SESSION_TIMEOUT: string;

  /** Флаг включения аналитики Plausible ('true' или 'false') */
  VITE_PLAUSIBLE_ENABLED: string;

  /** Домен для аналитики Plausible */
  VITE_PLAUSIBLE_DOMAIN: string;

  /** Идентификатор Google Analytics */
  VITE_GA_ID: string;

  /** DSN для интеграции с Sentry */
  VITE_SENTRY_DSN: string;

  /** Флаг режима обслуживания ('true' или 'false') */
  VITE_MAINTENANCE_MODE: string;

  /** Флаг включения экспериментального интерфейса ('true' или 'false') */
  VITE_ENABLE_EXPERIMENTAL_UI: string;

  /** Флаг пропуска валидации переменных окружения ('true' или 'false') */
  VITE_SKIP_ENV_VALIDATION: string;
}

/**
 * Интерфейс распарсенных переменных окружения.
 * Содержит переменные в приведённом к соответствующим типам виде (boolean, number и т.д.),
 * готовые к использованию в коде приложения.
 */
export interface ParsedEnvVariables {
  /** Название приложения */
  APP_TITLE: string;

  /** Версия приложения */
  APP_VERSION: string;

  /** Базовый URL API-сервера */
  API_BASE_URL: string;

  /** Режим отладки */
  DEBUG: boolean;

  /** Порт, на котором запускается приложение */
  PORT: number;

  /** Включены ли моки API */
  ENABLE_MOCKS: boolean;

  /** Путь по умолчанию после входа в систему */
  DEFAULT_REDIRECT_PATH: string;

  /** Таймаут сессии в миллисекундах */
  SESSION_TIMEOUT: number;

  /** Включена ли аналитика Plausible */
  PLAUSIBLE_ENABLED: boolean;

  /** Домен для аналитики Plausible */
  PLAUSIBLE_DOMAIN: string;

  /** Идентификатор Google Analytics */
  GA_ID: string;

  /** DSN для интеграции с Sentry */
  SENTRY_DSN: string;

  /** Включён ли режим обслуживания */
  MAINTENANCE_MODE: boolean;

  /** Включён ли экспериментальный интерфейс */
  ENABLE_EXPERIMENTAL_UI: boolean;

  /** Пропускать ли валидацию переменных окружения */
  SKIP_ENV_VALIDATION: boolean;
}