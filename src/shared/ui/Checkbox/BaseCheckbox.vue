<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean
    label?: string
    disabled?: boolean
  }>(),
  {
    label: '',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label class="base-checkbox" :class="{ 'base-checkbox--disabled': disabled }">
    <input
      class="base-checkbox__input"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span class="base-checkbox__box" aria-hidden="true" />
    <span v-if="label || $slots.default" class="base-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.base-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  color: var(--color-text);
}

.base-checkbox--disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

.base-checkbox__input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.base-checkbox__box {
  width: 22px;
  height: 22px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  transition:
    background-color 160ms ease,
    border-color 160ms ease;
}

.base-checkbox__input:checked + .base-checkbox__box {
  border-color: var(--color-primary);
  background:
    linear-gradient(135deg, transparent 42%, #fff 0 58%, transparent 0),
    linear-gradient(45deg, transparent 48%, #fff 0 62%, transparent 0), var(--color-primary);
}

.base-checkbox__input:focus-visible + .base-checkbox__box {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}
</style>
