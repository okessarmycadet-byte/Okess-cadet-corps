import { Archive } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export default function EmptyState({
  title = 'Records are being prepared',
  description = 'Verified Corps records and submissions will appear here when available.',
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <Archive size={28} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
