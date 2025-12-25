import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function BadgingDemo() {
  const [isSupported] = useState('setAppBadge' in navigator)
  const [currentBadge, setCurrentBadge] = useState<number | 'flag' | 'none'>('none')
  const [customValue, setCustomValue] = useState('')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [{ timestamp, message, type }, ...prev].slice(0, 10))
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      addLog('App can be installed!', 'info')
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
      addLog('App installed successfully!', 'success')
    }

    const checkInstalled = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone ||
        document.referrer.includes('android-app://')
      setIsInstalled(standalone)
    }

    checkInstalled()
    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [addLog])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      addLog('Install prompt not available', 'warning')
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      addLog('User accepted the install prompt', 'success')
    } else {
      addLog('User dismissed the install prompt', 'info')
    }

    setDeferredPrompt(null)
  }

  const setBadge = async (value?: number) => {
    if (!isSupported) {
      addLog('Badging API not supported', 'error')
      return
    }

    try {
      if (value === undefined) {
        // Set flag badge
        await navigator.setAppBadge()
        setCurrentBadge('flag')
        addLog('Badge set to flag (no value)', 'success')
      } else {
        await navigator.setAppBadge(value)
        setCurrentBadge(value)
        addLog(`Badge set to ${value}`, 'success')
      }
    } catch (error) {
      addLog(`Error setting badge: ${error}`, 'error')
    }
  }

  const clearBadge = async () => {
    if (!isSupported) {
      addLog('Badging API not supported', 'error')
      return
    }

    try {
      await navigator.clearAppBadge()
      setCurrentBadge('none')
      addLog('Badge cleared', 'success')
    } catch (error) {
      addLog(`Error clearing badge: ${error}`, 'error')
    }
  }

  const setCustomBadge = () => {
    const value = parseInt(customValue, 10)
    if (isNaN(value) || value < 0) {
      addLog('Please enter a valid positive number', 'warning')
      return
    }
    setBadge(value)
    setCustomValue('')
  }

  return (
    <div className="space-y-4">
      <Card className={isSupported ? 'border-green-500' : 'border-red-500'}>
        <CardHeader>
          <CardTitle>Browser Support Check</CardTitle>
          <CardDescription>
            {isSupported
              ? 'Your browser supports the Badging API!'
              : 'Your browser does not support the Badging API'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={isSupported ? 'text-green-600' : 'text-red-600'}>
                {isSupported ? '✓' : '✗'}
              </span>
              <code className="text-sm">navigator.setAppBadge</code>
            </div>
            <div className="flex items-center gap-2">
              <span className={isSupported ? 'text-green-600' : 'text-red-600'}>
                {isSupported ? '✓' : '✗'}
              </span>
              <code className="text-sm">navigator.clearAppBadge</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={isInstalled ? 'border-green-500' : deferredPrompt ? 'border-blue-500' : 'border-gray-500'}>
        <CardHeader>
          <CardTitle>PWA Installation</CardTitle>
          <CardDescription>
            {isInstalled
              ? 'App is installed! Badges will appear on the app icon.'
              : 'Install this app to see badges on your home screen or taskbar'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isInstalled ? (
            <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-500">
              <span className="text-green-600 dark:text-green-400 text-2xl">✓</span>
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100">App Installed</p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Badges will appear on your app icon when set
                </p>
              </div>
            </div>
          ) : deferredPrompt ? (
            <div className="space-y-3">
              <Button onClick={handleInstallClick} className="w-full" size="lg">
                Install App
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Install to enable badge notifications on your device
              </p>
            </div>
          ) : (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                To install this app:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Chrome/Edge: Look for install icon in address bar</li>
                <li>Mobile: Use browser menu &quot;Add to Home Screen&quot;</li>
                <li>Already installed: Check your apps!</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {isSupported && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Current Badge State</CardTitle>
              <CardDescription>The current badge value or state</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">
                    {currentBadge === 'none' && '∅'}
                    {currentBadge === 'flag' && '🚩'}
                    {typeof currentBadge === 'number' && currentBadge}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentBadge === 'none' && 'No badge set'}
                    {currentBadge === 'flag' && 'Flag badge (no value)'}
                    {typeof currentBadge === 'number' && `Badge count: ${currentBadge}`}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common badge scenarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button onClick={() => setBadge(1)} variant="outline" size="sm">
                  1 Message
                </Button>
                <Button onClick={() => setBadge(5)} variant="outline" size="sm">
                  5 Messages
                </Button>
                <Button onClick={() => setBadge(12)} variant="outline" size="sm">
                  12 Messages
                </Button>
                <Button onClick={() => setBadge(99)} variant="outline" size="sm">
                  99+ Messages
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => setBadge()} variant="secondary">
                  Set Flag Badge
                </Button>
                <Button onClick={clearBadge} variant="destructive">
                  Clear Badge
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Badge Value</CardTitle>
              <CardDescription>Set any numeric badge value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="Enter badge count"
                  className="flex-1 px-3 py-2 border rounded-md bg-background"
                  onKeyDown={(e) => e.key === 'Enter' && setCustomBadge()}
                />
                <Button onClick={setCustomBadge}>
                  Set Badge
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Note: Browsers may modify large values (e.g., 4000 → "99+")
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Badge operations and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 font-mono text-xs space-y-1 max-h-64 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-muted-foreground">No activity yet</p>
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
              <CardTitle className="text-sm">Where to See the Badge</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p><strong>The badge will appear:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Browser Tab:</strong> Next to the favicon in the browser tab (if supported)</li>
                <li><strong>PWA Icon:</strong> On the app icon if installed as a Progressive Web App</li>
                <li><strong>Taskbar/Dock:</strong> On the taskbar or dock icon (OS dependent)</li>
                <li><strong>Home Screen:</strong> On the app icon on mobile devices (if installed)</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                <strong>Note:</strong> Badge appearance varies by browser and platform. Some browsers may only show badges for installed PWAs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="text-sm">Testing Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Check your browser tab's favicon area for the badge</li>
                <li>For PWAs: Install this site as an app to see badges on the app icon</li>
                <li>Badges are most visible when the tab is in the background</li>
                <li>Setting badge to 0 is equivalent to clearing it</li>
                <li>Flag badges show a marker without a specific number</li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
