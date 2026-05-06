import { USER_API_ENDPOINTS } from '@entities/user/config/';
import { changePasswordSchema, userSchema } from '@entities/user/model/index';
import type { IChangePasswordData, IUserDto, IUserUpdateData } from '@entities/user/types/user.types';
import type { BaseResponseFormData } from '@shared/config';
import { apiService, baseResponseSchema } from '@shared/config';

  /**
   * Класс для работы с API пользователя.
   *
   * Предоставляет методы:
   * - получения данных
   * - обновления профиля
   * - смены пароля
   * - подтверждения email
   *
   */
class UserApiService {
  /**
   * Получить данные текущего пользователя.
   */
  async getCurrentUser(): Promise<IUserDto> {
    try {
      const outputValue = await apiService.get<IUserDto>(USER_API_ENDPOINTS.USER.CURRENT);
      return userSchema.parse(outputValue);
    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Обновить данные текущего пользователя.
   */
  async updateUser(updatedData: IUserUpdateData): Promise<IUserDto> {
    try {
      const inputValue = userSchema.parse(updatedData);
      const outputValue = await apiService.patch<IUserDto>(USER_API_ENDPOINTS.USER.UPDATE, inputValue);
      return userSchema.parse(outputValue);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Сменить пароль текущего пользователя.
   */
  async changePassword(data: IChangePasswordData): Promise<BaseResponseFormData> {
    try {
      const inputValue = changePasswordSchema.parse(data);
      const outputValue = await apiService.post(USER_API_ENDPOINTS.USER.CHANGE_PASSWORD, inputValue);
      return baseResponseSchema.parse(outputValue);
    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Запросить повторную отправку письма с подтверждением.
   */
  async resendVerificationEmail(): Promise<BaseResponseFormData> {
    try {
      const outputValue = await apiService.post(USER_API_ENDPOINTS.USER.RESEND_VERIFY_EMAIL);
      return baseResponseSchema.parse(outputValue);
    } catch (err) {
      console.error('Failed to resend verification email', err);
      throw err;
    }
  }

  /**
   * Подтвердить email по токену из ссылки.
   * 
   * Вызывается при переходе по ссылке: /verify-email?token=...
   */
  async verifyEmail(token: string): Promise<IUserDto> {
    try {
      const outputValue = await apiService.get<IUserDto>(`${USER_API_ENDPOINTS.USER.VERIFY_EMAIL_BY_LINK}?token=${encodeURIComponent(token)}`);
      return userSchema.parse(outputValue);
    } catch (err) {
      console.error('Failed to verify email', err);
      throw err;
    }
  }
}

// Создание единого экземпляра сервиса (синглтон)
export const userApiService = new UserApiService();