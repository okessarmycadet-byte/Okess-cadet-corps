import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Shield } from 'lucide-react'

const links = [
  { label: 'Home', path: '/' },
  { label: 'About the Corps', path: '/about' },
  { label: 'History & Heritage', path: '/history' },
  { label: 'Generations', path: '/generations' },
  { label: 'Leadership', path: '/leadership' },
  { label: 'Hall of Honour', path: '/honours' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Events & Activities', path: '/events' },
  { label: 'Corps Memories', path: '/memories' },
  { label: 'Archives & Research', path: '/archives' },
  { label: 'Contact', path: '/contact' },
]

export default function PublicHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="menu-button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="brand">
          <div className="brand-mark">
            <Shield size={25} />
          </div>

          <div className="brand-text">
            <strong>OKESS</strong>
            <span>ARMY CADET CORPS</span>
          </div>
        </Link>

        <Link to="/support" className="header-support">
          Support Corps
        </Link>
      </div>

      {open && (
        <div
          className="navigation-overlay"
          onClick={() => setOpen(false)}
        >
          <nav
            className="navigation-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="nav-heading">
              <span>COMMAND NAVIGATION</span>
              <small>Explore the Corps</small>
            </div>

            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="nav-bottom">
              OSEI KYERETWIE SENIOR HIGH SCHOOL
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
