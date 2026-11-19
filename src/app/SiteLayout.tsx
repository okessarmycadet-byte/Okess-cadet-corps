import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, Shield } from 'lucide-react'

const links = [
  ['Home', '/'],
  ['About the Corps', '/about'],
  ['History & Heritage', '/history'],
  ['Generations', '/generations'],
  ['Leadership', '/leadership'],
  ['Hall of Honour', '/honours'],
  ['Gallery', '/gallery'],
  ['Events & Activities', '/events'],
  ['Corps Memories', '/memories'],
  ['Archives & Research', '/archives'],
  ['Support the Corps', '/donate'],
  ['Contact', '/contact'],
]

export default function SiteLayout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>

          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <div className="brand-mark"><Shield size={22} /></div>
            <div className="brand-text">
              <strong>OKESS CADETS</strong>
              <span>ARMY CADET CORPS</span>
            </div>
          </Link>

          <Link to="/donate" className="header-support">SUPPORT</Link>
        </div>
      </header>

      {open && (
        <div className="navigation-overlay" onClick={() => setOpen(false)}>
          <nav className="navigation-panel" onClick={e => e.stopPropagation()}>
            <div className="nav-heading">
              <span>OSEI KYERETWIE SENIOR HIGH SCHOOL</span>
              <small>Army Cadet Corps</small>
            </div>

            {links.map(([name, href]) => (
              <Link
                key={href}
                to={href}
                onClick={() => setOpen(false)}
                className={`nav-link ${location.pathname === href ? 'active' : ''}`}
              >
                {name}
              </Link>
            ))}

            <div className="nav-bottom">DISCIPLINE · SERVICE · HERITAGE</div>
          </nav>
        </div>
      )}

      <Outlet />

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">OKESS ARMY CADET CORPS</div>
          <p className="footer-school">Osei Kyeretwie Senior High School</p>
          <p className="footer-motto">A digital home for our history, generations and memories.</p>

          <div className="footer-links">
            <Link to="/history">History</Link>
            <Link to="/memories">Memories</Link>
            <Link to="/archives">Archives</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin/login">Administration</Link>
          </div>

          <div className="footer-copyright">
            © {new Date().getFullYear()} OKESS Army Cadet Corps · Digital Heritage
          </div>
        </div>
      </footer>
    </>
  )
}
