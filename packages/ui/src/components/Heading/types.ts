/**
 * Уровень заголовка (HTML тег)
 */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Насыщенность шрифта заголовка
 */
export type HeadingWeight = 'regular' | 'medium' | 'bold';

/**
 * Пропсы компонента Heading
 */
export interface HeadingProps {
  /** Уровень заголовка (HTML тег) */
  lv?: HeadingLevel

  /** Насыщенность шрифта */
  weight?: HeadingWeight

  /** Цвет текста */
  color?: string

  /** Обрезать текст троеточием (1 строка) */
  truncate?: boolean

  /** Ограничение количества строк (для многострочного обрезания) */
  lineClamp?: 1 | 2 | 3

  /** Уникальный ID для навигации и якорных ссылок */
  id?: string

  /** ARIA-метка (используется только когда нет контента в слоте) */
  ariaLabel?: string
}
