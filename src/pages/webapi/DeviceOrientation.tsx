import { DeviceOrientationDemo } from '@/components/demos/DeviceOrientationDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DeviceOrientation() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">
          Device Orientation Events
        </h1>
        <p className="text-muted-foreground">
          Detect device physical orientation and motion using gyroscopes, accelerometers, and compasses for immersive web experiences.
        </p>
      </div>

      {/* Live Demo */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <DeviceOrientationDemo />
      </section>

      {/* Overview */}
      <section>
        <h2 id="overview" className="text-2xl font-semibold mb-4">
          Overview
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What are Device Orientation Events?</CardTitle>
            <CardDescription>
              Access device motion sensors for interactive experiences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Device Orientation Events API provides access to built-in device sensors
              (gyroscopes, accelerometers, magnetometers) allowing web applications to detect
              the device's physical orientation and motion in 3D space.
            </p>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Key Capabilities:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Orientation Detection:</strong> Alpha, beta, gamma rotation angles</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Motion Tracking:</strong> Acceleration and rotation rate data</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Compass Support:</strong> Absolute orientation using device compass</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>Gesture Recognition:</strong> Detect shakes, tilts, and custom gestures</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>3D Interactions:</strong> Control 3D objects and camera perspectives</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 p-4 rounded border border-yellow-500/30">
              <p className="text-sm">
                <strong>Requirements:</strong> This API requires HTTPS (secure context) and user
                permission on iOS 13+ devices. Works best on mobile devices with motion sensors.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Events */}
      <section>
        <h2 id="events" className="text-2xl font-semibold mb-4">
          Main Events
        </h2>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>deviceorientation</CardTitle>
              <CardDescription>
                Fired when device orientation changes (relative)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Provides the device's physical orientation as rotation angles around three axes
                relative to the Earth's coordinate frame.
              </p>

              <div>
                <h4 className="font-semibold mb-2">Event Properties:</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-muted p-3 rounded">
                    <strong>alpha</strong> - Rotation around Z-axis (0° to 360°)
                    <div className="text-xs text-muted-foreground mt-1">
                      Compass direction when absolute, arbitrary otherwise
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <strong>beta</strong> - Rotation around X-axis (-180° to 180°)
                    <div className="text-xs text-muted-foreground mt-1">
                      Front-to-back tilt (positive = tilted toward user)
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <strong>gamma</strong> - Rotation around Y-axis (-90° to 90°)
                    <div className="text-xs text-muted-foreground mt-1">
                      Left-to-right tilt (positive = tilted to the right)
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <strong>absolute</strong> - Boolean
                    <div className="text-xs text-muted-foreground mt-1">
                      True if using compass for absolute orientation
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Example:</h4>
                <div className="bg-muted p-3 rounded font-mono text-sm">
                  <pre className="whitespace-pre-wrap">{`window.addEventListener('deviceorientation', (event) => {
  const alpha = event.alpha; // 0-360°
  const beta = event.beta;   // -180 to 180°
  const gamma = event.gamma; // -90 to 90°

  console.log(\`α: \${alpha}°, β: \${beta}°, γ: \${gamma}°\`);
});`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>deviceorientationabsolute</CardTitle>
              <CardDescription>
                Fired when absolute device orientation changes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Similar to <code className="bg-muted px-1 rounded">deviceorientation</code> but
                specifically uses the device's compass for absolute orientation relative to Earth's
                coordinate frame. The <code className="bg-muted px-1 rounded">absolute</code> property
                will be <code className="bg-muted px-1 rounded">true</code>.
              </p>

              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`window.addEventListener('deviceorientationabsolute', (event) => {
  const heading = event.alpha; // Compass heading
  console.log(\`Heading: \${heading}°\`);
});`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>devicemotion</CardTitle>
              <CardDescription>
                Fired at regular intervals with motion data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Provides detailed information about the device's acceleration and rotation, including
                the acceleration with gravity filtered out (if available).
              </p>

              <div>
                <h4 className="font-semibold mb-2">Event Properties:</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-muted p-3 rounded">
                    <strong>acceleration</strong> - DeviceMotionEventAcceleration
                    <div className="text-xs text-muted-foreground mt-1">
                      x, y, z acceleration in m/s² (gravity excluded if sensor supports it)
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <strong>accelerationIncludingGravity</strong> - DeviceMotionEventAcceleration
                    <div className="text-xs text-muted-foreground mt-1">
                      x, y, z acceleration in m/s² (including gravity)
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <strong>rotationRate</strong> - DeviceMotionEventRotationRate
                    <div className="text-xs text-muted-foreground mt-1">
                      alpha, beta, gamma rotation rate in °/s
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <strong>interval</strong> - Number
                    <div className="text-xs text-muted-foreground mt-1">
                      Interval in milliseconds between data samples
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Example:</h4>
                <div className="bg-muted p-3 rounded font-mono text-sm">
                  <pre className="whitespace-pre-wrap">{`window.addEventListener('devicemotion', (event) => {
  const accel = event.acceleration;
  const accelWithG = event.accelerationIncludingGravity;
  const rotation = event.rotationRate;

  console.log(\`Accel: \${accel.x}, \${accel.y}, \${accel.z}\`);
  console.log(\`Rotation: \${rotation.alpha}°/s\`);
});`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Coordinate System */}
      <section>
        <h2 id="coordinate-system" className="text-2xl font-semibold mb-4">
          Coordinate System
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Device Axes</CardTitle>
            <CardDescription>
              The device coordinate frame explained
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-3 text-sm">
              <div>
                <strong className="text-blue-500">X-axis:</strong> Runs left to right across the device screen
                <div className="text-xs text-muted-foreground ml-4">
                  Positive toward the right edge
                </div>
              </div>
              <div>
                <strong className="text-green-500">Y-axis:</strong> Runs bottom to top of the device screen
                <div className="text-xs text-muted-foreground ml-4">
                  Positive toward the top edge
                </div>
              </div>
              <div>
                <strong className="text-purple-500">Z-axis:</strong> Perpendicular to the screen
                <div className="text-xs text-muted-foreground ml-4">
                  Positive pointing out from the screen
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                <strong>Alpha (α)</strong>
                <div className="text-xs text-muted-foreground mt-1">
                  Rotation around Z-axis. When device is flat and top points North: 0°
                </div>
              </div>
              <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                <strong>Beta (β)</strong>
                <div className="text-xs text-muted-foreground mt-1">
                  Rotation around X-axis. Device flat: 0°, tilted toward user: positive
                </div>
              </div>
              <div className="bg-purple-500/10 p-3 rounded border border-purple-500/30">
                <strong>Gamma (γ)</strong>
                <div className="text-xs text-muted-foreground mt-1">
                  Rotation around Y-axis. Device flat: 0°, tilted right: positive
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Permission Handling */}
      <section>
        <h2 id="permission" className="text-2xl font-semibold mb-4">
          Permission Handling (iOS)
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Requesting Permission on iOS 13+</CardTitle>
            <CardDescription>
              iOS requires explicit user permission
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Starting with iOS 13 and Safari 13, accessing device orientation and motion data
              requires explicit user permission. The request must be triggered by a user gesture
              (button click).
            </p>

            <div>
              <h4 className="font-semibold mb-2">iOS Permission Request:</h4>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`async function requestPermission() {
  // Check if permission API exists (iOS 13+)
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    try {
      const permission = await DeviceOrientationEvent.requestPermission();

      if (permission === 'granted') {
        // Permission granted - start listening
        window.addEventListener('deviceorientation', handleOrientation);
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.error('Permission request failed:', error);
    }
  } else {
    // Non-iOS or older iOS - no permission needed
    window.addEventListener('deviceorientation', handleOrientation);
  }
}

// Must be called from user gesture
button.addEventListener('click', requestPermission);`}</pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Motion Permission (iOS):</h4>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`// Similar for DeviceMotionEvent
if (typeof DeviceMotionEvent.requestPermission === 'function') {
  const permission = await DeviceMotionEvent.requestPermission();
  if (permission === 'granted') {
    window.addEventListener('devicemotion', handleMotion);
  }
}`}</pre>
              </div>
            </div>

            <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
              <strong>Important:</strong> The permission request must be triggered by a user action
              (click, tap, etc.). Calling it on page load will fail.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Use Cases */}
      <section>
        <h2 id="use-cases" className="text-2xl font-semibold mb-4">
          Common Use Cases
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>1. Mobile Gaming</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Control game characters or objects by tilting the device:
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`window.addEventListener('deviceorientation', (e) => {
  const tiltLR = e.gamma;  // -90 to 90
  const tiltFB = e.beta;   // -180 to 180

  // Move character based on tilt
  player.x += tiltLR / 10;
  player.y += tiltFB / 10;
});`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Augmented Reality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Orient 3D scenes and AR overlays based on device position:
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`window.addEventListener('deviceorientation', (e) => {
  // Update camera orientation
  camera.rotation.x = e.beta * Math.PI / 180;
  camera.rotation.y = e.gamma * Math.PI / 180;
  camera.rotation.z = e.alpha * Math.PI / 180;
});`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Navigation Apps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Orient maps based on compass heading:
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`window.addEventListener(
  'deviceorientationabsolute',
  (e) => {
    const heading = e.alpha;
    map.setBearing(heading);
  }
);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Gesture Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Detect shake gestures for interactions:
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`let lastX = 0, lastY = 0, lastZ = 0;

