/**
 * Конфигурация сессии по умолчанию.
 *
 * Содержит настройки, такие как время жизни токенов, API endpoints,флаги безопасности и другие параметры,
 * используемые в логике аутентификации и управления сессией.
 *
 * @example
 * console.log(SESSION_CONFIG.tokenRefreshThreshold);
 */
export { SESSION_API_ENDPOINTS, SESSION_CONFIG } from '@entities/session/config/';
export type { ISessionConfig } from '@entities/session/config/';

/**
 * Интерфейсы, связанные с данными сессии и пользователем.
 */
export type {
  /**
   * Основной интерфейс данных авторизованного пользователя.
   *
   * Описывает структуру пользователя, возвращаемого сервером при аутентификации.
   */
  IAuthUser,

  /**
   * Интерфейс полных данных сессии.
   *
   * Включает токены, время истечения и данные пользователя.
   */
  ISessionData,

  /**
   * Простой объект сессии (plain object) для сериализации.
   *
   * Используется при передаче или сохранении состояния сессии.
   */
  SessionPlainObject
} from '@entities/session/types/';

/**
 * Предикатная функция для проверки, является ли объект валидным пользователем.
 *
 * Полезна при ручной проверке типов или восстановлении состояния из localStorage.
 *
 * @param data - Проверяемый объект.
 * @returns `true`, если объект соответствует интерфейсу `IAuthUser`.
 *
 * @example
 * if (isAuthUser(data)) {
 *   session.setUser(data);
 * }
 */
export { isAuthUser } from '@entities/session/types';

/**
 * Класс-модель сессии.
 *
 * Инкапсулирует состояние аутентификации, предоставляет методы для:
 * - проверки активности сессии
 * - обновления токенов
 * - изменения данных пользователя
 *
 * Является иммутабельным — любое изменение возвращает новый экземпляр.
 *
 * @template User - Тип данных пользователя (по умолчанию `IAuthUser`)
 *
 * @example
 * const session = new Session({ accessToken: '...', expiresAt: 1735689200, user });
 * if (session.isActive) {
 *   api.setToken(session.accessToken);
 * }
 */
export {
  Session
} from '@entities/session/model/session.model';

/**
 * Хранилище состояния сессии на основе Pinia.
 *
 * Централизованное управление:
 * - текущей сессией
 * - процессами входа/выхода
 * - восстановлением и обновлением токенов
 *
 * Реагирует на изменения и предоставляет реактивные данные для компонентов.
 *
 * @example
 * const sessionStore = useSessionStore();
 * await sessionStore.fetchSession();
 * console.log(sessionStore.session?.user.email);
 */
export {
  useSessionStore
} from '@entities/session/model/session.store';

/**
 * Сервис для взаимодействия с API аутентификации.
 *
 * Обеспечивает HTTP-запросы к эндпоинтам `/auth/*`, таким как:
 * - `/auth/login`
 * - `/auth/session`
 * - `/auth/refresh`
 * - `/auth/logout`
 * - `/auth/verify-email`
 *
 * Не управляет состоянием — только отправляет запросы и возвращает ответы.
 *
 * @example
 * try {
 *   const data = await sessionApiService.login({ email, password });
 *   useSessionStore().setSession(data);
 * } catch (err) {
 *   console.error('Login failed:', err);
 * }
 */
export {
  sessionApiService
} from '@entities/session/services/session-api.service';

/**
 * Zod-схема валидации данных сессии.
 *
 * Определяет строгую типизацию и правила проверки для объекта сессии,
 * полученного от сервера. Гарантирует, что данные безопасны для использования.
 *
 * Используется совместно с `z.infer` для получения типа `SessionSchema`.
 *
 * @typedef {Object} SessionSchema
 * @property {string} accessToken - Токен доступа
 * @property {string} refreshToken - Токен обновления
 * @property {number} expiresAt - Временная метка истечения срока действия
 * @property {IAuthUser | null | undefined} user - Данные пользователя
 *
 * @example
 * const parsed = sessionSchema.parse(responseData);
 */
export type {
  SessionSchema
} from '@entities/session/model/session.schema';

