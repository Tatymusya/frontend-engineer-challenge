/**
 * Централизованный экспорт всех переиспользуемых UI-компонентов и их API.
 * Предоставляет единые точки импорта для компонентов, типов, пропсов и утилит,
 * связанных с пользовательским интерфейсом.
 *
 * Обеспечивает:
 * - Удобный доступ к визуальным компонентам (кнопки, поля ввода, формы и т.д.).
 * - Экспорт не только компонентов, но и дополнительных возможностей (например, типов, хелперов) из каждого модуля.
 * - Поддержку tree-shaking за счёт чёткой структуры экспорта.
 *
 * Используется для импортов вида:
 * @example
 * import { AppButton, AppInput } from '@shared/ui';
 * import { ButtonSize, ButtonTheme } from '@shared/ui/button';
 * import { InputType } from '@shared/ui/input';
 */
export { default as AppButton } from '@shared/ui/button/ui/AppButton.vue';
export { default as AppForm } from '@shared/ui/form/ui/AppForm.vue';
export { default as AppHeading } from '@shared/ui/heading/ui/AppHeading.vue';
export { default as AppInput } from '@shared/ui/input/ui/AppInput.vue';
export { default as AppLabel } from '@shared/ui/label/ui/AppLabel.vue';
export { default as AppLink } from '@shared/ui/link/ui/AppLink.vue';
export { default as AppParagraph } from '@shared/ui/paragraph/ui/AppParagraph.vue';
export { default as AppSkeleton } from '@shared/ui/skeleton/ui/AppSkeleton.vue';

/**
 * Экспорт дополнительных возможностей из модулей UI-компонентов:
 * - Типы (props, enums, interfaces).
 * - Композаблы, директивы, утилиты оформления.
 * - Вспомогательные компоненты (если есть).
 */
export type { IButtonProps } from '@shared/ui/button/';
export type { IFormProps } from '@shared/ui/form/';
export type { IHeadingProps } from '@shared/ui/heading/';
export type { IInputProps } from '@shared/ui/input/';
export type { ILabelProps } from '@shared/ui/label/';
export type { LinkProps } from '@shared/ui/link/';
export type { IParagraphProps } from '@shared/ui/paragraph/';
export type { ISkeletonProps } from '@shared/ui/skeleton/';

