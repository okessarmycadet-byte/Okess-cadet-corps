interface PlaceholderPageProps {
  title: string
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <section className="placeholder-page">
      <div className="section-container">
        <p className="eyebrow">OKESS ARMY CADET CORPS</p>
        <h1>{title}</h1>
        <p className="placeholder-description">
          This section is part of the Corps digital archive and heritage platform.
        </p>
      </div>
    </section>
  )
}
