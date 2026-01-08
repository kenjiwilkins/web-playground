import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BeaconDemo } from '@/components/demos/BeaconDemo'
import { PageHeader } from '@/components/layout/page/PageHeader'
import { PageSection } from '@/components/layout/page/PageSection'
import { InfoBox } from '@/components/layout/page/InfoBox'

export default function Beacon() {
  return (
    <div className="space-y-6">
      <PageHeader
        id="beacon-api"
        title="Beacon API"
        description="Send asynchronous data to a server without blocking page unload, perfect for analytics and diagnostics"
      />

      <PageSection id="live-demo" title="Live Demo">
        <BeaconDemo />
      </PageSection>

      <PageSection id="introduction" title="Introduction">
        <Card>
          <CardHeader>
            <CardTitle>What is the Beacon API?</CardTitle>
            <CardDescription>Reliable asynchronous data transmission</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Beacon API provides a way to send asynchronous and non-blocking requests to a server.
              Unlike XMLHttpRequest or fetch, beacon requests continue even if the page is being unloaded,
              making them ideal for sending analytics, diagnostics, or end-of-session data.
            </p>
            <p>
              The API is designed to minimize resource contention with other time-critical operations while
              ensuring that data is reliably sent. It's commonly used for logging, analytics, and diagnostics
              where you don't need a response from the server.
            </p>
            <InfoBox variant="success" title="Wide Browser Support">
              The Beacon API has excellent browser support and is widely available in all modern browsers.
            </InfoBox>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="syntax" title="Syntax">
        <Card>
          <CardHeader>
            <CardTitle>Using navigator.sendBeacon()</CardTitle>
            <CardDescription>Simple and straightforward API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <code className="block">const result = navigator.sendBeacon(url, data);</code>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm mb-1">Parameters</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <code className="bg-muted px-1.5 py-0.5 rounded">url</code> - The URL to send data to (string)
                  </li>
                  <li>
                    <code className="bg-muted px-1.5 py-0.5 rounded">data</code> (optional) - Data to send:
                    ArrayBuffer, Blob, FormData, URLSearchParams, or string
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Return Value</p>
                <p className="text-sm">
                  Returns <code className="bg-muted px-1.5 py-0.5 rounded">true</code> if the beacon was successfully
                  queued for transmission, <code className="bg-muted px-1.5 py-0.5 rounded">false</code> otherwise.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="data-types" title="Supported Data Types">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Blob</CardTitle>
              <CardDescription>Binary Large Object</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="bg-muted p-3 rounded-lg space-y-1">
                <code className="block text-xs">const blob = new Blob(</code>
                <code className="block text-xs ml-4">[JSON.stringify(data)],</code>
                <code className="block text-xs ml-4">&#123; type: 'application/json' &#125;</code>
                <code className="block text-xs">);</code>
                <code className="block text-xs">navigator.sendBeacon(url, blob);</code>
              </div>
              <p className="text-xs text-muted-foreground">
                Most common for JSON data with proper content type
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FormData</CardTitle>
              <CardDescription>Form-encoded data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="bg-muted p-3 rounded-lg space-y-1">
                <code className="block text-xs">const formData = new FormData();</code>
                <code className="block text-xs">formData.append('key', 'value');</code>
                <code className="block text-xs">navigator.sendBeacon(url, formData);</code>
              </div>
              <p className="text-xs text-muted-foreground">
                Useful for sending form-like data
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>URLSearchParams</CardTitle>
              <CardDescription>URL-encoded parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="bg-muted p-3 rounded-lg space-y-1">
                <code className="block text-xs">const params = new URLSearchParams();</code>
                <code className="block text-xs">params.append('event', 'click');</code>
                <code className="block text-xs">navigator.sendBeacon(url, params);</code>
              </div>
              <p className="text-xs text-muted-foreground">
                Sends data as application/x-www-form-urlencoded
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>String</CardTitle>
              <CardDescription>Plain text data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="bg-muted p-3 rounded-lg space-y-1">
                <code className="block text-xs">const data = 'event=click&time=' + Date.now();</code>
                <code className="block text-xs">navigator.sendBeacon(url, data);</code>
              </div>
              <p className="text-xs text-muted-foreground">
                Sent as text/plain by default
              </p>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection id="usage-examples" title="Usage Examples">
        <Card>
          <CardHeader>
            <CardTitle>Common Usage Patterns</CardTitle>
            <CardDescription>Practical examples of using the Beacon API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Basic Analytics Beacon</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">const data = JSON.stringify(&#123;</code>
                <code className="block ml-4">event: 'page_view',</code>
                <code className="block ml-4">timestamp: new Date().toISOString(),</code>
                <code className="block ml-4">page: window.location.pathname</code>
                <code className="block">&#125;);</code>
                <code className="block"></code>
                <code className="block">const blob = new Blob([data], &#123; type: 'application/json' &#125;);</code>
                <code className="block">navigator.sendBeacon('/analytics', blob);</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Sending Data on Page Unload</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">window.addEventListener('beforeunload', () =&gt; &#123;</code>
                <code className="block ml-4">const sessionData = JSON.stringify(&#123;</code>
                <code className="block ml-8">sessionDuration: performance.now(),</code>
                <code className="block ml-8">interactions: userInteractionCount</code>
                <code className="block ml-4">&#125;);</code>
                <code className="block"></code>
                <code className="block ml-4">const blob = new Blob([sessionData], &#123; type: 'application/json' &#125;);</code>
                <code className="block ml-4">navigator.sendBeacon('/session-end', blob);</code>
                <code className="block">&#125;);</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Error Logging</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">window.addEventListener('error', (event) =&gt; &#123;</code>
                <code className="block ml-4">const errorData = JSON.stringify(&#123;</code>
                <code className="block ml-8">message: event.message,</code>
                <code className="block ml-8">filename: event.filename,</code>
                <code className="block ml-8">lineno: event.lineno,</code>
                <code className="block ml-8">timestamp: Date.now()</code>
                <code className="block ml-4">&#125;);</code>
                <code className="block"></code>
                <code className="block ml-4">const blob = new Blob([errorData], &#123; type: 'application/json' &#125;);</code>
                <code className="block ml-4">navigator.sendBeacon('/errors', blob);</code>
                <code className="block">&#125;);</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Using Page Visibility API</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">document.addEventListener('visibilitychange', () =&gt; &#123;</code>
                <code className="block ml-4">if (document.visibilityState === 'hidden') &#123;</code>
                <code className="block ml-8">const data = JSON.stringify(&#123;</code>
                <code className="block ml-12">event: 'page_hidden',</code>
                <code className="block ml-12">timestamp: Date.now()</code>
                <code className="block ml-8">&#125;);</code>
                <code className="block"></code>
                <code className="block ml-8">const blob = new Blob([data], &#123; type: 'application/json' &#125;);</code>
                <code className="block ml-8">navigator.sendBeacon('/visibility', blob);</code>
                <code className="block ml-4">&#125;</code>
                <code className="block">&#125;);</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="use-cases" title="Use Cases">
        <Card>
          <CardHeader>
            <CardTitle>When to Use the Beacon API</CardTitle>
            <CardDescription>Ideal scenarios for beacon requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="text-primary">📊</span>
                <div>
                  <strong>Analytics & Metrics</strong> - Track page views, user interactions, and engagement metrics
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">🔍</span>
                <div>
                  <strong>Diagnostics</strong> - Send performance metrics, error logs, and diagnostic data
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">⏱️</span>
                <div>
                  <strong>Session Tracking</strong> - Record session duration and end-of-session data
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">🚪</span>
                <div>
                  <strong>Exit Intent</strong> - Capture data when users leave your site
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">🔔</span>
                <div>
                  <strong>Event Logging</strong> - Log user actions without waiting for responses
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">💾</span>
                <div>
                  <strong>Auto-save Progress</strong> - Periodically save user progress in the background
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="advantages" title="Advantages">
        <Card>
          <CardHeader>
            <CardTitle>Why Use Beacon API?</CardTitle>
            <CardDescription>Benefits over traditional request methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Non-blocking</strong> - Requests don't block page navigation or unload
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Reliable</strong> - Browser guarantees delivery attempt even during page transitions
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Simple API</strong> - One method call, no complex setup required
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Low overhead</strong> - Minimal resource usage and processing
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Asynchronous</strong> - Doesn't wait for server response
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>CORS-safe</strong> - Follows CORS policies automatically
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="limitations" title="Limitations">
        <Card>
          <CardHeader>
            <CardTitle>Important Constraints</CardTitle>
            <CardDescription>What you need to know before using beacons</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>No response handling</strong> - Cannot read server response or status codes
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Size limits</strong> - Browser-dependent payload size limit (typically 64KB)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>POST only</strong> - Always uses HTTP POST method
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>No custom headers</strong> - Cannot set custom request headers
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Best effort delivery</strong> - Not guaranteed to be delivered (though highly reliable)
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="best-practices" title="Best Practices">
        <Card>
          <CardHeader>
            <CardTitle>Guidelines for Using Beacon API</CardTitle>
            <CardDescription>Recommendations for optimal implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Check return value</strong> - Always check if sendBeacon() returns true to confirm queuing
              </li>
              <li>
                <strong>Use appropriate data types</strong> - Prefer Blob with proper MIME type for JSON data
              </li>
              <li>
                <strong>Keep payloads small</strong> - Stay well under size limits for reliability
              </li>
              <li>
                <strong>Use with visibility API</strong> - Combine with Page Visibility for better tracking
              </li>
              <li>
                <strong>Don't rely on delivery</strong> - Have fallback mechanisms for critical data
              </li>
              <li>
                <strong>Batch when possible</strong> - Send aggregated data instead of many small beacons
              </li>
              <li>
                <strong>Server-side handling</strong> - Accept POST requests and handle CORS properly
              </li>
              <li>
                <strong>Test thoroughly</strong> - Verify beacon requests in Network tab (type: "ping")
              </li>
            </ol>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="browser-support" title="Browser Support">
        <Card>
          <CardHeader>
            <CardTitle>Excellent Cross-Browser Support</CardTitle>
            <CardDescription>Widely available in modern browsers</CardDescription>
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
                  <strong>Safari</strong> - Full support
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Mobile browsers</strong> - Widely supported on mobile platforms
                </div>
              </div>
            </div>
            <InfoBox variant="success" title="Production Ready" className="mt-4">
              The Beacon API has excellent browser support and is safe to use in production applications.
            </InfoBox>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="feature-detection" title="Feature Detection">
        <Card>
          <CardHeader>
            <CardTitle>Checking for API Support</CardTitle>
            <CardDescription>How to detect if the Beacon API is available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">if ('sendBeacon' in navigator) &#123;</code>
              <code className="block ml-4">// Beacon API is supported</code>
              <code className="block ml-4">navigator.sendBeacon(url, data);</code>
              <code className="block">&#125; else &#123;</code>
              <code className="block ml-4">// Fallback to fetch or XMLHttpRequest</code>
              <code className="block ml-4">fetch(url, &#123; method: 'POST', body: data &#125;);</code>
              <code className="block">&#125;</code>
            </div>
            <p className="text-sm text-muted-foreground">
              While support is excellent, always include feature detection for robustness.
            </p>
          </CardContent>
        </Card>
      </PageSection>
    </div>
  )
}
