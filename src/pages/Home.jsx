import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import HowItWorksModal from '../components/HowItWorksModal'
import { useProducts } from '../hooks/useProducts'
import { useWindowWidth } from '../hooks/useWindowWidth'

const CATEGORIES = ['Todos', 'Buquês', 'Arranjos', 'Cestas', 'Presentes']

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
      {/* Hero */}
      <section style={{ ...s.hero, padding: isMobile ? '60px 20px 10px' : '10px 24px 10px' }}>
        <div style={s.heroInner}>
          
          <button style={s.howBtn} onClick={() => setHowOpen(true)}>
            <span style={{ fontSize: '14px' }}>✦</span>
            Como funciona?
          </button>
        </div>
        <div style={s.heroPattern} aria-hidden="true" />
      </section>

      {/* Catalog */}
      <section style={{ ...s.catalog, padding: isMobile ? '40px 16px 60px' : '14px 24px 80px' }}>
        <div style={s.catalogInner}>
          <div style={{ ...s.catalogHeader, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'flex-end' }}>
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
        <p style={s.footerText}>© {new Date().getFullYear()} LCA - Sistemas fone: (66) 99977-8651 · Guiratinga, MT</p>
        <p style={s.footerSub}>Feito com ♡ para celebrar a vida com flores</p>
        <p style={s.footerSub}></p>
      </footer>

      {howOpen && <HowItWorksModal onClose={() => setHowOpen(false)} />}
    </main>
  )
}

const s = {
  hero: {
    position: 'relative', overflow: 'hidden',
    background: 'linear-gradient(135deg, #f5f0eb 0%, #ede4db 100%)',
    textAlign: 'center',
  },
  heroInner: { position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' },
  heroSub: {
    fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
    color: 'var(--gold)', marginBottom: '16px', fontWeight: '500',
  },
  heroTitle: {
    fontFamily: 'Cormorant Garamond, serif',
    fontWeight: '300', color: 'var(--text-dark)', lineHeight: '1.1', marginBottom: '16px',
  },
  heroDesc: { color: 'var(--text-mid)', lineHeight: '1.8', fontWeight: '300' },
  heroDivider: { width: '40px', height: '1.5px', background: 'var(--blush)', margin: '24px auto 20px' },
  howBtn: {
    background: 'none', border: '1.5px solid var(--sage)', color: 'var(--sage)',
    padding: '11px 26px', borderRadius: '30px', fontSize: '12px',
    letterSpacing: '0.08em', fontWeight: '500', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    fontFamily: 'Jost, sans-serif',
  },
  heroPattern: {
    position: 'absolute', inset: 0,
    backgroundImage: `radial-gradient(circle at 20% 80%, rgba(201,148,138,0.12) 0%, transparent 50%),
                       radial-gradient(circle at 80% 20%, rgba(107,124,110,0.10) 0%, transparent 50%)`,
    pointerEvents: 'none',
  },
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
  filterActive: { background: 'var(--sage)', borderColor: 'var(--sage)', color: '#fff' },
  grid: { display: 'grid' },
  loading: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '80px 0' },
  spinner: {
    width: '32px', height: '32px',
    border: '2px solid var(--border)', borderTopColor: 'var(--sage)',
    borderRadius: '50%', animation: 'spin 0.8s linear infinite',
  },
  empty: { textAlign: 'center', padding: '60px 0' },
  footer: {
    borderTop: '1px solid var(--border)', padding: '28px 24px',
    textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '6px',
  },
  footerText: { fontSize: '13px', color: 'var(--text-soft)', letterSpacing: '0.04em' },
  footerSub: { fontSize: '12px', color: 'var(--blush-light)' },
}

export default Home
