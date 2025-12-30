import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface DeviceCapability {
  range: string
  category: string
  description: string
  color: string
}

const capabilities: DeviceCapability[] = [
  {
    range: '0.25 - 0.5 GB',
    category: 'Low-End Device',
    description: 'Very basic devices, feature phones, older smartphones',
    color: 'border-red-500'
  },
  {
    range: '1 GB',
    category: 'Entry-Level',
    description: 'Budget smartphones, basic multitasking',
    color: 'border-orange-500'
  },
  {
    range: '2 GB',
    category: 'Mid-Range',
    description: 'Standard smartphones, moderate multitasking',
    color: 'border-yellow-500'
  },
  {
    range: '4 GB',
    category: 'Good Performance',
    description: 'Modern smartphones, good multitasking capability',
    color: 'border-blue-500'
  },
  {
    range: '8 GB',
    category: 'High Performance',
    description: 'Premium devices, excellent multitasking',
    color: 'border-green-500'
  },
  {
    range: '16+ GB',
    category: 'Workstation/Desktop',
    description: 'High-end desktops, professional workstations',
    color: 'border-purple-500'
  }
]

export function DeviceMemoryDemo() {
  const [isSupported] = useState('deviceMemory' in navigator)

  // Initialize with device memory if available
  const [deviceMemory, setDeviceMemory] = useState<number | null>(() => {
    if ('deviceMemory' in navigator && navigator.deviceMemory !== undefined) {
      return navigator.deviceMemory
    }
    return null
  })

  // Generate recommendation based on device memory
  const getRecommendation = (memory: number | null): string => {
    if (memory === null) return ''
    if (memory <= 0.5) {
      return 'Serve lightweight content, minimal JavaScript, avoid animations'
    } else if (memory <= 1) {
      return 'Use basic features, limit concurrent operations, compress assets'
    } else if (memory <= 2) {
      return 'Standard features acceptable, moderate resource usage is fine'
    } else if (memory <= 4) {
      return 'Most features enabled, good performance for typical web apps'
    } else if (memory <= 8) {
      return 'Enable advanced features, rich interactions, complex visualizations'
    } else {
      return 'All features enabled, heavy computations, 3D graphics acceptable'
    }
  }

  const recommendation = getRecommendation(deviceMemory)

  const detectMemory = () => {
    if (navigator.deviceMemory !== undefined) {
      setDeviceMemory(navigator.deviceMemory)
    }
  }

  const getMemoryCategory = (memory: number | null): string => {
    if (memory === null) return ''
    if (memory <= 0.5) return 'Low-End Device'
    if (memory <= 1) return 'Entry-Level'
    if (memory <= 2) return 'Mid-Range'
    if (memory <= 4) return 'Good Performance'
    if (memory <= 8) return 'High Performance'
    return 'Workstation/Desktop'
  }

  const getCategoryColor = (memory: number | null): string => {
    if (memory === null) return 'border-gray-500'
    if (memory <= 0.5) return 'border-red-500'
    if (memory <= 1) return 'border-orange-500'
    if (memory <= 2) return 'border-yellow-500'
    if (memory <= 4) return 'border-blue-500'
    if (memory <= 8) return 'border-green-500'
    return 'border-purple-500'
  }

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the Device Memory API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The Device Memory API is available in:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Chrome/Edge 63+</li>
              <li>Opera 50+</li>
              <li>Android WebView 63+</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Note: Firefox and Safari do not currently support this API.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Device Memory Display */}
      <Card className={getCategoryColor(deviceMemory)}>
        <CardHeader>
          <CardTitle>Your Device Memory</CardTitle>
          <CardDescription>
            Approximate RAM capacity detected by the browser
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            {deviceMemory !== null ? (
              <>
                <div className="text-6xl font-bold mb-2">
                  {deviceMemory} GB
                </div>
                <div className="text-xl text-muted-foreground">
                  {getMemoryCategory(deviceMemory)}
                </div>
              </>
            ) : (
              <div className="text-muted-foreground">
                Click the button below to detect device memory
              </div>
            )}
          </div>

          <Button onClick={detectMemory} className="w-full">
            Detect Device Memory
          </Button>

          {recommendation && (
            <div className="bg-blue-500/10 p-4 rounded border border-blue-500/30">
              <h4 className="font-semibold mb-2">Recommendation:</h4>
              <p className="text-sm">{recommendation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Memory Categories Reference */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>Device Memory Categories</CardTitle>
          <CardDescription>
            Understanding different device capability levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className={`border-l-4 ${cap.color} pl-4 py-2`}
              >
                <div className="font-semibold flex justify-between items-start">
                  <span>{cap.category}</span>
                  <span className="text-sm text-muted-foreground">{cap.range}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {cap.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Adaptive Loading Example */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>Adaptive Loading Example</CardTitle>
          <CardDescription>
            How to use Device Memory for progressive enhancement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-4">
            <div>
              <div className="text-muted-foreground mb-2">// Adaptive image loading</div>
              <pre className="whitespace-pre-wrap">{`const memory = navigator.deviceMemory || 4;

if (memory < 1) {
  loadImage('thumbnail.jpg'); // Low quality
} else if (memory < 4) {
  loadImage('medium.jpg');    // Medium quality
} else {
  loadImage('high-res.jpg');  // High quality
}`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// Feature enablement</div>
              <pre className="whitespace-pre-wrap">{`const enableHeavyFeatures =
  navigator.deviceMemory >= 4;

if (enableHeavyFeatures) {
  initializeAnimations();
  loadHighResTextures();
  enableRealtimeUpdates();
}`}</pre>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">// Bundle splitting</div>
              <pre className="whitespace-pre-wrap">{`const memory = navigator.deviceMemory || 4;

if (memory >= 8) {
  // Load full featured app
  import('./app-full.js');
} else if (memory >= 2) {
  // Load standard version
  import('./app-standard.js');
} else {
  // Load lite version
  import('./app-lite.js');
}`}</pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Limitations */}
      <Card className="border-yellow-500">
        <CardHeader>
          <CardTitle>Privacy & Limitations</CardTitle>
          <CardDescription>
            Important considerations when using this API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">🔒 Privacy Protection</h4>
              <p className="text-muted-foreground">
                The returned value is intentionally approximate and quantized to prevent device
                fingerprinting. You won't get exact RAM specifications, only bucketed ranges
                (0.25, 0.5, 1, 2, 4, 8, 16+ GB).
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">🔐 Secure Context Required</h4>
              <p className="text-muted-foreground">
                This API only works in secure contexts (HTTPS). It will return undefined on
                HTTP pages.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">⚠️ Fallback Strategy</h4>
              <p className="text-muted-foreground">
                Always provide a fallback value since this API is not universally supported.
                A reasonable default is 4 GB for modern devices.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">📊 Client Hints Alternative</h4>
              <p className="text-muted-foreground">
                You can also access device memory via the <code className="bg-background px-1 rounded">
                Device-Memory</code> HTTP header or <code className="bg-background px-1 rounded">
                Sec-CH-Device-Memory</code> client hint for server-side optimization.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
