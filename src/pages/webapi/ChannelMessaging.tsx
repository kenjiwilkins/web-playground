import { ChannelMessagingDemo } from '@/components/demos/ChannelMessagingDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ChannelMessaging() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">
          Channel Messaging API
        </h1>
        <p className="text-muted-foreground">
          Create direct, two-way communication channels between different browsing contexts like iframes, workers, and documents.
        </p>
      </div>

      {/* Live Demo Section */}
      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demos
        </h2>
        <ChannelMessagingDemo />
      </section>

      {/* What is it? */}
      <section>
        <h2 id="what-is-it" className="text-2xl font-semibold mb-4">
          What is the Channel Messaging API?
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Dedicated Two-Way Communication Channels</CardTitle>
            <CardDescription>Direct messaging between separate contexts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The Channel Messaging API enables direct, two-way communication between separate scripts running in different
              browsing contexts attached to the same document. Unlike broadcast messaging, it creates dedicated channels
              between specific contexts with ports at each end.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Key Features:</p>
              <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                <li><strong>Dedicated Channels:</strong> Direct point-to-point communication</li>
                <li><strong>Bidirectional:</strong> Both ends can send and receive messages</li>
                <li><strong>Transferable:</strong> Ports are transferred (not copied) between contexts</li>
                <li><strong>Isolated:</strong> Messages only go between connected ports</li>
                <li><strong>Asynchronous:</strong> Non-blocking message delivery</li>
              </ul>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-blue-500/10 border border-blue-500/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">Common Use Cases:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Iframe-to-iframe communication</li>
                  <li>Main thread to worker messaging</li>
                  <li>Microfrontend architecture</li>
                  <li>Multi-threaded applications</li>
                  <li>Complex data flow scenarios</li>
                </ul>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">Core Interfaces:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li><code className="bg-background px-1 rounded">MessageChannel</code> - Creates the channel</li>
                  <li><code className="bg-background px-1 rounded">MessagePort</code> - Controls each endpoint</li>
                  <li><code className="bg-background px-1 rounded">port1</code> & <code className="bg-background px-1 rounded">port2</code> - The two ports</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section>
        <h2 id="how-it-works" className="text-2xl font-semibold mb-4">
          How It Works
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Workflow</CardTitle>
              <CardDescription>Three-step process to establish communication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Step 1: Create MessageChannel</p>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// In the main context
const channel = new MessageChannel();

// This creates two connected ports:
// - channel.port1
// - channel.port2`}</pre>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Step 2: Transfer Port to Other Context</p>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// Transfer port2 to an iframe
iframe.contentWindow.postMessage(
  { type: 'INIT' },
  '*',
  [channel.port2]  // Transfer ownership of port2
);

