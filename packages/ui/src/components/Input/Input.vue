<template>
  <div
    :class="[
      'otto-input',
      variant && `otto-input--${variant}`,
      size && `otto-input--size-${size}`,
      disabled && 'otto-input--disabled',
      filled && 'otto-input--filled',
      valid && 'otto-input--valid', 
      error && 'otto-input--error',
      $slots.leftIcon && 'otto-input--with-left-icon',
      $slots.rightIcon && 'otto-input--with-right-icon',
    ]"
  >
    <span v-if="$slots.label" class="otto-input__label-wrap">
      <slot name="label" />
    </span>
      <span v-if="$slots.leftIcon" class="otto-input__icon otto-input__icon--left">
        <slot name="leftIcon" />
      </span>
      <input
        class="otto-input__field"
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-describedby="error && id ? `${id}-error` : undefined"
        :aria-invalid="!!error"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <span v-if="$slots.rightIcon" class="otto-input__icon otto-input__icon--right">
        <slot name="rightIcon" />
      </span>

    <span v-if="error" :id="id ? `${id}-error` : undefined" class="otto-input__error">
      <slot name="error" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InputProps, InputEmits } from '@/components/Input/types';

const props = withDefaults(defineProps<InputProps>(), {
  variant: 'infold',
  size: 'large',
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  valid: false,
  error: '',
})

defineEmits<InputEmits>()

const filled = computed(() => {
  return props.modelValue !== '' 
    && props.modelValue !== undefined
    && props.modelValue !== null
    && props.modelValue.trim() !== '';
});

</script>

<style scoped>
.otto-input {
  display: flex;
  position: relative;
  flex-direction: column;
}

/** Размеры кнопки **/
.otto-input--size-large {
  height: 3.5rem;
}

.otto-input--size-medium {
  height: 3rem;
}

.otto-input--size-small {
  height: 2.5rem;
}

/** Кнопка с иконкой **/
.otto-input--with-left-icon {
  padding-left: 2.5rem;
}

.otto-input--with-right-icon {
  padding-right: 2.5rem;
}

/** Вариант кнопки INFOLD **/
.otto-input--infold {
  justify-content: center;
  gap: 0.25rem;

  &::before {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    content: '';
    display: block;
    background-color: var(--color-border-infold);
  }

  &::after {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 1px;
    content: '';
    display: block;
    opacity: 0;
    transition: width 0.35s ease-in-out, opacity 0.3s ease;
  }

  &:not(.otto-input--error)::after,
  &.otto-input--valid::after {
    background-color: var(--color-border-infold-valid);
  }
}

/** SLOT ICONS **/
.otto-input__icon {
  position: absolute;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
}

.otto-input__icon--right {
  right: 0;
}

.otto-input__icon--left {
  left: 0;
}

.otto-input--size-large .otto-input__icon {
  height: 3.5rem;
}

.otto-input--size-medium .otto-input__icon {
  height: 3rem;
}

.otto-input--size-small .otto-input__icon {
  height: 2.5rem;
}

/** LABEL WRAP **/

/* infold */
.otto-input--infold .otto-input__label-wrap {
  opacity: 0;
  height: 0;
  color: var(--color-border-infold-label-text);
  transition: all 0.3s ease;
  font-size: 0.75rem;
  line-height: 100%;
  will-change: height, opacity;
}

.otto-input--infold:not(.otto-input--filled):focus-within .otto-input__label-wrap,
.otto-input--infold.otto-input--filled .otto-input__label-wrap {
  opacity: 1;
  height: 0.75rem;
}

.otto-input--infold:focus-within::after,
.otto-input--infold.otto-input--filled::after {
  width: 100%;
  opacity: 1;
}

/** INPUT FIELD **/
.otto-input__field {
  display: flex;
}

.otto-input--infold .otto-input__field {
  align-items: flex-end;
  border: none;
  font-size: 0.93rem;
  line-height: 160%;
  transition: height 0.3s ease;
  will-change: height;
}

.otto-input--infold .otto-input__field:focus {
  outline: none;
}

.otto-input--infold:not(.otto-input--filled).otto-input--size-large .otto-input__field:focus {
  height: 1.5rem;
}

.otto-input--infold .otto-input__field:disabled {
  background-color: var(--color-infold-disabled-field);
  cursor: not-allowed;
}


/** INPUT ERROR + INPUT UNVALID **/
/* default */
.otto-input--error::after {
  background-color: var(--color-error);
  width: 100%;
  opacity: 1;
}

.otto-input__error {
  display: inline-flex;
  padding-top: 1rem;
  transition: opacity 0.3s ease;
}

.otto-input--disabled {
  cursor: not-allowed;
}

.otto-input--disabled .otto-input__field {
  background: transparent;
  cursor: not-allowed;
}

/* infold */
.otto-input--infold.otto-input--error .otto-input__error {
  position: absolute;
  left: 0;
  bottom: -1.2rem;
  transition: left 0.3s ease;
}

.otto-input--infold.otto-input--disabled {
  background: var(--color-infold-disabled);
}

.otto-input--infold.otto-input--disabled::after {
  background-color: var(--color-infold-disabled-border);
}
</style>
