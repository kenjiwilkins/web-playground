import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BatteryDemo } from '@/components/demos/BatteryDemo'

export default function Battery() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="battery-status-api" className="text-3xl font-bold tracking-tight">
          Battery Status API
        </h1>
        <p className="text-muted-foreground">
          Access battery status information to optimize your app based on device power state
        </p>
      </div>

      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <BatteryDemo />
      </section>

      <section>
        <h2 id="introduction" className="text-2xl font-semibold mb-4">
          Introduction
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What is the Battery Status API?</CardTitle>
            <CardDescription>Access device battery information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Battery Status API provides information about the system's battery charge level and
              lets you be notified when the battery level or charging status changes. This allows
              web applications to optimize their behavior based on the battery status.
            </p>
            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Privacy Considerations</p>
              <p className="text-sm">
                Due to privacy concerns, this API has limited support and may be restricted or removed
                in some browsers. Battery information can potentially be used for device fingerprinting.
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
            <CardTitle>Getting Battery Information</CardTitle>
            <CardDescription>Using the getBattery() method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The API is accessed through <code className="bg-muted px-1.5 py-0.5 rounded">navigator.getBattery()</code>,
              which returns a Promise that resolves to a <code className="bg-muted px-1.5 py-0.5 rounded">BatteryManager</code> object.
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">const battery = await navigator.getBattery();</code>
              <code className="block">console.log(battery.level); // Battery level (0 to 1)</code>
              <code className="block">console.log(battery.charging); // Is charging?</code>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="battery-properties" className="text-2xl font-semibold mb-4">
          BatteryManager Properties
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>level</CardTitle>
              <CardDescription>Battery charge level</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                A number representing the battery charge level as a value between 0.0 and 1.0.
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">battery.level // 0.0 to 1.0</code>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Example: 0.85 = 85% charged
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>charging</CardTitle>
              <CardDescription>Charging status</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                A boolean indicating whether the battery is currently being charged.
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">battery.charging // true or false</code>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                true = charging, false = on battery
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>chargingTime</CardTitle>
              <CardDescription>Time until fully charged</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Number of seconds remaining until the battery is fully charged, or 0 if already full.
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">battery.chargingTime // seconds</code>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Infinity if not charging or unknown
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>dischargingTime</CardTitle>
              <CardDescription>Time until battery depleted</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Number of seconds remaining until the battery is completely discharged.
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">battery.dischargingTime // seconds</code>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Infinity if charging or unknown
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="battery-events" className="text-2xl font-semibold mb-4">
          Battery Events
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Real-time Battery Monitoring</CardTitle>
            <CardDescription>Listen for battery status changes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The BatteryManager object fires events when battery properties change, allowing you
              to respond to changes in real-time.
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-sm">levelchange</p>
                <p className="text-sm text-muted-foreground">Fired when battery level changes</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-sm">chargingchange</p>
                <p className="text-sm text-muted-foreground">Fired when charging status changes</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="font-semibold text-sm">chargingtimechange</p>
                <p className="text-sm text-muted-foreground">Fired when time to full charge changes</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-semibold text-sm">dischargingtimechange</p>
                <p className="text-sm text-muted-foreground">Fired when time remaining changes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="usage-examples" className="text-2xl font-semibold mb-4">
          Usage Examples
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Common Usage Patterns</CardTitle>
            <CardDescription>Practical examples of using the Battery Status API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Basic Battery Information</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">const battery = await navigator.getBattery();</code>
                <code className="block"></code>
                <code className="block">console.log(`Battery level: $&#123;battery.level * 100&#125;%`);</code>
                <code className="block">console.log(`Charging: $&#123;battery.charging&#125;`);</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Monitoring Battery Level</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">const battery = await navigator.getBattery();</code>
                <code className="block"></code>
                <code className="block">battery.addEventListener('levelchange', () =&gt; &#123;</code>
                <code className="block ml-4">console.log(`Battery level: $&#123;battery.level * 100&#125;%`);</code>
                <code className="block ml-4">if (battery.level &lt; 0.2) &#123;</code>
                <code className="block ml-8">enablePowerSavingMode();</code>
                <code className="block ml-4">&#125;</code>
                <code className="block">&#125;);</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Detecting Charging Status</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">const battery = await navigator.getBattery();</code>
                <code className="block"></code>
                <code className="block">battery.addEventListener('chargingchange', () =&gt; &#123;</code>
                <code className="block ml-4">if (battery.charging) &#123;</code>
                <code className="block ml-8">console.log('Device is now charging');</code>
                <code className="block ml-8">resumeBackgroundTasks();</code>
                <code className="block ml-4">&#125; else &#123;</code>
                <code className="block ml-8">console.log('Device is on battery power');</code>
                <code className="block ml-8">pauseNonEssentialTasks();</code>
                <code className="block ml-4">&#125;</code>
                <code className="block">&#125;);</code>
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
            <CardTitle>When to Use the Battery Status API</CardTitle>
            <CardDescription>Practical applications and scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="text-primary">⚡</span>
                <div>
                  <strong>Power-Aware Features</strong> - Disable resource-intensive features when battery is low
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">📹</span>
                <div>
                  <strong>Video Quality Adjustment</strong> - Lower video quality on low battery to extend usage
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">🔄</span>
                <div>
                  <strong>Sync Management</strong> - Defer background syncs when battery is low
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">🎮</span>
                <div>
                  <strong>Gaming Performance</strong> - Adjust graphics settings based on battery level
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">💾</span>
                <div>
                  <strong>Auto-Save</strong> - Prompt user to save work when battery is critically low
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">📱</span>
                <div>
                  <strong>UI Notifications</strong> - Show battery warnings or optimize UI for power saving
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="browser-support" className="text-2xl font-semibold mb-4">
          Browser Support
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Compatibility and Limitations</CardTitle>
            <CardDescription>Current state of browser support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Chrome/Edge</strong> - Supported but may be restricted on desktop
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Firefox</strong> - Limited support, privacy restrictions
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 mt-1">✗</span>
                <div>
                  <strong>Safari</strong> - Not supported due to privacy concerns
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">ℹ</span>
                <div>
                  <strong>Mobile</strong> - Better support on mobile devices where battery info is more relevant
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-sm font-semibold mb-2">Important Note</p>
              <p className="text-sm">
                This API is being phased out in many browsers due to privacy concerns. Always check
                for support and have fallback behavior for browsers that don't support it.
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
            <CardDescription>How to detect if the Battery Status API is available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">if ('getBattery' in navigator) &#123;</code>
              <code className="block ml-4">// Battery Status API is supported</code>
              <code className="block ml-4">const battery = await navigator.getBattery();</code>
              <code className="block ml-4">// Use battery information</code>
              <code className="block">&#125; else &#123;</code>
              <code className="block ml-4">// Fallback behavior</code>
              <code className="block ml-4">console.log('Battery Status API not supported');</code>
              <code className="block">&#125;</code>
            </div>
            <p className="text-sm text-muted-foreground">
              Always check for API support before attempting to use it to ensure your app works
              gracefully across all browsers.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="best-practices" className="text-2xl font-semibold mb-4">
          Best Practices
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Guidelines for Using Battery Status API</CardTitle>
            <CardDescription>Recommendations for optimal implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Feature detection is essential</strong> - Always check if the API is supported
              </li>
              <li>
                <strong>Respect user privacy</strong> - Don't use battery data for tracking or fingerprinting
              </li>
              <li>
                <strong>Provide fallback behavior</strong> - App should work without battery information
              </li>
              <li>
                <strong>Use for optimization only</strong> - Battery data should enhance UX, not be required
              </li>
              <li>
                <strong>Clean up event listeners</strong> - Remove listeners when component unmounts
              </li>
              <li>
                <strong>Test on actual devices</strong> - Desktop browsers may not provide accurate data
              </li>
              <li>
                <strong>Consider alternative APIs</strong> - Network Information API may be more reliable for some use cases
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
