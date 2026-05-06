<script setup lang="ts">
/**
 * Универсальный скелетон-загрузчик
 *
 * Является обёрткой над `Orbitto.Skeleton`, адаптирующей API библиотеки под внутренние стандарты проекта.
 * Используется для отображения заглушки во время загрузки контента.
 *
 * @example
 * Простой прямоугольный скелетон:
 * ```vue
 * <AppSkeleton width="200px" height="20px" />
 * ```
 *
 * @example
 * Скелетон круглой формы (например, аватар):
 * ```vue
 * <AppSkeleton shape="circle" width="48px" height="48px" />
 * ```
 *
 * @example
 * Анимированный скелетон:
 * ```vue
 * <AppSkeleton animated width="100%" height="12px" />
 * ```
 *
 * @props
 * @property {'rect' | 'circle' | 'text' | 'avatar' | 'button'} [shape='rect'] - Форма скелетона.
 * @property {string} [width] - Ширина скелетона (например, '100%', '200px').
 * @property {string} [height] - Высота скелетона.
 * @property {string} [radius] - Радиус скругления.
 * @property {boolean} [animated=true] - Включить волновую анимацию загрузки.
 * @property {string} [ariaLabel] - ARIA-метка.
 *
 * @slot default - Не используется. Компонент сам отрисовывает заглушку.
 */

import type { ISkeletonProps } from '@shared/ui/skeleton/types/skeleton.types';
import { Skeleton } from '@tatymusaeva/orbitto';

const props = defineProps<ISkeletonProps>();

defineOptions({
  name: 'AppSkeleton'
});

</script>

<template>
  <Skeleton v-bind="props" />
</template>