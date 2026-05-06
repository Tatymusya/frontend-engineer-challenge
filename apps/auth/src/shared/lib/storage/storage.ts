import type { IStorageKeys } from '@shared/lib/storage/types';

/**
 * Сервис для работы с `sessionStorage`.
 * Предоставляет типобезопасный, централизованный и безопасный интерфейс для хранения и извлечения данных.
 * Реализован как синглтон — гарантирует один экземпляр на всё приложение.
 *
 * Поддерживает:
 * - Работу только в браузере (автоматическая проверка).
 * - Хранение любых сериализуемых значений через JSON.
 * - Методы для управления аутентификационными токенами.
 * - Защиту от ошибок при недоступности хранилища.
 */
class SessionStorageService {
  private static instance: SessionStorageService;

  /**
   * Флаг, указывающий, доступна ли среда браузера и `sessionStorage`.
   * Используется для защиты от ошибок в SSR (например, Nuxt, SSR-рендеринге).
   */
  readonly isBrowser: boolean;

  /**
   * Объект с ключами, используемыми в `sessionStorage`.
   * Централизует управление ключами и предотвращает дублирование строк.
   */
  private readonly keys: IStorageKeys = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_PREFERENCES: 'user_preferences',
  };

  constructor() {
    this.isBrowser = typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
  }

  /**
   * Возвращает единственный экземпляр сервиса (паттерн Singleton).
   * Гарантирует, что во всём приложении используется один и тот же экземпляр.
   *
   * @returns Экземпляр `SessionStorageService`.
   *
   * @example
   * const storage = SessionStorageService.getInstance();
   */
  public static getInstance(): SessionStorageService {
    if (!SessionStorageService.instance) {
      SessionStorageService.instance = new SessionStorageService();
    }
    return SessionStorageService.instance;
  }

  /**
   * Проверяет, доступен ли `sessionStorage` в текущей среде.
   *
   * @returns `true`, если `sessionStorage` доступен, иначе `false`.
   */
  private isStorageAvailable(): boolean {
    return this.isBrowser;
  }

  /**
   * Сохраняет значение в `sessionStorage` под указанным ключом.
   * Значение автоматически сериализуется в JSON.
   *
   * @param key - Ключ для хранения.
   * @param value - Значение любого типа, поддерживаемого `JSON.stringify`.
   *
   * @example
   * sessionStorageService.setItem('theme', 'dark');
   */
  setItem<T>(key: string, value: T): void {
    try {
      if (!this.isStorageAvailable()) return;
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Ошибка при сохранении элемента ${key} в sessionStorage:`, error);
    }
  }

  /**
   * Получает значение из `sessionStorage` по ключу.
   * Автоматически десериализует JSON.
   *
   * @param key - Ключ, по которому извлекается значение.
   * @returns Значение типа `T` или `null`, если ключ не найден или произошла ошибка.
   *
   * @example
   * const theme = sessionStorageService.getItem<string>('theme');
   */
  getItem<T>(key: string): T | null {
    try {
      if (!this.isStorageAvailable()) return null;
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Ошибка при получении элемента ${key} из sessionStorage:`, error);
      return null;
    }
  }

  /**
   * Удаляет элемент из `sessionStorage` по ключу.
   *
   * @param key - Ключ удаляемого элемента.
   *
   * @example
   * sessionStorageService.removeItem('theme');
   */
  removeItem(key: string): void {
    try {
      if (!this.isStorageAvailable()) return;
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Ошибка при удалении элемента ${key} из sessionStorage:`, error);
    }
  }

  /**
   * Очищает всё содержимое `sessionStorage`.
   * Полезно при выходе пользователя из системы.
   *
   * @example
   * sessionStorageService.clear();
   */
  clear(): void {
    try {
      if (!this.isStorageAvailable()) return;
      sessionStorage.clear();
    } catch (error) {
      console.error('Ошибка при очистке sessionStorage:', error);
    }
  }

  /**
   * Получает текущий access-токен.
   *
   * @returns Строка с токеном или `null`, если токен отсутствует.
   */
  getAccessToken(): string | null {
    return this.getItem<string>(this.keys.ACCESS_TOKEN);
  }

  /**
   * Сохраняет access-токен в `sessionStorage`.
   *
   * @param token - Строка с токеном.
   */
  setAccessToken(token: string): void {
    this.setItem(this.keys.ACCESS_TOKEN, token);
  }

  /**
   * Удаляет access-токен из `sessionStorage`.
   */
  removeAccessToken(): void {
    this.removeItem(this.keys.ACCESS_TOKEN);
  }

  /**
   * Получает refresh-токен.
   *
   * @returns Строка с токеном или `null`.
   */
  getRefreshToken(): string | null {
    return this.getItem<string>(this.keys.REFRESH_TOKEN);
  }

  /**
   * Сохраняет refresh-токен.
   *
   * @param token - Строка с токеном.
   */
  setRefreshToken(token: string): void {
    this.setItem(this.keys.REFRESH_TOKEN, token);
  }

  /**
   * Удаляет refresh-токен.
   */
  removeRefreshToken(): void {
    this.removeItem(this.keys.REFRESH_TOKEN);
  }

  /**
   * Удаляет все аутентификационные данные (access и refresh токены).
   * Вызывается при выходе пользователя.
   *
   * @example
   * sessionStorageService.clearAuthData();
   */
  clearAuthData(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  /**
   * Возвращает копию объекта с ключами хранилища.
   * Полезно для внешнего использования без прямого доступа к приватным полям.
   *
   * @returns Объект типа `IStorageKeys`.
   */
  getKeys(): IStorageKeys {
    return { ...this.keys };
  }
}

/**
 * Единая точка доступа к сервису `sessionStorage`.
 * Используйте этот экземпляр во всём приложении.
 *
 * @example
 * sessionStorageService.setAccessToken('abc123');
 * const token = sessionStorageService.getAccessToken();
 */
export const sessionStorageService = SessionStorageService.getInstance();