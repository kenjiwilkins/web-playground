import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FontLoadingDemo } from '@/components/demos/FontLoadingDemo'
import { PageHeader } from '@/components/layout/page/PageHeader'
import { PageSection } from '@/components/layout/page/PageSection'
import { InfoBox } from '@/components/layout/page/InfoBox'

export default function FontLoading() {
  return (
    <div className="space-y-6">
      <PageHeader
        id="css-font-loading-api"
        title="CSS Font Loading API"
        description="Programmatically control font loading with JavaScript for better performance and user experience"
      />

      <PageSection id="live-demo" title="Live Demo">
        <FontLoadingDemo />
      </PageSection>

      <PageSection id="introduction" title="Introduction">
        <Card>
          <CardHeader>
            <CardTitle>What is the CSS Font Loading API?</CardTitle>
            <CardDescription>JavaScript control over font resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The CSS Font Loading API provides JavaScript interfaces and events for dynamically loading
              and managing font resources. It allows developers to control when fonts are fetched, loaded,
              and added to a document, overcoming the default lazy-loading behavior of browsers.
            </p>
            <p>
              This API is particularly useful for eliminating FOIT (Flash of Invisible Text) and FOUT (Flash
              of Unstyled Text), improving perceived performance, and creating better loading experiences.
            </p>
            <InfoBox variant="success" title="Excellent Browser Support">
              The CSS Font Loading API has been widely supported since 2020 and is available in all modern browsers,
              including Web Workers.
            </InfoBox>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="main-interfaces" title="Main Interfaces">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>FontFace</CardTitle>
              <CardDescription>Represents a single usable font face</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                The FontFace interface represents a single font face that can be loaded and used in the document.
              </p>
              <div className="bg-muted p-3 rounded-lg space-y-2">
                <code className="text-sm block">const font = new FontFace(</code>
                <code className="text-sm block ml-4">"my-font",</code>
                <code className="text-sm block ml-4">'url("my-font.woff")',</code>
                <code className="text-sm block ml-4">&#123; style: "italic", weight: "400" &#125;</code>
                <code className="text-sm block">);</code>
              </div>
              <p className="text-xs text-muted-foreground">
                Create with font family, source URL, and optional descriptors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FontFaceSet</CardTitle>
              <CardDescription>Accessed via document.fonts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                The FontFaceSet interface manages a collection of font faces and provides methods for loading fonts.
              </p>
              <div className="bg-muted p-3 rounded-lg space-y-2">
                <code className="text-sm block">document.fonts.add(font);</code>
                <code className="text-sm block">document.fonts.load("36px MyFont");</code>
                <code className="text-sm block">await document.fonts.ready;</code>
              </div>
              <p className="text-xs text-muted-foreground">
                Global font registry accessible via document.fonts
              </p>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection id="font-states" title="Font Loading States">
        <Card>
          <CardHeader>
            <CardTitle>FontFace.status Property</CardTitle>
            <CardDescription>Track the current state of font loading</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <span className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">unloaded</span>
                <span className="text-sm">Font definition is valid but not yet loaded</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <span className="text-yellow-600 dark:text-yellow-400 font-mono text-sm font-semibold">loading</span>
                <span className="text-sm">Font file is being downloaded or processed</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <span className="text-green-600 dark:text-green-400 font-mono text-sm font-semibold">loaded</span>
                <span className="text-sm">Font successfully fetched and ready to use</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <span className="text-red-600 dark:text-red-400 font-mono text-sm font-semibold">failed</span>
                <span className="text-sm">Invalid definition or data cannot be loaded</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="loading-fonts" title="Loading Fonts">
        <Card>
          <CardHeader>
            <CardTitle>Methods for Loading Fonts</CardTitle>
            <CardDescription>Different approaches to load fonts programmatically</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Method 1: Load Individual Font</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">const font = new FontFace("MyFont", 'url("font.woff")');</code>
                <code className="block">document.fonts.add(font);</code>
                <code className="block"></code>
                <code className="block">font.load().then(() =&gt; &#123;</code>
                <code className="block ml-4">console.log("Font loaded:", font.status); // "loaded"</code>
                <code className="block">&#125;);</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Method 2: Load via FontFaceSet</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">document.fonts.load("36px MyFont").then((fonts) =&gt; &#123;</code>
                <code className="block ml-4">console.log("Loaded fonts:", fonts);</code>
                <code className="block">&#125;);</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Method 3: Wait for All Fonts</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">document.fonts.ready.then(() =&gt; &#123;</code>
                <code className="block ml-4">console.log("All fonts loaded and layout complete");</code>
                <code className="block">&#125;);</code>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                The ready promise resolves when all fonts are loaded AND layout is complete
              </p>
            </div>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="events" title="Font Loading Events">
        <Card>
          <CardHeader>
            <CardTitle>FontFaceSet Events</CardTitle>
            <CardDescription>Monitor font loading progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <code className="block">document.fonts.addEventListener('loading', (event) =&gt; &#123;</code>
              <code className="block ml-4">console.log(`Loading $&#123;event.fontfaces.length&#125; fonts`);</code>
              <code className="block">&#125;);</code>
              <code className="block"></code>
              <code className="block">document.fonts.addEventListener('loadingdone', (event) =&gt; &#123;</code>
              <code className="block ml-4">console.log(`Loaded $&#123;event.fontfaces.length&#125; fonts`);</code>
              <code className="block ml-4">event.fontfaces.forEach((face) =&gt; &#123;</code>
              <code className="block ml-8">console.log(`  - $&#123;face.family&#125;`);</code>
              <code className="block ml-4">&#125;);</code>
              <code className="block">&#125;);</code>
              <code className="block"></code>
              <code className="block">document.fonts.addEventListener('loadingerror', (event) =&gt; &#123;</code>
              <code className="block ml-4">console.error(`Failed: $&#123;event.fontfaces.length&#125; fonts`);</code>
              <code className="block">&#125;);</code>
            </div>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="use-cases" title="Use Cases">
        <Card>
          <CardHeader>
            <CardTitle>When to Use the Font Loading API</CardTitle>
            <CardDescription>Practical applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex gap-2">
                <span className="text-primary">⚡</span>
                <div>
                  <strong className="text-sm">Eliminate FOIT/FOUT</strong>
                  <p className="text-sm text-muted-foreground">
                    Prevent Flash of Invisible/Unstyled Text
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">🚀</span>
                <div>
                  <strong className="text-sm">Performance Optimization</strong>
                  <p className="text-sm text-muted-foreground">
                    Preload critical fonts before they're needed
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">🎯</span>
                <div>
                  <strong className="text-sm">Conditional Loading</strong>
                  <p className="text-sm text-muted-foreground">
                    Load fonts based on device or user preferences
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">🔄</span>
                <div>
                  <strong className="text-sm">Fallback Management</strong>
                  <p className="text-sm text-muted-foreground">
                    Handle loading failures gracefully
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">📊</span>
                <div>
                  <strong className="text-sm">Analytics</strong>
                  <p className="text-sm text-muted-foreground">
                    Track font loading performance
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">🎨</span>
                <div>
                  <strong className="text-sm">Dynamic Typography</strong>
                  <p className="text-sm text-muted-foreground">
                    Load fonts on-demand for user customization
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="complete-example" title="Complete Example">
        <Card>
          <CardHeader>
            <CardTitle>Loading Custom Fonts</CardTitle>
            <CardDescription>Full working example</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <code className="block">// Create FontFace</code>
              <code className="block">const bitterFont = new FontFace(</code>
              <code className="block ml-4">"Bitter",</code>
              <code className="block ml-4">'url("https://fonts.gstatic.com/.../bitter.woff2")'</code>
              <code className="block">);</code>
              <code className="block"></code>
              <code className="block">// Add to document</code>
              <code className="block">document.fonts.add(bitterFont);</code>
              <code className="block">console.log(bitterFont.status); // "unloaded"</code>
              <code className="block"></code>
              <code className="block">// Load and use</code>
              <code className="block">bitterFont.load().then(() =&gt; &#123;</code>
              <code className="block ml-4">console.log(bitterFont.status); // "loaded"</code>
              <code className="block ml-4"></code>
              <code className="block ml-4">// Now safe to use in canvas or DOM</code>
              <code className="block ml-4">const ctx = canvas.getContext("2d");</code>
              <code className="block ml-4">ctx.font = '36px "Bitter"';</code>
              <code className="block ml-4">ctx.fillText("Custom font!", 20, 50);</code>
              <code className="block">&#125;);</code>
            </div>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="best-practices" title="Best Practices">
        <Card>
          <CardHeader>
            <CardTitle>Guidelines for Using the API</CardTitle>
            <CardDescription>Recommendations for optimal implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Preload critical fonts</strong> - Load fonts needed for above-the-fold content early
              </li>
              <li>
                <strong>Use font-display CSS</strong> - Combine with font-display: swap for better UX
              </li>
              <li>
                <strong>Handle errors gracefully</strong> - Always provide fallback fonts
              </li>
              <li>
                <strong>Monitor loading state</strong> - Use events to track progress and show loading UI
              </li>
              <li>
                <strong>Avoid blocking render</strong> - Load non-critical fonts asynchronously
              </li>
              <li>
                <strong>Cache fonts locally</strong> - Leverage browser caching for better performance
              </li>
              <li>
                <strong>Use subset fonts</strong> - Only include characters you need to reduce file size
              </li>
              <li>
                <strong>Test across browsers</strong> - Verify font loading behavior in all target browsers
              </li>
            </ol>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="browser-support" title="Browser Support">
        <Card>
          <CardHeader>
            <CardTitle>Excellent Cross-Browser Support</CardTitle>
            <CardDescription>Available since January 2020</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Chrome/Edge</strong> - Supported since Chrome 35 (2014)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Firefox</strong> - Supported since Firefox 41 (2015)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Safari</strong> - Supported since Safari 10 (2016)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Web Workers</strong> - API is also available in Web Workers
                </div>
              </div>
            </div>
            <InfoBox variant="success" title="Production Ready" className="mt-4">
              The CSS Font Loading API is stable and widely supported. It's safe to use in production
              for all modern web applications.
            </InfoBox>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection id="important-notes" title="Important Notes">
        <Card>
          <CardHeader>
            <CardTitle>Key Considerations</CardTitle>
            <CardDescription>What to keep in mind</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">ℹ</span>
                <div>
                  <strong>Binary sources</strong> - Fonts from ArrayBuffer are automatically loaded if valid
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">ℹ</span>
                <div>
                  <strong>URL sources</strong> - Fonts from URLs are validated but not automatically loaded
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">ℹ</span>
                <div>
                  <strong>Must be added</strong> - Fonts must be added to FontFaceSet before use
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">ℹ</span>
                <div>
                  <strong>Ready promise</strong> - Resolves only when fonts are loaded AND layout is complete
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">ℹ</span>
                <div>
                  <strong>Idempotent loading</strong> - Loading an already-loaded font has no effect
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </PageSection>
    </div>
  )
}
