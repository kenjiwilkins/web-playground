// Device Memory API types

declare global {
  interface Navigator {
    readonly deviceMemory?: number
  }

  interface WorkerNavigator {
    readonly deviceMemory?: number
  }
}

export {}
