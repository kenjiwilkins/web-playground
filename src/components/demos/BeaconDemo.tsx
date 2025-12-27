import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}

export function BeaconDemo() {
  const [isSupported] = useState('sendBeacon' in navigator)
  const [beaconUrl, setBeaconUrl] = useState('https://httpbin.org/post')
  const [customData, setCustomData] = useState('')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [beaconCount, setBeaconCount] = useState(0)
  const [unloadListenerActive, setUnloadListenerActive] = useState(false)

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [{ timestamp, message, type }, ...prev].slice(0, 20))
  }, [])

  const sendBeaconRequest = useCallback((data: string, label: string) => {
    if (!isSupported) {
      addLog('Beacon API not supported', 'error')
      return false
    }

    try {
      const blob = new Blob([data], { type: 'application/json' })
      const result = navigator.sendBeacon(beaconUrl, blob)

      if (result) {
        setBeaconCount(prev => prev + 1)
        addLog(`${label} beacon sent successfully`, 'success')
        addLog(`Data: ${data}`, 'info')
      } else {
        addLog(`${label} beacon failed to queue`, 'error')
      }

      return result
    } catch (error) {
      addLog(`Error sending beacon: ${error}`, 'error')
      return false
    }
  }, [isSupported, beaconUrl, addLog])

  const sendAnalyticsBeacon = () => {
    const analyticsData = JSON.stringify({
      event: 'button_click',
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent
    })
    sendBeaconRequest(analyticsData, 'Analytics')
  }

  const sendCustomBeacon = () => {
    if (!customData.trim()) {
      addLog('Please enter custom data', 'warning')
      return
    }

    try {
      JSON.parse(customData)
      sendBeaconRequest(customData, 'Custom')
      setCustomData('')
    } catch {
      addLog('Invalid JSON format', 'error')
    }
  }

  const sendDiagnosticBeacon = () => {
    const diagnosticData = JSON.stringify({
      type: 'diagnostic',
      timestamp: new Date().toISOString(),
      performance: {
        loadTime: performance.now(),
        memory: (performance as any).memory?.usedJSHeapSize || 'unavailable'
      },
      connection: {
        effectiveType: (navigator as any).connection?.effectiveType || 'unknown',
        downlink: (navigator as any).connection?.downlink || 'unknown'
      }
    })
    sendBeaconRequest(diagnosticData, 'Diagnostic')
  }

  const sendFormDataBeacon = () => {
    if (!isSupported) {
      addLog('Beacon API not supported', 'error')
      return
    }

    const formData = new FormData()
    formData.append('event', 'form_submission')
    formData.append('timestamp', new Date().toISOString())
    formData.append('username', 'demo_user')

    const result = navigator.sendBeacon(beaconUrl, formData)

    if (result) {
      setBeaconCount(prev => prev + 1)
      addLog('FormData beacon sent successfully', 'success')
      addLog('Data: FormData with 3 fields', 'info')
    } else {
      addLog('FormData beacon failed to queue', 'error')
    }
  }

  const toggleUnloadListener = () => {
    setUnloadListenerActive(prev => !prev)
  }

  useEffect(() => {
    if (!unloadListenerActive) return

    const handleBeforeUnload = () => {
      const unloadData = JSON.stringify({
        event: 'page_unload',
        timestamp: new Date().toISOString(),
        sessionDuration: performance.now(),
        beaconsSent: beaconCount
      })

      const blob = new Blob([unloadData], { type: 'application/json' })
      navigator.sendBeacon(beaconUrl, blob)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const visibilityData = JSON.stringify({
          event: 'page_hidden',
          timestamp: new Date().toISOString(),
          beaconsSent: beaconCount
        })

        const blob = new Blob([visibilityData], { type: 'application/json' })
        navigator.sendBeacon(beaconUrl, blob)
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    addLog('Unload beacon listeners activated', 'success')

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (unloadListenerActive) {
        addLog('Unload beacon listeners deactivated', 'info')
      }
    }
  }, [unloadListenerActive, beaconUrl, beaconCount, addLog])

  return (
    <div className="space-y-4">
      <Card className={isSupported ? 'border-green-500' : 'border-red-500'}>
        <CardHeader>
          <CardTitle>Browser Support Check</CardTitle>
          <CardDescription>
            {isSupported
              ? 'Your browser supports the Beacon API!'
              : 'Your browser does not support the Beacon API'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className={isSupported ? 'text-green-600' : 'text-red-600'}>
              {isSupported ? '✓' : '✗'}
            </span>
            <code className="text-sm">navigator.sendBeacon()</code>
          </div>
        </CardContent>
      </Card>

      {isSupported && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Beacon Statistics</CardTitle>
              <CardDescription>Track beacon requests sent during this session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-6 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {beaconCount}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Beacons Sent
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Beacon Endpoint</CardTitle>
              <CardDescription>Configure the URL to send beacon data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <input
                  type="url"
                  value={beaconUrl}
                  onChange={(e) => setBeaconUrl(e.target.value)}
                  placeholder="https://example.com/beacon"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Default: httpbin.org (accepts POST requests for testing)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pre-configured Beacons</CardTitle>
              <CardDescription>Send common types of beacon requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button onClick={sendAnalyticsBeacon} variant="outline">
                  Send Analytics Beacon
                </Button>
                <Button onClick={sendDiagnosticBeacon} variant="outline">
                  Send Diagnostic Beacon
                </Button>
                <Button onClick={sendFormDataBeacon} variant="outline">
                  Send FormData Beacon
                </Button>
                <Button
                  onClick={toggleUnloadListener}
                  variant={unloadListenerActive ? "destructive" : "secondary"}
                >
                  {unloadListenerActive ? 'Disable' : 'Enable'} Unload Beacon
                </Button>
              </div>
              {unloadListenerActive && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm">
                    Unload beacon is active. A beacon will be sent when you navigate away or close this tab.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Beacon Data</CardTitle>
              <CardDescription>Send your own JSON data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <textarea
                value={customData}
                onChange={(e) => setCustomData(e.target.value)}
                placeholder='{"event": "custom", "data": "your data here"}'
                className="w-full px-3 py-2 border rounded-md bg-background font-mono text-sm min-h-[100px]"
              />
              <Button onClick={sendCustomBeacon} className="w-full">
                Send Custom Beacon
              </Button>
              <p className="text-xs text-muted-foreground">
                Enter valid JSON data to send as a beacon
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Beacon requests and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 font-mono text-xs space-y-1 max-h-64 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-muted-foreground">No activity yet. Send a beacon to get started.</p>
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
              <CardTitle className="text-sm">How Beacons Work</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                The Beacon API sends data asynchronously to a server without blocking page unload:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Requests are queued by the browser, not waiting for a response</li>
                <li>Perfect for analytics, diagnostics, and end-of-session data</li>
                <li>Works even when the page is being unloaded</li>
                <li>Returns <code className="bg-muted px-1 rounded">true</code> if successfully queued</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="text-sm">Testing Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Use httpbin.org to see your beacon data echoed back</li>
                <li>Enable unload beacon and try closing the tab or navigating away</li>
                <li>Check browser DevTools Network tab to see beacon requests (type: "ping")</li>
                <li>Beacons have size limits (typically 64KB)</li>
                <li>The API doesn't guarantee delivery, just best effort</li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
