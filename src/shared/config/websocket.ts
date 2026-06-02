export const WEBSOCKET_URL = 'http://localhost:8082'
export const WEBSOCKET_CLIENT_ID = 'frontend-admin'
export const WEBSOCKET_DEVICE_ID = 'esp-32'
export const WEBSOCKET_RECONNECT_DELAY = 5000

export const WEBSOCKET_MESSAGE_TYPES = {
  register: 'register',
  esp32Online: 'esp32 is online',
  esp32Offline: 'esp32 is offline',
  ledOn: 'LED_ON',
  ledOff: 'LED_OFF',
} as const

export type WebSocketMessageType =
  (typeof WEBSOCKET_MESSAGE_TYPES)[keyof typeof WEBSOCKET_MESSAGE_TYPES]
