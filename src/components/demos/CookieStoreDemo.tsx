import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error'
}

// Extended cookie interface with all possible properties
interface ExtendedCookie extends CookieListItem {
  domain?: string
  path?: string
  expires?: number
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

export function CookieStoreDemo() {
  const [isSupported] = useState('cookieStore' in window)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [cookies, setCookies] = useState<CookieList>([])

  // Demo 1: Cookie operations
  const [cookieName, setCookieName] = useState('demo-cookie')
  const [cookieValue, setCookieValue] = useState('Hello World')
  const [cookieExpires, setCookieExpires] = useState(7) // days

  // Demo 2: Search cookie
  const [searchName, setSearchName] = useState('')
  const [searchResult, setSearchResult] = useState<ExtendedCookie | null>(null)

  const addLog = useCallback((message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setLogs(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }, ...prev].slice(0, 15))
  }, [])

  // Get all cookies
  const getAllCookies = useCallback(async () => {
    if (!window.cookieStore) return

    try {
      const allCookies = await window.cookieStore.getAll()
      setCookies(allCookies)
      addLog(`Retrieved ${allCookies.length} cookies`, 'success')
    } catch (error) {
      addLog(`Failed to get cookies: ${(error as Error).message}`, 'error')
    }
  }, [addLog])

  // Set a cookie
  const setCookie = useCallback(async () => {
    if (!window.cookieStore) return

    try {
      const expiresDate = new Date()
      expiresDate.setDate(expiresDate.getDate() + cookieExpires)

      await window.cookieStore.set({
        name: cookieName,
        value: cookieValue,
        expires: expiresDate.getTime(),
        sameSite: 'lax'
      })

      addLog(`Cookie "${cookieName}" set successfully`, 'success')
      getAllCookies()
    } catch (error) {
      addLog(`Failed to set cookie: ${(error as Error).message}`, 'error')
    }
  }, [cookieName, cookieValue, cookieExpires, addLog, getAllCookies])

  // Get a specific cookie
  const getCookie = useCallback(async () => {
    if (!window.cookieStore || !searchName) return

    try {
      const cookie = await window.cookieStore.get(searchName)

      if (cookie) {
        setSearchResult(cookie as ExtendedCookie)
        addLog(`Found cookie: ${cookie.name} = ${cookie.value}`, 'success')
      } else {
        setSearchResult(null)
        addLog(`Cookie "${searchName}" not found`, 'info')
      }
    } catch (error) {
      addLog(`Failed to get cookie: ${(error as Error).message}`, 'error')
    }
  }, [searchName, addLog])

  // Delete a cookie
  const deleteCookie = useCallback(async (name: string) => {
    if (!window.cookieStore) return

    try {
      await window.cookieStore.delete(name)
      addLog(`Cookie "${name}" deleted`, 'success')
      getAllCookies()
      if (searchResult?.name === name) {
        setSearchResult(null)
      }
    } catch (error) {
      addLog(`Failed to delete cookie: ${(error as Error).message}`, 'error')
    }
  }, [addLog, getAllCookies, searchResult])

  // Watch for cookie changes
  useEffect(() => {
    if (!window.cookieStore) return

    const handleChange = (event: CookieChangeEvent) => {
      const changed = event.changed || []
      const deleted = event.deleted || []

      changed.forEach((cookie: CookieListItem) => {
        addLog(`Cookie changed: ${cookie.name} = ${cookie.value}`, 'info')
      })

      deleted.forEach((cookie: CookieListItem) => {
        addLog(`Cookie deleted: ${cookie.name}`, 'info')
      })

      getAllCookies()
    }

    window.cookieStore.addEventListener('change', handleChange)

    return () => {
      window.cookieStore?.removeEventListener('change', handleChange)
    }
  }, [addLog, getAllCookies])

  // Load cookies on mount
  useEffect(() => {
    if (isSupported) {
      // Use Promise to avoid setState directly in effect
      Promise.resolve().then(() => getAllCookies())
    }
  }, [isSupported, getAllCookies])

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the Cookie Store API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The Cookie Store API is available in:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Chrome/Edge 87+</li>
              <li>Opera 73+</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Firefox and Safari do not currently support this API.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Demo 1: Set Cookie */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>1. Set Cookie</CardTitle>
          <CardDescription>
            Create a new cookie with expiration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Cookie Name:
              </label>
              <input
                type="text"
                value={cookieName}
                onChange={(e) => setCookieName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="cookie-name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Cookie Value:
              </label>
              <input
                type="text"
                value={cookieValue}
                onChange={(e) => setCookieValue(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="cookie-value"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Expires in (days):
            </label>
            <input
              type="number"
              value={cookieExpires}
              onChange={(e) => setCookieExpires(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md bg-background"
              min="1"
              max="365"
            />
          </div>

          <Button onClick={setCookie} className="w-full">
            Set Cookie
          </Button>
        </CardContent>
      </Card>

      {/* Demo 2: Get Cookie */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>2. Get Cookie</CardTitle>
          <CardDescription>
            Retrieve a specific cookie by name
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md bg-background"
              placeholder="Enter cookie name"
            />
            <Button onClick={getCookie}>
              Get Cookie
            </Button>
          </div>

          {searchResult && (
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Name:</span>
                <span className="font-mono">{searchResult.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Value:</span>
                <span className="font-mono">{searchResult.value}</span>
              </div>
              {searchResult && (
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Domain:</span>
                  <span className="font-mono">{searchResult.domain}</span>
                </div>
              )}
              {searchResult.path && (
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Path:</span>
                  <span className="font-mono">{searchResult.path}</span>
                </div>
              )}
              {searchResult.expires && (
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Expires:</span>
                  <span className="font-mono">
                    {new Date(searchResult.expires).toLocaleString()}
                  </span>
                </div>
              )}
              {searchResult.sameSite && (
                <div className="flex justify-between text-sm">
                  <span className="font-medium">SameSite:</span>
                  <span className="font-mono">{searchResult.sameSite}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="font-medium">Secure:</span>
                <span className="font-mono">{searchResult.secure ? 'Yes' : 'No'}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Demo 3: All Cookies */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>3. All Cookies</CardTitle>
          <CardDescription>
            View and manage all cookies for this site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={getAllCookies} variant="outline" className="w-full">
            Refresh Cookie List
          </Button>

          {cookies.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No cookies found. Create one above!
            </div>
          ) : (
            <div className="space-y-2">
              {cookies.map((cookie) => (
                <div
                  key={cookie.name || 'unknown'}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium font-mono text-sm">{cookie.name || 'unknown'}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {cookie.value || ''}
                    </div>
                  </div>
                  <Button
                    onClick={() => cookie.name && deleteCookie(cookie.name)}
                    variant="destructive"
                    size="sm"
                    disabled={!cookie.name}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="border-yellow-500">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Real-time log of cookie operations (includes change events)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto bg-muted p-4 rounded-lg font-mono text-xs">
            {logs.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No activity yet. Try setting or getting a cookie.
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
