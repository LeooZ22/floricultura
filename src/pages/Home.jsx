import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import HowItWorksModal from '../components/HowItWorksModal'
import { useProducts } from '../hooks/useProducts'
import { useWindowWidth } from '../hooks/useWindowWidth'

const CATEGORIES = ['Todos', 'Buquês', 'Arranjos', 'Cestas', 'Presentes', 'Plantas', 'Decoração', 'Coroa Funebre']

// Horários de funcionamento
const BUSINESS_HOURS = {
  0: null,                        // Domingo: fechado
  1: { open: 8, close: 17 },      // Segunda
  2: { open: 8, close: 17 },      // Terça
  3: { open: 8, close: 17 },      // Quarta
  4: { open: 8, close: 17 },      // Quinta
  5: { open: 8, close: 17 },      // Sexta
  6: { open: 8, close: 13 },      // Sábado
}

function getStoreStatus() {
  const now = new Date()
  const mato = new Date(now.toLocaleString('en-US', { timeZone: 'America/Cuiaba' }))
  const day = mato.getDay()
  const hour = mato.getHours()
  const minutes = mato.getMinutes()
  const currentTime = hour + minutes / 60

  const hours = BUSINESS_HOURS[day]
  if (!hours) return { open: false, label: 'Fechado hoje' }

  if (currentTime >= hours.open && currentTime < hours.close) {
    const closingIn = hours.close - currentTime
    if (closingIn <= 1) return { open: true, label: `Fecha em breve (${hours.close}h)` }
    return { open: true, label: `Aberto · fecha às ${hours.close}h` }
  }

  if (currentTime < hours.open) {
    return { open: false, label: `Abre às ${hours.open}h` }
  }

  for (let i = 1; i <= 7; i++) {
    const nextDay = (day + i) % 7
    const nextHours = BUSINESS_HOURS[nextDay]
    if (nextHours) {
      const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
      return { open: false, label: `Fechado · abre ${dayNames[nextDay]} às ${nextHours.open}h` }
    }
  }
  return { open: false, label: 'Fechado' }
}

function ProfileHeader({ isMobile, onHowOpen }) {
  const status = getStoreStatus()

  return (
    <section style={s.profileSection}>

      {/* ── BANNER DE CAPA ── */}
      <div style={s.bannerWrap}>
        <img
          src="img/banner.jpg"
          alt="Capa Jana Artes Florais"
          style={s.bannerImg}
          onError={e => { e.target.style.display = 'none' }}
        />
        {/* Fallback gradiente (aparece se /banner.jpg não existir) */}
        <div style={s.bannerFallback} />
      </div>

      {/* ── FOTO DE PERFIL (circular, sobreposta) ── */}
      <div style={{
        ...s.avatarWrap,
        width: isMobile ? '96px' : '110px',
        height: isMobile ? '96px' : '110px',
        marginTop: isMobile ? '-48px' : '-55px',
      }}>
        <img
          src="img/capa.png"
          alt="Jana Artes Florais"
          style={s.avatarImg}
          onError={e => {
            e.target.style.display = 'none'
            e.target.parentNode.querySelector('[data-fallback]').style.display = 'flex'
          }}
        />
        {/* fallback caso logo.png não carregue */}
        {/* <div data-fallback="" style={s.avatarFallback}>🌸</div> */}
      </div>

      {/* ── TEXTOS ── */}
      <div style={s.infoBlock}>
        <h1 style={{ ...s.shopName, fontSize: isMobile ? '22px' : '28px' }}>
          Janaína Rita Artes Florais
        </h1>

        <p style={{ ...s.slogan, fontSize: isMobile ? '13px' : '14px' }}>
          Flores que falam pelo coração ✦ Arranjos para todos os momentos
        </p>

        {/* Localização + Status */}
        <div style={{
          ...s.metaRow,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '6px' : '14px',
        }}>
          {/* Localização */}
          <div style={s.metaItem}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
              style={{ color: 'var(--text-soft)', flexShrink: 0 }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span style={s.metaText}>Guiratinga, MT</span>
          </div>

          {/* Ponto separador (desktop) */}
          {!isMobile && <span style={{ color: 'var(--border)', lineHeight: 1 }}>•</span>}

          {/* Status aberto/fechado */}
          <div style={s.metaItem}>
            <span style={{
              ...s.statusDot,
              background: status.open ? '#43a867' : '#e57373',
              boxShadow: status.open
                ? '0 0 0 3px rgba(67,168,103,0.22)'
                : '0 0 0 3px rgba(229,115,115,0.18)',
            }} />
            <span style={{
              ...s.metaText,
              color: status.open ? '#2e7d52' : '#c62828',
              fontWeight: '600',
            }}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Botão Como funciona */}
        <button style={s.howBtn} onClick={onHowOpen}>
          <span>✦</span> Como funciona?
        </button>
      </div>
    </section>
  )
}

