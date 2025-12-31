import { useState, useRef, useCallback, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
}

// Extend Window interface for Document PiP
declare global {
  interface Window {
    documentPictureInPicture?: {
      requestWindow(options?: { width?: number; height?: number }): Promise<Window>
      window: Window | null
    }
  }
}

// Timer Component for PiP
function TimerPiP({ time, isRunning, onToggle, onReset }: {
  time: number
  isRunning: boolean
  onToggle: () => void
  onReset: () => void
}) {
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div
      className="bg-gradient-to-br from-green-500 to-blue-500 p-8 rounded-lg text-white text-center"
      style={{ minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div className="text-5xl font-bold mb-4">{formatTime(time)}</div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={onToggle}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

// Notes Component for PiP
function NotesPiP({ notes, onChange }: {
  notes: string
  onChange: (value: string) => void
}) {
  return (
    <div
      className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-2 border-yellow-500"
      style={{ minHeight: '200px', height: '100%' }}
    >
      <h3 className="font-bold text-lg mb-3 text-yellow-900 dark:text-yellow-100">
        Quick Notes
      </h3>
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your notes here..."
        className="w-full h-64 p-3 rounded border border-yellow-300 dark:border-yellow-700 bg-white dark:bg-gray-800 resize-none"
      />
    </div>
  )
}

export function DocumentPictureInPictureDemo() {
  const [isSupported] = useState('documentPictureInPicture' in window)
  const [isPipOpen, setIsPipOpen] = useState(false)
  const [pipContentType, setPipContentType] = useState<'timer' | 'video' | 'notes' | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [time, setTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [notes, setNotes] = useState('')

  const pipWindowRef = useRef<Window | null>(null)
  const pipRootRef = useRef<Root | null>(null)
  const timerIntervalRef = useRef<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }, ...prev].slice(0, 10))
  }, [])

  // Timer logic
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = window.setInterval(() => {
        setTime(t => t + 1)
      }, 1000)
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [isTimerRunning])

  // Update PiP window when timer changes (only if timer is open)
  useEffect(() => {
    if (pipRootRef.current && isPipOpen && pipContentType === 'timer') {
      pipRootRef.current.render(
        <TimerPiP
          time={time}
          isRunning={isTimerRunning}
          onToggle={() => setIsTimerRunning(!isTimerRunning)}
          onReset={() => {
            setTime(0)
            setIsTimerRunning(false)
          }}
        />
      )
    }
  }, [time, isTimerRunning, isPipOpen, pipContentType])

  // Update PiP window when notes change (only if notes is open)
  useEffect(() => {
    if (pipRootRef.current && isPipOpen && pipContentType === 'notes') {
      pipRootRef.current.render(
        <NotesPiP
          notes={notes}
          onChange={setNotes}
        />
      )
    }
  }, [notes, isPipOpen, pipContentType])

  const copyStyleSheets = (targetWindow: Window) => {
    // Copy all stylesheets from main document to PiP window
    const styleSheets = Array.from(document.styleSheets)
    styleSheets.forEach(sheet => {
      try {
        if (sheet.href) {
          // External stylesheet
          const link = targetWindow.document.createElement('link')
          link.rel = 'stylesheet'
          link.href = sheet.href
          targetWindow.document.head.appendChild(link)
        } else if (sheet.cssRules) {
          // Inline stylesheet
          const style = targetWindow.document.createElement('style')
          const cssText = Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n')
          style.textContent = cssText
          targetWindow.document.head.appendChild(style)
        }
      } catch (e) {
        // Some stylesheets might not be accessible due to CORS
        console.warn('Could not copy stylesheet:', e)
      }
    })
  }

  const openPictureInPicture = async (
    content: React.ReactNode,
    contentType: 'timer' | 'video' | 'notes',
    width = 400,
    height = 300
  ) => {
    if (!window.documentPictureInPicture) {
      addLog('Document PiP not available', 'error')
      return
    }

    try {
      // Close existing PiP window if open
      if (pipWindowRef.current && !pipWindowRef.current.closed) {
        pipWindowRef.current.close()
      }

      // Request a new PiP window
      const pipWindow = await window.documentPictureInPicture.requestWindow({
        width,
        height
      })

      pipWindowRef.current = pipWindow
      setIsPipOpen(true)
      setPipContentType(contentType)
      addLog('Picture-in-Picture window opened', 'success')

      // Copy stylesheets to maintain styling
      copyStyleSheets(pipWindow)

      // Create container for React root
      const container = pipWindow.document.createElement('div')
      container.id = 'pip-root'
      container.style.width = '100%'
      container.style.height = '100%'
      pipWindow.document.body.appendChild(container)

      // Create React root and render content
      const root = createRoot(container)
      pipRootRef.current = root
      root.render(content)

      // Handle window close
      pipWindow.addEventListener('pagehide', () => {
        if (pipRootRef.current) {
          pipRootRef.current.unmount()
          pipRootRef.current = null
        }
        setIsPipOpen(false)
        setPipContentType(null)
        pipWindowRef.current = null
        addLog('Picture-in-Picture window closed', 'info')
      })

    } catch (error) {
      addLog(`Failed to open PiP: ${(error as Error).message}`, 'error')
    }
  }

  const closePictureInPicture = () => {
    if (pipWindowRef.current && !pipWindowRef.current.closed) {
      pipWindowRef.current.close()
    }
  }

  const openTimerPip = () => {
    openPictureInPicture(
      <TimerPiP
        time={time}
        isRunning={isTimerRunning}
        onToggle={() => setIsTimerRunning(!isTimerRunning)}
        onReset={() => {
          setTime(0)
          setIsTimerRunning(false)
        }}
      />,
      'timer',
      300,
      200
    )
  }

  const openVideoPlayerPip = () => {
    openPictureInPicture(
      <div className="bg-black rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
        <video
          className="w-full"
          controls
          autoPlay
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        />
        <div className="p-4 bg-gray-900 text-white">
          <div className="text-sm font-semibold mb-2">Big Buck Bunny</div>
          <div className="text-xs text-gray-400">Demo video from Blender Foundation</div>
        </div>
      </div>,
      'video',
      640,
      400
    )
  }

  const openNotesPip = () => {
    openPictureInPicture(
      <NotesPiP
        notes={notes}
        onChange={setNotes}
      />,
      'notes',
      400,
      500
    )
  }

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the Document Picture-in-Picture API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The Document Picture-in-Picture API is currently available in:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Chrome/Edge 116+ (experimental)</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Note: This is an experimental feature. Support is limited and may require
              enabling flags in chrome://flags
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>Picture-in-Picture Status</CardTitle>
          <CardDescription>
            Current PiP window state
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              {isPipOpen ? (
                <span className="text-green-500 font-semibold">● PiP Window Active</span>
              ) : (
                <span className="text-gray-500">○ No PiP Window</span>
              )}
            </div>
            {isPipOpen && (
              <Button onClick={closePictureInPicture} variant="destructive" size="sm">
                Close PiP Window
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Demo 1: Timer */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>1. Timer Demo</CardTitle>
          <CardDescription>
            A simple timer that can run in Picture-in-Picture mode
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TimerPiP
            time={time}
            isRunning={isTimerRunning}
            onToggle={() => setIsTimerRunning(!isTimerRunning)}
            onReset={() => {
              setTime(0)
              setIsTimerRunning(false)
            }}
          />

          <Button onClick={openTimerPip} disabled={isPipOpen} className="w-full">
            Open Timer in PiP
          </Button>
        </CardContent>
      </Card>

      {/* Demo 2: Video Player */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>2. Custom Video Player</CardTitle>
          <CardDescription>
            Video with custom controls in Picture-in-Picture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-black rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
            <video
              ref={videoRef}
              className="w-full"
              controls
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect width='640' height='360' fill='%23222'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='20' fill='%23999'%3ENo video source%3C/text%3E%3C/svg%3E"
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-4 bg-gray-900 text-white">
              <div className="text-sm font-semibold mb-2">Big Buck Bunny</div>
              <div className="text-xs text-gray-400">
                Demo video from Blender Foundation
              </div>
            </div>
          </div>

          <Button onClick={openVideoPlayerPip} disabled={isPipOpen} className="w-full">
            Open Video Player in PiP
          </Button>
        </CardContent>
      </Card>

      {/* Demo 3: Notes */}
      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>3. Floating Notes</CardTitle>
          <CardDescription>
            Keep notes visible while working in other windows
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <NotesPiP
            notes={notes}
            onChange={setNotes}
          />

          <Button onClick={openNotesPip} disabled={isPipOpen} className="w-full">
            Open Notes in PiP
          </Button>
        </CardContent>
      </Card>

      {/* How it Works */}
      <Card className="border-cyan-500">
        <CardHeader>
          <CardTitle>How Document PiP Works</CardTitle>
          <CardDescription>
            Understanding the implementation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-4">
            <div>
              <div className="text-muted-foreground mb-2">// 1. Request PiP window</div>
              <pre className="whitespace-pre-wrap">{`const pipWindow = await window.documentPictureInPicture
  .requestWindow({ width: 400, height: 300 });`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// 2. Copy stylesheets</div>
              <pre className="whitespace-pre-wrap">{`document.querySelectorAll('link[rel="stylesheet"]')
  .forEach(link => {
    const newLink = pipWindow.document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = link.href;
    pipWindow.document.head.appendChild(newLink);
  });`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// 3. Move content to PiP</div>
              <pre className="whitespace-pre-wrap">{`const content = document.getElementById('my-content');
pipWindow.document.body.appendChild(content);`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// 4. Handle window close</div>
              <pre className="whitespace-pre-wrap">{`pipWindow.addEventListener('pagehide', () => {
  // Return content to main window
  document.body.appendChild(content);
});`}</pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="border-yellow-500">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Real-time Picture-in-Picture events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto bg-muted p-4 rounded-lg font-mono text-xs">
            {logs.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No activity yet. Try opening a PiP window.
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
