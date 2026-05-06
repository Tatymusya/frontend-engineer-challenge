<script setup lang="ts">
/**
 * Универсальный параграф
 *
 * Является обёрткой над `Orbitto.Paragraph`, адаптирующей API библиотеки под внутренние стандарты проекта.
 * Поддерживает размеры 'sm', 'md', 'lg'.
 *
 * @example
 * Простая кнопка:
 * ```vue
 * <AppParagraph size="md">Text text text</AppParagraph>
 * ```
 *
 * @props
 * @property {'p' | 'div'} [as='p'] - HTML-тег параграфа.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Размер параграфа.
 * @property {'reg' | 'md' | 'bld'} [weight] - Насыщенность шрифта.
 * @property {string} [color] - Цвет параграфа.
 * @property {boolean} [truncate] - Обрезать текст троеточием (1 строка).
 * @property {string} [id] - id параграфа.
 * @property {1 | 2 | 3 | 4} [lineClamp] - Ограничение количества строк.
 * @property {boolean} [loading] - Индикатор загрузки.
 * @property {string} [dataTestId] - Data-атрибут для тестов.
 *
 *
 * @slot default - Основной контент ссылки
 * @slot skeleton - Слот для skeleton'a
 */

import { mapParagraphProps } from '@shared/ui/paragraph/lib/map-props';
import type { IParagraphProps } from '@shared/ui/paragraph/types/paragraph.types';
import { Paragraph } from '@tatymusaeva/orbitto';

const props = defineProps<IParagraphProps>();

const mappedProps = mapParagraphProps(props);

defineOptions({
  name: 'AppParagraph'
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
  <Paragraph v-else v-bind="mappedProps">
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
  </Paragraph>
</template>