import type { ReactNode } from 'react'

interface SectionShellProps {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}

export default function SectionShell({
  eyebrow,
  title,
  description,
  children,
}: SectionShellProps) {
  return (
    <section className="section-shell">
      <div className="section-container">
        <div className="section-shell-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="section-shell-description">{description}</p>
        </div>
        <div className="section-shell-content">{children}</div>
      </div>
    </section>
  )
}
