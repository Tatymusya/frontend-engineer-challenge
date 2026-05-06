import { SESSION_API_ENDPOINTS } from '@entities/session/config/session.config';
import type { SessionSchema } from '@entities/session/model/session.schema';
import { apiService } from '@shared/config';

/**
 * Сервис для работы с API сессий.
 *
 * Предоставляет методы для аутентификации, управления сессией и подтверждения электронной почты.
 * Основан на базовом `apiService`, расширяя его специфичными эндпоинтами для работы с авторизацией.
 *
 * @example
 * const session = await sessionApiService.getSession();
 */
class SessionApiService {
  /**
   * Получает данные текущей активной сессии пользователя.
   *
   * Запрос отправляется на сервер для проверки наличия и валидности сессии.
   * В случае успеха возвращается объект с информацией о пользователе и токенах.
   *
   * @returns Промис, который разрешается данными сессии {@link SessionSchema}.
   */
  getSession(): Promise<SessionSchema> {
    return apiService.get(SESSION_API_ENDPOINTS.SESSION.CURRENT);
  }

 /**
   * Выполняет вход пользователя по email и паролю.
   *
   * Отправляет учётные данные на сервер для аутентификации.
   * При успешной авторизации возвращается новая сессия с токенами.
   *
   * @param credentials - Объект, содержащий email и пароль пользователя.
   * @param credentials.email - Адрес электронной почты пользователя.
   * @param credentials.password - Пароль пользователя.
   * @returns Промис, который разрешается данными сессии {@link SessionSchema}.
   */
  login(credentials: { email: string; password: string }): Promise<SessionSchema> {
    return apiService.post(SESSION_API_ENDPOINTS.SESSION.AUTH, credentials);
  }

   /**
   * Обновляет токены аутентификации с использованием refresh-токена.
   *
   * Используется для продления срока действия сессии без повторного ввода логина и пароля.
   *
   * @param refreshToken - Токен обновления, полученный при предыдущей авторизации.
   * @returns Промис, который разрешается новыми данными сессии {@link SessionSchema}.
   */
  refresh(refreshToken: string): Promise<SessionSchema> {
    return apiService.post(SESSION_API_ENDPOINTS.SESSION.REFRESH, { refreshToken });
  }

  /**
   * Выполняет выход пользователя из системы.
   *
   * Инвалидирует текущую сессию на сервере, делая токены недействительными.
   *
   * @returns Промис, который разрешается после успешного завершения сессии.
   */
  logout(): Promise<void> {
    return apiService.post(SESSION_API_ENDPOINTS.SESSION.LOGOUT);
  }

  /**
   * Подтверждает адрес электронной почты пользователя по токену.
   *
   * Используется при регистрации для подтверждения владения email.
   *
   * @param token - Токен подтверждения, отправленный на почту.
   * @returns Промис, который разрешается объектом с флагом успешности операции.
   */
  verifyEmail(token: string): Promise<{ success: boolean }> {
    return apiService.post(SESSION_API_ENDPOINTS.SESSION.VERIFY_EMAIL, { token });
  }

  /**
   * Повторно отправляет письмо с ссылкой для подтверждения email.
   *
   * Полезно, если письмо не пришло или срок действия ссылки истёк.
   *
   * @returns Промис, который разрешается объектом с флагом успешности отправки.
   */
  resendVerificationEmail(): Promise<{ success: boolean }> {
    return apiService.post(SESSION_API_ENDPOINTS.SESSION.RESEND_VERIFY_EMAIL);
  }
}

/**
 * Единый экземпляр сервиса для работы с API сессий.
 *
 * Используется для централизованного доступа к методам аутентификации и управления сессией.
 */
export const sessionApiService = new SessionApiService();