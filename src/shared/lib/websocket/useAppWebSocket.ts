import { useWebSocket } from '@vueuse/core'
import type { UseWebSocketReturn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, effectScope, ref, watch } from 'vue'


import {
  WEBSOCKET_CLIENT_ID,
  WEBSOCKET_DEVICE_ID,
  WEBSOCKET_MESSAGE_TYPES,
  WEBSOCKET_RECONNECT_DELAY,
  WEBSOCKET_URL,
} from '@/shared/config/websocket'
import {useWateringStore} from "@/entities/pool";

let socket: UseWebSocketReturn<unknown> | null = null
const socketScope = effectScope(true)
let stopStatusWatcher: (() => void) | null = null
let stopDataWatcher: (() => void) | null = null
const reconnectTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const clearReconnectTimer = () => {
  if (!reconnectTimer.value) return

  clearTimeout(reconnectTimer.value)
  reconnectTimer.value = null
}

const parseServerMessage = (value: unknown) => {
  if (typeof value !== 'string' || !value) return null

  try {
    return JSON.parse(value) as { type?: string }
  } catch {
    return null
  }
}

export const useAppWebSocket = () => {
  const wateringStore = useWateringStore()
  const { isDeviceOnline, isSocketOpen } = storeToRefs(wateringStore)

  if (!socket) {
    socket = useWebSocket(WEBSOCKET_URL, {
      autoClose: false,
      autoReconnect: false,
    })
  }

  if (!stopStatusWatcher) {
    socketScope.run(() => {
      console.log('ws running watcher')
      stopStatusWatcher = watch(
        socket!.status,
        (value) => {
          wateringStore.setSocketStatus(value)

          if (value === 'CLOSED') {
            if (reconnectTimer.value) return

            reconnectTimer.value = setTimeout(() => {
              reconnectTimer.value = null
              socket?.open()
            }, WEBSOCKET_RECONNECT_DELAY)
          }

          if (value === 'OPEN') {
            clearReconnectTimer()
            socket?.send(
              JSON.stringify({
                type: WEBSOCKET_MESSAGE_TYPES.register,
                clientId: WEBSOCKET_CLIENT_ID,
              }),
            )
          }
        },
        { immediate: true },
      )
    })
  }

  if (!stopDataWatcher) {
    socketScope.run(() => {
      stopDataWatcher = watch(socket!.data, (value) => {
        const message = parseServerMessage(value)

        if (!message) {
          if (value) wateringStore.setError('Получено некорректное сообщение от сервера')
          return
        }

        wateringStore.setError(null)

        switch (message.type) {
          case WEBSOCKET_MESSAGE_TYPES.esp32Online:
            wateringStore.setDeviceStatus('online')
            break
          case WEBSOCKET_MESSAGE_TYPES.esp32Offline:
            wateringStore.setDeviceStatus('offline')
            break
        }
      })
    })
  }

  const sendMessage = (message: Record<string, unknown>) => {
    socket?.send(JSON.stringify(message))
  }

  const sendLedOn = () => {
    sendMessage({
      type: WEBSOCKET_MESSAGE_TYPES.ledOn,
      deviceId: WEBSOCKET_DEVICE_ID,
    })
  }

  const sendLedOff = () => {
    sendMessage({
      type: WEBSOCKET_MESSAGE_TYPES.ledOff,
      deviceId: WEBSOCKET_DEVICE_ID,
    })
  }

  return {
    status: computed(() => socket?.status.value ?? 'CLOSED'),
    data: computed(() => socket?.data.value ?? null),
    isDeviceOnline,
    isSocketOpen,
    open: () => socket?.open(),
    close: () => socket?.close(),
    sendMessage,
    sendLedOn,
    sendLedOff,
  }
}
