import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
}

interface ColorHistory {
  hex: string
  rgb: string
  hsl: string
  timestamp: string
}

// Extend Window interface for EyeDropper
declare global {
  interface Window {
    EyeDropper?: {
      new (): EyeDropper
    }
  }

  interface EyeDropper {
    open(): Promise<{ sRGBHex: string }>
  }
}

export function EyeDropperDemo() {
  const [isSupported] = useState('EyeDropper' in window)
  const [currentColor, setCurrentColor] = useState<string | null>(null)
  const [colorHistory, setColorHistory] = useState<ColorHistory[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isPickingColor, setIsPickingColor] = useState(false)

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }, ...prev].slice(0, 10))
  }, [])

  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return 'Invalid color'
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    return `rgb(${r}, ${g}, ${b})`
  }

  const hexToHsl = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return 'Invalid color'

    const r = parseInt(result[1], 16) / 255
    const g = parseInt(result[2], 16) / 255
    const b = parseInt(result[3], 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
      }
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  }

  const pickColor = async () => {
    if (!window.EyeDropper) {
      addLog('EyeDropper not supported', 'error')
      return
    }

    try {
      setIsPickingColor(true)
      addLog('Opening eyedropper...', 'info')

      const eyeDropper = new window.EyeDropper()
      const result = await eyeDropper.open()

      const hex = result.sRGBHex
      const rgb = hexToRgb(hex)
      const hsl = hexToHsl(hex)

      setCurrentColor(hex)
      setColorHistory(prev => [{
        hex,
        rgb,
        hsl,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev].slice(0, 10))

      addLog(`Color selected: ${hex}`, 'success')
      setIsPickingColor(false)
    } catch (error) {
      setIsPickingColor(false)
      if ((error as Error).name === 'AbortError') {
        addLog('Color selection cancelled', 'warning')
      } else {
        addLog(`Error: ${(error as Error).message}`, 'error')
      }
    }
  }

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text)
      addLog(`${format} copied to clipboard: ${text}`, 'success')
    } catch {
      addLog(`Failed to copy to clipboard`, 'error')
    }
  }

  const clearHistory = () => {
    setColorHistory([])
    addLog('Color history cleared', 'info')
  }

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the EyeDropper API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The EyeDropper API is currently available in:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Chrome/Edge 95+</li>
              <li>Opera 81+</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Note: Firefox and Safari do not currently support this API.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Color Picker */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>Pick a Color</CardTitle>
          <CardDescription>
            Click the button to activate the eyedropper and select any color from your screen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={pickColor}
            disabled={isPickingColor}
            className="w-full"
            size="lg"
          >
            {isPickingColor ? 'Picking Color...' : '🎨 Open Eyedropper'}
          </Button>

          {currentColor && (
            <div className="border-2 rounded-lg p-4 space-y-3" style={{ borderColor: currentColor }}>
              <div className="flex items-center gap-4">
                <div
                  className="w-24 h-24 rounded-lg border-2 border-gray-300 shadow-lg"
                  style={{ backgroundColor: currentColor }}
                />
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg">Selected Color</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground">HEX:</span>
                      <code className="bg-muted px-2 py-1 rounded">{currentColor}</code>
                      <Button
                        onClick={() => copyToClipboard(currentColor, 'HEX')}
                        variant="outline"
                        size="sm"
                      >
                        Copy
                      </Button>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground">RGB:</span>
                      <code className="bg-muted px-2 py-1 rounded">{hexToRgb(currentColor)}</code>
                      <Button
                        onClick={() => copyToClipboard(hexToRgb(currentColor), 'RGB')}
                        variant="outline"
                        size="sm"
                      >
                        Copy
                      </Button>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground">HSL:</span>
                      <code className="bg-muted px-2 py-1 rounded">{hexToHsl(currentColor)}</code>
                      <Button
                        onClick={() => copyToClipboard(hexToHsl(currentColor), 'HSL')}
                        variant="outline"
                        size="sm"
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Color History */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>Color History</CardTitle>
          <CardDescription>
            Your recently picked colors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {colorHistory.length > 0 && (
            <Button onClick={clearHistory} variant="outline" size="sm">
              Clear History
            </Button>
          )}

          {colorHistory.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No colors picked yet. Use the eyedropper to start!
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {colorHistory.map((color, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setCurrentColor(color.hex)}
                >
                  <div
                    className="h-20"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-2 bg-muted">
                    <div className="text-xs font-mono text-center">{color.hex}</div>
                    <div className="text-xs text-muted-foreground text-center">{color.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>How the EyeDropper Works</CardTitle>
          <CardDescription>
            Understanding the implementation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-4">
            <div>
              <div className="text-muted-foreground mb-2">// 1. Create EyeDropper instance</div>
              <pre className="whitespace-pre-wrap">{`const eyeDropper = new EyeDropper();`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// 2. Open and await selection</div>
              <pre className="whitespace-pre-wrap">{`const result = await eyeDropper.open();`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// 3. Get the color value</div>
              <pre className="whitespace-pre-wrap">{`const color = result.sRGBHex; // "#FF5733"`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// Complete example with error handling</div>
              <pre className="whitespace-pre-wrap">{`button.addEventListener('click', async () => {
  const eyeDropper = new EyeDropper();
  try {
    const { sRGBHex } = await eyeDropper.open();
    console.log('Selected color:', sRGBHex);
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('User cancelled');
    }
  }
});`}</pre>
            </div>
          </div>

          <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
            <strong>Important:</strong> The EyeDropper can only be activated from a user gesture
            (click, tap, etc.). It cannot be opened programmatically without user interaction.
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Real-time eyedropper events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto bg-muted p-4 rounded-lg font-mono text-xs">
            {logs.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No activity yet. Click the eyedropper button to start.
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
