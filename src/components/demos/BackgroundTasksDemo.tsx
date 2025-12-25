import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Task {
  id: number
  description: string
  duration: number
}

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'warning'
}

export function BackgroundTasksDemo() {
  const [isSupported] = useState('requestIdleCallback' in window)
  const [tasks, setTasks] = useState<Task[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedCount, setProcessedCount] = useState(0)
  const taskIdRef = useRef<number | null>(null)
  const taskQueueRef = useRef<Task[]>([])
  const taskCounterRef = useRef(0)

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [{ timestamp, message, type }, ...prev].slice(0, 15))
  }, [])

  const generateTasks = (count: number) => {
    const newTasks: Task[] = []
    for (let i = 0; i < count; i++) {
      taskCounterRef.current++
      newTasks.push({
        id: taskCounterRef.current,
        description: `Task ${taskCounterRef.current}`,
        duration: Math.floor(Math.random() * 10) + 5, // 5-15ms
      })
    }
    setTasks(prev => [...prev, ...newTasks])
    taskQueueRef.current.push(...newTasks)
    addLog(`Generated ${count} tasks`, 'info')
  }

  const processTask = (task: Task): number => {
    // Simulate work
    const start = performance.now()
    let count = 0
    while (performance.now() - start < task.duration) {
      count++
    }
    return count
  }

  const runTaskQueue = useCallback(function processQueue(deadline: IdleDeadline) {
    addLog(`Idle callback invoked. didTimeout: ${deadline.didTimeout}`, 'info')

    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && taskQueueRef.current.length > 0) {
      const task = taskQueueRef.current.shift()
      if (task) {
        const timeRemaining = deadline.timeRemaining().toFixed(2)
        addLog(`Processing ${task.description} (${timeRemaining}ms remaining)`, 'success')
        processTask(task)
        setProcessedCount(prev => prev + 1)
        setTasks(prev => prev.filter(t => t.id !== task.id))
      }
    }

    if (taskQueueRef.current.length > 0) {
      addLog(`${taskQueueRef.current.length} tasks remaining, rescheduling...`, 'info')
      taskIdRef.current = requestIdleCallback(processQueue, { timeout: 1000 })
    } else {
      addLog('All tasks completed!', 'success')
      setIsProcessing(false)
      taskIdRef.current = null
    }
  }, [addLog])

  const startProcessing = () => {
    if (taskQueueRef.current.length === 0) {
      addLog('No tasks to process', 'warning')
      return
    }

    setIsProcessing(true)
    setProcessedCount(0)
    addLog('Starting idle task processing...', 'info')
    taskIdRef.current = requestIdleCallback(runTaskQueue, { timeout: 1000 })
  }

  const cancelProcessing = () => {
    if (taskIdRef.current !== null) {
      cancelIdleCallback(taskIdRef.current)
      taskIdRef.current = null
      setIsProcessing(false)
      addLog('Processing cancelled', 'warning')
    }
  }

  const clearAll = () => {
    cancelProcessing()
    setTasks([])
    taskQueueRef.current = []
    setProcessedCount(0)
    addLog('All tasks cleared', 'info')
  }

  const testImmediateVsIdle = () => {
    const iterations = 1000000

    // Test immediate execution
    const immediateStart = performance.now()
    let count = 0
    while (count < iterations) count++
    const immediateTime = (performance.now() - immediateStart).toFixed(2)

    addLog(`Immediate execution: ${immediateTime}ms (blocks main thread)`, 'warning')

    // Test idle execution
    const idleStart = performance.now()
    requestIdleCallback((deadline) => {
      const idleTime = (performance.now() - idleStart).toFixed(2)
      const remaining = deadline.timeRemaining().toFixed(2)
      addLog(`Idle execution: ${idleTime}ms delay, ${remaining}ms available`, 'success')
    })
  }

  return (
    <div className="space-y-4">
      <Card className={isSupported ? 'border-green-500' : 'border-red-500'}>
        <CardHeader>
          <CardTitle>Browser Support Check</CardTitle>
          <CardDescription>
            {isSupported
              ? 'Your browser supports requestIdleCallback!'
              : 'Your browser does not support requestIdleCallback'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className={isSupported ? 'text-green-600' : 'text-red-600'}>
              {isSupported ? '✓' : '✗'}
            </span>
            <code className="text-sm">window.requestIdleCallback</code>
          </div>
        </CardContent>
      </Card>

      {isSupported && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Task Queue Manager</CardTitle>
              <CardDescription>Schedule tasks to run during browser idle time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => generateTasks(5)} variant="outline" size="sm">
                  Add 5 Tasks
                </Button>
                <Button onClick={() => generateTasks(20)} variant="outline" size="sm">
                  Add 20 Tasks
                </Button>
                <Button onClick={() => generateTasks(50)} variant="outline" size="sm">
                  Add 50 Tasks
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={startProcessing}
                  disabled={isProcessing || tasks.length === 0}
                >
                  Start Processing
                </Button>
                <Button
                  onClick={cancelProcessing}
                  disabled={!isProcessing}
                  variant="destructive"
                >
                  Cancel
                </Button>
                <Button onClick={clearAll} variant="outline">
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">{tasks.length}</div>
                  <div className="text-sm text-muted-foreground">Pending Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{processedCount}</div>
                  <div className="text-sm text-muted-foreground">Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{isProcessing ? '🔄' : '⏸️'}</div>
                  <div className="text-sm text-muted-foreground">Status</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Queued Tasks</CardTitle>
              <CardDescription>Tasks waiting to be processed during idle time</CardDescription>
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">No tasks in queue</p>
              ) : (
                <div className="max-h-40 overflow-y-auto">
                  <div className="space-y-1">
                    {tasks.slice(0, 10).map((task) => (
                      <div key={task.id} className="flex items-center gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <code className="bg-muted px-2 py-1 rounded text-xs">
                          {task.description} ({task.duration}ms)
                        </code>
                      </div>
                    ))}
                    {tasks.length > 10 && (
                      <p className="text-xs text-muted-foreground pt-2">
                        ... and {tasks.length - 10} more tasks
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>See the difference between immediate and idle execution</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={testImmediateVsIdle} variant="outline">
                Run Comparison Test
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                This test compares blocking the main thread vs. waiting for idle time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Real-time execution details</CardDescription>
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
              <CardTitle className="text-sm">Usage Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Tasks run when the browser has idle time available</li>
                <li>Each callback gets up to 50ms of idle time by default</li>
                <li>The <code className="bg-muted px-1 py-0.5 rounded">timeout</code> option ensures execution even when busy</li>
                <li>Use for low-priority background work like analytics or data processing</li>
                <li>Avoid DOM changes in idle callbacks - use requestAnimationFrame instead</li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
