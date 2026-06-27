<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useToastStore } from './model/store'

const toastStore = useToastStore()
const { items } = storeToRefs(toastStore)
</script>

<template>
  <Teleport to="body">
    <TransitionGroup name="base-toast" tag="div" class="base-toast" aria-live="polite">
      <div
        v-for="item in items"
        :key="item.id"
        class="base-toast__item"
        :class="`base-toast__item--${item.status}`"
        role="status"
      >
        <span class="base-toast__marker" aria-hidden="true" />
        <p class="base-toast__message">{{ item.message }}</p>
        <button
          class="base-toast__close"
          type="button"
          aria-label="Закрыть уведомление"
          @click="toastStore.remove(item.id)"
        >
          x
        </button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped lang="scss">
.base-toast {
  position: fixed;
  z-index: 1000;
  right: 24px;
  bottom: 24px;
  display: grid;
  width: min(360px, calc(100vw - 32px));
  gap: var(--space-sm);
}

.base-toast__item {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) 28px;
  align-items: center;
  gap: var(--space-sm);
  min-height: 56px;
  border: 1px solid;
  border-radius: var(--radius-sm);
  padding: 10px 10px 10px 14px;
  color: var(--color-text);
  box-shadow: 0 14px 36px rgba(31, 42, 36, 0.16);
}

.base-toast__item--success {
  border-color: #8cc6a5;
  background: #edf8f1;
}

.base-toast__item--warning {
  border-color: #e6bf5f;
  background: #fff6d8;
}

.base-toast__item--error {
  border-color: #dc8a7f;
  background: #fff0ed;
}

.base-toast__marker {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.base-toast__item--success .base-toast__marker {
  background: #2f8f5d;
}

.base-toast__item--warning .base-toast__marker {
  background: #c48713;
}

.base-toast__item--error .base-toast__marker {
  background: var(--color-danger);
}

.base-toast__message {
  min-width: 0;
  margin: 0;
  overflow-wrap: anywhere;
  font-size: var(--font-size-sm);
  font-weight: 700;
  line-height: 1.35;
}

.base-toast__close {
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--radius-sm);
  color: var(--color-muted);
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}

.base-toast__close:hover {
  color: var(--color-text);
  background: rgba(31, 42, 36, 0.08);
}

.base-toast-enter-active,
.base-toast-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.base-toast-enter-from,
.base-toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 640px) {
  .base-toast {
    right: 16px;
    bottom: 16px;
  }
}
</style>
