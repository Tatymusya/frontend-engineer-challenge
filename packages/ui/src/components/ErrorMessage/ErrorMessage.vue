<script setup lang="ts">
import type { ErrorMessageProps } from '@/components/ErrorMessage/types';

withDefaults(defineProps<ErrorMessageProps>(), {
  id: undefined,
  message: undefined,
  size: 'medium',
  weight: 'regular',
  color: undefined,
})
</script>

<template>
  <strong
    :id="id"
    :class="[
      'otto-error-message',
      `otto-error-message--size-${size}`,
      `otto-error-message--weight-${weight}`,
    ]"
    :style="{ color }"
    role="alert"
    aria-live="assertive"
  >
    <slot>{{ message }}</slot>
  </strong>
</template>

<style scoped>
.otto-error-message {
  color: var(--color-error);
}

/** Размеры **/
.otto-error-message--size-small {
  font-size: 0.68rem;
  line-height: 100%;
}

.otto-error-message--size-medium {
  font-size: 0.75rem;
  line-height: 100%;
}
/** Насыщенность шрифта **/
.otto-error-message--weight-regular {
  font-weight: 400;
}

.otto-error-message--weight-medium {
  font-weight: 500;
}
</style>