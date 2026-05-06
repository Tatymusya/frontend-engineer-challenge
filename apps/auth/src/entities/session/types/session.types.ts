/**
 * Базовый интерфейс пользователя, который может быть связан с сессией.
 *
 * Определяет минимальный контракт для объекта `user` в сессии.
 * Позволяет использовать `hasRole`, `hasPermission` и другие методы,
 * не завися от конкретной реализации сущности (например, `@entities/user`).
 *
 * @example
 * const session = new Session<IAuthUser>({ ... });
 */
export interface IAuthUser {
  /**
   * Уникальный идентификатор пользователя.
   */
  id: string;

  /**
   * Email пользователя — используется для авторизации и восстановления.
   */
  email: string;

  /**
   * Роль пользователя в системе.
   *
   * Определяет уровень доступа.
   * Допустимые значения: `'user' | 'moderator' | 'admin'`.
   */
  role: string;

  /**
   * Имя пользователя (опционально).
   */
  firstName?: string | null;

  /**
   * Фамилия пользователя (опционально).
   */
  lastName?: string | null;

  /**
   * Флаг: подтверждён ли email.
   *
   * Влияет на доступ к функциям.
   */
  isEmailVerified?: boolean;

  /**
   * Время последней активности (ISO строка или timestamp).
   */
  lastActiveAt?: string | number | null;
}

/**
 * Общий тип данных сессии.
 *
 * Используется для:
 * - сериализации/десериализации (localStorage, cookies)
 * - передачи между слоями
 * - типизации API-ответов
 *
 * @template User - Тип данных пользователя. По умолчанию `IAuthUser`.
 */
export interface ISessionData<User = IAuthUser> {
  /**
   * Токен доступа (JWT).
   *
   * Передаётся в заголовке `Authorization: Bearer <token>`.
   */
  accessToken: string;

  /**
   * Токен обновления.
   *
   * Хранится безопасно (HTTP-only cookie, secure storage).
   */
  refreshToken: string;

  /**
   * Время истечения access-токена (в миллисекундах).
   *
   * После этого времени требуется обновление или повторный вход.
   */
  expiresAt: number;

  /**
   * Данные пользователя.
   *
   * Может быть `null`, если пользователь ещё не загружен.
   */
  user: User | null;
}

/**
 * Тип результата `session.toJSON()`.
 *
 * Представляет собой "голый" объект без методов — пригоден для `JSON.stringify`.
 */
export type SessionPlainObject<User = IAuthUser> = ISessionData<User>;

/**
 * Функция-предикат для проверки, имеет ли объект поле `role`.
 *
 * Используется в `Session.hasRole()` для безопасной проверки.
 */
export function isAuthUser(user: unknown): user is IAuthUser {
  return (
    typeof user === 'object' &&
    user !== null &&
    'id' in user &&
    'email' in user &&
    'role' in user &&
    typeof (user as any).id === 'string' &&
    typeof (user as any).email === 'string' &&
    typeof (user as any).role === 'string'
  );
}