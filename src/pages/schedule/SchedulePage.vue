<script setup lang="ts">
import { storeToRefs } from 'pinia'


import { BaseButton, BaseCheckbox, BaseDatePicker, BaseRadioGroup } from '@/shared/ui'
import { AppLayout } from '@/widgets/app-layout'
import { useWateringStore } from "@/entities/pool"

const wateringStore = useWateringStore()
const { settings } = storeToRefs(wateringStore)

const modeOptions = [
  { label: 'Ручной режим', value: 'manual' },
  { label: 'По расписанию', value: 'schedule' },
] as const
</script>

<template>
  <AppLayout>
    <section class="schedule-page">
      <div>
        <p class="schedule-page__eyebrow">Расписание</p>
        <h1 class="schedule-page__title">Настройка запуска фильтрации</h1>
      </div>

      <form class="schedule-page__form">
        <BaseCheckbox
          :model-value="settings.enabled"
          @update:model-value="wateringStore.setEnabled"
        >
          Фильтрация включен
        </BaseCheckbox>

        <BaseRadioGroup
          :model-value="settings.mode"
          name="watering-mode"
          :options="[...modeOptions]"
          @update:model-value="wateringStore.setMode($event as 'manual' | 'schedule')"
        />

        <BaseDatePicker
          :model-value="settings.nextRunAt"
          label="Следующий запуск"
          @update:model-value="wateringStore.setNextRunAt"
        />

        <BaseButton type="button" variant="secondary">Сохранить локально</BaseButton>
      </form>
    </section>
  </AppLayout>
</template>

<style scoped lang="scss">
.schedule-page {
  display: grid;
  gap: var(--space-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: clamp(24px, 4vw, 40px);
  background: var(--color-surface);

  &__eyebrow {
    margin: 0 0 var(--space-sm);
    color: var(--color-primary);
    font-weight: 700;
  }

  &__title {
    margin: 0;
    font-size: clamp(30px, 5vw, 52px);
  }

  &__form {
    display: grid;
    max-width: 520px;
    gap: var(--space-lg);
  }
}
</style>
