import { GeometryDemo } from '@/components/demos/GeometryDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Geometry() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="geometry-interfaces" className="text-3xl font-bold tracking-tight">
          Geometry Interfaces
        </h1>
        <p className="text-muted-foreground">
          Standardized APIs for working with 2D and 3D points, rectangles, transformations, and
          matrices. Used throughout the web platform for graphics, layout, and spatial calculations.
        </p>
      </div>

      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <GeometryDemo />
      </section>

      <section>
        <h2 id="overview" className="text-2xl font-semibold mb-4">
          Overview
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What are Geometry Interfaces?</CardTitle>
            <CardDescription>
              Foundational types for spatial operations across Web APIs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The Geometry Interfaces provide standardized JavaScript objects for representing and
              manipulating geometric primitives like points, rectangles, and transformation matrices.
              These interfaces are used behind the scenes in CSS Transforms, Canvas API, WebXR, and
              many other web platform features.
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold">Core Interfaces:</h3>
              <ul className="space-y-1 text-sm list-disc list-inside">
                <li><strong>DOMPoint / DOMPointReadOnly</strong> - 2D or 3D points with x, y, z, w coordinates</li>
                <li><strong>DOMRect / DOMRectReadOnly</strong> - Rectangles with position and dimensions</li>
                <li><strong>DOMMatrix / DOMMatrixReadOnly</strong> - 2D and 3D transformation matrices</li>
                <li><strong>DOMQuad</strong> - Quadrilaterals defined by four corner points</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30 text-sm">
              <strong>Mutable vs Immutable:</strong> Each geometry type has both a mutable version
              (DOMPoint, DOMRect, DOMMatrix) and an immutable read-only version (DOMPointReadOnly, etc.).
              Immutable versions are typically returned by browser APIs.
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="dompoint" className="text-2xl font-semibold mb-4">
          DOMPoint / DOMPointReadOnly
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Creating Points</CardTitle>
              <CardDescription>Define points in 2D or 3D space</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded font-mono text-sm mb-3">
                <pre className="whitespace-pre-wrap">{`// 2D point
const point2D = new DOMPoint(100, 200);

// 3D point with perspective
const point3D = new DOMPoint(100, 200, 50, 1);

// From object
const point = DOMPoint.fromPoint({
  x: 100,
  y: 200,
  z: 0,
  w: 1
});`}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                Points have four coordinates: x, y, z (depth), and w (perspective). For 2D operations,
                z is typically 0 and w is 1.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Point Properties</CardTitle>
              <CardDescription>Accessing coordinate values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded font-mono text-sm mb-3">
                <pre className="whitespace-pre-wrap">{`const point = new DOMPoint(100, 200, 50, 1);

console.log(point.x);  // 100
console.log(point.y);  // 200
console.log(point.z);  // 50 (depth)
console.log(point.w);  // 1 (perspective)

// Mutable (DOMPoint only)
point.x = 150;
point.y = 250;`}</pre>
              </div>
              <div className="space-y-2 text-sm">
                <div><strong>x:</strong> Horizontal coordinate</div>
                <div><strong>y:</strong> Vertical coordinate</div>
                <div><strong>z:</strong> Depth (3D transforms)</div>
                <div><strong>w:</strong> Perspective value</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="domrect" className="text-2xl font-semibold mb-4">
          DOMRect / DOMRectReadOnly
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Rectangle Geometry</CardTitle>
              <CardDescription>Position and dimensions of rectangular areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`// Create rectangle
const rect = new DOMRect(10, 20, 100, 50);
// x=10, y=20, width=100, height=50

// Get element's bounding box
const element = document.getElementById('box');
const bbox = element.getBoundingClientRect();

console.log(bbox.x, bbox.y);           // Position
console.log(bbox.width, bbox.height);  // Size
console.log(bbox.top, bbox.right,      // Edges
            bbox.bottom, bbox.left);`}</pre>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Position & Size:</h3>
                  <ul className="space-y-1 list-disc list-inside text-xs">
                    <li><code className="bg-muted px-1">x</code> - Left edge position</li>
                    <li><code className="bg-muted px-1">y</code> - Top edge position</li>
                    <li><code className="bg-muted px-1">width</code> - Rectangle width</li>
                    <li><code className="bg-muted px-1">height</code> - Rectangle height</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Computed Edges:</h3>
                  <ul className="space-y-1 list-disc list-inside text-xs">
                    <li><code className="bg-muted px-1">top</code> - Same as y</li>
                    <li><code className="bg-muted px-1">right</code> - x + width</li>
                    <li><code className="bg-muted px-1">bottom</code> - y + height</li>
                    <li><code className="bg-muted px-1">left</code> - Same as x</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
                <strong>Note:</strong> getBoundingClientRect() returns coordinates relative to the
                viewport, not the document. Scroll position affects the values.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="dommatrix" className="text-2xl font-semibold mb-4">
          DOMMatrix / DOMMatrixReadOnly
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Transformation Matrices</CardTitle>
              <CardDescription>2D and 3D transformations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                DOMMatrix represents transformation matrices used in CSS transforms, Canvas operations,
                and WebXR. Supports translate, scale, rotate, skew, and matrix multiplication.
              </p>

              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`// Create identity matrix
const matrix = new DOMMatrix();

// Chain transformations
const transformed = matrix
  .translate(50, 100)    // Move 50px right, 100px down
  .scale(2)              // Double size
  .rotate(45);           // Rotate 45 degrees

// Transform a point
const point = new DOMPoint(100, 100);
const newPoint = transformed.transformPoint(point);

// Get matrix values (a, b, c, d, e, f for 2D)
console.log(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);`}</pre>
              </div>

              <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30 text-sm">
                <strong>Matrix Format:</strong> 2D transforms use a 3x2 matrix (a, b, c, d, e, f).
                3D transforms use a full 4x4 matrix (m11-m44).
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transformation Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <div className="bg-muted p-3 rounded">
                  <div className="font-mono text-sm font-semibold mb-1">translate(x, y [, z])</div>
                  <div className="text-xs text-muted-foreground">Move by offset amounts</div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <div className="font-mono text-sm font-semibold mb-1">scale(x [, y, z])</div>
                  <div className="text-xs text-muted-foreground">Scale by factors (uniform if single value)</div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <div className="font-mono text-sm font-semibold mb-1">rotate(angle [, x, y, z])</div>
                  <div className="text-xs text-muted-foreground">Rotate by degrees (around axis for 3D)</div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <div className="font-mono text-sm font-semibold mb-1">skewX(angle) / skewY(angle)</div>
                  <div className="text-xs text-muted-foreground">Shear/slant transformation</div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <div className="font-mono text-sm font-semibold mb-1">multiply(other)</div>
                  <div className="text-xs text-muted-foreground">Combine with another matrix</div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <div className="font-mono text-sm font-semibold mb-1">inverse()</div>
                  <div className="text-xs text-muted-foreground">Get inverse transformation (undo)</div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <div className="font-mono text-sm font-semibold mb-1">transformPoint(point)</div>
                  <div className="text-xs text-muted-foreground">Apply transformation to a point</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="domquad" className="text-2xl font-semibold mb-4">
          DOMQuad
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Quadrilateral Shapes</CardTitle>
            <CardDescription>Four-cornered polygons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              DOMQuad represents a quadrilateral defined by four DOMPoint objects, one for each corner.
              Useful for representing transformed rectangles or arbitrary four-sided shapes.
            </p>

            <div className="bg-muted p-3 rounded font-mono text-sm">
              <pre className="whitespace-pre-wrap">{`// Define four corners
const p1 = new DOMPoint(0, 0);
const p2 = new DOMPoint(100, 0);
const p3 = new DOMPoint(100, 100);
const p4 = new DOMPoint(0, 100);

// Create quad
const quad = new DOMQuad(p1, p2, p3, p4);

// Access corners
console.log(quad.p1, quad.p2, quad.p3, quad.p4);

// Get bounding rectangle
const bounds = quad.getBounds();
console.log(bounds.x, bounds.y, bounds.width, bounds.height);`}</pre>
            </div>

            <div className="space-y-2 text-sm">
              <div><strong>p1:</strong> First corner (typically top-left)</div>
              <div><strong>p2:</strong> Second corner (typically top-right)</div>
              <div><strong>p3:</strong> Third corner (typically bottom-right)</div>
              <div><strong>p4:</strong> Fourth corner (typically bottom-left)</div>
            </div>

            <div className="bg-green-500/10 p-3 rounded border border-green-500/30 text-sm">
              <strong>Use Case:</strong> DOMQuad is particularly useful for representing the result
              of applying perspective transforms to rectangles, where the shape may no longer be
              axis-aligned.
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="matrix-operations" className="text-2xl font-semibold mb-4">
          Advanced Matrix Operations
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Chaining Transformations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Matrix methods return new matrices, allowing you to chain operations. The order
                matters: transformations are applied right-to-left in the chain.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`// These produce different results:
const m1 = new DOMMatrix()
  .translate(100, 0)
  .rotate(45);

const m2 = new DOMMatrix()
  .rotate(45)
  .translate(100, 0);

// m1: Rotate around origin, then move
// m2: Move, then rotate around new position`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Matrix Multiplication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Combine multiple transformation matrices using multiply(). This is how transformations
                are composed in graphics systems.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`const translate = new DOMMatrix().translate(50, 50);
const rotate = new DOMMatrix().rotate(45);
const scale = new DOMMatrix().scale(2);

// Combine transformations
const combined = translate
  .multiply(rotate)
  .multiply(scale);

// Apply to point
const point = new DOMPoint(100, 100);
const result = combined.transformPoint(point);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inverse Transformations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                The inverse() method returns a matrix that "undoes" the transformation. Multiplying
                a matrix by its inverse produces the identity matrix.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`const transform = new DOMMatrix()
  .translate(100, 50)
  .rotate(45)
  .scale(2);

