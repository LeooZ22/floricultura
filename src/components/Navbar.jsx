import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useWindowWidth } from '../hooks/useWindowWidth'
import CartModal from './CartModal'
import logo from '../assets/logo.png'

function Navbar({ currentPage, setCurrentPage }) {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const width = useWindowWidth()
  const isMobile = width < 768

  function go(page) {
    setCurrentPage(page)
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={s.nav}>
        <div style={s.inner}>

          {/* Logo */}
          <button style={s.logoBtn} onClick={() => go('home')}>
            <img src={logo} alt="Jana Artes Florais" style={isMobile ? s.logoImgSm : s.logoImg} />
            {!isMobile && <span style={s.logoText}>Jana Artes Florais</span>}
          </button>

          <div style={s.right}>
            {/* Desktop menu */}
            {!isMobile && (
              <ul style={s.menu}>
                <li>
                  <button
                    style={{ ...s.menuItem, ...(currentPage === 'home' ? s.menuActive : {}) }}
                    onClick={() => go('home')}
                  >
                    Catálogo
                  </button>
                </li>
                {user ? (
                  <>
                    <li>
                      <button
                        style={{ ...s.menuItem, ...(currentPage === 'admin' ? s.menuActive : {}) }}
                        onClick={() => go('admin')}
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
                    <button style={s.loginBtn} onClick={() => go('login')}>
                      Área do Gestor
                    </button>
                  </li>
                )}
              </ul>
            )}

            {/* Carrinho */}
            <button style={{ ...s.cartBtn, ...(count > 0 ? s.cartBtnActive : {}) }} onClick={() => setCartOpen(true)}>
              <span style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: count > 0 ? '#fff' : 'var(--sage)' }}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {count > 0 && <span style={s.cartBadge}>{count}</span>}
              </span>
              {count > 0 && (
                <span style={s.cartBtnText}>Finalizar pedido</span>
              )}
            </button>

            {/* Hamburguer mobile */}
            {isMobile && (
              <button style={s.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
                <span style={{ ...s.bar, transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'transform 0.2s' }} />
                <span style={{ ...s.bar, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
                <span style={{ ...s.bar, transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: 'transform 0.2s' }} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMobile && menuOpen && (
          <div style={s.mobileMenu}>
            <button style={s.mobileItem} onClick={() => go('home')}>
              <span>🌸</span> Catálogo
            </button>
            {user ? (
              <>
                <button style={s.mobileItem} onClick={() => go('admin')}>
                  <span>⚙️</span> Painel do Gestor
                </button>
                <button style={{ ...s.mobileItem, color: 'var(--blush)' }} onClick={() => { logout(); setMenuOpen(false) }}>
                  <span>↩</span> Sair
                </button>
              </>
            ) : (
              <button style={s.mobileItem} onClick={() => go('login')}>
                <span>🔑</span> Área do Gestor
              </button>
            )}
          </div>
        )}
      </nav>

      {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}
    </>
  )
}

const s = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgb(255, 255, 255)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border)',
  },
  inner: {
    maxWidth: '1200px', margin: '0 auto', padding: '0 20px',
    height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logoBtn: { background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  logoImg: { width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' },
  logoImgSm: { width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' },
  logoText: { fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: '400', color: 'var(--sage)', letterSpacing: '0.02em' },
  right: { display: 'flex', alignItems: 'center', gap: '4px' },
  menu: { display: 'flex', alignItems: 'center', gap: '10px', listStyle: 'none' },
  menuItem: {
    background: 'none', border: 'none', padding: '8px 14px',
    color: 'var(--text-mid)', fontSize: '12px', letterSpacing: '0.08em',
    textTransform: 'uppercase', fontWeight: '400', cursor: 'pointer',
  },
  menuActive: { color: 'var(--sage)', borderBottom: '1.5px solid var(--sage)' },
  loginBtn: {
    background: 'none', border: '1px solid var(--sage)',
    padding: '7px 16px', color: 'var(--sage)', fontSize: '11px',
    letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 'var(--radius)', cursor: 'pointer',
  },
  logoutBtn: {
    background: 'none', border: '1px solid var(--border)',
    padding: '7px 16px', color: 'var(--text-soft)', fontSize: '11px',
    letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 'var(--radius)', cursor: 'pointer',
  },
  cartBtn: {
    position: 'relative', background: 'none', border: 'none',
    cursor: 'pointer', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px',
    borderRadius: '20px', transition: 'all 0.25s ease',
  },
  cartBtnActive: {
    background: 'var(--sage)',
    padding: '8px 18px 8px 10px',
  },
  cartBtnText: {
    color: '#fff', fontSize: '12px', fontWeight: '600',
    letterSpacing: '0.04em', whiteSpace: 'nowrap',
  },
  cartBadge: {
    position: 'absolute', top: '4px', right: '4px',
    background: 'var(--blush)', color: '#fff',
    fontSize: '9px', fontWeight: '700',
    width: '16px', height: '16px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  hamburger: {
    display: 'flex', flexDirection: 'column', gap: '5px',
    background: 'none', border: 'none', padding: '10px', cursor: 'pointer',
  },
  bar: { display: 'block', width: '22px', height: '1.5px', background: 'var(--text-dark)' },
  mobileMenu: {
    display: 'flex', flexDirection: 'column',
    padding: '8px 0 16px', borderTop: '1px solid var(--border)',
    background: 'var(--white)',
  },
  mobileItem: {
    background: 'none', border: 'none', padding: '14px 24px',
    textAlign: 'left', fontSize: '15px', color: 'var(--text-dark)',
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
    fontFamily: 'Cormorant Garamond, serif', fontWeight: '400',
    borderBottom: '1px solid var(--border)',
  },
}

export default Navbar