// Or to a worker
worker.postMessage(
  { type: 'INIT' },
  [channel.port2]
);`}</pre>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Note: After transfer, port2 is no longer accessible in the sending context
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Step 3: Listen and Send Messages</p>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// In main context - use port1
channel.port1.onmessage = (event) => {
  console.log('Received:', event.data);
};

channel.port1.postMessage({ type: 'HELLO', data: 'World' });

// In other context - use port2
onmessage = (event) => {
  const port = event.ports[0];  // Receive the transferred port

  port.onmessage = (msg) => {
    console.log('Received:', msg.data);
  };

  port.postMessage({ type: 'HELLO', data: 'Back' });
};`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core API */}
      <section>
        <h2 id="core-api" className="text-2xl font-semibold mb-4">
          Core API Reference
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>MessageChannel Constructor</CardTitle>
              <CardDescription>Create a new message channel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <pre>{`const channel = new MessageChannel();`}</pre>
              </div>
              <div className="text-sm space-y-1">
                <p><strong>Returns:</strong> MessageChannel object with two MessagePort properties</p>
                <p><strong>Properties:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  <li><code className="bg-muted px-1 rounded">port1</code> - First port (typically kept by creator)</li>
                  <li><code className="bg-muted px-1 rounded">port2</code> - Second port (typically transferred)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>MessagePort Interface</CardTitle>
              <CardDescription>Methods and properties for each port</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Methods:</p>
                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded">
                    <code className="text-sm font-medium">postMessage(message)</code>
                    <p className="text-xs text-muted-foreground mt-1">
                      Send a message through the port. Supports any cloneable data.
                    </p>
                    <div className="bg-background p-2 rounded mt-2 font-mono text-xs">
                      <pre>{`port.postMessage({ type: 'UPDATE', data: [1, 2, 3] });`}</pre>
                    </div>
                  </div>

                  <div className="bg-muted p-3 rounded">
                    <code className="text-sm font-medium">start()</code>
                    <p className="text-xs text-muted-foreground mt-1">
                      Start sending queued messages. Called automatically when using <code className="bg-background px-1 rounded">onmessage</code>.
                    </p>
                    <div className="bg-background p-2 rounded mt-2 font-mono text-xs">
                      <pre>{`port.start(); // Only needed with addEventListener`}</pre>
                    </div>
                  </div>

                  <div className="bg-muted p-3 rounded">
                    <code className="text-sm font-medium">close()</code>
                    <p className="text-xs text-muted-foreground mt-1">
                      Close the port when done. No more messages can be sent or received.
                    </p>
                    <div className="bg-background p-2 rounded mt-2 font-mono text-xs">
                      <pre>{`port.close(); // Cleanup when done`}</pre>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Events:</p>
                <div className="bg-muted p-3 rounded">
                  <code className="text-sm font-medium">message</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Fired when a message is received on this port
                  </p>
                  <div className="bg-background p-2 rounded mt-2 font-mono text-xs">
                    <pre>{`port.onmessage = (event) => {
  console.log('Received:', event.data);
};

// Or with addEventListener
port.addEventListener('message', (event) => {
  console.log('Received:', event.data);
});
port.start(); // Required with addEventListener`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section>
        <h2 id="use-cases" className="text-2xl font-semibold mb-4">
          Common Use Cases
        </h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Iframe Communication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Enable direct communication between iframes without broadcasting to all contexts:
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Parent window
const channel = new MessageChannel();

// Send port2 to iframe
iframe.contentWindow.postMessage(
  { type: 'INIT_PORT' },
  'https://example.com',
  [channel.port2]
);

// Listen for messages from iframe
channel.port1.onmessage = (e) => {
  console.log('From iframe:', e.data);
};

// Send message to iframe
channel.port1.postMessage({ action: 'update' });


// In iframe
window.addEventListener('message', (event) => {
  if (event.data.type === 'INIT_PORT') {
    const port = event.ports[0];

    port.onmessage = (e) => {
      console.log('From parent:', e.data);
    };

    port.postMessage({ status: 'ready' });
  }
});`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Worker Communication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Create dedicated channels for specific worker tasks:
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Main thread
const worker = new Worker('worker.js');
const channel = new MessageChannel();

channel.port1.onmessage = (e) => {
  console.log('Result:', e.data);
};

worker.postMessage(
  { cmd: 'init', port: channel.port2 },
  [channel.port2]
);


// worker.js
self.onmessage = (e) => {
  if (e.data.cmd === 'init') {
    const port = e.data.port;

    port.onmessage = (msg) => {
      // Process and respond
      const result = heavyComputation(msg.data);
      port.postMessage(result);
    };
  }
};`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Microfrontend Architecture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Share state between different framework-based microfrontends:
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Container app
const channel = new MessageChannel();

// Connect React microfrontend
reactIframe.contentWindow.postMessage(
  { type: 'INIT' },
  '*',
  [channel.port1]
);

// Connect Vue microfrontend
vueIframe.contentWindow.postMessage(
  { type: 'INIT' },
  '*',
  [channel.port2]
);

// Now React and Vue can communicate directly!


// React microfrontend
window.addEventListener('message', (e) => {
  if (e.data.type === 'INIT') {
    const port = e.ports[0];

    // Send state updates
    port.postMessage({ state: reactState });

    // Receive updates from Vue
    port.onmessage = (msg) => {
      updateReactState(msg.data);
    };
  }
});`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comparison */}
      <section>
        <h2 id="comparison" className="text-2xl font-semibold mb-4">
          Comparison with Other APIs
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Feature</th>
                    <th className="text-left p-2">Channel Messaging</th>
                    <th className="text-left p-2">postMessage()</th>
                    <th className="text-left p-2">Broadcast Channel</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b">
                    <td className="p-2 font-medium">Communication Type</td>
                    <td className="p-2">Point-to-point</td>
                    <td className="p-2">One-to-one broadcast</td>
                    <td className="p-2">One-to-many broadcast</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Contexts</td>
                    <td className="p-2">Same-document</td>
                    <td className="p-2">Any window/frame</td>
                    <td className="p-2">Same-origin tabs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Setup</td>
                    <td className="p-2">Create channel + transfer port</td>
                    <td className="p-2">Direct window reference</td>
                    <td className="p-2">Share channel name</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Direction</td>
                    <td className="p-2">Bidirectional</td>
                    <td className="p-2">One-way (need reply)</td>
                    <td className="p-2">Broadcast</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Use Case</td>
                    <td className="p-2">Dedicated channels</td>
                    <td className="p-2">Cross-origin messaging</td>
                    <td className="p-2">Tab synchronization</td>
                  </tr>
                </tbody>
              </table>
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
                <h3 className="font-semibold text-sm mb-2">1. Always Close Ports When Done</h3>
                <p className="text-sm text-muted-foreground">
                  Call <code className="bg-muted px-1 rounded">port.close()</code> to free resources and prevent memory leaks.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">2. Handle Port Transfer Correctly</h3>
                <p className="text-sm text-muted-foreground">
                  Remember that ports are transferred (not copied). After sending a port, you can't use it anymore.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">3. Use Structured Data</h3>
                <p className="text-sm text-muted-foreground">
                  Send well-defined message objects with <code className="bg-muted px-1 rounded">type</code> fields for better organization.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">4. Validate Messages</h3>
                <p className="text-sm text-muted-foreground">
                  Always validate received messages, especially when working with different contexts or origins.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">5. Error Handling</h3>
                <p className="text-sm text-muted-foreground">
                  Implement proper error handling and consider timeout mechanisms for expected responses.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">6. Document Message Protocol</h3>
                <p className="text-sm text-muted-foreground">
                  Clearly document the message format and protocol between communicating contexts.
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
            <CardTitle>Widely Supported</CardTitle>
            <CardDescription>Available in all modern browsers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-500/10 border border-green-500 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">✅ Excellent Support</p>
              <p className="text-sm mb-3">
                The Channel Messaging API is widely supported across all modern browsers:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Chrome/Edge (all versions) ✓</li>
                <li>Firefox 41+ ✓</li>
                <li>Safari 5+ ✓</li>
                <li>Opera (all versions) ✓</li>
              </ul>
              <p className="text-sm mt-3">
                Also available in Web Workers and Service Workers!
              </p>
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
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: Channel Messaging API
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API/Using_channel_messaging"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: Using Channel Messaging
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: MessageChannel Interface
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/MessagePort"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  MDN: MessagePort Interface
                </a>
              </li>
              <li>
                <a
                  href="https://html.spec.whatwg.org/multipage/web-messaging.html#channel-messaging"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  WHATWG Specification: Channel Messaging
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
