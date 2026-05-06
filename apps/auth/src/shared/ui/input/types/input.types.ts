import type { ICommonProps } from '@shared/types/';
import type { InputProps as OrbittoInputProps } from '@tatymusaeva/orbitto';

interface InputProps extends ICommonProps, Omit<OrbittoInputProps, 'size' | 'error'> {
	/**
	 * Размер
	 */
	size?: 'sm' | 'md' | 'lg'
	/**
	 * Текст ошибки
	 */
	errTxt?: string
}

export type { InputProps as IInputProps };
