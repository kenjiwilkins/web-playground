import { CompressionStreamsDemo } from '@/components/demos/CompressionStreamsDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CompressionStreams() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">
          Compression Streams API
        </h1>
        <p className="text-muted-foreground">
          Native browser compression and decompression of data streams using gzip, deflate, and deflate-raw formats.
        </p>
      </div>

      {/* Live Demo Section */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demos
        </h2>
        <CompressionStreamsDemo />
      </section>

      {/* What is it? */}
      <section>
        <h2 id="what-is-it" className="text-2xl font-semibold mb-4">
          What is the Compression Streams API?
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Built-in Data Compression</CardTitle>
            <CardDescription>No external libraries needed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The Compression Streams API provides native compression and decompression capabilities in the browser
              using standard compression formats. This eliminates the need to include external compression libraries,
              reducing application bundle size and improving performance.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Key Benefits:</p>
              <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                <li><strong>No Dependencies:</strong> Built into modern browsers</li>
                <li><strong>Standard Formats:</strong> gzip, deflate, deflate-raw</li>
                <li><strong>Stream-Based:</strong> Memory efficient for large data</li>
                <li><strong>Fast:</strong> Native implementation outperforms JS libraries</li>
                <li><strong>Worker Support:</strong> Available in Web Workers</li>
              </ul>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-green-500/10 border border-green-500/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">✅ With Compression Streams:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Native browser support</li>
                  <li>Zero bundle size impact</li>
                  <li>Fast native performance</li>
                  <li>Stream-based processing</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">❌ With External Libraries:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Large bundle size (20-100 KB+)</li>
                  <li>Slower JavaScript implementation</li>
                  <li>Additional dependency to maintain</li>
                  <li>Often loads entire file in memory</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Getting Started */}
      <section>
        <h2 id="getting-started" className="text-2xl font-semibold mb-4">
          Getting Started
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Compression</CardTitle>
              <CardDescription>Compress data with CompressionStream</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Create a blob with text data
const blob = new Blob(['Hello, World!'], { type: 'text/plain' });

// Get readable stream from blob
const stream = blob.stream();

// Pipe through compression stream
const compressedStream = stream.pipeThrough(
  new CompressionStream('gzip')
);

// Convert to blob
const compressedBlob = await new Response(compressedStream).blob();

console.log('Original:', blob.size, 'bytes');
console.log('Compressed:', compressedBlob.size, 'bytes');`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Basic Decompression</CardTitle>
              <CardDescription>Decompress data with DecompressionStream</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Decompress a gzip blob
async function decompressBlob(compressedBlob) {
  // Get stream from compressed blob
  const stream = compressedBlob.stream();

  // Pipe through decompression stream
  const decompressedStream = stream.pipeThrough(
    new DecompressionStream('gzip')
  );

  // Convert to blob and read as text
  const decompressedBlob = await new Response(decompressedStream).blob();
  const text = await decompressedBlob.text();

  return text;
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Supported Formats */}
      <section>
        <h2 id="formats" className="text-2xl font-semibold mb-4">
          Supported Compression Formats
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>gzip</CardTitle>
              <CardDescription>Most widely used compression format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                The gzip format is the most common compression format on the web, used by HTTP compression
                and many file archiving tools.
              </p>
              <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                <pre>{`new CompressionStream('gzip')
new DecompressionStream('gzip')`}</pre>
              </div>
              <div className="text-sm space-y-1">
                <p><strong>Features:</strong></p>
                <ul className="list-disc list-inside ml-4 text-xs">
                  <li>Includes CRC32 checksum for data integrity</li>
                  <li>Compatible with .gz files</li>
                  <li>Widely supported across platforms</li>
                  <li>Standard HTTP Content-Encoding format</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>deflate</CardTitle>
              <CardDescription>DEFLATE with zlib wrapper</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                The deflate format uses the DEFLATE algorithm with a zlib wrapper, providing
                checksums and metadata.
              </p>
              <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                <pre>{`new CompressionStream('deflate')
