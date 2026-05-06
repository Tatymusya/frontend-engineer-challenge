<script setup lang="ts">
import type { SkeletonProps } from '@/components/Skeleton/types';

withDefaults(defineProps<SkeletonProps>(), {
  shape: 'rect',
  width: '100%',
  height: '0.875rem',
  radius: undefined,
  animated: true,
  ariaLabel: undefined,
})
</script>

<template>
  <span
    :class="[
      'otto-skeleton',
      `otto-skeleton--shape-${shape}`,
      animated && 'otto-skeleton--animated',
    ]"
    :style="{
      width,
      height,
      borderRadius: shape === 'rect' ? radius : undefined,
    }"
    :aria-label="ariaLabel"
    :aria-hidden="ariaLabel ? undefined : 'true'"
    :role="ariaLabel ? 'img' : undefined"
  />
</template>

<style scoped>
.otto-skeleton {
  display: inline-flex;
  background: var(--color-skeleton);
  position: relative;
  overflow: hidden;
}

/** Анимации **/
.otto-skeleton--animated::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--color-skeleton-animated), transparent);
  animation: pulse 1.3s infinite;
}

@keyframes pulse {
  0% { left: -100%; }
  100% { left: 100%; }
}

/** Форма **/
.otto-skeleton--shape-circle {
  border-radius: 50%;
}

.otto-skeleton--shape-avatar {
  border-radius: 0.5rem;
}

.otto-skeleton--shape-button {
  border-radius: 0.5rem;
}

.otto-skeleton--shape-text {
  height: 0.875em;
  border-radius: 0.25rem;
}
</style>