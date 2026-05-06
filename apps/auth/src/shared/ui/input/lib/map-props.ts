import type { IInputProps } from '@shared/ui/input/types/input.types';

export function mapInputProps(props: IInputProps) {
  const { size, errTxt, ...rest } = props;
  return {
    ...rest,
    size: (() => {
      switch (props.size) {
        case 'sm': return 'small'
        case 'md': return 'medium'
        case 'lg': return 'large'
        default: return 'large'
      }
    })(),
    error: errTxt,
  }
}