import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function PaintingAPIDemo() {
  const [isSupported] = useState(
    typeof CSS !== 'undefined' &&
    'paintWorklet' in (CSS as any)
  )
  const [workletsLoaded, setWorkletsLoaded] = useState(false)
  const [patternColor, setPatternColor] = useState('#4f46e5')
  const [patternSpacing, setPatternSpacing] = useState(40)
  const [mousePos, setMousePos] = useState({ x: 100, y: 100 })
  const [trailColor, setTrailColor] = useState('rgba(99, 102, 241, 0.5)')
  const [sketchColor, setSketchColor] = useState('#000000')
  const [sketchRoughness, setSketchRoughness] = useState(3)
  const mouseTrailRef = useRef<HTMLDivElement>(null)
  const sketchRef = useRef<HTMLDivElement>(null)

  // Load worklets
  useEffect(() => {
    if (!isSupported) return

    const loadWorklets = async () => {
      try {
        const paintWorklet = (CSS as any).paintWorklet
        await Promise.all([
          paintWorklet.addModule('/worklets/responsive-pattern.js'),
          paintWorklet.addModule('/worklets/mouse-trail.js'),
          paintWorklet.addModule('/worklets/sketch-border.js')
        ])
        setWorkletsLoaded(true)
      } catch (error) {
        console.error('Failed to load paint worklets:', error)
      }
    }

    loadWorklets()
  }, [isSupported])

  // Handle mouse movement for trail effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseTrailRef.current) return
    const rect = mouseTrailRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }, [])

  const resetMousePos = useCallback(() => {
    if (!mouseTrailRef.current) return
    const rect = mouseTrailRef.current.getBoundingClientRect()
    setMousePos({
      x: rect.width / 2,
      y: rect.height / 2
    })
  }, [])

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the CSS Painting API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The CSS Painting API is currently supported in:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Chrome/Edge 65+</li>
              <li>Opera 52+</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              This is an experimental feature. Please use a Chromium-based browser to see this demo.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!workletsLoaded) {
    return (
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>Loading Paint Worklets...</CardTitle>
          <CardDescription>
            Initializing CSS Painting API demos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Demo 1: Responsive Pattern */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>1. Responsive Geometric Pattern</CardTitle>
          <CardDescription>
            Pattern changes shape based on window aspect ratio - resize to see the effect!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Pattern Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={patternColor}
                  onChange={(e) => setPatternColor(e.target.value)}
                  className="h-10 w-20 cursor-pointer"
                />
                <input
                  type="text"
                  value={patternColor}
                  onChange={(e) => setPatternColor(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md bg-background text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Spacing: {patternSpacing}px
              </label>
              <input
                type="range"
                min="20"
                max="80"
                value={patternSpacing}
                onChange={(e) => setPatternSpacing(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div
            className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-muted"
            style={
              {
                background: `paint(responsive-pattern)`,
                '--pattern-color': patternColor,
                '--pattern-spacing': `${patternSpacing}px`
              } as React.CSSProperties
            }
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-sm font-medium">Resize the window to see different shapes!</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Wide aspect ratio → Horizontal lines</p>
            <p>• Tall aspect ratio → Vertical lines</p>
            <p>• Square aspect ratio → Circles</p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 2: Mouse Trail */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>2. Mouse Follow Effect (No Main Thread Blocking)</CardTitle>
          <CardDescription>
            Move your mouse over the area - painting happens in a worklet thread!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Trail Color
            </label>
            <div className="flex gap-2">
              <select
                value={trailColor}
                onChange={(e) => setTrailColor(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md bg-background text-sm"
              >
                <option value="rgba(99, 102, 241, 0.5)">Blue</option>
                <option value="rgba(239, 68, 68, 0.5)">Red</option>
                <option value="rgba(34, 197, 94, 0.5)">Green</option>
                <option value="rgba(251, 146, 60, 0.5)">Orange</option>
                <option value="rgba(168, 85, 247, 0.5)">Purple</option>
              </select>
              <Button onClick={resetMousePos} variant="outline" size="sm">
                Reset Position
              </Button>
            </div>
          </div>

          <div
            ref={mouseTrailRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetMousePos}
            className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-muted cursor-crosshair bg-gray-900"
            style={
              {
                background: `paint(mouse-trail)`,
                backgroundColor: '#1a1a2e',
                '--mouse-x': `${mousePos.x}px`,
                '--mouse-y': `${mousePos.y}px`,
                '--trail-color': trailColor
              } as React.CSSProperties
            }
          >
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded text-xs">
              Mouse: ({Math.round(mousePos.x)}, {Math.round(mousePos.y)})
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>✨ This effect runs in a paint worklet, keeping the main thread free for smooth interaction</p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 3: Sketch Border */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>3. Hand-Drawn Sketch Effect</CardTitle>
          <CardDescription>
            Excalidraw-style sketchy borders with adjustable roughness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Sketch Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={sketchColor}
                  onChange={(e) => setSketchColor(e.target.value)}
                  className="h-10 w-20 cursor-pointer"
                />
                <input
                  type="text"
                  value={sketchColor}
                  onChange={(e) => setSketchColor(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md bg-background text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Roughness: {sketchRoughness}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={sketchRoughness}
                onChange={(e) => setSketchRoughness(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div
              ref={sketchRef}
              className="relative w-full h-48 rounded-lg overflow-hidden"
              style={
                {
                  background: `paint(sketch-border)`,
                  '--sketch-color': sketchColor,
                  '--sketch-roughness': `${sketchRoughness}px`
                } as React.CSSProperties
              }
            >
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <p className="text-center font-medium">
                  Hand-drawn box with sketchy borders
                </p>
              </div>
            </div>

            <div
              className="relative w-full h-48 rounded-lg overflow-hidden"
              style={
                {
                  background: `paint(sketch-border)`,
                  '--sketch-color': sketchColor,
                  '--sketch-roughness': `${sketchRoughness * 1.5}px`
                } as React.CSSProperties
              }
            >
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="space-y-2 text-center">
                  <p className="font-bold">Note Card</p>
                  <p className="text-sm text-muted-foreground">
                    Perfect for whiteboard-style UIs
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Multiple drawing passes create authentic hand-drawn look</p>
            <p>• Adjust roughness for more or less wobbly lines</p>
            <p>• Great for collaborative whiteboard apps like Excalidraw</p>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="border-yellow-500">
        <CardHeader>
          <CardTitle>How These Demos Work</CardTitle>
          <CardDescription>Understanding the CSS Painting API implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="font-semibold mb-2">1. Register Paint Worklet</p>
            <div className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto">
              registerPaint('my-pattern', class &#123;<br />
              {'  '}paint(ctx, size, props) &#123;<br />
              {'    '}// Draw using Canvas 2D API<br />
              {'  '}&#125;<br />
              &#125;);
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">2. Load the Worklet</p>
            <div className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto">
              CSS.paintWorklet.addModule('/worklets/my-pattern.js');
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">3. Use in CSS with paint()</p>
            <div className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto">
              .element &#123;<br />
              {'  '}background: paint(my-pattern);<br />
              {'  '}--custom-prop: value;<br />
              &#125;
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">4. Access CSS Properties in Worklet</p>
            <div className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto">
              static get inputProperties() &#123;<br />
              {'  '}return ['--custom-prop'];<br />
              &#125;
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
