<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'danger'
type ButtonType = 'button' | 'submit' | 'reset'

withDefaults(
  defineProps<{
    variant?: ButtonVariant
    type?: ButtonType
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
    loading: false,
  },
)
</script>

<template>
  <button
    class="base-button"
    :class="[`base-button--${variant}`, { 'base-button--loading': loading }]"
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading"
  >
    <span v-if="loading" class="base-button__loader" aria-hidden="true" />
    <slot />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  padding: 0 var(--space-lg);
  cursor: pointer;
  font-weight: 700;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.58;
  }

  &--primary {
    color: #fff;
    background: var(--color-primary);

    &:hover:not(:disabled) {
      background: var(--color-primary-hover);
    }
  }

  &--secondary {
    color: var(--color-text);
    border-color: var(--color-border);
    background: var(--color-surface);
  }

  &--danger {
    color: #fff;
    background: var(--color-danger);

    &:hover:not(:disabled) {
      background: var(--color-danger-hover);
    }
  }

  &__loader {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: button-spin 800ms linear infinite;
  }
}

@keyframes button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
