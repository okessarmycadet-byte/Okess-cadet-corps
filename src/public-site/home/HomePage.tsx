import { Link } from 'react-router-dom'
import { ArrowRight, Shield, BookOpen, Images, HeartHandshake } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'History & Heritage',
    text: 'Preserving the story, traditions and legacy of the Corps.',
    link: '/history',
  },
  {
    icon: Shield,
    title: 'Generations',
    text: 'Recognising the cadets and generations who shaped our journey.',
    link: '/generations',
  },
  {
    icon: Images,
    title: 'Memories & Archives',
    text: 'Discover photographs, activities, records and shared memories.',
    link: '/archives',
  },
]

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-overline">OSEI KYERETWIE SENIOR HIGH SCHOOL</p>

          <div className="hero-emblem">
            <Shield size={54} strokeWidth={1.2} />
          </div>

          <h1>
            OKESS
            <span>ARMY CADET CORPS</span>
          </h1>

          <div className="hero-divider" />

          <p className="hero-description">
            A home for our history, service, generations, achievements and memories.
            Preserving the legacy of the Corps for those who served and those yet to come.
          </p>

          <div className="hero-actions">
            <Link to="/history" className="button-primary">
              Discover Our Heritage <ArrowRight size={17} />
            </Link>
            <Link to="/memories" className="button-secondary">
              Explore Corps Memories
            </Link>
          </div>

          <div className="hero-scroll">
            <span />
            EXPLORE THE CORPS
          </div>
        </div>
      </section>

      <section className="intro-section section-container">
        <p className="eyebrow">OUR DIGITAL HERITAGE</p>
        <h2>More than a Corps.<br />A legacy of generations.</h2>
        <p className="intro-text">
          This platform is dedicated to documenting the people, experiences,
          achievements, activities and history of the OKESS Army Cadet Corps.
          It is a place to remember, learn, connect and preserve our heritage.
        </p>
      </section>

      <section className="feature-section">
        <div className="section-container">
          <div className="section-heading">
            <p className="eyebrow">EXPLORE</p>
            <h2>Discover the Corps</h2>
          </div>

          <div className="feature-grid">
            {features.map(({ icon: Icon, title, text, link }) => (
              <Link to={link} className="feature-card" key={title}>
                <div className="feature-icon"><Icon size={24} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="feature-arrow"><ArrowRight size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

  <section className="support-section">
      <div className="section-container support-inner">
        <div className="support-symbol"><HeartHandshake size={32} /></div>
        <p className="eyebrow">STAND WITH THE CORPS</p>
        <h2>Help preserve<br />the legacy.</h2>
        <p>Support approved Corps activities, heritage preservation and development initiatives.</p>
        <Link to="/donate" className="button-primary">
          Support the Corps <ArrowRight size={17} />
        </Link>
      </div>
  </section>
    </div>
  )
}
