import { useCart } from '../contexts/CartContext'
import { useWindowWidth } from '../hooks/useWindowWidth'

// ⚠️ Coloque seu número do WhatsApp aqui (DDD + número, sem espaços)
const WHATSAPP_NUMBER = '5566996019157'

function CartModal({ onClose }) {
  const { items, removeItem, changeQty, clearCart, total, count } = useCart()
  const width = useWindowWidth()
  const isMobile = width < 768

  function handleFinalize() {
    if (items.length === 0) return
    const lines = items.map(i =>
      `• ${i.name} (x${i.qty}) — R$ ${(Number(i.price) * i.qty).toFixed(2).replace('.', ',')}`
    ).join('\n')
    const msg =
      `Olá! Gostaria de fazer um pedido na Jana Artes Florais 🌸\n\n` +
      `*Meu pedido:*\n${lines}\n\n` +
      `*Total estimado: R$ ${total.toFixed(2).replace('.', ',')}*\n\n` +
      `Aguardo confirmação e instruções para pagamento!`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    clearCart()
    onClose()
  }

  const overlayStyle = {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: isMobile ? 'flex-end' : 'center',
    justifyContent: 'center',
    zIndex: 300,
    padding: isMobile ? '0' : '16px',
  }

  const modalStyle = {
    background: 'var(--white)',
    borderRadius: isMobile ? '20px 20px 0 0' : 'var(--radius-lg)',
    width: '100%',
    maxWidth: isMobile ? '100%' : '540px',
    maxHeight: isMobile ? '88vh' : '90vh',
    display: 'flex', flexDirection: 'column',
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden',
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>

        {/* Drag handle no mobile */}
        {isMobile && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
            <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'var(--border)' }} />
          </div>
        )}

        {/* Header */}
        <div style={s.header}>
          <div>
            <h2 style={{ ...s.title, fontSize: isMobile ? '24px' : '28px' }}>Seu Carrinho</h2>
            <p style={s.sub}>{count} {count === 1 ? 'item' : 'itens'} selecionados</p>
          </div>
          <button style={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div style={{ ...s.body, padding: isMobile ? '16px 20px' : '20px 28px' }}>
          {items.length === 0 ? (
            <div style={s.empty}>
              <span style={{ fontSize: '40px' }}>🛒</span>
              <p style={s.emptyText}>Seu carrinho está vazio</p>
              <p style={s.emptySub}>Adicione arranjos do catálogo para começar</p>
            </div>
          ) : (
            <>
              <ul style={s.list}>
                {items.map(item => (
                  <li key={item.id} style={{ ...s.item, gap: isMobile ? '10px' : '14px' }}>
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=80'}
                      alt={item.name}
                      style={{ ...s.thumb, width: isMobile ? '48px' : '56px', height: isMobile ? '48px' : '56px' }}
                    />
                    <div style={s.itemInfo}>
                      <p style={s.itemName}>{item.name}</p>
                      <p style={s.itemPrice}>R$ {Number(item.price).toFixed(2).replace('.', ',')} cada</p>
                    </div>
                    <div style={s.qtyRow}>
                      <button style={s.qtyBtn} onClick={() => changeQty(item.id, -1)}>−</button>
                      <span style={s.qtyNum}>{item.qty}</span>
                      <button style={s.qtyBtn} onClick={() => changeQty(item.id, +1)}>+</button>
                    </div>
                    {!isMobile && (
                      <div style={s.itemTotal}>
                        R$ {(Number(item.price) * item.qty).toFixed(2).replace('.', ',')}
                      </div>
                    )}
                    <button style={s.removeBtn} onClick={() => removeItem(item.id)}>✕</button>
                  </li>
                ))}
              </ul>

              <div style={s.totalRow}>
                <span style={s.totalLabel}>Total estimado</span>
                <span style={{ ...s.totalValue, fontSize: isMobile ? '24px' : '28px' }}>
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <div style={s.notice}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>💬</span>
                <p style={s.noticeText}>
                  Ao finalizar, você será direcionado ao <strong>WhatsApp</strong> com a lista completa do seu pedido. A confirmação e pagamento são combinados diretamente com a gente!
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ ...s.footer, padding: isMobile ? '12px 20px 24px' : '16px 28px', flexDirection: isMobile ? 'column' : 'row' }}>
            <button style={{ ...s.clearBtn, width: isMobile ? '100%' : 'auto' }} onClick={clearCart}>
              Limpar carrinho
            </button>
            <button style={{ ...s.finalizeBtn, width: isMobile ? '100%' : 'auto', padding: isMobile ? '14px' : '12px 24px' }} onClick={handleFinalize}>
              <span>Finalizar pelo WhatsApp</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const s = {
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: '16px 24px 14px', borderBottom: '1px solid var(--border)',
  },
  title: { fontFamily: 'Cormorant Garamond, serif', fontWeight: '400' },
  sub: { fontSize: '12px', color: 'var(--text-soft)', marginTop: '2px' },
  closeBtn: { background: 'none', border: 'none', fontSize: '18px', color: 'var(--text-soft)', cursor: 'pointer', padding: '4px' },
  body: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' },
  empty: { textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
  emptyText: { fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: 'var(--text-mid)' },
  emptySub: { fontSize: '13px', color: 'var(--text-soft)' },
  list: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' },
  item: {
    display: 'flex', alignItems: 'center',
    padding: '10px', background: 'var(--cream)',
    borderRadius: '10px', border: '1px solid var(--border)',
  },
  thumb: { objectFit: 'cover', borderRadius: '8px', flexShrink: 0 },
  itemInfo: { flex: 1, minWidth: 0 },
  itemName: { fontSize: '13px', fontWeight: '500', color: 'var(--text-dark)', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  itemPrice: { fontSize: '11px', color: 'var(--text-soft)' },
  qtyRow: { display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 },
  qtyBtn: {
    width: '30px', height: '30px', border: '1px solid var(--border)',
    background: 'var(--white)', borderRadius: '6px', cursor: 'pointer',
    fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-mid)',
  },
  qtyNum: { fontSize: '14px', fontWeight: '500', minWidth: '20px', textAlign: 'center', color: 'var(--text-dark)' },
  itemTotal: { fontFamily: 'Cormorant Garamond, serif', fontSize: '17px', color: 'var(--blush)', fontWeight: '600', flexShrink: 0 },
  removeBtn: { background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '12px', padding: '6px', flexShrink: 0 },
  totalRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 0', borderTop: '1px solid var(--border)',
  },
  totalLabel: { fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-soft)' },
  totalValue: { fontFamily: 'Cormorant Garamond, serif', color: 'var(--text-dark)', fontWeight: '600' },
  notice: {
    display: 'flex', gap: '10px', alignItems: 'flex-start',
    background: '#f0f7f1', border: '1px solid #c8e6c9',
    borderRadius: '10px', padding: '12px 14px',
  },
  noticeText: { fontSize: '12px', color: '#2e7d32', lineHeight: '1.6' },
  footer: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    borderTop: '1px solid var(--border)', gap: '10px',
  },
  clearBtn: {
    background: 'none', border: '1px solid var(--border)',
    padding: '11px 16px', borderRadius: 'var(--radius)',
    fontSize: '12px', color: 'var(--text-soft)', cursor: 'pointer',
  },
  finalizeBtn: {
    background: '#25D366', color: '#fff', border: 'none',
    borderRadius: 'var(--radius)', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
  },
}

export default CartModal
