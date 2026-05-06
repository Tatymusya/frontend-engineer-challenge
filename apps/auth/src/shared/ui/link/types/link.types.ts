import type { ICommonProps } from '@shared/types/';
import type { LinkProps as OrbittoLinkProps } from '@tatymusaeva/orbitto';

export interface LinkProps extends ICommonProps, Omit<OrbittoLinkProps, 'size'> {
  /**
   * Размер
   */
  size?: 'sm' | 'md' | 'lg',
}