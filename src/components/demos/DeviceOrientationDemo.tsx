import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface OrientationData {
  alpha: number | null
  beta: number | null
  gamma: number | null
  absolute: boolean
}

interface MotionData {
  acceleration: {
    x: number | null
    y: number | null
    z: number | null
  }
  accelerationIncludingGravity: {
    x: number | null
    y: number | null
    z: number | null
  }
  rotationRate: {
    alpha: number | null
    beta: number | null
    gamma: number | null
  }
  interval: number
}

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
}

export function DeviceOrientationDemo() {
  const [isSupported] = useState(
    'DeviceOrientationEvent' in window && 'DeviceMotionEvent' in window
  )
  const [isIOS] = useState(() => {
    const ua = navigator.userAgent
    const windowWithMSStream = window as Window & { MSStream?: unknown }
    return /iPad|iPhone|iPod/.test(ua) && !windowWithMSStream.MSStream
  })
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [orientationData, setOrientationData] = useState<OrientationData>({
    alpha: null,
    beta: null,
    gamma: null,
    absolute: false
  })
  const [motionData, setMotionData] = useState<MotionData>({
    acceleration: { x: null, y: null, z: null },
    accelerationIncludingGravity: { x: null, y: null, z: null },
    rotationRate: { alpha: null, beta: null, gamma: null },
    interval: 0
  })
  const [shakeCount, setShakeCount] = useState(0)
  const [logs, setLogs] = useState<LogEntry[]>([])

  const lastShakeTime = useRef<number>(0)
  const lastAcceleration = useRef({ x: 0, y: 0, z: 0 })

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }, ...prev].slice(0, 10))
  }, [])

  const requestPermission = async () => {
    // iOS 13+ requires permission
    const DeviceOrientationEventTyped = DeviceOrientationEvent as unknown as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>
    }

    if (typeof DeviceOrientationEventTyped.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEventTyped.requestPermission()
        if (permission === 'granted') {
          setPermissionGranted(true)
          addLog('Permission granted for device orientation', 'success')
          return true
        } else {
          setPermissionGranted(false)
          addLog('Permission denied for device orientation', 'error')
          return false
        }
      } catch (error) {
        addLog(`Permission error: ${(error as Error).message}`, 'error')
        return false
      }
    } else {
      // Non-iOS or older iOS, assume permission granted
      setPermissionGranted(true)
      return true
    }
  }

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    setOrientationData({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
      absolute: event.absolute
    })
  }, [])

  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    setMotionData({
      acceleration: {
        x: event.acceleration?.x ?? null,
        y: event.acceleration?.y ?? null,
        z: event.acceleration?.z ?? null
      },
      accelerationIncludingGravity: {
        x: event.accelerationIncludingGravity?.x ?? null,
        y: event.accelerationIncludingGravity?.y ?? null,
        z: event.accelerationIncludingGravity?.z ?? null
      },
      rotationRate: {
        alpha: event.rotationRate?.alpha ?? null,
        beta: event.rotationRate?.beta ?? null,
        gamma: event.rotationRate?.gamma ?? null
      },
      interval: event.interval
    })

    // Shake detection
    if (event.accelerationIncludingGravity) {
      const { x, y, z } = event.accelerationIncludingGravity
      if (x !== null && y !== null && z !== null) {
        const deltaX = Math.abs(x - lastAcceleration.current.x)
        const deltaY = Math.abs(y - lastAcceleration.current.y)
        const deltaZ = Math.abs(z - lastAcceleration.current.z)

        const totalDelta = deltaX + deltaY + deltaZ

        // Shake threshold - adjust as needed
        if (totalDelta > 30) {
          const now = Date.now()
          // Debounce shakes to once per second
          if (now - lastShakeTime.current > 1000) {
            lastShakeTime.current = now
            setShakeCount(prev => prev + 1)
            addLog('Shake detected!', 'warning')
          }
        }

        lastAcceleration.current = { x, y, z }
      }
    }
  }, [addLog])

  const startListening = async () => {
    const hasPermission = permissionGranted ?? await requestPermission()

    if (!hasPermission) {
      addLog('Cannot start - permission required', 'error')
      return
    }

    window.addEventListener('deviceorientation', handleOrientation)
    window.addEventListener('devicemotion', handleMotion)
    setIsListening(true)
    addLog('Started listening to device orientation and motion', 'success')
  }

  const stopListening = () => {
    window.removeEventListener('deviceorientation', handleOrientation)
    window.removeEventListener('devicemotion', handleMotion)
    setIsListening(false)
    addLog('Stopped listening to device sensors', 'info')
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
      window.removeEventListener('devicemotion', handleMotion)
    }
  }, [handleOrientation, handleMotion])

  const formatNumber = (num: number | null, decimals: number = 2): string => {
    return num !== null ? num.toFixed(decimals) : 'N/A'
  }

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support Device Orientation Events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              Device Orientation Events require:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Modern mobile browser with gyroscope/accelerometer</li>
              <li>HTTPS secure context</li>
              <li>User permission (iOS 13+)</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              This API works best on mobile devices with motion sensors.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Permission & Controls */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>Sensor Controls</CardTitle>
          <CardDescription>
            Request permission and start listening to device sensors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isIOS && permissionGranted === null && (
            <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
              <strong>iOS Permission Required:</strong> iOS 13+ requires explicit permission
              to access device sensors. Click "Request Permission" below to grant access.
            </div>
          )}

          {permissionGranted === false && (
            <div className="bg-red-500/10 p-3 rounded border border-red-500/30 text-sm">
              Permission denied. Please refresh and try again.
            </div>
          )}

          <div className="flex gap-2">
            {isIOS && permissionGranted === null ? (
              <Button onClick={requestPermission} className="flex-1">
                Request Permission
              </Button>
            ) : !isListening ? (
              <Button onClick={startListening} className="flex-1">
                Start Listening
              </Button>
            ) : (
              <Button onClick={stopListening} variant="destructive" className="flex-1">
                Stop Listening
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            {isListening ? (
              <span className="text-green-500 font-semibold">● Active</span>
            ) : (
              <span className="text-gray-500">○ Inactive</span>
            )}
            {isIOS && (
              <>
                {' - '}
                {permissionGranted === true && 'Permission granted'}
                {permissionGranted === false && 'Permission denied'}
                {permissionGranted === null && 'Permission not requested'}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Device Orientation */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>Device Orientation</CardTitle>
          <CardDescription>
            Rotation around X, Y, Z axes (alpha, beta, gamma)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Alpha (Z-axis)</div>
              <div className="text-2xl font-bold">{formatNumber(orientationData.alpha)}°</div>
              <div className="text-xs text-muted-foreground mt-1">0° to 360°</div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Beta (X-axis)</div>
              <div className="text-2xl font-bold">{formatNumber(orientationData.beta)}°</div>
              <div className="text-xs text-muted-foreground mt-1">-180° to 180°</div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Gamma (Y-axis)</div>
              <div className="text-2xl font-bold">{formatNumber(orientationData.gamma)}°</div>
              <div className="text-xs text-muted-foreground mt-1">-90° to 90°</div>
            </div>
          </div>

          {/* Visual representation */}
          <div className="bg-muted p-8 rounded-lg flex items-center justify-center">
            <div
              className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg shadow-lg transition-transform duration-100"
              style={{
                transform: `
                  rotateZ(${orientationData.alpha ?? 0}deg)
                  rotateX(${orientationData.beta ?? 0}deg)
                  rotateY(${orientationData.gamma ?? 0}deg)
                `,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-bold">
                3D
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            {orientationData.absolute ? '🧭 Absolute orientation (compass)' : '📱 Relative orientation'}
          </div>
        </CardContent>
      </Card>

      {/* Device Motion */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>Device Motion</CardTitle>
          <CardDescription>
            Acceleration and rotation rate data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">Acceleration (m/s²)</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-muted p-2 rounded">
                <div className="text-xs text-muted-foreground">X</div>
                <div className="font-mono">{formatNumber(motionData.acceleration.x, 3)}</div>
              </div>
              <div className="bg-muted p-2 rounded">
                <div className="text-xs text-muted-foreground">Y</div>
                <div className="font-mono">{formatNumber(motionData.acceleration.y, 3)}</div>
              </div>
              <div className="bg-muted p-2 rounded">
                <div className="text-xs text-muted-foreground">Z</div>
                <div className="font-mono">{formatNumber(motionData.acceleration.z, 3)}</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Acceleration + Gravity (m/s²)</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-muted p-2 rounded">
                <div className="text-xs text-muted-foreground">X</div>
                <div className="font-mono">{formatNumber(motionData.accelerationIncludingGravity.x, 3)}</div>
              </div>
              <div className="bg-muted p-2 rounded">
                <div className="text-xs text-muted-foreground">Y</div>
                <div className="font-mono">{formatNumber(motionData.accelerationIncludingGravity.y, 3)}</div>
              </div>
              <div className="bg-muted p-2 rounded">
                <div className="text-xs text-muted-foreground">Z</div>
                <div className="font-mono">{formatNumber(motionData.accelerationIncludingGravity.z, 3)}</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Rotation Rate (°/s)</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-muted p-2 rounded">
                <div className="text-xs text-muted-foreground">Alpha</div>
                <div className="font-mono">{formatNumber(motionData.rotationRate.alpha, 3)}</div>
              </div>
              <div className="bg-muted p-2 rounded">
                <div className="text-xs text-muted-foreground">Beta</div>
                <div className="font-mono">{formatNumber(motionData.rotationRate.beta, 3)}</div>
              </div>
              <div className="bg-muted p-2 rounded">
                <div className="text-xs text-muted-foreground">Gamma</div>
                <div className="font-mono">{formatNumber(motionData.rotationRate.gamma, 3)}</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Update interval: {motionData.interval.toFixed(2)} ms
          </div>
        </CardContent>
      </Card>

      {/* Shake Detection */}
      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>Gesture Detection</CardTitle>
          <CardDescription>
            Shake your device to trigger detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="text-5xl font-bold mb-2">{shakeCount}</div>
            <div className="text-muted-foreground">Shakes Detected</div>
          </div>
          <Button
            onClick={() => setShakeCount(0)}
            variant="outline"
            className="w-full"
          >
            Reset Counter
          </Button>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="border-yellow-500">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Real-time sensor event log
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto bg-muted p-4 rounded-lg font-mono text-xs">
            {logs.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No activity yet. Start listening to see events.
              </p>
            )}
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  log.type === 'error' ? 'text-red-500' :
                  log.type === 'warning' ? 'text-orange-500' :
                  log.type === 'success' ? 'text-green-500' :
                  'text-foreground'
                }`}
              >
                <span className="text-muted-foreground">[{log.timestamp}]</span>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
