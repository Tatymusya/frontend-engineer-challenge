<script setup lang="ts">
/**
 * Универсальная кнопка
 *
 * Является обёрткой над `Orbitto.Button`, адаптирующей API библиотеки под внутренние стандарты проекта.
 * Поддерживает размеры 'sm', 'md', 'lg', различные стили (primary, secondary и др.) и стандартные события.
 *
 * @example
 * Простая кнопка:
 * ```vue
 * <AppButton variant="primary" size="md">Submit</AppButton>
 * ```
 *
 * @example
 * Кнопка с иконкой:
 * ```vue
 * <AppButton variant="secondary" size="sm">
 *   <IconSave />
 *   Save
 * </AppButton>
 * ```
 *
 * @example
 * Заблокированная кнопка:
 * ```vue
 * <AppButton variant="primary" :disabled="true">Loading...</AppButton>
 * ```
 *
 * @example
 * Кнопка-ссылка:
 * ```vue
 * <AppButton as="a" href="/profile" target="_blank" variant="outline">
 *   Go to Profile
 * </AppButton>
 * ```
 *
 * @props
 * @property {'primary' | 'secondary' | 'outline' | 'ghost'} [variant='primary'] - Визуальный стиль кнопки.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Размер кнопки.
 * @property {boolean} [disabled=false] - Блокирует кнопку и изменяет её внешний вид.
 * @property {'button' | 'submit' | 'reset'} [type='button'] - HTML-тип кнопки.
 * @property {string} [id] - Уникальный идентификатор.
 * @property {string} [ariaLabel] - ARIA-метка для доступности.
 * @property {boolean} [loading=false] - Индикатор загрузки.
 * @property {string} [dataTestId] - Data-атрибут для тестов.
 *
 * @emits
 * Настоящий компонент не определяет кастомных событий.
 * Все события (click, focus и др.) автоматически пробрасываются на внутренний элемент.
 *
 * @slot default - Основной контент кнопки (текст, иконки и т.д.)
 * @slot leftIcon - Слот для иконки слева от текста
 * @slot rightIcon - Слот для иконки справа от текста
 * @slot skeleton - Слот для skeleton'a
 */

import { mapButtonProps } from '@shared/ui/button/lib/map-props';
import type { IButtonProps } from '@shared/ui/button/types/button.types';
import { Button } from '@tatymusaeva/orbitto';

const props = defineProps<IButtonProps>();

defineOptions({
  name: 'AppButton'
});

const mappedProps = mapButtonProps(props);

defineSlots<{
  leftIcon: () => any;
  default: () => any;
  rightIcon: () => any;
  /**
   * Слот для кастомизации skeleton.
   * Родитель должен сам использовать AppSkeleton и передать нужные пропсы.
   */
  skeleton: () => any;
}>();
</script>

<template>
  <slot name="skeleton" v-if="loading" />
  <Button v-else v-bind="mappedProps">
    <template v-if="$slots.leftIcon" #leftIcon>
      <slot name="leftIcon" />
    </template>
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
    <template v-if="$slots.rightIcon" #rightIcon>
      <slot name="rightIcon" />
    </template>
  </Button>
</template>