<script setup lang="ts">
import type { IconProps } from '@/components/Icon/types';

const props = withDefaults(defineProps<IconProps>(), {
  size: 'medium',
  color: undefined,
  ariaLabel: undefined,
})

const sizeMap = {
  small: {
    width: '0.37rem',
    height: '0.68rem',
  },
  medium: {
    width: '0.5rem',
    height: '0.8rem',
  },
  large: {
    width: '1.5rem',
    height: '1.5rem',
  },
}
</script>

<template>
  <svg
    :class="['otto-icon', `otto-icon--size-${size}`]"
    :style="{
      width: sizeMap[size].width,
      height: sizeMap[size].height,
      color,
    }"
    :role="ariaLabel ? 'img' : undefined"
    :aria-label="ariaLabel"
    :aria-hidden="ariaLabel ? undefined : 'true'"
  >
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style scoped>
.otto-icon {
  fill: currentColor;
  flex-shrink: 0;
  display: inline-block;
  pointer-events: none;
  transition: all ease 0.3s;
}

</style>