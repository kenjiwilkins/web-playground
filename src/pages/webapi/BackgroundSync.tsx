import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BackgroundSyncDemo } from '@/components/demos/BackgroundSyncDemo'

export default function BackgroundSync() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="background-sync-api" className="text-3xl font-bold tracking-tight">
          Background Synchronization API
        </h1>
        <p className="text-muted-foreground">
          Defer tasks to run in a service worker when the user has a stable network connection
        </p>
      </div>

      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <BackgroundSyncDemo />
      </section>

      <section>
        <h2 id="introduction" className="text-2xl font-semibold mb-4">
          Introduction
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What is Background Synchronization?</CardTitle>
            <CardDescription>Enabling offline-first web applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Background Synchronization API enables web applications to defer tasks to run in a
              service worker once the user has a stable network connection. This allows apps to
              synchronize data with servers even when offline or when the browser tab is closed.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Experimental Feature</p>
              <p className="text-sm">
                This API is still experimental and may not be available in all browsers. Always check
                browser compatibility before using in production.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="how-it-works" className="text-2xl font-semibold mb-4">
          How It Works
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>The Synchronization Process</CardTitle>
            <CardDescription>Understanding the workflow</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Registration:</strong> Web app registers a sync request with a unique tag identifier
              </li>
              <li>
                <strong>Storage:</strong> The tag is stored and associated with the service worker registration
              </li>
              <li>
                <strong>Detection:</strong> When network connectivity is restored, the browser notifies the service worker
              </li>
              <li>
                <strong>Execution:</strong> Service worker receives the sync event and performs the deferred task
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="main-interfaces" className="text-2xl font-semibold mb-4">
          Main Interfaces
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>SyncManager</CardTitle>
              <CardDescription>Register and manage sync tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <code className="bg-muted px-1 py-0.5 rounded">register(tag)</code>
                <p className="text-sm text-muted-foreground mt-1">Register a sync task with a unique tag</p>
              </div>
              <div>
                <code className="bg-muted px-1 py-0.5 rounded">getTags()</code>
                <p className="text-sm text-muted-foreground mt-1">Retrieve registered sync task tags</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SyncEvent</CardTitle>
              <CardDescription>Fired in service worker when sync occurs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <code className="bg-muted px-1 py-0.5 rounded">event.tag</code>
                <p className="text-sm text-muted-foreground mt-1">Identifies which sync task triggered the event</p>
              </div>
              <div>
                <code className="bg-muted px-1 py-0.5 rounded">event.waitUntil(promise)</code>
                <p className="text-sm text-muted-foreground mt-1">Extend the event lifetime until promise resolves</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="register-sync" className="text-2xl font-semibold mb-4">
          Register a Sync Task
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Requesting Background Sync</CardTitle>
            <CardDescription>From your web application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">async function syncMessagesLater() &#123;</code>
              <code className="block ml-4">const registration = await navigator.serviceWorker.ready;</code>
              <code className="block ml-4">try &#123;</code>
              <code className="block ml-8">await registration.sync.register('sync-messages');</code>
              <code className="block ml-8">console.log('Background sync registered!');</code>
              <code className="block ml-4">&#125; catch (error) &#123;</code>
              <code className="block ml-8">console.log('Background Sync could not be registered!', error);</code>
              <code className="block ml-4">&#125;</code>
              <code className="block">&#125;</code>
            </div>
            <p className="text-sm text-muted-foreground">
              The tag <code className="bg-muted px-1 py-0.5 rounded">'sync-messages'</code> is a unique
              identifier you choose to identify this sync task.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="check-tags" className="text-2xl font-semibold mb-4">
          Check Existing Sync Tasks
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Retrieve Registered Tags</CardTitle>
            <CardDescription>Check if a sync is already scheduled</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">navigator.serviceWorker.ready.then((registration) =&gt; &#123;</code>
              <code className="block ml-4">registration.sync.getTags().then((tags) =&gt; &#123;</code>
              <code className="block ml-8">if (tags.includes('sync-messages')) &#123;</code>
              <code className="block ml-12">console.log('Messages sync already requested');</code>
              <code className="block ml-8">&#125;</code>
              <code className="block ml-4">&#125;);</code>
              <code className="block">&#125;);</code>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="service-worker-handler" className="text-2xl font-semibold mb-4">
          Handle Sync in Service Worker
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Listening for Sync Events</CardTitle>
            <CardDescription>Respond to background sync in your service worker</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">self.addEventListener('sync', (event) =&gt; &#123;</code>
              <code className="block ml-4">if (event.tag === 'sync-messages') &#123;</code>
              <code className="block ml-8">event.waitUntil(sendOutboxMessages());</code>
              <code className="block ml-4">&#125;</code>
              <code className="block">&#125;);</code>
              <code className="block"></code>
              <code className="block">async function sendOutboxMessages() &#123;</code>
              <code className="block ml-4">// Get messages from IndexedDB or Cache</code>
              <code className="block ml-4">const messages = await getOutboxMessages();</code>
              <code className="block ml-4"></code>
              <code className="block ml-4">// Send each message to the server</code>
              <code className="block ml-4">for (const message of messages) &#123;</code>
              <code className="block ml-8">await fetch('/api/messages', &#123;</code>
              <code className="block ml-12">method: 'POST',</code>
              <code className="block ml-12">body: JSON.stringify(message)</code>
              <code className="block ml-8">&#125;);</code>
              <code className="block ml-4">&#125;</code>
              <code className="block">&#125;</code>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="use-cases" className="text-2xl font-semibold mb-4">
          Common Use Cases
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>When to Use Background Sync</CardTitle>
            <CardDescription>Perfect for offline-first applications</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="text-primary">📧</span>
                <div>
                  <strong>Email Applications</strong> - Send queued messages when connection returns
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">💬</span>
                <div>
                  <strong>Chat Apps</strong> - Deliver pending messages in the background
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">📝</span>
                <div>
                  <strong>Form Submissions</strong> - Retry failed form submissions automatically
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">🔄</span>
                <div>
                  <strong>Data Synchronization</strong> - Sync user data with server when offline
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">📱</span>
                <div>
                  <strong>Content Updates</strong> - Update app content when connectivity is restored
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="requirements" className="text-2xl font-semibold mb-4">
          Requirements
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Security and Browser Requirements</CardTitle>
            <CardDescription>What you need to use this API</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>HTTPS only</strong> - Must be in a secure context
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Service Worker support</strong> - Requires an active service worker registration
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Available in Web Workers</strong> - Can be used in worker contexts
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="complete-example" className="text-2xl font-semibold mb-4">
          Complete Example
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Full Implementation</CardTitle>
            <CardDescription>Putting it all together</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Main Application (app.js)</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">// Register service worker</code>
                <code className="block">if ('serviceWorker' in navigator &amp;&amp; 'SyncManager' in window) &#123;</code>
                <code className="block ml-4">navigator.serviceWorker.register('/sw.js');</code>
                <code className="block">&#125;</code>
                <code className="block"></code>
                <code className="block">// Queue a message for sending</code>
                <code className="block">async function sendMessage(message) &#123;</code>
                <code className="block ml-4">// Save to IndexedDB first</code>
                <code className="block ml-4">await saveToOutbox(message);</code>
                <code className="block ml-4"></code>
                <code className="block ml-4">// Try to send immediately</code>
                <code className="block ml-4">if (navigator.onLine) &#123;</code>
                <code className="block ml-8">await sendImmediately(message);</code>
                <code className="block ml-4">&#125; else &#123;</code>
                <code className="block ml-8">// Register background sync</code>
                <code className="block ml-8">const registration = await navigator.serviceWorker.ready;</code>
                <code className="block ml-8">await registration.sync.register('sync-messages');</code>
                <code className="block ml-4">&#125;</code>
                <code className="block">&#125;</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
