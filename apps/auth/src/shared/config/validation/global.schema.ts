import { z } from 'zod';

/**
 * Глобальные схемы валидации.
 * Содержит базовые Zod-схемы, используемые для проверки структуры данных и ответов от API.
 */

/**
 * Базовая схема валидации ответа от сервера.
 * Определяет стандартную структуру API-ответа с флагом успеха и данными.
 *
 * @example
 * {
 *   success: true,
 *   data: {}
 * }
 */
export const baseResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({}),
});

/**
 * Тип, выведенный из схемы `baseResponseSchema`.
 * Используется для типизации объектов, соответствующих базовому формату ответа.
 */
export type BaseResponseFormData = z.infer<typeof baseResponseSchema>;