// Get inverse (undo transformation)
const inverse = transform.inverse();

// Applying both should give original point
const point = new DOMPoint(100, 100);
const transformed = transform.transformPoint(point);
const restored = inverse.transformPoint(transformed);

// restored ≈ point (within floating point precision)`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="use-cases" className="text-2xl font-semibold mb-4">
          Common Use Cases
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Canvas Transformations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Apply complex transformations to canvas graphics using DOMMatrix with the canvas
                context's setTransform() method.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const matrix = new DOMMatrix()
  .translate(200, 200)
  .rotate(45)
  .scale(1.5);

ctx.setTransform(matrix);
ctx.fillRect(-50, -50, 100, 100);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Element Positioning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Use getBoundingClientRect() to get precise element positions for tooltips, overlays,
                or drag-and-drop operations.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`const target = document.getElementById('target');
const rect = target.getBoundingClientRect();

const tooltip = document.getElementById('tooltip');
tooltip.style.left = rect.right + 10 + 'px';
tooltip.style.top = rect.top + 'px';`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CSS Transform Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Create CSS transform strings from DOMMatrix objects, or parse existing transforms
                into matrix form for manipulation.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`const matrix = new DOMMatrix()
  .translate(100, 50)
  .rotate(45);

// Convert to CSS transform
element.style.transform = matrix.toString();

// Parse CSS transform
const style = getComputedStyle(element);
const parsed = new DOMMatrix(style.transform);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collision Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Check if points or rectangles intersect using DOMRect and DOMPoint for game
                development or interactive UI.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`function intersects(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

const box1 = elem1.getBoundingClientRect();
const box2 = elem2.getBoundingClientRect();
if (intersects(box1, box2)) {
  console.log('Collision detected!');
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coordinate Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Transform points between different coordinate systems (screen, element, canvas)
                using matrix transformations.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`// Convert mouse coords to canvas coords
const rect = canvas.getBoundingClientRect();
const canvasPoint = new DOMPoint(
  event.clientX - rect.left,
  event.clientY - rect.top
);

// Account for canvas transform
const ctx = canvas.getContext('2d');
const matrix = ctx.getTransform().inverse();
const localPoint = matrix.transformPoint(canvasPoint);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3D Perspective Transforms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Apply 3D transformations including perspective for realistic depth effects in
                web graphics and WebXR applications.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`const matrix = new DOMMatrix()
  .translate(0, 0, -500)
  .rotateAxisAngle(1, 1, 0, 45);

const point3D = new DOMPoint(100, 100, 0, 1);
const transformed = matrix.transformPoint(point3D);

// Apply perspective division
const projected = new DOMPoint(
  transformed.x / transformed.w,
  transformed.y / transformed.w,
  transformed.z / transformed.w
);`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="browser-support" className="text-2xl font-semibold mb-4">
          Browser Support
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Compatibility</CardTitle>
            <CardDescription>Geometry interfaces support across browsers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-sm mb-2">DOMPoint / DOMRect</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Chrome 61+ ✅</li>
                  <li>Edge 79+ ✅</li>
                  <li>Firefox 62+ ✅</li>
                  <li>Safari 10.1+ ✅</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">DOMMatrix</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Chrome 61+ ✅</li>
                  <li>Edge 79+ ✅</li>
                  <li>Firefox 62+ ✅</li>
                  <li>Safari 11+ ✅</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 p-3 rounded border border-green-500/30 text-sm">
              <strong>Good Support:</strong> Geometry interfaces are well-supported in all modern
              browsers. Many APIs like getBoundingClientRect() have even broader support.
            </div>

            <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30 text-sm">
              <strong>Note:</strong> While the constructors are relatively new, many browsers have
              supported the read-only versions (returned by browser APIs) for much longer.
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="best-practices" className="text-2xl font-semibold mb-4">
          Best Practices
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Use Read-Only Versions When Possible</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Prefer DOMPointReadOnly, DOMRectReadOnly, and DOMMatrixReadOnly when you don't need
                to modify the values. This prevents accidental mutations and may improve performance.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`// Good: Using read-only for return values
function getCenter(rect: DOMRectReadOnly): DOMPointReadOnly {
  return new DOMPointReadOnly(
    rect.x + rect.width / 2,
    rect.y + rect.height / 2
  );
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cache getBoundingClientRect() Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                getBoundingClientRect() triggers layout calculations. Cache the result if you need
                to access it multiple times in a single frame.
              </p>
              <div className="bg-green-500/10 p-3 rounded border border-green-500/30 text-sm">
                <strong>✅ Good:</strong>
                <div className="bg-muted p-2 rounded font-mono text-xs mt-2">
                  <pre className="whitespace-pre-wrap">{`const rect = element.getBoundingClientRect();
const x = rect.x;
const y = rect.y;`}</pre>
                </div>
              </div>
              <div className="bg-red-500/10 p-3 rounded border border-red-500/30 text-sm">
                <strong>❌ Bad:</strong>
                <div className="bg-muted p-2 rounded font-mono text-xs mt-2">
                  <pre className="whitespace-pre-wrap">{`const x = element.getBoundingClientRect().x;
const y = element.getBoundingClientRect().y;`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Be Aware of Coordinate Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Remember that getBoundingClientRect() returns viewport coordinates, not document
                coordinates. Add scroll offsets if you need document-relative positions.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`const rect = element.getBoundingClientRect();

// Viewport coordinates
const viewportX = rect.x;
const viewportY = rect.y;

// Document coordinates
const documentX = rect.x + window.scrollX;
const documentY = rect.y + window.scrollY;`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Understand Matrix Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Matrix transformations are applied in the order they're chained, but the visual
                result depends on this order. Rotate-then-translate differs from translate-then-rotate.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`// Different results:
const m1 = new DOMMatrix().translate(100, 0).rotate(45);
const m2 = new DOMMatrix().rotate(45).translate(100, 0);

// m1: Rotates around origin, moves along axis
// m2: Moves, then rotates around new position`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="resources" className="text-2xl font-semibold mb-4">
          Additional Resources
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Learn More</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Geometry_interfaces"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN: Geometry Interfaces Overview
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN: DOMMatrix Reference
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/DOMRect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN: DOMRect Reference
                </a>
              </li>
              <li>
                <a
                  href="https://drafts.fxtf.org/geometry/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  W3C Geometry Interfaces Module Specification
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