window.addEventListener('devicemotion', (e) => {
  const accel = e.accelerationIncludingGravity;
  const deltaX = Math.abs(accel.x - lastX);
  const deltaY = Math.abs(accel.y - lastY);
  const deltaZ = Math.abs(accel.z - lastZ);

  if (deltaX + deltaY + deltaZ > 30) {
    console.log('Shake detected!');
    undoLastAction();
  }

  lastX = accel.x;
  lastY = accel.y;
  lastZ = accel.z;
});`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Image Stabilization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Compensate for device shake when capturing images:
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`window.addEventListener('devicemotion', (e) => {
  const rotation = e.rotationRate;

  // Apply counter-rotation to stabilize
  image.style.transform = \`
    rotateX(\${-rotation.beta}deg)
    rotateY(\${-rotation.gamma}deg)
  \`;
});`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Panorama Viewers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Control 360° photo/video viewing with device orientation:
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`window.addEventListener('deviceorientation', (e) => {
  panorama.lookAt({
    lon: e.alpha,
    lat: e.beta
  });
});`}</pre>
              </div>
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
          <CardHeader>
            <CardTitle>Implementation Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">✓ Check for Support</h4>
                <p className="text-muted-foreground mb-2">
                  Always verify that the API is available before using:
                </p>
                <div className="bg-muted p-2 rounded font-mono text-xs">
                  if ('DeviceOrientationEvent' in window) &#123; /* supported */ &#125;
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Handle Permission Properly</h4>
                <p className="text-muted-foreground">
                  On iOS, request permission from a user gesture. Provide clear UI explaining why
                  you need sensor access.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Throttle Event Handlers</h4>
                <p className="text-muted-foreground mb-2">
                  Motion events fire frequently. Use throttling or debouncing for expensive operations:
                </p>
                <div className="bg-muted p-2 rounded font-mono text-xs">
                  let lastUpdate = 0;<br />
                  window.addEventListener('devicemotion', (e) =&gt; &#123;<br />
                  &nbsp;&nbsp;const now = Date.now();<br />
                  &nbsp;&nbsp;if (now - lastUpdate &lt; 100) return;<br />
                  &nbsp;&nbsp;lastUpdate = now;<br />
                  &nbsp;&nbsp;// Process event...<br />
                  &#125;);
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Provide Calibration</h4>
                <p className="text-muted-foreground">
                  Allow users to recalibrate or set a neutral position, especially for games.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Offer Alternative Controls</h4>
                <p className="text-muted-foreground">
                  Don't rely solely on motion controls. Provide keyboard/touch alternatives for
                  accessibility and desktop support.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✓ Clean Up Listeners</h4>
                <p className="text-muted-foreground mb-2">
                  Remove event listeners when no longer needed to save battery:
                </p>
                <div className="bg-muted p-2 rounded font-mono text-xs">
                  window.removeEventListener('deviceorientation', handler);
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">⚠️ Test on Real Devices</h4>
                <p className="text-muted-foreground">
                  Desktop emulators may not accurately simulate motion sensors. Always test on actual
                  mobile devices.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">⚠️ Consider Battery Impact</h4>
                <p className="text-muted-foreground">
                  Continuous sensor access drains battery. Only listen when actively needed.
                </p>
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
            <CardDescription>
              Mobile and desktop browser support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Mobile (Well Supported):</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>iOS Safari 13+ (with permission)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Chrome Android</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Firefox Android</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Samsung Internet</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Desktop (Limited):</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-500 text-xl">△</span>
                    <span>Chrome/Edge (if hardware available)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-500 text-xl">△</span>
                    <span>Firefox (if hardware available)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-red-500 text-xl">✗</span>
                    <span>Most desktops lack motion sensors</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30 text-sm">
                <strong>Note:</strong> The API is widely supported on mobile devices but requires:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>HTTPS (secure context)</li>
                  <li>User permission on iOS 13+</li>
                  <li>Device with gyroscope/accelerometer/magnetometer</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Resources */}
      <section>
        <h2 id="resources" className="text-2xl font-semibold mb-4">
          Resources
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Learn More</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN Web Docs: Device Orientation Events
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events/Detecting_device_orientation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN: Detecting Device Orientation
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events/Orientation_and_motion_data_explained"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN: Orientation and Motion Data Explained
                </a>
              </li>
              <li>
                <a
                  href="https://web.dev/articles/device-orientation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  web.dev: Device Orientation &amp; Motion
                </a>
              </li>
              <li>
                <a
                  href="https://www.w3.org/TR/orientation-event/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  W3C Specification: DeviceOrientation Event
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
