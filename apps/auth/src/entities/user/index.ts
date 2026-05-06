/**
 * Единая точка входа для сущности "Пользователь".
 *
 * Предоставляет стабильный публичный API для других слоёв приложения:
 * - бизнес-модель (`User`)
 * - типы данных (`IUserDto`, `IUserUpdateData`)
 * - константы и роли (`USER_ROLES`, `USER_CONSTANTS`)
 * - эндпоинты API (`USER_API_ENDPOINTS`)
 * - хранилище состояния (`useUserStore`)
 * - сервисы и схемы валидации
 *
 * Является фасадом сущности. Все внешние импорты из `@entities/user` должны идти через этот файл.
 *
 *
 * @example
 * import { User, IUserDto, useUserStore } from '@entities/user';
 */
export {
  /**
   * Бизнес-модель пользователя.
   *
   * Инкапсулирует данные и поведение пользователя:
   * - формирование полного имени
   * - проверка прав доступа
   * - определение статуса активности
   * - методы обновления и сериализации
   *
   * Создаётся на основе DTO, полученного от сервера.
   *
   * @see IUserDto
   * @example
   * const user = new User(dto);
   * console.log(user.fullName); // "Иван Иванов"
   */
  User
} from '@entities/user/model/user.model';

export {

  /**
   * Интерфейс для смены пароля.
   *
   * Содержит текущий и новый пароли, а также подтверждение.
   * Используется в форме смены пароля.
   *
   * @example
   * await userApiService.changePassword({
   *   currentPassword: 'old123',
   *   newPassword: 'new456',
   *   confirmPassword: 'new456',
   * });
   */
  IChangePasswordData,
  /**
   * DTO пользователя — объект данных, полученный от сервера.
   *
   * Содержит все поля, возвращаемые API:
   * - id, email, имя, фамилия
   * - роль, дата создания, последняя активность
   * - статус подтверждения email
   *
   * Используется для инициализации экземпляра {@link User}.
   *
   * @example
   * const dto: IUserDto = await apiService.get('/api/user');
   * const user = new User(dto);
   */
  IUserDto,

  /**
   * Интерфейс для частичного обновления данных пользователя.
   *
   * Все поля необязательные — соответствует PATCH-запросу.
   * Позволяет обновить только нужные поля.
   *
   * @example
   * await userApiService.updateUser({ firstName: 'Новое имя' });
   */
  IUserUpdateData,
  /**
   * Константы ролей пользователя.
   *
   * Строковые значения ролей, используемые в системе.
   * Помогает избежать опечаток при сравнении.
   *
   * @example
   * if (user.role === USER_ROLES.ADMIN) { ... }
   */
  USER_ROLES,

  /**
   * Массив всех допустимых ролей.
   *
   * Полезен для валидации входных данных.
   *
   * @example
   * if (USER_ROLES_LIST.includes(inputRole)) { ... }
   */
  USER_ROLES_LIST,

  /**
   * Тип роли пользователя.
   *
   * Допустимые значения: `'user' | 'moderator' | 'admin'`.
   * Используется для типизации и проверки прав доступа.
   *
   * @example
   * function hasAccess(role: UserRole): boolean {
   *   return role === 'admin' || role === 'moderator';
   * }
   */
  UserRole
} from '@entities/user/types/user.types';

export {
  /**
   * Глобальные константы, связанные с пользователем.
   *
   * Включает пороги времени (например, "онлайн" при активности < 5 минут),
   * значения по умолчанию, лимиты и другие неизменяемые параметры.
   *
   * @example
   * const isOnline = Date.now() - user.lastActiveAt < USER_CONSTANTS.ONLINE_THRESHOLD_MS;
   */
  USER_CONSTANTS
} from '@entities/user/lib/user.constants';

export {
  /**
   * Эндпоинты API, связанные с пользователем.
   *
   * Централизованное хранение путей для HTTP-запросов:
   * - получение текущего пользователя
   * - обновление профиля
   * - смена пароля
   * - подтверждение email
   *
   * @example
   * await apiService.get(USER_API_ENDPOINTS.USER.CURRENT);
   */
  USER_API_ENDPOINTS
} from '@entities/user/config/';

export {

  /**
   * Схема валидации данных для смены пароля (Zod).
   *
   * Проверяет соответствие нового пароля требованиям системы.
   *
   * @see IChangePasswordData
   * @example
   * const validated = changePasswordSchema.parse(formData);
   */
  changePasswordSchema,
  /**
   * Схема валидации данных пользователя (Zod).
   *
   * Используется для парсинга и проверки DTO, полученных от сервера.
   *
   * @see IUserDto
   * @example
   * const parsed = userSchema.parse(response);
   */
  userSchema
} from '@entities/user/model/';

export type {
  /**
   * Тип DTO пользователя после валидации Zod-схемой.
   *
   * Соответствует {@link IUserDto}, но с учётом преобразований схемы.
   */
  IUserSchemaDto,

  /**
   * Тип данных формы смены пароля после валидации.
   *
   * Проверяет совпадение паролей, длину и безопасность.
   */
  IUserSchemaDtoChangePassword
} from '@entities/user/model/user.schema';

export {
  /**
   * Хранилище состояния пользователя (Pinia store).
   *
   * Управляет:
   * - текущим пользователем
   * - его данными
   * - методами загрузки, обновления, выхода
   *
   * Является единственной точкой изменения состояния пользователя.
   *
   * @example
   * const userStore = useUserStore();
   * await userStore.fetchUser();
   * console.log(userStore.user?.email);
   */
  useUserStore
} from '@entities/user/model/';

export {
  /**
   * Сервис для работы с API пользователя.
   *
   * Предоставляет методы:
   * - получения данных
   * - обновления профиля
   * - смены пароля
   * - подтверждения email
   *
   * Является синглтоном. Не должен вызываться напрямую — используй {@link useUserStore}.
   *
   * @example
   * const dto = await userApiService.getCurrentUser();
   */
  userApiService
} from '@entities/user/services/';
