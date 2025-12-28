import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function PropertiesValuesDemo() {
  const [isSupported] = useState(
    typeof CSS !== 'undefined' &&
    'registerProperty' in CSS
  )
  const [isAnimating, setIsAnimating] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(10)
  const [gradientAngle, setGradientAngle] = useState(45)
  const colorMorphRef = useRef<HTMLDivElement>(null)

  // Register custom properties
  useEffect(() => {
    if (!isSupported) return

    try {
      // Register custom property for gradient angle
      CSS.registerProperty({
        name: '--gradient-angle',
        syntax: '<angle>',
        inherits: false,
        initialValue: '45deg',
      })

      // Register custom property for color stops
      CSS.registerProperty({
        name: '--gradient-color-1',
        syntax: '<color>',
        inherits: false,
        initialValue: '#ff6b6b',
      })

      CSS.registerProperty({
        name: '--gradient-color-2',
        syntax: '<color>',
        inherits: false,
        initialValue: '#4ecdc4',
      })

      CSS.registerProperty({
        name: '--gradient-color-3',
        syntax: '<color>',
        inherits: false,
        initialValue: '#45b7d1',
      })

      // Register for position animation
      CSS.registerProperty({
        name: '--gradient-position',
        syntax: '<percentage>',
        inherits: false,
        initialValue: '0%',
      })
    } catch (error) {
      // Properties might already be registered
      console.log('Properties already registered or error:', error)
    }
  }, [isSupported])

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the CSS Properties and Values API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The CSS Properties and Values API is currently supported in:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Chrome/Edge 78+</li>
              <li>Opera 65+</li>
              <li>Safari 16.4+</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Please use a modern browser to see this demo.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Demo 1: Animated Gradient Background */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>1. Animated Gradient Background</CardTitle>
          <CardDescription>
            Smooth gradient animation using registered custom properties
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Animation Speed: {animationSpeed}s
              </label>
              <input
                type="range"
                min="3"
                max="20"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Base Angle: {gradientAngle}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={gradientAngle}
                onChange={(e) => setGradientAngle(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setIsAnimating(!isAnimating)}
              variant={isAnimating ? 'default' : 'outline'}
            >
              {isAnimating ? 'Pause Animation' : 'Start Animation'}
            </Button>
          </div>

          <div
            className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-muted"
            style={{
              background: 'linear-gradient(var(--gradient-angle), var(--gradient-color-1), var(--gradient-color-2), var(--gradient-color-3))',
              animation: isAnimating ? `gradientRotate ${animationSpeed}s linear infinite, colorShift ${animationSpeed * 2}s ease-in-out infinite` : 'none',
              // @ts-expect-error CSS custom properties
              '--gradient-angle': `${gradientAngle}deg`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/90 backdrop-blur-sm px-6 py-3 rounded-lg">
                <p className="text-lg font-semibold">Smoothly Animated Gradient</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Custom properties are registered with specific types (angle, color)</p>
            <p>• CSS animations can smoothly interpolate between values</p>
            <p>• Without registration, gradients would jump between states</p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 2: Comparison - Registered vs Unregistered */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>2. Registered vs Unregistered Property Animation</CardTitle>
          <CardDescription>
            See the difference in animation smoothness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Registered property - smooth animation */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Registered Property (Smooth)</p>
              <div
                className="w-full h-32 rounded-lg border-2 border-green-500"
                style={{
                  background: 'linear-gradient(90deg, var(--gradient-color-1) var(--gradient-position), var(--gradient-color-2) 100%)',
                  animation: 'smoothSlide 3s ease-in-out infinite alternate',
                }}
              />
              <p className="text-xs text-muted-foreground">
                ✓ Smooth interpolation of position value
              </p>
            </div>

            {/* Unregistered property - choppy animation */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Unregistered Property (Choppy)</p>
              <div
                className="w-full h-32 rounded-lg border-2 border-red-500"
                style={{
                  background: 'linear-gradient(90deg, #ff6b6b var(--unregistered-position, 0%), #4ecdc4 100%)',
                  animation: 'choppySlide 3s ease-in-out infinite alternate',
                }}
              />
              <p className="text-xs text-muted-foreground">
                ✗ Treated as string, no smooth interpolation
              </p>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Why the difference?</p>
            <p className="text-sm text-muted-foreground">
              Registered properties have a defined syntax type (<code className="bg-background px-1 rounded">&lt;percentage&gt;</code>),
              allowing the browser to interpolate values smoothly. Unregistered properties are treated as strings,
              causing the browser to jump between keyframe values instantly.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 3: Interactive Color Morphing */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>3. Interactive Color Morphing</CardTitle>
          <CardDescription>
            Control gradient colors with registered properties
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Color 1
              </label>
              <input
                type="color"
                defaultValue="#ff6b6b"
                onChange={(e) => {
                  if (colorMorphRef.current) {
                    colorMorphRef.current.style.setProperty('--gradient-color-1', e.target.value)
                  }
                }}
                className="h-10 w-full cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Color 2
              </label>
              <input
                type="color"
                defaultValue="#4ecdc4"
                onChange={(e) => {
                  if (colorMorphRef.current) {
                    colorMorphRef.current.style.setProperty('--gradient-color-2', e.target.value)
                  }
                }}
                className="h-10 w-full cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Color 3
              </label>
              <input
                type="color"
                defaultValue="#45b7d1"
                onChange={(e) => {
                  if (colorMorphRef.current) {
                    colorMorphRef.current.style.setProperty('--gradient-color-3', e.target.value)
                  }
                }}
                className="h-10 w-full cursor-pointer"
              />
            </div>
          </div>

          <div
            ref={colorMorphRef}
            className="w-full h-48 rounded-lg border-2 border-muted"
            style={{
              background: 'linear-gradient(135deg, var(--gradient-color-1), var(--gradient-color-2), var(--gradient-color-3))',
              // @ts-expect-error CSS custom properties
              '--gradient-color-1': '#ff6b6b',
              '--gradient-color-2': '#4ecdc4',
              '--gradient-color-3': '#45b7d1',
            }}
          />

          <div className="text-xs text-muted-foreground">
            <p>Colors transition smoothly thanks to registered <code className="bg-background px-1 rounded">&lt;color&gt;</code> syntax</p>
          </div>
        </CardContent>
      </Card>

      {/* Add required CSS for animations */}
      <style>{`
        @keyframes gradientRotate {
          0% {
            --gradient-angle: ${gradientAngle}deg;
          }
          100% {
            --gradient-angle: ${gradientAngle + 360}deg;
          }
        }

        @keyframes colorShift {
          0%, 100% {
            --gradient-color-1: #ff6b6b;
            --gradient-color-2: #4ecdc4;
            --gradient-color-3: #45b7d1;
          }
          33% {
            --gradient-color-1: #feca57;
            --gradient-color-2: #ee5a6f;
            --gradient-color-3: #c7ecee;
          }
          66% {
            --gradient-color-1: #a29bfe;
            --gradient-color-2: #fd79a8;
            --gradient-color-3: #fdcb6e;
          }
        }

        @keyframes smoothSlide {
          0% {
            --gradient-position: 0%;
          }
          100% {
            --gradient-position: 100%;
          }
        }

        @keyframes choppySlide {
          0% {
            --unregistered-position: 0%;
          }
          100% {
            --unregistered-position: 100%;
          }
        }
      `}</style>
    </div>
  )
}
