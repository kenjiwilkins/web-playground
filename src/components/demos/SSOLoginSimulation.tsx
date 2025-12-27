import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SSOLoginSimulationProps {
  channelName: string
}

export function SSOLoginSimulation({ channelName }: SSOLoginSimulationProps) {
  const [isSupported] = useState('BroadcastChannel' in window)
  const [loginStatus, setLoginStatus] = useState<'pending' | 'authenticating' | 'success'>('pending')
  const [countdown, setCountdown] = useState(3)
  const [username, setUsername] = useState('demo_user')
  const [password, setPassword] = useState('')

  const handleLogin = useCallback(() => {
    if (!username.trim()) {
      return
    }

    setLoginStatus('authenticating')

    // Simulate authentication delay
    setTimeout(() => {
      setLoginStatus('success')

      // Send login success message via BroadcastChannel
      if (isSupported) {
        const channel = new BroadcastChannel(channelName)
        channel.postMessage({
          type: 'sso-login-success',
          timestamp: Date.now(),
          from: 'sso-window',
          data: {
            username: username,
            email: `${username}@example.com`,
            timestamp: new Date().toISOString()
          }
        })
        channel.close()
      }

      // Start countdown to close window
      setCountdown(3)
    }, 1500)
  }, [username, channelName, isSupported])

  // Auto-close countdown
  useEffect(() => {
    if (loginStatus === 'success' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (loginStatus === 'success' && countdown === 0) {
      // Close the window
      window.close()
    }
  }, [loginStatus, countdown])

  // Handle Enter key for login
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && loginStatus === 'pending') {
      handleLogin()
    }
  }, [handleLogin, loginStatus])

  if (!isSupported) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md border-red-500">
          <CardHeader>
            <CardTitle>Browser Not Supported</CardTitle>
            <CardDescription>
              Your browser does not support the Broadcast Channel API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please use a modern browser that supports BroadcastChannel.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <CardTitle>SSO Login</CardTitle>
          <CardDescription>
            Sign in to continue to your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loginStatus === 'pending' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button
                onClick={handleLogin}
                className="w-full"
                size="lg"
                disabled={!username.trim()}
              >
                Sign In
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                This is a demo. Any username will work.
              </p>
            </div>
          )}

          {loginStatus === 'authenticating' && (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-sm text-muted-foreground">Authenticating...</p>
            </div>
          )}

          {loginStatus === 'success' && (
            <div className="text-center py-8 space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-green-700 dark:text-green-400">
                  Login Successful!
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Welcome back, {username}
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm font-medium mb-1">Closing window in {countdown}s</p>
                <p className="text-xs text-muted-foreground">
                  Your login status has been broadcast to the main page
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
