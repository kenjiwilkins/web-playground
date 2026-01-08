import { useState } from 'react'

export function useBrowserSupport(
  apiPath: string | string[],
  customCheck?: () => boolean
): boolean {
  return useState(() => {
    if (customCheck) return customCheck()

    const paths = Array.isArray(apiPath) ? apiPath : [apiPath]
    return paths.some(path => {
      const parts = path.split('.')
      let obj: any = window
      for (const part of parts) {
        if (!(part in obj)) return false
        obj = obj[part]
      }
      return true
    })
  })[0]
}
