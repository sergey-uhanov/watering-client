import { defineStore } from 'pinia'

import type { DeviceConnectionStatus, WateringMode, WateringSettings } from './types'

export const useWateringStore = defineStore('watering', {
  state: () => ({
    deviceStatus: 'offline' as DeviceConnectionStatus,
    socketStatus: 'CLOSED',
    loading: false,
    error: null as string | null,
    settings: {
      enabled: false,
      mode: 'manual',
      nextRunAt: null,
    } as WateringSettings,
  }),
  getters: {
    isDeviceOnline: (state) => state.deviceStatus === 'online',
    isSocketOpen: (state) => state.socketStatus === 'OPEN',
  },
  actions: {
    setDeviceStatus(status: DeviceConnectionStatus) {
      this.deviceStatus = status
    },
    setSocketStatus(status: string) {
      this.socketStatus = status
      if (status === 'CLOSED') {
        this.setDeviceStatus('offline')
      }
    },
    setEnabled(enabled: boolean) {
      this.settings.enabled = enabled
    },
    setMode(mode: WateringMode) {
      this.settings.mode = mode
    },
    setNextRunAt(nextRunAt: Date | string | null) {
      this.settings.nextRunAt = nextRunAt
    },
    setError(error: string | null) {
      this.error = error
    },
  },
})
