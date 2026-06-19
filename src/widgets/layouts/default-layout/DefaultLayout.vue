<script setup lang="ts">
import { useAppWebSocket } from '@/shared/lib/websocket'
import { AppFooter } from '@/widgets/app-footer'
import { AppHeader } from '@/widgets/app-header'

useAppWebSocket()
</script>

<template>
  <div class="default-layout">
    <AppHeader />
    <main class="default-layout__main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss">
.default-layout {
  width: min(1120px, calc(100% - 32px));
  padding: 0 15px;
  margin: 0 auto;

  &__main {
    display: grid;
    gap: var(--space-lg);
  }
}
</style>
