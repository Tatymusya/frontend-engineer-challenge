/**
 * Настройка экземпляра Axios для API-запросов.
 * Создаёт предварительно сконфигурированный клиент HTTP с базовыми параметрами и перехватчиками.
 */
import { requestInterceptor } from '@shared/config/api/interceptors/request';
import { responseInterceptor } from '@shared/config/api/interceptors/response';
import { env } from '@shared/config/env';
import axios from 'axios';
/**
 * Создание экземпляра Axios с базовой конфигурацией.
 * 
 * @property {string} baseURL - Базовый URL API, берётся из переменных окружения.
 * @property {number} timeout - Таймаут запроса в миллисекундах (10 секунд).
 * @property {Object} headers - Заголовки по умолчанию.
 * @property {string} headers['Content-Type'] - Тип контента для отправки данных (JSON).
 */
const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Подключение перехватчиков (interceptors) для обработки запросов и ответов.
 * 
 * Перехватчики используются для:
 * - Добавления авторизационных токенов к запросам.
 * - Обработки ошибок на уровне сети и HTTP.
 * - Логирования запросов/ответов.
 * - Автоматического повтора запросов при необходимости.
 */

// Перехватчик исходящих запросов
apiClient.interceptors.request.use(
  requestInterceptor.onFulfilled,
  requestInterceptor.onRejected
);

// Перехватчик входящих ответов
apiClient.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);

/**
 * Экспортируемый экземпляр Axios, готовый к использованию в приложении.
 * Используется как основа для всех API-запросов.
 */
export { apiClient };
