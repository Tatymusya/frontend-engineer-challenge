import { sessionStorageService } from '@shared/lib/storage';
import type { InternalAxiosRequestConfig } from 'axios';
import { env } from '@shared/config/env';
import { API_ENDPOINTS, HTTP_METHODS } from '@shared/config/api/';
/**
 * Перехватчик исходящих HTTP-запросов.
 * Добавляет авторизационные заголовки, предотвращает кэширование и устанавливает служебные заголовки.
 */

/**
 * Функция для получения токена доступа из хранилища.
 * Проверяет наличие токена в сервисе сессионного хранилища.
 *
 * @returns Строка с токеном (Bearer) или null, если токен отсутствует.
 */
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const accessToken = sessionStorageService.getAccessToken();
    return accessToken;
  }
  return null;
};

/**
 * Объект перехватчика запросов Axios.
 * Содержит методы, вызываемые перед отправкой запроса и при возникновении ошибки.
 */
export const requestInterceptor = {
  onFulfilled: (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    // Добавляем заголовок Authorization, если есть токен и это не публичные эндпоинты
    if (token 
        && config.url !== API_ENDPOINTS.AUTH.LOGIN
        && config.url !== API_ENDPOINTS.AUTH.REGISTER
        && !config.url?.includes(API_ENDPOINTS.AUTH.LOGOUT)
      ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Добавляем служебные заголовки
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['X-Client-Version'] = env.APP_VERSION;
    
    // Добавляем временну́ю метку (_t) для GET-запросов, чтобы отключить кэширование
    if (config.method?.toUpperCase() === HTTP_METHODS.GET && config.params) {
      config.params._t = Date.now();
    } else if (config.method?.toUpperCase() === HTTP_METHODS.GET) {
      config.params = { _t: Date.now() };
    }

    return config;
  },

  /**
   * Вызывается при ошибке формирования запроса (до отправки).
   * Логирует ошибку в режиме отладки.
   *
   * @param error - Ошибка, произошедшая при подготовке запроса.
   * @returns Отклонённый промис с ошибкой.
   */
  onRejected: (error: unknown) => {
    // Логируем ошибку запроса в режиме отладки
    if (env.DEBUG) {
      console.error('Ошибка запроса:', error instanceof Error ? error.message : error);
    }
    return Promise.reject(error);
  }
};