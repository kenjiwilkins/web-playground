import { TypedOMDemo } from '@/components/demos/TypedOMDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function TypedOM() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">
          CSS Typed Object Model API
        </h1>
        <p className="text-muted-foreground">
          Manipulate CSS values as typed JavaScript objects for better performance, type safety, and maintainability.
        </p>
      </div>

      {/* Live Demo Section */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <TypedOMDemo />
      </section>

      {/* What is it? */}
      <section>
        <h2 id="what-is-it" className="text-2xl font-semibold mb-4">
          What is the CSS Typed OM API?
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Type-Safe CSS Value Manipulation</CardTitle>
            <CardDescription>Part of the CSS Houdini project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The CSS Typed Object Model API provides a way to interact with CSS values using typed JavaScript objects
              instead of strings. This modern approach offers significant advantages over traditional string-based CSS manipulation.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-red-500/10 border border-red-500/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">❌ Traditional String-Based:</p>
                <code className="text-xs bg-background p-2 rounded block">
                  element.style.width = "100px"<br />
                  element.style.transform = "rotate(" + angle + "deg)"
                </code>
                <p className="text-xs text-muted-foreground mt-2">
                  Requires parsing, concatenation, no type safety
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">✅ Typed OM:</p>
                <code className="text-xs bg-background p-2 rounded block">
                  el.attributeStyleMap.set('width', CSS.px(100))<br />
                  el.attributeStyleMap.set('transform', new CSSRotate(CSS.deg(angle)))
                </code>
                <p className="text-xs text-muted-foreground mt-2">
                  Type-safe, performant, object-oriented
                </p>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg mt-4">
              <p className="text-sm font-medium mb-2">Key Benefits:</p>
              <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                <li><strong>Performance:</strong> Faster than string parsing and manipulation</li>
                <li><strong>Type Safety:</strong> Values are strongly typed JavaScript objects</li>
                <li><strong>Maintainability:</strong> More readable and less error-prone code</li>
                <li><strong>Unit-Aware Math:</strong> Perform calculations with automatic unit handling</li>
                <li><strong>Reliability:</strong> Eliminates parsing errors and invalid values</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Core Concepts */}
      <section>
        <h2 id="core-concepts" className="text-2xl font-semibold mb-4">
          Core Concepts
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>StylePropertyMap</CardTitle>
              <CardDescription>Modern replacement for CSSStyleDeclaration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                The <code className="bg-muted px-1 rounded">StylePropertyMap</code> interface provides methods to manipulate CSS properties:
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Access via attributeStyleMap (inline styles)
element.attributeStyleMap.set('opacity', CSS.number(0.5))
element.attributeStyleMap.get('opacity')
element.attributeStyleMap.delete('opacity')
element.attributeStyleMap.clear()

