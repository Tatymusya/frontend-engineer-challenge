/**
 * Централизованный экспорт всех общих библиотечных модулей.
 * Обеспечивает единый путь импорта для утилит, типов, сервисов хранения и других вспомогательных средств.
 *
 * Используется для импортов вида:
 * @example
 * import { generateId, formatCurrency } from '@shared/lib/utils';
 * import { IAppError, IErrorType } from '@shared/lib/types';
 * import { sessionStorageService } from '@shared/lib/storage';
 *
 * // Или полный импорт (если нужно)
 * import * as SharedLib from '@shared/lib';
 */

// === Типы и интерфейсы ===
export { IStorageData, IStorageKeys } from '@shared/lib/storage';
export { ErrorLevel, IAppError, IErrorHandlerOptions, IErrorType } from '@shared/lib/types';

// === Утилиты (функции) ===
export {
    isError
} from '@shared/lib/types/type-guards';
export { generateId, generatePrefixedId, MS, toMs } from '@shared/lib/utils/';

// === Сервисы хранения данных ===
export {
    sessionStorageService
} from '@shared/lib/storage';

