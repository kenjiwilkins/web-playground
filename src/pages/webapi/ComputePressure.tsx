import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ComputePressureDemo } from '@/components/demos/ComputePressureDemo'

export default function ComputePressure() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 id="compute-pressure-api" className="text-3xl font-bold tracking-tight">
          Compute Pressure API
        </h1>
        <p className="text-muted-foreground">
          Monitor system CPU pressure to optimize application performance and user experience
        </p>
      </div>

      {/* Live Demo */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <ComputePressureDemo />
      </section>

      {/* What is it */}
      <section>
        <h2 id="what-is-it" className="text-2xl font-semibold mb-4">
          What is the Compute Pressure API?
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>System Resource Monitoring</CardTitle>
            <CardDescription>Real-time CPU pressure information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Compute Pressure API provides web applications with information about the system's CPU
              utilization. This allows applications to adapt their behavior based on the current compute
              pressure, improving user experience by preventing performance degradation.
            </p>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-semibold text-sm">Key Features:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Real-time CPU pressure monitoring</li>
                <li>Four pressure states: nominal, fair, serious, critical</li>
                <li>Observer pattern for continuous updates</li>
                <li>Privacy-preserving (no raw CPU data exposed)</li>
                <li>Helps prevent thermal throttling and battery drain</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 text-sm">
              <strong>Note:</strong> This is an experimental API currently available in Chrome 125+ and
              may require origin trials or flags to be enabled. It's designed to help applications be
              "good citizens" by adapting to system constraints.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Pressure States */}
      <section>
        <h2 id="pressure-states" className="text-2xl font-semibold mb-4">
          Pressure States
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Understanding Pressure Levels</CardTitle>
            <CardDescription>What each state means for your application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-green-500">Nominal</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The system is running smoothly with plenty of available resources. This is the ideal
                  state where applications can use full features without concern.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-blue-500">Fair</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The system is experiencing moderate load. Applications can continue normal operation
                  but should be mindful of resource usage.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-orange-500">Serious</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The system is under significant load. Applications should reduce non-essential work,
                  lower animation quality, or defer background tasks.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-red-500">Critical</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The system is heavily loaded and may be thermal throttling. Applications should
                  minimize CPU usage, pause animations, and defer all non-critical work.
                </p>
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
        <Card>
          <CardHeader>
            <CardTitle>Basic Usage</CardTitle>
            <CardDescription>Creating a pressure observer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{`// Check for browser support
if ('PressureObserver' in window) {
  // Create observer
  const observer = new PressureObserver((records) => {
    const latestRecord = records[records.length - 1];
    console.log('Pressure state:', latestRecord.state);

    // Adapt based on pressure
    if (latestRecord.state === 'critical') {
      // Reduce animation quality
      reduceQuality();
    }
  });

  // Start observing CPU pressure
  await observer.observe('cpu');
} else {
  console.log('Compute Pressure API not supported');
}`}</code>
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Important Notes:</h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>The <code className="text-xs bg-muted px-1 rounded">observe()</code> method is asynchronous and returns a Promise</li>
                <li>Currently only 'cpu' source is supported</li>
                <li>Records are sampled at regular intervals (typically 1 second)</li>
                <li>Always clean up observers when done using <code className="text-xs bg-muted px-1 rounded">disconnect()</code></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Core API */}
      <section>
        <h2 id="core-api" className="text-2xl font-semibold mb-4">
          Core API
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PressureObserver</CardTitle>
              <CardDescription>Main interface for monitoring compute pressure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">Constructor</h4>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>new PressureObserver(callback)</code>
                  <p className="text-muted-foreground mt-2">
                    Creates a new observer. The callback receives an array of PressureRecord objects.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-1">Methods</h4>
                <ul className="space-y-2 text-sm">
                  <li className="bg-muted p-2 rounded">
                    <code>observe(source): Promise&lt;void&gt;</code>
                    <p className="text-muted-foreground mt-1">
                      Start observing pressure for the given source ('cpu')
                    </p>
                  </li>
                  <li className="bg-muted p-2 rounded">
                    <code>unobserve(source): void</code>
                    <p className="text-muted-foreground mt-1">
                      Stop observing pressure for the given source
                    </p>
                  </li>
                  <li className="bg-muted p-2 rounded">
                    <code>disconnect(): void</code>
                    <p className="text-muted-foreground mt-1">
                      Stop all observations and clean up resources
                    </p>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PressureRecord</CardTitle>
              <CardDescription>Pressure observation result</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  <code>{`interface PressureRecord {
  source: 'cpu';
  state: 'nominal' | 'fair' | 'serious' | 'critical';
  time: number; // DOMHighResTimeStamp
}`}</code>
                </pre>
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
              <CardTitle className="text-lg">Adaptive Rendering</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`const observer = new PressureObserver(
  (records) => {
    const state = records[0].state;

    if (state === 'critical') {
      // Reduce quality
      setParticleCount(50);
      disablePostProcessing();
    } else if (state === 'serious') {
      setParticleCount(100);
    } else {
      setParticleCount(500);
      enablePostProcessing();
    }
  }
);

await observer.observe('cpu');`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Video Quality Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`const observer = new PressureObserver(
  (records) => {
    const state = records[0].state;

    if (state === 'critical') {
      videoPlayer.setQuality('360p');
    } else if (state === 'serious') {
      videoPlayer.setQuality('480p');
    } else {
      videoPlayer.setQuality('1080p');
    }
  }
);

await observer.observe('cpu');`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Background Task Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`const observer = new PressureObserver(
  (records) => {
    const state = records[0].state;

    if (state === 'nominal') {
      // System idle, run background tasks
      processQueue();
    } else {
      // System busy, defer tasks
      pauseQueue();
    }
  }
);

await observer.observe('cpu');`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gaming Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`const observer = new PressureObserver(
  (records) => {
    const state = records[0].state;

    if (state === 'critical') {
      game.setQuality('low');
      game.setFPS(30);
    } else if (state === 'nominal') {
      game.setQuality('ultra');
      game.setFPS(60);
    }
  }
);

await observer.observe('cpu');`}</code>
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
                  <li>Clean up observers when components unmount</li>
                  <li>Implement graceful degradation for all pressure states</li>
                  <li>Test your application at all pressure levels</li>
                  <li>Provide user controls to override automatic adjustments</li>
                  <li>Use debouncing to avoid frequent quality changes</li>
                  <li>Log pressure states for performance analysis</li>
                  <li>Combine with other performance APIs (requestIdleCallback, etc.)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">❌ Don't</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground ml-4">
                  <li>Don't assume the API is available - always check for support</li>
                  <li>Don't make drastic changes on every pressure update</li>
                  <li>Don't use this API for fingerprinting or tracking users</li>
                  <li>Don't create observers without cleanup mechanisms</li>
                  <li>Don't ignore user preferences (prefer reduced motion, etc.)</li>
                  <li>Don't rely solely on pressure state for performance decisions</li>
                </ul>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold text-sm mb-2">React Example with Cleanup</h3>
                <pre className="text-xs overflow-x-auto">
                  <code>{`useEffect(() => {
  const observer = new PressureObserver((records) => {
    setPressure(records[records.length - 1].state);
  });

  observer.observe('cpu').catch(console.error);

  // Cleanup on unmount
  return () => {
    observer.disconnect();
  };
}, []);`}</code>
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
                      <td className="p-2 text-green-500">125+</td>
                      <td className="p-2 text-muted-foreground">Full support</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Edge</td>
                      <td className="p-2 text-green-500">125+</td>
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
                <strong>⚠ Experimental API:</strong> This API is still experimental and may require
                enabling browser flags or origin trials. Always check for availability before use and
                provide fallbacks for unsupported browsers.
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
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Compute_Pressure_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN: Compute Pressure API
                </a>
              </li>
              <li>
                <a
                  href="https://w3c.github.io/compute-pressure/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  W3C Specification
                </a>
              </li>
              <li>
                <a
                  href="https://developer.chrome.com/docs/web-platform/compute-pressure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Chrome for Developers: Compute Pressure API
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/w3c/compute-pressure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
