import { DeviceMemoryDemo } from '@/components/demos/DeviceMemoryDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DeviceMemory() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">
          Device Memory API
        </h1>
        <p className="text-muted-foreground">
          Detect approximate device RAM to optimize content delivery and enable adaptive loading based on hardware capabilities.
        </p>
      </div>

      {/* Live Demo */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <DeviceMemoryDemo />
      </section>

      {/* Overview */}
      <section>
        <h2 id="overview" className="text-2xl font-semibold mb-4">
          Overview
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What is the Device Memory API?</CardTitle>
            <CardDescription>
              A lightweight API for hardware capability detection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Device Memory API provides a simple way to detect the approximate amount of RAM
              available on a user's device. This enables web applications to deliver appropriately
              sized resources and features based on device capabilities rather than relying on
              unreliable heuristics or User Agent strings.
            </p>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Key Benefits:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Adaptive Loading:</strong> Serve appropriate asset quality and features</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Better Performance:</strong> Prevent overloading low-end devices</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Enhanced UX:</strong> Optimize experience for each device class</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Progressive Enhancement:</strong> Enable advanced features on capable devices</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Simple API:</strong> Single read-only property, no complex setup</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 p-4 rounded border border-yellow-500/30">
              <p className="text-sm">
                <strong>Privacy Note:</strong> The API returns quantized values (0.25, 0.5, 1, 2, 4, 8, 16+ GB)
                rather than exact specifications to protect user privacy and prevent fingerprinting.
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
              <CardTitle>navigator.deviceMemory</CardTitle>
              <CardDescription>
                Read-only property returning approximate RAM in gigabytes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Syntax:</h4>
                <div className="bg-muted p-3 rounded font-mono text-sm">
                  const memory = navigator.deviceMemory;
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Return Value:</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  A <code className="bg-muted px-1 rounded">number</code> representing approximate
                  device memory in gigabytes, or <code className="bg-muted px-1 rounded">undefined</code> if
                  not supported.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <div className="font-semibold mb-2">Possible Values:</div>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>0.25 GB - Very low-end devices</li>
                    <li>0.5 GB - Feature phones, basic smartphones</li>
                    <li>1 GB - Entry-level smartphones</li>
                    <li>2 GB - Mid-range devices</li>
                    <li>4 GB - Modern smartphones, standard laptops</li>
                    <li>8 GB - Premium devices, good desktops</li>
                    <li>16+ GB - High-end workstations</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Example:</h4>
                <div className="bg-muted p-3 rounded font-mono text-sm">
                  <pre className="whitespace-pre-wrap">{`// Check device capability
const memory = navigator.deviceMemory || 4; // Default to 4GB

if (memory < 2) {
  console.log('Low-end device detected');
  loadLiteVersion();
} else if (memory < 8) {
  console.log('Standard device detected');
  loadStandardVersion();
} else {
  console.log('High-end device detected');
  loadFullFeaturedVersion();
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>WorkerNavigator.deviceMemory</CardTitle>
              <CardDescription>
                Same API available in Web Workers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The Device Memory API is also accessible from Web Workers, allowing you to make
                capability-based decisions in background threads.
              </p>

              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`// Inside a Web Worker
self.addEventListener('message', (e) => {
  const memory = self.navigator.deviceMemory;

  if (memory >= 4) {
    performHeavyComputation();
  } else {
    performOptimizedComputation();
  }
});`}</pre>
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
              <CardTitle>1. Adaptive Image Loading</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Serve appropriate image quality based on device capability:
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`const memory = navigator.deviceMemory;

let imageQuality;
if (memory < 1) {
  imageQuality = 'low';
} else if (memory < 4) {
  imageQuality = 'medium';
} else {
  imageQuality = 'high';
}

const imgSrc = \`/images/hero-\${imageQuality}.jpg\`;`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Feature Enablement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Enable expensive features only on capable devices:
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`const memory = navigator.deviceMemory || 4;

const features = {
  animations: memory >= 2,
  videoBackgrounds: memory >= 4,
  parallaxEffects: memory >= 4,
  realtimeUpdates: memory >= 8,
  heavyGraphics: memory >= 8
};

if (features.animations) {
  enableAnimations();
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Bundle Splitting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Load different app versions based on device:
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`const memory = navigator.deviceMemory || 4;

if (memory >= 8) {
  // Full-featured app
  import('./app-premium.js');
} else if (memory >= 2) {
  // Standard features
  import('./app-standard.js');
} else {
  // Lightweight version
  import('./app-lite.js');
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Caching Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Adjust cache size based on available memory:
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`const memory = navigator.deviceMemory || 4;

const cacheConfig = {
  maxSize: memory < 2 ? 5 :
           memory < 4 ? 20 :
           memory < 8 ? 50 : 100,
  ttl: memory < 2 ? 300 : 3600
};

initializeCache(cacheConfig);`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Client Hints */}
      <section>
        <h2 id="client-hints" className="text-2xl font-semibold mb-4">
          HTTP Client Hints
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Server-Side Device Memory Detection</CardTitle>
            <CardDescription>
              Access device memory information in HTTP headers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Device memory can also be accessed server-side via HTTP Client Hints, allowing you to
              optimize responses before sending them to the client.
            </p>

            <div>
              <h4 className="font-semibold mb-2">Request Headers:</h4>
              <div className="bg-muted p-3 rounded font-mono text-sm space-y-2">
                <div>
                  <div className="text-muted-foreground text-xs mb-1">Legacy header:</div>
                  <code>Device-Memory: 8</code>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs mb-1">Modern header (preferred):</div>
                  <code>Sec-CH-Device-Memory: 8</code>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Server Response Example:</h4>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`// Express.js example
app.get('/content', (req, res) => {
  const memory = parseFloat(
    req.headers['sec-ch-device-memory'] || '4'
  );

  if (memory < 2) {
    res.json({ version: 'lite', images: 'low-res' });
  } else if (memory < 8) {
    res.json({ version: 'standard', images: 'medium-res' });
  } else {
    res.json({ version: 'premium', images: 'high-res' });
  }
});`}</pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Requesting Client Hints:</h4>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`<!-- In HTML -->
<meta http-equiv="Accept-CH" content="Device-Memory">

<!-- Or via HTTP header -->
Accept-CH: Device-Memory, Sec-CH-Device-Memory`}</pre>
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
                <h4 className="font-semibold mb-2">✓ Always Provide Fallbacks</h4>
                <p className="text-muted-foreground mb-2">
                  The API is not universally supported. Default to a reasonable value:
                </p>
                <div className="bg-muted p-2 rounded font-mono text-xs">
                  const memory = navigator.deviceMemory || 4;
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Use Thresholds, Not Exact Values</h4>
                <p className="text-muted-foreground mb-2">
                  Don't rely on specific values - use ranges for decisions:
                </p>
                <div className="bg-muted p-2 rounded font-mono text-xs">
                  if (memory &lt; 2) &#123;...&#125; else if (memory &lt; 8) &#123;...&#125;
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Combine with Other Signals</h4>
                <p className="text-muted-foreground">
                  Use alongside Network Information API, Save-Data, and performance metrics for
                  comprehensive adaptive loading strategies.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Progressive Enhancement</h4>
                <p className="text-muted-foreground">
                  Start with a baseline experience that works everywhere, then enhance for capable devices.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Test Across Devices</h4>
                <p className="text-muted-foreground">
                  Verify your thresholds work well across different device categories. Chrome DevTools
                  allows you to emulate different device memory values.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">⚠️ Don't Use for Fingerprinting</h4>
                <p className="text-muted-foreground">
                  The API is designed for feature optimization, not user tracking. Respect user privacy.
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
              Desktop and mobile browser support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Supported:</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Chrome/Edge 63+</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Opera 50+</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Android WebView 63+</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Samsung Internet 8.0+</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Not Supported:</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-red-500 text-xl">✗</span>
                    <span>Firefox (all versions)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-red-500 text-xl">✗</span>
                    <span>Safari (all versions)</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30 text-sm">
                <strong>Note:</strong> Limited browser support makes fallback values essential.
                The API works best when combined with other capability detection methods.
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
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Device_Memory_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN Web Docs: Device Memory API
                </a>
              </li>
              <li>
                <a
                  href="https://www.w3.org/TR/device-memory/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  W3C Specification: Device Memory
                </a>
              </li>
              <li>
                <a
                  href="https://web.dev/adaptive-loading-cds-2019/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  web.dev: Adaptive Loading
                </a>
              </li>
              <li>
                <a
                  href="https://developer.chrome.com/blog/new-in-devtools-63/#memory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Chrome DevTools: Emulate Device Memory
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
