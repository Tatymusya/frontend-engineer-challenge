import { USER_CONSTANTS } from '@entities/user/lib/user.constants';
import type { IUserDto, IUserUpdateData } from '@entities/user/types/user.types';

/**
 * Бизнес-сущность пользователя.
 *
 * Инкапсулирует данные и поведение пользователя в системе.
 * Предоставляет удобные методы для доступа к данным, проверки прав и определения статуса.
 *
 * @example
 * const user = new User(dto);
 * console.log(user.displayName); // "Иван Иванов"
 * console.log(user.isOnline);    // true
 */
export class User {
  private data: IUserDto;

  /**
   * Создаёт экземпляр пользователя на основе DTO от сервера.
   *
   * @param dto - Данные пользователя в формате, полученном от API
   */
  constructor(dto: IUserDto) {
    this.data = { ...dto };
  }

  // ========================
  // Геттеры
  // ========================

  /**
   * Уникальный идентификатор пользователя.
   *
   * Используется для ссылок, запросов и идентификации в системе.
   *
   */
  get id(): string {
    return this.data.id;
  }

  /**
   * Электронная почта пользователя.
   *
   * Уникальное значение, используется для входа, восстановления доступа и связи.
   *
   * @example "user@example.com"
   */
  get email(): string {
    return this.data.email;
  }

  /**
   * Имя пользователя.
   *
   * Может быть null, если не указано.
   *
   * @example "Иван"
   * @example null
   */
  get firstName(): string | null | undefined {
    return this.data.firstName;
  }

  /**
   * Фамилия пользователя.
   *
   * Может быть null, если не указана.
   *
   * @example "Иванов"
   * @example null
   */
  get lastName():  string | null | undefined {
    return this.data.lastName;
  }

  /**
   * Полное имя пользователя (имя + фамилия).
   *
   * Возвращает объединённые значения firstName и lastName через пробел.
   * Пропускает отсутствующие части (null/undefined).
   * Может вернуть пустую строку, если оба поля пустые.
   *
   * @example "Иван Иванов"
   * @example "Анна"
   * @example ""
   */
  get fullName(): string {
    return [this.firstName, this.lastName].filter(Boolean).join(' ');
  }

  /**
   * Отображаемое имя пользователя.
   *
   * Используется в интерфейсе. Если полное имя не указано — возвращает email.
   * Никогда не возвращает пустую строку.
   *
   * @example "Иван Иванов"
   * @example "user@example.com"
   */
  get displayName(): string {
    return this.fullName || this.email;
  }

  /**
   * Номер телефона пользователя в международном формате.
   *
   * Опционально. Может использоваться для связи или двухфакторной аутентификации.
   *
   * @example "+79991234567"
   * @example undefined
   */
  get phone(): string | undefined {
    return this.data.phone;
  }

  /**
   * Роль пользователя в системе.
   *
   * Определяет уровень доступа:
   * - 'user' — обычный пользователь
   * - 'moderator' — модератор (дополнительные права)
   * - 'admin' — администратор (полный доступ)
   *
   * @example "admin"
   */
  get role(): string {
    return this.data.role;
  }

  /**
   * Дата и время создания аккаунта.
   *
   * Преобразует ISO-строку из DTO в объект Date.
   *
   * @example new Date("2024-01-01T10:00:00.000Z")
   */
  get createdAt(): Date {
    return new Date(this.data.createdAt);
  }

  /**
   * Дата и время последней активности пользователя.
   *
   * Преобразует ISO-строку в объект Date.
   * Может быть null, если активность ещё не фиксировалась.
   *
   * @example new Date("2024-01-02T14:30:00.000Z")
   * @example null
   */
  get lastActiveAt(): Date | null {
    return this.data.lastActiveAt ? new Date(this.data.lastActiveAt) : null;
  }

  /**
   * Флаг подтверждения электронной почты.
   *
   * Показывает, прошёл ли пользователь верификацию email.
   * Некоторые функции могут быть недоступны до подтверждения.
   *
   * @example true
   */
  get isEmailVerified(): boolean {
    return this.data.isEmailVerified;
  }

  /**
   * Флаг авторизованного в системе пользователя.
   * 
   * @example true
   */
  get isAuthenticated(): boolean {
    if (this.data.isAuthenticated) {
      return true;
    }

    return false;
  }

  /**
 * Проверяет, требует ли пользователь подтверждения email.
 */
  get requiresEmailVerification(): boolean {
    return !this.isEmailVerified;
  }

  /**
   * Проверяет, является ли пользователь онлайн.
   *
   * Считается онлайн, если с последней активности прошло менее 5 минут.
   * Если активность не зафиксирована — возвращает false.
   *
   * @example true
   */
  get isOnline(): boolean {
    const now = Date.now();
    const lastActive = this.lastActiveAt?.getTime();
    if (!lastActive) return false;
    // активен < 5 мин
    return now - lastActive < USER_CONSTANTS.ONLINE_THRESHOLD_MS;
  }

  // ========================
  // Бизнес-методы
  // ========================

  /**
   * Обновляет данные пользователя.
   *
   * Применяет переданные поля к текущему состоянию.
   * Поддерживает частичное обновление (только указанные поля).
   *
   * @param data - Объект с полями для обновления
   *
   * @example
   * user.update({ firstName: "Петр", phone: "+79991234567" });
   */

  /**
   * Отмечает email как подтверждённый.
   * 
   * ВНИМАНИЕ: Это клиентское обновление. Сервер должен подтвердить.
  */
  verifyEmail(): void {
    this.data.isEmailVerified = true;
  }

  /**
   * Частичное обновление данных.
  */
  update(data: IUserUpdateData): void {
    Object.assign(this.data, data);
  }

  /**
   * Проверяет, является ли пользователь администратором.
   *
   * @returns true, если роль — 'admin'
   *
   * @example true
   */
  isAdmin(): boolean {
    return this.role === 'admin';
  }

  /**
   * Проверяет, является ли пользователь модератором.
   *
   * @returns true, если роль — 'moderator'
   *
   * @example true
   */
  isModerator(): boolean {
    return this.role === 'moderator';
  }

  /**
   * Проверяет, указан ли номер телефона у пользователя.
   *
   * @returns true, если поле phone заполнено
   *
   * @example true
   */
  hasPhone(): boolean {
    return !!this.phone;
  }

  // ========================
  // Преобразование
  // ========================

  /**
   * Преобразует экземпляр User в DTO.
   *
   * Возвращает копию исходных данных. Подходит для отправки на сервер
   * или передачи в другие слои приложения.
   *
   * @returns Копия данных пользователя в формате DTO
   */
  toDto(): IUserDto {
    return { ...this.data };
  }
}