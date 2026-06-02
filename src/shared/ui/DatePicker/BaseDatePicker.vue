<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ru } from 'date-fns/locale'

withDefaults(
  defineProps<{
    modelValue: Date | string | null
    label?: string
    disabled?: boolean
    placeholder?: string
  }>(),
  {
    label: '',
    disabled: false,
    placeholder: 'Выберите дату',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: Date | string | null]
}>()
</script>

<template>
  <label class="base-date-picker">
    <span v-if="label" class="base-date-picker__label">{{ label }}</span>
    <VueDatePicker
      :model-value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :locale="ru"
      auto-apply
      @update:model-value="emit('update:modelValue', $event)"
    />
  </label>
</template>

<style scoped>
.base-date-picker {
  display: grid;
  gap: var(--space-sm);
}

.base-date-picker__label {
  color: var(--color-muted);
  font-size: var(--font-size-sm);
  font-weight: 700;
}

:deep(.dp__input) {
  border-color: var(--color-border);
  border-radius: var(--radius-md);
  padding-block: 10px;
}

:deep(.dp__input:focus) {
  border-color: var(--color-focus);
}
</style>
