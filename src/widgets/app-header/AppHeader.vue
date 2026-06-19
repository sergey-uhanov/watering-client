<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {useWateringStore} from "@/entities/pool";


const navItems = [
  { to: '/', label: 'Панель' },
  { to: '/schedule', label: 'Расписание' },
  { to: '/settings', label: 'Настройки' },
]

const wateringStore = useWateringStore()
const { deviceStatus, socketStatus, isDeviceOnline, isSocketOpen } = storeToRefs(wateringStore)
</script>

<template>
  <header class="app-header">
    <div class="app-header__top">
      <RouterLink class="app-header__brand" to="/">Watering Client</RouterLink>
      <div class="app-header__statuses" aria-label="Статусы подключения">
        <span class="app-header__status" :class="{ 'app-header__status--online': isSocketOpen }">
          <span class="app-header__dot" aria-hidden="true" />
          Сервер: {{ socketStatus === 'OPEN' ? 'Online' : 'Offline'}}
        </span>
        <span class="app-header__status" :class="{ 'app-header__status--online': isDeviceOnline }">
          <span class="app-header__dot" aria-hidden="true" />
          ESP32: {{ deviceStatus === 'online' ? 'Online' : 'Offline' }}
        </span>
      </div>
      <nav class="app-header__nav" aria-label="Основная навигация">
        <RouterLink v-for="item in navItems" :key="item.to" class="app-header__link" :to="item.to">
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  display: grid;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  border: 1px solid rgba(216, 201, 170, 0.78);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  background: rgba(255, 250, 240, 0.78);
  backdrop-filter: blur(16px);

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
  }

  &__brand {
    font-size: var(--font-size-lg);
    font-weight: 700;
    text-decoration: none;
  }

  &__nav,
  &__statuses {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  &__link {
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-md);
    color: var(--color-muted);
    text-decoration: none;

    &.router-link-active {
      color: #fff;
      background: var(--color-primary);
    }
  }

  &__status {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    border: 1px solid var(--color-border);
    border-radius: 999px;
    padding: var(--space-sm) var(--space-md);
    color: var(--color-danger);
    background: #fff;
    font-size: var(--font-size-sm);
    font-weight: 700;

    &--online {
      color: var(--color-primary);
    }
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  }
}

@media (max-width: 720px) {
  .app-header {
    &__top {
      align-items: flex-start;
      flex-direction: column;
    }
  }
}
</style>
