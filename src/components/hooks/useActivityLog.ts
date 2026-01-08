import { useState, useCallback } from 'react'

export interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
}

export function useActivityLog(maxEntries = 15) {
  const [logs, setLogs] = useState<LogEntry[]>([])

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }, ...prev].slice(0, maxEntries))
  }, [maxEntries])

  const clearLogs = useCallback(() => setLogs([]), [])

  return { logs, addLog, clearLogs }
}
