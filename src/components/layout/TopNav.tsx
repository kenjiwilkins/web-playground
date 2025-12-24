import { Link, useLocation } from 'react-router-dom'
import { routes } from '@/config/routes'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import { MobileSidebar } from './MobileSidebar'

export function TopNav() {
  const location = useLocation()

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container flex h-16 items-center px-4">
        <MobileSidebar />

        <div className="mr-8 flex items-center space-x-2">
          <Icons.Code2 className="h-6 w-6" />
          <Link to="/" className="text-xl font-bold">Web Playground</Link>
        </div>

        <nav className="hidden md:flex items-center space-x-2">
          {routes.map((route) => {
            const Icon = route.icon ? Icons[route.icon as keyof typeof Icons] as any : null
            const isActive = location.pathname.startsWith(route.path)

            return (
              <Button
                key={route.path}
                variant={isActive ? 'default' : 'ghost'}
                asChild
                size="sm"
              >
                <Link to={route.children?.[0]?.path || route.path}>
                  {Icon && <Icon className="h-4 w-4" />}
                  {route.label}
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Icons.Github className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
