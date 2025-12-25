import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BackgroundTasksDemo } from '@/components/demos/BackgroundTasksDemo'

export default function BackgroundTasks() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="background-tasks-api" className="text-3xl font-bold tracking-tight">
          Background Tasks API
        </h1>
        <p className="text-muted-foreground">
          Cooperative scheduling of low-priority tasks during browser idle time
        </p>
      </div>

      <section>
        <h2 id="live-demo" className="text-2xl font-semibold mb-4">
          Live Demo
        </h2>
        <BackgroundTasksDemo />
      </section>

      <section>
        <h2 id="introduction" className="text-2xl font-semibold mb-4">
          Introduction
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What is the Background Tasks API?</CardTitle>
            <CardDescription>Cooperative scheduling for smooth performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Background Tasks API (also called <code className="bg-muted px-1 py-0.5 rounded">requestIdleCallback()</code> API)
              allows developers to queue low-priority tasks to be executed automatically when the browser
              determines there is free time available.
            </p>
            <p>
              This helps ensure smooth browser performance by allowing your code to cooperate with the event loop,
              preventing lag and stuttering while maximizing CPU utilization.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="main-methods" className="text-2xl font-semibold mb-4">
          Main Methods
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>requestIdleCallback()</CardTitle>
              <CardDescription>Schedule a task for idle time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">
                  const id = requestIdleCallback(callback, options)
                </code>
              </div>
              <p className="text-sm">
                Returns a task handle (numeric ID) that can be used to cancel the callback later.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>cancelIdleCallback()</CardTitle>
              <CardDescription>Cancel a scheduled task</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">
                  cancelIdleCallback(id)
                </code>
              </div>
              <p className="text-sm">
                Cancels a previously scheduled idle callback using its handle.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="idle-deadline" className="text-2xl font-semibold mb-4">
          IdleDeadline Interface
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Understanding the Deadline Object</CardTitle>
            <CardDescription>Passed to your callback function</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">timeRemaining()</p>
              <div className="bg-muted p-3 rounded-lg mb-2">
                <code className="text-sm">const ms = deadline.timeRemaining()</code>
              </div>
              <p className="text-sm text-muted-foreground">
                Returns the number of milliseconds of idle time available. Maximum is typically 50ms.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">didTimeout</p>
              <div className="bg-muted p-3 rounded-lg mb-2">
                <code className="text-sm">if (deadline.didTimeout) &#123; /* handle timeout */ &#125;</code>
              </div>
              <p className="text-sm text-muted-foreground">
                Boolean indicating if the callback was invoked because the timeout expired.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="basic-usage" className="text-2xl font-semibold mb-4">
          Basic Usage
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Simple Example</CardTitle>
            <CardDescription>Processing work during idle time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">function processTask(deadline) &#123;</code>
              <code className="block ml-4">// Process while time is available</code>
              <code className="block ml-4">while (deadline.timeRemaining() &gt; 0 && hasMoreWork()) &#123;</code>
              <code className="block ml-8">doSomeWork();</code>
              <code className="block ml-4">&#125;</code>
              <code className="block"></code>
              <code className="block ml-4">// Reschedule if work remains</code>
              <code className="block ml-4">if (hasMoreWork()) &#123;</code>
              <code className="block ml-8">requestIdleCallback(processTask, &#123; timeout: 1000 &#125;);</code>
              <code className="block ml-4">&#125;</code>
              <code className="block">&#125;</code>
              <code className="block"></code>
              <code className="block">// Start processing</code>
              <code className="block">const taskId = requestIdleCallback(processTask, &#123; timeout: 1000 &#125;);</code>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="task-queue" className="text-2xl font-semibold mb-4">
          Task Queue Example
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Managing a Queue of Tasks</CardTitle>
            <CardDescription>Complete implementation pattern</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">const taskList = [];</code>
              <code className="block">let taskHandle = null;</code>
              <code className="block"></code>
              <code className="block">function enqueueTask(taskHandler, taskData) &#123;</code>
              <code className="block ml-4">taskList.push(&#123; handler: taskHandler, data: taskData &#125;);</code>
              <code className="block ml-4"></code>
              <code className="block ml-4">if (!taskHandle) &#123;</code>
              <code className="block ml-8">taskHandle = requestIdleCallback(runTaskQueue, &#123; timeout: 1000 &#125;);</code>
              <code className="block ml-4">&#125;</code>
              <code className="block">&#125;</code>
              <code className="block"></code>
              <code className="block">function runTaskQueue(deadline) &#123;</code>
              <code className="block ml-4">while ((deadline.timeRemaining() &gt; 0 || deadline.didTimeout)</code>
              <code className="block ml-11">&& taskList.length) &#123;</code>
              <code className="block ml-8">const task = taskList.shift();</code>
              <code className="block ml-8">task.handler(task.data);</code>
              <code className="block ml-4">&#125;</code>
              <code className="block ml-4"></code>
              <code className="block ml-4">if (taskList.length) &#123;</code>
              <code className="block ml-8">taskHandle = requestIdleCallback(runTaskQueue, &#123; timeout: 1000 &#125;);</code>
              <code className="block ml-4">&#125; else &#123;</code>
              <code className="block ml-8">taskHandle = null;</code>
              <code className="block ml-4">&#125;</code>
              <code className="block">&#125;</code>
              <code className="block"></code>
              <code className="block">// Usage</code>
              <code className="block">enqueueTask((data) =&gt; &#123;</code>
              <code className="block ml-4">console.log(`Processing: $&#123;data.text&#125;`);</code>
              <code className="block">&#125;, &#123; text: 'Low priority work' &#125;);</code>
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
            <CardTitle>When to Use Background Tasks</CardTitle>
            <CardDescription>Best practices for idle callbacks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2 text-green-600 dark:text-green-400">✅ Good Use Cases</p>
                <ul className="space-y-1 ml-4">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Analytics and reporting data collection</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Non-critical data processing and transformation</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Pre-fetching content that might be needed later</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Background synchronization of local data</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Caching and pre-computation</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2 text-red-600 dark:text-red-400">❌ Avoid These</p>
                <ul className="space-y-1 ml-4">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Direct DOM manipulation (use requestAnimationFrame)</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Promise resolution/rejection</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Time-critical operations</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Operations that must complete quickly</span>
                  </li>
                </ul>
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
            <CardTitle>Guidelines for Optimal Performance</CardTitle>
            <CardDescription>Follow these recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Respect time limits</strong> - Check <code className="bg-muted px-1 py-0.5 rounded">timeRemaining()</code> and
                stop when time runs out
              </li>
              <li>
                <strong>Use timeouts judiciously</strong> - Only set timeouts when absolutely necessary, as they can impact performance
              </li>
              <li>
                <strong>Keep tasks small</strong> - Break large operations into smaller chunks that can be processed incrementally
              </li>
              <li>
                <strong>Combine with requestAnimationFrame</strong> - Use RAF for DOM changes, idle callbacks for computation
              </li>
              <li>
                <strong>Handle cancellation</strong> - Always clean up and handle the case where your callback might be cancelled
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="browser-support" className="text-2xl font-semibold mb-4">
          Browser Support
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Polyfill for Older Browsers</CardTitle>
            <CardDescription>Fallback implementation using setTimeout</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              The Background Tasks API is not available in all browsers. Use this polyfill for compatibility:
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <code className="block">window.requestIdleCallback ||= (handler) =&gt; &#123;</code>
              <code className="block ml-4">const startTime = Date.now();</code>
              <code className="block ml-4">return setTimeout(() =&gt; &#123;</code>
              <code className="block ml-8">handler(&#123;</code>
              <code className="block ml-12">didTimeout: false,</code>
              <code className="block ml-12">timeRemaining() &#123;</code>
              <code className="block ml-16">return Math.max(0, 50.0 - (Date.now() - startTime));</code>
              <code className="block ml-12">&#125;,</code>
              <code className="block ml-8">&#125;);</code>
              <code className="block ml-4">&#125;, 1);</code>
              <code className="block">&#125;;</code>
              <code className="block"></code>
              <code className="block">window.cancelIdleCallback ||= (id) =&gt; &#123;</code>
              <code className="block ml-4">clearTimeout(id);</code>
              <code className="block">&#125;;</code>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
