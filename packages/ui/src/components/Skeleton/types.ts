/**
 * Форма скелетона
 */
export type SkeletonShape = 'rect' | 'circle' | 'text' | 'avatar' | 'button';

/**
 * Пропсы компонента Skeleton
 */
export interface SkeletonProps {
  /** Форма скелетона */
  shape?: SkeletonShape

  /** Ширина скелетона */
  width?: string

  /** Высота скелетона */
  height?: string

  /** Скругление углов (для rect) */
  radius?: string

  /** Анимация загрузкике */
  animated?: boolean

  /** ARIA-метка (если скелетон самостоятельный) */
  ariaLabel?: string
}