new DecompressionStream('deflate')`}</pre>
              </div>
              <div className="text-sm space-y-1">
                <p><strong>Features:</strong></p>
                <ul className="list-disc list-inside ml-4 text-xs">
                  <li>Includes Adler-32 checksum</li>
                  <li>Used in PNG files and some HTTP compression</li>
                  <li>Lighter wrapper than gzip</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>deflate-raw</CardTitle>
              <CardDescription>Raw DEFLATE without wrapper</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Raw DEFLATE compression without any wrapper or checksum, resulting in the smallest
                compressed size but no built-in integrity checking.
              </p>
              <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                <pre>{`new CompressionStream('deflate-raw')
new DecompressionStream('deflate-raw')`}</pre>
              </div>
              <div className="text-sm space-y-1">
                <p><strong>Features:</strong></p>
                <ul className="list-disc list-inside ml-4 text-xs">
                  <li>No wrapper overhead - smallest output</li>
                  <li>No built-in checksum</li>
                  <li>Used in ZIP files and some binary formats</li>
                  <li>Fastest compression/decompression</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Use Cases */}
      <section>
        <h2 id="use-cases" className="text-2xl font-semibold mb-4">
          Common Use Cases
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Compress Data Before Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">Reduce bandwidth by compressing data before sending to server:</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`async function uploadCompressed(data) {
  // Compress the data
  const blob = new Blob([JSON.stringify(data)]);
  const compressed = blob.stream()
    .pipeThrough(new CompressionStream('gzip'));

  // Upload compressed data
  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/gzip',
      'Content-Encoding': 'gzip'
    },
    body: await new Response(compressed).blob()
  });

  return response.json();
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Decompress API Response</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">Handle compressed responses from APIs:</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`async function fetchCompressed(url) {
  const response = await fetch(url);

  // Check if response is gzip compressed
  if (response.headers.get('Content-Encoding') === 'gzip') {
    const blob = await response.blob();
    const decompressed = blob.stream()
      .pipeThrough(new DecompressionStream('gzip'));

    const text = await new Response(decompressed).text();
    return JSON.parse(text);
  }

  return response.json();
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compress Files in Browser</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">Create compressed archives without server-side processing:</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`async function compressFile(file) {
  const stream = file.stream();
  const compressed = stream.pipeThrough(
    new CompressionStream('gzip')
  );

  const blob = await new Response(compressed).blob();

  // Create download link
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name + '.gz';
  a.click();
  URL.revokeObjectURL(url);
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cache Compressed Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">Store compressed data in IndexedDB or Cache API:</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`async function cacheCompressed(key, data) {
  // Compress data
  const blob = new Blob([JSON.stringify(data)]);
  const compressed = blob.stream()
    .pipeThrough(new CompressionStream('gzip'));

  const compressedBlob = await new Response(compressed).blob();

  // Store in IndexedDB or Cache API
  const cache = await caches.open('my-cache');
  await cache.put(key, new Response(compressedBlob));
}

