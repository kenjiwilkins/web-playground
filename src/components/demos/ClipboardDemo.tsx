import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error'
}

export function ClipboardDemo() {
  const [isSupported] = useState('clipboard' in navigator)
  const [logs, setLogs] = useState<LogEntry[]>([])

  // Demo 1: Copy text
  const [textToCopy, setTextToCopy] = useState('Hello from Clipboard API!')

  // Demo 2: Read clipboard
  const [clipboardContent, setClipboardContent] = useState('')

  // Demo 3: Rich text copy
  const richTextRef = useRef<HTMLDivElement>(null)

  // Demo 4: Image copy (if supported)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const addLog = useCallback((message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setLogs(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }, ...prev].slice(0, 10))
  }, [])

  // Demo 1: Copy text to clipboard
  const copyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      addLog(`Copied: "${textToCopy}"`, 'success')
    } catch (err) {
      addLog(`Failed to copy: ${(err as Error).message}`, 'error')
    }
  }, [textToCopy, addLog])

  // Demo 2: Read text from clipboard
  const readClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      setClipboardContent(text)
      addLog(`Read from clipboard: "${text}"`, 'success')
    } catch (err) {
      addLog(`Failed to read: ${(err as Error).message}`, 'error')
    }
  }, [addLog])

  // Demo 3: Copy rich text/HTML
  const copyRichText = useCallback(async () => {
    const htmlContent = richTextRef.current?.innerHTML || ''
    const plainText = richTextRef.current?.innerText || ''

    try {
      // Try modern ClipboardItem API
      if (typeof ClipboardItem !== 'undefined') {
        const blob = new Blob([htmlContent], { type: 'text/html' })
        const plainBlob = new Blob([plainText], { type: 'text/plain' })
        const clipboardItem = new ClipboardItem({
          'text/html': blob,
          'text/plain': plainBlob
        })
        await navigator.clipboard.write([clipboardItem])
        addLog('Copied rich text (HTML + plain text)', 'success')
      } else {
        // Fallback to plain text
        await navigator.clipboard.writeText(plainText)
        addLog('Copied as plain text (ClipboardItem not supported)', 'success')
      }
    } catch (err) {
      addLog(`Failed to copy rich text: ${(err as Error).message}`, 'error')
    }
  }, [addLog])

  // Demo 4: Copy image from canvas
  const copyImage = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Draw something on canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Create a simple graphic
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const gradient = ctx.createLinearGradient(0, 0, 200, 200)
    gradient.addColorStop(0, '#4f46e5')
    gradient.addColorStop(1, '#06b6d4')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 200, 200)

    ctx.fillStyle = 'white'
    ctx.font = 'bold 24px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Copied!', 100, 100)

    try {
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          addLog('Failed to create image blob', 'error')
          return
        }

        try {
          if (typeof ClipboardItem !== 'undefined') {
            const clipboardItem = new ClipboardItem({ 'image/png': blob })
            await navigator.clipboard.write([clipboardItem])
            addLog('Copied image to clipboard!', 'success')
          } else {
            addLog('ClipboardItem not supported for images', 'error')
          }
        } catch (err) {
          addLog(`Failed to copy image: ${(err as Error).message}`, 'error')
        }
      })
    } catch (err) {
      addLog(`Failed to create image: ${(err as Error).message}`, 'error')
    }
  }, [addLog])

  // Demo 5: Listen to clipboard events
  const handleCopy = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    const selection = window.getSelection()?.toString() || ''
    const customText = `Copied from Clipboard Demo: ${selection}`

    e.clipboardData.setData('text/plain', customText)
    addLog(`Copy event intercepted: "${selection}"`, 'info')
  }, [addLog])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    const target = e.target as HTMLInputElement
    target.value = `[Pasted] ${text}`
    addLog(`Paste event intercepted: "${text}"`, 'info')
  }, [addLog])

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the Clipboard API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The Clipboard API requires a modern browser and HTTPS connection.
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Chrome/Edge 66+</li>
              <li>Firefox 63+</li>
              <li>Safari 13.1+</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Note: This API only works in secure contexts (HTTPS or localhost).
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Demo 1: Copy Text */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>1. Copy Text to Clipboard</CardTitle>
          <CardDescription>
            Use writeText() to copy text programmatically
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Text to Copy:
            </label>
            <input
              type="text"
              value={textToCopy}
              onChange={(e) => setTextToCopy(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background"
              placeholder="Enter text to copy"
            />
          </div>

          <Button onClick={copyText} className="w-full">
            Copy to Clipboard
          </Button>

          <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
            <pre>{`await navigator.clipboard.writeText('${textToCopy}')`}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Demo 2: Read Clipboard */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>2. Read from Clipboard</CardTitle>
          <CardDescription>
            Use readText() to paste clipboard content (requires permission)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={readClipboard} className="w-full">
            Read Clipboard Content
          </Button>

          {clipboardContent && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Clipboard Content:</p>
              <p className="text-sm break-all">{clipboardContent}</p>
            </div>
          )}

          <div className="bg-yellow-500/10 border border-yellow-500 p-3 rounded-lg text-sm">
            <p className="font-medium mb-1">⚠️ Permission Required</p>
            <p className="text-xs text-muted-foreground">
              Your browser may prompt for clipboard read permission. This is a security feature.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 3: Rich Text Copy */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>3. Copy Rich Text (HTML)</CardTitle>
          <CardDescription>
            Copy formatted content with multiple MIME types using ClipboardItem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            ref={richTextRef}
            className="bg-muted p-4 rounded-lg border-2 border-dashed border-green-500"
            contentEditable
            suppressContentEditableWarning
          >
            <h3 className="font-bold text-lg">Rich Text Example</h3>
            <p className="mt-2">
              This is <strong>bold</strong> and <em>italic</em> text.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </div>

          <Button onClick={copyRichText} className="w-full">
            Copy Rich Text
          </Button>

          <div className="text-xs text-muted-foreground">
            <p>Try pasting into a rich text editor (Word, Google Docs, etc.) to see formatting preserved!</p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 4: Copy Image */}
      <Card className="border-yellow-500">
        <CardHeader>
          <CardTitle>4. Copy Image to Clipboard</CardTitle>
          <CardDescription>
            Copy canvas-generated images using ClipboardItem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              width={200}
              height={200}
              className="border-2 border-muted rounded-lg"
            />
          </div>

          <Button onClick={copyImage} className="w-full">
            Generate & Copy Image
          </Button>

          <div className="text-xs text-muted-foreground">
            <p>After copying, try pasting into an image editor or document!</p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 5: Clipboard Events */}
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>5. Clipboard Events</CardTitle>
          <CardDescription>
            Intercept copy and paste events to customize behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select and copy this text (will add custom prefix):
            </label>
            <div
              className="bg-muted p-4 rounded-lg border-2 border-red-500 select-text"
              onCopy={handleCopy}
            >
              Try selecting and copying this text. The copy event will be intercepted!
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Paste into this field (will add custom prefix):
            </label>
            <input
              type="text"
              onPaste={handlePaste}
              className="w-full px-3 py-2 border rounded-md bg-background"
              placeholder="Paste something here..."
            />
          </div>

          <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
            <pre>{`element.addEventListener('copy', (e) => {
  e.preventDefault()
  const text = window.getSelection()?.toString()
  e.clipboardData.setData('text/plain', \`Custom: \${text}\`)
})`}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="border-gray-500">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Real-time log of clipboard operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto bg-muted p-4 rounded-lg font-mono text-xs">
            {logs.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No activity yet. Try one of the demos above.
              </p>
            )}
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  log.type === 'error' ? 'text-red-500' :
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
