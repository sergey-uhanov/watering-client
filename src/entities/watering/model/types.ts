export type DeviceConnectionStatus = 'online' | 'offline'
export type WateringMode = 'manual' | 'schedule'

export interface WateringSettings {
  enabled: boolean
  mode: WateringMode
  nextRunAt: Date | string | null
}
