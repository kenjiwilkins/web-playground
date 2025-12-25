import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Fetch() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="fetch-api" className="text-3xl font-bold tracking-tight">
          Fetch API
        </h1>
        <p className="text-muted-foreground">
          Learn how to make HTTP requests using the modern Fetch API
        </p>
      </div>

      <section>
        <h2 id="introduction" className="text-2xl font-semibold mb-4">
          Introduction
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What is the Fetch API?</CardTitle>
            <CardDescription>A modern interface for fetching resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Fetch API provides a JavaScript interface for accessing and manipulating parts of
              the HTTP pipeline, such as requests and responses. It provides a global{' '}
              <code className="bg-muted px-1 py-0.5 rounded">fetch()</code> method that makes it easy
              to fetch resources asynchronously across the network.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="basic-usage" className="text-2xl font-semibold mb-4">
          Basic Usage
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Making a GET Request</CardTitle>
            <CardDescription>Fetching data from an API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">fetch('https://api.example.com/data')</code>
              <code className="block ml-4">.then(response =&gt; response.json())</code>
              <code className="block ml-4">.then(data =&gt; console.log(data))</code>
              <code className="block ml-4">.catch(error =&gt; console.error('Error:', error));</code>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="async-await" className="text-2xl font-semibold mb-4">
          Using Async/Await
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Modern Async Syntax</CardTitle>
            <CardDescription>Cleaner code with async/await</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">async function fetchData() &#123;</code>
              <code className="block ml-4">try &#123;</code>
              <code className="block ml-8">const response = await fetch('https://api.example.com/data');</code>
              <code className="block ml-8">const data = await response.json();</code>
              <code className="block ml-8">console.log(data);</code>
              <code className="block ml-4">&#125; catch (error) &#123;</code>
              <code className="block ml-8">console.error('Error:', error);</code>
              <code className="block ml-4">&#125;</code>
              <code className="block">&#125;</code>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="post-request" className="text-2xl font-semibold mb-4">
          POST Requests
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Sending Data to a Server</CardTitle>
            <CardDescription>Making POST requests with JSON data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">fetch('https://api.example.com/users', &#123;</code>
              <code className="block ml-4">method: 'POST',</code>
              <code className="block ml-4">headers: &#123;</code>
              <code className="block ml-8">'Content-Type': 'application/json',</code>
              <code className="block ml-4">&#125;,</code>
              <code className="block ml-4">body: JSON.stringify(&#123;</code>
              <code className="block ml-8">name: 'John Doe',</code>
              <code className="block ml-8">email: 'john@example.com'</code>
              <code className="block ml-4">&#125;)</code>
              <code className="block">&#125;)</code>
              <code className="block">.then(response =&gt; response.json())</code>
              <code className="block">.then(data =&gt; console.log(data));</code>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="response-handling" className="text-2xl font-semibold mb-4">
          Response Handling
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Working with Response Objects</CardTitle>
            <CardDescription>Understanding the Response interface</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Common Response methods and properties:</p>
            <ul className="space-y-2">
              <li>
                <code className="bg-muted px-1 py-0.5 rounded">response.ok</code> - Boolean indicating if the response was successful (status 200-299)
              </li>
              <li>
                <code className="bg-muted px-1 py-0.5 rounded">response.status</code> - HTTP status code
              </li>
              <li>
                <code className="bg-muted px-1 py-0.5 rounded">response.json()</code> - Parse response body as JSON
              </li>
              <li>
                <code className="bg-muted px-1 py-0.5 rounded">response.text()</code> - Get response body as text
              </li>
              <li>
                <code className="bg-muted px-1 py-0.5 rounded">response.blob()</code> - Get response body as a Blob
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="error-handling" className="text-2xl font-semibold mb-4">
          Error Handling
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Proper Error Handling</CardTitle>
            <CardDescription>Handling network errors and HTTP errors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">async function fetchWithErrorHandling() &#123;</code>
              <code className="block ml-4">try &#123;</code>
              <code className="block ml-8">const response = await fetch('https://api.example.com/data');</code>
              <code className="block ml-8"></code>
              <code className="block ml-8">if (!response.ok) &#123;</code>
              <code className="block ml-12">throw new Error(`HTTP error! status: $&#123;response.status&#125;`);</code>
              <code className="block ml-8">&#125;</code>
              <code className="block ml-8"></code>
              <code className="block ml-8">const data = await response.json();</code>
              <code className="block ml-8">return data;</code>
              <code className="block ml-4">&#125; catch (error) &#123;</code>
              <code className="block ml-8">console.error('Fetch error:', error);</code>
              <code className="block ml-8">throw error;</code>
              <code className="block ml-4">&#125;</code>
              <code className="block">&#125;</code>
            </div>
            <p className="text-sm text-muted-foreground">
              Note: Fetch only rejects on network errors, not HTTP errors. Always check{' '}
              <code className="bg-muted px-1 py-0.5 rounded">response.ok</code> for HTTP errors.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
