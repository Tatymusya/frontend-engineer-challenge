import { User } from '@entities/user/model/user.model';
import { userSchema } from '@entities/user/model/user.schema';
import { userApiService } from '@entities/user/services/user-api.service';
import type { IChangePasswordData, IUserDto, IUserUpdateData } from '@entities/user/types/user.types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const lastActivity = ref<number | null>(null);
  const isAuthenticated = ref<boolean>(false);

  
  /**
   * Устанавливает пользователя из DTO.
   */
  function setUser(dto: IUserDto) {
    try {
      const parsedDto = userSchema.parse(dto);
      user.value = new User(parsedDto);
    } catch(err) {
      console.error('Invalid user DTO', err);
    }
  }

  /**
   * Обновляет данные текущего пользователя.
   */
  async function updateUser(dto: Partial<IUserUpdateData>): Promise<void> {
    if (!user.value) return;

    try {
      const response = await userApiService.updateUser(dto);

      user.value.update(response);
    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Повторно отправляет письмо с подтверждением email.
   */
  async function resendVerificationEmail(): Promise<void> {
    if (!user.value) return;

    try {
      await userApiService.resendVerificationEmail();
      // Можно добавить уведомление
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Обновляет пароль текущего пользователя.
   */
  async function changePassword(data: IChangePasswordData): Promise<void> {
    if (!user.value) return;

    try {
      await userApiService.changePassword(data);
    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Подтверждает email по токену.
   * 
   * Вызывается при загрузке страницы /verify-email?token=...
   */
  async function verifyEmail(token: string): Promise<void> {
    try {
      const dto = await userApiService.verifyEmail(token);
      setUser(dto); // полное обновление
    } catch (err) {
      console.error('Email verification failed', err);
      throw err;
    }
  }

  /**
   * Очищает данные пользователя (выход).
   */
  function clearUser() {
    user.value = null;
    lastActivity.value = null;
  }

  return {
    user,
    isAuthenticated,
    setUser,
    clearUser,
    updateUser,
    changePassword,
    resendVerificationEmail,
    verifyEmail,
  }
}, {
  persist: true,
});
