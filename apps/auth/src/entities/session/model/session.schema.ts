import type { IAuthUser } from '@entities/session/types/session.types';
import { z } from 'zod';

/**
 * Zod-схема для валидации данных пользователя в сессии.
 *
 * Определяет структуру и типы полей, ожидаемых от сервера при получении информации о пользователе.
 * Используется для безопасного парсинга ответов API, предотвращая попадание некорректных данных в приложение.
 *
 * Поддерживает необязательные и опциональные поля, такие как имя, фамилия и время последней активности.
 *
 * @example
 * const user = userSchema.parse(userData);
 */
const userSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  role: z.string(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  isEmailVerified: z.boolean().optional(),
  lastActiveAt: z.union([z.string(), z.number()]).nullable().optional(),
}) satisfies z.ZodType<IAuthUser>;

/**
 * Zod-схема данных сессии.
 *
 * Валидирует:
 * - токены
 * - время истечения
 * - данные пользователя
 */
export const sessionSchema = z.object({
  accessToken: z.string().min(1, 'Access token required'),
  refreshToken: z.string().min(1, 'Refresh token required'),
  expiresAt: z.number().int().positive('ExpiresAt must be a positive timestamp'),
  user: userSchema.nullable().optional(),
});

/**
 * TypeScript-тип, автоматически выведенный из `sessionSchema`.
 *
 * Соответствует интерфейсу `ISessionData`, но гарантируется схемой валидации.
 * Используется для типизации данных сессии в хранилище и сервисах.
 *
 * @typedef {Object} SessionSchema
 * @property {string} accessToken - Токен доступа
 * @property {string} refreshToken - Токен обновления
 * @property {number} expiresAt - Время истечения срока действия access-токена
 * @property {IAuthUser | null | undefined} user - Данные пользователя
 */
export type SessionSchema = z.infer<typeof sessionSchema>;