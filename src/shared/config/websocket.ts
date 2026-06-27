export const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL
export const WEBSOCKET_CLIENT_ID = import.meta.env.VITE_WEBSOCKET_CLIENT_ID
export const WEBSOCKET_DEVICE_ID = import.meta.env.VITE_WEBSOCKET_DEVICE_ID
export const WEBSOCKET_RECONNECT_DELAY = Number(
  import.meta.env.VITE_WEBSOCKET_RECONNECT_DELAY,
)

export const WEBSOCKET_MESSAGE_TYPES = {
  register: 'register',
  esp32Online: 'esp32 is online',
  esp32Offline: 'esp32 is offline',
  ledOn: 'LED_ON',
  ledOff: 'LED_OFF',
  checkWaterline: 'CHECK_WATERLINE',
  sentFilterOn: 'FILTER_ON',
  sentFilterOff: 'FILTER_OFF',
} as const

export type WebSocketMessageType =
  (typeof WEBSOCKET_MESSAGE_TYPES)[keyof typeof WEBSOCKET_MESSAGE_TYPES]
