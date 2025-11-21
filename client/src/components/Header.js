import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header>
      <nav className="container">
        <div className="logo">
          <Link to="/">
            <img
              src="/assets/images/logo.png"
              alt="Dotori School Logo"
              style={{ maxWidth: '80px' }}
              className="logo-img"
            />
            <span
              className="logo-text"
              style={{ display: 'none', fontSize: '1.5rem', fontWeight: '700', color: '#6b5b47' }}
            >
              Dotori School
            </span>
          </Link>
        </div>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={toggleMobileMenu}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            color: '#6b5b47',
            display: 'none',
            position: 'absolute',
            right: '24px',
            top: '18px',
            zIndex: '1001'
          }}
        >
          &#9776;
        </button>
        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about')}>About</Link></li>
          <li><Link to="/team" className={isActive('/team')}>Our Team</Link></li>
          <li><Link to="/programs" className={isActive('/programs')}>Programs</Link></li>
          <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
