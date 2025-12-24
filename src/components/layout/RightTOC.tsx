import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  text: string
  level: number
}

export function RightTOC() {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const extractHeadings = () => {
      const main = document.querySelector('main')
      if (!main) return []

      const headings = main.querySelectorAll('h1, h2, h3, h4')
      return Array.from(headings).map((heading) => {
        const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || ''

        if (!heading.id && id) {
          heading.id = id
        }

        return {
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName[1]),
        }
      })
    }

    const updateTOC = () => {
      const headings = extractHeadings()
      setToc(headings)
    }

    updateTOC()

    const observer = new MutationObserver(updateTOC)
    const main = document.querySelector('main')

    if (main) {
      observer.observe(main, {
        childList: true,
        subtree: true,
      })
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    toc.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [toc])

  if (toc.length === 0) {
    return null
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <aside className="w-64 border-l bg-muted/40 hidden xl:block">
      <ScrollArea className="h-[calc(100vh-4rem)] py-6 px-4">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold mb-4">On This Page</h4>
          <nav className="space-y-1">
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={cn(
                  "block w-full text-left px-2 py-1 text-sm transition-colors rounded",
                  "hover:bg-accent hover:text-accent-foreground",
                  activeId === item.id
                    ? "text-primary font-medium bg-accent"
                    : "text-muted-foreground",
                )}
                style={{
                  paddingLeft: `${(item.level - 1) * 0.75}rem`,
                }}
              >
                {item.text}
              </button>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </aside>
  )
}
