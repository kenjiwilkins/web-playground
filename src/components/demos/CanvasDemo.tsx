import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export function CanvasDemo() {
  // Demo 1: Basic Drawing
  const basicCanvasRef = useRef<HTMLCanvasElement>(null)
  const [fillColor, setFillColor] = useState('#4f46e5')
  const [strokeColor, setStrokeColor] = useState('#dc2626')

  // Demo 2: Interactive Drawing
  const drawCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState(5)
  const [brushColor, setBrushColor] = useState('#000000')

  // Demo 3: Animation
  const animCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(true)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const ballPosRef = useRef({ x: 100, y: 100, vx: 2, vy: 1.5 })

  // Demo 4: Particle System
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const particleAnimRef = useRef<number | undefined>(undefined)

  // Demo 1: Draw basic shapes
  const drawBasicShapes = useCallback(() => {
    const canvas = basicCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Rectangle
    ctx.fillStyle = fillColor
    ctx.fillRect(20, 20, 100, 60)

    // Stroked rectangle
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = 3
    ctx.strokeRect(140, 20, 100, 60)

    // Circle
    ctx.beginPath()
    ctx.arc(320, 50, 30, 0, Math.PI * 2)
    ctx.fillStyle = fillColor
    ctx.fill()

    // Triangle
    ctx.beginPath()
    ctx.moveTo(420, 20)
    ctx.lineTo(380, 80)
    ctx.lineTo(460, 80)
    ctx.closePath()
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = 3
    ctx.stroke()

    // Gradient
    const gradient = ctx.createLinearGradient(20, 100, 220, 100)
    gradient.addColorStop(0, fillColor)
    gradient.addColorStop(1, strokeColor)
    ctx.fillStyle = gradient
    ctx.fillRect(20, 100, 200, 40)

    // Text
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 20px sans-serif'
    ctx.fillText('Canvas API', 260, 130)

    // Path with curves
    ctx.beginPath()
    ctx.moveTo(420, 100)
    ctx.quadraticCurveTo(460, 120, 420, 140)
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = 2
    ctx.stroke()
  }, [fillColor, strokeColor])

  useEffect(() => {
    drawBasicShapes()
  }, [drawBasicShapes])

  // Demo 2: Interactive drawing handlers
  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = drawCanvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
  }, [])

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = drawCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    ctx.lineTo(x, y)
    ctx.strokeStyle = brushColor
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
  }, [isDrawing, brushSize, brushColor])

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
  }, [])

  const clearDrawing = useCallback(() => {
    const canvas = drawCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  // Demo 3: Animation
  useEffect(() => {
    const canvas = animCanvasRef.current
    if (!canvas || !isAnimating) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update ball position
      ballPosRef.current.x += ballPosRef.current.vx
      ballPosRef.current.y += ballPosRef.current.vy

      // Bounce off walls
      if (ballPosRef.current.x + 20 > canvas.width || ballPosRef.current.x - 20 < 0) {
        ballPosRef.current.vx *= -1
      }
      if (ballPosRef.current.y + 20 > canvas.height || ballPosRef.current.y - 20 < 0) {
        ballPosRef.current.vy *= -1
      }

      // Draw ball with shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      ctx.shadowBlur = 10
      ctx.shadowOffsetX = 3
      ctx.shadowOffsetY = 3

      ctx.beginPath()
      ctx.arc(ballPosRef.current.x, ballPosRef.current.y, 20, 0, Math.PI * 2)

      // Gradient fill
      const gradient = ctx.createRadialGradient(
        ballPosRef.current.x - 7,
        ballPosRef.current.y - 7,
        5,
        ballPosRef.current.x,
        ballPosRef.current.y,
        20
      )
      gradient.addColorStop(0, '#ffffff')
      gradient.addColorStop(1, '#4f46e5')
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw trail
      ctx.shadowColor = 'transparent'
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.1)'
      ctx.lineWidth = 40
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(
        ballPosRef.current.x - ballPosRef.current.vx * 5,
        ballPosRef.current.y - ballPosRef.current.vy * 5
      )
      ctx.lineTo(ballPosRef.current.x, ballPosRef.current.y)
      ctx.stroke()

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isAnimating])

  // Demo 4: Particle System
  const createParticles = useCallback(() => {
    const canvas = particleCanvasRef.current
    if (!canvas) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    particlesRef.current = Array.from({ length: 50 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 3 + 1
      return {
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 4 + 2,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      }
    })
  }, [])

  const animateParticles = useCallback(() => {
    const canvas = particleCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      // Fade effect instead of clear
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Apply gravity
        particle.vy += 0.1

        // Bounce off bottom
        if (particle.y + particle.radius > canvas.height) {
          particle.y = canvas.height - particle.radius
          particle.vy *= -0.7
        }

        // Remove particles that go off screen
        if (
          particle.x < -10 ||
          particle.x > canvas.width + 10 ||
          particle.y > canvas.height + 10
        ) {
          particlesRef.current.splice(index, 1)
          return
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      particleAnimRef.current = requestAnimationFrame(animate)
    }

    animate()
  }, [])

  const startParticles = useCallback(() => {
    if (particleAnimRef.current) {
      cancelAnimationFrame(particleAnimRef.current)
    }
    createParticles()
    animateParticles()
  }, [createParticles, animateParticles])

  const stopParticles = useCallback(() => {
    if (particleAnimRef.current) {
      cancelAnimationFrame(particleAnimRef.current)
    }
    particlesRef.current = []
    const canvas = particleCanvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [])

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (particleAnimRef.current) {
        cancelAnimationFrame(particleAnimRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Demo 1: Basic Drawing */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>1. Basic Drawing - Shapes & Styles</CardTitle>
          <CardDescription>
            Rectangles, circles, paths, gradients, and text rendering
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Fill Color
              </label>
              <input
                type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
                className="h-10 w-full cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Stroke Color
              </label>
              <input
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className="h-10 w-full cursor-pointer"
              />
            </div>
          </div>

          <canvas
            ref={basicCanvasRef}
            width={500}
            height={160}
            className="w-full border-2 border-muted rounded-lg bg-white"
          />

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Filled rectangle, stroked rectangle, circle, triangle</p>
            <p>• Linear gradient and text rendering</p>
            <p>• Quadratic curves for smooth paths</p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 2: Interactive Drawing */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>2. Interactive Drawing Pad</CardTitle>
          <CardDescription>
            Draw with your mouse - try different brush sizes and colors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Brush Size: {brushSize}px
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Brush Color
              </label>
              <input
                type="color"
                value={brushColor}
                onChange={(e) => setBrushColor(e.target.value)}
                className="h-10 w-full cursor-pointer"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={clearDrawing} variant="outline" className="w-full">
                Clear Canvas
              </Button>
            </div>
          </div>

          <canvas
            ref={drawCanvasRef}
            width={500}
            height={300}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full border-2 border-muted rounded-lg bg-white cursor-crosshair"
          />

          <div className="text-xs text-muted-foreground">
            <p>✨ Draw by clicking and dragging on the canvas</p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 3: Animation */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>3. Bouncing Ball Animation</CardTitle>
          <CardDescription>
            Smooth animation using requestAnimationFrame with shadows and gradients
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setIsAnimating(!isAnimating)}
              variant={isAnimating ? 'default' : 'outline'}
            >
              {isAnimating ? 'Pause Animation' : 'Start Animation'}
            </Button>
            <Button
              onClick={() => {
                ballPosRef.current = { x: 100, y: 100, vx: 2, vy: 1.5 }
              }}
              variant="outline"
            >
              Reset Position
            </Button>
          </div>

          <canvas
            ref={animCanvasRef}
            width={500}
            height={300}
            className="w-full border-2 border-muted rounded-lg bg-gradient-to-br from-gray-50 to-gray-100"
          />

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Radial gradient for 3D sphere effect</p>
            <p>• Shadow effects for depth</p>
            <p>• Motion trail using semi-transparent strokes</p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 4: Particle System */}
      <Card className="border-yellow-500">
        <CardHeader>
          <CardTitle>4. Particle System</CardTitle>
          <CardDescription>
            Dynamic particle explosion with physics simulation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={startParticles}>
              Explode Particles
            </Button>
            <Button onClick={stopParticles} variant="outline">
              Clear
            </Button>
          </div>

          <canvas
            ref={particleCanvasRef}
            width={500}
            height={300}
            className="w-full border-2 border-muted rounded-lg bg-black"
          />

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• 50 particles with randomized velocities and colors</p>
            <p>• Gravity simulation and bounce physics</p>
            <p>• Motion blur effect using alpha compositing</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
