import { Session } from '@entities/session/model/session.model';
import type { SessionSchema } from '@entities/session/model/session.schema';
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
   * Флаг, указывающий, идёт ли процесс аутентификации (вход, рефреш, восстановление).
   * Отличается от `isLoading`, так как может включать локальные операции.
   * @type {Ref<boolean>}
   */
  const isAuthenticating = ref(false);

  /**
   * Флаг, указывающий, что хранилище завершило свою инициализацию.
   * Например, после попытки восстановить сессию из API или persisted state.
   * @type {Ref<boolean>}
   */
  const isInitialized = ref(false);

  /**
   * Флаг загрузки, указывающий, выполняется ли HTTP-запрос к серверу.
   * @type {Ref<boolean>}
   */
  const isLoading = ref(false);

  /**
   * Сообщение об ошибке, если последняя операция завершилась неудачно.
   * @type {Ref<string | null>}
   */
  const error = ref<string | null>(null);

  /**
   * Флаг: идёт ли фоновое обновление токена.
   * Отличается от `isAuthenticating`, так как может происходить автоматически.
   * @type {Ref<boolean>}
   */
  const isRefreshing = ref(false);

  /**
   * Устанавливает сессию из данных API.
   *
   * Создаёт экземпляр класса `Session` и сохраняет его в хранилище.
   * Автоматически сбрасывает ошибки.
   */
  function setSession(data: SessionSchema) {
    try {
      const parsed = sessionSchema.parse(data);
      session.value = new Session(parsed);
      error.value = null;
    } catch (err) {
      error.value = 'Invalid session data';
      console.error('[SessionStore] Failed to parse session:', err);
      throw err;
    }
  }

  /**
   * Загружает данные текущей сессии с сервера.
   *
   * Используется при инициализации приложения для восстановления сессии
   * (например, после перезагрузки страницы).
   * Если сессия уже активна — запрос не выполняется.
   *
   * Устанавливает:
   * - `isAuthenticating = true` — так как это часть аутентификационного процесса
   * - `isInitialized = true` — по завершении, независимо от результата
   *
   * @returns {Promise<void>} Промис, разрешаемый после попытки восстановления сессии.
   *
   * @example
   * await sessionStore.initialize();
   */
  async function fetchSession() {
    if (session.value?.isActive) {
      setInitialized();
      return;
    }

    if (session.value && !session.value.isActive) {
      logout();
      setInitialized();
      return;
    }

    if (!session.value) {
      try {
        isLoading.value = true;
        isAuthenticating.value = true;
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
        setInitialized();
      }
    } else {
      // Сессия была восстановлена из localStorage, но нужно проверить её на сервере
      try {
        await sessionApiService.getSession(); // просто проверка
      } catch {
        logout(); // если сервер отклонил — удаляем
      } finally {
        setInitialized();
      }
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
      isAuthenticating.value = true;
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
      isAuthenticating.value = false;
    }
  }

   /**
   * Обновляет access-токен с помощью refresh-токена.
   *
   * Устанавливает `isAuthenticating = true`, так как это часть поддержания сессии.
   * При неудаче — вызывает `logout()`.
   *
   * @throws Ошибка, если refresh не удался
   */
  async function refresh() {
    if (!session.value) throw new Error('No session to refresh');

    try {
      isAuthenticating.value = true;
      isRefreshing.value = true;

      const data = await sessionApiService.refresh(session.value.refreshToken);
      const parsed = sessionSchema.parse(data);
      session.value = session.value.withTokens(parsed.accessToken, parsed.expiresAt);
    } catch (err) {
      console.error('[SessionStore] Refresh failed:', err);
      logout();
      throw err;
    } finally {
      isAuthenticating.value = false;
      isRefreshing.value = false;
    }
  }

  /**
   * Выполняет выход пользователя из системы.
   *
   * Очищает сессию и сбрасывает все флаги, связанные с аутентификацией.
   */
  function logout() {
    session.value = null;
    error.value = null;
    isAuthenticating.value = false;
  }

  /**
   * Обновляет данные пользователя в текущей сессии.
   *
   * Полезно при обновлении профиля.
   */
  function updateUser(user: any) {
    if (session.value) {
      session.value = session.value.withUser(user);
    }
  }

  /**
   * Отмечает, что инициализация хранилища завершена.
   *
   * Должна вызываться один раз после всех начальных проверок (например, после `fetchSession`).
   */
  function setInitialized() {
    isInitialized.value = true;
  }

  /**
   * Асинхронная инициализация хранилища.
   *
   * Может включать:
   * - восстановление сессии из API
   * - проверку persisted state
   * - silent refresh
   *
   * @returns {Promise<void>}
   */
  async function initialize() {
    await fetchSession(); // Уже устанавливает isInitialized
  }

  /**
   * Устанавливает флаг аутентификации.
   */
  function setAuthenticating(value: boolean) {
    isAuthenticating.value = value;
  }

  return {
    // State
    session,
    isLoading,
    isAuthenticating,
    isRefreshing,
    isInitialized,
    error,

    // Actions
    setSession,
    fetchSession,
    login,
    refresh,
    logout,
    updateUser,
    setInitialized,
    initialize,
    setAuthenticating,
  };
}, { persist: {
    key: 'auth-session',
    storage: localStorage,
    // Сериализуем только нужные поля
    serializer: {
      serialize: (value) => JSON.stringify((value as any).session?.toJSON() ?? null),
      deserialize: (value) => {
        const saved = JSON.parse(value);
        if (!saved) return { session: null };

        // Восстанавливаем как полноценный объект Session
        const session = new Session({
          accessToken: saved.accessToken,
          refreshToken: saved.refreshToken,
          expiresAt: saved.expiresAt,
          user: saved.user,
        });

        return {
          session,
          isInitialized: false, // ← важно: нужно повторно проверить актуальность
          isLoading: false,
          isAuthenticating: false,
          isRefreshing: false,
          error: null,
        };
      },
    },
}});