<script setup lang="ts">
/**
 * @description
 * Универсальная подпись для элементов формы
 *
 * Является обёрткой над `Orbitto.Label`, адаптирующей API библиотеки под внутренние стандарты проекта.
 *
 * @props
 * @property {string} [forId] - ID поля ввода для связки.
 * @property {boolean} [required] - Показать звёздочку обязательного поля.
 * @property {string} [color] - Цвет текста.
 * @property {string} [descrId] - Уникальный ID описания для связи с input через aria-describedby.
 * @property {boolean} [loading] - Индикатор загрузки.
 * @property {string} [dataTestId] - Data-атрибут для тестов.
 * 
 * @example
 * Использование с меткой required:
 * ```vue
 * <AppLabel forId="Email" required>
 *   Email
 * </AppLabel>
 * ```
 *
 * @example
 * Подпись с доп.подписью:
 * ```vue
 * <AppLabel forId="Email" descriptionId="1" required>
 *   Email
 * 
 *  <template #description>
 *    Description
 *  </template>
 * </AppLabel>
 * ```
 *
 * @slot default - Контент по умолчанию
 * @slot description - доп. подпись
 * @slot skeleton - Слот для skeleton'a
 */

import { mapLabelProps } from '@shared/ui/label/lib/map-props';
import type { ILabelProps } from '@shared/ui/label/types/label.types';
import { Label } from '@tatymusaeva/orbitto';


const props = defineProps<ILabelProps>();

defineOptions({
  name: 'AppLabel'
});

const mappedProps = mapLabelProps(props);

defineSlots<{
  default: () => any;
  description?: () => any;
  /**
   * Слот для кастомизации skeleton.
   * Родитель должен сам использовать AppSkeleton и передать нужные пропсы.
   */
  skeleton: () => any;
}>();
</script>

<template>
  <slot name="skeleton" v-if="loading" />
  <Label v-else v-bind="mappedProps">
    <slot></slot>

    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>
  </Label>
</template>