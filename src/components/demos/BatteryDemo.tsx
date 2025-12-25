import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}

export function BatteryDemo() {
  const [isSupported] = useState('getBattery' in navigator)
  const [battery, setBattery] = useState<BatteryManager | null>(null)
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null)
  const [charging, setCharging] = useState<boolean | null>(null)
  const [chargingTime, setChargingTime] = useState<number | null>(null)
  const [dischargingTime, setDischargingTime] = useState<number | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [{ timestamp, message, type }, ...prev].slice(0, 15))
  }, [])

  const formatTime = (seconds: number): string => {
    if (seconds === Infinity) return 'Calculating...'
    if (seconds === 0) return 'Unknown'

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const getBatteryInfo = async () => {
    if (!isSupported) {
      addLog('Battery Status API not supported', 'error')
      return
    }

    setIsLoading(true)
    try {
      const batteryManager = await navigator.getBattery!()
      setBattery(batteryManager)

      // Set initial values
      setBatteryLevel(batteryManager.level)
      setCharging(batteryManager.charging)
      setChargingTime(batteryManager.chargingTime)
      setDischargingTime(batteryManager.dischargingTime)

      addLog('Battery information retrieved successfully', 'success')
      addLog(`Battery level: ${(batteryManager.level * 100).toFixed(0)}%`, 'info')
      addLog(`Status: ${batteryManager.charging ? 'Charging' : 'Discharging'}`, 'info')
    } catch (error) {
      addLog(`Error getting battery info: ${error}`, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!battery) return

    const handleLevelChange = () => {
      const newLevel = battery.level
      setBatteryLevel(newLevel)
      addLog(`Battery level changed to ${(newLevel * 100).toFixed(0)}%`, 'info')
    }

    const handleChargingChange = () => {
      const isCharging = battery.charging
      setCharging(isCharging)
      addLog(`Charging status: ${isCharging ? 'Charging' : 'Discharging'}`, isCharging ? 'success' : 'warning')
    }

    const handleChargingTimeChange = () => {
      const time = battery.chargingTime
      setChargingTime(time)
      if (time !== Infinity) {
        addLog(`Time to full charge: ${formatTime(time)}`, 'info')
      }
    }

    const handleDischargingTimeChange = () => {
      const time = battery.dischargingTime
      setDischargingTime(time)
      if (time !== Infinity) {
        addLog(`Time remaining: ${formatTime(time)}`, 'info')
      }
    }

    battery.addEventListener('levelchange', handleLevelChange)
    battery.addEventListener('chargingchange', handleChargingChange)
    battery.addEventListener('chargingtimechange', handleChargingTimeChange)
    battery.addEventListener('dischargingtimechange', handleDischargingTimeChange)

    return () => {
      battery.removeEventListener('levelchange', handleLevelChange)
      battery.removeEventListener('chargingchange', handleChargingChange)
      battery.removeEventListener('chargingtimechange', handleChargingTimeChange)
      battery.removeEventListener('dischargingtimechange', handleDischargingTimeChange)
    }
  }, [battery, addLog])

  const getBatteryColor = (level: number): string => {
    if (level > 0.5) return 'text-green-600 dark:text-green-400'
    if (level > 0.2) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getBatteryIcon = (level: number, isCharging: boolean): string => {
    if (isCharging) return '🔌'
    if (level > 0.75) return '🔋'
    if (level > 0.5) return '🔋'
    if (level > 0.25) return '🪫'
    return '🪫'
  }

  return (
    <div className="space-y-4">
      <Card className={isSupported ? 'border-green-500' : 'border-red-500'}>
        <CardHeader>
          <CardTitle>Browser Support Check</CardTitle>
          <CardDescription>
            {isSupported
              ? 'Your browser supports the Battery Status API!'
              : 'Your browser does not support the Battery Status API'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className={isSupported ? 'text-green-600' : 'text-red-600'}>
              {isSupported ? '✓' : '✗'}
            </span>
            <code className="text-sm">navigator.getBattery()</code>
          </div>
        </CardContent>
      </Card>

      {isSupported && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Get Battery Information</CardTitle>
              <CardDescription>Request access to battery status information</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={getBatteryInfo}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Loading...' : battery ? 'Refresh Battery Info' : 'Get Battery Status'}
              </Button>
            </CardContent>
          </Card>

          {battery && batteryLevel !== null && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Current Battery Status</CardTitle>
                  <CardDescription>Real-time battery information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
                    <div className="text-center space-y-4">
                      <div className="text-6xl">
                        {getBatteryIcon(batteryLevel, charging || false)}
                      </div>
                      <div className={`text-5xl font-bold ${getBatteryColor(batteryLevel)}`}>
                        {(batteryLevel * 100).toFixed(0)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {charging ? '⚡ Charging' : '🔋 On Battery'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Battery Details</CardTitle>
                  <CardDescription>Detailed battery information and timing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Charge Level</div>
                        <div className="text-2xl font-semibold">
                          {(batteryLevel * 100).toFixed(1)}%
                        </div>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Status</div>
                        <div className="text-2xl font-semibold">
                          {charging ? 'Charging' : 'Discharging'}
                        </div>
                      </div>
                    </div>

                    {charging && chargingTime !== null && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="text-sm font-semibold mb-1">Time to Full Charge</div>
                        <div className="text-xl">
                          {formatTime(chargingTime)}
                        </div>
                      </div>
                    )}

                    {!charging && dischargingTime !== null && (
                      <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <div className="text-sm font-semibold mb-1">Time Remaining</div>
                        <div className="text-xl">
                          {formatTime(dischargingTime)}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Battery events and status changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 font-mono text-xs space-y-1 max-h-64 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-muted-foreground">No activity yet. Click "Get Battery Status" to start.</p>
                ) : (
                  logs.map((log, index) => (
                    <div
                      key={index}
                      className={
                        log.type === 'success'
                          ? 'text-green-600 dark:text-green-400'
                          : log.type === 'warning'
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : log.type === 'error'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-foreground'
                      }
                    >
                      [{log.timestamp}] {log.message}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="text-sm">Real-time Updates</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                The Battery Status API provides real-time updates when:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Battery level changes</li>
                <li>Device starts or stops charging</li>
                <li>Time estimates are updated</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Try plugging/unplugging your device to see the charging status change in real-time!
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="text-sm">Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                The Battery Status API has privacy considerations:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>May be restricted or removed in some browsers due to privacy concerns</li>
                <li>Battery level can be used for fingerprinting</li>
                <li>Some browsers may provide less precise data to protect privacy</li>
                <li>Desktop browsers may have limited or no support</li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
