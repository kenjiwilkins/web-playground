import { PropertiesValuesDemo } from '@/components/demos/PropertiesValuesDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PropertiesValues() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">
          CSS Properties and Values API
        </h1>
        <p className="text-muted-foreground">
          Register custom CSS properties with type checking, default values, and inheritance control using the Houdini Properties and Values API.
        </p>
      </div>

      {/* Live Demo Section */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <PropertiesValuesDemo />
      </section>

      {/* What is it? */}
      <section>
        <h2 id="what-is-it" className="text-2xl font-semibold mb-4">
          What is the CSS Properties and Values API?
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Type-Safe Custom Properties</CardTitle>
            <CardDescription>Part of the CSS Houdini family of APIs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The CSS Properties and Values API allows developers to register custom CSS properties (CSS variables) with:
            </p>
            <ul className="text-sm space-y-2 list-disc list-inside ml-4">
              <li>
                <strong>Type Checking:</strong> Define the syntax type (e.g., <code className="bg-muted px-1 rounded">&lt;color&gt;</code>, <code className="bg-muted px-1 rounded">&lt;length&gt;</code>, <code className="bg-muted px-1 rounded">&lt;percentage&gt;</code>)
              </li>
              <li>
                <strong>Initial Values:</strong> Set default values when the property is not defined
              </li>
              <li>
                <strong>Inheritance Control:</strong> Specify whether the property inherits from parent elements
              </li>
              <li>
                <strong>Animation Support:</strong> Enable smooth CSS transitions and animations on custom properties
              </li>
            </ul>
            <div className="bg-muted p-4 rounded-lg mt-4">
              <p className="text-sm font-medium mb-2">Key Benefits:</p>
              <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                <li>Smooth animations of custom properties (gradients, colors, transforms)</li>
                <li>Better performance than JavaScript-based animations</li>
                <li>Type safety prevents invalid values</li>
                <li>Works seamlessly with CSS transitions and animations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How to Use */}
      <section>
        <h2 id="how-to-use" className="text-2xl font-semibold mb-4">
          How to Use
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Method 1: JavaScript API</CardTitle>
              <CardDescription>Register properties using CSS.registerProperty()</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`CSS.registerProperty({
  name: '--my-color',
  syntax: '<color>',
  inherits: false,
  initialValue: '#ff0000',
});

CSS.registerProperty({
  name: '--my-angle',
  syntax: '<angle>',
  inherits: false,
  initialValue: '0deg',
});

CSS.registerProperty({
  name: '--my-length',
  syntax: '<length>',
  inherits: true,
  initialValue: '0px',
});`}</pre>
              </div>
              <div className="text-sm space-y-2">
                <p><strong>Parameters:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><code className="bg-muted px-1 rounded">name</code>: Custom property name (must start with --)</li>
                  <li><code className="bg-muted px-1 rounded">syntax</code>: Property type (see syntax types below)</li>
                  <li><code className="bg-muted px-1 rounded">inherits</code>: Whether the property inherits from parent</li>
                  <li><code className="bg-muted px-1 rounded">initialValue</code>: Default value for the property</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Method 2: CSS @property Rule</CardTitle>
              <CardDescription>Register properties directly in CSS (CSS 4)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`@property --my-color {
  syntax: '<color>';
  inherits: false;
  initial-value: #ff0000;
}

@property --my-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.element {
  background: linear-gradient(var(--my-angle), var(--my-color), blue);
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  to {
    --my-angle: 360deg;
    --my-color: #00ff00;
  }
}`}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                The @property rule offers the same functionality as CSS.registerProperty() but defined in CSS.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Syntax Types */}
      <section>
        <h2 id="syntax-types" className="text-2xl font-semibold mb-4">
          Available Syntax Types
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Supported Property Types</CardTitle>
            <CardDescription>Define what kind of values your custom property accepts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">&lt;length&gt;</code>
                <p className="text-xs text-muted-foreground mt-1">10px, 2em, 50%</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">&lt;number&gt;</code>
                <p className="text-xs text-muted-foreground mt-1">42, 3.14, -10</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">&lt;percentage&gt;</code>
                <p className="text-xs text-muted-foreground mt-1">50%, 100%</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">&lt;length-percentage&gt;</code>
                <p className="text-xs text-muted-foreground mt-1">10px or 50%</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">&lt;color&gt;</code>
                <p className="text-xs text-muted-foreground mt-1">#fff, rgb(), hsl()</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">&lt;image&gt;</code>
                <p className="text-xs text-muted-foreground mt-1">url(), gradient()</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">&lt;url&gt;</code>
                <p className="text-xs text-muted-foreground mt-1">url(image.png)</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">&lt;integer&gt;</code>
                <p className="text-xs text-muted-foreground mt-1">1, 2, 3, -5</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">&lt;angle&gt;</code>
                <p className="text-xs text-muted-foreground mt-1">45deg, 1rad, 0.5turn</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">&lt;time&gt;</code>
                <p className="text-xs text-muted-foreground mt-1">1s, 200ms</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">&lt;resolution&gt;</code>
                <p className="text-xs text-muted-foreground mt-1">300dpi, 2dppx</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">&lt;transform-function&gt;</code>
                <p className="text-xs text-muted-foreground mt-1">rotate(), scale()</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">&lt;custom-ident&gt;</code>
                <p className="text-xs text-muted-foreground mt-1">Custom identifier</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm font-medium">*</code>
                <p className="text-xs text-muted-foreground mt-1">Any value (no type checking)</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500 rounded-lg">
              <p className="text-sm">
                <strong>Combining Syntax Types:</strong> Use <code className="bg-muted px-1 rounded">|</code> to allow multiple types:
              </p>
              <code className="text-sm bg-muted px-2 py-1 rounded mt-2 inline-block">
                syntax: '&lt;length&gt; | &lt;percentage&gt;'
              </code>
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
              <CardTitle>Smooth Gradient Animations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Animate gradient angles and colors smoothly:</p>
              <div className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto">
                <pre>{`CSS.registerProperty({
  name: '--gradient-angle',
  syntax: '<angle>',
  inherits: false,
  initialValue: '0deg'
});

.element {
  background: linear-gradient(
    var(--gradient-angle),
    red, blue
  );
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  to { --gradient-angle: 360deg; }
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dynamic Theming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Create smooth color transitions for theme changes:</p>
              <div className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto">
                <pre>{`CSS.registerProperty({
  name: '--theme-primary',
  syntax: '<color>',
  inherits: true,
  initialValue: '#0066ff'
});

.button {
  background: var(--theme-primary);
  transition: --theme-primary 0.3s ease;
}

// Theme switch
document.documentElement.style
  .setProperty('--theme-primary', '#ff6600');`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Animated Transforms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Animate individual transform properties:</p>
              <div className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto">
                <pre>{`CSS.registerProperty({
  name: '--rotate-angle',
  syntax: '<angle>',
  inherits: false,
  initialValue: '0deg'
});

.box {
  transform: rotate(var(--rotate-angle));
  transition: --rotate-angle 0.5s ease;
}

.box:hover {
  --rotate-angle: 180deg;
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress Indicators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Create smooth progress animations:</p>
              <div className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto">
                <pre>{`CSS.registerProperty({
  name: '--progress',
  syntax: '<percentage>',
  inherits: false,
  initialValue: '0%'
});

.progress-bar {
  width: var(--progress);
  transition: --progress 0.3s ease;
}

// Update progress
element.style.setProperty('--progress', '75%');`}</pre>
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
            <CardTitle>Compatibility</CardTitle>
            <CardDescription>Well-supported in modern browsers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium">CSS.registerProperty()</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Chrome/Edge 78+ ✓</li>
                  <li>Opera 65+ ✓</li>
                  <li>Safari 16.4+ ✓</li>
                  <li>Firefox: Not yet supported ✗</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">@property CSS Rule</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Chrome/Edge 85+ ✓</li>
                  <li>Opera 71+ ✓</li>
                  <li>Safari 16.4+ ✓</li>
                  <li>Firefox: Not yet supported ✗</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500 rounded-lg">
              <p className="text-sm">
                <strong>Feature Detection:</strong> Always check for support before using:
              </p>
              <code className="text-sm bg-muted px-2 py-1 rounded mt-2 inline-block">
                if ('registerProperty' in CSS) &#123; /* Use API */ &#125;
              </code>
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
                <h3 className="font-semibold text-sm mb-2">1. Always Provide Initial Values</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure your registered properties have sensible defaults to prevent rendering issues.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">2. Use Specific Syntax Types</h3>
                <p className="text-sm text-muted-foreground">
                  Avoid using <code className="bg-muted px-1 rounded">*</code> syntax unless necessary. Specific types enable better optimization and validation.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">3. Register Properties Early</h3>
                <p className="text-sm text-muted-foreground">
                  Register custom properties before they're used in your CSS to ensure smooth animations from the start.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">4. Handle Registration Errors</h3>
                <p className="text-sm text-muted-foreground">
                  Properties can only be registered once. Use try-catch blocks to handle re-registration attempts gracefully.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">5. Consider Performance</h3>
                <p className="text-sm text-muted-foreground">
                  Registered properties are more performant for animations than JavaScript-based solutions, but still trigger repaints.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">6. Provide Fallbacks</h3>
                <p className="text-sm text-muted-foreground">
                  For browsers without support, consider providing alternative styling or JavaScript-based animations.
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
                  href="https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: CSS Properties and Values API
                </a>
              </li>
              <li>
                <a
                  href="https://web.dev/css-props-and-vals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  web.dev: CSS Properties and Values API
                </a>
              </li>
              <li>
                <a
                  href="https://drafts.css-houdini.org/css-properties-values-api/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  W3C Specification: CSS Properties and Values API Level 1
                </a>
              </li>
              <li>
                <a
                  href="https://caniuse.com/mdn-api_css_registerproperty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Can I Use: CSS.registerProperty()
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
