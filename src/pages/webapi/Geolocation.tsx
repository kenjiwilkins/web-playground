import { GeolocationDemo } from '@/components/demos/GeolocationDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Geolocation() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="geolocation-api" className="text-3xl font-bold tracking-tight">
          Geolocation API
        </h1>
        <p className="text-muted-foreground">
          Access the user's geographical location with their permission. Enables location-based
          services, mapping, and personalized content delivery.
        </p>
      </div>

      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <GeolocationDemo />
      </section>

      <section>
        <h2 id="overview" className="text-2xl font-semibold mb-4">
          Overview
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What is the Geolocation API?</CardTitle>
            <CardDescription>
              Access device location data with user consent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The Geolocation API provides web applications with access to geographical location
              information about the user's device. Location data can come from GPS, Wi-Fi networks,
              cell towers, or IP addresses. The API requires explicit user permission and only works
              in secure contexts (HTTPS).
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold">Key Features:</h3>
              <ul className="space-y-1 text-sm list-disc list-inside">
                <li>One-time position retrieval with getCurrentPosition()</li>
                <li>Continuous position tracking with watchPosition()</li>
                <li>Latitude, longitude, and accuracy information</li>
                <li>Optional altitude, heading, and speed data</li>
                <li>Configurable accuracy and timeout settings</li>
                <li>User permission required for all location access</li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
              <strong>Privacy:</strong> The Geolocation API is privacy-sensitive. Users must explicitly
              grant permission, and browsers may show indicators when location is being accessed.
              Always respect user privacy and only request location when necessary.
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="core-methods" className="text-2xl font-semibold mb-4">
          Core Methods
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>getCurrentPosition()</CardTitle>
              <CardDescription>Get current location once</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded font-mono text-sm mb-3">
                <pre className="whitespace-pre-wrap">{`navigator.geolocation.getCurrentPosition(
  successCallback,
  errorCallback,
  options
);`}</pre>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Retrieves the device's current position asynchronously. Useful for one-time
                location requests like "find nearby restaurants."
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(\`Lat: \${position.coords.latitude}\`);
    console.log(\`Lng: \${position.coords.longitude}\`);
  }
);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>watchPosition()</CardTitle>
              <CardDescription>Track location changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded font-mono text-sm mb-3">
                <pre className="whitespace-pre-wrap">{`const watchId = navigator.geolocation.watchPosition(
  successCallback,
  errorCallback,
  options
);`}</pre>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Registers a callback that fires whenever the device's position changes. Returns a
                watch ID that can be used to stop tracking.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`const watchId = navigator.geolocation.watchPosition(
  (position) => {
    updateMap(position.coords);
  }
);

// Stop watching
navigator.geolocation.clearWatch(watchId);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>clearWatch()</CardTitle>
              <CardDescription>Stop tracking position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded font-mono text-sm mb-3">
                <pre className="whitespace-pre-wrap">{`navigator.geolocation.clearWatch(watchId);`}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                Unregisters the position change handler specified by the watch ID. Always call this
                when you no longer need position updates to conserve battery.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Options Object</CardTitle>
              <CardDescription>Configure position retrieval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded font-mono text-xs mb-3">
                <pre className="whitespace-pre-wrap">{`const options = {
  enableHighAccuracy: true,  // Use GPS
  timeout: 10000,            // Max wait (ms)
  maximumAge: 0              // Cache duration
};`}</pre>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>enableHighAccuracy:</strong> Request GPS positioning (more accurate but slower, more battery)
                </div>
                <div>
                  <strong>timeout:</strong> Maximum time to wait for position (milliseconds)
                </div>
                <div>
                  <strong>maximumAge:</strong> Accept cached position up to this age (milliseconds)
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="position-data" className="text-2xl font-semibold mb-4">
          Position Data Structure
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>GeolocationPosition Object</CardTitle>
              <CardDescription>Data returned by success callback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`interface GeolocationPosition {
  coords: GeolocationCoordinates;
  timestamp: number;
}`}</pre>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">GeolocationCoordinates Properties:</h3>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                    <code className="bg-muted px-2 py-1 rounded">latitude</code>
                    <span>Latitude in decimal degrees (always available)</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                    <code className="bg-muted px-2 py-1 rounded">longitude</code>
                    <span>Longitude in decimal degrees (always available)</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                    <code className="bg-muted px-2 py-1 rounded">accuracy</code>
                    <span>Accuracy in meters (always available, 95% confidence)</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                    <code className="bg-muted px-2 py-1 rounded">altitude</code>
                    <span>Height in meters above sea level (may be null)</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                    <code className="bg-muted px-2 py-1 rounded">altitudeAccuracy</code>
                    <span>Altitude accuracy in meters (may be null)</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                    <code className="bg-muted px-2 py-1 rounded">heading</code>
                    <span>Direction of travel in degrees (0-360, may be null)</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2 items-start">
                    <code className="bg-muted px-2 py-1 rounded">speed</code>
                    <span>Speed in meters per second (may be null)</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30 text-sm">
                <strong>Note:</strong> Only latitude, longitude, and accuracy are guaranteed. Other
                properties depend on device capabilities and may be null.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="error-handling" className="text-2xl font-semibold mb-4">
          Error Handling
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>GeolocationPositionError</CardTitle>
            <CardDescription>Handling location request failures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-3 rounded font-mono text-sm">
              <pre className="whitespace-pre-wrap">{`navigator.geolocation.getCurrentPosition(
  successCallback,
  (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('User denied permission');
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('Position unavailable');
        break;
      case error.TIMEOUT:
        console.log('Request timed out');
        break;
    }
  }
);`}</pre>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Error Codes:</h3>
              <div className="grid gap-3">
                <div className="bg-red-500/10 p-3 rounded border border-red-500/30">
                  <div className="font-semibold text-sm mb-1">PERMISSION_DENIED (1)</div>
                  <div className="text-xs text-muted-foreground">
                    User denied the geolocation permission request. Show UI to guide users to browser settings.
                  </div>
                </div>
                <div className="bg-orange-500/10 p-3 rounded border border-orange-500/30">
                  <div className="font-semibold text-sm mb-1">POSITION_UNAVAILABLE (2)</div>
                  <div className="text-xs text-muted-foreground">
                    Device cannot determine position. May be due to network issues or disabled location services.
                  </div>
                </div>
                <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30">
                  <div className="font-semibold text-sm mb-1">TIMEOUT (3)</div>
                  <div className="text-xs text-muted-foreground">
                    Request took longer than the specified timeout. Try increasing the timeout value.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="permissions" className="text-2xl font-semibold mb-4">
          Permissions & Security
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Model</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                The Geolocation API requires explicit user permission. Browsers prompt users when
                location is first requested and remember the user's choice.
              </p>

              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`// Check permission status
const result = await navigator.permissions.query({
  name: 'geolocation'
});

console.log(result.state);
// 'granted', 'denied', or 'prompt'

// Listen for permission changes
result.addEventListener('change', () => {
  console.log('Permission changed:', result.state);
});`}</pre>
              </div>

              <div className="space-y-2">
                <div className="text-sm">
                  <strong>Permission States:</strong>
                </div>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li><strong>granted:</strong> User has allowed location access</li>
                  <li><strong>denied:</strong> User has blocked location access</li>
                  <li><strong>prompt:</strong> Browser will ask for permission</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>HTTPS Requirement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                The Geolocation API only works in secure contexts (HTTPS). This protects users from
                location tracking by malicious sites over insecure connections.
              </p>
              <div className="bg-red-500/10 p-3 rounded border border-red-500/30 text-sm">
                <strong>Exception:</strong> localhost is considered secure for development purposes.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permissions Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Control geolocation access for embedded iframes using the Permissions Policy:
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`<!-- Allow geolocation in iframe -->
<iframe
  src="https://example.com/map"
  allow="geolocation"
></iframe>

<!-- HTTP Header -->
Permissions-Policy: geolocation=(self "https://maps.example.com")`}</pre>
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
              <CardTitle>Location-Based Search</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Show nearby restaurants, stores, or services based on user location. Automatically
                populate location fields in search forms.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`navigator.geolocation.getCurrentPosition(
  (pos) => {
    searchNearby(pos.coords.latitude, pos.coords.longitude);
  }
);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Real-Time Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Track user movement for turn-by-turn directions, fitness tracking, or delivery
                tracking applications.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`const watchId = navigator.geolocation.watchPosition(
  (pos) => {
    updateRoute(pos.coords);
  },
  null,
  { enableHighAccuracy: true }
);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Geofencing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Trigger actions when users enter or leave specific geographic areas. Useful for
                location-based notifications and check-ins.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`function checkGeofence(lat, lng, fence) {
  const distance = calculateDistance(lat, lng, fence);
  if (distance < fence.radius) {
    triggerNotification();
  }
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weather & Local Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Display location-specific weather, news, events, or advertisements. Personalize
                content based on geographic region.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`navigator.geolocation.getCurrentPosition(
  async (pos) => {
    const weather = await fetchWeather(
      pos.coords.latitude,
      pos.coords.longitude
    );
    displayWeather(weather);
  }
);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Asset Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Track company vehicles, delivery packages, or field service personnel. Monitor
                location for fleet management.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`setInterval(() => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      sendLocationToServer(pos.coords);
    }
  );
}, 60000); // Update every minute`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Check-Ins</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Allow users to share their location, tag posts with locations, or find friends nearby.
                Common in social media applications.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre-wrap">{`function checkIn() {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      postToSocial({
        message: "Checked in!",
        location: pos.coords
      });
    }
  );
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="best-practices" className="text-2xl font-semibold mb-4">
          Best Practices
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Request Permission at the Right Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Don't request location permission immediately on page load. Wait for user interaction
                and explain why you need location access.
              </p>
              <div className="bg-green-500/10 p-3 rounded border border-green-500/30 text-sm">
                <strong>✅ Good:</strong> Show "Find Nearby Stores" button that requests permission when clicked
              </div>
              <div className="bg-red-500/10 p-3 rounded border border-red-500/30 text-sm">
                <strong>❌ Bad:</strong> Request permission automatically on page load without context
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Handle All Error Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Always provide error callbacks and handle all three error types. Provide helpful
                messages guiding users on how to resolve issues.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`navigator.geolocation.getCurrentPosition(
  successCallback,
  (error) => {
    if (error.code === error.PERMISSION_DENIED) {
      showMessage('Please enable location in browser settings');
    } else if (error.code === error.POSITION_UNAVAILABLE) {
      showMessage('Unable to determine your location');
    } else if (error.code === error.TIMEOUT) {
      showMessage('Location request timed out, please try again');
    }
  }
);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Choose Appropriate Accuracy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Use <code className="bg-muted px-1">enableHighAccuracy: true</code> only when necessary.
                High accuracy uses GPS which is slower and drains battery faster.
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>High accuracy:</strong> Navigation, fitness tracking, precise mapping
                </div>
                <div>
                  <strong>Normal accuracy:</strong> Nearby search, weather, general location services
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stop Watching When Not Needed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Always call <code className="bg-muted px-1">clearWatch()</code> when you no longer need
                position updates. Continuous tracking consumes significant battery power.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`// Stop watching when user leaves the page
