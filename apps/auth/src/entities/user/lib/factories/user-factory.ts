import type { IUserSchemaDto } from '@entities/user';
import { faker } from '@faker-js/faker';

// Фиксированная "сейчас" — должна совпадать с vitest.setup.ts
const NOW = new Date('2026-01-01T00:00:00.000Z').getTime();

/**
 * Возвращает ISO строку на N минут **до** NOW
 */
const minutesAgo = (minutes: number): string => {
  return new Date(NOW - minutes * 60 * 1000).toISOString();
};

// --------------------------
// Основная фабрика
// --------------------------

export const createUserDto = (overrides?: Partial<IUserSchemaDto>): IUserSchemaDto => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  firstName: null,
  lastName: null,
  phone: undefined,
  role: 'user' as const,
  createdAt: faker.date.past({ refDate: new Date(NOW) }).toISOString(),
  lastActiveAt: null,
  isEmailVerified: false,
  isAuthenticated: false,
  ...overrides,
});

// --------------------------
// Ролевые фабрики
// --------------------------

export const createAdminUserDto = (overrides?: Partial<IUserSchemaDto>): IUserSchemaDto =>
  createUserDto({ role: 'admin', ...overrides });

export const createModeratorUserDto = (overrides?: Partial<IUserSchemaDto>): IUserSchemaDto =>
  createUserDto({ role: 'moderator', ...overrides });

// --------------------------
// Активность
// --------------------------

export const createActiveUserDto = (overrides?: Partial<IUserSchemaDto>): IUserSchemaDto =>
  createUserDto({ lastActiveAt: minutesAgo(4), ...overrides });

export const createInactiveUserDto = (overrides?: Partial<IUserSchemaDto>): IUserSchemaDto =>
  createUserDto({ lastActiveAt: minutesAgo(25), ...overrides });

// --------------------------
// Имя
// --------------------------

export const createUserWithFullName = (
  firstName: string = faker.person.firstName(),
  lastName: string = faker.person.lastName(),
  overrides?: Partial<IUserSchemaDto>
): IUserSchemaDto =>
  createUserDto({ firstName, lastName, ...overrides });

// --------------------------
// Builder Pattern: buildUser()
// --------------------------

type UserBuilderOptions = Partial<IUserSchemaDto> & {
  active?: boolean;
  inactive?: boolean;
  verified?: boolean;
  unverified?: boolean;
};

export const buildUser = (options: UserBuilderOptions = {}) => {
  let user = createUserDto(options);

  // Роль
  if (options.role) user = { ...user, role: options.role };

  // Активность
  if (options.active) user = { ...user, lastActiveAt: minutesAgo(4) };
  if (options.inactive) user = { ...user, lastActiveAt: minutesAgo(25) };

  // Email
  if (options.verified) user = { ...user, isEmailVerified: true };
  if (options.unverified) user = { ...user, isEmailVerified: false };

  // Поля
  if (options.firstName || options.lastName) {
    user = { ...user, firstName: options.firstName ?? user.firstName, lastName: options.lastName ?? user.lastName };
  }

  return user;
};