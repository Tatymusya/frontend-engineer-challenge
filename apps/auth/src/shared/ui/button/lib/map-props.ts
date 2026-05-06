import type { IButtonProps } from '@shared/ui/button/types/button.types';

export function mapButtonProps(props: IButtonProps) {
  const { size, ...rest } = props;
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
  }
}