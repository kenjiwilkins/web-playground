import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Basics() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="javascript-basics" className="text-3xl font-bold tracking-tight">
          JavaScript Basics
        </h1>
        <p className="text-muted-foreground">
          Learn the fundamental concepts of JavaScript programming
        </p>
      </div>

      <section>
        <h2 id="variables" className="text-2xl font-semibold mb-4">
          Variables
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Variable Declarations</CardTitle>
            <CardDescription>let, const, and var</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              JavaScript provides three ways to declare variables: <code className="bg-muted px-1 py-0.5 rounded">let</code>,
              <code className="bg-muted px-1 py-0.5 rounded ml-1">const</code>, and
              <code className="bg-muted px-1 py-0.5 rounded ml-1">var</code>.
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">let name = 'John';  // Can be reassigned</code>
              <code className="block">const age = 30;     // Cannot be reassigned</code>
              <code className="block">var city = 'NYC';   // Older syntax, avoid in modern code</code>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="data-types" className="text-2xl font-semibold mb-4">
          Data Types
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Primitive Types</CardTitle>
            <CardDescription>Basic data types in JavaScript</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li><code className="bg-muted px-1 py-0.5 rounded">string</code> - Text data: "hello"</li>
              <li><code className="bg-muted px-1 py-0.5 rounded">number</code> - Numeric data: 42, 3.14</li>
              <li><code className="bg-muted px-1 py-0.5 rounded">boolean</code> - true or false</li>
              <li><code className="bg-muted px-1 py-0.5 rounded">undefined</code> - Variable declared but not assigned</li>
              <li><code className="bg-muted px-1 py-0.5 rounded">null</code> - Intentional absence of value</li>
              <li><code className="bg-muted px-1 py-0.5 rounded">symbol</code> - Unique identifiers</li>
              <li><code className="bg-muted px-1 py-0.5 rounded">bigint</code> - Large integers</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="functions" className="text-2xl font-semibold mb-4">
          Functions
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Function Declarations</CardTitle>
            <CardDescription>Different ways to define functions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Function Declaration</p>
              <div className="bg-muted p-4 rounded-lg">
                <code className="block">function greet(name) &#123;</code>
                <code className="block ml-4">return `Hello, $&#123;name&#125;!`;</code>
                <code className="block">&#125;</code>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Arrow Function</p>
              <div className="bg-muted p-4 rounded-lg">
                <code className="block">const greet = (name) =&gt; `Hello, $&#123;name&#125;!`;</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="arrays" className="text-2xl font-semibold mb-4">
          Arrays
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Working with Arrays</CardTitle>
            <CardDescription>Ordered collections of data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Arrays store multiple values in a single variable.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">const fruits = ['apple', 'banana', 'orange'];</code>
              <code className="block">fruits.push('grape');        // Add to end</code>
              <code className="block">fruits.pop();                // Remove from end</code>
              <code className="block">fruits[0];                   // Access first element</code>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="objects" className="text-2xl font-semibold mb-4">
          Objects
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Object Literals</CardTitle>
            <CardDescription>Key-value pairs for storing data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Objects store collections of key-value pairs.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">const person = &#123;</code>
              <code className="block ml-4">name: 'John',</code>
              <code className="block ml-4">age: 30,</code>
              <code className="block ml-4">city: 'NYC'</code>
              <code className="block">&#125;;</code>
              <code className="block mt-2">person.name;  // Access property</code>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
