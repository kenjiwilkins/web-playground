import { CanvasDemo } from '@/components/demos/CanvasDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Canvas() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">
          Canvas API
        </h1>
        <p className="text-muted-foreground">
          Draw graphics, create animations, manipulate images, and build interactive visualizations using JavaScript and the HTML canvas element.
        </p>
      </div>

      {/* Live Demo Section */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demos
        </h2>
        <CanvasDemo />
      </section>

      {/* What is it? */}
      <section>
        <h2 id="what-is-it" className="text-2xl font-semibold mb-4">
          What is the Canvas API?
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Scriptable 2D Graphics</CardTitle>
            <CardDescription>Draw graphics dynamically with JavaScript</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The Canvas API provides a means for drawing graphics via JavaScript and the HTML <code className="bg-muted px-1 rounded">&lt;canvas&gt;</code> element.
              It offers a powerful, immediate-mode 2D rendering context that can be used for animation, game graphics, data visualization,
              photo manipulation, and real-time video processing.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Primary Uses:</p>
              <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                <li><strong>Animation:</strong> Frame-by-frame animation using requestAnimationFrame</li>
                <li><strong>Game Graphics:</strong> Real-time rendering for 2D games</li>
                <li><strong>Data Visualization:</strong> Charts, graphs, and custom visualizations</li>
                <li><strong>Photo Manipulation:</strong> Image filters and effects</li>
                <li><strong>Video Processing:</strong> Real-time video frame manipulation</li>
              </ul>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-green-500/10 border border-green-500/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">✅ Advantages:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Excellent performance for pixel manipulation</li>
                  <li>Full control over rendering</li>
                  <li>Works well for animations and games</li>
                  <li>Wide browser support (since 2015)</li>
                  <li>Can export to images (PNG, JPEG)</li>
                </ul>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">⚠️ Considerations:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Immediate mode - no DOM-like structure</li>
                  <li>Must redraw on every frame</li>
                  <li>Accessibility requires extra work</li>
                  <li>Text rendering less flexible than HTML/CSS</li>
                  <li>No built-in event handling for shapes</li>
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
              <CardTitle>Basic Setup</CardTitle>
              <CardDescription>Creating and accessing a canvas element</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">1. Add canvas element to HTML:</p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`<canvas id="myCanvas" width="500" height="300"></canvas>`}</pre>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">2. Get the 2D rendering context:</p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Check if context is available
if (!ctx) {
  console.error('2D context not supported');
}`}</pre>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">3. Draw something:</p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`// Set fill color
ctx.fillStyle = 'blue';

// Draw a rectangle at (x, y) with width and height
ctx.fillRect(10, 10, 150, 100);`}</pre>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> Canvas dimensions should be set via HTML attributes or JavaScript properties,
                  not CSS. CSS will scale the canvas but won't change its internal resolution.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Concepts */}
      <section>
        <h2 id="core-concepts" className="text-2xl font-semibold mb-4">
          Core Concepts
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>The Rendering Context</CardTitle>
              <CardDescription>CanvasRenderingContext2D interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                The 2D rendering context is where all drawing operations happen. It maintains state (colors, line widths, transforms)
                and provides methods for drawing shapes, text, and images.
              </p>
              <div className="grid gap-2 md:grid-cols-2 text-sm">
                <div className="bg-muted p-3 rounded">
                  <p className="font-medium mb-1">State Properties:</p>
                  <ul className="text-xs space-y-1 list-disc list-inside ml-2">
                    <li><code className="bg-background px-1 rounded">fillStyle</code> - Fill color/pattern</li>
                    <li><code className="bg-background px-1 rounded">strokeStyle</code> - Stroke color/pattern</li>
                    <li><code className="bg-background px-1 rounded">lineWidth</code> - Line thickness</li>
                    <li><code className="bg-background px-1 rounded">font</code> - Text font</li>
                    <li><code className="bg-background px-1 rounded">globalAlpha</code> - Transparency</li>
                  </ul>
                </div>
                <div className="bg-muted p-3 rounded">
                  <p className="font-medium mb-1">Drawing Methods:</p>
                  <ul className="text-xs space-y-1 list-disc list-inside ml-2">
                    <li><code className="bg-background px-1 rounded">fillRect()</code> - Filled rectangle</li>
                    <li><code className="bg-background px-1 rounded">strokeRect()</code> - Stroked rectangle</li>
                    <li><code className="bg-background px-1 rounded">arc()</code> - Circle/arc path</li>
                    <li><code className="bg-background px-1 rounded">fillText()</code> - Filled text</li>
                    <li><code className="bg-background px-1 rounded">drawImage()</code> - Draw image</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coordinate System</CardTitle>
              <CardDescription>Understanding canvas coordinates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Canvas uses a coordinate system where (0, 0) is the top-left corner, X increases to the right,
                and Y increases downward.
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <pre>{`// Origin at top-left
(0, 0) ────────────→ X
  │
  │    (x, y)
  │      ●
  │
  ↓
  Y`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paths</CardTitle>
              <CardDescription>Creating complex shapes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Paths are used to draw complex shapes by defining a series of connected points and curves.
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Begin a new path
ctx.beginPath();

// Move to starting point
ctx.moveTo(50, 50);

// Draw lines
ctx.lineTo(150, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);

// Close the path (back to start)
ctx.closePath();

// Stroke or fill the path
ctx.stroke();  // or ctx.fill();`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Operations */}
      <section>
        <h2 id="common-operations" className="text-2xl font-semibold mb-4">
          Common Operations
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Drawing Shapes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Rectangle:</p>
                <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{`ctx.fillRect(x, y, width, height);        // Filled
ctx.strokeRect(x, y, width, height);      // Outlined
ctx.clearRect(x, y, width, height);       // Clear area`}</pre>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Circle:</p>
                <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{`ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);
ctx.fill();  // or ctx.stroke();`}</pre>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Line:</p>
                <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{`ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Working with Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Drawing Images:</p>
                <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{`const img = new Image();
img.onload = () => {
  // Draw at position
  ctx.drawImage(img, x, y);

  // Draw with size
  ctx.drawImage(img, x, y, width, height);

  // Draw cropped and scaled
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
};
img.src = 'image.jpg';`}</pre>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Pixel Manipulation:</p>
                <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{`// Get pixel data
const imageData = ctx.getImageData(x, y, width, height);
const pixels = imageData.data; // Uint8ClampedArray [r,g,b,a,r,g,b,a,...]

// Modify pixels
for (let i = 0; i < pixels.length; i += 4) {
  pixels[i] = 255 - pixels[i];     // Invert red
  pixels[i+1] = 255 - pixels[i+1]; // Invert green
  pixels[i+2] = 255 - pixels[i+2]; // Invert blue
  // pixels[i+3] is alpha
}

// Put modified pixels back
ctx.putImageData(imageData, x, y);`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Text Rendering</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`// Set font
ctx.font = '24px Arial';

// Set alignment
ctx.textAlign = 'center';      // start, end, left, right, center
ctx.textBaseline = 'middle';   // top, hanging, middle, alphabetic, bottom

// Draw text
ctx.fillText('Hello Canvas', x, y);
ctx.strokeText('Outlined Text', x, y);

// Measure text
const metrics = ctx.measureText('Hello');
console.log(metrics.width);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gradients and Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Linear Gradient:</p>
                <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{`const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.5, 'yellow');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 200, 100);`}</pre>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Radial Gradient:</p>
                <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{`const gradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
gradient.addColorStop(0, 'white');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;`}</pre>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Pattern:</p>
                <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{`const img = new Image();
img.onload = () => {
  const pattern = ctx.createPattern(img, 'repeat'); // repeat, repeat-x, repeat-y, no-repeat
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 300, 300);
};
img.src = 'pattern.png';`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transformations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`// Translate (move origin)
ctx.translate(x, y);

// Rotate (in radians)
ctx.rotate(Math.PI / 4); // 45 degrees

// Scale
ctx.scale(2, 2); // 2x horizontal and vertical

// Save and restore state
ctx.save();    // Save current state
// ... transformations and drawing
ctx.restore(); // Restore to saved state`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Animation */}
      <section>
        <h2 id="animation" className="text-2xl font-semibold mb-4">
          Animation
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Creating Smooth Animations</CardTitle>
            <CardDescription>Using requestAnimationFrame for optimal performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The recommended way to create animations is using <code className="bg-muted px-1 rounded">requestAnimationFrame()</code>,
              which syncs with the browser's refresh rate (typically 60 FPS).
            </p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x = 0;

function animate() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update position
  x += 2;
  if (x > canvas.width) x = 0;

  // Draw
  ctx.fillStyle = 'blue';
  ctx.fillRect(x, 100, 50, 50);

  // Request next frame
  requestAnimationFrame(animate);
}

