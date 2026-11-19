export default function LoadingState({ label = 'Loading records' }: { label?: string }) {
  return (
    <div className="loading-state" role="status">
      <span className="loading-spinner" />
      <p>{label}…</p>
    </div>
  )
}
