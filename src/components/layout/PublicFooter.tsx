import { Link } from 'react-router-dom'

export default function PublicFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">OKESS ARMY CADET CORPS</p>
          <p className="footer-motto">Discipline · Service · Heritage</p>
        </div>

        <div className="footer-links">
          <Link to="/history">Our History</Link>
          <Link to="/memories">Corps Memories</Link>
          <Link to="/archives">Archives</Link>
          <Link to="/support">Support the Corps</Link>
        </div>

        <p className="footer-school">
          Osei Kyeretwie Senior High School · Ghana
        </p>

        <p className="footer-copyright">
          © {new Date().getFullYear()} OKESS Army Cadet Corps
        </p>
      </div>
    </footer>
  )
}
