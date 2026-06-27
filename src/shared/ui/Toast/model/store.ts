import { defineStore } from 'pinia'

export type ToastStatus = 'success' | 'warning' | 'error'

export type ToastItem = {
  id: number
  status: ToastStatus
  message: string
}

const DEFAULT_MESSAGES: Record<ToastStatus, string> = {
  success: 'Успешно',
  warning: 'Предупреждение',
  error: 'Ошибка',
}

let toastId = 0

export const useToastStore = defineStore('toast', {
  state: () => ({
    items: [] as ToastItem[],
  }),
  actions: {
    show(status: ToastStatus, message?: string) {
      const id = ++toastId

      this.items.push({
        id,
        status,
        message: message?.trim() || DEFAULT_MESSAGES[status],
      })

      window.setTimeout(() => {
        this.remove(id)
      }, 5000)
    },
    remove(id: number) {
      this.items = this.items.filter((item) => item.id !== id)
    },
  },
})
