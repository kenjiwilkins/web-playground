import { FullscreenDemo } from '@/components/demos/FullscreenDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/page/PageHeader'
import { PageSection } from '@/components/layout/page/PageSection'
import { InfoBox } from '@/components/layout/page/InfoBox'

export default function Fullscreen() {
  return (
    <div className="space-y-6">
      <PageHeader
        id="fullscreen-api"
        title="Fullscreen API"
        description="Make any element (images, videos, games, presentations) occupy the entire screen, hiding browser UI for an immersive experience."
      />

      <PageSection id="live-demo" title="Live Demo">
        <FullscreenDemo />
      </PageSection>

      <PageSection id="overview" title="Overview">
        <Card>
          <CardHeader>
            <CardTitle>What is the Fullscreen API?</CardTitle>
            <CardDescription>
              Control fullscreen display mode for web content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The Fullscreen API allows web applications to display any element in fullscreen mode,
              taking over the entire screen and hiding browser controls, toolbars, and other UI elements.
              This creates an immersive experience perfect for videos, games, presentations, and interactive content.
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold">Key Features:</h3>
              <ul className="space-y-1 text-sm list-disc list-inside">
                <li>Display any HTML element in fullscreen</li>
                <li>Hide browser UI for immersive experiences</li>
                <li>Automatic keyboard shortcuts (ESC to exit)</li>
                <li>Event listeners for fullscreen state changes</li>
                <li>CSS pseudo-classes for styling fullscreen content</li>
                <li>Security controls via Permissions Policy</li>
              </ul>
            </div>

            <InfoBox variant="info" title="Security">
              Fullscreen mode requires user interaction (click, tap) and
              can only be triggered by user gestures. Websites cannot force fullscreen mode without user action.
            </InfoBox>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="core-methods" title="Core Methods & Properties">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Element.requestFullscreen()</CardTitle>
              <CardDescription>Request fullscreen mode</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded font-mono text-sm mb-3">
                <pre className="whitespace-pre-wrap">{`const element = document.getElementById('video');
await element.requestFullscreen();`}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                Makes the specified element display in fullscreen mode. Returns a Promise that
                resolves when fullscreen is entered.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document.exitFullscreen()</CardTitle>
              <CardDescription>Exit fullscreen mode</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded font-mono text-sm mb-3">
                <pre className="whitespace-pre-wrap">{`await document.exitFullscreen();`}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                Exits fullscreen mode and returns the document to normal viewing. Called on the
                document object, not the element.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document.fullscreenElement</CardTitle>
              <CardDescription>Get current fullscreen element</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded font-mono text-sm mb-3">
                <pre className="whitespace-pre-wrap">{`const fsElement = document.fullscreenElement;
if (fsElement) {
  console.log('In fullscreen:', fsElement);
}`}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                Returns the element currently displayed in fullscreen, or null if not in fullscreen mode.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document.fullscreenEnabled</CardTitle>
              <CardDescription>Check if fullscreen is available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded font-mono text-sm mb-3">
                <pre className="whitespace-pre-wrap">{`if (document.fullscreenEnabled) {
  // Fullscreen is available
} else {
  // Fullscreen is disabled
}`}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                Boolean property indicating whether fullscreen mode is available and enabled.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection id="events" title="Fullscreen Events">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>fullscreenchange Event</CardTitle>
              <CardDescription>Fired when fullscreen state changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded font-mono text-sm mb-3">
                <pre className="whitespace-pre-wrap">{`document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    console.log('Entered fullscreen mode');
  } else {
    console.log('Exited fullscreen mode');
  }
});`}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                Triggered whenever the browser enters or exits fullscreen mode. Listen on the
                document to track all fullscreen changes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>fullscreenerror Event</CardTitle>
              <CardDescription>Fired when fullscreen request fails</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded font-mono text-sm mb-3">
                <pre className="whitespace-pre-wrap">{`document.addEventListener('fullscreenerror', (event) => {
  console.error('Failed to enter fullscreen:', event);
  // Handle error - show message to user
});`}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                Triggered when an attempt to enter fullscreen mode fails. Common causes include
                lack of user gesture, permissions policy restrictions, or browser limitations.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection id="css-styling" title="CSS Styling for Fullscreen">
        <Card>
          <CardHeader>
            <CardTitle>Fullscreen Pseudo-classes</CardTitle>
            <CardDescription>Style elements in fullscreen mode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">:fullscreen Pseudo-class</h3>
              <div className="bg-muted p-3 rounded font-mono text-sm mb-2">
                <pre className="whitespace-pre-wrap">{`/* Style the element when in fullscreen */
.video-player:fullscreen {
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Style child elements when parent is fullscreen */
.video-player:fullscreen .controls {
  position: absolute;
  bottom: 20px;
  width: 100%;
}`}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                The :fullscreen pseudo-class matches any element currently displayed in fullscreen mode.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">::backdrop Pseudo-element</h3>
              <div className="bg-muted p-3 rounded font-mono text-sm mb-2">
                <pre className="whitespace-pre-wrap">{`/* Style the backdrop behind fullscreen element */
.video-player::backdrop {
  background: rgba(0, 0, 0, 0.9);
}

.image-gallery::backdrop {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
}`}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                The ::backdrop pseudo-element styles the layer behind the fullscreen element,
                which covers the rest of the viewport.
              </p>
            </div>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="use-cases" title="Common Use Cases">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Video Players</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The most common use case. Fullscreen mode provides an immersive viewing experience
                for video content, hiding browser UI and maximizing the video player.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs mt-3">
                <pre className="whitespace-pre-wrap">{`videoPlayer.addEventListener('dblclick', () => {
  videoPlayer.requestFullscreen();
});`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Games</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Browser games use fullscreen to create immersive gaming experiences, utilizing
                the entire screen for gameplay and hiding browser controls.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs mt-3">
                <pre className="whitespace-pre-wrap">{`startGameBtn.onclick = async () => {
  await gameCanvas.requestFullscreen();
  startGame();
};`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Presentations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Web-based presentation tools use fullscreen to display slides without browser UI,
                creating a professional presentation experience.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs mt-3">
                <pre className="whitespace-pre-wrap">{`presentBtn.onclick = () => {
  slideContainer.requestFullscreen();
  startPresentation();
};`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Image Galleries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Photo galleries and lightboxes use fullscreen to display high-resolution images,
                allowing users to focus on the image without distractions.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs mt-3">
                <pre className="whitespace-pre-wrap">{`image.onclick = () => {
  imageViewer.requestFullscreen();
  displayImage(image);
};`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Visualizations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Complex charts, graphs, and dashboards benefit from fullscreen mode, giving users
                more space to analyze data and interact with visualizations.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs mt-3">
                <pre className="whitespace-pre-wrap">{`expandBtn.onclick = () => {
  dashboard.requestFullscreen();
};`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Virtual/Augmented Reality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                WebXR experiences often require fullscreen mode for proper immersion and to
                maximize the viewport for VR/AR content rendering.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-xs mt-3">
                <pre className="whitespace-pre-wrap">{`enterVRBtn.onclick = async () => {
  await canvas.requestFullscreen();
  initVRSession();
};`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection id="best-practices" title="Best Practices">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>User Interaction Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Fullscreen requests must be triggered by a user gesture (click, tap, key press).
                Calling requestFullscreen() without user interaction will fail.
              </p>
              <InfoBox variant="success">
                <strong>✅ Good:</strong>
                <div className="bg-muted p-2 rounded font-mono text-xs mt-2">
                  <pre className="whitespace-pre-wrap">{`button.onclick = () => {
  element.requestFullscreen();
};`}</pre>
                </div>
              </InfoBox>
              <InfoBox variant="error">
                <strong>❌ Bad:</strong>
                <div className="bg-muted p-2 rounded font-mono text-xs mt-2">
                  <pre className="whitespace-pre-wrap">{`// This will fail - no user gesture
setTimeout(() => {
  element.requestFullscreen();
}, 1000);`}</pre>
                </div>
              </InfoBox>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Provide Exit Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Always inform users how to exit fullscreen mode. While ESC works by default,
                provide visual cues and alternative exit methods.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`<div className="fullscreen-notice">
  Press ESC to exit fullscreen
  <button onClick={exitFullscreen}>Exit</button>
</div>`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Handle Fullscreen Changes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Always listen for fullscreenchange events to update UI state. Users can exit
                fullscreen via ESC key without triggering your exit function.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`document.addEventListener('fullscreenchange', () => {
  const isFullscreen = !!document.fullscreenElement;
  updateUIState(isFullscreen);

  // Update button text/icon
  toggleBtn.textContent = isFullscreen
    ? 'Exit Fullscreen'
    : 'Enter Fullscreen';
});`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Detection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Check if fullscreen is supported and enabled before using the API. Some browsers
                or contexts may disable fullscreen functionality.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`if (document.fullscreenEnabled) {
  // Fullscreen is available
  showFullscreenButton();
} else {
  // Fullscreen is not available
  hideFullscreenButton();
  console.warn('Fullscreen not supported');
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error Handling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Always handle potential errors when requesting fullscreen. The request may fail
                due to permissions, browser policies, or user denial.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`try {
  await element.requestFullscreen();
  console.log('Entered fullscreen');
} catch (error) {
  console.error('Fullscreen request failed:', error);
  showErrorMessage('Unable to enter fullscreen');
}

// Also listen for error events
document.addEventListener('fullscreenerror', () => {
  showErrorMessage('Fullscreen request denied');
});`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsive Fullscreen Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Design fullscreen content to work at any screen size. Users may have different
                display resolutions and aspect ratios.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`.player:fullscreen {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Maintain aspect ratio */
.player:fullscreen video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection id="browser-support" title="Browser Support">
        <Card>
          <CardHeader>
            <CardTitle>Compatibility</CardTitle>
            <CardDescription>Fullscreen API support across browsers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-sm mb-2">Desktop Browsers</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Chrome 71+ ✅</li>
                  <li>Edge 79+ ✅</li>
                  <li>Firefox 64+ ✅</li>
                  <li>Safari 16.4+ ✅</li>
                  <li>Opera 58+ ✅</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">Mobile Browsers</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Chrome Android 123+ ✅</li>
                  <li>Firefox Android 124+ ✅</li>
                  <li>Safari iOS 16.4+ ✅</li>
                  <li>Samsung Internet 14.0+ ✅</li>
                </ul>
              </div>
            </div>

            <InfoBox variant="info" title="Note">
              The Fullscreen API is widely supported in all modern browsers.
              Older vendor-prefixed versions (webkit, moz) have been deprecated.
            </InfoBox>

            <InfoBox variant="warning" title="Mobile Considerations">
              On some mobile devices, fullscreen behavior
              may differ. Always test on target devices and provide fallback UI.
            </InfoBox>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="security-privacy" title="Security & Privacy">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Permissions Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Fullscreen can be controlled using the Permissions Policy (formerly Feature Policy).
                This allows you to enable or disable fullscreen for embedded iframes.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`<!-- Allow fullscreen in iframe -->
<iframe
  src="https://example.com/video"
  allow="fullscreen"
></iframe>

<!-- HTTP Header -->
Permissions-Policy: fullscreen=(self "https://trusted.com")`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Users always have control over fullscreen mode:
              </p>
              <ul className="space-y-1 text-sm list-disc list-inside">
                <li>ESC key always exits fullscreen</li>
                <li>Browser UI warnings may appear</li>
                <li>Can only be triggered by user gestures</li>
                <li>Users can disable fullscreen in browser settings</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keyboard Lock Consideration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                When combining fullscreen with the Keyboard Lock API (for games), ensure users
                can always exit. Document the exit method clearly.
              </p>
              <InfoBox variant="warning" title="Important">
                Never trap users in fullscreen mode without clear exit instructions.
              </InfoBox>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection id="resources" title="Additional Resources">
        <Card>
          <CardHeader>
            <CardTitle>Learn More</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN: Fullscreen API Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MDN: Element.requestFullscreen()
                </a>
              </li>
              <li>
                <a
                  href="https://fullscreen.spec.whatwg.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  WHATWG Fullscreen API Specification
                </a>
              </li>
              <li>
                <a
                  href="https://caniuse.com/fullscreen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Can I Use: Fullscreen API
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </PageSection>
    </div>
  )
}
