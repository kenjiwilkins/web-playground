import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CustomHighlightDemo } from '@/components/demos/CustomHighlightDemo'

export default function CustomHighlight() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="css-custom-highlight-api" className="text-3xl font-bold tracking-tight">
          CSS Custom Highlight API
        </h1>
        <p className="text-muted-foreground">
          Style arbitrary text ranges programmatically without modifying the DOM
        </p>
      </div>

      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <CustomHighlightDemo />
      </section>

      <section>
        <h2 id="introduction" className="text-2xl font-semibold mb-4">
          Introduction
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What is the CSS Custom Highlight API?</CardTitle>
            <CardDescription>Programmatic text range styling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The CSS Custom Highlight API provides a mechanism for styling arbitrary text ranges
              on a document without modifying the underlying DOM structure. It extends the concept
              of browser-defined highlight pseudo-elements (like <code className="text-sm bg-muted px-1 rounded">::selection</code>) by allowing developers to programmatically
              create and style custom highlights.
            </p>
            <p>
              This API is particularly useful for implementing features like search result highlighting,
              spell checking, syntax highlighting, and collaborative editing where multiple users' selections
              need to be displayed simultaneously.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Modern Browser Feature</p>
              <p className="text-sm">
                The CSS Custom Highlight API is a modern feature with growing browser support.
                Check browser compatibility before using in production.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="how-it-works" className="text-2xl font-semibold mb-4">
          How It Works
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Four-Step Process</CardTitle>
            <CardDescription>Creating and styling custom highlights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">1. Create Range Objects</p>
              <p className="text-sm mb-2">
                Define the text ranges you want to highlight using the standard Range API.
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">const range = new Range();</code>
                <code className="block">const textNode = element.firstChild;</code>
                <code className="block">range.setStart(textNode, 10);</code>
                <code className="block">range.setEnd(textNode, 20);</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">2. Create Highlight Objects</p>
              <p className="text-sm mb-2">
                Group one or more ranges into a Highlight object.
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">const highlight = new Highlight(range1, range2, range3);</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">3. Register in HighlightRegistry</p>
              <p className="text-sm mb-2">
                Add the highlight to the global registry with a custom identifier.
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">CSS.highlights.set('search-results', highlight);</code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">4. Style with CSS</p>
              <p className="text-sm mb-2">
                Use the ::highlight() pseudo-element to apply styles.
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">::highlight(search-results) &#123;</code>
                <code className="block ml-4">background-color: yellow;</code>
                <code className="block ml-4">color: black;</code>
                <code className="block">&#125;</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="main-apis" className="text-2xl font-semibold mb-4">
          Main APIs
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Highlight Interface</CardTitle>
              <CardDescription>Collection of ranges to style together</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                The Highlight interface represents a collection of Range objects that should
                be styled together as a single unit.
              </p>
              <div className="bg-muted p-3 rounded-lg space-y-2">
                <code className="text-sm block">// Create with ranges</code>
                <code className="text-sm block">const hl = new Highlight(range1, range2);</code>
                <code className="text-sm block"></code>
                <code className="text-sm block">// Add/delete ranges</code>
                <code className="text-sm block">hl.add(range3);</code>
                <code className="text-sm block">hl.delete(range1);</code>
                <code className="text-sm block">hl.clear();</code>
              </div>
              <p className="text-xs text-muted-foreground">
                Highlight implements a Set-like interface for managing ranges
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>HighlightRegistry</CardTitle>
              <CardDescription>Global registry (CSS.highlights)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                The HighlightRegistry is accessible via <code className="text-sm bg-muted px-1 rounded">CSS.highlights</code> and
                manages all custom highlights on the page.
              </p>
              <div className="bg-muted p-3 rounded-lg space-y-2">
                <code className="text-sm block">// Register highlight</code>
                <code className="text-sm block">CSS.highlights.set('name', hl);</code>
                <code className="text-sm block"></code>
                <code className="text-sm block">// Remove highlight</code>
                <code className="text-sm block">CSS.highlights.delete('name');</code>
                <code className="text-sm block"></code>
                <code className="text-sm block">// Clear all</code>
                <code className="text-sm block">CSS.highlights.clear();</code>
              </div>
              <p className="text-xs text-muted-foreground">
                Implements a Map-like interface
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="pseudo-element" className="text-2xl font-semibold mb-4">
          The ::highlight() Pseudo-Element
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Styling Custom Highlights</CardTitle>
            <CardDescription>CSS selector for registered highlights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The <code className="bg-muted px-1 rounded">::highlight()</code> pseudo-element allows
              you to style text ranges that have been registered in the HighlightRegistry.
            </p>
            <div>
              <p className="font-semibold mb-2 text-sm">Syntax</p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <code className="block">::highlight(custom-highlight-name) &#123;</code>
                <code className="block ml-4">/* Allowed properties */</code>
                <code className="block ml-4">background-color: yellow;</code>
                <code className="block ml-4">color: black;</code>
                <code className="block ml-4">text-decoration: underline;</code>
                <code className="block ml-4">text-shadow: 1px 1px 2px rgba(0,0,0,0.3);</code>
                <code className="block">&#125;</code>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Allowed CSS Properties</p>
              <p className="text-sm">
                Only certain CSS properties can be used with ::highlight():
              </p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>color</li>
                <li>background-color</li>
                <li>text-decoration and related properties</li>
                <li>text-shadow</li>
                <li>-webkit-text-fill-color</li>
                <li>-webkit-text-stroke-color</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="use-cases" className="text-2xl font-semibold mb-4">
          Use Cases
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>When to Use the CSS Custom Highlight API</CardTitle>
            <CardDescription>Practical applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex gap-2">
                <span className="text-primary">🔍</span>
                <div>
                  <strong className="text-sm">Search Results</strong>
                  <p className="text-sm text-muted-foreground">
                    Highlight all occurrences of search terms in documents
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">✏️</span>
                <div>
                  <strong className="text-sm">Spell/Grammar Checking</strong>
                  <p className="text-sm text-muted-foreground">
                    Mark spelling or grammar errors with underlines
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">💻</span>
                <div>
                  <strong className="text-sm">Syntax Highlighting</strong>
                  <p className="text-sm text-muted-foreground">
                    Color code syntax in code editors
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">👥</span>
                <div>
                  <strong className="text-sm">Collaborative Editing</strong>
                  <p className="text-sm text-muted-foreground">
                    Show multiple users' selections in different colors
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">📝</span>
                <div>
                  <strong className="text-sm">Text Annotations</strong>
                  <p className="text-sm text-muted-foreground">
                    Highlight important passages in documents
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">🎯</span>
                <div>
                  <strong className="text-sm">Focus Indicators</strong>
                  <p className="text-sm text-muted-foreground">
                    Draw attention to specific text sections
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="complete-example" className="text-2xl font-semibold mb-4">
          Complete Example
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Search Highlighting Implementation</CardTitle>
            <CardDescription>Full working example</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">JavaScript</p>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <code className="block">const searchInput = document.querySelector('#search');</code>
                <code className="block">const article = document.querySelector('article');</code>
                <code className="block"></code>
                <code className="block">searchInput.addEventListener('input', () =&gt; &#123;</code>
                <code className="block ml-4">// Clear previous highlights</code>
                <code className="block ml-4">CSS.highlights.clear();</code>
                <code className="block"></code>
                <code className="block ml-4">const query = searchInput.value.trim().toLowerCase();</code>
                <code className="block ml-4">if (!query) return;</code>
                <code className="block"></code>
                <code className="block ml-4">// Create TreeWalker to find text nodes</code>
                <code className="block ml-4">const walker = document.createTreeWalker(</code>
                <code className="block ml-8">article,</code>
                <code className="block ml-8">NodeFilter.SHOW_TEXT</code>
                <code className="block ml-4">);</code>
                <code className="block"></code>
                <code className="block ml-4">const ranges = [];</code>
                <code className="block ml-4">let node;</code>
                <code className="block"></code>
                <code className="block ml-4">while (node = walker.nextNode()) &#123;</code>
                <code className="block ml-8">const text = node.textContent.toLowerCase();</code>
                <code className="block ml-8">let startPos = 0;</code>
                <code className="block"></code>
                <code className="block ml-8">while (startPos &lt; text.length) &#123;</code>
                <code className="block ml-12">const index = text.indexOf(query, startPos);</code>
                <code className="block ml-12">if (index === -1) break;</code>
                <code className="block"></code>
                <code className="block ml-12">const range = new Range();</code>
                <code className="block ml-12">range.setStart(node, index);</code>
                <code className="block ml-12">range.setEnd(node, index + query.length);</code>
                <code className="block ml-12">ranges.push(range);</code>
                <code className="block"></code>
                <code className="block ml-12">startPos = index + query.length;</code>
                <code className="block ml-8">&#125;</code>
                <code className="block ml-4">&#125;</code>
                <code className="block"></code>
                <code className="block ml-4">// Create and register highlight</code>
                <code className="block ml-4">const highlight = new Highlight(...ranges);</code>
                <code className="block ml-4">CSS.highlights.set('search-results', highlight);</code>
                <code className="block">&#125;);</code>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">CSS</p>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <code className="block">::highlight(search-results) &#123;</code>
                <code className="block ml-4">background-color: #ff0;</code>
                <code className="block ml-4">color: #000;</code>
                <code className="block ml-4">text-decoration: underline;</code>
                <code className="block">&#125;</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="advantages" className="text-2xl font-semibold mb-4">
          Advantages
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Why Use the CSS Custom Highlight API?</CardTitle>
            <CardDescription>Key benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Non-invasive</strong> - Doesn't modify the DOM structure or add extra elements
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Performance</strong> - More efficient than wrapping text in span elements
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Flexible</strong> - One highlight can contain multiple non-contiguous ranges
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Semantic</strong> - Separates content from presentation
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Easy management</strong> - Simple API for adding, removing, and clearing highlights
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Multiple highlights</strong> - Support for overlapping highlights with different styles
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="browser-support" className="text-2xl font-semibold mb-4">
          Browser Support
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Current Browser Compatibility</CardTitle>
            <CardDescription>Check support before using in production</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Chrome/Edge</strong> - Supported in version 105+
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <div>
                  <strong>Safari</strong> - Supported in version 17.2+
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 mt-1">✗</span>
                <div>
                  <strong>Firefox</strong> - Not yet supported (as of late 2024)
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm font-semibold mb-2">Feature Detection</p>
              <p className="text-sm mb-2">
                Always check for support before using:
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">if ('Highlight' in window && CSS.highlights) &#123;</code>
                <code className="text-sm block ml-4">// Use the API</code>
                <code className="text-sm block">&#125;</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="best-practices" className="text-2xl font-semibold mb-4">
          Best Practices
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Guidelines for Using the API</CardTitle>
            <CardDescription>Recommendations for optimal implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Feature detection</strong> - Always check for API support before using
              </li>
              <li>
                <strong>Clean up highlights</strong> - Remove highlights when no longer needed to free memory
              </li>
              <li>
                <strong>Use descriptive names</strong> - Name highlights clearly (e.g., 'search-results', 'spelling-errors')
              </li>
              <li>
                <strong>Limit CSS properties</strong> - Only use allowed properties with ::highlight()
              </li>
              <li>
                <strong>Consider performance</strong> - Creating many ranges can impact performance on large documents
              </li>
              <li>
                <strong>Handle dynamic content</strong> - Update highlights when content changes
              </li>
              <li>
                <strong>Provide fallbacks</strong> - Have alternative highlighting methods for unsupported browsers
              </li>
              <li>
                <strong>Avoid excessive overlaps</strong> - Too many overlapping highlights can be confusing
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="limitations" className="text-2xl font-semibold mb-4">
          Limitations
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Important Constraints</CardTitle>
            <CardDescription>What to be aware of</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Limited CSS properties</strong> - Only certain styling properties are allowed
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Browser support</strong> - Not yet universally supported across all browsers
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>No layout changes</strong> - Cannot change box model or positioning
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Performance considerations</strong> - Very large numbers of ranges may impact performance
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">⚠</span>
                <div>
                  <strong>Static styling</strong> - Highlights don't respond to pseudo-classes like :hover
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
