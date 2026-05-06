import type { ICommonProps } from '@shared/types/';
import type { FormProps as OrbittoIFormProps } from '@tatymusaeva/orbitto';

/**
 * Общий тип для значений формы
 */
export type FormValues = Record<string, any>;

/**
 * Правило валидации
 */
export interface IValidationRule {
  message: string;
  validator: (value: any) => boolean | Promise<boolean>;
}

/**
 * Правила валидации по полям
 */
export type FieldRules = Record<string, IValidationRule[]>;

/**
 * Состояние ошибок
 */
export type FieldErrors = Record<string, string | null>;

/**
 * Пропсы для AppForm
 */
interface FormProps extends ICommonProps, OrbittoIFormProps {
  /**
   * Значения формы
   */
  modelValue: FormValues;

  /**
   * Правила валидации
   */
  rules?: FieldRules;

  /**
   * Форма заблокирована
   */
  disabled?: boolean;
}

/**
 * События формы
 */
export interface IAppFormEmits {
  /**
   * Обновление значений формы
   */
  'update:modelValue': (values: FormValues) => void;

  /**
   * Форма успешно прошла валидацию и отправлена
   */
  submit: (values: FormValues) => void;

  /**
   * Форма сброшена
   */
  reset: () => void;

  /**
   * Валидация завершена (успешно или нет)
   */
  validate: (isValid: boolean, errors: FieldErrors) => void;
}

export type { FormProps as IFormProps };

