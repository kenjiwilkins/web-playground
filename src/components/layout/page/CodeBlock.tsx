import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  className?: string
}

export function CodeBlock({ code, title, className }: CodeBlockProps) {
  return (
    <div className={cn("bg-muted p-4 rounded-lg", className)}>
      {title && (
        <div className="text-muted-foreground mb-2 text-xs">{title}</div>
      )}
      <pre className="whitespace-pre-wrap font-mono text-sm">
        {code}
      </pre>
    </div>
  )
}
