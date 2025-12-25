import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function BackgroundSyncDemo() {
  const [isSupported, setIsSupported] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [logs, setLogs] = useState<string[]>([])
  const [syncName, setSyncName] = useState('')

  const checkSupport = () => {
    const supported = 'serviceWorker' in navigator && 'SyncManager' in window
    setIsSupported(supported)
    addLog(supported ? '✓ Background Sync API is supported!' : '✗ Background Sync API is not supported')
  }

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 10))
  }

  const loadTags = async () => {
    if (!isSupported) return

    try {
      const registration = await navigator.serviceWorker.ready
      const syncTags = await registration.sync.getTags()
      setTags(syncTags)
      addLog(`Found ${syncTags.length} registered sync task(s)`)
    } catch (error) {
      addLog(`Error loading tags: ${error}`)
    }
  }

  const registerSync = async () => {
    if (!syncName.trim()) {
      addLog('⚠ Please enter a sync name')
      return
    }

    try {
      // First, try to register a simple service worker if none exists
      if (!navigator.serviceWorker.controller) {
        addLog('⚠ No service worker registered. Attempting to register one...')
        try {
          await registerDemoServiceWorker()
        } catch (swError) {
          addLog(`✗ Could not register service worker: ${swError}`)
          return
        }
      }

      const registration = await navigator.serviceWorker.ready
      await registration.sync.register(syncName)
      addLog(`✓ Registered sync: "${syncName}"`)
      setSyncName('')
      await loadTags()
    } catch (error) {
      addLog(`✗ Failed to register sync: ${error}`)
    }
  }

  const registerDemoServiceWorker = async () => {
    // Create a minimal service worker inline
    const swCode = `
      self.addEventListener('sync', (event) => {
        console.log('Background sync event:', event.tag);

        if (event.tag.startsWith('demo-')) {
          event.waitUntil(
            new Promise((resolve) => {
              console.log('Sync task executed:', event.tag);
              setTimeout(resolve, 1000);
            })
          );
        }
      });

      self.addEventListener('install', () => {
        self.skipWaiting();
      });

      self.addEventListener('activate', () => {
        self.clients.claim();
      });
    `

    const blob = new Blob([swCode], { type: 'application/javascript' })
    const swUrl = URL.createObjectURL(blob)

    await navigator.serviceWorker.register(swUrl)
    addLog('✓ Demo service worker registered')

    // Wait for it to activate
    await navigator.serviceWorker.ready
  }

  const testOfflineSync = () => {
    addLog('💡 To test offline sync:')
    addLog('1. Open DevTools → Application → Service Workers')
    addLog('2. Check "Offline" checkbox')
    addLog('3. Register a sync task')
    addLog('4. Uncheck "Offline" - sync will fire!')
  }

  useEffect(() => {
    checkSupport()
    loadTags()
  }, [])

  return (
    <div className="space-y-4">
      <Card className={isSupported ? 'border-green-500' : 'border-red-500'}>
        <CardHeader>
          <CardTitle>Browser Support Check</CardTitle>
          <CardDescription>
            {isSupported
              ? 'Your browser supports the Background Sync API!'
              : 'Your browser does not support the Background Sync API'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={isSupported ? 'text-green-600' : 'text-red-600'}>
                {isSupported ? '✓' : '✗'}
              </span>
              <code className="text-sm">navigator.serviceWorker</code>
            </div>
            <div className="flex items-center gap-2">
              <span className={isSupported ? 'text-green-600' : 'text-red-600'}>
                {isSupported ? '✓' : '✗'}
              </span>
              <code className="text-sm">window.SyncManager</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {isSupported && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Register a Background Sync</CardTitle>
              <CardDescription>Create a new sync task with a unique tag</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={syncName}
                  onChange={(e) => setSyncName(e.target.value)}
                  placeholder="e.g., demo-sync-messages"
                  className="flex-1 px-3 py-2 border rounded-md bg-background"
                  onKeyDown={(e) => e.key === 'Enter' && registerSync()}
                />
                <Button onClick={registerSync}>
                  Register Sync
                </Button>
              </div>
              <div className="flex gap-2">
                <Button onClick={loadTags} variant="outline" size="sm">
                  Refresh Tags
                </Button>
                <Button onClick={testOfflineSync} variant="outline" size="sm">
                  How to Test
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registered Sync Tasks</CardTitle>
              <CardDescription>Currently registered background sync tags</CardDescription>
            </CardHeader>
            <CardContent>
              {tags.length === 0 ? (
                <p className="text-sm text-muted-foreground">No sync tasks registered yet</p>
              ) : (
                <ul className="space-y-2">
                  {tags.map((tag, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <code className="text-sm bg-muted px-2 py-1 rounded">{tag}</code>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent actions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 font-mono text-xs space-y-1 max-h-64 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-muted-foreground">No activity yet</p>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="text-foreground">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="text-sm">Testing Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p><strong>To see sync events fire:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Open Chrome DevTools (F12)</li>
                <li>Go to Application → Service Workers</li>
                <li>Check the "Offline" checkbox</li>
                <li>Register a sync task above</li>
                <li>Uncheck "Offline" - watch the Console for sync events!</li>
              </ol>
              <p className="text-muted-foreground mt-2">
                Note: Sync events are logged to the browser console, not this activity log.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
