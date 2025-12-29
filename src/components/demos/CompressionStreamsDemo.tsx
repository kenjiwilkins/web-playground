import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LogEntry {
  timestamp: string
  message: string
  type: 'info' | 'success' | 'error'
}

export function CompressionStreamsDemo() {
  const [isSupported] = useState(
    typeof CompressionStream !== 'undefined' &&
    typeof DecompressionStream !== 'undefined'
  )
  const [logs, setLogs] = useState<LogEntry[]>([])

  // Security limits
  const MAX_TEXT_SIZE = 10 * 1024 * 1024 // 10MB
  const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB
  const MAX_DECOMPRESSED_SIZE = 50 * 1024 * 1024 // 50MB to prevent zip bombs
  const MAX_PARAGRAPHS = 100 // Limit text generation

  // Demo 1: Text compression
  const [textToCompress, setTextToCompress] = useState('')
  const [compressedSize, setCompressedSize] = useState<number | null>(null)
  const [originalSize, setOriginalSize] = useState<number | null>(null)
  const [compressionRatio, setCompressionRatio] = useState<number | null>(null)
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null)
  const [format, setFormat] = useState<'gzip' | 'deflate' | 'deflate-raw'>('gzip')

  // Demo 2: Decompression
  const [decompressedText, setDecompressedText] = useState('')

  // Demo 3: File compression
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null)
  const [originalFileSize, setOriginalFileSize] = useState<number | null>(null)
  const [compressedFileSize, setCompressedFileSize] = useState<number | null>(null)

  const addLog = useCallback((message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setLogs(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }, ...prev].slice(0, 10))
  }, [])

  // Generate large sample text
  const generateLargeText = useCallback((paragraphs: number) => {
    // Security check: Limit paragraph generation
    const safeParagraphs = Math.min(paragraphs, MAX_PARAGRAPHS)
    if (paragraphs > MAX_PARAGRAPHS) {
      addLog(`Limiting generation to ${MAX_PARAGRAPHS} paragraphs for safety`, 'info')
    }

    const sentences = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
      'Deserunt mollit anim id est laborum et dolorum fuga.',
      'Et harum quidem rerum facilis est et expedita distinctio.',
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
      'Nihil impedit quo minus id quod maxime placeat facere possimus.',
      'Omnis voluptas assumenda est, omnis dolor repellendus.'
    ]

    let text = ''
    for (let i = 0; i < safeParagraphs; i++) {
      const paragraph = []
      const sentenceCount = 5 + Math.floor(Math.random() * 5)
      for (let j = 0; j < sentenceCount; j++) {
        paragraph.push(sentences[Math.floor(Math.random() * sentences.length)])
      }
      text += paragraph.join(' ') + '\n\n'
    }
    return text
  }, [MAX_PARAGRAPHS, addLog])

  // Compress text
  const compressText = useCallback(async () => {
    if (!textToCompress) {
      addLog('No text to compress', 'error')
      return
    }

    try {
      const blob = new Blob([textToCompress], { type: 'text/plain' })

      // Security check: Prevent excessive memory usage
      if (blob.size > MAX_TEXT_SIZE) {
        addLog(`Text too large (${(blob.size / 1024 / 1024).toFixed(2)}MB). Maximum: ${MAX_TEXT_SIZE / 1024 / 1024}MB`, 'error')
        return
      }

      const stream = blob.stream()

      const compressedStream = stream.pipeThrough(new CompressionStream(format))
      const compressedBlob = await new Response(compressedStream).blob()

      setOriginalSize(blob.size)
      setCompressedSize(compressedBlob.size)
      setCompressionRatio(((1 - compressedBlob.size / blob.size) * 100))
      setCompressedBlob(compressedBlob)

      addLog(`Compressed ${blob.size} bytes → ${compressedBlob.size} bytes (${format})`, 'success')
      addLog(`Compression ratio: ${((1 - compressedBlob.size / blob.size) * 100).toFixed(2)}%`, 'info')
    } catch (error) {
      addLog(`Compression failed: ${(error as Error).message}`, 'error')
    }
  }, [textToCompress, format, addLog, MAX_TEXT_SIZE])

  // Decompress text
  const decompressText = useCallback(async () => {
    if (!compressedBlob) {
      addLog('No compressed data to decompress', 'error')
      return
    }

    try {
      const stream = compressedBlob.stream()
      const decompressedStream = stream.pipeThrough(new DecompressionStream(format))
      const decompressedBlob = await new Response(decompressedStream).blob()

      // Security check: Prevent decompression bombs (zip bombs)
      if (decompressedBlob.size > MAX_DECOMPRESSED_SIZE) {
        addLog(`Decompressed size too large (${(decompressedBlob.size / 1024 / 1024).toFixed(2)}MB). Maximum: ${MAX_DECOMPRESSED_SIZE / 1024 / 1024}MB`, 'error')
        addLog('Potential decompression bomb detected', 'error')
        return
      }

      const text = await decompressedBlob.text()

      setDecompressedText(text)
      addLog(`Decompressed ${compressedBlob.size} bytes → ${decompressedBlob.size} bytes`, 'success')
    } catch (error) {
      addLog(`Decompression failed: ${(error as Error).message}`, 'error')
    }
  }, [compressedBlob, format, addLog, MAX_DECOMPRESSED_SIZE])

  // Download compressed file
  const downloadCompressed = useCallback(() => {
    if (!compressedBlob) return

    const url = URL.createObjectURL(compressedBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `compressed.${format === 'gzip' ? 'gz' : 'deflate'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    addLog('Downloaded compressed file', 'success')
  }, [compressedBlob, format, addLog])

  // Compress file
  const compressFile = useCallback(async (file: File) => {
    try {
      // Security check: Prevent excessive file sizes
      if (file.size > MAX_FILE_SIZE) {
        addLog(`File too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum: ${MAX_FILE_SIZE / 1024 / 1024}MB`, 'error')
        return
      }

      setOriginalFileSize(file.size)
      const stream = file.stream()

      const compressedStream = stream.pipeThrough(new CompressionStream(format))
      const compressed = await new Response(compressedStream).blob()

      setCompressedFile(compressed)
      setCompressedFileSize(compressed.size)

      addLog(`File compressed: ${file.size} → ${compressed.size} bytes`, 'success')
      addLog(`Saved ${((1 - compressed.size / file.size) * 100).toFixed(2)}% space`, 'info')
    } catch (error) {
      addLog(`File compression failed: ${(error as Error).message}`, 'error')
    }
  }, [format, addLog, MAX_FILE_SIZE])

  // Download compressed file
  const downloadCompressedFile = useCallback(() => {
    if (!compressedFile) return

    const url = URL.createObjectURL(compressedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = `compressed-file.${format === 'gzip' ? 'gz' : 'deflate'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    addLog('Downloaded compressed file', 'success')
  }, [compressedFile, format, addLog])

  if (!isSupported) {
    return (
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser does not support the Compression Streams API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              The Compression Streams API is available in modern browsers:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Chrome/Edge 80+</li>
              <li>Firefox 113+</li>
              <li>Safari 16.4+</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Please use a modern browser to see these demos.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Demo 1: Text Compression */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>1. Text Compression</CardTitle>
          <CardDescription>
            Compress large text using different compression formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">
                Text to Compress:
              </label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTextToCompress(generateLargeText(10))}
                >
                  Generate 10 Paragraphs
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTextToCompress(generateLargeText(50))}
                >
                  Generate 50 Paragraphs
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTextToCompress(generateLargeText(100))}
                >
                  Generate 100 Paragraphs (Max)
                </Button>
              </div>
            </div>
            <textarea
              value={textToCompress}
              onChange={(e) => setTextToCompress(e.target.value)}
              className="w-full h-32 px-3 py-2 border rounded-md bg-background font-mono text-sm"
              placeholder="Enter or generate text to compress..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Current size: {new Blob([textToCompress]).size.toLocaleString()} bytes
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Compression Format:
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as 'gzip' | 'deflate' | 'deflate-raw')}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="gzip">gzip (most common)</option>
                <option value="deflate">deflate</option>
                <option value="deflate-raw">deflate-raw</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button onClick={compressText} className="w-full">
                Compress Text
              </Button>
            </div>
          </div>

          {originalSize !== null && compressedSize !== null && (
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Original Size:</span>
                <span>{originalSize.toLocaleString()} bytes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Compressed Size:</span>
                <span>{compressedSize.toLocaleString()} bytes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Compression Ratio:</span>
                <span className="text-green-500 font-bold">
                  {compressionRatio?.toFixed(2)}% saved
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex gap-2">
                  <Button onClick={decompressText} variant="outline" size="sm" className="flex-1">
                    Decompress
                  </Button>
                  <Button onClick={downloadCompressed} variant="outline" size="sm" className="flex-1">
                    Download .{format === 'gzip' ? 'gz' : 'deflate'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  ⚠ Decompression is limited to {MAX_DECOMPRESSED_SIZE / 1024 / 1024}MB to prevent zip bombs
                </p>
              </div>
            </div>
          )}

          {decompressedText && (
            <div>
              <p className="text-sm font-medium mb-2">Decompressed Text (first 500 chars):</p>
              <div className="bg-muted p-3 rounded-lg font-mono text-xs max-h-32 overflow-y-auto">
                {decompressedText.substring(0, 500)}...
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                ✓ Decompression successful - {decompressedText.length} characters
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Demo 2: File Compression */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>2. File Compression</CardTitle>
          <CardDescription>
            Compress any file using native browser compression
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select File to Compress (Max {MAX_FILE_SIZE / 1024 / 1024}MB):
            </label>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) compressFile(file)
              }}
              className="w-full px-3 py-2 border rounded-md bg-background text-sm"
            />
          </div>

          {originalFileSize !== null && compressedFileSize !== null && (
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Original File Size:</span>
                <span>{originalFileSize.toLocaleString()} bytes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Compressed Size:</span>
                <span>{compressedFileSize.toLocaleString()} bytes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Space Saved:</span>
                <span className="text-green-500 font-bold">
                  {((1 - compressedFileSize / originalFileSize) * 100).toFixed(2)}%
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <Button onClick={downloadCompressedFile} className="w-full">
                  Download Compressed File
                </Button>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Works with any file type (text, images, documents, etc.)</p>
            <p>• Uses native browser compression - no external libraries needed</p>
            <p>• Compression ratio depends on file content (text compresses better)</p>
            <p className="text-yellow-600 dark:text-yellow-500">⚠ Maximum file size: {MAX_FILE_SIZE / 1024 / 1024}MB</p>
          </div>
        </CardContent>
      </Card>

      {/* Demo 3: Stream Processing */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>3. Real-time Compression Stats</CardTitle>
          <CardDescription>
            Compare compression efficiency across different formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={async () => {
              const sampleText = generateLargeText(100)
              const blob = new Blob([sampleText])

              addLog('Testing all compression formats...', 'info')

              for (const fmt of ['gzip', 'deflate', 'deflate-raw'] as const) {
                const stream = blob.stream()
                const compressed = stream.pipeThrough(new CompressionStream(fmt))
                const result = await new Response(compressed).blob()

                const ratio = ((1 - result.size / blob.size) * 100).toFixed(2)
                addLog(`${fmt}: ${blob.size} → ${result.size} bytes (${ratio}% saved)`, 'success')
              }
            }}
            className="w-full"
          >
            Compare All Formats (100 paragraphs)
          </Button>

          <div className="bg-muted p-4 rounded-lg text-sm">
            <p className="font-medium mb-2">Format Characteristics:</p>
            <ul className="space-y-1 text-xs">
              <li><strong>gzip:</strong> Most compatible, includes CRC checksum</li>
              <li><strong>deflate:</strong> Standard DEFLATE with zlib wrapper</li>
              <li><strong>deflate-raw:</strong> Raw DEFLATE without wrapper (smaller)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="border-yellow-500">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Real-time log of compression operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto bg-muted p-4 rounded-lg font-mono text-xs">
            {logs.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No activity yet. Try compressing some text or files.
              </p>
            )}
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  log.type === 'error' ? 'text-red-500' :
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
