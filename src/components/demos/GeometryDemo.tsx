import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
}

export function GeometryDemo() {
  const [isSupported] = useState(() => {
    return typeof DOMPoint !== 'undefined' &&
           typeof DOMRect !== 'undefined' &&
           typeof DOMMatrix !== 'undefined'
  })

  const [logs, setLogs] = useState<LogEntry[]>([])
  const [boundingRect, setBoundingRect] = useState<DOMRect | null>(null)
  const [transformedPoint, setTransformedPoint] = useState<DOMPoint | null>(null)
  const [matrixTransform, setMatrixTransform] = useState({
    translateX: 0,
    translateY: 0,
    scale: 1,
    rotate: 0
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const targetElementRef = useRef<HTMLDivElement>(null)

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }, ...prev].slice(0, 15))
  }, [])

  // DOMPoint demo
  const createDOMPoint = () => {
    const point = new DOMPoint(100, 150, 0, 1)
    addLog(`Created DOMPoint: x=${point.x}, y=${point.y}, z=${point.z}, w=${point.w}`, 'success')

    // Transform the point using current matrix
    const matrix = new DOMMatrix()
      .translate(matrixTransform.translateX, matrixTransform.translateY)
      .scale(matrixTransform.scale)
      .rotate(matrixTransform.rotate)

    const transformed = matrix.transformPoint(point)
    setTransformedPoint(transformed)
    addLog(`Transformed point: x=${transformed.x.toFixed(2)}, y=${transformed.y.toFixed(2)}`, 'info')
  }

  // DOMRect demo
  const getBoundingBox = () => {
    if (!targetElementRef.current) {
      addLog('Target element not found', 'error')
      return
    }

    const rect = targetElementRef.current.getBoundingClientRect()
    setBoundingRect(rect)

    addLog(`Got bounding rect: x=${rect.x.toFixed(2)}, y=${rect.y.toFixed(2)}, width=${rect.width.toFixed(2)}, height=${rect.height.toFixed(2)}`, 'success')
    addLog(`Top: ${rect.top.toFixed(2)}, Right: ${rect.right.toFixed(2)}, Bottom: ${rect.bottom.toFixed(2)}, Left: ${rect.left.toFixed(2)}`, 'info')
  }

  // DOMMatrix demo with canvas
  const drawTransformedShape = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw center axes
    ctx.strokeStyle = '#ccc'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2, canvas.height)
    ctx.moveTo(0, canvas.height / 2)
    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.stroke()

    // Save context
    ctx.save()

    // Move origin to center
    ctx.translate(canvas.width / 2, canvas.height / 2)

    // Apply transformations using DOMMatrix
    const matrix = new DOMMatrix()
      .translate(matrixTransform.translateX, matrixTransform.translateY)
      .scale(matrixTransform.scale)
      .rotate(matrixTransform.rotate)

    ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e + canvas.width / 2, matrix.f + canvas.height / 2)

    // Draw original rectangle
    ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 2
    ctx.fillRect(-40, -40, 80, 80)
    ctx.strokeRect(-40, -40, 80, 80)

    // Draw center point
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.arc(0, 0, 5, 0, Math.PI * 2)
    ctx.fill()

    // Restore context
    ctx.restore()

    // Draw transformed point if exists
    if (transformedPoint) {
      ctx.fillStyle = '#10b981'
      ctx.beginPath()
      ctx.arc(
        canvas.width / 2 + transformedPoint.x,
        canvas.height / 2 + transformedPoint.y,
        8,
        0,
        Math.PI * 2
      )
      ctx.fill()

      // Label
      ctx.fillStyle = '#000'
      ctx.font = '12px monospace'
      ctx.fillText(
        `(${transformedPoint.x.toFixed(0)}, ${transformedPoint.y.toFixed(0)})`,
        canvas.width / 2 + transformedPoint.x + 10,
        canvas.height / 2 + transformedPoint.y - 10
      )
    }
  }, [matrixTransform, transformedPoint])

  // Redraw canvas when transform changes
  useEffect(() => {
    drawTransformedShape()
  }, [drawTransformedShape])

  const resetTransforms = () => {
    setMatrixTransform({
      translateX: 0,
      translateY: 0,
      scale: 1,
      rotate: 0
    })
    setTransformedPoint(null)
    addLog('Reset all transformations', 'info')
  }

  const createDOMQuad = () => {
    const p1 = new DOMPoint(0, 0)
    const p2 = new DOMPoint(100, 0)
    const p3 = new DOMPoint(100, 100)
    const p4 = new DOMPoint(0, 100)

    const quad = new DOMQuad(p1, p2, p3, p4)

    addLog(`Created DOMQuad with 4 corners:`, 'success')
    addLog(`  p1: (${quad.p1.x}, ${quad.p1.y})`, 'info')
    addLog(`  p2: (${quad.p2.x}, ${quad.p2.y})`, 'info')
    addLog(`  p3: (${quad.p3.x}, ${quad.p3.y})`, 'info')
    addLog(`  p4: (${quad.p4.x}, ${quad.p4.y})`, 'info')

    const bounds = quad.getBounds()
    addLog(`Quad bounds: x=${bounds.x}, y=${bounds.y}, width=${bounds.width}, height=${bounds.height}`, 'info')
  }

  const demonstrateMatrixOperations = () => {
    addLog('--- Matrix Operations Demo ---', 'info')

    const m1 = new DOMMatrix()
    addLog('Identity matrix created', 'success')

    const m2 = m1.translate(50, 100)
    addLog(`Translate(50, 100): e=${m2.e}, f=${m2.f}`, 'info')

    const m3 = m2.scale(2)
    addLog(`Scale(2): a=${m3.a}, d=${m3.d}`, 'info')

    const m4 = m3.rotate(45)
    addLog(`Rotate(45°): a=${m4.a.toFixed(3)}, b=${m4.b.toFixed(3)}`, 'info')

    const inverted = m4.inverse()
    addLog('Matrix inverted successfully', 'success')

    const identity = m4.multiply(inverted)
    addLog(`Multiply with inverse (should be identity): a=${identity.a.toFixed(3)}`, 'info')
  }

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the Geometry interfaces
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The Geometry interfaces (DOMPoint, DOMRect, DOMMatrix) are supported in all modern browsers.
            </p>
            <p className="text-sm text-muted-foreground">
              Please update your browser to use this demo.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* DOMMatrix Transformation Canvas */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>DOMMatrix Transformations</CardTitle>
          <CardDescription>
            Interactive 2D transformation using DOMMatrix
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="border rounded-lg w-full bg-white"
            style={{ maxWidth: '400px', height: 'auto', aspectRatio: '1/1' }}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Translate X: {matrixTransform.translateX}px
              </label>
              <input
                type="range"
                min="-100"
                max="100"
                value={matrixTransform.translateX}
                onChange={(e) => setMatrixTransform(prev => ({
                  ...prev,
                  translateX: Number(e.target.value)
                }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Translate Y: {matrixTransform.translateY}px
              </label>
              <input
                type="range"
                min="-100"
                max="100"
                value={matrixTransform.translateY}
                onChange={(e) => setMatrixTransform(prev => ({
                  ...prev,
                  translateY: Number(e.target.value)
                }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Scale: {matrixTransform.scale.toFixed(2)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={matrixTransform.scale}
                onChange={(e) => setMatrixTransform(prev => ({
                  ...prev,
                  scale: Number(e.target.value)
                }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Rotate: {matrixTransform.rotate}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={matrixTransform.rotate}
                onChange={(e) => setMatrixTransform(prev => ({
                  ...prev,
                  rotate: Number(e.target.value)
                }))}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={resetTransforms} variant="outline" className="flex-1">
              Reset Transforms
            </Button>
            <Button onClick={createDOMPoint} className="flex-1">
              Transform Point
            </Button>
          </div>

          <div className="bg-muted p-3 rounded text-sm space-y-1">
            <div>Blue square: Transformed shape</div>
            <div>Red dot: Center point (0, 0)</div>
            <div>Green dot: Transformed point (100, 150)</div>
          </div>
        </CardContent>
      </Card>

      {/* DOMPoint Demo */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>DOMPoint</CardTitle>
          <CardDescription>
            Create and transform points in 2D/3D space
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <div className="mb-2 text-muted-foreground">// Creating a DOMPoint</div>
            <pre className="whitespace-pre-wrap">{`const point = new DOMPoint(100, 150, 0, 1);
console.log(point.x, point.y, point.z, point.w);

// Transform using matrix
const matrix = new DOMMatrix().rotate(45);
const transformed = matrix.transformPoint(point);`}</pre>
          </div>

          <Button onClick={createDOMPoint} className="w-full">
            Create & Transform Point
          </Button>

          {transformedPoint && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <h3 className="font-semibold mb-3">Transformed Point Result:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                <div>x: {transformedPoint.x.toFixed(2)}</div>
                <div>y: {transformedPoint.y.toFixed(2)}</div>
                <div>z: {transformedPoint.z.toFixed(2)}</div>
                <div>w: {transformedPoint.w.toFixed(2)}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* DOMRect Demo */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>DOMRect</CardTitle>
          <CardDescription>
            Get bounding boxes and rectangle dimensions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            ref={targetElementRef}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 text-white text-center"
          >
            <div className="text-lg font-semibold mb-2">Target Element</div>
            <div className="text-sm opacity-80">Click button to get bounding rect</div>
          </div>

          <Button onClick={getBoundingBox} className="w-full">
            Get Bounding Rectangle
          </Button>

          {boundingRect && (
            <div className="border rounded-lg p-4 bg-muted/50 space-y-3">
              <h3 className="font-semibold">Bounding Rectangle:</h3>
              <div className="grid grid-cols-2 gap-3 text-sm font-mono">
                <div>
                  <div className="text-muted-foreground">x (left)</div>
                  <div className="font-semibold">{boundingRect.x.toFixed(2)}px</div>
                </div>
                <div>
                  <div className="text-muted-foreground">y (top)</div>
                  <div className="font-semibold">{boundingRect.y.toFixed(2)}px</div>
                </div>
                <div>
                  <div className="text-muted-foreground">width</div>
                  <div className="font-semibold">{boundingRect.width.toFixed(2)}px</div>
                </div>
                <div>
                  <div className="text-muted-foreground">height</div>
                  <div className="font-semibold">{boundingRect.height.toFixed(2)}px</div>
                </div>
                <div>
                  <div className="text-muted-foreground">right</div>
                  <div className="font-semibold">{boundingRect.right.toFixed(2)}px</div>
                </div>
                <div>
                  <div className="text-muted-foreground">bottom</div>
                  <div className="font-semibold">{boundingRect.bottom.toFixed(2)}px</div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground mt-2">
                Note: Values are relative to the viewport
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* DOMQuad Demo */}
      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>DOMQuad</CardTitle>
          <CardDescription>
            Define quadrilaterals with four corner points
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <div className="mb-2 text-muted-foreground">// Creating a DOMQuad</div>
            <pre className="whitespace-pre-wrap">{`const p1 = new DOMPoint(0, 0);
const p2 = new DOMPoint(100, 0);
const p3 = new DOMPoint(100, 100);
const p4 = new DOMPoint(0, 100);

const quad = new DOMQuad(p1, p2, p3, p4);
const bounds = quad.getBounds();`}</pre>
          </div>

          <Button onClick={createDOMQuad} className="w-full">
            Create DOMQuad
          </Button>
        </CardContent>
      </Card>

      {/* Matrix Operations Demo */}
      <Card className="border-cyan-500">
        <CardHeader>
          <CardTitle>Matrix Operations</CardTitle>
          <CardDescription>
            Chaining transformations and matrix math
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <div className="mb-2 text-muted-foreground">// Matrix operations</div>
            <pre className="whitespace-pre-wrap">{`const matrix = new DOMMatrix()
  .translate(50, 100)
  .scale(2)
  .rotate(45);

// Matrix properties (a, b, c, d, e, f)
console.log(matrix.a, matrix.b);

// Invert matrix
const inverted = matrix.inverse();

// Multiply matrices
const result = matrix.multiply(inverted);`}</pre>
          </div>

          <Button onClick={demonstrateMatrixOperations} className="w-full">
            Run Matrix Operations
          </Button>

          <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30 text-sm">
            <strong>Matrix Structure:</strong> DOMMatrix uses a 4x4 matrix for 3D transforms,
            or a 3x2 matrix for 2D (properties: a, b, c, d, e, f)
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="border-gray-500">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Real-time geometry operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto bg-muted p-4 rounded-lg font-mono text-xs">
            {logs.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No activity yet. Try the demos above.
              </p>
            )}
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  log.type === 'error' ? 'text-red-500' :
                  log.type === 'warning' ? 'text-orange-500' :
                  log.type === 'success' ? 'text-green-500' :
                  'text-foreground'
                }`}
              >
                <span className="text-muted-foreground">[{log.timestamp}]</span>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
