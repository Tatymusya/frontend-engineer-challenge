/**
 * Базовая конфигурация API
 */
import { apiClient } from '@shared/config/api/axios';
import {
  API_ENDPOINTS,
  HTTP_METHODS,
  CONTENT_TYPES,
  RESPONSE_STATUS,
  TIMEOUT_CONFIG
} from '@shared/config/api/constants';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Класс сервиса API, оборачивающий клиент axios для добавления дополнительной функциональности.
 */
class ApiService {
  private client = apiClient;

  /**
   * Выполняет GET-запрос к указанному эндпоинту.
   *
   * @param endpoint - URL-адрес запроса (например, '/login').
   * @param params - Параметры запроса, которые будут добавлены в URL как query-строка.
   * @param config - Дополнительная конфигурация Axios (заголовки, таймаут и т.д.).
   * @returns Объект ответа, десериализованный из JSON.
   * @template T - Ожидаемый тип данных в ответе.
   */
  async get<T = unknown>(
    endpoint: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get<T>(endpoint, {
      params,
      ...config,
    });
    return response.data;
  }

  /**
   * Выполняет POST-запрос к указанному эндпоинту.
   *
   * @param endpoint - URL-адрес запроса (например, '/login').
   * @param data - Тело запроса, которое будет отправлено на сервер.
   * @param config - Дополнительная конфигурация Axios.
   * @returns Ответ от сервера в виде объекта.
   * @template T - Ожидаемый тип данных в ответе.
   */
  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * Выполняет PUT-запрос для полного обновления ресурса.
   *
   * @param endpoint - URL-адрес запроса.
   * @param data - Новые данные, которыми будет заменён ресурс.
   * @param config - Дополнительная конфигурация Axios.
   * @returns Обновлённый ресурс.
   * @template T - Ожидаемый тип данных в ответе.
   */
  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put<T>(endpoint, data, config);
    return response.data;
  }

   /**
   * Выполняет PATCH-запрос для частичного обновления ресурса.
   *
   * @param endpoint - URL-адрес запроса.
   * @param data - Часть данных, которую нужно обновить.
   * @param config - Дополнительная конфигурация Axios.
   * @returns Частично обновлённый ресурс.
   * @template T - Ожидаемый тип данных в ответе.
   */
  async patch<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * Выполняет DELETE-запрос для удаления ресурса.
   *
   * @param endpoint - URL-адрес удаляемого ресурса.
   * @param config - Дополнительная конфигурация Axios.
   * @returns Ответ от сервера (обычно пустой или статус подтверждения).
   * @template T - Ожидаемый тип данных в ответе.
   */
  async delete<T = unknown>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete<T>(endpoint, config);
    return response.data;
  }

  /**
   * Динамически изменяет базовый URL для всех последующих запросов.
   *
   * @param baseURL - Новый базовый URL (например, 'https://api.example.com/v1').
   */
  setBaseURL(baseURL: string) {
    this.client.defaults.baseURL = baseURL;
  }

  /**
   * Устанавливает токен авторизации в заголовок Authorization.
   * Если токен равен null, заголовок удаляется.
   *
   * @param token - JWT-токен или другой строковый токен авторизации, либо null для удаления.
   */
  setAuthToken(token: string | null): void {
    if (token) {
      this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common.Authorization;
    }
  }

  /**
   * Возвращает внутренний экземпляр Axios-клиента.
   * Используется в случаях, когда требуется прямой доступ к Axios.
   *
   * @returns Экземпляр Axios-клиента.
   */
  getClient() {
    return this.client;
  }
}

// Создание единого экземпляра сервиса (синглтон)
const apiService = new ApiService();

// Экспорт сервиса API, клиента и констант
export { apiService, apiClient, API_ENDPOINTS, HTTP_METHODS, CONTENT_TYPES, RESPONSE_STATUS, TIMEOUT_CONFIG };

// Экспорт типов
export type { ApiService };