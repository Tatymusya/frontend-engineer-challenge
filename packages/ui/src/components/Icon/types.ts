/**
 * Размер иконки
 */
export type IconSize = 'small' | 'medium' | 'large';

/**
 * Пропсы компонента Icon
 */
export interface IconProps {
  /** Название иконки (из спрайта) */
  name: string

  /** Размер иконки */
  size?: IconSize

  /** Цвет иконки */
  color?: string

  /** ARIA-метка (если есть — иконка смысловая, если нет — декоративная) */
  ariaLabel?: string
}
