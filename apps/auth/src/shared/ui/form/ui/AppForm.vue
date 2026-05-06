<script setup lang="ts">
/**
 * @description
 * Универсальный компонент формы. Обёртка над `Orbitto.Form`, адаптированная под внутренние стандарты.
 *
 * Поддерживает валидацию, реактивные значения, события и интеграцию с внешними системами (например, Sentry).
 *
 * Используется как базовый строительный блок для всех форм в проекте.
 *
 * @props
 * @property {Record<string, any>} modelValue - Значения формы (двусторонняя привязка через `v-model`). Должен соответствовать структуре `{ поле: значение }`
 * @property {Record<string, IValidationRule[]>} [rules] - Правила валидации по полям. Если поле не проходит валидацию — отображается ошибка
 * @property {boolean} [disabled=false] - Блокирует форму и все её элементы управления
 * @property {boolean} [loading=false] - Режим загрузки (часто используется для кнопок в слоте `actions`)
 * @property {string} [id] - Уникальный ID формы. Используется для доступности (a11y), связывает с сообщением об ошибке
 * @property {boolean} [validateOnSubmit=true] - Автоматически валидировать форму при отправке
 * @property {boolean} [resetOnSubmit=false] - Очищать форму после успешной отправки
 * @property {string|number} [skeletonWidth] - Ширина скелетона (используется при `loading`). Применимо, если форма рендерится в режиме загрузки
 * @property {'sm'|'md'|'lg'} [size='md'] - Размер формы и её элементов
 * @property {'primary'|'secondary'|'outline'|'ghost'} [variant='primary'] - Вариант отображения (может влиять на вложенные компоненты)
 * @property {string} [class] - Дополнительный CSS-класс
 * @property {Record<string, string>|string} [style] - Инлайн-стили
 * @property {string} [dataTestId] - Data-атрибут для тестов.
 * 
 * @example
 * ```vue
 * <AppForm v-bind="formProps" />
 * ```
 *
 * @slot default - Контент по умолчанию
 * @slot legend - Заголовок формы
 * @slot actions - Блок с управляющими кнопками формы
 * @slot error - Сообщение об ошибке
 */

import type { IAppFormEmits, IFormProps } from '@shared/ui/form/types/form.types';
import { Form } from '@tatymusaeva/orbitto';

const props = defineProps<IFormProps>();

defineEmits<IAppFormEmits>();

defineOptions({
  name: 'AppForm'
});

defineSlots<{
  legend: () => any;
  error: () => any;
  default: () => any;
  actions: () => any;
}>();
</script>

<template>
  <Form v-bind="props">
    <template v-if="$slots.legend" #legend>
      <slot name="legend" />
    </template>
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>
  </Form>
</template>