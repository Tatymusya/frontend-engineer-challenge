import { userApiService } from '@entities/user/services/user-api.service';
import { expect, test } from 'vitest';

// --------------------------
// Тесты
// --------------------------

test('getCurrentUser: возвращает пользователя', async () => {
  const result = await userApiService.getCurrentUser();

  expect(result).toEqual(expect.objectContaining({
    email: expect.any(String),
    firstName: 'Тест',
  }));
});

test('updateUser: обновляет данные', async () => {
  const input = { firstName: 'Новое имя' };
  const result = await userApiService.updateUser(input);

  expect(result.firstName).toBe('Новое имя');
  expect(result.lastActiveAt).toBeDefined();
});

test('changePassword: успешная смена', async () => {
  const result = await userApiService.changePassword({
    currentPassword: 'old123',
    newPassword: 'new456',
    confirmPassword: 'new456',
  });

  expect(result.success).toBe(true);
});

test('changePassword: ошибка при неверном пароле', async () => {
  await expect(
    userApiService.changePassword({
      currentPassword: 'wrong',
      newPassword: 'new456',
      confirmPassword: 'new456',
    })
  ).rejects.toThrow();
});

test('verifyEmail: подтверждает email', async () => {
  const result = await userApiService.verifyEmail('valid-token');

  expect(result.isEmailVerified).toBe(true);
  expect(result.firstName).toBe('Верифицированный');
});

test('verifyEmail: возвращает админа', async () => {
  const result = await userApiService.verifyEmail('admin-token');

  expect(result.role).toBe('admin');
});