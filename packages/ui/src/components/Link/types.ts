/**
 * Вариант оформления ссылки
 */
export type LinkVariant = 'primary' | 'secondary';

/**
 * Размер ссылки
 */
export type LinkSize = 'small' | 'medium' | 'large';

/**
 * Цель открытия ссылки
 */
export type LinkTarget = '_blank' | '_self';

/**
 * Пропсы компонента Link
 */
export interface LinkProps {
  /** URL ссылки */
  href: string

  /** Цель открытия ссылки */
  target?: LinkTarget

  /** ARIA-метка для доступности */
  ariaLabel?: string

  /** Атрибут rel для управления безопасностью */
  rel?: string

  /** Визуальный стиль ссылки */
  variant?: LinkVariant

  /** Размер ссылки */
  size?: LinkSize

  /** Показывать подчёркивание */
  isUnderline?: boolean

  /** Отключает ссылку (блокирует клик и фокус) */
  disabled?: boolean
}