// Access via computedStyleMap() (computed styles - read only)
const computedStyles = element.computedStyleMap()
const width = computedStyles.get('width')  // Returns CSSUnitValue`}</pre>
              </div>
              <div className="grid gap-2 md:grid-cols-2 text-sm">
                <div>
                  <p className="font-medium mb-1">Key Methods:</p>
                  <ul className="text-xs space-y-1 list-disc list-inside ml-2">
                    <li><code className="bg-muted px-1 rounded">set(property, value)</code> - Set property value</li>
                    <li><code className="bg-muted px-1 rounded">get(property)</code> - Get property value</li>
                    <li><code className="bg-muted px-1 rounded">append(property, value)</code> - Append value</li>
                    <li><code className="bg-muted px-1 rounded">delete(property)</code> - Remove property</li>
                    <li><code className="bg-muted px-1 rounded">clear()</code> - Clear all properties</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Access Points:</p>
                  <ul className="text-xs space-y-1 list-disc list-inside ml-2">
                    <li><code className="bg-muted px-1 rounded">element.attributeStyleMap</code> - Inline styles (read/write)</li>
                    <li><code className="bg-muted px-1 rounded">element.computedStyleMap()</code> - Computed styles (read-only)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CSSStyleValue & Subclasses</CardTitle>
              <CardDescription>Typed representations of CSS values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-muted p-3 rounded">
                  <code className="text-sm font-medium">CSSUnitValue</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Single numeric value with a unit: <code className="bg-background px-1 rounded">CSS.px(100)</code>, <code className="bg-background px-1 rounded">CSS.percent(50)</code>
                  </p>
                </div>
                <div className="bg-muted p-3 rounded">
                  <code className="text-sm font-medium">CSSKeywordValue</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    CSS keywords: <code className="bg-background px-1 rounded">new CSSKeywordValue('auto')</code>, <code className="bg-background px-1 rounded">new CSSKeywordValue('inherit')</code>
                  </p>
                </div>
                <div className="bg-muted p-3 rounded">
                  <code className="text-sm font-medium">CSSNumericValue</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Base for numeric values, supports math operations: <code className="bg-background px-1 rounded">.add()</code>, <code className="bg-background px-1 rounded">.sub()</code>, <code className="bg-background px-1 rounded">.mul()</code>, <code className="bg-background px-1 rounded">.div()</code>
                  </p>
                </div>
                <div className="bg-muted p-3 rounded">
                  <code className="text-sm font-medium">CSSTransformValue</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Transform functions: <code className="bg-background px-1 rounded">new CSSRotate()</code>, <code className="bg-background px-1 rounded">new CSSScale()</code>, <code className="bg-background px-1 rounded">new CSSTranslate()</code>
                  </p>
                </div>
                <div className="bg-muted p-3 rounded">
                  <code className="text-sm font-medium">CSSMathValue</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Math expressions: <code className="bg-background px-1 rounded">CSS.min()</code>, <code className="bg-background px-1 rounded">CSS.max()</code>, <code className="bg-background px-1 rounded">CSS.calc()</code>
                  </p>
                </div>
                <div className="bg-muted p-3 rounded">
                  <code className="text-sm font-medium">CSSUnparsedValue</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Custom properties (CSS variables): <code className="bg-background px-1 rounded">new CSSUnparsedValue(['var(--primary)'])</code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Patterns */}
      <section>
        <h2 id="common-patterns" className="text-2xl font-semibold mb-4">
          Common Usage Patterns
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Setting Numeric Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Using CSS factory functions
element.attributeStyleMap.set('width', CSS.px(200))
element.attributeStyleMap.set('height', CSS.percent(50))
element.attributeStyleMap.set('opacity', CSS.number(0.8))

// Creating CSSUnitValue directly
const width = new CSSUnitValue(200, 'px')
element.attributeStyleMap.set('width', width)

// Math operations
const currentWidth = element.computedStyleMap().get('width')
const newWidth = currentWidth.add(CSS.px(50))
element.attributeStyleMap.set('width', newWidth)`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Working with Transforms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Create individual transform functions
const rotate = new CSSRotate(CSS.deg(45))
const scale = new CSSScale(CSS.number(1.5), CSS.number(1.5))
const translate = new CSSTranslate(CSS.px(100), CSS.px(50))

// Combine transforms
const transforms = new CSSTransformValue([rotate, scale, translate])
element.attributeStyleMap.set('transform', transforms)

// Read and modify existing transforms
const currentTransform = element.computedStyleMap().get('transform')
if (currentTransform instanceof CSSTransformValue) {
  // Access individual transform functions
  const firstTransform = currentTransform[0]
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Unit Conversion and Math</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Perform calculations
const width = CSS.px(100)
const padding = CSS.px(20)
const totalWidth = width.add(padding.mul(2))  // 100px + (20px * 2)

// Use min/max
const maxWidth = CSS.min(CSS.px(500), CSS.vw(80))
element.attributeStyleMap.set('width', maxWidth)

// Convert units
const pixels = CSS.px(100)
const rems = pixels.to('rem')  // Requires context

// Compare values
const a = CSS.px(100)
const b = CSS.px(50)
console.log(a.equals(b))  // false`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reading Computed Styles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Get computed styles as typed objects
const styles = element.computedStyleMap()

const width = styles.get('width')  // CSSUnitValue
console.log(width.value)           // number
console.log(width.unit)            // "px"

const display = styles.get('display')  // CSSKeywordValue
console.log(display.value)             // "block"

const color = styles.get('color')  // CSSStyleValue
console.log(color.toString())      // "rgb(255, 0, 0)"

