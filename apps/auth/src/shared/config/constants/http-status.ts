/**
 * Константы HTTP-статусов с понятными именами.
 * Предоставляют типизированные значения кодов состояния HTTP для использования в приложении.
 */
export const HTTP_STATUS = {
  // Информационные ответы (1xx)
  CONTINUE: 100,                    // Продолжить
  SWITCHING_PROTOCOLS: 101,         // Переключение протоколов
  PROCESSING: 102,                  // Идёт обработка
  EARLY_HINTS: 103,                 // Ранние подсказки

  // Успешные ответы (2xx)
  OK: 200,                          // Успешно
  CREATED: 201,                     // Создано
  ACCEPTED: 202,                    // Принято
  NON_AUTHORITATIVE_INFORMATION: 203, // Информация без авторитета
  NO_CONTENT: 204,                  // Нет содержимого
  RESET_CONTENT: 205,               // Сброс содержимого
  PARTIAL_CONTENT: 206,             // Частичное содержимое
  MULTI_STATUS: 207,                // Много статусов
  ALREADY_REPORTED: 208,            // Уже сообщено
  IM_USED: 226,                     // Использовано IM

  // Ответы перенаправления (3xx)
  MULTIPLE_CHOICES: 300,            // Множественный выбор
  MOVED_PERMANENTLY: 301,           // Перемещено навсегда
  FOUND: 302,                       // Найдено (временно перемещено)
  SEE_OTHER: 303,                   // Смотрите другое
  NOT_MODIFIED: 304,                // Не изменено
  USE_PROXY: 305,                   // Использовать прокси
  TEMPORARY_REDIRECT: 307,          // Временное перенаправление
  PERMANENT_REDIRECT: 308,          // Постоянное перенаправление

  // Ошибки клиента (4xx)
  BAD_REQUEST: 400,                 // Неверный запрос
  UNAUTHORIZED: 401,                // Неавторизован
  PAYMENT_REQUIRED: 402,            // Требуется оплата
  FORBIDDEN: 403,                   // Доступ запрещён
  NOT_FOUND: 404,                   // Не найдено
  METHOD_NOT_ALLOWED: 405,          // Метод не разрешён
  NOT_ACCEPTABLE: 406,              // Неприемлемо
  PROXY_AUTHENTICATION_REQUIRED: 407, // Требуется аутентификация прокси
  REQUEST_TIMEOUT: 408,             // Время ожидания запроса истекло
  CONFLICT: 409,                    // Конфликт
  GONE: 410,                        // Удалено
  LENGTH_REQUIRED: 411,             // Требуется длина
  PRECONDITION_FAILED: 412,         // Условие не выполнено
  PAYLOAD_TOO_LARGE: 413,           // Полезная нагрузка слишком велика
  URI_TOO_LONG: 414,                // URI слишком длинный
  UNSUPPORTED_MEDIA_TYPE: 415,      // Неподдерживаемый тип данных
  REQUESTED_RANGE_NOT_SATISFIABLE: 416, // Запрашиваемый диапазон недостижим
  EXPECTATION_FAILED: 417,          // Ожидание не удалось
  IM_A_TEAPOT: 418,                 // Я — чайник (шутливый статус)
  MISDIRECTED_REQUEST: 421,         // Ошибочный запрос
  UNPROCESSABLE_ENTITY: 422,        // Невозможно обработать сущность
  LOCKED: 423,                      // Заблокировано
  FAILED_DEPENDENCY: 424,           // Зависимость не выполнена
  TOO_EARLY: 425,                   // Слишком рано
  UPGRADE_REQUIRED: 426,            // Требуется обновление
  PRECONDITION_REQUIRED: 428,       // Требуются предусловия
  TOO_MANY_REQUESTS: 429,           // Слишком много запросов
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431, // Поля заголовка запроса слишком велики
  UNAVAILABLE_FOR_LEGAL_REASONS: 451, // Недоступно по юридическим причинам

  // Ошибки сервера (5xx)
  INTERNAL_SERVER_ERROR: 500,       // Внутренняя ошибка сервера
  NOT_IMPLEMENTED: 501,             // Не реализовано
  BAD_GATEWAY: 502,                 // Плохой шлюз
  SERVICE_UNAVAILABLE: 503,         // Сервис недоступен
  GATEWAY_TIMEOUT: 504,             // Таймаут шлюза
  HTTP_VERSION_NOT_SUPPORTED: 505,  // Версия HTTP не поддерживается
  VARIANT_ALSO_NEGOTIATES: 506,     // Вариант также ведёт переговоры
  INSUFFICIENT_STORAGE: 507,        // Недостаточно памяти
  LOOP_DETECTED: 508,               // Обнаружен цикл
  NOT_EXTENDED: 510,                // Не расширено
  NETWORK_AUTHENTICATION_REQUIRED: 511, // Требуется сетевая аутентификация
} as const;

/**
 * Группы статусов для удобной проверки типов ответов.
 * Используется для быстрого определения категории ответа (успех, ошибка и т.д.).
 */
export const HTTP_STATUS_GROUPS = {
  SUCCESS: [200, 201, 202, 204],    // Успешные статусы
  CLIENT_ERROR: [400, 401, 403, 404, 409, 422], // Ошибки клиента
  SERVER_ERROR: [500, 501, 502, 503, 504], // Ошибки сервера
  REDIRECT: [301, 302, 307, 308],  // Перенаправления
} as const;

/**
 * Человекочитаемые описания наиболее распространённых HTTP-статусов.
 * Полезны для логирования, отображения сообщений пользователю или диагностики.
 */
export const HTTP_STATUS_MESSAGES = {
  [HTTP_STATUS.BAD_REQUEST]: 'Неверный запрос',
  [HTTP_STATUS.UNAUTHORIZED]: 'Неавторизован',
  [HTTP_STATUS.FORBIDDEN]: 'Доступ запрещён',
  [HTTP_STATUS.NOT_FOUND]: 'Не найдено',
  [HTTP_STATUS.CONFLICT]: 'Конфликт',
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'Невозможно обработать сущность',
  [HTTP_STATUS.TOO_MANY_REQUESTS]: 'Слишком много запросов',
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Внутренняя ошибка сервера',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'Сервис недоступен',
} as const;