/**
 * HTML-тег параграфа
 */
export type ParagraphTag = 'p' | 'div';

/**
 * Размер текста
 */
export type ParagraphSize = 'small' | 'medium' | 'large';

/**
 * Насыщенность шрифта
 */
export type ParagraphWeight = 'regular' | 'medium' | 'bold';

/**
 * Пропсы компонента Paragraph
 */
export interface ParagraphProps {
  /** HTML-тег параграфа */
  as?: ParagraphTag

  /** Размер текста */
  size?: ParagraphSize

  /** Насыщенность шрифта */
  weight?: ParagraphWeight

  /** Цвет текста */
  color?: string

  /** Обрезать текст троеточием (1 строка) */
  truncate?: boolean

  /** Ограничение количества строк */
  lineClamp?: 1 | 2 | 3 | 4

  /** Уникальный ID для навигации и якорных ссылок */
  id?: string
}