// Iterate over all properties
for (const [property, value] of styles) {
  console.log(\`\${property}: \${value}\`)
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Factory Functions */}
      <section>
        <h2 id="factory-functions" className="text-2xl font-semibold mb-4">
          CSS Factory Functions
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Creating CSS Values with CSS.*</CardTitle>
            <CardDescription>Convenient factory methods for common units</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">CSS.number(value)</code>
                <p className="text-xs text-muted-foreground mt-1">Unitless number</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">CSS.percent(value)</code>
                <p className="text-xs text-muted-foreground mt-1">Percentage value</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">CSS.px(value)</code>
                <p className="text-xs text-muted-foreground mt-1">Pixel value</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">CSS.em(value)</code>
                <p className="text-xs text-muted-foreground mt-1">Em value</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">CSS.rem(value)</code>
                <p className="text-xs text-muted-foreground mt-1">Rem value</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">CSS.vw(value)</code>
                <p className="text-xs text-muted-foreground mt-1">Viewport width</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">CSS.vh(value)</code>
                <p className="text-xs text-muted-foreground mt-1">Viewport height</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">CSS.deg(value)</code>
                <p className="text-xs text-muted-foreground mt-1">Degree value</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">CSS.rad(value)</code>
                <p className="text-xs text-muted-foreground mt-1">Radian value</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">CSS.turn(value)</code>
                <p className="text-xs text-muted-foreground mt-1">Turn value</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">CSS.s(value)</code>
                <p className="text-xs text-muted-foreground mt-1">Second value</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <code className="text-sm">CSS.ms(value)</code>
                <p className="text-xs text-muted-foreground mt-1">Millisecond value</p>
              </div>
            </div>
            <div className="mt-4 bg-blue-500/10 border border-blue-500 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Math Functions:</p>
              <div className="grid gap-2 md:grid-cols-3 text-xs font-mono">
                <code>CSS.min(...values)</code>
                <code>CSS.max(...values)</code>
                <code>CSS.calc(expression)</code>
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
            <CardDescription>Limited to Chromium-based browsers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium">Supported:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Chrome/Edge 66+ ✓</li>
                  <li>Opera 53+ ✓</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Not Supported:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Firefox ✗</li>
                  <li>Safari ✗</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500 rounded-lg">
              <p className="text-sm">
                <strong>Feature Detection:</strong> Always check for support before using:
              </p>
              <code className="text-sm bg-background px-2 py-1 rounded mt-2 inline-block">
                if (typeof CSS !== 'undefined' && 'number' in CSS) &#123; /* Use Typed OM */ &#125;
              </code>
              <p className="text-sm mt-2">
                Consider providing fallbacks for browsers without support.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Use Cases */}
      <section>
        <h2 id="use-cases" className="text-2xl font-semibold mb-4">
          When to Use CSS Typed OM
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-green-500">
            <CardHeader>
              <CardTitle>✅ Good Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li>Animation and dynamic styling with frequent updates</li>
                <li>Complex mathematical calculations with CSS units</li>
                <li>Performance-critical style manipulation</li>
                <li>Building design tools or visual editors</li>
                <li>Working with transforms programmatically</li>
                <li>Type-safe CSS manipulation in TypeScript</li>
                <li>Reading and modifying computed styles</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-500">
            <CardHeader>
              <CardTitle>❌ Not Ideal For</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li>Projects requiring Firefox/Safari support</li>
                <li>Simple, one-time style changes</li>
                <li>Static styling (use CSS instead)</li>
                <li>Server-side rendering scenarios</li>
                <li>When bundle size is critical concern</li>
                <li>Legacy browser support needed</li>
              </ul>
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
                <h3 className="font-semibold text-sm mb-2">1. Always Feature Detect</h3>
                <p className="text-sm text-muted-foreground">
                  Check for CSS Typed OM support before using and provide fallbacks for unsupported browsers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">2. Use Factory Functions</h3>
                <p className="text-sm text-muted-foreground">
                  Prefer <code className="bg-muted px-1 rounded">CSS.px(100)</code> over <code className="bg-muted px-1 rounded">new CSSUnitValue(100, 'px')</code> for cleaner code.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">3. Leverage Type Safety</h3>
                <p className="text-sm text-muted-foreground">
                  Use TypeScript with Typed OM for compile-time checks and better IDE support.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">4. Cache Computed Styles</h3>
                <p className="text-sm text-muted-foreground">
                  Reading computed styles can trigger reflows. Cache values when possible.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">5. Use for Performance-Critical Code</h3>
                <p className="text-sm text-muted-foreground">
                  Typed OM shines in scenarios with frequent style updates like animations or interactive visualizations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">6. Combine with Other Houdini APIs</h3>
                <p className="text-sm text-muted-foreground">
                  Use alongside CSS Properties and Values API or Paint API for powerful custom styling capabilities.
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
                  href="https://developer.mozilla.org/en-US/docs/Web/API/CSS_Typed_OM_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: CSS Typed Object Model API
                </a>
              </li>
              <li>
                <a
                  href="https://web.dev/css-typed-om/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  web.dev: Working with the CSS Typed Object Model
                </a>
              </li>
              <li>
                <a
                  href="https://drafts.css-houdini.org/css-typed-om/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  W3C Specification: CSS Typed OM Level 1
                </a>
              </li>
              <li>
                <a
                  href="https://caniuse.com/mdn-api_css_number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Can I Use: CSS Typed OM
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
