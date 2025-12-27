import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BroadcastChannelDemo } from '@/components/demos/BroadcastChannelDemo'
import { SSOLoginSimulation } from '@/components/demos/SSOLoginSimulation'
import { useEffect, useState } from 'react'

export default function BroadcastChannel() {
  const [isSSOMode, setIsSSOMode] = useState(false)
  const [channelName, setChannelName] = useState('demo-channel')

  useEffect(() => {
    // Check if opened with ?broadcast=sso query parameter
    const params = new URLSearchParams(window.location.search)
    const broadcastMode = params.get('broadcast')
    const channel = params.get('channel')

    if (broadcastMode === 'sso') {
      setIsSSOMode(true)
      if (channel) {
        setChannelName(channel)
      }
    }
  }, [])

  // If in SSO mode, show the SSO login simulation
  if (isSSOMode) {
    return <SSOLoginSimulation channelName={channelName} />
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="broadcast-channel-api" className="text-3xl font-bold tracking-tight">
          Broadcast Channel API
        </h1>
        <p className="text-muted-foreground">
          Enable communication between different browsing contexts (tabs, windows, iframes) of the same origin
        </p>
      </div>

      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <BroadcastChannelDemo />
      </section>

      <section>
        <h2 id="introduction" className="text-2xl font-semibold mb-4">
          Introduction
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What is the Broadcast Channel API?</CardTitle>
            <CardDescription>Simple cross-context messaging</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Broadcast Channel API allows communication between different browsing contexts
              (windows, tabs, frames, or iframes) of the same origin. It provides a simple way to
              send messages that will be received by all listening contexts on the same channel.
            </p>
            <p>
              This is particularly useful for synchronizing state across multiple tabs, coordinating
              user sessions, or broadcasting updates that should be reflected in all open instances
              of your application.
            </p>
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Good Browser Support</p>
              <p className="text-sm">
                The Broadcast Channel API is well-supported in modern browsers including Chrome, Firefox,
                Edge, and Safari.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="basic-usage" className="text-2xl font-semibold mb-4">
          Basic Usage
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Creating and Using a Broadcast Channel</CardTitle>
            <CardDescription>Simple API for cross-context communication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">1. Create a Channel</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">const channel = new BroadcastChannel('my-channel');</code>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                All contexts using the same channel name will be connected
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2">2. Listen for Messages</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">channel.onmessage = (event) =&gt; &#123;</code>
                <code className="block ml-4">console.log('Received:', event.data);</code>
                <code className="block">&#125;;</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">3. Send Messages</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">channel.postMessage(&#123;</code>
                <code className="block ml-4">type: 'update',</code>
                <code className="block ml-4">data: 'Hello from another tab!'</code>
                <code className="block">&#125;);</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">4. Close the Channel</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">channel.close();</code>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Always close channels when no longer needed
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="properties-methods" className="text-2xl font-semibold mb-4">
          Properties & Methods
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>name</CardTitle>
              <CardDescription>Read-only property</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Returns the name of the channel as a string.
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">channel.name // 'my-channel'</code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>postMessage()</CardTitle>
              <CardDescription>Send a message</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Sends a message to all other contexts listening on the same channel.
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">channel.postMessage(data)</code>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Data can be any structured-cloneable type
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>close()</CardTitle>
              <CardDescription>Close the channel</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Closes the channel, disconnecting it from the underlying messaging mechanism.
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">channel.close()</code>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                No more messages can be sent or received after closing
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>onmessage</CardTitle>
              <CardDescription>Message event handler</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Event handler called when a message is received on the channel.
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">channel.onmessage = handler</code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>onmessageerror</CardTitle>
              <CardDescription>Error event handler</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Event handler called when a message error occurs (e.g., deserialization fails).
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">channel.onmessageerror = handler</code>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="usage-examples" className="text-2xl font-semibold mb-4">
          Usage Examples
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Common Usage Patterns</CardTitle>
            <CardDescription>Practical examples of using the Broadcast Channel API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">State Synchronization Across Tabs</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">const syncChannel = new BroadcastChannel('app-state');</code>
                <code className="block"></code>
                <code className="block">// Send state updates</code>
                <code className="block">function updateState(newState) &#123;</code>
                <code className="block ml-4">localStorage.setItem('appState', JSON.stringify(newState));</code>
                <code className="block ml-4">syncChannel.postMessage(&#123; type: 'state-update', state: newState &#125;);</code>
                <code className="block">&#125;</code>
                <code className="block"></code>
                <code className="block">// Listen for updates from other tabs</code>
                <code className="block">syncChannel.onmessage = (event) =&gt; &#123;</code>
                <code className="block ml-4">if (event.data.type === 'state-update') &#123;</code>
                <code className="block ml-8">applyStateUpdate(event.data.state);</code>
                <code className="block ml-4">&#125;</code>
                <code className="block">&#125;;</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">User Logout Across All Tabs</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">const authChannel = new BroadcastChannel('auth');</code>
                <code className="block"></code>
                <code className="block">// Logout and notify other tabs</code>
                <code className="block">function logout() &#123;</code>
                <code className="block ml-4">clearUserSession();</code>
                <code className="block ml-4">authChannel.postMessage(&#123; type: 'logout' &#125;);</code>
                <code className="block ml-4">redirectToLogin();</code>
                <code className="block">&#125;</code>
                <code className="block"></code>
                <code className="block">// Handle logout in other tabs</code>
                <code className="block">authChannel.onmessage = (event) =&gt; &#123;</code>
                <code className="block ml-4">if (event.data.type === 'logout') &#123;</code>
                <code className="block ml-8">clearUserSession();</code>
                <code className="block ml-8">redirectToLogin();</code>
                <code className="block ml-4">&#125;</code>
                <code className="block">&#125;;</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Real-time Notifications</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">const notifChannel = new BroadcastChannel('notifications');</code>
                <code className="block"></code>
                <code className="block">// Send notification to all tabs</code>
                <code className="block">function broadcastNotification(message) &#123;</code>
                <code className="block ml-4">notifChannel.postMessage(&#123;</code>
                <code className="block ml-8">type: 'notification',</code>
                <code className="block ml-8">title: 'New Message',</code>
                <code className="block ml-8">body: message,</code>
                <code className="block ml-8">timestamp: Date.now()</code>
                <code className="block ml-4">&#125;);</code>
                <code className="block">&#125;</code>
                <code className="block"></code>
                <code className="block">// Display notifications in all tabs</code>
                <code className="block">notifChannel.onmessage = (event) =&gt; &#123;</code>
                <code className="block ml-4">if (event.data.type === 'notification') &#123;</code>
                <code className="block ml-8">showToast(event.data.title, event.data.body);</code>
                <code className="block ml-4">&#125;</code>
                <code className="block">&#125;;</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Tab Coordination (Leader Election)</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">const coordChannel = new BroadcastChannel('coordination');</code>
                <code className="block">let isLeader = false;</code>
                <code className="block"></code>
                <code className="block">// Request leadership</code>
                <code className="block">coordChannel.postMessage(&#123; type: 'leader-request' &#125;);</code>
                <code className="block"></code>
                <code className="block">coordChannel.onmessage = (event) =&gt; &#123;</code>
                <code className="block ml-4">if (event.data.type === 'leader-request') &#123;</code>
                <code className="block ml-8">if (isLeader) &#123;</code>
                <code className="block ml-12">coordChannel.postMessage(&#123; type: 'leader-exists' &#125;);</code>
                <code className="block ml-8">&#125;</code>
                <code className="block ml-4">&#125; else if (event.data.type === 'leader-exists') &#123;</code>
                <code className="block ml-8">isLeader = false;</code>
                <code className="block ml-4">&#125;</code>
                <code className="block">&#125;;</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="use-cases" className="text-2xl font-semibold mb-4">
          Use Cases
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>When to Use Broadcast Channel API</CardTitle>
            <CardDescription>Ideal scenarios for cross-context communication</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="text-primary">🔄</span>
                <div>
                  <strong>State Synchronization</strong> - Keep application state in sync across multiple tabs
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">🔐</span>
                <div>
                  <strong>Session Management</strong> - Logout users from all tabs simultaneously
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">🔔</span>
                <div>
                  <strong>Notifications</strong> - Show the same notification in all open tabs
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">📊</span>
                <div>
                  <strong>Data Refresh</strong> - Signal all tabs to refresh their data
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">👑</span>
                <div>
                  <strong>Tab Coordination</strong> - Implement leader election among tabs
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">🎨</span>
                <div>
                  <strong>Theme Sync</strong> - Synchronize UI theme changes across tabs
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">💾</span>
                <div>
                  <strong>Cache Invalidation</strong> - Clear caches in all contexts when data changes
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="advantages" className="text-2xl font-semibold mb-4">
          Advantages
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Why Use Broadcast Channel API?</CardTitle>
            <CardDescription>Benefits of this communication method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Simple API</strong> - Easy to understand and use, minimal setup required
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Automatic delivery</strong> - Messages sent to all listening contexts automatically
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Same-origin only</strong> - Secure communication within your application
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Low overhead</strong> - Lightweight and efficient messaging
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>No polling needed</strong> - Event-driven, no need to check for updates
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Works across contexts</strong> - Tabs, windows, iframes all supported
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="limitations" className="text-2xl font-semibold mb-4">
          Limitations
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Important Constraints</CardTitle>
            <CardDescription>What to be aware of when using Broadcast Channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Same-origin only</strong> - Only works between contexts with the same origin
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>No sender identification</strong> - Sending context receives its own messages
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Not persistent</strong> - Messages not delivered to contexts that join later
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Structured clone</strong> - Data must be structured-cloneable (no functions, etc.)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>No acknowledgment</strong> - Can't tell if messages were received
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="best-practices" className="text-2xl font-semibold mb-4">
          Best Practices
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Guidelines for Using Broadcast Channel API</CardTitle>
            <CardDescription>Recommendations for optimal implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Use unique channel names</strong> - Avoid conflicts with other parts of your app
              </li>
              <li>
                <strong>Always close channels</strong> - Close channels when components unmount or are no longer needed
              </li>
              <li>
                <strong>Filter own messages</strong> - Include sender ID in messages to ignore your own broadcasts
              </li>
              <li>
                <strong>Use message types</strong> - Structure messages with a type field for easier handling
              </li>
              <li>
                <strong>Validate incoming data</strong> - Don't trust message structure, validate before using
              </li>
              <li>
                <strong>Handle errors gracefully</strong> - Use onmessageerror for deserialization errors
              </li>
              <li>
                <strong>Combine with localStorage</strong> - Use localStorage for persistence and BroadcastChannel for sync
              </li>
              <li>
                <strong>Consider Service Workers</strong> - For more complex scenarios, Service Workers might be better
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="browser-support" className="text-2xl font-semibold mb-4">
          Browser Support
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Wide Browser Support</CardTitle>
            <CardDescription>Available in all modern browsers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Chrome/Edge</strong> - Full support
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Firefox</strong> - Full support
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Safari</strong> - Supported in recent versions
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Mobile browsers</strong> - Supported on modern mobile platforms
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm font-semibold mb-2">Production Ready</p>
              <p className="text-sm">
                The Broadcast Channel API has good browser support and is safe to use in modern web applications.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="feature-detection" className="text-2xl font-semibold mb-4">
          Feature Detection
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Checking for API Support</CardTitle>
            <CardDescription>How to detect if the Broadcast Channel API is available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">if ('BroadcastChannel' in window) &#123;</code>
              <code className="block ml-4">// Broadcast Channel API is supported</code>
              <code className="block ml-4">const channel = new BroadcastChannel('my-channel');</code>
              <code className="block">&#125; else &#123;</code>
              <code className="block ml-4">// Fallback to other methods (localStorage events, etc.)</code>
              <code className="block ml-4">console.log('BroadcastChannel not supported');</code>
              <code className="block">&#125;</code>
            </div>
            <p className="text-sm text-muted-foreground">
              Always include feature detection and have a fallback strategy for older browsers.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
