import { ClipboardDemo } from '@/components/demos/ClipboardDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Clipboard() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">
          Clipboard API
        </h1>
        <p className="text-muted-foreground">
          Modern asynchronous API for reading from and writing to the system clipboard with proper security and permission handling.
        </p>
      </div>

      {/* Live Demo Section */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demos
        </h2>
        <ClipboardDemo />
      </section>

      {/* What is it? */}
      <section>
        <h2 id="what-is-it" className="text-2xl font-semibold mb-4">
          What is the Clipboard API?
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Asynchronous Clipboard Access</CardTitle>
            <CardDescription>Modern replacement for document.execCommand()</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The Clipboard API provides a way to programmatically read from and write to the system clipboard.
              It offers asynchronous operations using Promises, making it the modern, recommended approach for clipboard
              interactions in web applications.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Key Features:</p>
              <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                <li><strong>Asynchronous:</strong> Promise-based API that doesn't block the main thread</li>
                <li><strong>Secure:</strong> Requires HTTPS and proper permissions</li>
                <li><strong>Rich Content:</strong> Supports multiple formats (text, HTML, images)</li>
                <li><strong>Permission-Based:</strong> Browser prompts for user consent when needed</li>
                <li><strong>Modern:</strong> Recommended over deprecated <code className="bg-background px-1 rounded">document.execCommand()</code></li>
              </ul>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-green-500/10 border border-green-500/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">✅ Clipboard API (Modern):</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Asynchronous (Promise-based)</li>
                  <li>Secure permission model</li>
                  <li>Multiple content types</li>
                  <li>Actively maintained</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">❌ document.execCommand() (Legacy):</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Synchronous (blocks main thread)</li>
                  <li>Deprecated API</li>
                  <li>Limited functionality</li>
                  <li>Not recommended for new code</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Getting Started */}
      <section>
        <h2 id="getting-started" className="text-2xl font-semibold mb-4">
          Getting Started
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Accessing the Clipboard</CardTitle>
              <CardDescription>Available via navigator.clipboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Basic Usage:</p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`// Check if the API is available
if (navigator.clipboard) {
  console.log('Clipboard API is supported');
} else {
  console.error('Clipboard API not available');
}`}</pre>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Write Text:</p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}`}</pre>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Read Text:</p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Clipboard content:', text);
    return text;
  } catch (err) {
    console.error('Failed to read:', err);
  }
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Methods */}
      <section>
        <h2 id="core-methods" className="text-2xl font-semibold mb-4">
          Core Methods
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>navigator.clipboard.writeText()</CardTitle>
              <CardDescription>Write plain text to the clipboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Simple text copy
await navigator.clipboard.writeText('Hello, Clipboard!');

// Copy with user interaction
button.addEventListener('click', async () => {
  await navigator.clipboard.writeText('Copied on click');
});`}</pre>
              </div>
              <div className="text-sm space-y-1">
                <p><strong>Returns:</strong> Promise that resolves when text is written</p>
                <p><strong>Requirements:</strong> User activation (click, keypress) or permission</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>navigator.clipboard.readText()</CardTitle>
              <CardDescription>Read plain text from the clipboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Read clipboard text
const text = await navigator.clipboard.readText();
console.log('Clipboard:', text);

// Handle permission denial
try {
  const text = await navigator.clipboard.readText();
  document.getElementById('paste-area').value = text;
} catch (err) {
  console.error('Permission denied or error:', err);
}`}</pre>
              </div>
              <div className="text-sm space-y-1">
                <p><strong>Returns:</strong> Promise resolving to clipboard text content</p>
                <p><strong>Requirements:</strong> User permission prompt (may vary by browser)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>navigator.clipboard.write()</CardTitle>
              <CardDescription>Write multiple data formats using ClipboardItem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Copy HTML and plain text
const htmlBlob = new Blob(['<strong>Bold text</strong>'], { type: 'text/html' });
const textBlob = new Blob(['Bold text'], { type: 'text/plain' });

const clipboardItem = new ClipboardItem({
  'text/html': htmlBlob,
  'text/plain': textBlob
});

await navigator.clipboard.write([clipboardItem]);

// Copy image
const response = await fetch('image.png');
const blob = await response.blob();
const imageItem = new ClipboardItem({ 'image/png': blob });
await navigator.clipboard.write([imageItem]);`}</pre>
              </div>
              <div className="text-sm space-y-1">
                <p><strong>Returns:</strong> Promise that resolves when content is written</p>
                <p><strong>Supports:</strong> Multiple MIME types in single clipboard item</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>navigator.clipboard.read()</CardTitle>
              <CardDescription>Read multiple data formats from clipboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Read all clipboard data
