import type { ICommonProps } from '@shared/types/';
import type { ButtonProps as OrbittoButtonProps } from '@tatymusaeva/orbitto';

interface ButtonProps extends ICommonProps, Omit<OrbittoButtonProps, 'size'> {
  /**
   * Размер
   */
  size?: 'sm' | 'md' | 'lg',
}

export type { ButtonProps as IButtonProps };

