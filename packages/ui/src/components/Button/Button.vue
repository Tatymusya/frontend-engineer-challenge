<template>
  <button
    :class="[
      'otto-btn',
      `otto-btn--${variant}`,
      `otto-btn--size-${size}`,
      {
        'otto-btn--disabled': isDisabled,
      },
    ]"
    :disabled="isDisabled"
    :aria-label="ariaLabel"
    :aria-busy="loading"
    :type="type"
    @click="handleClick"
  >
    <!-- Контент кнопки (скрыт при loading) -->
    <template v-else>
      <!-- Левая иконка -->
      <span v-if="$slots.leftIcon" class="otto-btn__icon otto-btn__icon--left">
        <slot name="leftIcon" />
      </span>

      <!-- Текст -->
      <slot />

      <!-- Правая иконка -->
      <span v-if="$slots.rightIcon" class="otto-btn__icon otto-btn__icon--right">
        <slot name="rightIcon" />
      </span>
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonProps, ButtonEmits } from '@/components/Button/types';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'large',
  disabled: false,
  ariaLabel: undefined,
  type: 'button',
});

const emit = defineEmits<ButtonEmits>();

/**
 * Кнопка отключена если disabled=true ИЛИ loading=true
 */
const isDisabled = computed(() => props.disabled);

/**
 * Обработка клика с защитой от loading/disabled
 */
const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) {
    emit('click', event)
  }
}
</script>

<style scoped>
.otto-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  font-family: 'Inter';
  font-size: 0.87rem;
  font-weight: 500;
  line-height: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.otto-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/** Иконки **/
.otto-btn__icon {
  display: inline-flex;
  align-items: center;
}

/** Вариант PRIMARY **/
.otto-btn--primary {
  background-color: var(--color-button-primary);
  color: var(--color-button-primary-text);
}

.otto-btn--primary:hover:not(:disabled) {
  background-color: var(--color-button-primary-hover);
}

.otto-btn--primary:active:not(:disabled) {
  background-color: var(--color-button-primary-active);
}

.otto-btn--primary:disabled {
  background-color: var(--color-button-primary-disabled);
}

/** Вариант SECONDARY **/
.otto-btn--secondary {
  background-color: var(--color-button-secondary);
  color: var(--color-button-secondary-text);
}

.otto-btn--secondary:hover:not(:disabled) {
  background-color: var(--color-button-secondary-hover);
}

.otto-btn--secondary:active:not(:disabled) {
  background-color: var(--color-button-secondary-active);
}

.otto-btn--secondary:disabled {
  background-color: var(--color-button-secondary-disabled);
  color: var(--color-button-secondary-text-disabled);
}

/** Размеры кнопок **/
.otto-btn--size-small {
  min-height: 1.5rem;
  padding: 0.375rem 0.75rem;
}

.otto-btn--size-medium {
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
}

.otto-btn--size-large {
  min-height: 3rem;
  padding: 0.75rem 1.25rem;
}
</style>
