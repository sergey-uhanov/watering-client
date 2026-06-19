<script setup lang="ts">
import { AppLayout } from '@/widgets/app-layout'
</script>

<template>
  <AppLayout>
    <section class="settings-page">
      <p class="settings-page__eyebrow">Настройки</p>
      <h1 class="settings-page__title">Параметры клиента</h1>
      <p class="settings-page__text">
        Здесь будет конфигурация подключения, устройства и пользовательских параметров полива.
      </p>
    </section>
  </AppLayout>
</template>

<style scoped lang="scss">
.settings-page {
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
    margin: 0 0 var(--space-md);
    font-size: clamp(30px, 5vw, 52px);
  }

  &__text {
    max-width: 620px;
    margin: 0;
    color: var(--color-muted);
  }
}
</style>
