import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BackgroundSyncDemo } from '@/components/demos/BackgroundSyncDemo'
import { PageHeader } from '@/components/layout/page/PageHeader'
import { PageSection } from '@/components/layout/page/PageSection'
import { InfoBox } from '@/components/layout/page/InfoBox'

export default function BackgroundSync() {
  return (
    <div className="space-y-6">
      <PageHeader
        id="background-sync-api"
        title="Background Synchronization API"
        description="Defer tasks to run in a service worker when the user has a stable network connection"
      />

      <PageSection id="live-demo" title="Live Demo">
        <BackgroundSyncDemo />
      </PageSection>

      <PageSection id="introduction" title="Introduction">
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
            <InfoBox variant="info" title="Experimental Feature">
              This API is still experimental and may not be available in all browsers. Always check
              browser compatibility before using in production.
            </InfoBox>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="how-it-works" title="How It Works">
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
      </PageSection>

      <PageSection id="main-interfaces" title="Main Interfaces">
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
      </PageSection>

      <PageSection id="register-sync" title="Register a Sync Task">
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
      </PageSection>

      <PageSection id="check-tags" title="Check Existing Sync Tasks">
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
      </PageSection>

      <PageSection id="service-worker-handler" title="Handle Sync in Service Worker">
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
      </PageSection>

      <PageSection id="use-cases" title="Common Use Cases">
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
      </PageSection>

      <PageSection id="requirements" title="Requirements">
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
      </PageSection>

      <PageSection id="complete-example" title="Complete Example">
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
      </PageSection>
    </div>
  )
}
