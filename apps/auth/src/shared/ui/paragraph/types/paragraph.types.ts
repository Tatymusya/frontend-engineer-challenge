import type { ICommonProps } from '@shared/types/';
import type { ParagraphProps as OrbittoParagraphProps } from '@tatymusaeva/orbitto';

interface ParagraphProps extends ICommonProps, Omit<OrbittoParagraphProps, 'size' | 'weight'> {
  /**
   * Размер
   */
  size?: 'sm' | 'md' | 'lg',

  /**
   * Насыщенность шрифта
   */
  weight?: 'reg' | 'md' | 'bld',
}

export type { ParagraphProps as IParagraphProps };
