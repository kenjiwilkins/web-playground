import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function TypedOMDemo() {
  const [isSupported] = useState(
    typeof CSS !== 'undefined' &&
    'number' in CSS &&
    typeof CSS.px === 'function'
  )

  // Demo 1: Resizable Panel Comparison
  const [panelWidth, setPanelWidth] = useState(50)
  const stringBoxRef = useRef<HTMLDivElement>(null)
  const typedBoxRef = useRef<HTMLDivElement>(null)
  const [stringTime, setStringTime] = useState(0)
  const [typedTime, setTypedTime] = useState(0)

  // Demo 2: Numeric Operations
  const [baseValue, setBaseValue] = useState(100)
  const [operation, setOperation] = useState('add')
  const [operand, setOperand] = useState(50)
  const [resultValue, setResultValue] = useState<string>('')

  // Demo 3: Transform Manipulation
  const [rotateAngle, setRotateAngle] = useState(0)
  const [scaleValue, setScaleValue] = useState(1)
  const [translateX, setTranslateX] = useState(0)
  const transformBoxRef = useRef<HTMLDivElement>(null)

  // Update panel width with both methods
  const updatePanelWidth = useCallback((width: number) => {
    setPanelWidth(width)

    // Traditional string-based approach
    if (stringBoxRef.current) {
      const start = performance.now()
      stringBoxRef.current.style.width = width + '%'
      stringBoxRef.current.style.backgroundColor = 'rgb(' + Math.floor(width * 2.55) + ', 100, ' + (255 - Math.floor(width * 2.55)) + ')'
      const end = performance.now()
      setStringTime(end - start)
    }

    // Typed OM approach
    if (typedBoxRef.current && isSupported) {
      const start = performance.now()
      const typedOM = typedBoxRef.current.attributeStyleMap
      typedOM.set('width', CSS.percent(width))

      // For background-color, we'll use the string directly as Typed OM doesn't have native RGB support
      const r = Math.floor(width * 2.55)
      const g = 100
      const b = 255 - Math.floor(width * 2.55)
      typedBoxRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
      const end = performance.now()
      setTypedTime(end - start)
    }
  }, [isSupported])

  // Perform numeric operation
  const performOperation = useCallback(() => {
    if (!isSupported) return

    try {
      const base = CSS.px(baseValue)
      const op = CSS.px(operand)

      let result
      switch (operation) {
        case 'add':
          result = base.add(op)
          break
        case 'sub':
          result = base.sub(op)
          break
        case 'mul':
          result = base.mul(operand)
          break
        case 'div':
          result = base.div(operand)
          break
        case 'min':
          result = CSS.px(baseValue).min(base, op)
          break
        case 'max':
          result = CSS.px(baseValue).max(base, op)
          break
        default:
          result = base
      }

      setResultValue(result.toString())
    } catch (error) {
      setResultValue('Error: ' + (error as Error).message)
    }
  }, [baseValue, operation, operand, isSupported])

  // Update transform using Typed OM
  useEffect(() => {
    if (!transformBoxRef.current || !isSupported) return

    try {
      const transforms = new (CSSTransformValue)([
        new CSSRotate(CSS.deg(rotateAngle)),
        new CSSScale(CSS.number(scaleValue), CSS.number(scaleValue)),
        new CSSTranslate(CSS.px(translateX), CSS.px(0))
      ])
      const t = new CSSRotate(CSS.deg(rotateAngle))
      console.log(t)
      transformBoxRef.current.attributeStyleMap.set('transform', transforms)
    } catch (error) {
      console.error('Transform error:', error)
    }
  }, [rotateAngle, scaleValue, translateX, isSupported])

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the CSS Typed OM API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The CSS Typed OM API is currently supported in:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Chrome/Edge 66+</li>
              <li>Opera 53+</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              This is a Houdini API. Please use a Chromium-based browser to see these demos.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Demo 1: Resizable Panel Comparison */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>1. String-Based vs Typed OM Comparison</CardTitle>
          <CardDescription>
            Resize the panel to compare traditional string manipulation with Typed OM
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Panel Width: {panelWidth}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={panelWidth}
              onChange={(e) => updatePanelWidth(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* String-based method */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">String-Based (Traditional)</p>
                <span className="text-xs text-muted-foreground">
                  {stringTime.toFixed(4)}ms
                </span>
              </div>
              <div className="h-48 bg-muted rounded-lg overflow-hidden border-2 border-red-500/50">
                <div
                  ref={stringBoxRef}
                  className="h-full transition-all duration-100"
                  style={{ width: `${panelWidth}%` }}
                >
                  <div className="p-4 text-xs font-mono">
                    <p>element.style.width = {panelWidth} + '%'</p>
                    <p className="mt-2 opacity-70">String concatenation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Typed OM method */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Typed OM (Modern)</p>
                <span className="text-xs text-muted-foreground">
                  {typedTime.toFixed(4)}ms
                </span>
              </div>
              <div className="h-48 bg-muted rounded-lg overflow-hidden border-2 border-green-500/50">
                <div
                  ref={typedBoxRef}
                  className="h-full transition-all duration-100"
                  style={{ width: `${panelWidth}%` }}
                >
                  <div className="p-4 text-xs font-mono">
                    <p>attributeStyleMap.set()</p>
                    <p className="mt-2 opacity-70">Typed objects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg text-sm">
            <p className="font-medium mb-2">Comparison:</p>
            <ul className="space-y-1 text-xs">
              <li>• String-based: Requires concatenation and parsing</li>
              <li>• Typed OM: Direct object manipulation, type-safe</li>
              <li>• Performance difference: {Math.abs(stringTime - typedTime).toFixed(4)}ms</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Demo 2: Numeric Operations */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>2. Unit-Aware Numeric Operations</CardTitle>
          <CardDescription>
            Perform mathematical operations on CSS numeric values with proper units
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Base Value
              </label>
              <input
                type="number"
                value={baseValue}
                onChange={(e) => setBaseValue(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-md bg-background"
              />
              <p className="text-xs text-muted-foreground mt-1">CSS.px({baseValue})</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Operation
              </label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="add">Add (+)</option>
                <option value="sub">Subtract (-)</option>
                <option value="mul">Multiply (×)</option>
                <option value="div">Divide (÷)</option>
                <option value="min">Min</option>
                <option value="max">Max</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {operation === 'mul' || operation === 'div' ? 'Factor' : 'Operand'}
              </label>
              <input
                type="number"
                value={operand}
                onChange={(e) => setOperand(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-md bg-background"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {operation === 'mul' || operation === 'div' ? operand : `CSS.px(${operand})`}
              </p>
            </div>
          </div>

          <Button onClick={performOperation} className="w-full">
            Calculate Result
          </Button>

          {resultValue && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Result:</p>
              <code className="text-lg">{resultValue}</code>
            </div>
          )}

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Operations maintain unit awareness</p>
            <p>• No need for manual string parsing or conversion</p>
            <p>• Supports calc(), min(), max() functions</p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 3: Transform Manipulation */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>3. Transform Value Manipulation</CardTitle>
          <CardDescription>
            Directly manipulate CSS transforms using typed objects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Rotate: {rotateAngle}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={rotateAngle}
                onChange={(e) => setRotateAngle(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Scale: {scaleValue.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={scaleValue}
                onChange={(e) => setScaleValue(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Translate X: {translateX}px
              </label>
              <input
                type="range"
                min="-100"
                max="100"
                value={translateX}
                onChange={(e) => setTranslateX(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-center h-64 bg-muted rounded-lg overflow-hidden">
            <div
              ref={transformBoxRef}
              className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg"
            >
              Transform Me!
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg font-mono text-xs overflow-x-auto">
            <pre>{`new CSSTransformValue([
  new CSSRotate(CSS.deg(${rotateAngle})),
  new CSSScale(CSS.number(${scaleValue.toFixed(2)}), CSS.number(${scaleValue.toFixed(2)})),
  new CSSTranslate(CSS.px(${translateX}), CSS.px(0))
])`}</pre>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>✨ Individual transform functions as typed objects instead of parsing strings</p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 4: Reading Computed Styles */}
      <Card className="border-yellow-500">
        <CardHeader>
          <CardTitle>4. Reading Computed Styles with Typed OM</CardTitle>
          <CardDescription>
            Access computed style values as typed objects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
            <h3 className="text-lg font-bold mb-2">Sample Element</h3>
            <p className="text-sm">Click the button below to read my computed styles</p>
          </div>

          <Button
            onClick={() => {
              const element = document.querySelector('.bg-gradient-to-r') as HTMLElement
              if (element) {
                const computedStyles = element.computedStyleMap()

                const display = computedStyles.get('display')
                const padding = computedStyles.get('padding-top')
                const color = computedStyles.get('color')

                alert(`Computed Styles (Typed OM):

Display: ${display?.toString()}
Padding Top: ${padding?.toString()}
Color: ${color?.toString()}

These are typed objects, not strings!`)
              }
            }}
          >
            Read Computed Styles
          </Button>

          <div className="bg-muted p-4 rounded-lg text-sm">
            <p className="font-medium mb-2">Traditional vs Typed OM:</p>
            <div className="grid gap-2 md:grid-cols-2 font-mono text-xs">
              <div>
                <p className="opacity-70 mb-1">Traditional:</p>
                <code>getComputedStyle(el).width</code>
                <p className="mt-1 text-muted-foreground">→ "150px" (string)</p>
              </div>
              <div>
                <p className="opacity-70 mb-1">Typed OM:</p>
                <code>el.computedStyleMap().get('width')</code>
                <p className="mt-1 text-muted-foreground">→ CSSUnitValue object</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
