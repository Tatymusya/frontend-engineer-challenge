import { z } from 'zod';

/**
 * Единая точка доступа ко всем схемам валидации.
 * Экспортирует глобальные схемы и вспомогательные функции для проверки данных.
 * Позволяет импортировать всё необходимое для валидации из одного места.
 */

// Экспорт схем, связанных с аутентификацией
export * from '@shared/config/validation/global.schema';
export type { BaseResponseFormData } from '@shared/config/validation/global.schema';

/**
 * Функция для валидации данных по заданной Zod-схеме.
 * Безопасно проверяет структуру данных и возвращает результат с возможными ошибками.
 *
 * @template T - Ожидаемый тип данных, определённый схемой.
 * @param schema - Схема Zod, по которой будет проводиться валидация.
 * @param data - Данные, которые необходимо проверить (могут быть любого типа).
 * @returns Объект с флагом `success`, валидированными данными (`data`) или ошибками (`errors`).
 */
export const validateData = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: boolean; data?: T; errors?: z.ZodError } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
};
