import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
}

interface PositionData {
  latitude: number
  longitude: number
  accuracy: number
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  speed: number | null
  timestamp: number
}

export function GeolocationDemo() {
  const [isSupported] = useState('geolocation' in navigator)
  const [currentPosition, setCurrentPosition] = useState<PositionData | null>(null)
  const [isWatching, setIsWatching] = useState(false)
  const [watchId, setWatchId] = useState<number | null>(null)
  const [permissionState, setPermissionState] = useState<PermissionState | 'unknown'>('unknown')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [positionHistory, setPositionHistory] = useState<PositionData[]>([])

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }, ...prev].slice(0, 15))
  }, [])

  // Check permission status
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' })
        setPermissionState(result.state)

        result.addEventListener('change', () => {
          setPermissionState(result.state)
          addLog(`Permission state changed to: ${result.state}`, 'info')
        })
      } catch {
        // Permissions API not supported or geolocation permission not queryable
        setPermissionState('unknown')
      }
    }

    if (isSupported) {
      checkPermission()
    }
  }, [isSupported, addLog])

  const handleSuccess = useCallback((position: GeolocationPosition, isFromWatch = false) => {
    const posData: PositionData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      speed: position.coords.speed,
      timestamp: position.timestamp
    }

    setCurrentPosition(posData)

    if (isFromWatch) {
      setPositionHistory(prev => [posData, ...prev].slice(0, 10))
      addLog('Position updated from watch', 'success')
    } else {
      addLog('Successfully retrieved current position', 'success')
    }
  }, [addLog])

  const handleError = useCallback((error: GeolocationPositionError) => {
    let errorMessage = ''

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'User denied geolocation permission'
        break
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information unavailable'
        break
      case error.TIMEOUT:
        errorMessage = 'Location request timed out'
        break
      default:
        errorMessage = 'Unknown geolocation error'
    }

    addLog(`${errorMessage}: ${error.message}`, 'error')
  }, [addLog])

  const getCurrentPosition = () => {
    if (!navigator.geolocation) {
      addLog('Geolocation not supported', 'error')
      return
    }

    addLog('Requesting current position...', 'info')

    navigator.geolocation.getCurrentPosition(
      (position) => handleSuccess(position, false),
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  const startWatching = () => {
    if (!navigator.geolocation) {
      addLog('Geolocation not supported', 'error')
      return
    }

    if (isWatching) {
      addLog('Already watching position', 'warning')
      return
    }

    addLog('Starting position watch...', 'info')

    const id = navigator.geolocation.watchPosition(
      (position) => handleSuccess(position, true),
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )

    setWatchId(id)
    setIsWatching(true)
    addLog('Position watch started', 'success')
  }

  const stopWatching = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      setWatchId(null)
      setIsWatching(false)
      addLog('Position watch stopped', 'info')
    }
  }

  const clearHistory = () => {
    setPositionHistory([])
    addLog('Position history cleared', 'info')
  }

  const openInMaps = () => {
    if (!currentPosition) {
      addLog('No position data available', 'warning')
      return
    }

    const { latitude, longitude } = currentPosition
    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`
    window.open(mapsUrl, '_blank')
    addLog('Opening location in Google Maps', 'info')
  }

  const copyCoordinates = async () => {
    if (!currentPosition) {
      addLog('No position data available', 'warning')
      return
    }

    const coords = `${currentPosition.latitude}, ${currentPosition.longitude}`
    try {
      await navigator.clipboard.writeText(coords)
      addLog(`Coordinates copied: ${coords}`, 'success')
    } catch {
      addLog('Failed to copy to clipboard', 'error')
    }
  }

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the Geolocation API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The Geolocation API is supported in all modern browsers.
            </p>
            <p className="text-sm text-muted-foreground">
              Please update your browser or try a different one.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Permission Status */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>Permission Status</CardTitle>
          <CardDescription>
            Current geolocation permission state
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Permission State:</span>
              <span className={`text-sm font-semibold ${
                permissionState === 'granted' ? 'text-green-500' :
                permissionState === 'denied' ? 'text-red-500' :
                permissionState === 'prompt' ? 'text-yellow-500' :
                'text-gray-500'
              }`}>
                {permissionState === 'granted' && '✅ Granted'}
                {permissionState === 'denied' && '❌ Denied'}
                {permissionState === 'prompt' && '⏳ Prompt'}
                {permissionState === 'unknown' && '❓ Unknown'}
              </span>
            </div>

            {permissionState === 'denied' && (
              <div className="bg-red-500/10 p-3 rounded border border-red-500/30 text-sm">
                <strong>Permission Denied:</strong> You need to enable location permissions in your browser settings.
              </div>
            )}

            {permissionState === 'prompt' && (
              <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
                <strong>Permission Required:</strong> Click "Get Current Position" to request location access.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Get Current Position */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>Get Current Position</CardTitle>
          <CardDescription>
            Retrieve your current location once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={getCurrentPosition} className="w-full" size="lg">
            📍 Get Current Position
          </Button>

          {currentPosition && (
            <div className="border rounded-lg p-4 bg-muted space-y-3">
              <h3 className="font-semibold text-lg">Current Location</h3>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Latitude</div>
                  <div className="font-mono font-semibold">{currentPosition.latitude.toFixed(6)}°</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Longitude</div>
                  <div className="font-mono font-semibold">{currentPosition.longitude.toFixed(6)}°</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Accuracy</div>
                  <div className="font-mono font-semibold">{currentPosition.accuracy.toFixed(2)} m</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Altitude</div>
                  <div className="font-mono font-semibold">
                    {currentPosition.altitude !== null ? `${currentPosition.altitude.toFixed(2)} m` : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Speed</div>
                  <div className="font-mono font-semibold">
                    {currentPosition.speed !== null ? `${currentPosition.speed.toFixed(2)} m/s` : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Heading</div>
                  <div className="font-mono font-semibold">
                    {currentPosition.heading !== null ? `${currentPosition.heading.toFixed(2)}°` : 'N/A'}
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Last updated: {new Date(currentPosition.timestamp).toLocaleString()}
              </div>

              <div className="flex gap-2">
                <Button onClick={copyCoordinates} variant="outline" size="sm" className="flex-1">
                  Copy Coordinates
                </Button>
                <Button onClick={openInMaps} variant="outline" size="sm" className="flex-1">
                  Open in Maps
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Watch Position */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>Watch Position</CardTitle>
          <CardDescription>
            Continuously track location changes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={startWatching}
              disabled={isWatching}
              className="flex-1"
            >
              {isWatching ? '🔄 Watching...' : '▶️ Start Watching'}
            </Button>
            <Button
              onClick={stopWatching}
              disabled={!isWatching}
              variant="destructive"
              className="flex-1"
            >
              ⏹️ Stop Watching
            </Button>
          </div>

          {isWatching && (
            <div className="bg-green-500/10 p-3 rounded border border-green-500/30 text-sm">
              <strong>Tracking Active:</strong> Your position is being monitored. Move around to see updates.
            </div>
          )}

          {positionHistory.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Position History ({positionHistory.length})</h3>
                <Button onClick={clearHistory} variant="outline" size="sm">
                  Clear History
                </Button>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2">
                {positionHistory.map((pos, idx) => (
                  <div key={idx} className="bg-muted p-3 rounded text-xs font-mono">
                    <div className="grid grid-cols-2 gap-2">
                      <div>Lat: {pos.latitude.toFixed(6)}°</div>
                      <div>Lng: {pos.longitude.toFixed(6)}°</div>
                      <div>Acc: {pos.accuracy.toFixed(2)}m</div>
                      <div className="text-muted-foreground">
                        {new Date(pos.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>How the Geolocation API Works</CardTitle>
          <CardDescription>
            Understanding the implementation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-4">
            <div>
              <div className="text-muted-foreground mb-2">// 1. Get current position (one-time)</div>
              <pre className="whitespace-pre-wrap">{`navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log(\`Location: \${lat}, \${lng}\`);
  },
  (error) => {
    console.error('Error:', error.message);
  },
  { enableHighAccuracy: true }
);`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// 2. Watch position (continuous)</div>
              <pre className="whitespace-pre-wrap">{`const watchId = navigator.geolocation.watchPosition(
  (position) => {
    console.log('Position updated:', position.coords);
  },
  (error) => console.error(error)
);

// Stop watching
navigator.geolocation.clearWatch(watchId);`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// 3. Options for accuracy and timeout</div>
              <pre className="whitespace-pre-wrap">{`const options = {
  enableHighAccuracy: true,  // Use GPS if available
  timeout: 10000,            // Max wait time (ms)
  maximumAge: 0              // Don't use cached position
};`}</pre>
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30 text-sm">
              <strong>Security:</strong> Geolocation requires HTTPS and explicit user permission.
            </div>
            <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
              <strong>Accuracy:</strong> High accuracy mode uses GPS when available but consumes more battery.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="border-gray-500">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Real-time geolocation events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto bg-muted p-4 rounded-lg font-mono text-xs">
            {logs.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No activity yet. Click a button to start.
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
