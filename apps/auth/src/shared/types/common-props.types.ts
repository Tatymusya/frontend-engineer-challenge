/**
 * Общие пропсы для UI-компонентов
 */
export interface ICommonProps {
  /**
   * Режим загрузки
   * @default false
   */
  loading?: boolean;

  /**
   * Data-атрибут для тестов
   * 
   */
  dataTestId?: string;
}