/**
 * Размеры сообщения об ошибке
 */
export type ErrorMessageSize = 'small' | 'medium';

/**
 * Насыщенность шрифта сообщения об ошибке
 */
export type ErrorMessageWeight = 'regular' | 'medium';

/**
 * Пропсы компонента ErrorMessage
 */
export interface ErrorMessageProps {
  /** Уникальный ID для связи с полем ввода через aria-describedby */
  id?: string;

  /** Текст сообщения об ошибке */
  message?: string;

  /** Размер текста ошибки */
  size?: ErrorMessageSize;

  /** Насыщенность шрифта */
  weight?: ErrorMessageWeight;

  /** Цвет шрифта */
  color?: string;
}