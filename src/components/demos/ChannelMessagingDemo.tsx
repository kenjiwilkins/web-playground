import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error'
}

export function ChannelMessagingDemo() {
  const [isSupported] = useState(typeof MessageChannel !== 'undefined')
  const [logs, setLogs] = useState<LogEntry[]>([])

  // Demo 1: Basic message channel between main and worker
  const workerRef = useRef<Worker | null>(null)
  const [workerStatus, setWorkerStatus] = useState('Not started')
  const [workerStarted, setWorkerStarted] = useState(false)

  // Demo 2: Microfrontend communication
  const reactIframeRef = useRef<HTMLIFrameElement>(null)
  const vueIframeRef = useRef<HTMLIFrameElement>(null)
  const channelRef = useRef<MessageChannel | null>(null)
  const [reactReady, setReactReady] = useState(false)
  const [vueReady, setVueReady] = useState(false)
  const [sharedStatus, setSharedStatus] = useState('Waiting for connection...')

  const addLog = useCallback((message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setLogs(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }, ...prev].slice(0, 15))
  }, [])

  // Demo 1: Worker communication
  const startWorker = useCallback(() => {
    if (workerRef.current) return

    setWorkerStarted(true)

    // Create inline worker
    const workerCode = `
      self.onmessage = function(e) {
        if (e.data.type === 'INIT_PORT') {
          const port = e.ports[0];

          port.onmessage = function(msg) {
            const data = msg.data;

            // Process the message
            if (data.type === 'COMPUTE') {
              const result = data.value * 2;
              port.postMessage({
                type: 'RESULT',
                original: data.value,
                result: result
              });
            }
          };

          // Acknowledge ready
          port.postMessage({ type: 'READY' });
        }
      };
    `

    const blob = new Blob([workerCode], { type: 'application/javascript' })
    const worker = new Worker(URL.createObjectURL(blob))
    workerRef.current = worker

    // Create message channel
    const channel = new MessageChannel()

    // Listen on port1
    channel.port1.onmessage = (e) => {
      const data = e.data
      if (data.type === 'READY') {
        setWorkerStatus('Ready')
        addLog('Worker connected via MessageChannel', 'success')
      } else if (data.type === 'RESULT') {
        setWorkerStatus(`Result: ${data.original} × 2 = ${data.result}`)
        addLog(`Worker computed: ${data.original} × 2 = ${data.result}`, 'info')
      }
    }

    // Transfer port2 to worker
    worker.postMessage({ type: 'INIT_PORT' }, [channel.port2])
    addLog('MessageChannel created for worker', 'info')
  }, [addLog])

  const sendToWorker = useCallback((value: number) => {
    if (!workerRef.current) {
      addLog('Worker not started', 'error')
      return
    }

    const channel = new MessageChannel()
    channel.port1.onmessage = (e) => {
      const data = e.data
      if (data.type === 'READY') {
        // Send computation request
        channel.port1.postMessage({ type: 'COMPUTE', value })
        addLog(`Sent ${value} to worker for computation`, 'info')
      }
    }

    workerRef.current.postMessage({ type: 'INIT_PORT' }, [channel.port2])
  }, [addLog])

  // Demo 2: Microfrontend communication setup
  useEffect(() => {
    const handleReactLoad = () => {
      if (!reactIframeRef.current || !channelRef.current) return

      const channel = channelRef.current
      reactIframeRef.current.contentWindow?.postMessage(
        { type: 'INIT_PORT' },
        '*',
        [channel.port1]
      )
      setReactReady(true)
      addLog('React microfrontend connected', 'success')
    }

    const handleVueLoad = () => {
      if (!vueIframeRef.current || !channelRef.current) return

      const channel = channelRef.current
      vueIframeRef.current.contentWindow?.postMessage(
        { type: 'INIT_PORT' },
        '*',
        [channel.port2]
      )
      setVueReady(true)
      addLog('Vue microfrontend connected', 'success')
    }

    const reactIframe = reactIframeRef.current
    const vueIframe = vueIframeRef.current

    if (reactIframe) {
      reactIframe.addEventListener('load', handleReactLoad)
    }
    if (vueIframe) {
      vueIframe.addEventListener('load', handleVueLoad)
    }

    return () => {
      if (reactIframe) {
        reactIframe.removeEventListener('load', handleReactLoad)
      }
      if (vueIframe) {
        vueIframe.removeEventListener('load', handleVueLoad)
      }
    }
  }, [addLog])

  // Initialize channel for microfrontends
  const initializeMicrofrontends = useCallback(() => {
    // Create message channel
    const channel = new MessageChannel()
    channelRef.current = channel

    // Listen on port1 for messages from React
    channel.port1.onmessage = (e) => {
      const msg = e.data
      addLog(`React → Vue: ${JSON.stringify(msg)}`, 'info')
      setSharedStatus(msg.status || 'Unknown')
    }

    // Listen on port2 for messages from Vue
    channel.port2.onmessage = (e) => {
      const msg = e.data
      addLog(`Vue → React: ${JSON.stringify(msg)}`, 'info')
      setSharedStatus(msg.status || 'Unknown')
    }

    addLog('MessageChannel created for microfrontends', 'success')

    // Reload iframes to reinitialize
    if (reactIframeRef.current) {
      const currentSrc = reactIframeRef.current.src
      reactIframeRef.current.src = currentSrc
    }
    if (vueIframeRef.current) {
      const currentSrc = vueIframeRef.current.src
      vueIframeRef.current.src = currentSrc
    }
  }, [addLog])

  // Cleanup
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
      }
      if (channelRef.current) {
        channelRef.current.port1.close()
        channelRef.current.port2.close()
      }
    }
  }, [])

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the Channel Messaging API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The Channel Messaging API requires a modern browser.
            </p>
            <p className="text-sm text-muted-foreground">
              This API is widely supported in Chrome, Firefox, Safari, and Edge.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Demo 1: Worker Communication */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>1. Web Worker Communication</CardTitle>
          <CardDescription>
            Direct two-way channel between main thread and worker
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Worker Status:</p>
            <p className="text-lg">{workerStatus}</p>
          </div>

          <div className="flex gap-2">
            <Button onClick={startWorker} disabled={workerStarted}>
              Start Worker
            </Button>
            <Button onClick={() => sendToWorker(5)} variant="outline">
              Compute 5 × 2
            </Button>
            <Button onClick={() => sendToWorker(10)} variant="outline">
              Compute 10 × 2
            </Button>
            <Button onClick={() => sendToWorker(42)} variant="outline">
              Compute 42 × 2
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>• Creates a MessageChannel for dedicated communication</p>
            <p>• Port1 stays in main thread, Port2 transferred to worker</p>
            <p>• Direct bidirectional messaging without broadcasting</p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 2: Microfrontend Communication */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>2. Microfrontend Status Sharing</CardTitle>
          <CardDescription>
            React and Vue apps communicating via MessageChannel in iframes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Shared Status Across Microfrontends:</p>
            <p className="text-2xl font-bold">{sharedStatus}</p>
            <div className="flex gap-2 mt-2 text-xs">
              <span className={reactReady ? 'text-green-500' : 'text-red-500'}>
                React: {reactReady ? '✓ Connected' : '✗ Not connected'}
              </span>
              <span className={vueReady ? 'text-green-500' : 'text-red-500'}>
                Vue: {vueReady ? '✓ Connected' : '✗ Not connected'}
              </span>
            </div>
          </div>

          <Button onClick={initializeMicrofrontends} className="w-full">
            Initialize MessageChannel
          </Button>

          <div className="grid gap-4 md:grid-cols-2">
            {/* React Microfrontend */}
            <div className="border-2 border-purple-500 rounded-lg overflow-hidden">
              <div className="bg-purple-500 text-white px-3 py-2 text-sm font-semibold">
                ⚛️ React Microfrontend
              </div>
              <iframe
                ref={reactIframeRef}
                src="/microfrontends/react-app.html"
                className="w-full h-96 border-0"
                title="React Microfrontend"
              />
            </div>

            {/* Vue Microfrontend */}
            <div className="border-2 border-green-500 rounded-lg overflow-hidden">
              <div className="bg-green-500 text-white px-3 py-2 text-sm font-semibold">
                🟢 Vue Microfrontend
              </div>
              <iframe
                ref={vueIframeRef}
                src="/microfrontends/vue-app.html"
                className="w-full h-96 border-0"
                title="Vue Microfrontend"
              />
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Click "Initialize MessageChannel" to connect the microfrontends</p>
            <p>• Change status in either app to see it sync to the other</p>
            <p>• Each app has its own framework (React vs Vue) loaded via CDN</p>
            <p>• MessageChannel enables direct communication without polling</p>
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Real-time log of channel messaging operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto bg-muted p-4 rounded-lg font-mono text-xs">
            {logs.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No activity yet. Try the demos above.
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
