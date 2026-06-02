<script setup lang="ts">
type RadioValue = string | number | boolean

withDefaults(
  defineProps<{
    modelValue: RadioValue
    value: RadioValue
    name?: string
    label?: string
    disabled?: boolean
  }>(),
  {
    name: '',
    label: '',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: RadioValue]
}>()
</script>

<template>
  <label class="base-radio" :class="{ 'base-radio--disabled': disabled }">
    <input
      class="base-radio__input"
      type="radio"
      :name="name"
      :value="String(value)"
      :checked="modelValue === value"
      :disabled="disabled"
      @change="emit('update:modelValue', value)"
    />
    <span class="base-radio__circle" aria-hidden="true" />
    <span v-if="label || $slots.default" class="base-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.base-radio {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
}

.base-radio--disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

.base-radio__input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.base-radio__circle {
  width: 22px;
  height: 22px;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-surface);
  box-shadow: inset 0 0 0 5px var(--color-surface);
  transition:
    background-color 160ms ease,
    border-color 160ms ease;
}

.base-radio__input:checked + .base-radio__circle {
  border-color: var(--color-primary);
  background: var(--color-primary);
}

.base-radio__input:focus-visible + .base-radio__circle {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}
</style>
