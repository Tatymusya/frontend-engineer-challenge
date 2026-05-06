/**
 * Константы API
 */

// HTTP-методы
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
} as const;

/**
 * Тип, представляющий все доступные HTTP-методы.
 */
export type HttpMethod = keyof typeof HTTP_METHODS;

// Эндпоинты API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VALIDATE_TOKEN: '/auth/validate-token',
    SESSION: {
      LIST: '/auth/sessions',
      STATUS: '/auth/sessions/status',
      REVOKE: (id: string) => `/auth/sessions/${id}`,
      REVOKE_OTHERS: '/auth/sessions/others/revoke',
      EXTEND: '/auth/sessions/extend',
    },
  },
  USER: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
  },
} as const;

/**
 * Типы контента для заголовков Content-Type.
 */
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_URLENCODED: 'application/x-www-form-urlencoded',
  MULTIPART_FORM_DATA: 'multipart/form-data',
} as const;

/**
 * Коды состояния HTTP-ответов.
 */
export const RESPONSE_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
  GATEWAY_TIMEOUT: 504,
} as const;

/**
 * Конфигурация повторных попыток запросов.
 */
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  BASE_DELAY_MS: 1000,
  BACKOFF_FACTOR: 2,
} as const;

/**
 * Конфигурация таймаутов.
 */
export const TIMEOUT_CONFIG = {
  REQUEST_TIMEOUT: 10000, // 10 seconds
  LONG_TIMEOUT: 30000,    // 30 seconds
  UPLOAD_TIMEOUT: 60000,  // 60 seconds
} as const;

/**
 * Конфигурация кэширования.
 */
export const CACHE_CONFIG = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes in ms
  SHORT_TTL: 60 * 1000,       // 1 minute in ms
  LONG_TTL: 60 * 60 * 1000,   // 1 hour in ms
} as const;