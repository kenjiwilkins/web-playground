import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BadgingDemo } from '@/components/demos/BadgingDemo'
import { PageHeader } from '@/components/layout/page/PageHeader'
import { PageSection } from '@/components/layout/page/PageSection'
import { InfoBox } from '@/components/layout/page/InfoBox'
import { CodeBlock } from '@/components/layout/page/CodeBlock'

export default function Badging() {
  return (
    <div className="space-y-6">
      <PageHeader
        id="badging-api"
        title="Badging API"
        description="Set application badges to notify users of state changes without distracting notifications"
      />

      <PageSection id="live-demo" title="Live Demo">
        <BadgingDemo />
      </PageSection>

      <PageSection id="introduction" title="Introduction">
        <Card>
          <CardHeader>
            <CardTitle>What is the Badging API?</CardTitle>
            <CardDescription>Subtle notifications for web applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Badging API enables web developers to set badges on documents or applications to
              notify users of state changes without displaying distracting notifications. This is
              commonly used by messaging apps to display a badge on the app icon indicating new messages.
            </p>
            <InfoBox variant="info" title="Limited Availability">
              This API is not Baseline and doesn't work in all widely-used browsers. Check browser
              compatibility before using in production.
            </InfoBox>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="badge-types" title="Types of Badges">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Document Badges</CardTitle>
              <CardDescription>Shown in browser tabs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Document badges appear near the page icon (favicon) in browser tabs. They provide
                a subtle indicator of activity without requiring the user to switch tabs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>App Badges</CardTitle>
              <CardDescription>Associated with installed web apps</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                App badges appear on the icon of installed Progressive Web Apps (PWAs), shown in
                locations like the dock, shelf, taskbar, or home screen depending on the platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection id="main-methods" title="Main Methods">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>setAppBadge()</CardTitle>
              <CardDescription>Set a badge on the app icon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <CodeBlock code="navigator.setAppBadge(count?)" />
              <div className="space-y-2 text-sm">
                <p><strong>No parameter:</strong> Sets a flag badge (just a marker)</p>
                <p><strong>Number parameter:</strong> Sets badge with that count</p>
                <p><strong>0 or undefined:</strong> Clears the badge</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>clearAppBadge()</CardTitle>
              <CardDescription>Remove the badge</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <CodeBlock code="navigator.clearAppBadge()" />
              <p className="text-sm">
                Clears the badge from the app icon. This is equivalent to calling{' '}
                <code className="bg-muted px-1 py-0.5 rounded">setAppBadge(0)</code>.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection id="badge-states" title="Badge States">
        <Card>
          <CardHeader>
            <CardTitle>Understanding Badge States</CardTitle>
            <CardDescription>Three possible states for app badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">∅</span>
                <div>
                  <p className="font-semibold">nothing</p>
                  <p className="text-sm text-muted-foreground">
                    No badge is set. This occurs when the badge is cleared by the app or user agent.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚩</span>
                <div>
                  <p className="font-semibold">flag</p>
                  <p className="text-sm text-muted-foreground">
                    Badge is set but displays no specific data. Used to indicate "something needs attention"
                    without a specific count.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">12</span>
                <div>
                  <p className="font-semibold">integer value</p>
                  <p className="text-sm text-muted-foreground">
                    Badge displays a numeric value (e.g., unread message count). User agents may modify
                    large values (e.g., showing "99+" instead of "4000").
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="usage-examples" title="Usage Examples">
        <Card>
          <CardHeader>
            <CardTitle>Common Usage Patterns</CardTitle>
            <CardDescription>How to use the Badging API in practice</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Setting a Numeric Badge</p>
              <CodeBlock code={`// Set badge to show 5 unread messages
navigator.setAppBadge(5);`} />
            </div>

            <div>
              <p className="font-semibold mb-2">Setting a Flag Badge</p>
              <CodeBlock code={`// Set a flag badge (no specific count)
navigator.setAppBadge();`} />
            </div>

            <div>
              <p className="font-semibold mb-2">Clearing the Badge</p>
              <CodeBlock code={`// Option 1: Using clearAppBadge()
navigator.clearAppBadge();

// Option 2: Using setAppBadge(0)
navigator.setAppBadge(0);`} />
            </div>

            <div>
              <p className="font-semibold mb-2">Real-World Example: Message Counter</p>
              <CodeBlock code={`let unreadCount = 0;

function onNewMessage() {
  unreadCount++;
  navigator.setAppBadge(unreadCount);
}

function onMessagesRead() {
  unreadCount = 0;
  navigator.clearAppBadge();
}`} />
            </div>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="use-cases" title="Use Cases">
        <Card>
          <CardHeader>
            <CardTitle>When to Use the Badging API</CardTitle>
            <CardDescription>Common scenarios and applications</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="text-primary">💬</span>
                <div>
                  <strong>Messaging Apps</strong> - Show unread message count
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">📧</span>
                <div>
                  <strong>Email Clients</strong> - Display number of unread emails
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">🔔</span>
                <div>
                  <strong>Notification Systems</strong> - Indicate pending notifications
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">📝</span>
                <div>
                  <strong>Task Managers</strong> - Show number of pending tasks
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">🎮</span>
                <div>
                  <strong>Gaming Apps</strong> - Indicate available turns or updates
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">🛒</span>
                <div>
                  <strong>E-commerce</strong> - Display shopping cart item count
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="requirements" title="Requirements">
        <Card>
          <CardHeader>
            <CardTitle>Browser and Security Requirements</CardTitle>
            <CardDescription>What you need to use this API</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Secure context only</strong> - HTTPS is required
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Available in Web Workers</strong> - Can be used in worker contexts
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Limited browser support</strong> - Not all browsers implement this API
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">ℹ</span>
                <div>
                  <strong>Best with PWAs</strong> - Most effective when app is installed as a PWA
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="best-practices" title="Best Practices">
        <Card>
          <CardHeader>
            <CardTitle>Guidelines for Using Badges</CardTitle>
            <CardDescription>Recommendations for optimal user experience</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Use badges sparingly</strong> - Only show badges for actionable items that need user attention
              </li>
              <li>
                <strong>Keep counts accurate</strong> - Update badges immediately when state changes
              </li>
              <li>
                <strong>Clear badges when appropriate</strong> - Remove badges when items are read or tasks completed
              </li>
              <li>
                <strong>Consider using flag badges</strong> - When exact count isn't important, use flag badges for simplicity
              </li>
              <li>
                <strong>Test across platforms</strong> - Badge appearance varies by browser and OS
              </li>
              <li>
                <strong>Provide feature detection</strong> - Always check if the API is supported before using
              </li>
              <li>
                <strong>Don't rely solely on badges</strong> - Badges supplement, don't replace, other notification methods
              </li>
            </ol>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="feature-detection" title="Feature Detection">
        <Card>
          <CardHeader>
            <CardTitle>Checking for API Support</CardTitle>
            <CardDescription>How to detect if the Badging API is available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock code={`if ('setAppBadge' in navigator) {
  // Badging API is supported
  navigator.setAppBadge(12);
} else {
  // Fallback to other notification methods
  console.log('Badging API not supported');
}`} />
            <p className="text-sm text-muted-foreground">
              Always check for API support before attempting to use it, as browser support is limited.
            </p>
          </CardContent>
        </Card>
      </PageSection>
    </div>
  )
}
