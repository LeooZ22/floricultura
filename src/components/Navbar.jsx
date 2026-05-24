import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import CartModal from './CartModal'
import logo from '../assets/logo.png'

function Navbar({ currentPage, setCurrentPage }) {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <nav style={s.nav}>
        <div style={s.inner}>
          <button style={s.logoBtn} onClick={() => setCurrentPage('home')}>
            <img src={logo} alt="Jana Artes Florais" style={s.logoImg} />
            <span style={s.logoText}>Jana Artes Florais</span>
          </button>

          <div style={s.right}>
            {/* Desktop menu */}
            <ul style={s.menu}>
              <li>
                <button
                  style={{ ...s.menuItem, ...(currentPage === 'home' ? s.menuActive : {}) }}
                  onClick={() => setCurrentPage('home')}
                >
                  Catálogo
                </button>
              </li>
              {user ? (
                <>
                  <li>
                    <button
                      style={{ ...s.menuItem, ...(currentPage === 'admin' ? s.menuActive : {}) }}
                      onClick={() => setCurrentPage('admin')}
                    >
                      Painel
                    </button>
                  </li>
                  <li>
                    <button style={s.logoutBtn} onClick={logout}>Sair</button>
                  </li>
                </>
              ) : (
                <li>
                  <button style={s.loginBtn} onClick={() => setCurrentPage('login')}>
                    Área do Gestor
                  </button>
                </li>
              )}
            </ul>

            {/* Cart button */}
            <button style={s.cartBtn} onClick={() => setCartOpen(true)}>
              <span style={{ fontSize: '20px' }}>🛒</span>
              {count > 0 && <span style={s.cartBadge}>{count}</span>}
            </button>

            {/* Mobile hamburger */}
            <button style={s.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
              <span style={s.bar} />
              <span style={s.bar} />
              <span style={s.bar} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={s.mobileMenu}>
            <button style={s.mobileItem} onClick={() => { setCurrentPage('home'); setMenuOpen(false) }}>Catálogo</button>
            {user ? (
              <>
                <button style={s.mobileItem} onClick={() => { setCurrentPage('admin'); setMenuOpen(false) }}>Painel</button>
                <button style={s.mobileItem} onClick={() => { logout(); setMenuOpen(false) }}>Sair</button>
              </>
            ) : (
              <button style={s.mobileItem} onClick={() => { setCurrentPage('login'); setMenuOpen(false) }}>Área do Gestor</button>
            )}
          </div>
        )}
      </nav>

      {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}
    </>
  )
}
import { useWindowWidth } from '../hooks/useWindowWidth'

// dentro do componente:
const width = useWindowWidth()
const isMobile = width < 768

const s = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(250, 247, 244, 0.95)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border)',
  },
  inner: {
    maxWidth: '1200px', margin: '0 auto', padding: '0 74px',
    height: '82px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logoBtn: { background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' },
  logoImg: { width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover' },
  logoText: { fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: '400', color: 'var(--sage)', letterSpacing: '0.02em' },
  right: { display: 'flex', alignItems: 'center', gap: '8px' },
  menu: { display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none' },
  menuItem: {
    background: 'none', border: 'none', padding: '8px 16px',
    color: 'var(--text-mid)', fontSize: '13px', letterSpacing: '0.08em',
    textTransform: 'uppercase', fontWeight: '400', cursor: 'pointer',
  },
  menuActive: { color: 'var(--sage)', borderBottom: '1.5px solid var(--sage)' },
  loginBtn: {
    background: 'none', border: '1px solid var(--sage)',
    padding: '7px 18px', color: 'var(--sage)', fontSize: '12px',
    letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 'var(--radius)', cursor: 'pointer',
  },
  logoutBtn: {
    background: 'none', border: '1px solid var(--border)',
    padding: '7px 18px', color: 'var(--text-soft)', fontSize: '12px',
    letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 'var(--radius)', cursor: 'pointer',
  },
  cartBtn: {
    position: 'relative', background: 'none', border: 'none',
    cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute', top: '2px', right: '2px',
    background: 'var(--blush)', color: '#fff',
    fontSize: '10px', fontWeight: '700',
    width: '18px', height: '18px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    lineHeight: 1,
  },
  hamburger: { display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', padding: '8px', cursor: 'pointer' },
  bar: { display: 'block', width: '22px', height: '1.5px', background: 'var(--text-dark)' },
  mobileMenu: { display: 'flex', flexDirection: 'column', padding: '8px 24px 16px', borderTop: '1px solid var(--border)', gap: '4px' },
  mobileItem: { background: 'none', border: 'none', padding: '10px 0', textAlign: 'left', fontSize: '14px', color: 'var(--text-mid)', cursor: 'pointer', letterSpacing: '0.06em' },
}

import { useWindowWidth } from '../hooks/useWindowWidth'

// dentro do componente:
const width = useWindowWidth()
const isMobile = width < 768

export default Navbar
