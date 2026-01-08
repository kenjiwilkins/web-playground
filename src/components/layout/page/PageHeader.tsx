import { cn } from '@/lib/utils'

interface PageHeaderProps {
  id: string
  title: string
  description: string
  className?: string
}

export function PageHeader({ id, title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h1 id={id} className="text-3xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
