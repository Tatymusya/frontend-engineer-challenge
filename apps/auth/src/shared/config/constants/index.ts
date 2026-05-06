/**
 * Единая точка доступа ко всем глобальным константам приложения.
 * Импортирует и объединяет все константы из подмодулей для удобного централизованного экспорта.
 * Позволяет импортировать константы в других частях приложения без указания полного пути.
 *
 * Пример использования:
 * import { APP_CONSTANTS, HTTP_STATUS, ROUTES } from '@shared/config/constants';
 */
import {
  APP_CONSTANTS,
} from '@shared/config/constants/app';
import {
  HTTP_STATUS,
  HTTP_STATUS_GROUPS,
  HTTP_STATUS_MESSAGES,
} from '@shared/config/constants/http-status';
import {
  ROUTES,
  ROUTE_NAMES,
} from '@shared/config/constants/routes';
import {
  COOKIE_KEYS,
  SESSION_STORAGE_KEYS,
  STORAGE_KEYS,
} from '@shared/config/constants/storage-keys';
import {
  VALIDATION_LIMITS,
  VALIDATION_MESSAGES,
  VALIDATION_VERIFICATION_PATTERNS,
} from '@shared/config/constants/validation';

// Экспорт всех основных групп констант как именованных экспорта
export {
  APP_CONSTANTS, COOKIE_KEYS,
  HTTP_STATUS,
  HTTP_STATUS_GROUPS,
  HTTP_STATUS_MESSAGES, ROUTES,
  ROUTE_NAMES, SESSION_STORAGE_KEYS, STORAGE_KEYS, VALIDATION_LIMITS,
  VALIDATION_MESSAGES,
  VALIDATION_VERIFICATION_PATTERNS
};

