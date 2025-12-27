import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PaintingAPIDemo } from '@/components/demos/PaintingAPIDemo'

export default function PaintingAPI() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="css-painting-api" className="text-3xl font-bold tracking-tight">
          CSS Painting API
        </h1>
        <p className="text-muted-foreground">
          Part of CSS Houdini - write JavaScript to draw custom graphics in CSS
        </p>
      </div>

      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demos
        </h2>
        <PaintingAPIDemo />
      </section>

      <section>
        <h2 id="introduction" className="text-2xl font-semibold mb-4">
          Introduction
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What is the CSS Painting API?</CardTitle>
            <CardDescription>Programmatic image generation for CSS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The CSS Painting API is part of the{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Houdini_APIs" className="text-primary hover:underline">
                CSS Houdini
              </a>{' '}
              family of APIs that allow developers to write JavaScript functions to draw directly into an element's
              background, border, or content. It enables creating custom, dynamic visual effects that respond to CSS
              property changes.
            </p>
            <p>
              Unlike traditional CSS backgrounds or borders, the Painting API runs in a{' '}
              <strong>worklet</strong> - a lightweight execution context that doesn't block the main thread. This means
              you can create complex, animated effects without impacting page performance.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">⚠️ Experimental Feature</p>
              <p className="text-sm">
                The CSS Painting API is currently supported primarily in Chromium-based browsers (Chrome, Edge, Opera).
                Always check browser support before using in production.
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
            <CardTitle>Three-Step Process</CardTitle>
            <CardDescription>From worklet to rendered pixels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Step 1: Create a Paint Worklet</p>
              <p className="text-sm mb-2">
                Write a JavaScript file that uses <code className="bg-muted px-1 rounded">registerPaint()</code> to define
                your custom painter.
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <code className="block">// my-painter.js</code>
                <code className="block">registerPaint('my-painter', class &#123;</code>
                <code className="block ml-4">static get inputProperties() &#123;</code>
                <code className="block ml-8">return ['--my-color'];</code>
                <code className="block ml-4">&#125;</code>
                <code className="block"></code>
                <code className="block ml-4">paint(ctx, size, props) &#123;</code>
                <code className="block ml-8">ctx.fillStyle = props.get('--my-color');</code>
                <code className="block ml-8">ctx.fillRect(0, 0, size.width, size.height);</code>
                <code className="block ml-4">&#125;</code>
                <code className="block">&#125;);</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Step 2: Register the Worklet</p>
              <p className="text-sm mb-2">
                Load the worklet file using <code className="bg-muted px-1 rounded">CSS.paintWorklet.addModule()</code>.
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <code className="block">// In your main JavaScript</code>
                <code className="block">CSS.paintWorklet.addModule('/my-painter.js');</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Step 3: Use in CSS</p>
              <p className="text-sm mb-2">
                Apply the paint using the <code className="bg-muted px-1 rounded">paint()</code> CSS function.
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <code className="block">.element &#123;</code>
                <code className="block ml-4">background-image: paint(my-painter);</code>
                <code className="block ml-4">--my-color: #4f46e5;</code>
                <code className="block">&#125;</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="paint-function" className="text-2xl font-semibold mb-4">
          The paint() Function
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Function Signature</CardTitle>
            <CardDescription>Understanding the parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">paint(ctx, size, props)</code>
            </div>

            <div className="grid gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-2">ctx: PaintRenderingContext2D</h3>
                <p className="text-sm text-muted-foreground">
                  A rendering context similar to Canvas 2D API. Supports methods like{' '}
                  <code className="bg-muted px-1 rounded">fillRect()</code>,{' '}
                  <code className="bg-muted px-1 rounded">arc()</code>,{' '}
                  <code className="bg-muted px-1 rounded">stroke()</code>, etc.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-2">size: PaintSize</h3>
                <p className="text-sm text-muted-foreground">
                  Object containing <code className="bg-muted px-1 rounded">width</code> and{' '}
                  <code className="bg-muted px-1 rounded">height</code> properties representing the output bitmap
                  dimensions.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-2">props: StylePropertyMapReadOnly</h3>
                <p className="text-sm text-muted-foreground">
                  CSS custom properties specified in{' '}
                  <code className="bg-muted px-1 rounded">inputProperties()</code>. Access using{' '}
                  <code className="bg-muted px-1 rounded">props.get('--property-name')</code>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="input-properties" className="text-2xl font-semibold mb-4">
          Input Properties
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Accessing CSS Properties</CardTitle>
            <CardDescription>Make your paint worklet reactive to style changes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The <code className="bg-muted px-1 rounded">inputProperties()</code> static getter declares which CSS
              properties your worklet needs to access. When these properties change, the paint function is automatically
              re-run.
            </p>

            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <code className="block">static get inputProperties() &#123;</code>
              <code className="block ml-4">return [</code>
              <code className="block ml-8">'--box-color',</code>
              <code className="block ml-8">'--border-width',</code>
              <code className="block ml-8">'--pattern-size'</code>
              <code className="block ml-4">];</code>
              <code className="block">&#125;</code>
              <code className="block"></code>
              <code className="block">paint(ctx, size, props) &#123;</code>
              <code className="block ml-4">const color = props.get('--box-color').toString();</code>
              <code className="block ml-4">const width = parseInt(props.get('--border-width'));</code>
              <code className="block ml-4">// Use the values...</code>
              <code className="block">&#125;</code>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-1">💡 Tip</p>
              <p className="text-sm">
                You can access any CSS property (custom or standard), but declaring them in{' '}
                <code className="bg-muted px-1 rounded">inputProperties()</code> ensures automatic re-painting when they
                change.
              </p>
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
            <CardTitle>When to Use the CSS Painting API</CardTitle>
            <CardDescription>Practical applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex gap-2">
                <span className="text-primary">🎨</span>
                <div>
                  <strong className="text-sm">Custom Animated Backgrounds</strong>
                  <p className="text-sm text-muted-foreground">
                    Create dynamic, responsive background patterns
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">🎭</span>
                <div>
                  <strong className="text-sm">Dynamic Gradients</strong>
                  <p className="text-sm text-muted-foreground">
                    Gradients that respond to CSS variable changes
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">📊</span>
                <div>
                  <strong className="text-sm">Data Visualizations</strong>
                  <p className="text-sm text-muted-foreground">
                    Charts and graphs driven by CSS properties
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">🖼️</span>
                <div>
                  <strong className="text-sm">Geometric Patterns</strong>
                  <p className="text-sm text-muted-foreground">
                    Complex patterns without image files
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">✨</span>
                <div>
                  <strong className="text-sm">Visual Effects</strong>
                  <p className="text-sm text-muted-foreground">
                    Effects based on computed styles or user interaction
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">🎯</span>
                <div>
                  <strong className="text-sm">Responsive Elements</strong>
                  <p className="text-sm text-muted-foreground">
                    Visuals that adapt to element dimensions
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="advantages" className="text-2xl font-semibold mb-4">
          Advantages
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Why Use the CSS Painting API?</CardTitle>
            <CardDescription>Key benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Performance</strong> - Runs in a worklet, doesn't block the main thread
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Dynamic</strong> - Automatically re-paints when CSS properties change
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>No Images</strong> - Reduce HTTP requests, no need for static image files
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Scalable</strong> - Vector-based, looks perfect at any resolution
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Flexible</strong> - Can be applied to background-image, border-image, or mask-image
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Composable</strong> - Combine with CSS transforms, filters, and other effects
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="browser-support" className="text-2xl font-semibold mb-4">
          Browser Support
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Limited Browser Support</CardTitle>
            <CardDescription>Check compatibility before production use</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Chrome</strong> - Supported since version 65 (2018)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Edge</strong> - Supported since version 79 (Chromium-based)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Opera</strong> - Supported since version 52
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 mt-1">✗</span>
                <div>
                  <strong>Firefox</strong> - Not supported (as of 2024)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 mt-1">✗</span>
                <div>
                  <strong>Safari</strong> - Not supported (as of 2024)
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm font-semibold mb-2">Feature Detection</p>
              <p className="text-sm mb-2">Always check for support before using:</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">if ('paintWorklet' in CSS) &#123;</code>
                <code className="text-sm block ml-4">// Use the API</code>
                <code className="text-sm block">&#125; else &#123;</code>
                <code className="text-sm block ml-4">// Provide fallback</code>
                <code className="text-sm block">&#125;</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="best-practices" className="text-2xl font-semibold mb-4">
          Best Practices
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Guidelines for Using the API</CardTitle>
            <CardDescription>Recommendations for optimal implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Always feature detect</strong> - Check for CSS.paintWorklet before using
              </li>
              <li>
                <strong>Provide fallbacks</strong> - Use regular CSS backgrounds as fallback for unsupported browsers
              </li>
              <li>
                <strong>Keep paint functions simple</strong> - Complex calculations can impact performance
              </li>
              <li>
                <strong>Use CSS custom properties</strong> - Makes worklets more reusable and configurable
              </li>
              <li>
                <strong>Minimize property access</strong> - Cache values from props.get() if used multiple times
              </li>
              <li>
                <strong>Test performance</strong> - Monitor paint times especially for animated effects
              </li>
              <li>
                <strong>Consider static images for simple cases</strong> - Don't overcomplicate if a PNG/SVG works
              </li>
              <li>
                <strong>Use contextOptions wisely</strong> - Set alpha: false if you don't need transparency
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="limitations" className="text-2xl font-semibold mb-4">
          Limitations
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Important Constraints</CardTitle>
            <CardDescription>What to be aware of</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Limited browser support</strong> - Only Chromium-based browsers currently
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>No DOM access</strong> - Worklets cannot access the DOM or window object
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Limited Canvas API</strong> - Not all Canvas 2D features are available
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>No images or external resources</strong> - Cannot load images in the paint function
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Separate file required</strong> - Worklet code must be in a separate JavaScript file
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
