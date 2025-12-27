import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function CustomHighlightDemo() {
  const [isSupported] = useState('Highlight' in window && CSS.highlights)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedColor, setSelectedColor] = useState('#ffeb3b')
  const searchTextRef = useRef<HTMLParagraphElement>(null)
  const multiColorTextRef = useRef<HTMLParagraphElement>(null)
  const spellCheckTextRef = useRef<HTMLParagraphElement>(null)

  // Search highlighting
  useEffect(() => {
    if (!isSupported || !searchTextRef.current) return

    // Clear previous highlights
    CSS.highlights.delete('search-results')

    if (!searchQuery.trim()) return

    const text = searchTextRef.current.textContent || ''
    const query = searchQuery.toLowerCase()
    const ranges: Range[] = []

    // Find all occurrences
    let startPos = 0
    while (startPos < text.length) {
      const index = text.toLowerCase().indexOf(query, startPos)
      if (index === -1) break

      const range = new Range()
      const textNode = searchTextRef.current.firstChild
      if (textNode) {
        range.setStart(textNode, index)
        range.setEnd(textNode, index + query.length)
        ranges.push(range)
      }
      startPos = index + query.length
    }

    if (ranges.length > 0) {
      const highlight = new Highlight(...ranges)
      CSS.highlights.set('search-results', highlight)
    }
  }, [searchQuery, isSupported])

  // Multi-color highlighting
  const highlightSelection = () => {
    if (!isSupported || !multiColorTextRef.current) return

    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)

    // Check if selection is within our target element
    if (!multiColorTextRef.current.contains(range.commonAncestorContainer)) {
      return
    }

    // Create a unique name for this highlight
    const highlightName = `user-highlight-${Date.now()}`
    const highlight = new Highlight(range.cloneRange())
    CSS.highlights.set(highlightName, highlight)

    // Apply the selected color dynamically
    const style = document.createElement('style')
    style.textContent = `::highlight(${highlightName}) { background-color: ${selectedColor}; color: #000; }`
    document.head.appendChild(style)

    // Clear selection
    selection.removeAllRanges()
  }

  const clearMultiColorHighlights = () => {
    if (!isSupported) return

    // Remove all user highlights
    const highlightsToRemove: string[] = []
    CSS.highlights.forEach((_, name) => {
      if (name.startsWith('user-highlight-')) {
        highlightsToRemove.push(name)
      }
    })
    highlightsToRemove.forEach(name => CSS.highlights.delete(name))

    // Remove style elements
    document.querySelectorAll('style').forEach(style => {
      if (style.textContent?.includes('user-highlight-')) {
        style.remove()
      }
    })
  }

  // Spell and grammar checker simulation
  useEffect(() => {
    if (!isSupported || !spellCheckTextRef.current) return

    CSS.highlights.delete('spelling-errors')
    CSS.highlights.delete('grammar-errors')

    const text = spellCheckTextRef.current.textContent || ''
    const misspelledWords = ['wrld', 'pwerful', 'highlite', 'technlogy']
    const grammarErrors = ['are going', 'very unique', 'can able to']
    const spellingRanges: Range[] = []
    const grammarRanges: Range[] = []

    // Find spelling errors
    misspelledWords.forEach(word => {
      let startPos = 0
      while (startPos < text.length) {
        const index = text.indexOf(word, startPos)
        if (index === -1) break

        const range = new Range()
        const textNode = spellCheckTextRef.current!.firstChild
        if (textNode) {
          range.setStart(textNode, index)
          range.setEnd(textNode, index + word.length)
          spellingRanges.push(range)
        }
        startPos = index + word.length
      }
    })

    // Find grammar errors
    grammarErrors.forEach(phrase => {
      let startPos = 0
      while (startPos < text.length) {
        const index = text.indexOf(phrase, startPos)
        if (index === -1) break

        const range = new Range()
        const textNode = spellCheckTextRef.current!.firstChild
        if (textNode) {
          range.setStart(textNode, index)
          range.setEnd(textNode, index + phrase.length)
          grammarRanges.push(range)
        }
        startPos = index + phrase.length
      }
    })

    if (spellingRanges.length > 0) {
      const highlight = new Highlight(...spellingRanges)
      CSS.highlights.set('spelling-errors', highlight)
    }

    if (grammarRanges.length > 0) {
      const highlight = new Highlight(...grammarRanges)
      CSS.highlights.set('grammar-errors', highlight)
    }
  }, [isSupported])

  const sampleText = "The CSS Custom Highlight API provides a mechanism for styling arbitrary text ranges on a document. It is the foundation of many text editing features like search, spell-checking, and syntax highlighting. The API allows you to programmatically create text ranges and style them without modifying the DOM structure."

  const spellCheckText = "Welcome to the wrld of pwerful web APIs! The CSS Custom Highlite API are going to be a very unique technlogy that can able to help you style text ranges programmatically."

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the CSS Custom Highlight API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The CSS Custom Highlight API is currently supported in:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Chrome/Edge 105+</li>
              <li>Safari 17.2+</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Please use a supported browser to see this demo.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Highlighting Demo */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>Search Highlighting</CardTitle>
          <CardDescription>
            Highlight search terms in text without modifying the DOM
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-2">
              Search Text
            </label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Try searching for 'API', 'text', or 'highlight'"
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p ref={searchTextRef} className="text-sm leading-relaxed">
              {sampleText}
            </p>
          </div>
          {searchQuery && (
            <p className="text-xs text-muted-foreground">
              Matches are highlighted in yellow using ::highlight(search-results)
            </p>
          )}
        </CardContent>
      </Card>

      {/* Multi-Color Highlighting */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>Multi-Color Text Highlighting</CardTitle>
          <CardDescription>
            Select text and apply different colors - simulates collaborative editing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <label className="text-sm font-medium">Color:</label>
            {[
              { color: '#ffeb3b', label: 'Yellow' },
              { color: '#4caf50', label: 'Green' },
              { color: '#2196f3', label: 'Blue' },
              { color: '#ff9800', label: 'Orange' },
              { color: '#e91e63', label: 'Pink' },
            ].map(({ color, label }) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded border-2 ${
                  selectedColor === color ? 'border-foreground' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
                title={label}
              />
            ))}
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p ref={multiColorTextRef} className="text-sm leading-relaxed select-text">
              {sampleText}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={highlightSelection} size="sm">
              Highlight Selection
            </Button>
            <Button onClick={clearMultiColorHighlights} variant="outline" size="sm">
              Clear All Highlights
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Select text above, choose a color, and click "Highlight Selection"
          </p>
        </CardContent>
      </Card>

      {/* Spell & Grammar Checker Demo */}
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Spell & Grammar Checker Simulation</CardTitle>
          <CardDescription>
            Automatically highlight spelling and grammar errors with different styles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p ref={spellCheckTextRef} className="text-sm leading-relaxed">
              {spellCheckText}
            </p>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Spelling errors are underlined in red using ::highlight(spelling-errors)</p>
            <p>• Grammar errors are underlined in blue using ::highlight(grammar-errors)</p>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Info */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>Understanding the implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="font-semibold mb-1">1. Create Range Objects</p>
            <div className="bg-muted p-3 rounded font-mono text-xs">
              const range = new Range();<br />
              range.setStart(textNode, startOffset);<br />
              range.setEnd(textNode, endOffset);
            </div>
          </div>
          <div>
            <p className="font-semibold mb-1">2. Create Highlight</p>
            <div className="bg-muted p-3 rounded font-mono text-xs">
              const highlight = new Highlight(range1, range2);
            </div>
          </div>
          <div>
            <p className="font-semibold mb-1">3. Register in HighlightRegistry</p>
            <div className="bg-muted p-3 rounded font-mono text-xs">
              CSS.highlights.set('my-highlight', highlight);
            </div>
          </div>
          <div>
            <p className="font-semibold mb-1">4. Style with CSS</p>
            <div className="bg-muted p-3 rounded font-mono text-xs">
              ::highlight(my-highlight) {'{'}<br />
              {'  '}background-color: yellow;<br />
              {'}'}
            </div>
          </div>
        </CardContent>
      </Card>

      <style>{`
        ::highlight(search-results) {
          background-color: #ffeb3b;
          color: #000;
        }

        ::highlight(spelling-errors) {
          background-color: transparent;
          text-decoration: wavy underline red;
          text-decoration-thickness: 2px;
        }

        ::highlight(grammar-errors) {
          background-color: transparent;
          text-decoration: wavy underline blue;
          text-decoration-thickness: 2px;
        }
      `}</style>
    </div>
  )
}
