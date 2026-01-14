import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [navOpen, setNavOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  const closeNav = () => {
    setNavOpen(false)
  }

  return (
    <header>
      <nav className="container">
        <div className="logo">
          <Link to="/" onClick={closeNav}>
            <img
              src="/assets/images/logo.png"
              alt="Dotori School Logo"
              style={{ maxWidth: '80px' }}
              className="logo-img"
            />
            <span
              className="logo-text"
              style={{ display: 'none', fontSize: '1.5rem', fontWeight: 700, color: '#6b5b47' }}
            >
              Dotori School
            </span>
          </Link>
        </div>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={toggleNav}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            color: '#6b5b47',
            display: 'none',
            position: 'absolute',
            right: '24px',
            top: '18px',
            zIndex: 1001
          }}
        >
          &#9776;
        </button>
        <ul className={`nav-links ${navOpen ? 'nav-open' : ''}`}>
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeNav}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={closeNav}>
              About
            </Link>
          </li>
          <li>
            <Link to="/team" className={isActive('/team') ? 'active' : ''} onClick={closeNav}>
              Our Team
            </Link>
          </li>
          <li>
            <Link to="/programs" className={isActive('/programs') ? 'active' : ''} onClick={closeNav}>
              Programs
            </Link>
          </li>
          <li>
            <Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={closeNav}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