// Start animation
animate();`}</pre>
            </div>
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500 rounded-lg">
              <p className="text-sm font-medium mb-2">Best Practices:</p>
              <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                <li>Use <code className="bg-background px-1 rounded">requestAnimationFrame()</code> instead of <code className="bg-background px-1 rounded">setInterval()</code></li>
                <li>Clear the canvas at the start of each frame</li>
                <li>Minimize state changes and function calls in the animation loop</li>
                <li>Use <code className="bg-background px-1 rounded">cancelAnimationFrame()</code> to stop animations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Advanced Features */}
      <section>
        <h2 id="advanced-features" className="text-2xl font-semibold mb-4">
          Advanced Features
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Compositing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Control how new shapes are drawn on top of existing content:
              </p>
              <div className="bg-muted p-3 rounded-lg font-mono text-xs">
                <pre>{`ctx.globalCompositeOperation = 'source-over';

// Common modes:
// 'source-over' (default)
// 'destination-over'
// 'multiply'
// 'screen'
// 'overlay'
// 'xor'`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shadows</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Add shadow effects to shapes and text:
              </p>
              <div className="bg-muted p-3 rounded-lg font-mono text-xs">
                <pre>{`ctx.shadowColor = 'rgba(0,0,0,0.5)';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;

ctx.fillRect(50, 50, 100, 100);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clipping</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Restrict drawing to a specific region:
              </p>
              <div className="bg-muted p-3 rounded-lg font-mono text-xs">
                <pre>{`ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.clip();

// Only draws inside the circle
ctx.fillRect(0, 0, 200, 200);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>OffscreenCanvas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Render canvas in a Web Worker:
              </p>
              <div className="bg-muted p-3 rounded-lg font-mono text-xs">
                <pre>{`// Main thread
const offscreen = canvas.transferControlToOffscreen();
worker.postMessage({ canvas: offscreen }, [offscreen]);

// In worker
onmessage = (e) => {
  const ctx = e.data.canvas.getContext('2d');
  // Draw in worker thread
};`}</pre>
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
            <CardDescription>Available since July 2015</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-500/10 border border-green-500 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">✅ Baseline Widely Available</p>
              <p className="text-sm">
                The Canvas API has been available across all major browsers since July 2015.
                This includes Chrome, Firefox, Safari, Edge, and Opera on both desktop and mobile platforms.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Popular Libraries */}
      <section>
        <h2 id="libraries" className="text-2xl font-semibold mb-4">
          Popular Canvas Libraries
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-muted p-3 rounded">
                <p className="font-semibold text-sm mb-1">Fabric.js</p>
                <p className="text-xs text-muted-foreground">Object model and interactive canvas manipulation</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <p className="font-semibold text-sm mb-1">Konva.js</p>
                <p className="text-xs text-muted-foreground">2D canvas framework for desktop and mobile</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <p className="font-semibold text-sm mb-1">p5.js</p>
                <p className="text-xs text-muted-foreground">Creative coding library for artists and designers</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <p className="font-semibold text-sm mb-1">Phaser</p>
                <p className="text-xs text-muted-foreground">Game framework for Canvas and WebGL</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <p className="font-semibold text-sm mb-1">EaselJS</p>
                <p className="text-xs text-muted-foreground">Library for building games and generative art</p>
              </div>
              <div className="bg-muted p-3 rounded">
                <p className="font-semibold text-sm mb-1">Chart.js</p>
                <p className="text-xs text-muted-foreground">Simple yet flexible charting library</p>
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
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: Canvas API
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: Canvas Tutorial
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: CanvasRenderingContext2D Reference
                </a>
              </li>
              <li>
                <a
                  href="https://joshondesign.com/p/books/canvasdeepdive/toc.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Canvas Deep Dive (Free Book)
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: Optimizing Canvas
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
