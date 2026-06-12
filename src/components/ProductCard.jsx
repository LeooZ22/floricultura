import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { useWindowWidth } from '../hooks/useWindowWidth'
import ImageLightbox from './ImageLightbox'

function ProductCard({ product }) {
  const available = product.available !== false
  const stock = product.stock ?? null // null = sem controle de estoque
  const isPromo = product.isPromo === true && product.promoPrice
  const outOfStock = stock !== null && stock <= 0
  const lowStock = stock !== null && stock > 0 && stock <= 3
  const isBlocked = !available || outOfStock

  const { addItem, items } = useCart()
  const inCart = items.find(i => i.id === product.id)
  const width = useWindowWidth()
  const isMobile = width < 768
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const discount = isPromo
    ? Math.round((1 - Number(product.promoPrice) / Number(product.price)) * 100)
    : 0

  const imageUrl = product.imageUrl || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400'

  return (
    <article style={{ ...s.card, opacity: isBlocked ? 0.75 : 1 }}>
      <div
        style={{ ...s.imageWrap, height: isMobile ? '320px' : '240px' }}
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={imageUrl}
          alt={product.name}
          style={{ ...s.image, filter: isBlocked ? 'grayscale(60%)' : 'none' }}
        />

        {/* Badge disponibilidade */}
        {outOfStock ? (
          <span style={{ ...s.badge, background: '#888' }}>Esgotado</span>
        ) : !available ? (
          <span style={{ ...s.badge, background: '#aaa' }}>Indisponível</span>
        ) : lowStock ? (
          <span style={{ ...s.badge, background: '#e07b39' }}>Últimas unidades</span>
        ) : (
          <span style={{ ...s.badge, background: 'var(--sage)' }}>Disponível</span>
        )}

        {/* Categoria */}
        {product.category && !isPromo && (
          <span style={s.category}>{product.category}</span>
        )}

        {/* Tag promoção */}
        {isPromo && (
          <span style={s.promoTag}>🏷 -{discount}% OFF</span>
        )}

        {/* Ícone de zoom */}
        <span style={s.zoomIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </span>
      </div>

      <div style={s.body}>
        <h3 style={s.name}>{product.name}</h3>

        {product.description && (
          <p style={s.desc}>{product.description}</p>
        )}

        {/* Estoque */}
        {stock !== null && stock > 0 && (
          <p style={{ ...s.stockText, color: lowStock ? '#e07b39' : 'var(--text-soft)' }}>
            {lowStock ? `⚠ Apenas ${stock} unidade${stock > 1 ? 's' : ''} restante${stock > 1 ? 's' : ''}` : `${stock} unidades disponíveis`}
          </p>
        )}

        <div style={s.footer}>
          {/* Preço */}
          <div style={s.priceBlock}>
            {isPromo ? (
              <>
                <span style={s.priceOld}>
                  R$ {Number(product.price).toFixed(2).replace('.', ',')}
                </span>
                <span style={s.pricePromo}>
                  R$ {Number(product.promoPrice).toFixed(2).replace('.', ',')}
                </span>
              </>
            ) : (
              <span style={s.price}>
                R$ {Number(product.price).toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          {!isBlocked && (
            <button
              style={{ ...s.btn, ...(inCart ? s.btnAdded : {}) }}
              onClick={() => addItem({ ...product, price: isPromo ? product.promoPrice : product.price })}
            >
              {inCart ? `✓ (${inCart.qty})` : '+ Adicionar'}
            </button>
          )}
        </div>
      </div>

      {lightboxOpen && (
        <ImageLightbox src={imageUrl} alt={product.name} onClose={() => setLightboxOpen(false)} />
      )}
    </article>
  )
}

const s = {
  card: {
    background: 'var(--white)', borderRadius: 'var(--radius-lg)',
    overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
    display: 'flex', flexDirection: 'column', transition: 'opacity 0.2s',
  },
  imageWrap: { position: 'relative', overflow: 'hidden', cursor: 'pointer' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: {
    position: 'absolute', top: '10px', right: '10px',
    color: '#fff', fontSize: '10px', letterSpacing: '0.08em',
    textTransform: 'uppercase', padding: '4px 10px', borderRadius: '20px', fontWeight: '500',
  },
  category: {
    position: 'absolute', top: '10px', left: '10px',
    background: 'rgba(250,247,244,0.92)', color: 'var(--gold)',
    fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '4px 10px', borderRadius: '20px', fontWeight: '500',
  },
  promoTag: {
    position: 'absolute', top: '10px', left: '10px',
    background: '#c0392b', color: '#fff',
    fontSize: '11px', letterSpacing: '0.04em',
    padding: '5px 12px', borderRadius: '20px', fontWeight: '700',
  },
  zoomIcon: {
    position: 'absolute', bottom: '10px', right: '10px',
    background: 'rgba(0,0,0,0.4)', color: '#fff',
    width: '30px', height: '30px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  body: { padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' },
  name: { fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--text-dark)', fontWeight: '400' },
  desc: { fontSize: '13px', color: 'var(--text-soft)', lineHeight: '1.6', flex: 1 },
  stockText: { fontSize: '12px', fontWeight: '500' },
  footer: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginTop: '10px', paddingTop: '12px', borderTop: '1px solid var(--border)',
  },
  priceBlock: { display: 'flex', flexDirection: 'column', gap: '2px' },
  price: { fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: 'var(--blush)', fontWeight: '600' },
  priceOld: {
    fontFamily: 'Cormorant Garamond, serif', fontSize: '15px',
    color: 'var(--text-soft)', textDecoration: 'line-through',
  },
  pricePromo: {
    fontFamily: 'Cormorant Garamond, serif', fontSize: '22px',
    color: '#c0392b', fontWeight: '600',
  },
  btn: {
    background: 'var(--sage)', color: '#fff', border: 'none',
    padding: '9px 18px', borderRadius: 'var(--radius)', fontSize: '12px',
    letterSpacing: '0.06em', fontWeight: '500', cursor: 'pointer',
  },
  btnAdded: { background: 'var(--gold)' },
}

export default ProductCard
