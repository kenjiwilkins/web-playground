import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface GoogleFont {
  family: string
  category: string
  variants: string[]
}

// Popular Google Fonts for the demo
const POPULAR_FONTS: GoogleFont[] = [
  { family: 'Roboto', category: 'sans-serif', variants: ['400', '700'] },
  { family: 'Open Sans', category: 'sans-serif', variants: ['400', '700'] },
  { family: 'Lato', category: 'sans-serif', variants: ['400', '700'] },
  { family: 'Montserrat', category: 'sans-serif', variants: ['400', '700'] },
  { family: 'Poppins', category: 'sans-serif', variants: ['400', '700'] },
  { family: 'Merriweather', category: 'serif', variants: ['400', '700'] },
  { family: 'Playfair Display', category: 'serif', variants: ['400', '700'] },
  { family: 'Lora', category: 'serif', variants: ['400', '700'] },
  { family: 'Dancing Script', category: 'handwriting', variants: ['400', '700'] },
  { family: 'Pacifico', category: 'handwriting', variants: ['400'] },
]

interface FontLoadState {
  status: 'idle' | 'loading' | 'loaded' | 'error'
  family: string
}

export function FontLoadingDemo() {
  const [isSupported] = useState('FontFace' in window && document.fonts)
  const [selectedFont, setSelectedFont] = useState<GoogleFont | null>(null)
  const [loadStates, setLoadStates] = useState<Record<string, FontLoadState>>({})
  const [appliedFont, setAppliedFont] = useState<string>('system-ui')
  const [sampleText, setSampleText] = useState('The quick brown fox jumps over the lazy dog')
  const [loadedFontsCount, setLoadedFontsCount] = useState(0)

  // Monitor font loading
  useEffect(() => {
    if (!isSupported) return

    const handleLoading = () => {
      console.log('Fonts are loading...')
    }

    const handleLoadingDone = (event: FontFaceSetLoadEvent) => {
      console.log(`Loaded ${event.fontfaces.length} fonts`)
      setLoadedFontsCount(document.fonts.size)
    }

    const handleLoadingError = (event: FontFaceSetLoadEvent) => {
      console.error(`Failed to load ${event.fontfaces.length} fonts`)
    }

    document.fonts.addEventListener('loading', handleLoading)
    document.fonts.addEventListener('loadingdone', handleLoadingDone)
    document.fonts.addEventListener('loadingerror', handleLoadingError)

    // Get initial font count
    document.fonts.ready.then(() => {
      setLoadedFontsCount(document.fonts.size)
    })

    return () => {
      document.fonts.removeEventListener('loading', handleLoading)
      document.fonts.removeEventListener('loadingdone', handleLoadingDone)
      document.fonts.removeEventListener('loadingerror', handleLoadingError)
    }
  }, [isSupported])

  const loadFont = useCallback(async (font: GoogleFont) => {
    if (!isSupported) return

    setSelectedFont(font)
    setLoadStates(prev => ({ ...prev, [font.family]: { status: 'loading', family: font.family } }))

    try {
      // Construct Google Fonts URL
      const fontUrl = `https://fonts.googleapis.com/css2?family=${font.family.replace(/ /g, '+')}:wght@${font.variants.join(';')}&display=swap`

      // Fetch the CSS
      const response = await fetch(fontUrl)
      const css = await response.text()

      // Extract font URLs from CSS
      const urlMatches = css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)
      const fontFaces: FontFace[] = []

      for (const match of urlMatches) {
        const fontFaceUrl = match[1]
        const fontFace = new FontFace(font.family, `url(${fontFaceUrl})`)
        fontFaces.push(fontFace)
        document.fonts.add(fontFace)
      }

      // Load all font faces
      await Promise.all(fontFaces.map(f => f.load()))

      setLoadStates(prev => ({ ...prev, [font.family]: { status: 'loaded', family: font.family } }))
      setAppliedFont(font.family)
    } catch (error) {
      console.error('Failed to load font:', error)
      setLoadStates(prev => ({ ...prev, [font.family]: { status: 'error', family: font.family } }))
    }
  }, [isSupported])

  const checkFontLoaded = useCallback((fontFamily: string) => {
    if (!isSupported) return false
    return document.fonts.check(`16px "${fontFamily}"`)
  }, [isSupported])

  const groupedFonts = POPULAR_FONTS.reduce((acc, font) => {
    if (!acc[font.category]) {
      acc[font.category] = []
    }
    acc[font.category].push(font)
    return acc
  }, {} as Record<string, GoogleFont[]>)

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the CSS Font Loading API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The CSS Font Loading API is supported in all modern browsers. Please update your browser to see this demo.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Font Stats */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>Font Loading Statistics</CardTitle>
          <CardDescription>Current state of font loading</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {loadedFontsCount}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Loaded Fonts
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {Object.keys(loadStates).filter(f => loadStates[f].status === 'loaded').length}
              </div>
              <div className="text-sm text-muted-foreground">
                Custom Fonts Loaded
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Area */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>Font Preview</CardTitle>
          <CardDescription>See how the selected font looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="sample-text" className="block text-sm font-medium mb-2">
              Sample Text
            </label>
            <input
              id="sample-text"
              type="text"
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background"
            />
          </div>

          {selectedFont && loadStates[selectedFont.family]?.status === 'loading' && (
            <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="text-sm font-medium">Loading {selectedFont.family}...</p>
                <div className="flex gap-1 justify-center">
                  <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          {selectedFont && loadStates[selectedFont.family]?.status === 'loaded' && (
            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div
                className="text-center space-y-4"
                style={{ fontFamily: appliedFont }}
              >
                <p className="text-sm text-muted-foreground">
                  Using: {appliedFont}
                </p>
                <p className="text-4xl font-normal">
                  {sampleText}
                </p>
                <p className="text-2xl font-bold">
                  {sampleText}
                </p>
              </div>
            </div>
          )}

          {selectedFont && loadStates[selectedFont.family]?.status === 'error' && (
            <div className="p-8 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-red-700 dark:text-red-400">
                  Failed to load font
                </p>
                <p className="text-sm text-muted-foreground">
                  There was an error loading {selectedFont.family}. Please try another font.
                </p>
              </div>
            </div>
          )}

          {!selectedFont && (
            <div className="p-8 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                Select a font below to see a preview
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Font Selection */}
      {Object.entries(groupedFonts).map(([category, fonts]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="capitalize">{category} Fonts</CardTitle>
            <CardDescription>
              Click to load and preview {category} fonts from Google Fonts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {fonts.map((font) => {
                const state = loadStates[font.family]
                const isLoaded = checkFontLoaded(font.family)

                return (
                  <Button
                    key={font.family}
                    onClick={() => loadFont(font)}
                    variant={selectedFont?.family === font.family ? 'default' : 'outline'}
                    className="h-auto py-3 flex flex-col items-start gap-1"
                    disabled={state?.status === 'loading'}
                  >
                    <span className="font-medium text-sm">{font.family}</span>
                    {state?.status === 'loading' && (
                      <span className="text-xs text-blue-600 dark:text-blue-400">Loading...</span>
                    )}
                    {state?.status === 'loaded' && (
                      <span className="text-xs text-green-600 dark:text-green-400">✓ Loaded</span>
                    )}
                    {state?.status === 'error' && (
                      <span className="text-xs text-red-600 dark:text-red-400">✗ Error</span>
                    )}
                    {!state && isLoaded && (
                      <span className="text-xs text-muted-foreground">Cached</span>
                    )}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* How It Works */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>How This Demo Works</CardTitle>
          <CardDescription>Understanding the implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="font-semibold mb-1">1. Fetch Google Fonts CSS</p>
            <div className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto">
              const url = `https://fonts.googleapis.com/css2?family=$&#123;fontFamily&#125;`;
              <br />
              const response = await fetch(url);
            </div>
          </div>
          <div>
            <p className="font-semibold mb-1">2. Extract Font URLs</p>
            <div className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto">
              const urls = css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g);
            </div>
          </div>
          <div>
            <p className="font-semibold mb-1">3. Create FontFace Objects</p>
            <div className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto">
              const fontFace = new FontFace(fontFamily, `url($&#123;fontUrl&#125;)`);
              <br />
              document.fonts.add(fontFace);
            </div>
          </div>
          <div>
            <p className="font-semibold mb-1">4. Load and Wait</p>
            <div className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto">
              await fontFace.load();
              <br />
              // Font is now ready to use!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
