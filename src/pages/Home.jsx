import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import HowItWorksModal from '../components/HowItWorksModal'
import { useProducts } from '../hooks/useProducts'

const CATEGORIES = ['Todos', 'Buquês', 'Arranjos', 'Cestas', 'Presentes']

function Home() {
  const { products, loading } = useProducts()
  const [filter, setFilter] = useState('Todos')
  const [howOpen, setHowOpen] = useState(false)

  const filtered = filter === 'Todos'
    ? products
    : products.filter(p => p.category === filter)
  const styles = {
  container: {
    margin: '0',
    padding: '0',
   }
  }
  return (
    <main>
      {/* Hero */}             
      <section style={s.hero}>        
          <button style={s.howBtn} onClick={() => setHowOpen(true)}>
            <span style={{ fontSize: '19px' }}>✦</span>
            Como funciona?
          </button>
      </section>

      {/* Catalog */}
      <section style={s.catalog}>
        <div style={s.catalogInner}>
          <div style={s.catalogHeader}>
            <h2 style={s.catalogTitle}>Nosso Catálogo</h2>
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
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', color: 'var(--text-soft)' }}>
                Nenhum arranjo encontrado
              </p>
            </div>
          ) : (
            <div style={s.grid}>
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <p style={s.footerText}>© {new Date().getFullYear()} JR Arte Floral · Rondonópolis, MT</p>
        <p style={s.footerSub}>Feito com ♡ para celebrar a vida com flores</p>
      </footer>

      {howOpen && <HowItWorksModal onClose={() => setHowOpen(false)} />}
    </main>
  )

}



const s = {
  hero: {
    position: 'relative', overflow: 'hidden',
    background: 'linear-gradient(135deg, #f5f0eb 0%, #ede4db 100%)',
    padding: '10px 24px 10px', textAlign: 'center',
  },
  heroInner: { position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' },
  heroSub: {
    fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase',
    color: 'var(--gold)', marginBottom: '20px', fontWeight: '500',
  },
  heroTitle: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: '300',
    color: 'var(--text-dark)', lineHeight: '1.1', marginBottom: '20px',
  },
  heroDesc: { fontSize: '15px', color: 'var(--text-mid)', lineHeight: '1.8', fontWeight: '300' },
  heroDivider: { width: '40px', height: '1.5px', background: 'var(--blush)', margin: '28px auto 24px' },
  howBtn: {
    background: 'none',
    border: '1.5px solid var(--sage)',
    color: 'var(--sage)',
    padding: '12px 28px',
    borderRadius: '30px',
    fontSize: '13px',
    letterSpacing: '0.08em',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
    fontFamily: 'Jost, sans-serif',
  },
  heroPattern: {
    position: 'absolute', inset: 0,
    backgroundImage: `radial-gradient(circle at 20% 80%, rgba(201,148,138,0.12) 0%, transparent 50%),
                       radial-gradient(circle at 80% 20%, rgba(107,124,110,0.10) 0%, transparent 50%)`,
    pointerEvents: 'none',
  },
  catalog: { padding: '64px 24px 80px' },
  catalogInner: { maxWidth: '1200px', margin: '0 auto' },
  catalogHeader: {
    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
    alignItems: 'flex-end', gap: '20px', marginBottom: '40px',
    paddingBottom: '24px', borderBottom: '1px solid var(--border)',
  },
  catalogTitle: { fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: '400' },
  filters: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  filterBtn: {
    background: 'none', border: '1px solid var(--border)',
    padding: '7px 16px', borderRadius: '20px', fontSize: '12px',
    letterSpacing: '0.06em', color: 'var(--text-soft)', cursor: 'pointer',
  },
  filterActive: { background: 'var(--sage)', borderColor: 'var(--sage)', color: '#fff' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' },
  loading: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '80px 0' },
  spinner: {
    width: '32px', height: '32px',
    border: '2px solid var(--border)', borderTopColor: 'var(--sage)',
    borderRadius: '50%', animation: 'spin 0.8s linear infinite',
  },
  empty: { textAlign: 'center', padding: '80px 0' },
  footer: {
    borderTop: '1px solid var(--border)', padding: '32px 24px',
    textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '6px',
  },
  footerText: { fontSize: '13px', color: 'var(--text-soft)', letterSpacing: '0.04em' },
  footerSub: { fontSize: '12px', color: 'var(--blush-light)' },
}

export default Home
