/**
 * Визуальный стиль поля ввода
 */
export type InputVariant = 'default' | 'infold';

/**
 * Размер поля ввода
 */
export type InputSize = 'small' | 'medium' | 'large';

/**
 * HTML тип поля ввода
 */
export type InputType = 'text' | 'email' | 'password' | 'number';

/**
 * Пропсы компонента Input
 */
export interface InputProps {
  /** Визуальный стиль поля ввода */
  variant?: InputVariant

  /** Значение поля (v-model) */
  modelValue?: string

  /** HTML тип поля */
  type?: InputType

  /** Размер поля */
  size?: InputSize

  /** Плейсхолдер */
  placeholder?: string

  /** Отключает поле */
  disabled?: boolean

  /** Состояние валидации (успешное) */
  valid?: boolean

  /** Текст ошибки (если есть — показывает ошибку) */
  error?: string

  /** Уникальный ID для связи с label и aria-describedby */
  id?: string
}

/**
 * События компонента Input
 */
export interface InputEmits {
  /** Обновление значения (v-model) */
  (e: 'update:modelValue', value: string): void
}
