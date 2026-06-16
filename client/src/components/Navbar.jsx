import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const links = [
  { to: '/',         label: 'Home'     },
  { to: '/services', label: 'Services' },
  { to: '/process',  label: 'Process'  },
  { to: '/contact',  label: 'Contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen,   setIsOpen]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <button className={styles.logo} onClick={() => navigate('/')}>
        NEXORA<span className={styles.dot}>.</span>
      </button>

      <div className={styles.links}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.navDot} />
            {l.label}
          </NavLink>
        ))}
      </div>

      <button className={styles.cta} onClick={() => navigate('/contact')}>
        GET STARTED
      </button>

      {/* ← was missing: hamburger + mobile menu */}
      <button
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <div className={`${styles.mobileMenu} ${isOpen ? styles.menuOpen : ''}`}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `${styles.mobileLink} ${isActive ? styles.active : ''}`}
            onClick={() => setIsOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
        <button
          className={styles.cta}
          onClick={() => { navigate('/contact'); setIsOpen(false); }}
        >
          GET STARTED
        </button>
      </div>
    </nav>
  );
}