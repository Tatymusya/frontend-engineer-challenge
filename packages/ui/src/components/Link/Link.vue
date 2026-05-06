<script setup lang="ts">
import type { LinkProps } from '@/components/Link/types';

withDefaults(defineProps<LinkProps>(), {
  target: '_self',
  ariaLabel: undefined,
  rel: undefined,
  variant: 'primary',
  size: undefined,
  isUnderline: false,
  disabled: false,
})

defineOptions({ inheritAttrs: false });
</script>

<template>
  <a
    v-bind="$attrs"
    class="otto-link"
    :href="disabled ? undefined : href"
    :target="target"
    :aria-label="ariaLabel"
    :aria-disabled="disabled"
    :role="disabled ? 'link' : undefined"
    :tabindex="disabled ? -1 : undefined"
    :rel="rel || (target === '_blank' ? 'noopener noreferrer' : undefined)"
    :title="target === '_blank' ? 'Откроется в новой вкладке' : undefined"
    :class="[
      variant ? `link--${variant}` : '',
      size ? `link--size-${size}` : 'link--size-default',
      disabled && 'link--disabled',
      isUnderline && 'link--underline',
    ]"
  >
    <span v-if="$slots.leftIcon" class="link__icon link-icon link-icon--left">
      <slot name="leftIcon" />
    </span>
    <span class="link__text"><slot /></span>
    <span v-if="$slots.rightIcon" class="link__icon link-icon link-icon--right">
      <slot name="rightIcon" />
    </span>
  </a>
</template>

<style scoped>
.otto-link {
  font-family: 'Inter';
  text-decoration: none;
  transition: all ease 0.3s;
}

/** Размеры ссылки **/
.otto-link--size-default {
  font-size: inherit;
  line-height: inherit;
}

/** Стиль ссылки: подчеркнутая **/
.otto-link--underline {
  position: relative;
  
  &::before {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: var(--color-link-secondary);
    width: 100%;
    height: 1px;
  }

  &::after {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: var(--color-link-hover);
    width: 0;
    height: 1px;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
}

/** Вариант PRIMARY **/
.otto-link--primary:not(.otto-link--disabled) {
  &:link {
      color: var(--color-link);
  }

  &:hover {
      color: var(--color-link-hover);
  }

  &:active {
      color: var(--color-link-press);
  }
}

/** Вариант SECONDARY **/
.otto-link--secondary:not(.otto-link--disabled) {
  &:link {
      color: var(--color-link-secondary);
  }

  &:hover {
      color: var(--color-link-secondary-hover);
  }

  &:active {
      color: var(--color-link-secondary-press);
  }
}

/** DISABLED **/
.otto-link--disabled {
  color: var(--color-link-disabled);
  cursor: default;
}

/** Иконки **/
.otto-link-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.otto-link-icon--left {
  margin-right: 0.5em;
}

.otto-link-icon--right {
  margin-left: 0.5em;
}

/** Текст внутри ссылки **/
.otto-link__text {
  display: inline-flex;
  align-items: center;
}
</style>