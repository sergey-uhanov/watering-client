<template>
  <footer class="app-footer">
    <span>Watering Client</span>
    <span>Локальная панель управления поливом</span>
  </footer>
</template>

<style scoped lang="scss">
.app-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-md);
  color: var(--color-muted);
  font-size: var(--font-size-sm);
}
</style>
