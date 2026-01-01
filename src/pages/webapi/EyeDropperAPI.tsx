import { EyeDropperDemo } from '@/components/demos/EyeDropperDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function EyeDropperAPI() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">
          EyeDropper API
        </h1>
        <p className="text-muted-foreground">
          Sample colors from anywhere on the screen with the browser's built-in eyedropper tool.
        </p>
      </div>

      {/* Live Demo */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <EyeDropperDemo />
      </section>

      {/* Overview */}
      <section>
        <h2 id="overview" className="text-2xl font-semibold mb-4">
          Overview
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What is the EyeDropper API?</CardTitle>
            <CardDescription>
              A simple interface for color sampling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The EyeDropper API provides a simple mechanism for web applications to invoke the
              browser's built-in eyedropper functionality. This allows users to sample colors
              from anywhere on their screen, including outside the browser window, and use
              those colors within web applications.
            </p>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Screen-Wide Sampling:</strong> Pick colors from anywhere on screen</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Simple API:</strong> Just one method to call</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>User Controlled:</strong> User must explicitly select or cancel</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Secure:</strong> Requires user gesture to activate</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Native UI:</strong> Uses platform-native eyedropper tool</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-500/10 p-4 rounded border border-blue-500/30">
              <p className="text-sm">
                <strong>Perfect For:</strong> Color pickers, design tools, theme generators,
                accessibility checkers, and any application that needs color selection functionality.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* API Reference */}
      <section>
        <h2 id="api-reference" className="text-2xl font-semibold mb-4">
          API Reference
        </h2>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>EyeDropper Constructor</CardTitle>
              <CardDescription>
                Create a new eyedropper instance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Syntax:</h4>
                <div className="bg-muted p-3 rounded font-mono text-sm">
                  const eyeDropper = new EyeDropper();
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Parameters:</h4>
                <p className="text-sm text-muted-foreground">None</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Example:</h4>
                <div className="bg-muted p-3 rounded font-mono text-sm">
                  <pre className="whitespace-pre-wrap">{`const eyeDropper = new EyeDropper();
console.log(eyeDropper); // EyeDropper {}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>open() Method</CardTitle>
              <CardDescription>
                Activate the eyedropper and select a color
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Syntax:</h4>
                <div className="bg-muted p-3 rounded font-mono text-sm">
                  const result = await eyeDropper.open();
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Return Value:</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  A <code className="bg-muted px-1 rounded">Promise</code> that resolves to an
                  object containing:
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <code className="bg-background px-2 py-1 rounded">sRGBHex</code> - A string
                  containing the selected color in hexadecimal sRGB format (e.g., "#ff5733")
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Rejection:</h4>
                <p className="text-sm text-muted-foreground">
                  The promise rejects with an <code className="bg-muted px-1 rounded">AbortError</code>
                  if the user cancels the selection (e.g., by pressing Escape).
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Example:</h4>
                <div className="bg-muted p-3 rounded font-mono text-sm">
                  <pre className="whitespace-pre-wrap">{`button.addEventListener('click', async () => {
  const eyeDropper = new EyeDropper();

  try {
    const result = await eyeDropper.open();
    const color = result.sRGBHex;

    console.log('Selected color:', color);
    document.body.style.backgroundColor = color;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('User cancelled color selection');
    } else {
      console.error('Error:', error);
    }
  }
});`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* User Interaction */}
      <section>
        <h2 id="user-interaction" className="text-2xl font-semibold mb-4">
          User Interaction
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>How Users Interact with the Eyedropper</CardTitle>
            <CardDescription>
              Understanding the user experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Activation</h4>
              <p className="text-sm text-muted-foreground mb-2">
                When <code className="bg-muted px-1 rounded">open()</code> is called, the cursor
                changes to a magnifying glass or crosshair icon (browser-specific).
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Selection Delay</h4>
              <p className="text-sm text-muted-foreground mb-2">
                There's a short delay before the user can select a color to prevent accidental
                selections and allow the user to move the cursor.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Color Preview</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Most implementations show a magnified view of the area under the cursor with the
                exact pixel highlighted, along with its color value.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Selection Methods</h4>
              <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                <li>Click to select the color under the cursor</li>
                <li>Press Escape to cancel without selecting</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Screen-Wide Access</h4>
              <p className="text-sm text-muted-foreground">
                The eyedropper works across the entire screen, not just within the browser window.
                Users can sample colors from their desktop, other applications, or anywhere visible.
              </p>
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
              <CardTitle>1. Color Picker Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Build comprehensive color selection interfaces:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Design application color pickers</li>
                <li>Theme customization tools</li>
                <li>Brand color extractors</li>
                <li>Color palette generators</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Drawing & Design Apps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Enhance creative tools:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Canvas-based drawing applications</li>
                <li>Image editors</li>
                <li>Vector graphics tools</li>
                <li>Digital painting apps</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Accessibility Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Check color accessibility:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Contrast ratio checkers</li>
                <li>WCAG compliance tools</li>
                <li>Color blindness simulators</li>
                <li>Readability analyzers</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Development Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Developer productivity:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>CSS color value extraction</li>
                <li>Design-to-code workflows</li>
                <li>UI matching tools</li>
                <li>Style guide generators</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. E-Commerce</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Product customization:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Custom product configurators</li>
                <li>Color matching for purchases</li>
                <li>Home decor visualizers</li>
                <li>Fashion color finders</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Data Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Chart and graph theming:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Custom chart color schemes</li>
                <li>Dashboard theming</li>
                <li>Infographic creation</li>
                <li>Presentation tools</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Security & Privacy */}
      <section>
        <h2 id="security" className="text-2xl font-semibold mb-4">
          Security & Privacy
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Security Considerations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">🔒 User Gesture Required</h4>
                <p className="text-muted-foreground">
                  The <code className="bg-background px-1 rounded">open()</code> method can only
                  be called in response to a user action (click, tap, keypress). This prevents
                  malicious sites from automatically sampling screen colors without permission.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">🔒 Explicit User Selection</h4>
                <p className="text-muted-foreground">
                  The promise only resolves when the user explicitly clicks to select a color.
                  There's no way to programmatically sample colors without user interaction.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">🔒 Visual Feedback</h4>
                <p className="text-muted-foreground">
                  The cursor changes appearance when the eyedropper is active, making it clear
                  to users that color sampling is happening.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">🔒 User Can Cancel</h4>
                <p className="text-muted-foreground">
                  Users can press Escape at any time to cancel the operation. The promise rejects
                  with an AbortError in this case.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">🔒 Secure Context Only</h4>
                <p className="text-muted-foreground">
                  The API is only available in secure contexts (HTTPS). HTTP pages cannot access it.
                </p>
              </div>

              <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30">
                <strong>Privacy Note:</strong> While the API allows sampling any visible pixel
                on screen, this is intentional and acceptable because it requires explicit user
                action for each sample. Users are in full control of what gets sampled.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Best Practices */}
      <section>
        <h2 id="best-practices" className="text-2xl font-semibold mb-4">
          Best Practices
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Implementation Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">✓ Feature Detection</h4>
                <p className="text-muted-foreground mb-2">
                  Always check if the API is supported before using it:
                </p>
                <div className="bg-muted p-2 rounded font-mono text-xs">
                  if ('EyeDropper' in window) &#123; /* supported */ &#125;
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Handle Cancellation</h4>
                <p className="text-muted-foreground mb-2">
                  Always handle the AbortError case when users cancel:
                </p>
                <div className="bg-muted p-2 rounded font-mono text-xs">
                  {`catch (error) { if (error.name === 'AbortError') { /* cancelled */ } }`}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Provide Clear UI</h4>
                <p className="text-muted-foreground">
                  Make it obvious to users what the eyedropper button does. Use clear labels
                  and icons (like 🎨 or an eyedropper icon).
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Show Selected Colors</h4>
                <p className="text-muted-foreground">
                  Display the selected color visually with both the color swatch and the hex value
                  so users can confirm their selection.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Provide Color Formats</h4>
                <p className="text-muted-foreground">
                  While the API returns sRGBHex, consider converting to other formats (RGB, HSL,
                  etc.) for user convenience.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Enable Copy to Clipboard</h4>
                <p className="text-muted-foreground">
                  Make it easy for users to copy color values with a simple click.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">⚠️ Consider Fallbacks</h4>
                <p className="text-muted-foreground">
                  For browsers without support, provide alternative color selection methods
                  (color input, palette selector, manual entry).
                </p>
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
          <CardHeader>
            <CardTitle>Compatibility</CardTitle>
            <CardDescription>
              Current browser support status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Supported:</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Chrome 95+</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Edge 95+</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Opera 81+</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Not Supported:</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-red-500 text-xl">✗</span>
                    <span>Firefox</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-red-500 text-xl">✗</span>
                    <span>Safari</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30 text-sm">
                <strong>Current Status:</strong> Not yet Baseline. Browser support is limited
                but growing. Always include feature detection and fallback options.
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
          <CardHeader>
            <CardTitle>Learn More</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN Web Docs: EyeDropper API
                </a>
              </li>
              <li>
                <a
                  href="https://wicg.github.io/eyedropper-api/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  WICG Specification: EyeDropper API
                </a>
              </li>
              <li>
                <a
                  href="https://developer.chrome.com/blog/eyedropper/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Chrome Developers: EyeDropper API
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