async function readCompressed(key) {
  const cache = await caches.open('my-cache');
  const response = await cache.match(key);

  if (response) {
    const blob = await response.blob();
    const decompressed = blob.stream()
      .pipeThrough(new DecompressionStream('gzip'));

    const text = await new Response(decompressed).text();
    return JSON.parse(text);
  }
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Performance */}
      <section>
        <h2 id="performance" className="text-2xl font-semibold mb-4">
          Performance Considerations
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-2">Native Implementation</h3>
                <p className="text-sm text-muted-foreground">
                  Browser-native compression is significantly faster than JavaScript implementations,
                  often 10-50x faster depending on the use case.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">Stream-Based Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Using streams allows processing large files without loading everything into memory,
                  making it suitable for multi-gigabyte files.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">Web Worker Support</h3>
                <p className="text-sm text-muted-foreground">
                  Compression can be performed in Web Workers to avoid blocking the main thread,
                  keeping the UI responsive during intensive operations.
                </p>
                <div className="bg-muted p-3 rounded-lg font-mono text-xs mt-2">
                  <pre>{`// In worker
self.onmessage = async (e) => {
  const blob = e.data;
  const compressed = blob.stream()
    .pipeThrough(new CompressionStream('gzip'));
  const result = await new Response(compressed).blob();
  self.postMessage(result);
};`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">Compression Ratios</h3>
                <p className="text-sm text-muted-foreground">
                  Text-based data typically compresses 60-90%, while already-compressed formats
                  (images, videos) see little to no size reduction.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">When to Compress</h3>
                <ul className="text-sm text-muted-foreground list-disc list-inside ml-4">
                  <li>Data &gt; 1KB (smaller payloads may not benefit)</li>
                  <li>Text, JSON, XML, or other repetitive data</li>
                  <li>Storing data locally (IndexedDB, localStorage)</li>
                  <li>Uploading large datasets</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">When NOT to Compress</h3>
                <ul className="text-sm text-muted-foreground list-disc list-inside ml-4">
                  <li>Already compressed formats (JPEG, PNG, MP4, ZIP)</li>
                  <li>Very small payloads (&lt; 1KB)</li>
                  <li>Real-time data where latency matters</li>
                  <li>When server already handles compression</li>
                </ul>
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
            <CardTitle>Widely Available</CardTitle>
            <CardDescription>Baseline widely available since May 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium mb-2">Supported Browsers:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Chrome/Edge 80+ ✓</li>
                  <li>Firefox 113+ ✓</li>
                  <li>Safari 16.4+ ✓</li>
                  <li>Opera 67+ ✓</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Also Available In:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Web Workers ✓</li>
                  <li>Service Workers ✓</li>
                  <li>Shared Workers ✓</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500 rounded-lg">
              <p className="text-sm">
                <strong>Feature Detection:</strong>
              </p>
              <code className="text-sm bg-background px-2 py-1 rounded mt-2 inline-block">
                if (typeof CompressionStream !== 'undefined') &#123; /* Use API */ &#125;
              </code>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Best Practices */}
      <section>
        <h2 id="best-practices" className="text-2xl font-semibold mb-4">
          Best Practices
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-2">1. Choose the Right Format</h3>
                <p className="text-sm text-muted-foreground">
                  Use <code className="bg-muted px-1 rounded">gzip</code> for maximum compatibility,
                  <code className="bg-muted px-1 rounded">deflate-raw</code> for smallest size.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">2. Handle Errors Gracefully</h3>
                <p className="text-sm text-muted-foreground">
                  Always wrap compression/decompression in try-catch blocks as corrupted data will throw errors.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">3. Use Streams for Large Data</h3>
                <p className="text-sm text-muted-foreground">
                  Leverage the streaming API to avoid loading entire files into memory.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">4. Measure Actual Benefits</h3>
                <p className="text-sm text-muted-foreground">
                  Profile your specific use case - compression overhead may not be worth it for small datasets.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">5. Consider Server-Side Compression</h3>
                <p className="text-sm text-muted-foreground">
                  For HTTP responses, let the server handle compression when possible (it's automatic and optimized).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">6. Use Workers for Heavy Compression</h3>
                <p className="text-sm text-muted-foreground">
                  Offload compression of large files to Web Workers to keep the UI responsive.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Resources */}
      <section>
        <h2 id="resources" className="text-2xl font-semibold mb-4">
          Additional Resources
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: Compression Streams API
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/CompressionStream"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: CompressionStream
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: DecompressionStream
                </a>
              </li>
              <li>
                <a
                  href="https://compression.spec.whatwg.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  WHATWG Specification: Compression Streams
                </a>
              </li>
              <li>
                <a
                  href="https://web.dev/compression-streams-api/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  web.dev: Compression Streams API
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
