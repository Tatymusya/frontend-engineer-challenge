import { SESSION_CONFIG } from '@entities/session/config/';
import { isAuthUser } from '@entities/session/types/session.types';
/**
 * Модель сессии пользователя.
 *
 * Инкапсулирует данные аутентификации и состояние сессии:
 * - токены доступа и обновления
 * - время истечения срока действия
 * - флаги активности
 * - связь с пользователем (любого типа)
 *
 * Создаётся на основе данных, полученных от сервера при входе или обновлении токена.
 *
 * @template User - Тип данных пользователя. По умолчанию `unknown`.
 *
 * @example
 * const session = new Session<IUserDto>({
 *   accessToken: 'jwt.access.token',
 *   refreshToken: 'jwt.refresh.token',
 *   expiresAt: Date.now() + 3600_000,
 *   user: { id: '1', email: 'user@example.com', role: 'user' }
 * });
 */
export class Session<User = unknown> {
  /**
   * Токен доступа (JWT).
   *
   * Используется для авторизации запросов к защищённым эндпоинтам.
   * Передаётся в заголовке `Authorization: Bearer <token>`.
   */
  readonly accessToken: string;

  /**
   * Токен обновления.
   *
   * Используется для получения нового `accessToken` после его истечения.
   * Хранится безопасно (например, в HTTP-only cookie или secure storage).
   */
  readonly refreshToken: string;

  /**
   * Время истечения срока действия access-токена (в миллисекундах).
   *
   * После этого времени сессия считается **неавторизованной**.
   * Необходимо вызвать `refresh()` или выполнить повторный вход.
   */
  readonly expiresAt: number;

  /**
   * Данные пользователя, связанные с сессией.
   *
   * Может быть `null`, если сессия создана, но пользователь ещё не загружен.
   * Обычно заполняется после входа или при восстановлении сессии.
   *
   * @example
   * if (session.user?.email) { ... }
   */
  readonly user: User | null;

  /**
   * Флаг: активна ли сессия.
   *
   * Сессия активна, если:
   * - есть `accessToken`
   * - `expiresAt > Date.now()`
   *
   * @readonly
   * @example
   * if (session.isActive) { ... }
   */
  get isActive(): boolean {
    return !!this.accessToken && this.expiresAt > Date.now();
  }

  /**
   * Флаг: требуется ли обновление токена.
   *
   * Возвращает `true`, если access-токен истёк или истекает в ближайшие 5 минут.
   *
   * @readonly
   * @example
   * if (session.needsRefresh) {
   *   await authService.refresh();
   * }
   */
  get needsRefresh(): boolean {
    return this.isActive && this.expiresAt - Date.now() < SESSION_CONFIG.SOON_TO_EXPIRE_MS;
  }

  /**
   * Создаёт экземпляр сессии.
   *
   * @param data - Данные для инициализации
   * @param data.accessToken - JWT access-токен
   * @param data.refreshToken - JWT refresh-токен
   * @param data.expiresAt - Время истечения (timestamp)
   * @param data.user - Данные пользователя (опционально)
   *
   * @example
   * new Session({ accessToken, refreshToken, expiresAt, user });
   */
  constructor(data: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    user?: User | null;
  }) {
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.expiresAt = data.expiresAt;
    this.user = data.user ?? null;
  }

  /**
   * Возвращает копию сессии с обновлённым пользователем.
   *
   * Используется при обновлении профиля или загрузке данных.
   *
   * @param user - Новые данные пользователя
   * @returns Новая сессия
   *
   * @example
   * const updatedSession = session.withUser(updatedUser);
   */
  withUser(user: User): Session<User> {
    return new Session<User>({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      expiresAt: this.expiresAt,
      user,
    });
  }

  /**
   * Возвращает копию сессии с обновлёнными токенами.
   *
   * Используется после успешного `refresh`.
   *
   * @param accessToken - Новый access-токен
   * @param expiresAt - Новое время истечения
   * @returns Новая сессия
   *
   * @example
   * const refreshedSession = session.withTokens(newToken, newExpiresAt);
   */
  withTokens(accessToken: string, expiresAt: number): Session<User> {
    return new Session<User>({
      accessToken,
      refreshToken: this.refreshToken,
      expiresAt,
      user: this.user,
    });
  }

  /**
   * Проверяет, принадлежит ли сессия пользователю с указанной ролью.
   *
   * Предполагается, что `User` имеет поле `role: string`.
   * Если структура отличается — метод может не работать.
   *
   * @param role - Роль для проверки
   * @returns `true`, если пользователь существует и имеет роль
   *
   * @example
   * if (session.hasRole('admin')) { ... }
   */
  hasRole(role: string): boolean {
    return isAuthUser(this.user) && this.user.role === role;
  }

  /**
   * Преобразует сессию в объект для сериализации (например, в localStorage).
   *
   * @returns Простой объект без методов
   *
   * @example
   * const plain = session.toJSON();
   * localStorage.setItem('session', JSON.stringify(plain));
   */
  toJSON() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      expiresAt: this.expiresAt,
      user: this.user,
    };
  }
}