import { USER_ROLES_LIST } from '@entities/user/types/user.types';
import { VALIDATION_LIMITS, VALIDATION_MESSAGES, VALIDATION_VERIFICATION_PATTERNS } from '@shared/config';
import { z } from 'zod';

/**
 * Схема валидации данных пользователя (IUserDto).
 *
 * Используется для безопасного парсинга данных, приходящих с сервера.
 * Гарантирует, что объект соответствует ожидаемой структуре.
 */
export const userSchema = z.object({
  id: z
  .uuid(
    {
      message: VALIDATION_MESSAGES.ID_CANNOT_BE_EMPTY
    }
  ),
  email: z.email(
    {
      message: VALIDATION_MESSAGES.INVALID_EMAIL
    }
  ),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  phone: z.string().optional(),
  role: z.enum(
    USER_ROLES_LIST,
    {
      message: VALIDATION_MESSAGES.INVALID_ROLE_VALUE
    }
  ),
  createdAt: z.iso
  .datetime(
    {
      message: VALIDATION_MESSAGES.MUST_BE_IN_ISO_FORMAT
    }
  ),
  lastActiveAt: z.iso.datetime().nullable().optional(),
  isEmailVerified: z.boolean(),
  isAuthenticated: z.boolean().default(false),
});

export const changePasswordSchema = z.object({
  password: z
  .string()
  .min(
    VALIDATION_LIMITS.MIN_PASSWORD_LENGTH,
    { message: VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH(VALIDATION_LIMITS.MIN_PASSWORD_LENGTH)}
  )
  .max(
    VALIDATION_LIMITS.MAX_PASSWORD_LENGTH,
    { message: VALIDATION_MESSAGES.PASSWORD_MAX_LENGTH(VALIDATION_LIMITS.MAX_PASSWORD_LENGTH)}
  ),
  newPassword: z
  .string()
  .min(
    VALIDATION_LIMITS.MIN_PASSWORD_LENGTH,
    { message: VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH(VALIDATION_LIMITS.MIN_PASSWORD_LENGTH)}
  )
  .max(
    VALIDATION_LIMITS.MAX_PASSWORD_LENGTH,
    { message: VALIDATION_MESSAGES.PASSWORD_MAX_LENGTH(VALIDATION_LIMITS.MAX_PASSWORD_LENGTH)}
  )
  .regex(
    VALIDATION_VERIFICATION_PATTERNS.PASSWORD_VERIFICATION_PATTERN,
    { message: VALIDATION_MESSAGES.INVALID_PASSWORD }
  ),
  confirmNewPassword: z
  .string()
  .min(
    VALIDATION_LIMITS.MIN_PASSWORD_LENGTH,
    { message: VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH(VALIDATION_LIMITS.MIN_PASSWORD_LENGTH)}
  )
  .max(
    VALIDATION_LIMITS.MAX_PASSWORD_LENGTH,
    { message: VALIDATION_MESSAGES.PASSWORD_MAX_LENGTH(VALIDATION_LIMITS.MAX_PASSWORD_LENGTH)}
  )
  .regex(
    VALIDATION_VERIFICATION_PATTERNS.PASSWORD_VERIFICATION_PATTERN,
    { message: VALIDATION_MESSAGES.INVALID_PASSWORD }
  ),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: VALIDATION_MESSAGES.PASSWORDS_MISMATCH,
  path: ["confirmNewPassword"],
});

/**
 * Тип, выведенный из схемы.
 * Полностью соответствует IUserDto.
 */
export type IUserSchemaDto = z.infer<typeof userSchema>;
export type IUserSchemaDtoChangePassword = z.infer<typeof changePasswordSchema>;