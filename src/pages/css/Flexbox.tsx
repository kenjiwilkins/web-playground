import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Flexbox() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 id="css-flexbox" className="text-3xl font-bold tracking-tight">
          CSS Flexbox
        </h1>
        <p className="text-muted-foreground">
          Master the flexible box layout model for modern web design
        </p>
      </div>

      <section>
        <h2 id="flexbox-basics" className="text-2xl font-semibold mb-4">
          Flexbox Basics
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>What is Flexbox?</CardTitle>
            <CardDescription>A one-dimensional layout method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Flexbox is a CSS layout module that provides an efficient way to lay out, align, and
              distribute space among items in a container, even when their size is unknown or dynamic.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                display: flex;
              </code>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="flex-direction" className="text-2xl font-semibold mb-4">
          Flex Direction
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Main Axis Control</CardTitle>
            <CardDescription>Control the direction of flex items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2">Row (default)</p>
                <div className="flex gap-2 p-4 bg-muted rounded">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded">1</div>
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded">2</div>
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded">3</div>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">Column</p>
                <div className="flex flex-col gap-2 p-4 bg-muted rounded">
                  <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded">1</div>
                  <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded">2</div>
                  <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded">3</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="justify-content" className="text-2xl font-semibold mb-4">
          Justify Content
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Align items along the main axis</CardTitle>
            <CardDescription>Different alignment options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Space Between</p>
              <div className="flex justify-between p-4 bg-muted rounded">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded">1</div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded">2</div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded">3</div>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Center</p>
              <div className="flex justify-center gap-2 p-4 bg-muted rounded">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded">1</div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded">2</div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded">3</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 id="align-items" className="text-2xl font-semibold mb-4">
          Align Items
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Align items along the cross axis</CardTitle>
            <CardDescription>Vertical alignment in row direction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Center</p>
              <div className="flex items-center gap-2 p-4 bg-muted rounded h-32">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded">1</div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded">2</div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded">3</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
