import type { ILabelProps } from '@shared/ui/label/types/label.types';

export function mapLabelProps(props: ILabelProps) {
  const { descrId, ...rest } = props;
  return {
    ...rest,
    descriptionId: descrId,
  }
}