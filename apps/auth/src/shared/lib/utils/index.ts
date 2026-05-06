/**
 * Централизованный экспорт всех вспомогательных функций (утилит).
 * Обеспечивает удобный доступ ко всем утилитам через одну точку входа.
 *
 * Используется для импорта вида:
 * @example
 * import { generateId, setToStorage, validateEmail } from '@shared/lib/utils';
 */

// Утилиты для генерации уникальных идентификаторов
export { generateId, generatePrefixedId } from '@shared/lib/utils/generate-id';

// Утилиты для преобразования времени
export { MS, toMs } from '@shared/lib/utils/time';

