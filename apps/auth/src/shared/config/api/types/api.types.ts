/**
 * Типы ошибок, которые могут возникать на стороне клиента при взаимодействии с API.
 *
 * Используется для классификации ошибок и определения стратегии обработки
 * (например, повтор запроса, показ уведомления, логирование).
 */
export type AppErrorKind = 
  | 'canceled'     // Запрос отменен
  | 'http'     // Ошибка HTTP-ответа (например, 400, 500)
  | 'network'  // Сетевая ошибка (нет подключения, разрыв соединения)
  | 'timeout'  // Превышено время ожидания ответа от сервера
  | 'unknown'; // Неизвестная ошибка (не удалось определить тип)

/**
 * Интерфейс стандартной ошибки приложения.
 *
 * Абстрагирует различные виды ошибок (сетевые, HTTP, внутренние),
 * чтобы унифицировать их обработку на уровне UI и бизнес-логики.
 *
 * @example
 * ```ts
 * try {
 *   await api.get('/user');
 * } catch (error) {
 *   if (isAppError(error)) {
 *     switch (error.kind) {
 *       case 'network':
 *         toast.error('Нет подключения к интернету');
 *         break;
 *       case 'http':
 *         toast.error(`Ошибка: ${error.message}`);
 *         break;
 *     }
 *   }
 * }
 * ```
 */
export interface IAppError {
  /**
   * Категория ошибки. Определяет природу проблемы.
   */
  kind: AppErrorKind;

  /**
   * Человеко-читаемое сообщение об ошибке.
   * 
   * Может быть использовано напрямую в интерфейсе (например, в тостах).
   */
  message: string;

  /**
   * HTTP-статус, если ошибка связана с HTTP-запросом.
   * 
   * Пример: 401, 404, 500. Отсутствует у сетевых и таймаут-ошибок.
   */
  httpStatus?: number;

  /**
   * Исходная ошибка, вызвавшая данную ошибку («причина»).
   * 
   * Полезно для отладки и логирования.
   * Может содержать AxiosError, FetchError, Error и т.д.
   */
  cause?: unknown;
}


/**
 * Проверяет, является ли переданное значение экземпляром `IAppError`.
 *
 * Используется как type guard в условиях `try/catch` для безопасной
 * работы с неизвестными ошибками.
 *
 * @param value - Значение, которое нужно проверить
 * @returns `true`, если значение соответствует интерфейсу `IAppError`, иначе `false`
 *
 * @example
 * ```ts
 * if (isAppError(error)) {
 *   console.error(`[${error.kind}] ${error.message}`);
 * }
 * ```
 */
export function isAppError(value: unknown): value is IAppError {
  if (value && typeof value === 'object') {
    const candidate = value as Partial<IAppError>;
    return typeof candidate.kind === 'string' && typeof candidate.message === 'string';
  }

  return false;
}