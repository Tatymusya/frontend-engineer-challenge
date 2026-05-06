/**
 * Генерирует уникальный идентификатор.
 * Использует `crypto.randomUUID()` при его наличии (современные браузеры),
 * в противном случае применяет резервный механизм на основе времени и случайных чисел.
 * Подходит для использования как в браузере, так и в SSR-средах (например, Nuxt, Vue SSR).
 *
 * @returns Уникальная строка-идентификатор (например, '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' или 'id-1623456789012-abc123xyz')
 *
 * @example
 * const id = generateId(); // 'gen-a1b2c3d4'
 */
export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Резервный вариант для старых браузеров или сред без доступа к Web Crypto API
  return `id-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

/**
 * Генерирует уникальный идентификатор с указанным префиксом.
 * Использует `crypto.randomUUID()` при его наличии, иначе — резервный метод.
 * Полезно для создания читаемых ID, например: `user-...`, `field-...`, `modal-...`.
 *
 * @param prefix - Префикс для идентификатора. По умолчанию — `'id'`.
 * @returns Уникальная строка с префиксом (например, 'user-9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
 *
 * @example
 * const userId = generatePrefixedId('user'); // 'user-a1b2c3d4'
 * const fieldId = generatePrefixedId('field'); // 'field-b2c3e4f5'
 */
export const generatePrefixedId = (prefix: string = 'id'): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  // Резервный вариант для старых браузеров или SSR
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};