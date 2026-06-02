<script setup lang="ts">
import { BaseButton } from '@/shared/ui'
import { AppLayout } from '@/widgets/app-layout'
</script>

<template>
  <AppLayout>
    <section class="not-found-page">
      <p class="not-found-page__code">404</p>
      <h1 class="not-found-page__title">Страница не найдена</h1>
      <RouterLink to="/">
        <BaseButton>Вернуться на главную</BaseButton>
      </RouterLink>
    </section>
  </AppLayout>
</template>

<style scoped>
.not-found-page {
  display: grid;
  justify-items: start;
  gap: var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: clamp(24px, 4vw, 40px);
  background: var(--color-surface);
}

.not-found-page__code {
  margin: 0;
  color: var(--color-primary);
  font-size: 80px;
  font-weight: 700;
  line-height: 1;
}

.not-found-page__title {
  margin: 0;
}
</style>
