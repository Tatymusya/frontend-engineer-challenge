<script setup lang="ts">
/**
 * Универсальная ссылка
 *
 * Является обёрткой над `Orbitto.Link`, адаптирующей API библиотеки под внутренние стандарты проекта.
 * Поддерживает размеры 'sm', 'md', 'lg', различные стили (primary, secondary и др.) и стандартные события.
 *
 * @example
 * Простая кнопка:
 * ```vue
 * <AppLink variant="primary" size="md">Submit</AppLink>
 * ```
 *
 * @props
 * @property {'primary' | 'secondary'} [variant='primary'] - Визуальный стиль ссылки.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Размер ссылки.
 * @property {boolean} [disabled=false] - Блокирует ссылку и изменяет её внешний вид.
 * @property {string} [href='href'] - Адрес ссылки.
 * @property {'_blank' | '_self'} [target] - Цель открытия ссылки.
 * @property {string} [ariaLabel] - ARIA-метка для доступности.
 * @property {string} [rel] - Атрибут rel для управления безопасностью.
 * @property {boolean} [isUnderline] - Показывать подчёркивание.
 * @property {boolean} [loading] - Индикатор загрузки.
 * @property {string} [dataTestId] - Data-атрибут для тестов.
 *
 *
 * @slot default - Основной контент ссылки
 * @slot leftIcon - Слот для иконки слева от текста
 * @slot rightIcon - Слот для иконки справа от текста
 * @slot skeleton - Слот для skeleton'a
 */

import { mapLinkProps } from '@shared/ui/link/lib/map-props';
import type { LinkProps } from '@shared/ui/link/types/link.types';
import { Link } from '@tatymusaeva/orbitto';

const props = defineProps<LinkProps>();

defineOptions({
  name: 'AppLink'
});

const mappedProps = mapLinkProps(props);

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
  <Link v-else v-bind="mappedProps">
    <template v-if="$slots.leftIcon" #leftIcon>
      <slot name="leftIcon" />
    </template>
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
    <template v-if="$slots.rightIcon" #rightIcon>
      <slot name="rightIcon" />
    </template>
  </Link>
</template>