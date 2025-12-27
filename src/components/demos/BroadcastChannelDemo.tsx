import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}

interface BroadcastMessage {
  type: string
  data?: unknown
  timestamp: number
  from?: string
}

export function BroadcastChannelDemo() {
  const [isSupported] = useState('BroadcastChannel' in window)
  const [channelName, setChannelName] = useState('demo-channel')
  const [isChannelOpen, setIsChannelOpen] = useState(false)
  const [customMessage, setCustomMessage] = useState('')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [messageCount, setMessageCount] = useState(0)
  const [ssoTabOpen, setSsoTabOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<{ username?: string; email?: string } | null>(null)
  const channelRef = useRef<BroadcastChannel | null>(null)
  const ssoWindowRef = useRef<Window | null>(null)

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [{ timestamp, message, type }, ...prev].slice(0, 20))
  }, [])

  const openChannel = useCallback(() => {
    if (!isSupported) {
      addLog('BroadcastChannel API not supported', 'error')
      return
    }

    if (channelRef.current) {
      addLog('Channel already open', 'warning')
      return
    }

    try {
      const channel = new BroadcastChannel(channelName)
      channelRef.current = channel

      channel.onmessage = (event: MessageEvent<BroadcastMessage>) => {
        const msg = event.data
        setMessageCount(prev => prev + 1)

        if (msg.type === 'ping') {
          addLog(`Received PING from ${msg.from || 'unknown'}`, 'success')
          // Auto-respond to ping
          const response: BroadcastMessage = {
            type: 'pong',
            from: 'main-tab',
            timestamp: Date.now(),
            data: { message: 'Hello from main tab!' }
          }
          channel.postMessage(response)
          addLog('Sent PONG response', 'info')
        } else if (msg.type === 'sso-login-success') {
          // Handle SSO login success
          setIsLoggedIn(true)
          setUserData(msg.data as { username?: string; email?: string })
          addLog(`SSO Login successful! Welcome ${(msg.data as any)?.username || 'user'}`, 'success')
        } else if (msg.type === 'beacon-received') {
          addLog(`Received beacon acknowledgment: ${JSON.stringify(msg.data)}`, 'success')
        } else {
          addLog(`Received: ${JSON.stringify(msg)}`, 'success')
        }
      }

      channel.onmessageerror = () => {
        addLog('Message error occurred', 'error')
      }

      setIsChannelOpen(true)
      addLog(`Channel "${channelName}" opened successfully`, 'success')
    } catch (error) {
      addLog(`Error opening channel: ${error}`, 'error')
    }
  }, [isSupported, channelName, addLog])

  const closeChannel = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.close()
      channelRef.current = null
      setIsChannelOpen(false)
      addLog('Channel closed', 'info')
    }
  }, [addLog])

  const sendMessage = useCallback((message: BroadcastMessage) => {
    if (!channelRef.current) {
      addLog('Channel not open. Open channel first.', 'warning')
      return
    }

    try {
      channelRef.current.postMessage(message)
      addLog(`Sent: ${JSON.stringify(message)}`, 'info')
    } catch (error) {
      addLog(`Error sending message: ${error}`, 'error')
    }
  }, [addLog])

  const sendCustomMessage = useCallback(() => {
    if (!customMessage.trim()) {
      addLog('Please enter a message', 'warning')
      return
    }

    const message: BroadcastMessage = {
      type: 'custom',
      from: 'main-tab',
      timestamp: Date.now(),
      data: customMessage
    }

    sendMessage(message)
    setCustomMessage('')
  }, [customMessage, sendMessage, addLog])

  const openSSOLogin = useCallback(() => {
    if (ssoWindowRef.current && !ssoWindowRef.current.closed) {
      addLog('SSO login window already open', 'warning')
      ssoWindowRef.current.focus()
      return
    }

    // Open the SSO login tab with broadcast query parameter
    const url = `${window.location.origin}/webapi/broadcast-channel?broadcast=sso&channel=${encodeURIComponent(channelName)}`
    const newWindow = window.open(url, '_blank', 'width=500,height=600')

    if (newWindow) {
      ssoWindowRef.current = newWindow
      setSsoTabOpen(true)
      addLog('SSO login window opened', 'success')

      // Check if window is closed
      const checkClosed = setInterval(() => {
        if (newWindow.closed) {
          setSsoTabOpen(false)
          ssoWindowRef.current = null
          addLog('SSO login window closed', 'info')
          clearInterval(checkClosed)
        }
      }, 500)
    } else {
      addLog('Failed to open SSO login window. Check popup blocker.', 'error')
    }
  }, [channelName, addLog])

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false)
    setUserData(null)
    addLog('Logged out', 'info')
  }, [addLog])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (channelRef.current) {
        channelRef.current.close()
      }
      if (ssoWindowRef.current && !ssoWindowRef.current.closed) {
        ssoWindowRef.current.close()
      }
    }
  }, [])

  return (
    <div className="space-y-4">
      <Card className={isSupported ? 'border-green-500' : 'border-red-500'}>
        <CardHeader>
          <CardTitle>Browser Support Check</CardTitle>
          <CardDescription>
            {isSupported
              ? 'Your browser supports the Broadcast Channel API!'
              : 'Your browser does not support the Broadcast Channel API'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className={isSupported ? 'text-green-600' : 'text-red-600'}>
              {isSupported ? '✓' : '✗'}
            </span>
            <code className="text-sm">BroadcastChannel</code>
          </div>
        </CardContent>
      </Card>

      {isSupported && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Channel Statistics</CardTitle>
              <CardDescription>Messages received on this channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center p-6 bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {messageCount}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Messages Received
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-6 bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">
                      {isChannelOpen ? (
                        <span className="text-green-600 dark:text-green-400">● Open</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">● Closed</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Channel Status
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Channel Configuration</CardTitle>
              <CardDescription>Set up your broadcast channel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Channel Name</label>
                <input
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  disabled={isChannelOpen}
                  placeholder="my-channel"
                  className="w-full px-3 py-2 border rounded-md bg-background disabled:opacity-50"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={openChannel}
                  disabled={isChannelOpen}
                  className="flex-1"
                >
                  Open Channel
                </Button>
                <Button
                  onClick={closeChannel}
                  disabled={!isChannelOpen}
                  variant="destructive"
                  className="flex-1"
                >
                  Close Channel
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className={isLoggedIn ? 'border-green-500' : 'border-blue-500'}>
            <CardHeader>
              <CardTitle>SSO Login Demo</CardTitle>
              <CardDescription>
                Simulate Single Sign-On authentication without leaving the current page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {!isLoggedIn ? (
                <>
                  <Button
                    onClick={openSSOLogin}
                    disabled={!isChannelOpen}
                    className="w-full"
                    size="lg"
                  >
                    {ssoTabOpen ? 'SSO Login in Progress...' : 'Login with SSO'}
                  </Button>
                  {!isChannelOpen && (
                    <p className="text-sm text-muted-foreground">
                      Open the channel first before logging in
                    </p>
                  )}
                  {ssoTabOpen && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-sm font-semibold mb-1">SSO Login Window Active</p>
                      <p className="text-sm">
                        Complete the login in the popup window. The window will automatically close
                        after successful authentication and this page will be updated.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm font-semibold mb-2 text-green-700 dark:text-green-400">
                      ✓ Logged In Successfully
                    </p>
                    {userData && (
                      <div className="text-sm space-y-1">
                        <p><strong>Username:</strong> {userData.username || 'N/A'}</p>
                        <p><strong>Email:</strong> {userData.email || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Send pre-configured messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button
                  onClick={() => sendMessage({ type: 'ping', from: 'main-tab', timestamp: Date.now() })}
                  disabled={!isChannelOpen}
                  variant="outline"
                >
                  Send PING
                </Button>
                <Button
                  onClick={() => sendMessage({
                    type: 'notification',
                    from: 'main-tab',
                    timestamp: Date.now(),
                    data: { title: 'Hello!', body: 'Test notification' }
                  })}
                  disabled={!isChannelOpen}
                  variant="outline"
                >
                  Send Notification
                </Button>
                <Button
                  onClick={() => sendMessage({
                    type: 'data-sync',
                    from: 'main-tab',
                    timestamp: Date.now(),
                    data: { userId: 123, action: 'update' }
                  })}
                  disabled={!isChannelOpen}
                  variant="outline"
                >
                  Send Data Sync
                </Button>
                <Button
                  onClick={() => sendMessage({
                    type: 'refresh',
                    from: 'main-tab',
                    timestamp: Date.now()
                  })}
                  disabled={!isChannelOpen}
                  variant="outline"
                >
                  Send Refresh Signal
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Message</CardTitle>
              <CardDescription>Send your own message to all tabs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Enter your message here..."
                className="w-full px-3 py-2 border rounded-md bg-background font-mono text-sm min-h-[80px]"
              />
              <Button
                onClick={sendCustomMessage}
                disabled={!isChannelOpen}
                className="w-full"
              >
                Send Custom Message
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Channel events and messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 font-mono text-xs space-y-1 max-h-64 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-muted-foreground">No activity yet. Open a channel to get started.</p>
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

          <Card className="border-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="text-sm">Testing Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Open channel first before testing cross-tab communication</li>
                <li>Try opening this page in multiple tabs to see messages broadcast to all</li>
                <li>The second tab demo shows automatic PING/PONG with auto-close</li>
                <li>All tabs/windows with the same channel name will receive messages</li>
                <li>Messages are sent only within the same origin (protocol + domain + port)</li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
