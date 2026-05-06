import type { LinkProps } from '@shared/ui/link/types/link.types';

export function mapLinkProps(props: LinkProps) {
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