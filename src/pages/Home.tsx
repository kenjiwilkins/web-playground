import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { routes } from '@/config/routes'
import * as Icons from 'lucide-react'

export function Home() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Web Development Playground</h1>
        <p className="text-xl text-muted-foreground">
          Learn and experiment with HTML, CSS, and JavaScript
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => {
          const Icon = route.icon ? Icons[route.icon as keyof typeof Icons] as any : Icons.Code2
          const firstChild = route.children?.[0]

          return (
            <Card key={route.path} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  {route.label}
                </CardTitle>
                <CardDescription>
                  Explore {route.children?.length || 0} topic{route.children?.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to={firstChild?.path || route.path}>
                    Get Started
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
