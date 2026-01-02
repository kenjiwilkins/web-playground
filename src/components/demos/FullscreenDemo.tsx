import { useState, useCallback, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
}

// Extend types for webkit-prefixed fullscreen API
declare global {
  interface Document {
    webkitFullscreenEnabled?: boolean
    webkitFullscreenElement?: Element | null
    webkitExitFullscreen?: () => Promise<void>
  }

  interface HTMLElement {
    webkitRequestFullscreen?: () => Promise<void>
    webkitRequestFullScreen?: () => Promise<void>
  }
}

export function FullscreenDemo() {
  // Check for both standard and webkit-prefixed fullscreen support
  const [isSupported] = useState(() => {
    return 'fullscreenEnabled' in document ||
           'webkitFullscreenEnabled' in document
  })

  const [useWebkit] = useState(() => {
    return !('fullscreenEnabled' in document) && 'webkitFullscreenEnabled' in document
  })

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenElement, setFullscreenElement] = useState<string | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])

  const imageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const customRef = useRef<HTMLDivElement>(null)

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }, ...prev].slice(0, 15))
  }, [])

  // Get current fullscreen element (standard or webkit)
  const getFullscreenElement = useCallback(() => {
    if (useWebkit && document.webkitFullscreenElement !== undefined) {
      return document.webkitFullscreenElement
    }
    return document.fullscreenElement
  }, [useWebkit])

  const handleFullscreenChange = useCallback(() => {
    const fullscreenEl = getFullscreenElement()
    setIsFullscreen(!!fullscreenEl)

    if (fullscreenEl) {
      const elementId = fullscreenEl.id
      setFullscreenElement(elementId || 'Unknown')
      addLog(`Entered fullscreen mode: ${elementId || 'Unknown'}`, 'success')
    } else {
      setFullscreenElement(null)
      addLog('Exited fullscreen mode', 'info')
    }
  }, [addLog, getFullscreenElement])

  const handleFullscreenError = useCallback(() => {
    addLog('Failed to enter fullscreen mode', 'error')
  }, [addLog])

  useEffect(() => {
    // Listen to both standard and webkit events
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('fullscreenerror', handleFullscreenError)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenerror', handleFullscreenError)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('fullscreenerror', handleFullscreenError)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenerror', handleFullscreenError)
    }
  }, [handleFullscreenChange, handleFullscreenError])

  const requestFullscreen = async (element: HTMLElement | null, name: string) => {
    if (!element) {
      addLog('Element not found', 'error')
      return
    }

    // Check if fullscreen is enabled (standard or webkit)
    const fullscreenEnabled = useWebkit
      ? document.webkitFullscreenEnabled
      : document.fullscreenEnabled

    if (!fullscreenEnabled) {
      addLog('Fullscreen is not enabled', 'error')
      return
    }

    try {
      addLog(`Requesting fullscreen for ${name}...`, 'info')

      if (useWebkit) {
        // Try webkitRequestFullscreen first, then webkitRequestFullScreen (different capitalization)
        if (element.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          await element.webkitRequestFullScreen()
        } else {
          throw new Error('Webkit fullscreen not available')
        }
      } else {
        await element.requestFullscreen()
      }
    } catch (error) {
      addLog(`Error: ${(error as Error).message}`, 'error')
    }
  }

  const exitFullscreen = async () => {
    try {
      addLog('Exiting fullscreen...', 'info')

      if (useWebkit && document.webkitExitFullscreen) {
        await document.webkitExitFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      addLog(`Error: ${(error as Error).message}`, 'error')
    }
  }

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the Fullscreen API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The Fullscreen API is supported in all modern browsers, but may be disabled.
            </p>
            <p className="text-sm text-muted-foreground">
              Check your browser settings or try a different browser.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Current Fullscreen Status */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>Fullscreen Status</CardTitle>
          <CardDescription>
            Current state of the Fullscreen API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Fullscreen Enabled</div>
              <div className="font-semibold">
                {document.fullscreenEnabled ? '✅ Yes' : '❌ No'}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Currently Fullscreen</div>
              <div className="font-semibold">
                {isFullscreen ? '✅ Yes' : '❌ No'}
              </div>
            </div>
          </div>
          {fullscreenElement && (
            <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
              <div className="text-sm text-muted-foreground">Fullscreen Element</div>
              <div className="font-semibold">{fullscreenElement}</div>
              <Button
                onClick={exitFullscreen}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Exit Fullscreen
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Gallery Demo */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>Image Gallery</CardTitle>
          <CardDescription>
            View image in fullscreen mode
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            ref={imageRef}
            id="fullscreen-image"
            className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            style={{ height: '300px' }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
              Click button to view fullscreen
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white text-sm bg-black/50 p-2 rounded">
              Sample Image - Press ESC to exit fullscreen
            </div>
          </div>
          <Button
            onClick={() => requestFullscreen(imageRef.current, 'Image Gallery')}
            className="w-full"
          >
            🖼️ View Image in Fullscreen
          </Button>
        </CardContent>
      </Card>

      {/* Video Player Demo */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>Video Player</CardTitle>
          <CardDescription>
            Common use case for fullscreen mode
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            ref={videoRef}
            id="fullscreen-video"
            className="bg-black rounded-lg overflow-hidden"
          >
            <video
              className="w-full"
              controls
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect width='640' height='360' fill='%23222'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='20' fill='%23999'%3EBig Buck Bunny%3C/text%3E%3C/svg%3E"
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-4 bg-gray-900 text-white">
              <div className="text-sm font-semibold mb-2">Big Buck Bunny</div>
              <div className="text-xs text-gray-400">
                Demo video from Blender Foundation - Click fullscreen button below or use the video's fullscreen control
              </div>
            </div>
          </div>
          <Button
            onClick={() => requestFullscreen(videoRef.current, 'Video Player')}
            className="w-full"
          >
            🎬 Open Video in Fullscreen
          </Button>
        </CardContent>
      </Card>

      {/* Custom Content Demo */}
      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>Custom Content</CardTitle>
          <CardDescription>
            Any element can be made fullscreen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            ref={customRef}
            id="fullscreen-custom"
            className="relative bg-gradient-to-br from-orange-500 to-red-500 rounded-lg overflow-hidden p-8"
            style={{ minHeight: '200px' }}
          >
            <div className="text-white space-y-4">
              <h3 className="text-2xl font-bold">Interactive Dashboard</h3>
              <p className="text-sm opacity-90">
                This could be a presentation, game, or any interactive content.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white/20 p-4 rounded text-center">
                  <div className="text-3xl font-bold">42</div>
                  <div className="text-xs">Metric A</div>
                </div>
                <div className="bg-white/20 p-4 rounded text-center">
                  <div className="text-3xl font-bold">89</div>
                  <div className="text-xs">Metric B</div>
                </div>
                <div className="bg-white/20 p-4 rounded text-center">
                  <div className="text-3xl font-bold">156</div>
                  <div className="text-xs">Metric C</div>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => requestFullscreen(customRef.current, 'Custom Content')}
            className="w-full"
          >
            📊 View Dashboard in Fullscreen
          </Button>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="border-indigo-500">
        <CardHeader>
          <CardTitle>How the Fullscreen API Works</CardTitle>
          <CardDescription>
            Understanding the implementation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-4">
            <div>
              <div className="text-muted-foreground mb-2">// 1. Request fullscreen on an element</div>
              <pre className="whitespace-pre-wrap">{`const element = document.getElementById('my-element');
await element.requestFullscreen();`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// 2. Exit fullscreen</div>
              <pre className="whitespace-pre-wrap">{`await document.exitFullscreen();`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// 3. Check current fullscreen element</div>
              <pre className="whitespace-pre-wrap">{`const fsElement = document.fullscreenElement;
if (fsElement) {
  console.log('Fullscreen element:', fsElement);
}`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// 4. Listen for fullscreen changes</div>
              <pre className="whitespace-pre-wrap">{`document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    console.log('Entered fullscreen');
  } else {
    console.log('Exited fullscreen');
  }
});`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// 5. Handle errors</div>
              <pre className="whitespace-pre-wrap">{`document.addEventListener('fullscreenerror', () => {
  console.error('Failed to enter fullscreen');
});`}</pre>
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30 text-sm">
              <strong>Tip:</strong> Press ESC key to exit fullscreen at any time
            </div>
            <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
              <strong>Security:</strong> Fullscreen requires user interaction and can be controlled
              by the Permissions Policy
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="border-gray-500">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Real-time fullscreen events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto bg-muted p-4 rounded-lg font-mono text-xs">
            {logs.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No activity yet. Click a fullscreen button to start.
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
