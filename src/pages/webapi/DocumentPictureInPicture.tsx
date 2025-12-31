import { DocumentPictureInPictureDemo } from '@/components/demos/DocumentPictureInPictureDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DocumentPictureInPicture() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">
          Document Picture-in-Picture API
        </h1>
        <p className="text-muted-foreground">
          Create always-on-top windows with arbitrary HTML content, extending beyond simple video Picture-in-Picture.
        </p>
      </div>

      {/* Live Demo */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <DocumentPictureInPictureDemo />
      </section>

      {/* Overview */}
      <section>
        <h2 id="overview" className="text-2xl font-semibold mb-4">
          Overview
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What is Document Picture-in-Picture?</CardTitle>
            <CardDescription>
              A powerful extension of the original Picture-in-Picture API
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Document Picture-in-Picture API allows web applications to open an always-on-top
              window that can contain <strong>any HTML content</strong>, not just a single video
              element. This enables creating floating windows for custom video players, tools,
              productivity apps, and more.
            </p>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Key Advantages:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Any HTML Content:</strong> Not limited to video elements</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Custom Controls:</strong> Full control over UI and interactions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Always on Top:</strong> Floats above other windows</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Full DOM Access:</strong> Complete JavaScript manipulation</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>CSS Styling:</strong> Apply custom styles and animations</span>
                </li>
              </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                <h4 className="font-semibold mb-2">Video PiP (Legacy)</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Single &lt;video&gt; element only</li>
                  <li>• Browser-generated controls</li>
                  <li>• Limited customization</li>
                </ul>
              </div>
              <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                <h4 className="font-semibold mb-2">Document PiP (New)</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Any HTML content</li>
                  <li>• Custom controls and UI</li>
                  <li>• Full flexibility</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-500/10 p-4 rounded border border-yellow-500/30">
              <p className="text-sm">
                <strong>Experimental Feature:</strong> This API is experimental and currently only
                available in Chrome/Edge 116+. It may require enabling flags.
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
              <CardTitle>documentPictureInPicture.requestWindow()</CardTitle>
              <CardDescription>
                Opens a Picture-in-Picture window
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Syntax:</h4>
                <div className="bg-muted p-3 rounded font-mono text-sm">
                  const pipWindow = await window.documentPictureInPicture.requestWindow(options);
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Parameters:</h4>
                <div className="bg-muted p-3 rounded text-sm space-y-2">
                  <div>
                    <code className="bg-background px-2 py-1 rounded">options</code> (optional)
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li><code className="bg-background px-1 rounded">width</code> - Initial width in pixels</li>
                      <li><code className="bg-background px-1 rounded">height</code> - Initial height in pixels</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Return Value:</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  A <code className="bg-muted px-1 rounded">Promise</code> that resolves with a
                  <code className="bg-muted px-1 rounded">Window</code> object representing the PiP window.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Example:</h4>
                <div className="bg-muted p-3 rounded font-mono text-sm">
                  <pre className="whitespace-pre-wrap">{`try {
  // Open PiP window
  const pipWindow = await window.documentPictureInPicture
    .requestWindow({
      width: 600,
      height: 400
    });

  // Access the window's document
  const pipDoc = pipWindow.document;

  // Add content
  const div = pipDoc.createElement('div');
  div.textContent = 'Hello PiP!';
  pipDoc.body.appendChild(div);

} catch (error) {
  console.error('Failed to open PiP:', error);
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>documentPictureInPicture.window</CardTitle>
              <CardDescription>
                Reference to the current PiP window
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Returns a <code className="bg-muted px-1 rounded">Window</code> object if a PiP
                window is currently open, or <code className="bg-muted px-1 rounded">null</code> otherwise.
              </p>

              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`const currentPip = window.documentPictureInPicture.window;

if (currentPip) {
  console.log('PiP window is open');
  currentPip.close(); // Close it
} else {
  console.log('No PiP window open');
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>enter Event</CardTitle>
              <CardDescription>
                Fired when a PiP window is opened
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The <code className="bg-muted px-1 rounded">enter</code> event fires on the
                <code className="bg-muted px-1 rounded">documentPictureInPicture</code> object
                when a Picture-in-Picture window is successfully opened.
              </p>

              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`window.documentPictureInPicture.addEventListener('enter', (event) => {
  const pipWindow = event.window;
  console.log('PiP window opened:', pipWindow);

  // Set up content
  pipWindow.document.body.innerHTML = '<h1>PiP Active</h1>';
});`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Working with PiP Windows */}
      <section>
        <h2 id="working-with-pip" className="text-2xl font-semibold mb-4">
          Working with PiP Windows
        </h2>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Copying Stylesheets</CardTitle>
              <CardDescription>
                Maintain consistent styling in PiP window
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The PiP window starts with an empty document. You need to manually copy stylesheets
                from the main window to maintain consistent styling.
              </p>

              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`// Copy all external stylesheets
Array.from(document.styleSheets).forEach(sheet => {
  if (sheet.href) {
    const link = pipWindow.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = sheet.href;
    pipWindow.document.head.appendChild(link);
  }
});

// Copy inline styles
Array.from(document.styleSheets).forEach(sheet => {
  if (!sheet.href && sheet.cssRules) {
    const style = pipWindow.document.createElement('style');
    const cssText = Array.from(sheet.cssRules)
      .map(rule => rule.cssText)
      .join('\\n');
    style.textContent = cssText;
    pipWindow.document.head.appendChild(style);
  }
});`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Moving Content Between Windows</CardTitle>
              <CardDescription>
                Transfer DOM elements to and from PiP
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You can move existing DOM elements from the main window to the PiP window using
                standard DOM manipulation methods.
              </p>

              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`// Get content from main window
const content = document.getElementById('my-content');

// Move to PiP window
pipWindow.document.body.appendChild(content);

// Later, when PiP closes, move back
pipWindow.addEventListener('pagehide', () => {
  // Return content to main window
  document.body.appendChild(content);
});`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Handling Window Close</CardTitle>
              <CardDescription>
                Clean up when PiP window closes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Listen for the <code className="bg-muted px-1 rounded">pagehide</code> event to
                detect when the user closes the PiP window.
              </p>

              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`pipWindow.addEventListener('pagehide', (event) => {
  // User closed PiP window
  console.log('PiP window closed');

  // Return content to main window
  const content = pipWindow.document.getElementById('content');
  if (content) {
    document.body.appendChild(content);
  }

  // Clean up references
  pipWindowRef.current = null;
});

// Or close programmatically
pipWindow.close();`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detecting PiP Mode with CSS</CardTitle>
              <CardDescription>
                Style content differently when in PiP
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Use the <code className="bg-muted px-1 rounded">display-mode: picture-in-picture</code>
                media query to apply styles conditionally.
              </p>

              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`/* Styles for when content is in PiP window */
@media (display-mode: picture-in-picture) {
  body {
    padding: 20px;
  }

  .controls {
    font-size: 14px;
  }

  .hide-in-pip {
    display: none;
  }
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section>
        <h2 id="use-cases" className="text-2xl font-semibold mb-4">
          Common Use Cases
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>1. Custom Video Players</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Create video players with multiple videos, custom controls, captions, and overlays:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Multi-angle sports viewing</li>
                <li>Picture-in-picture within picture-in-picture</li>
                <li>Custom playback controls</li>
                <li>Live chat alongside video</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Video Conferencing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Display multiple participant streams with controls:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Grid of participant videos</li>
                <li>Screen sharing view</li>
                <li>Mute/unmute controls</li>
                <li>Chat panel</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Productivity Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Keep utility tools visible while working:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Timer/stopwatch</li>
                <li>Note-taking app</li>
                <li>To-do list</li>
                <li>Calculator</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Gaming</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Separate windows for game elements:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Inventory management</li>
                <li>Map/minimap</li>
                <li>Quest log</li>
                <li>Game instructions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Live Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Always-visible dashboards and monitors:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Server status dashboards</li>
                <li>Stock tickers</li>
                <li>Live sports scores</li>
                <li>Security camera feeds</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Music Players</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Floating music controls with visualizations:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Album artwork</li>
                <li>Playback controls</li>
                <li>Playlist view</li>
                <li>Audio visualizer</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Limitations */}
      <section>
        <h2 id="limitations" className="text-2xl font-semibold mb-4">
          Limitations & Constraints
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Important Restrictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">⚠️ One Window Per Tab</h4>
                <p className="text-muted-foreground">
                  Only one Picture-in-Picture window can be open per browser tab at a time.
                  Opening a new one will close the existing window.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">⚠️ No Navigation</h4>
                <p className="text-muted-foreground">
                  The PiP window cannot be navigated to a different URL. It's limited to the
                  content you programmatically add.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">⚠️ Position Not Controllable</h4>
                <p className="text-muted-foreground">
                  You cannot set the window position via JavaScript. Users control where it appears
                  on their screen.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">⚠️ Tied to Opening Window</h4>
                <p className="text-muted-foreground">
                  The PiP window is tied to the window that opened it. If you close the main
                  window/tab, the PiP window also closes.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">⚠️ Same-Origin</h4>
                <p className="text-muted-foreground">
                  The PiP window shares the same origin as the opening window. Cross-origin
                  content requires appropriate CORS setup.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">⚠️ No Automatic State Sharing</h4>
                <p className="text-muted-foreground">
                  State and data are not automatically shared between windows. You must manually
                  synchronize data between the main and PiP windows.
                </p>
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
                <h4 className="font-semibold mb-2">✓ Always Copy Stylesheets</h4>
                <p className="text-muted-foreground">
                  The PiP window starts blank. Copy your CSS to maintain consistent styling.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Handle Window Close</h4>
                <p className="text-muted-foreground">
                  Always listen for the <code className="bg-background px-1 rounded">pagehide</code> event
                  to return content to the main window and clean up.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Provide Fallback UI</h4>
                <p className="text-muted-foreground">
                  Not all browsers support this API. Provide alternative UI for unsupported browsers.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Optimize for Small Sizes</h4>
                <p className="text-muted-foreground">
                  PiP windows are typically small. Use responsive design and ensure controls are
                  touch-friendly.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Keep Window Reference</h4>
                <p className="text-muted-foreground">
                  Store the window reference so you can close it programmatically or update its content.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Use Reasonable Dimensions</h4>
                <p className="text-muted-foreground">
                  Request appropriate width/height based on content. Too large may annoy users,
                  too small may be unusable.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">⚠️ Test Thoroughly</h4>
                <p className="text-muted-foreground">
                  This is an experimental API. Test extensively and have fallback strategies.
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
                    <span>Chrome 116+ (experimental)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Edge 116+ (experimental)</span>
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

              <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
                <strong>⚠️ Experimental Status:</strong> This API is not yet standardized and
                browser support is very limited. It may require enabling experimental flags:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Chrome: Enable "Experimental Web Platform features" in chrome://flags</li>
                  <li>Production use is not recommended until broader support is available</li>
                </ul>
              </div>

              <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30 text-sm">
                <strong>Feature Detection:</strong> Always check for support before using:
                <div className="bg-muted p-2 rounded font-mono text-xs mt-2">
                  if ('documentPictureInPicture' in window) &#123; /* supported */ &#125;
                </div>
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
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN Web Docs: Document Picture-in-Picture API
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mdn/dom-examples/tree/main/document-picture-in-picture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN Demo: Document Picture-in-Picture Example
                </a>
              </li>
              <li>
                <a
                  href="https://developer.chrome.com/docs/web-platform/document-picture-in-picture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Chrome Developers: Document Picture-in-Picture
                </a>
              </li>
              <li>
                <a
                  href="https://wicg.github.io/document-picture-in-picture/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  WICG Specification: Document Picture-in-Picture
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
