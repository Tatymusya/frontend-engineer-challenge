import type { ICommonProps } from '@shared/types/';
import type { LabelProps as OrbittoLabelProps } from '@tatymusaeva/orbitto';

interface LabelProps extends ICommonProps, Omit<OrbittoLabelProps, 'descriptionId'> {
  /**
   * Уникальный ID описания для связи с input через aria-describedby
   */
  descrId?: string;
}

export type { LabelProps as ILabelProps };