const clipboardItems = await navigator.clipboard.read();

for (const item of clipboardItems) {
  for (const type of item.types) {
    const blob = await item.getType(type);
    console.log(\`Type: \${type}\`, blob);

    if (type === 'text/plain') {
      const text = await blob.text();
      console.log('Text:', text);
    } else if (type.startsWith('image/')) {
      const url = URL.createObjectURL(blob);
      console.log('Image URL:', url);
    }
  }
}`}</pre>
              </div>
              <div className="text-sm space-y-1">
                <p><strong>Returns:</strong> Promise resolving to array of ClipboardItem objects</p>
                <p><strong>Use Case:</strong> Reading rich content (images, formatted text)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Clipboard Events */}
      <section>
        <h2 id="clipboard-events" className="text-2xl font-semibold mb-4">
          Clipboard Events
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Handling Copy, Cut, and Paste Events</CardTitle>
            <CardDescription>Intercept and customize clipboard operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Copy Event:</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`element.addEventListener('copy', (event) => {
  event.preventDefault(); // Prevent default copy

  const selection = window.getSelection()?.toString();
  const customText = \`Copied from MyApp: \${selection}\`;

  event.clipboardData.setData('text/plain', customText);
  event.clipboardData.setData('text/html', \`<em>\${customText}</em>\`);
});`}</pre>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Paste Event:</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`element.addEventListener('paste', (event) => {
  event.preventDefault(); // Prevent default paste

  // Get different clipboard formats
  const text = event.clipboardData.getData('text/plain');
  const html = event.clipboardData.getData('text/html');

  // Process and insert content
  console.log('Pasted text:', text);
  console.log('Pasted HTML:', html);

  // Insert custom content
  document.execCommand('insertText', false, \`Processed: \${text}\`);
});`}</pre>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Cut Event:</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`element.addEventListener('cut', (event) => {
  event.preventDefault();

  const selection = window.getSelection()?.toString();
  event.clipboardData.setData('text/plain', selection || '');

  // Remove the selected content
  document.execCommand('delete');
});`}</pre>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500 rounded-lg">
              <p className="text-sm font-medium mb-2">Event Properties:</p>
              <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                <li><code className="bg-background px-1 rounded">event.clipboardData</code> - Access clipboard data</li>
                <li><code className="bg-background px-1 rounded">event.preventDefault()</code> - Prevent default behavior</li>
                <li><code className="bg-background px-1 rounded">clipboardData.setData(format, data)</code> - Set clipboard content</li>
                <li><code className="bg-background px-1 rounded">clipboardData.getData(format)</code> - Get clipboard content</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Security */}
      <section>
        <h2 id="security" className="text-2xl font-semibold mb-4">
          Security & Permissions
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Requirements</CardTitle>
              <CardDescription>Understanding clipboard API security model</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-yellow-500/10 border border-yellow-500 p-3 rounded">
                  <p className="text-sm font-medium mb-1">🔒 Secure Context Required</p>
                  <p className="text-xs text-muted-foreground">
                    Clipboard API only works on HTTPS (or localhost for development)
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500 p-3 rounded">
                  <p className="text-sm font-medium mb-1">👤 User Activation</p>
                  <p className="text-xs text-muted-foreground">
                    Write operations typically require user interaction (click, keypress)
                  </p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500 p-3 rounded">
                  <p className="text-sm font-medium mb-1">🔐 Permission Prompts</p>
                  <p className="text-xs text-muted-foreground">
                    Read operations may trigger browser permission prompts (varies by browser)
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500 p-3 rounded">
                  <p className="text-sm font-medium mb-1">🚫 Not in Web Workers</p>
                  <p className="text-xs text-muted-foreground">
                    Clipboard API is not available in Web Worker contexts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Browser-Specific Behavior</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-2">Chromium (Chrome, Edge):</p>
                <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                  <li>May show permission prompt for read operations</li>
                  <li>Requires <code className="bg-muted px-1 rounded">clipboard-write</code> permission or user activation</li>
                  <li>Supports Permissions API integration</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Firefox & Safari:</p>
                <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                  <li>Shows context menu with "Paste" option for read operations</li>
                  <li>Write requires transient user activation</li>
                  <li>Different permission model than Chromium</li>
                </ul>
              </div>

              <div className="mt-3 p-3 bg-muted rounded-lg text-xs">
                <p className="font-medium mb-1">Testing Recommendation:</p>
                <p>Always test clipboard functionality across target browsers due to implementation differences.</p>
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
              <CardTitle>Copy Button</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">Copy text or code snippets with a single click:</p>
              <div className="bg-muted p-3 rounded-lg font-mono text-xs">
                <pre>{`<button onclick="copyCode()">
  Copy Code
</button>

async function copyCode() {
  const code = document
    .querySelector('pre').textContent;
  await navigator.clipboard
    .writeText(code);
  alert('Copied!');
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Share URL</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">Copy current page URL to share:</p>
              <div className="bg-muted p-3 rounded-lg font-mono text-xs">
                <pre>{`async function shareURL() {
  const url = window.location.href;
  await navigator.clipboard
    .writeText(url);
  showToast('Link copied!');
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Copy Rich Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">Copy formatted text with HTML:</p>
              <div className="bg-muted p-3 rounded-lg font-mono text-xs">
                <pre>{`const item = new ClipboardItem({
  'text/html': new Blob(
    ['<b>Bold</b> text'],
    { type: 'text/html' }
  ),
  'text/plain': new Blob(
    ['Bold text'],
    { type: 'text/plain' }
  )
});
await navigator.clipboard
  .write([item]);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paste Image</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">Handle image paste from clipboard:</p>
              <div className="bg-muted p-3 rounded-lg font-mono text-xs">
                <pre>{`input.addEventListener('paste',
  async (e) => {
  const items = await
    navigator.clipboard.read();
  for (const item of items) {
    if (item.types
      .includes('image/png')) {
      const blob = await item
        .getType('image/png');
      displayImage(blob);
    }
  }
});`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Browser Support */}
      <section>
        <h2 id="browser-support" className="text-2xl font-semibold mb-4">
          Browser Support
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Widely Supported</CardTitle>
            <CardDescription>Available in all modern browsers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium mb-2">Supported Browsers:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Chrome/Edge 66+ ✓</li>
                  <li>Firefox 63+ ✓</li>
                  <li>Safari 13.1+ ✓</li>
                  <li>Opera 53+ ✓</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Feature Availability:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>writeText() - Widely supported</li>
                  <li>readText() - Widely supported</li>
                  <li>write() - Chrome 76+, Safari 13.1+</li>
                  <li>read() - Chrome 76+, Safari 13.1+</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500 rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> While the API is widely supported, implementation details and permission
                models vary between browsers. Always include fallbacks and error handling.
              </p>
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
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-2">1. Always Handle Errors</h3>
                <p className="text-sm text-muted-foreground">
                  Clipboard operations can fail due to permissions, browser restrictions, or user cancellation.
                  Always use try-catch blocks.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">2. Provide User Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Show success messages (toasts, notifications) when content is copied, and error messages when operations fail.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">3. Require User Interaction</h3>
                <p className="text-sm text-muted-foreground">
                  Trigger clipboard writes from user-initiated events (clicks, keypresses) to avoid permission issues.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">4. Feature Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Check for API availability before use: <code className="bg-muted px-1 rounded">if (navigator.clipboard)</code>
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">5. Provide Multiple Formats</h3>
                <p className="text-sm text-muted-foreground">
                  When copying rich content, include both plain text and formatted versions for better compatibility.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">6. Test Across Browsers</h3>
                <p className="text-sm text-muted-foreground">
                  Permission models and behavior differ between browsers. Test thoroughly on all target platforms.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Resources */}
      <section>
        <h2 id="resources" className="text-2xl font-semibold mb-4">
          Additional Resources
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: Clipboard API
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: Clipboard Interface
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: ClipboardItem
                </a>
              </li>
              <li>
                <a
                  href="https://web.dev/async-clipboard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  web.dev: Unblocking Clipboard Access
                </a>
              </li>
              <li>
                <a
                  href="https://w3c.github.io/clipboard-apis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  W3C Specification: Clipboard API and Events
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
