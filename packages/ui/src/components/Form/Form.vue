<script setup lang="ts">
import { ref, provide } from 'vue'
import type { FormProps, FormEmits } from '@/components/Form/types';

const props = withDefaults(defineProps<FormProps>(), {
  id: undefined,
  validateOnSubmit: true,
  resetOnSubmit: false,
});

const emit = defineEmits<FormEmits>();

const isSubmitting = ref(false);
const isValid = ref(true);

provide('formContext', {
  isSubmitting,
  isValid,
});

const handleSubmit = (event: Event) => {
  emit('submit', event)
}

const handleReset = () => {
  emit('reset')
}
</script>

<template>
  <form
    class="otto-form"
    novalidate
    :aria-invalid="!isValid"
    :aria-describedby="!isValid && id ? `${id}-error` : undefined"
    @submit.prevent="handleSubmit"
    @reset="handleReset"
  >
    <fieldset :disabled="isSubmitting" class="otto-form__fieldset">
      <legend class="otto-form__legend" v-if="$slots.legend">
        <slot name="legend" />
      </legend>

      <!-- Общее сообщение об ошибке формы -->
      <div
        v-if="$slots.error"
        :id="id ? `${id}-error` : undefined"
        class="otto-form__error"
        role="alert"
        aria-live="assertive"
      >
        <slot name="error" />
      </div>

      <slot name="default" />

      <div class="otto-form__actions" v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
.otto-form {
  width: 100%;
}

.otto-form__fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

.otto-form__legend {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.otto-form__actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.2rem;
  justify-content: flex-end;
}

/** Error **/
.otto-form__error {
  padding-bottom: 1rem;
}

/** Disabled state **/
.otto-form__fieldset:disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>