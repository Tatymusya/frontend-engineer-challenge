/**
 * Константы маршрутов приложения.
 * Содержит все URL-пути, используемые в приложении, сгруппированные по назначению.
 * Используется для централизованного управления навигацией и избежания "магических строк" в коде.
 */
export const ROUTES = {
  // Основные маршруты
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  VERIFY_EMAIL: '/verify-email/:token',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  // Маршруты, связанные с аутентификацией
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_EMAIL: '/verify-email',
    LOGOUT: '/logout',
  },

  // Маршруты управления аккаунтом
  ACCOUNT: {
    PROFILE: '/account/profile',
    SECURITY: '/account/security',
    PREFERENCES: '/account/preferences',
    DELETE_ACCOUNT: '/account/delete',
  },

  // Страницы ошибок
  ERROR: {
    NOT_FOUND: '/404',
    UNAUTHORIZED: '/401',
    SERVER_ERROR: '/500',
  },
} as const;

/**
 * Имена маршрутов, используемые в системе навигации.
 * Применяются в guard'ах, компонентах <router-link> и программной навигации.
 * Позволяют ссылаться на маршруты по имени вместо прямого использования пути.
 */
export const ROUTE_NAMES = {
  HOME: 'Home',
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',
  VERIFY_EMAIL: 'VerifyEmail',
  DASHBOARD: 'Dashboard',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  NOT_FOUND: 'NotFound',
} as const;