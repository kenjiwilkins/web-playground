import { cn } from '@/lib/utils'

interface InfoBoxProps {
  variant: 'info' | 'warning' | 'success' | 'error'
  title?: string
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

const variantStyles = {
  info: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
  warning: 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800',
  success: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
  error: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
}

export function InfoBox({ variant, title, children, icon, className }: InfoBoxProps) {
  return (
    <div className={cn(
      "p-4 rounded-lg border",
      variantStyles[variant],
      className
    )}>
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-2">
          {icon}
          {title && <p className="text-sm font-semibold">{title}</p>}
        </div>
      )}
      <div className="text-sm">{children}</div>
    </div>
  )
}
