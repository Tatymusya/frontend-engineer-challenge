/**
 * Пропсы компонента Form
 */
export interface FormProps {
  /** Уникальный ID для связи с сообщением об ошибке формы */
  id?: string

  /** Валидировать при отправке */
  validateOnSubmit?: boolean

  /** Очищать форму при отправке */
  resetOnSubmit?: boolean
}

/**
 * События компонента Form
 */
export interface FormEmits {
  /** Отправка формы */
  (e: 'submit', event: Event): void

  /** Сброс формы */
  (e: 'reset'): void
}
