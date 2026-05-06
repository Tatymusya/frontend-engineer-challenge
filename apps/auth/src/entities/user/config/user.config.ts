/**
 * Эндпоинты API
 */

// Эндпоинты API
export const USER_API_ENDPOINTS = {
  USER: {
    CURRENT: '/users/current',
    UPDATE: '/users/current/update',
    CHANGE_PASSWORD: '/users/current/change-password',
    RESEND_VERIFY_EMAIL: '/users/current/resend-verify-email',
    VERIFY_EMAIL_BY_LINK: '/users/current/verify-email',
  },
} as const;