<script setup lang="ts">
import {storeToRefs} from 'pinia'


import {useAppWebSocket} from '@/shared/lib/websocket'
import {BaseButton} from '@/shared/ui'
import {AppLayout} from '@/widgets/app-layout'
import {useWateringStore} from "@/entities/pool";

const wateringStore = useWateringStore()
const {isDeviceOnline} = storeToRefs(wateringStore)
const {sendLedOn, sendLedOff, checkWaterline,sendFilterOn,sendFilterOff} = useAppWebSocket()
</script>

<template>
  <AppLayout>
    <section class="dashboard-card">
      <div>
        <h1 class="dashboard-card__title">Панель управления бассейном</h1>
      </div>
     <div class="dashboard-card__panels">
       <div class="dashboard-card__panel-change">
         <BaseButton :disabled="true" @click="checkWaterline">Замер уровня воды</BaseButton>
         <BaseButton :disabled="!isDeviceOnline" @click="sendFilterOn">Включить фильтр</BaseButton>
         <BaseButton :disabled="!isDeviceOnline" @click="sendFilterOff">Отключить фильтр</BaseButton>
       </div>
       <div class="dashboard-card__panel-information">
         <article class="dashboard-card__info-item">
           <span class="dashboard-card__info-label">Уровень воды</span>
           <strong class="dashboard-card__info-value">42 см</strong>
         </article>
         <article class="dashboard-card__info-item">
           <span class="dashboard-card__info-label">Температура воды</span>
           <strong class="dashboard-card__info-value">24 °C</strong>
         </article>
         <article class="dashboard-card__info-item">
           <span class="dashboard-card__info-label">Влажность</span>
           <strong class="dashboard-card__info-value">68%</strong>
         </article>
       </div>
     </div>

    </section>
  </AppLayout>
</template>

<style lang="scss">
.dashboard-card {
  display: grid;
  gap: var(--space-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: clamp(24px, 5vw, 48px);
  background: var(--color-surface);
  box-shadow: 0 24px 80px rgba(31, 42, 36, 0.12);

  &__eyebrow {
    margin: 0 0 var(--space-sm);
    color: var(--color-primary);
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  &__title {
    max-width: 680px;
    margin: 0;
    font-size: clamp(16px, 7vw, 35px);
    line-height: 0.95;
  }

  &__panels{
    display: grid;
    grid-template-columns: minmax(200px, 700px) minmax(200px, 1fr);
    gap: 16px;

    @media (max-width: 576px) {
      display: flex;
      flex-direction: column-reverse;
    }
  }

  &__panel-change{
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__panel-information {
    display: grid;
    grid-template-columns: minmax(180px, 1fr);
    gap: var(--space-md);
  }

  &__info-item {
    display: grid;
    gap: var(--space-xs);
    min-height: 112px;
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--color-surface) 92%, var(--color-primary));
  }

  &__info-label {
    color: var(--color-text-muted);
    font-size: 14px;
    font-weight: 600;
  }

  &__info-value {
    align-self: end;
    color: var(--color-primary);
    font-size: clamp(28px, 5vw, 42px);
    line-height: 1;
  }
}
</style>
