<script setup lang="ts">
import BaseRadio from './BaseRadio.vue'

type RadioValue = string | number | boolean

defineProps<{
  modelValue: RadioValue
  name: string
  options: Array<{
    label: string
    value: RadioValue
    disabled?: boolean
  }>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: RadioValue]
}>()
</script>

<template>
  <div class="base-radio-group" role="radiogroup">
    <BaseRadio
      v-for="option in options"
      :key="String(option.value)"
      :model-value="modelValue"
      :value="option.value"
      :name="name"
      :label="option.label"
      :disabled="option.disabled"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.base-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}
</style>
