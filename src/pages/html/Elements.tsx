import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Elements() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="html-elements" className="text-3xl font-bold tracking-tight">
          HTML Elements
        </h1>
        <p className="text-muted-foreground">
          Learn about the fundamental building blocks of HTML
        </p>
      </div>

      <section>
        <h2 id="basic-elements" className="text-2xl font-semibold mb-4">
          Basic Elements
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Headings</CardTitle>
            <CardDescription>h1 through h6 elements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h1 className="text-4xl">Heading 1</h1>
              <h2 className="text-3xl">Heading 2</h2>
              <h3 className="text-2xl">Heading 3</h3>
              <h4 className="text-xl">Heading 4</h4>
              <h5 className="text-lg">Heading 5</h5>
              <h6 className="text-base">Heading 6</h6>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="text-elements" className="text-2xl font-semibold mb-4">
          Text Elements
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Paragraphs and Text Formatting</CardTitle>
            <CardDescription>Common text elements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This is a paragraph with <strong>bold text</strong>, <em>italic text</em>, and <code className="bg-muted px-1 py-0.5 rounded">inline code</code>.</p>
            <blockquote className="border-l-4 border-primary pl-4 italic">
              This is a blockquote element
            </blockquote>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="lists" className="text-2xl font-semibold mb-4">
          Lists
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Unordered List</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ordered List</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-1">
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 id="semantic-html" className="text-2xl font-semibold mb-4">
          Semantic HTML
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Importance of Semantic HTML</CardTitle>
            <CardDescription>Using the right element for the right purpose</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Semantic HTML uses elements that clearly describe their meaning in a human-readable way.
              This improves accessibility, SEO, and code maintainability.
            </p>
            <div className="space-y-2">
              <p className="font-semibold">Examples of semantic elements:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><code className="bg-muted px-1 py-0.5 rounded">&lt;header&gt;</code> - Introductory content</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">&lt;nav&gt;</code> - Navigation links</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">&lt;main&gt;</code> - Main content</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">&lt;article&gt;</code> - Self-contained content</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">&lt;section&gt;</code> - Thematic grouping of content</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">&lt;footer&gt;</code> - Footer content</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
