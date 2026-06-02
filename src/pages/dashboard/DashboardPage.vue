<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useWateringStore } from '@/entities/watering'
import { useAppWebSocket } from '@/shared/lib/websocket'
import { BaseButton } from '@/shared/ui'
import { AppLayout } from '@/widgets/app-layout'

const wateringStore = useWateringStore()
const { isDeviceOnline } = storeToRefs(wateringStore)
const { sendLedOn, sendLedOff } = useAppWebSocket()
</script>

<template>
  <AppLayout>
    <section class="dashboard-card">
      <div>
        <p class="dashboard-card__eyebrow">ESP32</p>
        <h1 class="dashboard-card__title">Панель управления поливом</h1>
      </div>

      <BaseButton :disabled="!isDeviceOnline" @click="sendLedOn">Включить LED</BaseButton>
      <BaseButton :disabled="!isDeviceOnline" @click="sendLedOff">Выключить LED</BaseButton>
    </section>
  </AppLayout>
</template>

<style scoped>
.dashboard-card {
  display: grid;
  gap: var(--space-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: clamp(24px, 5vw, 48px);
  background: var(--color-surface);
  box-shadow: 0 24px 80px rgba(31, 42, 36, 0.12);
}

.dashboard-card__eyebrow {
  margin: 0 0 var(--space-sm);
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.dashboard-card__title {
  max-width: 680px;
  margin: 0;
  font-size: clamp(34px, 7vw, 72px);
  line-height: 0.95;
}
</style>
