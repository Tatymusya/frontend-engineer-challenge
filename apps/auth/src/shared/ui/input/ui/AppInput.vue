<script setup lang="ts">
/**
 * @description
 * Универсальное поле формы с поддержкой иконок и сообщений об ошибках.
 *
 * Является обёрткой над `Orbitto.Input`, адаптирующей API библиотеки под внутренние стандарты проекта.
 * 
 * @props
 * @property {InputVariant} [variant='default'] - Визуальный стиль поля ввода
 * @property {string} [modelValue=''] - Значение поля (двусторонняя привязка через v-model)
 * @property {InputType} [type='text'] - HTML тип поля ввода
 * @property {InputSize} [size='medium'] - Размер поля
 * @property {string} [placeholder=''] - Текст-подсказка внутри поля
 * @property {boolean} [disabled=false] - Отключает поле ввода
 * @property {boolean} [valid] - Состояние валидации: если true — показывает успех
 * @property {string} [error] - Сообщение об ошибке. Если задано — отображает ошибку
 * @property {string} [id] - Уникальный идентификатор. Нужен для доступности (a11y), связывает label и поле
 * @property {boolean} [loading] - Индикатор загрузки.
 * @property {string} [dataTestId] - Data-атрибут для тестов.
 *
 * @example
 * Использование с меткой и текстом ошибки:
 * ```vue
 * <AppInput
 *   v-model="email"
 *   size="md"
 *   placeholder="Введите email"
 *   :err-txt="emailError"
 * >
 *   <template #label>
 *     <AppLabel forId="email">Email</AppLabel>
 *   </template>
 * </AppInput>
 * ```
 *
 * @example
 * Поле с иконками:
 * ```vue
 * <AppInput v-model="password" type="password">
 *   <template #leftIcon>
 *     <IconLock />
 *   </template>
 *   <template #rightIcon>
 *     <IconEyeToggle @click="togglePassword" />
 *   </template>
 * </AppInput>
 * ```
 *
 * @slot default - Контент по умолчанию (не используется напрямую, но необходим для совместимости)
 * @slot leftIcon - Иконка слева внутри поля
 * @slot label - Метка над или внутри поля (например, `AppLabel`)
 * @slot rightIcon - Иконка справа внутри поля
 * @slot errTxt - Кастомное сообщение об ошибке
 */

import { mapInputProps } from '@shared/ui/input/lib/map-props';
import type { IInputProps } from '@shared/ui/input/types/input.types';
import { Input } from '@tatymusaeva/orbitto';

const props = defineProps<IInputProps>();

defineOptions({
  name: 'AppInput'
});

const mappedProps = mapInputProps(props);

defineSlots<{
  leftIcon: () => any;
  label: () => any;
  rightIcon: () => any;
  error: () => any;
  /**
   * Слот для кастомизации skeleton.
   * Родитель должен сам использовать AppSkeleton и передать нужные пропсы.
   */
  skeleton: () => any;
}>();
</script>

<template>
  <slot name="skeleton" v-if="loading" />
  <Input v-else v-bind="mappedProps">
    <template v-if="$slots.leftIcon" #leftIcon>
      <slot name="leftIcon" />
    </template>
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <template v-if="$slots.rightIcon" #rightIcon>
      <slot name="rightIcon" />
    </template>
    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>
  </Input>
</template>