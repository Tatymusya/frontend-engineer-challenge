/**
 * Константы ключей хранилища приложения.
 * Содержит имена всех ключей, используемых в localStorage, sessionStorage и cookies.
 * Централизует управление именами для предотвращения ошибок и дублирования.
 */
export const STORAGE_KEYS = {
  // Аутентификация
  ACCESS_TOKEN: 'access_token',        // Токен доступа (JWT)
  REFRESH_TOKEN: 'refresh_token',      // Токен обновления
  USER_DATA: 'user_data',              // Данные авторизованного пользователя
  AUTH_STATE: 'auth_state',            // Состояние аутентификации

  // Предпочтения пользователя
  THEME_PREFERENCE: 'theme_preference',        // Выбранная тема (светлая/тёмная)
  LANGUAGE_PREFERENCE: 'language_preference',  // Язык интерфейса
  NOTIFICATIONS_ENABLED: 'notifications_enabled', // Разрешены ли уведомления

  // Сессия и безопасность
  LAST_LOGIN_TIME: 'last_login_time',   // Время последнего входа
  SESSION_ID: 'session_id',             // Идентификатор сессии
  CSRF_TOKEN: 'csrf_token',             // Токен CSRF для защиты от межсайтовой подделки запросов

  // Сохранение состояния приложения
  ONBOARDING_COMPLETED: 'onboarding_completed', // Пройден ли онбординг
  TOOLTIP_VISITED: 'tooltip_visited',           // Показывались ли подсказки
  MODAL_DISMISSED: 'modal_dismissed',           // Было ли модальное окно закрыто

  // Состояние интерфейса
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',       // Свёрнута ли боковая панель
  TABLE_COLUMNS: 'table_columns',               // Настройки видимых колонок таблицы
  FILTERS_STATE: 'filters_state',               // Сохранённое состояние фильтров

  // Кэширование и черновики
  API_CACHE_PREFIX: 'api_cache_',               // Префикс для кэшированных данных API
  FORM_DRAFT_PREFIX: 'form_draft_',             // Префикс для сохранённых черновиков форм

  // Временные данные
  REDIRECT_URL: 'redirect_url',                 // URL для перенаправления после входа
  TEMPORARY_DATA: 'temporary_data'              // Общее временное хранилище
} as const;

/**
 * Ключи сессионного хранилища (sessionStorage).
 * Используются для временных данных, которые должны быть удалены при закрытии вкладки.
 */
export const SESSION_STORAGE_KEYS = {
  // Временные данные формы
  TEMP_FORM_DATA: 'temp_form_data',     // Временные данные формы (до отправки)

  // Навигация и состояние
  CURRENT_ROUTE: 'current_route',       // Текущий маршрут
  MODAL_STATE: 'modal_state',           // Состояние модальных окон

  // Безопасность (одноразовые коды)
  OTP_CODE: 'otp_code',                 // Одноразовый пароль (2FA)
  VERIFICATION_ID: 'verification_id',   // Идентификатор процесса верификации

  // Состояние UI
  SCROLL_POSITION: 'scroll_position',   // Позиция прокрутки страницы
  TAB_STATE: 'tab_state'                // Состояние вкладок (например, активная вкладка)
} as const;

/**
 * Ключи cookie-хранилища.
 * Используются для хранения согласий, трекинговых меток и сессионных данных через cookies.
 */
export const COOKIE_KEYS = {
  CONSENT: 'cookie_consent',                    // Согласие на использование cookies
  ANALYTICS_CONSENT: 'analytics_consent',       // Согласие на аналитику
  AD_CONSENT: 'ad_consent',                     // Согласие на рекламу
  SESSION_COOKIE: 'session_cookie'              // Сессионная cookie (например, для серверной сессии)
} as const;