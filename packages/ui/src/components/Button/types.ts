/**
 * Размеры кнопки
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Визуальный стиль кнопки
 */
export type ButtonVariant = 'primary' | 'secondary';

/**
 * HTML тип кнопки
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Пропсы компонента Button
 */
export interface ButtonProps {
  /** Визуальный стиль кнопки */
  variant?: ButtonVariant
  
  /** Размер кнопки */
  size?: ButtonSize
  
  /** Отключает кнопку (блокирует клики и hover) */
  disabled?: boolean
  
  /** ARIA-метка для доступности */
  ariaLabel?: string
  
  /** Тип кнопки (HTML атрибут) */
  type?: ButtonType
}

/**
 * События компонента Button
 *
 * Примечание: Только `click` декларировано явно.
 * Все остальные нативные события (focus, blur, keydown и т.д.) автоматически
 * пробрасываются на корневой <button> элемент через механизм Vue.
 */
export interface ButtonEmits {
  /** Клик по кнопке (не срабатывает при loading/disabled) */
  (e: 'click', event: MouseEvent): void
}
