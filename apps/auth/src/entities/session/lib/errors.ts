/**
 * Доменные коды ошибок авторизации.
 * НЕ зависят от HTTP или backend-реализации.
 */
export const enum AuthErrorCodes {
  // Общие
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',

  // Авторизация
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  TWO_FACTOR_REQUIRED = 'TWO_FACTOR_REQUIRED',

  // Регистрация
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  WEAK_PASSWORD = 'WEAK_PASSWORD',

  // Восстановление
  EXPIRED_RESET_TOKEN = 'EXPIRED_RESET_TOKEN',
  INVALID_RESET_TOKEN = 'INVALID_RESET_TOKEN',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',

  // Неизвестная ошибка
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}