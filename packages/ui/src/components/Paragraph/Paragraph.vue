<script setup lang="ts">
import type { ParagraphProps } from '@/components/Paragraph/types';

withDefaults(defineProps<ParagraphProps>(), {
  as: 'p',
  size: 'medium',
  weight: 'regular',
  color: undefined,
  truncate: false,
  lineClamp: undefined,
  id: undefined,
})
</script>

<template>
  <component
    :is="as"
    :id="id"
    :class="[
      'otto-paragraph',
      `otto-paragraph--size-${size}`,
      `otto-paragraph--weight-${weight}`,
      truncate && 'otto-paragraph--truncate',
      lineClamp && `otto-paragraph--line-clamp-${lineClamp}`,
    ]"
    :style="{ color }"
  >
    <slot />
  </component>
</template>

<style scoped>
.otto-paragraph {
  font-family: 'Inter';
  transition: color 0.03s ease-in;
}

/** Размер шрифта **/
.otto-paragraph--size-large {
  font-size: 1.125rem;
  line-height: 160%;
}
.otto-paragraph--size-medium {
  font-size: 0.875rem;
  line-height: 160%;
}
.otto-paragraph--size-small {
  font-size: 0.75rem;
  line-height: 140%;
}

/** Насыщенность шрифта **/
.otto-paragraph--weight-regular {
  font-weight: 400;
}
.otto-paragraph--weight-medium  {
  font-weight: 500;
}
.otto-paragraph--weight-bold {
  font-weight: 700;
}

/** TRUNCATE **/
.otto-paragraph--truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.otto-paragraph--line-clamp-1,
.otto-paragraph--line-clamp-2,
.otto-paragraph--line-clamp-3,
.otto-paragraph--line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: v-bind('lineClamp');
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.otto-paragraph--line-clamp-1 {
  -webkit-line-clamp: 1;
}

.otto-paragraph--line-clamp-2 {
  -webkit-line-clamp: 2;
}

.otto-paragraph--line-clamp-3 {
  -webkit-line-clamp: 3;
}

.otto-paragraph--line-clamp-4 {
  -webkit-line-clamp: 4;
}
</style>