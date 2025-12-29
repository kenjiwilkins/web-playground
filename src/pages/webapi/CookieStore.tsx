import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CookieStoreDemo } from '@/components/demos/CookieStoreDemo'

export default function CookieStore() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 id="cookie-store-api" className="text-3xl font-bold tracking-tight">
          Cookie Store API
        </h1>
        <p className="text-muted-foreground">
          Modern asynchronous API for reading and writing HTTP cookies
        </p>
      </div>

      {/* Live Demo */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <CookieStoreDemo />
      </section>

      {/* What is it */}
      <section>
        <h2 id="what-is-it" className="text-2xl font-semibold mb-4">
          What is the Cookie Store API?
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Asynchronous Cookie Management</CardTitle>
            <CardDescription>A modern replacement for document.cookie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Cookie Store API provides an asynchronous interface for reading and writing HTTP cookies.
              It's a modern alternative to the legacy synchronous <code className="text-sm bg-muted px-1 rounded">document.cookie</code> API,
              offering better performance and developer experience.
            </p>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-semibold text-sm">Key Features:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Promise-based asynchronous operations</li>
                <li>Change notifications for cookie updates</li>
                <li>Works in both documents and service workers</li>
                <li>Type-safe cookie objects instead of string parsing</li>
                <li>Better error handling</li>
                <li>More readable and maintainable code</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 text-sm">
              <strong>Why use it?</strong> The Cookie Store API eliminates the need for manual string
              parsing and provides a cleaner, more modern interface for cookie management. It also
              enables service workers to read and write cookies asynchronously.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Getting Started */}
      <section>
        <h2 id="getting-started" className="text-2xl font-semibold mb-4">
          Getting Started
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Basic Usage</CardTitle>
            <CardDescription>Simple cookie operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`// Set a cookie
await cookieStore.set('user-id', '12345');

// Set a cookie with options
await cookieStore.set({
  name: 'session',
  value: 'abc123',
  expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
  sameSite: 'lax'
});

// Get a cookie
const cookie = await cookieStore.get('user-id');
console.log(cookie); // { name: 'user-id', value: '12345', ... }

// Get all cookies
const allCookies = await cookieStore.getAll();

// Delete a cookie
await cookieStore.delete('user-id');`}</code>
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Important Notes:</h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>All methods return Promises - use <code className="text-xs bg-muted px-1 rounded">await</code> or <code className="text-xs bg-muted px-1 rounded">.then()</code></li>
                <li>Cookie values are automatically URI-encoded/decoded</li>
                <li>Expires time is in milliseconds since Unix epoch</li>
                <li>Always check for browser support before using</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Core API */}
      <section>
        <h2 id="core-api" className="text-2xl font-semibold mb-4">
          Core API Methods
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">cookieStore.get()</CardTitle>
              <CardDescription>Retrieve a single cookie by name</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-3 rounded text-sm">
                <code>cookieStore.get(name: string): Promise&lt;Cookie | null&gt;</code>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`const cookie = await cookieStore.get('session-token');
if (cookie) {
  console.log('Token:', cookie.value);
  console.log('Expires:', new Date(cookie.expires));
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">cookieStore.getAll()</CardTitle>
              <CardDescription>Retrieve all accessible cookies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-3 rounded text-sm">
                <code>cookieStore.getAll(): Promise&lt;Cookie[]&gt;</code>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`const cookies = await cookieStore.getAll();
