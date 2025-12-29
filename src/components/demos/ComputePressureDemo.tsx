import { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/* eslint-disable @typescript-eslint/no-explicit-any */
// Three.js types (loaded from CDN) - using any since we don't have official types
declare global {
  interface Window {
    THREE: any
  }
}

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
}

interface PressureRecord {
  source: 'cpu'
  state: 'nominal' | 'fair' | 'serious' | 'critical'
  time: number
}

interface PressureObserver {
  observe(source: 'cpu'): Promise<void>
  unobserve(source: 'cpu'): void
  disconnect(): void
}

declare global {
  interface WindowOrWorkerGlobalScope {
    PressureObserver: {
      new (callback: (records: PressureRecord[]) => void): PressureObserver
    }
  }
}

export function ComputePressureDemo() {
  const [isSupported] = useState('PressureObserver' in window)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [currentPressure, setCurrentPressure] = useState<'nominal' | 'fair' | 'serious' | 'critical' | null>(null)
  const [isObserving, setIsObserving] = useState(false)
  const observerRef = useRef<PressureObserver | null>(null)

  // Three.js loading
  const [threeLoaded, setThreeLoaded] = useState(() => !!window.THREE)
  const [threeLoading, setThreeLoading] = useState(false)

  // Animation control
  const [animationMode, setAnimationMode] = useState<'none' | 'light' | 'heavy'>('none')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)

  // Canvas animation (light mode)
  const particlesRef = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    color: string
  }>>([])

  // Three.js refs (heavy mode)
  const threeSceneRef = useRef<any>(null)
  const threeRendererRef = useRef<any>(null)
  const threeCameraRef = useRef<any>(null)
  const threeMeshesRef = useRef<any[]>([])

  // Auto-adapt based on pressure
  const [autoAdapt, setAutoAdapt] = useState(false)
  const [adaptiveQuality, setAdaptiveQuality] = useState<'high' | 'medium' | 'low'>('high')

  const addLog = useCallback((message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    setLogs(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }, ...prev].slice(0, 15))
  }, [])

  // Load Three.js from CDN
  useEffect(() => {
    // Avoid setState in effect - check if already exists or loading
    if (window.THREE || threeLoading) return

    // Use a flag to track if component is still mounted
    let isMounted = true

    const loadScript = () => {
      if (!isMounted) return

      setThreeLoading(true)
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js'
      script.onload = () => {
        if (isMounted) {
          setThreeLoaded(true)
          setThreeLoading(false)
          addLog('Three.js loaded successfully', 'success')
        }
      }
      script.onerror = () => {
        if (isMounted) {
          setThreeLoading(false)
          addLog('Failed to load Three.js', 'error')
        }
      }
      document.head.appendChild(script)
    }

    // Load script asynchronously
    Promise.resolve().then(loadScript)

    return () => {
      isMounted = false
    }
  }, [threeLoading, addLog])

  // Initialize light animation (Canvas with particles)
  const initLightAnimation = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const particles = []
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b']

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    particlesRef.current = particles

    let isRunning = true

    const animate = () => {
      if (!isRunning) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => { isRunning = false }
  }, [])

  // Initialize heavy animation (Three.js with lots of geometry)
  const initHeavyAnimation = useCallback(() => {
    if (!window.THREE || !containerRef.current) return

    const THREE = window.THREE
    const container = containerRef.current

    // Clean up existing renderer
    if (threeRendererRef.current) {
      threeRendererRef.current.dispose()
      container.removeChild(threeRendererRef.current.domElement)
    }

    // Create scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, 800 / 400, 0.1, 1000)
    camera.position.z = 50

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(800, 400)
    container.appendChild(renderer.domElement)

    // Create lots of geometries with complex materials
    const meshes: any[] = []
    const geometryTypes = [
      () => new THREE.BoxGeometry(1, 1, 1, 8, 8, 8), // Subdivided cube
      () => new THREE.SphereGeometry(0.5, 32, 32), // High poly sphere
      () => new THREE.TorusGeometry(0.5, 0.2, 32, 64), // Torus with many segments
      () => new THREE.TetrahedronGeometry(0.6, 2), // Subdivided tetrahedron
      () => new THREE.OctahedronGeometry(0.6, 2), // Subdivided octahedron
    ]

    const colors = [0x3b82f6, 0x8b5cf6, 0xec4899, 0x10b981, 0xf59e0b]

    // Create 200 meshes with complex shading
    for (let i = 0; i < 10000; i++) {
      const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)]()

      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        shininess: 100,
        specular: 0x888888,
        emissive: colors[Math.floor(Math.random() * colors.length)],
        emissiveIntensity: 0.2
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = (Math.random() - 0.5) * 100
      mesh.position.y = (Math.random() - 0.5) * 100
      mesh.position.z = (Math.random() - 0.5) * 100

      mesh.userData.velocity = {
        x: (Math.random() - 0.5) * 0.2,
        y: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.2,
        rotX: Math.random() * 0.05,
        rotY: Math.random() * 0.05,
        rotZ: Math.random() * 0.05
      }

      scene.add(mesh)
      meshes.push(mesh)
    }

    // Add multiple lights for complex shading calculations
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    const lights: any[] = []
    for (let i = 0; i < 5; i++) {
      const light = new THREE.PointLight(colors[i], 1, 100)
      light.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      )
      scene.add(light)
      lights.push(light)
    }

    threeSceneRef.current = scene
    threeRendererRef.current = renderer
    threeCameraRef.current = camera
    threeMeshesRef.current = meshes

    let isRunning = true

    // Animation loop
    const animate = () => {
      if (!isRunning) return

      // Rotate and move all meshes
      meshes.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.velocity.rotX
        mesh.rotation.y += mesh.userData.velocity.rotY
        mesh.rotation.z += mesh.userData.velocity.rotZ

        mesh.position.x += mesh.userData.velocity.x
        mesh.position.y += mesh.userData.velocity.y
        mesh.position.z += mesh.userData.velocity.z

        // Bounce off boundaries
        if (Math.abs(mesh.position.x) > 50) mesh.userData.velocity.x *= -1
        if (Math.abs(mesh.position.y) > 50) mesh.userData.velocity.y *= -1
        if (Math.abs(mesh.position.z) > 50) mesh.userData.velocity.z *= -1
      })

      // Move lights for dynamic lighting calculations
      lights.forEach((light, i) => {
        light.position.x = Math.sin(Date.now() * 0.001 + i) * 30
        light.position.y = Math.cos(Date.now() * 0.001 + i) * 30
      })

      // Rotate camera
      camera.position.x = Math.sin(Date.now() * 0.0003) * 80
      camera.position.z = Math.cos(Date.now() * 0.0003) * 80
      camera.lookAt(scene.position)

      // Additional CPU-intensive math operations
      for (let i = 0; i < 5000; i++) {
        Math.sqrt(Math.random() * 10000)
        Math.sin(Math.random() * Math.PI)
        Math.cos(Math.random() * Math.PI)
      }

      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => { isRunning = false }
  }, [])

  // Start animation
  const startAnimation = useCallback((mode: 'light' | 'heavy') => {
    // Stop current animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    // Clean up canvas
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    // Clean up Three.js
    if (threeRendererRef.current && containerRef.current) {
      containerRef.current.removeChild(threeRendererRef.current.domElement)
      threeRendererRef.current.dispose()
      threeRendererRef.current = null
    }

    setAnimationMode(mode)

    if (mode === 'light') {
      addLog('Started light animation (50 canvas particles)', 'success')
      setTimeout(() => initLightAnimation(), 0)
    } else {
      if (!threeLoaded) {
        addLog('Three.js not loaded yet. Please wait...', 'warning')
        return
      }
      addLog('Started heavy animation (200 3D meshes + 5 lights + shaders)', 'warning')
      setTimeout(() => initHeavyAnimation(), 0)
    }
  }, [initLightAnimation, initHeavyAnimation, threeLoaded, addLog])

  // Stop animation
  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = undefined
    }

    setAnimationMode('none')

    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    if (threeRendererRef.current && containerRef.current) {
      containerRef.current.removeChild(threeRendererRef.current.domElement)
      threeRendererRef.current.dispose()
      threeRendererRef.current = null
    }

    addLog('Stopped animation', 'info')
  }, [addLog])

  // Start pressure monitoring
  const startMonitoring = useCallback(async () => {
    if (!isSupported) {
      addLog('Compute Pressure API not supported', 'error')
      return
    }

    try {
      const observer = new window.PressureObserver((records) => {
        const latestRecord = records[records.length - 1]
        setCurrentPressure(latestRecord.state)

        addLog(`Pressure state: ${latestRecord.state}`,
          latestRecord.state === 'critical' ? 'error' :
          latestRecord.state === 'serious' ? 'warning' : 'info'
        )

        // Auto-adapt if enabled
        if (autoAdapt) {
          if (latestRecord.state === 'critical' || latestRecord.state === 'serious') {
            setAdaptiveQuality('low')
            if (animationMode === 'heavy') {
              startAnimation('light')
              addLog('Auto-adapted: Switched to light animation', 'warning')
            }
          } else if (latestRecord.state === 'fair') {
            setAdaptiveQuality('medium')
          } else {
            setAdaptiveQuality('high')
          }
        }
      })

      await observer.observe('cpu')
      observerRef.current = observer
      setIsObserving(true)
      addLog('Started monitoring CPU pressure', 'success')
    } catch (error) {
      addLog(`Failed to start monitoring: ${(error as Error).message}`, 'error')
    }
  }, [isSupported, addLog, autoAdapt, animationMode, startAnimation])

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
      setIsObserving(false)
      setCurrentPressure(null)
      addLog('Stopped monitoring CPU pressure', 'info')
    }
  }, [addLog])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (threeRendererRef.current) {
        threeRendererRef.current.dispose()
      }
    }
  }, [])

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the Compute Pressure API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The Compute Pressure API is available in:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Chrome/Edge 125+</li>
              <li>Chromium-based browsers with origin trial enabled</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              This API is currently experimental and may require enabling flags or origin trials.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getPressureColor = () => {
    switch (currentPressure) {
      case 'nominal': return 'text-green-500'
      case 'fair': return 'text-blue-500'
      case 'serious': return 'text-orange-500'
      case 'critical': return 'text-red-500'
      default: return 'text-muted-foreground'
    }
  }

  const getPressureBadgeClass = () => {
    switch (currentPressure) {
      case 'nominal': return 'bg-green-500/20 text-green-500 border-green-500'
      case 'fair': return 'bg-blue-500/20 text-blue-500 border-blue-500'
      case 'serious': return 'bg-orange-500/20 text-orange-500 border-orange-500'
      case 'critical': return 'bg-red-500/20 text-red-500 border-red-500'
      default: return 'bg-muted text-muted-foreground border-border'
    }
  }

  return (
    <div className="space-y-6">
      {/* Pressure Monitor */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>CPU Pressure Monitor</CardTitle>
          <CardDescription>
            Monitor system CPU pressure in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <Button
              onClick={startMonitoring}
              disabled={isObserving}
              variant={isObserving ? 'outline' : 'default'}
            >
              Start Monitoring
            </Button>
            <Button
              onClick={stopMonitoring}
              disabled={!isObserving}
              variant="outline"
            >
              Stop Monitoring
            </Button>

            <div className="flex-1" />

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Auto-Adapt:</span>
              <input
                type="checkbox"
                checked={autoAdapt}
                onChange={(e) => {
                  setAutoAdapt(e.target.checked)
                  addLog(`Auto-adapt ${e.target.checked ? 'enabled' : 'disabled'}`, 'info')
                }}
                className="w-4 h-4"
              />
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Current Pressure State:</span>
              <span className={`text-lg font-bold ${getPressureColor()}`}>
                {currentPressure ? currentPressure.toUpperCase() : 'NOT MONITORING'}
              </span>
            </div>

            {autoAdapt && (
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                <span className="text-sm font-medium">Adaptive Quality:</span>
                <span className={`px-2 py-1 rounded border ${
                  adaptiveQuality === 'high' ? 'bg-green-500/20 text-green-500 border-green-500' :
                  adaptiveQuality === 'medium' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500' :
                  'bg-red-500/20 text-red-500 border-red-500'
                }`}>
                  {adaptiveQuality.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className={`p-3 rounded border text-center ${
              currentPressure === 'nominal' ? getPressureBadgeClass() : 'border-border'
            }`}>
              <div className="text-xs font-medium">Nominal</div>
              <div className="text-[10px] text-muted-foreground mt-1">Normal</div>
            </div>
            <div className={`p-3 rounded border text-center ${
              currentPressure === 'fair' ? getPressureBadgeClass() : 'border-border'
            }`}>
              <div className="text-xs font-medium">Fair</div>
              <div className="text-[10px] text-muted-foreground mt-1">Moderate</div>
            </div>
            <div className={`p-3 rounded border text-center ${
              currentPressure === 'serious' ? getPressureBadgeClass() : 'border-border'
            }`}>
              <div className="text-xs font-medium">Serious</div>
              <div className="text-[10px] text-muted-foreground mt-1">High</div>
            </div>
            <div className={`p-3 rounded border text-center ${
              currentPressure === 'critical' ? getPressureBadgeClass() : 'border-border'
            }`}>
              <div className="text-xs font-medium">Critical</div>
              <div className="text-[10px] text-muted-foreground mt-1">Very High</div>
            </div>
          </div>

          {!threeLoaded && (
            <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
              ⏳ <strong>Loading Three.js...</strong> Heavy animation will be available once loaded.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Animation Demo */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>Performance Impact Demo</CardTitle>
          <CardDescription>
            Toggle between light and heavy animations to see pressure changes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => startAnimation('light')}
              variant={animationMode === 'light' ? 'default' : 'outline'}
              className="flex-1"
            >
              Light Animation
            </Button>
            <Button
              onClick={() => startAnimation('heavy')}
              variant={animationMode === 'heavy' ? 'default' : 'outline'}
              className="flex-1"
              disabled={!threeLoaded}
            >
              Heavy Animation {!threeLoaded && '(Loading...)'}
            </Button>
            <Button
              onClick={stopAnimation}
              variant="outline"
              disabled={animationMode === 'none'}
            >
              Stop
            </Button>
          </div>

          <div className="relative" style={{ height: '400px' }}>
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              className="w-full border rounded-lg bg-black"
              style={{ display: animationMode === 'light' ? 'block' : 'none' }}
            />
            <div
              ref={containerRef}
              className="w-full border rounded-lg bg-black"
              style={{ display: animationMode === 'heavy' ? 'block' : 'none', height: '400px' }}
            />
            {animationMode === 'none' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 border rounded-lg">
                <p className="text-muted-foreground">No animation running. Click a button above to start.</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-muted p-3 rounded">
              <div className="font-semibold mb-1">Light Animation:</div>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>50 canvas particles</li>
                <li>Simple 2D rendering</li>
                <li>Basic physics</li>
                <li>Low CPU usage (~5-10%)</li>
              </ul>
            </div>
            <div className="bg-muted p-3 rounded">
              <div className="font-semibold mb-1">Heavy Animation:</div>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>200 3D meshes (high poly)</li>
                <li>Phong shading + specularity</li>
                <li>5 dynamic point lights</li>
                <li>Complex geometry calculations</li>
                <li>5000 math ops/frame</li>
                <li>Very high CPU usage (40-90%)</li>
              </ul>
            </div>
          </div>

          <div className="text-xs text-muted-foreground bg-yellow-500/10 p-3 rounded border border-yellow-500/30">
            💡 <strong>Tip:</strong> Start monitoring first, then toggle between animations to observe pressure changes.
            Enable "Auto-Adapt" to automatically switch to light animation when pressure gets too high.
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Real-time log of pressure changes and events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto bg-muted p-4 rounded-lg font-mono text-xs">
            {logs.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No activity yet. Start monitoring to see pressure changes.
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
