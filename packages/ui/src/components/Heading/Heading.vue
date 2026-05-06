<script setup lang="ts">
import type { HeadingProps } from '@/components/Heading/types';

withDefaults(defineProps<HeadingProps>(), {
  lv: 'h1',
  weight: 'medium',
  color: undefined,
  truncate: false,
  lineClamp: undefined,
  id: undefined,
  ariaLabel: undefined,
})
</script>

<template>
  <component
    :is="lv"
    :id="id"
    :class="[
      'otto-heading',
      `otto-heading--weight-${weight}`,
      truncate && 'otto-heading--truncate',
      lineClamp && `otto-heading--line-clamp-${lineClamp}`,
    ]"
    :style="{ color }"
    :aria-label="$slots.default ? undefined : ariaLabel"
  >
    <slot />
  </component>
</template>

<style scoped>
.otto-heading {
  font-family: 'Inter';
  margin-bottom: 1.5rem;
  color: var(--color-text-primary);
}

/** Уровень заголовка **/
.otto-heading--level-h1 {
  font-size: 2rem;
  line-height: 120%;
}

.otto-heading--level-h2 {
  font-size: 1.8rem;
  line-height: 120%;
}

.otto-heading--level-h3 {
  font-size: 1.6rem;
  line-height: 120%;
}

.otto-heading--level-h4 {
  font-size: 1.4rem;
  line-height: 120%;
}

.otto-heading--level-h5 {
  font-size: 1.2rem;
  line-height: 100%;
}

.otto-heading--level-h6 {
  font-size: 1rem;
  line-height: 100%;
}

/** Насыщенность шрифта заголовка **/
.otto-heading--weight-regular {
  font-weight: 400;
}

.otto-heading--weight-medium {
  font-weight: 500;
}

.otto-heading--weight-bold {
  font-weight: 700;
}

/** Truncate(1 line) **/
.otto-heading--truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/** Line Clamp **/
.otto-heading--line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.otto-heading--line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.otto-heading--line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>