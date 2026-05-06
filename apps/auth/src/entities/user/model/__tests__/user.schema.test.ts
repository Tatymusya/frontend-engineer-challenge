import { createUserDto } from '@entities/user/lib/factories/user-factory';
import type { IUserSchemaDto } from '@entities/user/model/user.schema';
import { userSchema } from '@entities/user/model/user.schema';
import { VALIDATION_MESSAGES } from '@shared/config/';
import { describe, expect, it } from 'vitest';

describe('userSchema', () => {
  const validDto = (): IUserSchemaDto => createUserDto();

  it('should validate a correct user DTO', () => {
    const input = validDto();
    const result = userSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('should accept null firstName and lastName', () => {
    const input = createUserDto({ firstName: null, lastName: null });
    const result = userSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('should accept undefined phone', () => {
    const input = createUserDto({ phone: undefined });
    const result = userSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('should accept null lastActiveAt', () => {
    const input = createUserDto({ lastActiveAt: null });
    const result = userSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const input = createUserDto({ email: 'invalid-email' });
    const result = userSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result?.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.stringContaining(VALIDATION_MESSAGES.INVALID_EMAIL),
        }),
      ])
    );
  });

  it('should reject invalid UUID', () => {
    const input = { ...createUserDto(), id: 'not-a-uuid' };
    const result = userSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result?.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.stringContaining(VALIDATION_MESSAGES.ID_CANNOT_BE_EMPTY),
        }),
      ])
    );
  });

  it('should reject unknown role', () => {
    const input = { ...createUserDto(), role: 'hacker' };
    const result = userSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result?.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.stringContaining(VALIDATION_MESSAGES.INVALID_ROLE_VALUE),
        }),
      ])
    );
  });

  it('should reject non-ISO createdAt', () => {
    const input = { ...createUserDto(), createdAt: '2024-01-01 10:00' };
    const result = userSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result?.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.stringContaining(VALIDATION_MESSAGES.MUST_BE_IN_ISO_FORMAT),
        }),
      ])
    );
  });

  it('should parse and return typed object', () => {
    const input = validDto();
    const parsed = userSchema.parse(input);
    expect(parsed).toEqual(input);
    // Проверка типа на уровне TS
    const _: IUserSchemaDto = parsed; // должно компилироваться
  });
});