function Home() {
  const { products, loading } = useProducts()
  const [filter, setFilter] = useState('Todos')
  const [howOpen, setHowOpen] = useState(false)
  const width = useWindowWidth()
  const isMobile = width < 768

  const filtered = filter === 'Todos'
    ? products
    : products.filter(p => p.category === filter)

  return (
    <main>
      <ProfileHeader isMobile={isMobile} onHowOpen={() => setHowOpen(true)} />

      {/* Catálogo */}
      <section style={{ ...s.catalog, padding: isMobile ? '32px 16px 60px' : '56px 24px 80px' }}>
        <div style={s.catalogInner}>
          <div style={{
            ...s.catalogHeader,
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
          }}>
            <h2 style={{ ...s.catalogTitle, fontSize: isMobile ? '32px' : '40px' }}>Nosso Catálogo</h2>
            <div style={s.filters}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  style={{ ...s.filterBtn, ...(filter === cat ? s.filterActive : {}) }}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div style={s.loading}>
              <div style={s.spinner} />
              <p style={{ color: 'var(--text-soft)', letterSpacing: '0.06em', fontSize: '13px' }}>CARREGANDO</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={s.empty}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', color: 'var(--text-soft)' }}>
                Nenhum arranjo encontrado
              </p>
            </div>
          ) : (
            <div style={{
              ...s.grid,
              gridTemplateColumns: isMobile
                ? '1fr'
                : width < 1024
                  ? 'repeat(2, 1fr)'
                  : 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: isMobile ? '16px' : '28px',
            }}>
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <p style={s.footerText}>Desenvolvido por © {new Date().getFullYear()} LCA Sistemas - (66) 999778651</p>
        <p style={s.footerText}>Jana Artes Florais · Guiratinga, MT</p>
        <p style={s.footerSub}>Feito com ♡ para celebrar a vida com flores</p>
      </footer>

      {howOpen && <HowItWorksModal onClose={() => setHowOpen(false)} />}
    </main>
  )
}

const s = {
  /* ── Seção de perfil ── */
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'var(--white)',
    paddingBottom: '28px',
    borderBottom: '1px solid var(--border)',
  },

  /* Banner */
  bannerWrap: {
    position: 'relative',
    width: '100%',
    height: '180px',
    background: 'linear-gradient(135deg, #7ebe91 0%, #4a9a6a 100%)',
    overflow: 'hidden',
    flexShrink: 0,
  },
bannerImg: {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'left center', // 👈 Fixa a esquerda e corta apenas o lado direito
  display: 'block',
},
  bannerFallback: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(135deg, #7ebe91 0%, #5aaa7a 50%, #4a9a6a 100%)',
    zIndex: -1,
  },

  /* Avatar circular */
  avatarWrap: {
    position: 'relative',
    borderRadius: '50%',
    border: '4px solid var(--white)',
    background: 'var(--cream)',
    overflow: 'hidden',
    boxShadow: '0 4px 18px rgba(0,0,0,0.14)',
    flexShrink: 0,
    zIndex: 1,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  avatarFallback: {
    display: 'none',
    position: 'absolute', inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    background: 'linear-gradient(135deg, #c8e6c9, #a5d6a7)',
  },

  /* Bloco de texto */
  infoBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '12px 24px 0',
    gap: '6px',
    maxWidth: '520px',
    width: '100%',
  },
  shopName: {
    fontFamily: 'Cormorant Garamond, serif',
    fontWeight: '600',
    color: 'var(--text-dark)',
    letterSpacing: '0.01em',
    margin: 0,
    lineHeight: 1.2,
  },
  slogan: {
    color: 'var(--text-soft)',
    fontWeight: '300',
    lineHeight: '1.5',
    margin: 0,
  },

  /* Linha localização + status */
  metaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2px',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  metaText: {
    fontSize: '12px',
    color: 'var(--text-soft)',
    letterSpacing: '0.02em',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
    display: 'inline-block',
  },

  /* Botão como funciona */
  howBtn: {
    marginTop: '8px',
    background: 'none',
    border: '1.5px solid var(--sage)',
    color: 'var(--sage)',
    padding: '9px 22px',
    borderRadius: '30px',
    fontSize: '12px',
    letterSpacing: '0.08em',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    fontFamily: 'Jost, sans-serif',
  },

  /* ── Catálogo ── */
  catalog: {},
  catalogInner: { maxWidth: '1200px', margin: '0 auto' },
  catalogHeader: {
    display: 'flex', flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '16px', marginBottom: '32px',
    paddingBottom: '20px', borderBottom: '1px solid var(--border)',
  },
  catalogTitle: { fontFamily: 'Cormorant Garamond, serif', fontWeight: '400' },
  filters: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  filterBtn: {
    background: 'none', border: '1px solid var(--border)',
    padding: '6px 14px', borderRadius: '20px', fontSize: '12px',
    letterSpacing: '0.04em', color: 'var(--text-soft)', cursor: 'pointer',
  },
  filterActive: { background: 'var(--sage)', borderColor: 'var(--sage)', color: '#f7f7f7' },
  grid: { display: 'grid' },
  loading: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '80px 0' },
  spinner: {
    width: '32px', height: '32px',
    border: '2px solid var(--border)', borderTopColor: 'var(--sage)',
    borderRadius: '50%', animation: 'spin 0.8s linear infinite',
  },
  empty: { textAlign: 'center', padding: '60px 0' },

  /* ── Footer ── */
  footer: {
    borderTop: '1px solid var(--border)', padding: '28px 24px',
    textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '6px',
  },
  footerText: { fontSize: '13px', color: 'var(--text-soft)', letterSpacing: '0.04em' },
  footerSub: { fontSize: '12px', color: 'var(--blush-light)' },
}

export default Home
