import { useCart } from '../contexts/CartContext'

function ProductCard({ product }) {
  const available = product.available !== false
  const { addItem, items } = useCart()
  const inCart = items.find(i => i.id === product.id)

  return (
    <article style={s.card}>
      <div style={s.imageWrap}>
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400'}
          alt={product.name}
          style={{ ...s.image, filter: available ? 'none' : 'grayscale(60%)' }}
        />
        <span style={{ ...s.badge, background: available ? 'var(--sage)' : '#aaa' }}>
          {available ? 'Disponível' : 'Indisponível'}
        </span>
        {product.category && (
          <span style={s.category}>{product.category}</span>
        )}
      </div>

      <div style={s.body}>
        <h3 style={s.name}>{product.name}</h3>
        {product.description && (
          <p style={s.desc}>{product.description}</p>
        )}
        <div style={s.footer}>
          <span style={s.price}>
            R$ {Number(product.price).toFixed(2).replace('.', ',')}
          </span>
          {available && (
            <button
              style={{ ...s.btn, ...(inCart ? s.btnAdded : {}) }}
              onClick={() => addItem(product)}
            >
              {inCart ? `✓ (${inCart.qty})` : '+ Adicionar'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

const s = {
  card: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
  },
  imageWrap: { position: 'relative', overflow: 'hidden', height: '240px' },
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
  body: { padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' },
  name: { fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--text-dark)', fontWeight: '400' },
  desc: { fontSize: '13px', color: 'var(--text-soft)', lineHeight: '1.6', flex: 1 },
  footer: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginTop: '10px', paddingTop: '12px', borderTop: '1px solid var(--border)',
  },
  price: { fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: 'var(--blush)', fontWeight: '600' },
  btn: {
    background: 'var(--sage)', color: '#fff', border: 'none',
    padding: '9px 18px', borderRadius: 'var(--radius)', fontSize: '12px',
    letterSpacing: '0.06em', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s',
  },
  btnAdded: { background: 'var(--gold)' },
}

export default ProductCard