cookies.forEach(cookie => {
  console.log(\`\${cookie.name}: \${cookie.value}\`);
});

// Filter by name pattern
const sessionCookies = await cookieStore.getAll({
  name: 'session'
});`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">cookieStore.set()</CardTitle>
              <CardDescription>Create or update a cookie</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-3 rounded text-sm">
                <code>cookieStore.set(name: string, value: string): Promise&lt;void&gt;</code>
                <br />
                <code>cookieStore.set(options: CookieInit): Promise&lt;void&gt;</code>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`// Simple set
await cookieStore.set('theme', 'dark');

// With options
await cookieStore.set({
  name: 'preferences',
  value: JSON.stringify({ lang: 'en', tz: 'UTC' }),
  expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
  path: '/',
  sameSite: 'strict',
  secure: true
});`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">cookieStore.delete()</CardTitle>
              <CardDescription>Remove a cookie</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-3 rounded text-sm">
                <code>cookieStore.delete(name: string): Promise&lt;void&gt;</code>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`await cookieStore.delete('session-token');

// Delete with specific path
await cookieStore.delete({
  name: 'session-token',
  path: '/admin'
});`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Change Events */}
      <section>
        <h2 id="change-events" className="text-2xl font-semibold mb-4">
          Watching Cookie Changes
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Cookie Change Events</CardTitle>
            <CardDescription>Get notified when cookies are modified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The Cookie Store API provides change events that fire whenever cookies are created,
              updated, or deleted. This is useful for synchronizing state across tabs or responding
              to authentication changes.
            </p>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`cookieStore.addEventListener('change', (event) => {
  // Cookies that were added or updated
  for (const cookie of event.changed) {
    console.log('Changed:', cookie.name, '=', cookie.value);
  }

  // Cookies that were deleted
  for (const cookie of event.deleted) {
    console.log('Deleted:', cookie.name);
  }
});

// Example: React hook
useEffect(() => {
  const handleChange = (event) => {
    // Update state based on cookie changes
    setCookies(prev => {
      // Apply changes
      return updatedCookies;
    });
  };

  cookieStore.addEventListener('change', handleChange);
  return () => cookieStore.removeEventListener('change', handleChange);
}, []);`}</code>
              </pre>
            </div>

            <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
              <strong>Note:</strong> Change events only fire for cookies in the current origin.
              Third-party cookies won't trigger events.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Use Cases */}
      <section>
        <h2 id="use-cases" className="text-2xl font-semibold mb-4">
          Common Use Cases
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`// Save preferences
const prefs = {
  theme: 'dark',
  lang: 'en',
  layout: 'grid'
};

await cookieStore.set({
  name: 'user-prefs',
  value: JSON.stringify(prefs),
  expires: Date.now() + 365 * 24 * 60 * 60 * 1000
});

// Load preferences
const cookie = await cookieStore.get('user-prefs');
if (cookie) {
  const prefs = JSON.parse(cookie.value);
  applyPreferences(prefs);
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Session Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`// Login
await cookieStore.set({
  name: 'session',
  value: sessionToken,
  expires: Date.now() + 3600 * 1000, // 1 hour
  sameSite: 'strict',
  secure: true
});

// Logout
await cookieStore.delete('session');

// Check session
const session = await cookieStore.get('session');
if (!session) {
  redirectToLogin();
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analytics Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`// Track visitor
let visitorId = await cookieStore.get('visitor-id');

if (!visitorId) {
  visitorId = crypto.randomUUID();
  await cookieStore.set({
    name: 'visitor-id',
    value: visitorId,
    expires: Date.now() + 730 * 24 * 60 * 60 * 1000 // 2 years
  });
}

trackEvent('page-view', visitorId);`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">A/B Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`// Assign variant
let variant = await cookieStore.get('ab-variant');

if (!variant) {
  const variants = ['A', 'B'];
  const chosen = variants[Math.floor(Math.random() * 2)];

  await cookieStore.set({
    name: 'ab-variant',
    value: chosen,
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000
  });

  variant = { value: chosen };
}

showVariant(variant.value);`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 id="best-practices" className="text-2xl font-semibold mb-4">
          Best Practices
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-2">✅ Do</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground ml-4">
                  <li>Always check for browser support before using</li>
                  <li>Use <code className="text-xs bg-muted px-1 rounded">sameSite</code> attribute to prevent CSRF attacks</li>
                  <li>Set <code className="text-xs bg-muted px-1 rounded">secure: true</code> for sensitive cookies in production</li>
                  <li>Use appropriate expiration times (shorter for sensitive data)</li>
                  <li>Handle cookie operations asynchronously with try-catch</li>
                  <li>Validate and sanitize cookie values before storing</li>
                  <li>Use JSON.stringify/parse for complex data structures</li>
                  <li>Clean up event listeners when components unmount</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">❌ Don't</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground ml-4">
                  <li>Don't store sensitive data like passwords in cookies</li>
                  <li>Don't use cookies for large amounts of data (use IndexedDB instead)</li>
                  <li>Don't forget to set secure flags in production</li>
                  <li>Don't assume cookies are always available (check for null)</li>
                  <li>Don't use synchronous document.cookie when Cookie Store API is available</li>
                  <li>Don't ignore error handling for cookie operations</li>
                  <li>Don't set overly long expiration times for session data</li>
                </ul>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Security Considerations</h3>
                <pre className="text-xs overflow-x-auto">
                  <code>{`// Good: Secure cookie for production
await cookieStore.set({
  name: 'auth-token',
  value: token,
  secure: location.protocol === 'https:',
  sameSite: 'strict',
  expires: Date.now() + 3600 * 1000
});

// Good: Check before deleting
try {
  await cookieStore.delete('session');
} catch (error) {
  console.error('Failed to delete cookie:', error);
}

// Good: Fallback for unsupported browsers
if ('cookieStore' in window) {
  await cookieStore.set('key', 'value');
} else {
  document.cookie = 'key=value; max-age=3600';
}`}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Browser Support */}
      <section>
        <h2 id="browser-support" className="text-2xl font-semibold mb-4">
          Browser Support
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Browser</th>
                      <th className="text-left p-2">Support</th>
                      <th className="text-left p-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Chrome</td>
                      <td className="p-2 text-green-500">87+</td>
                      <td className="p-2 text-muted-foreground">Full support</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Edge</td>
                      <td className="p-2 text-green-500">87+</td>
                      <td className="p-2 text-muted-foreground">Full support</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Opera</td>
                      <td className="p-2 text-green-500">73+</td>
                      <td className="p-2 text-muted-foreground">Full support</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Firefox</td>
                      <td className="p-2 text-red-500">No</td>
                      <td className="p-2 text-muted-foreground">Not implemented</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Safari</td>
                      <td className="p-2 text-red-500">No</td>
                      <td className="p-2 text-muted-foreground">Not implemented</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30 text-sm">
                <strong>Limited Support:</strong> The Cookie Store API is currently only available
                in Chromium-based browsers. For broader compatibility, provide a fallback to the
                traditional document.cookie API.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Resources */}
      <section>
        <h2 id="resources" className="text-2xl font-semibold mb-4">
          Resources
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Cookie_Store_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN: Cookie Store API
                </a>
              </li>
              <li>
                <a
                  href="https://wicg.github.io/cookie-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  WICG Specification
                </a>
              </li>
              <li>
                <a
                  href="https://developer.chrome.com/docs/devtools/application/cookies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Chrome DevTools: View and Edit Cookies
                </a>
              </li>
              <li>
                <a
                  href="https://web.dev/cookie-store-api/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  web.dev: Cookie Store API
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
