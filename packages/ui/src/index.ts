import './styles/global.css';
import './assets/fonts/inter/Inter-VariableFont_opsz,wght.woff2';

export { default as Button } from '@/components/Button/Button.vue';
export { default as ErrorMessage } from '@/components/ErrorMessage/ErrorMessage.vue';
export { default as Heading } from '@/components/Heading/Heading.vue';
export { default as Input } from '@/components/Input/Input.vue';
export { default as Label } from '@/components/Label/Label.vue';
export { default as Paragraph } from '@/components/Paragraph/Paragraph.vue';
export { default as Skeleton } from '@/components/Skeleton/Skeleton.vue';
export { default as Link } from '@/components/Link/Link.vue';
export { default as Form } from '@/components/Form/Form.vue';

export type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  ButtonEmits,
} from '@/components/Button/types';

export type {
  ErrorMessageSize,
  ErrorMessageWeight,
  ErrorMessageProps,
} from '@/components/ErrorMessage/types';

export type {
  InputVariant,
  InputSize,
  InputType,
  InputProps,
  InputEmits,
} from '@/components/Input/types';

export type {
  FormProps,
  FormEmits,
} from '@/components/Form/types';

export type {
  HeadingLevel,
  HeadingWeight,
  HeadingProps,
} from '@/components/Heading/types';

export type {
  IconSize,
  IconProps,
} from '@/components/Icon/types';

export type {
  LabelProps,
} from '@/components/Label/types';

export type {
  LinkVariant,
  LinkSize,
  LinkTarget,
  LinkProps,
} from '@/components/Link/types';

export type {
  ParagraphTag,
  ParagraphSize,
  ParagraphWeight,
  ParagraphProps,
} from '@/components/Paragraph/types';

export type {
  SkeletonShape,
  SkeletonProps,
} from '@/components/Skeleton/types';