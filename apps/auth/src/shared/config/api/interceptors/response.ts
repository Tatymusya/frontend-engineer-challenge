import { RESPONSE_STATUS } from '@shared/config/api/constants';
import { env } from '@shared/config/env';
import { sessionStorageService } from '@shared/lib/storage';
import type { AxiosError, AxiosResponse } from 'axios';

/**
 * Перехватчик входящих HTTP-ответов.
 * Обрабатывает успешные ответы и ошибки, централизует логирование и реакцию на стандартные статусы.
 */

/**
 * Объект перехватчика ответов Axios.
 * Содержит методы для обработки успешных и неудачных ответов от сервера.
 */
export const responseInterceptor = {
    /**
   * Вызывается при успешном получении ответа от сервера.
   * Логирует данные ответа в режиме отладки.
   *
   * @param response - Объект ответа Axios.
   * @returns Оригинальный ответ, передаваемый дальше по цепочке.
   */
  onFulfilled: (response: AxiosResponse) => {
    // Логируем успешные ответы в режиме отладки
    if (env.DEBUG) {
      console.info('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },

  /**
   * Вызывается при возникновении ошибки при выполнении запроса.
   * Обрабатывает сетевые ошибки, таймауты и HTTP-ошибки.
   *
   * @param error - Объект ошибки Axios.
   * @returns Отклонённый промис с ошибкой после её обработки.
   */
  onRejected: async (error: AxiosError) => {
    // Логируем ошибки в режиме отладки
    if (env.DEBUG) {
      console.error('API Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // Обработка HTTP-ответов с кодами ошибок
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case RESPONSE_STATUS.UNAUTHORIZED:
          // Обработка отсутствия авторизации — токен устарел или недействителен
          console.error('Ошибка авторизации — возможно, токен истёк');
          sessionStorageService.clearAuthData();
          // При необходимости можно перенаправить на страницу входа
          // window.location.href = '/login';
          break;

        case RESPONSE_STATUS.FORBIDDEN:
          // Доступ запрещён
          console.error('Доступ запрещён');
          break;

        case RESPONSE_STATUS.NOT_FOUND:
          // Ресурс не найден
          console.error('Запрашиваемый ресурс не найден');
          break;

        case RESPONSE_STATUS.SERVER_ERROR:
          // Внутренняя ошибка сервера
          console.error('Произошла ошибка на сервере');
          break;

        case RESPONSE_STATUS.GATEWAY_TIMEOUT:
          // Таймаут шлюза
          console.error('Превышено время ожидания ответа от сервера');
          break;
      }
    } else if (error.request) {
      // Запрос был отправлен, но ответ не получен (сетевая ошибка)
      console.error('Сервер не ответил на запрос');
    } else {
      // Ошибка при настройке запроса
      console.error('Ошибка при формировании запроса:', error.message);
    }

    // Передаём ошибку дальше по цепочке
    return Promise.reject(error);
  }
};