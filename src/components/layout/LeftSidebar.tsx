import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { getRouteChildren } from '@/config/routes'
import { ScrollArea } from '@/components/ui/scroll-area'

export function LeftSidebar() {
  const location = useLocation()
  const sidebarLinks = getRouteChildren(location.pathname)

  if (sidebarLinks.length === 0) {
    return null
  }

  return (
    <aside className="w-64 border-r bg-muted/40 hidden md:block">
      <ScrollArea className="h-[calc(100vh-4rem)] py-6 px-4">
        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path

            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </aside>
  )
}
