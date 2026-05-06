import type { IParagraphProps } from '@shared/ui/paragraph/types/paragraph.types';

export function mapParagraphProps(props: IParagraphProps) {
  const { size, weight, ...rest } = props;
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
    weight: (() => {
      switch (props.weight) {
        case 'reg': return 'regular'
        case 'md': return 'medium'
        case 'bld': return 'bold'
        default: return 'medium'
      }
    })(),
  }
}