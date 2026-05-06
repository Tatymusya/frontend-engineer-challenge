/**
 * Пропсы компонента Label
 */
export interface LabelProps {
  /** ID поля ввода для связки (обязательно для a11y) */
  forId: string

  /** Показать звёздочку обязательного поля */
  required?: boolean

  /** Уникальный ID описания для связи с input через aria-describedby */
  descriptionId?: string

  /** Цвет текста */
  color?: string
}
