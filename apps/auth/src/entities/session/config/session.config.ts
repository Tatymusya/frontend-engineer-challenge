import { toMs } from '@shared/lib/';

export interface ISessionConfig {
  MAX_EXTENSION_DAYS: number;
  MAX_EXTENSION_HOURS: number;
  IDLE_TIMEOUT_MINUTES: number;
  REFRESH_BEFORE_EXPIRY_MS: number;
  SOON_TO_EXPIRE_MS: number;
}

/**
 * Конфигурация сессий — единая точка настройки.
 *
 * Содержит параметры, связанные с жизненным циклом сессии:
 * - максимальное время действия
 * - таймаут бездействия
 * - порог обновления токена
 */
export const SESSION_CONFIG = {
  /**
   * Максимальный срок действия сессии в днях.
   *
   * После этого времени требуется повторный вход.
   */
  MAX_EXTENSION_DAYS: 30,

  /**
   * Максимальный срок действия сессии в часах.
   *
   * Вычисляется как MAX_EXTENSION_DAYS * 24.
   */
  MAX_EXTENSION_HOURS: 30 * 24, // 720

  /**
   * Таймаут бездействия пользователя (в минутах).
   *
   * Если пользователь не активен дольше — сессия может быть завершена.
   */
  IDLE_TIMEOUT_MINUTES: 15,

  /**
   * Время до истечения access-токена, при котором нужно начать обновление (в миллисекундах).
   *
   * Используется для предотвращения "просроченных" запросов.
   */
  REFRESH_BEFORE_EXPIRY_MS: toMs({ minutes: 1 }), // 1 минута

  /**
   * Порог "скоро истекает" — используется для определения,
   * нужно ли обновлять токен (в миллисекундах).
   *
   * Например, если до истечения токена осталось меньше 5 минут — запускаем refresh.
   */
  SOON_TO_EXPIRE_MS: toMs({ minutes: 5 }), // 5 минут
} as const satisfies ISessionConfig;

// Эндпоинты API
export const SESSION_API_ENDPOINTS = {
  SESSION: {
    CURRENT: '/sessions/current',
    AUTH: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFY_EMAIL: '/auth/resend-verify-email',
  },
} as const;