<script setup lang="ts">
import type { LabelProps } from '@/components/Label/types';

withDefaults(defineProps<LabelProps>(), {
  required: false,
  descriptionId: undefined,
  color: undefined,
})
</script>

<template>
  <label :for="forId" class="otto-label" :style="{ color }">
    <span class="otto-label__text">
      <slot />
      <span v-if="required" class="otto-label__required" aria-hidden="true">*</span>
    </span>

    <span
      v-if="$slots.description"
      :id="descriptionId"
      class="otto-label__description"
    >
      <slot name="description" />
    </span>
  </label>
</template>

<style scoped>
.otto-label {
  display: block;
  font-family: 'Inter';
  transition: all 0.3s ease;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 100%;
  transition: color 0.03s ease-in;
}

.otto-label__text {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.otto-label__required {
  color: var(--color-error);
  font-size: 1.125em;
}

.otto-label__description {
  display: block;
  font-size: 0.65rem;
  font-weight: 400;
  color: var(--color-text-secondary);
  margin-top: 0.2rem;
}
</style>