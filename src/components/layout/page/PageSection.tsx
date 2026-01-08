interface PageSectionProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export function PageSection({ id, title, children, className }: PageSectionProps) {
  return (
    <section className={className}>
      <h2 id={id} className="text-2xl font-semibold mb-4">
        {title}
      </h2>
      {children}
    </section>
  )
}
