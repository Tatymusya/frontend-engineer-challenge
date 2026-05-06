<script setup lang="ts">
/**
 * Универсальный заголовок (Heading)
 *
 * Является обёрткой над `Orbitto.Heading`, адаптирующей API библиотеки под внутренние стандарты проекта.
 * Поддерживает уровни h1-h6, насыщенность шрифта, цвет, обрезание текста и доступность.
 *
 * @example
 * Простой заголовок:
 * ```vue
 * <AppHeading lv="h1">Registration</AppHeading>
 * ```
 *
 * @example
 * Заголовок с обрезанием текста:
 * ```vue
 * <AppHeading lv="h3" truncate>Very long title that should be truncated</AppHeading>
 * ```
 *
 * @example
 * Многострочное обрезание (2 строки):
 * ```vue
 * <AppHeading lv="h4" :line-clamp="2">Long description text...</AppHeading>
 * ```
 *
 * @example
 * С указанием цвета и жирности:
 * ```vue
 * <AppHeading lv="h2" weight="bold" color="var(--color-text-accent)">
 *   Welcome back!
 * </AppHeading>
 * ```
 *
 * @props
 * @property {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} [lv='h1'] - Уровень заголовка.
 * @property {'regular' | 'medium' | 'bold'} [weight='medium'] - Насыщенность шрифта.
 * @property {string} [color] - Цвет текста. Может быть CSS-переменной или hex.
 * @property {boolean} [truncate='false'] - Обрезать текст одной строкой с троеточием.
 * @property {1|2|3} [lineClamp] - Ограничить количество строк (1, 2 или 3).
 * @property {string} [id] - Уникальный ID для якорных ссылок и навигации.
 * @property {string} [ariaLabel] - ARIA-метка, если контент генерируется динамически.
 * @property {boolean} [loading] - Индикатор загрузки.
 * @property {string} [dataTestId] - Data-атрибут для тестов.
 * 
 * @slot default - Основной текст заголовка
 * @slot skeleton - Слот для skeleton'a
 */

import type { IHeadingProps } from '@shared/ui/heading/types/heading.types';
import { Heading } from '@tatymusaeva/orbitto';

const props = defineProps<IHeadingProps>();

defineOptions({
  name: 'AppHeading'
});

defineSlots<{
  default: () => any;
  /**
   * Слот для кастомизации skeleton.
   * Родитель должен сам использовать AppSkeleton и передать нужные пропсы.
   */
  skeleton: () => any;
}>();
</script>

<template>
  <slot name="skeleton" v-if="loading" />
  <Heading v-else v-bind="props">
    <slot></slot>
  </Heading>
</template>