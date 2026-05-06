import { Session } from '@entities/session/model/session.model';
import { sessionSchema } from '@entities/session/model/session.schema';
import { sessionApiService } from '@entities/session/services/session-api.service';
import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Хранилище состояния сессии.
 *
 * Управляет:
 * - текущей сессией
 * - аутентификацией
 * - обновлением токенов
 * - выходом из системы
 *
 * Использует Pinia для реактивного хранения данных и взаимодействует с `sessionApiService`
 * для выполнения HTTP-запросов к серверу аутентификации.
 */
export const useSessionStore = defineStore('session', () => {
  /**
   * Текущая активная сессия пользователя.
   * @type {Ref<Session | null>}
   */
  const session = ref<Session | null>(null);

  /**
   * Флаг загрузки, указывающий, выполняется ли запрос к серверу.
   * @type {Ref<boolean>}
   */
  const isLoading = ref(false);

  /**
   * Сообщение об ошибке, если последняя операция завершилась неудачно.
   * @type {Ref<string | null>}
   */
  const error = ref<string | null>(null);

  /**
   * Загружает данные текущей сессии с сервера.
   *
   * Используется при инициализации приложения для восстановления сессии
   * (например, после перезагрузки страницы).
   * Если сессия уже активна — запрос не выполняется.
   *
   * @returns {Promise<void>} Промис, разрешаемый после попытки восстановления сессии.
   *
   * @throws Ошибка будет залогирована, но не проброшена, если восстановление не удалось.
   *
   * @example
   * const sessionStore = useSessionStore();
   * await sessionStore.fetchSession();
   */
  async function fetchSession() {
    if (session.value?.isActive) return;

    try {
      isLoading.value = true;
      error.value = null;

      const data = await sessionApiService.getSession();
      const parsed = sessionSchema.parse(data);
      session.value = new Session(parsed);
    } catch (err) {
      session.value = null;
      error.value = 'Failed to restore session';
      console.error('[SessionStore] Restore failed:', err);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Выполняет вход пользователя по email и паролю.
   *
   * Отправляет учётные данные на сервер, создает новую сессию при успешной авторизации.
   * При неудаче очищает сессию и устанавливает сообщение об ошибке.
   *
   * @param {Object} credentials - Учётные данные пользователя.
   * @param {string} credentials.email - Адрес электронной почты.
   * @param {string} credentials.password - Пароль пользователя.
   * @returns {Promise<void>} Промис, который разрешается после попытки входа.
   *
   * @throws Выбрасывает ошибку, если авторизация не удалась (для обработки в компоненте).
   *
   * @example
   * try {
   *   await sessionStore.login({ email: 'user@example.com', password: '123456' });
   * } catch (err) {
   *   // Обработка неверных данных
   * }
   */
  async function login(credentials: { email: string; password: string }) {
    try {
      isLoading.value = true;
      error.value = null;

      const data = await sessionApiService.login(credentials);
      const parsed = sessionSchema.parse(data);
      session.value = new Session(parsed);
    } catch (err) {
      session.value = null;
      error.value = 'Invalid credentials';
      console.error('[SessionStore] Login failed:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Обновляет access-токен с помощью refresh-токена.
   *
   * Используется для продления срока действия сессии без повторного ввода логина/пароля.
   * При неудаче вызывается выход из системы.
   *
   * @returns {Promise<void>} Промис, разрешаемый после обновления токена.
   *
   * @throws Выбрасывает ошибку, если refresh-токен недействителен или запрос провалился.
   *
   * @example
   * try {
   *   await sessionStore.refresh();
   * } catch (err) {
   *   // Пользователь будет автоматически разлогинен
   * }
   */
  async function refresh() {
    if (!session.value) throw new Error('No session to refresh');

    try {
      const data = await sessionApiService.refresh(session.value.refreshToken);
      const parsed = sessionSchema.parse(data);
      session.value = session.value.withTokens(parsed.accessToken, parsed.expiresAt);
    } catch (err) {
      console.error('[SessionStore] Refresh failed:', err);
      logout();
      throw err;
    }
  }

  /**
   * Выполняет выход пользователя из системы.
   *
   * Очищает текущую сессию и сбрасывает ошибку.
   * Не отправляет запрос на сервер — выход реализуется локально.
   *
   * @returns {void}
   *
   * @example
   * sessionStore.logout();
   */
  function logout() {
    session.value = null;
    error.value = null;
  }

  /**
   * Обновляет данные пользователя в текущей сессии.
   *
   * Полезно при обновлении профиля, когда нужно обновить только часть данных пользователя.
   *
   * @param {Object} user - Новые данные пользователя.
   * @returns {void}
   *
   * @example
   * sessionStore.updateUser({ name: 'Иван', avatar: '/images/avatar.jpg' });
   */
  function updateUser(user: any) {
    if (session.value) {
      session.value = session.value.withUser(user);
    }
  }

  return {
    // State
    session,
    isLoading,
    error,

    // Actions
    fetchSession,
    login,
    refresh,
    logout,
    updateUser,
  };
});