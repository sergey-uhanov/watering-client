/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBSOCKET_URL: string
  readonly VITE_WEBSOCKET_CLIENT_ID: string
  readonly VITE_WEBSOCKET_DEVICE_ID: string
  readonly VITE_WEBSOCKET_RECONNECT_DELAY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
