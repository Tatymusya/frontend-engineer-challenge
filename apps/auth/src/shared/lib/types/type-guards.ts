/**
 * Утилиты для проверки типов (type guards).
 * Позволяют безопасно определять тип значения во время выполнения.
 * Используются для узкого преобразования `unknown` в конкретные типы, особенно при обработке ошибок.
 */

/**
 * Проверяет, является ли значение экземпляром класса `Error`.
 *
 * @param value - Значение, тип которого нужно проверить.
 * @returns `true`, если значение — это экземпляр `Error`, иначе `false`.
 *
 * @example
 * if (isError(err)) {
 *   console.error('Ошибка:', err.message);
 * }
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}