window.addEventListener('beforeunload', () => {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
  }
});`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Provide Fallback Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Allow users to manually enter their location if automatic detection fails or if they
                deny permission. Don't make your app unusable without geolocation.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`<button onClick={getLocation}>Use My Location</button>
<input type="text" placeholder="Or enter city name" />`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cache Position Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Use the <code className="bg-muted px-1">maximumAge</code> option to accept cached
                positions when real-time accuracy isn't critical. This improves performance and reduces battery usage.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`// Accept position up to 5 minutes old
navigator.geolocation.getCurrentPosition(
  successCallback,
  errorCallback,
  { maximumAge: 300000 }
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
            <CardDescription>Geolocation API support across browsers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-sm mb-2">Desktop Browsers</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Chrome 5+ ✅</li>
                  <li>Edge 12+ ✅</li>
                  <li>Firefox 3.5+ ✅</li>
                  <li>Safari 5+ ✅</li>
                  <li>Opera 16+ ✅</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">Mobile Browsers</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Chrome Android 18+ ✅</li>
                  <li>Firefox Android 4+ ✅</li>
                  <li>Safari iOS 3.2+ ✅</li>
                  <li>Samsung Internet 1.0+ ✅</li>
                  <li>Opera Mobile 16+ ✅</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 p-3 rounded border border-green-500/30 text-sm">
              <strong>Baseline:</strong> Widely available across all modern and many legacy browsers.
              One of the most broadly supported Web APIs.
            </div>

            <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm">
              <strong>China Note:</strong> Geolocation may be unavailable or inaccurate in China due to
              government restrictions. Consider using local location providers like Baidu Maps,
              Autonavi, or Tencent Maps for Chinese users.
            </div>
          </CardContent>
        </Card>
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
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN: Geolocation API Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN: getCurrentPosition() Reference
                </a>
              </li>
              <li>
                <a
                  href="https://w3c.github.io/geolocation-api/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  W3C Geolocation API Specification
                </a>
              </li>
              <li>
                <a
                  href="https://caniuse.com/geolocation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Can I Use: Geolocation API
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
