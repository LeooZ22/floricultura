import { useCart } from '../contexts/CartContext'

// ⚠️ Coloque seu número do WhatsApp aqui (DDD + número, sem espaços)
const WHATSAPP_NUMBER = '66996014617'

function CartModal({ onClose }) {
  const { items, removeItem, changeQty, clearCart, total, count } = useCart()

  function handleFinalize() {
    if (items.length === 0) return

    const lines = items.map(i =>
      `• ${i.name} (x${i.qty}) — R$ ${(Number(i.price) * i.qty).toFixed(2).replace('.', ',')}`
    ).join('\n')

    const msg =
      `Olá! Gostaria de fazer um pedido na JR Arte Floral 🌸\n\n` +
      `*Meu pedido:*\n${lines}\n\n` +
      `*Total estimado: R$ ${total.toFixed(2).replace('.', ',')}*\n\n` +
      `Aguardo confirmação e instruções para pagamento!`

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    clearCart()
    onClose()
  }

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={s.header}>
          <div>
            <h2 style={s.title}>Seu Carrinho</h2>
            <p style={s.sub}>{count} {count === 1 ? 'item' : 'itens'} selecionados</p>
          </div>
          <button style={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Items */}
        <div style={s.body}>
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
                  <li key={item.id} style={s.item}>
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=80'}
                      alt={item.name}
                      style={s.thumb}
                    />
                    <div style={s.itemInfo}>
                      <p style={s.itemName}>{item.name}</p>
                      <p style={s.itemPrice}>
                        R$ {Number(item.price).toFixed(2).replace('.', ',')} cada
                      </p>
                    </div>
                    <div style={s.qtyRow}>
                      <button style={s.qtyBtn} onClick={() => changeQty(item.id, -1)}>−</button>
                      <span style={s.qtyNum}>{item.qty}</span>
                      <button style={s.qtyBtn} onClick={() => changeQty(item.id, +1)}>+</button>
                    </div>
                    <div style={s.itemTotal}>
                      R$ {(Number(item.price) * item.qty).toFixed(2).replace('.', ',')}
                    </div>
                    <button style={s.removeBtn} onClick={() => removeItem(item.id)} title="Remover">✕</button>
                  </li>
                ))}
              </ul>

              {/* Total */}
              <div style={s.totalRow}>
                <span style={s.totalLabel}>Total estimado</span>
                <span style={s.totalValue}>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>

              {/* WhatsApp notice */}
              <div style={s.notice}>
                <span style={s.noticeIcon}>💬</span>
                <p style={s.noticeText}>
                  Ao finalizar, você será direcionado ao <strong>WhatsApp</strong> com a lista completa do seu pedido. 
                  A confirmação e o pagamento são combinados diretamente com a gente!
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={s.footer}>
            <button style={s.clearBtn} onClick={clearCart}>Limpar carrinho</button>
            <button style={s.finalizeBtn} onClick={handleFinalize}>
              <span>Finalizar pelo WhatsApp</span>
              <span style={{ fontSize: '18px' }}>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const s = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 300, padding: '16px',
  },
  modal: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    width: '100%', maxWidth: '540px',
    maxHeight: '90vh',
    display: 'flex', flexDirection: 'column',
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: '24px 28px 20px',
    borderBottom: '1px solid var(--border)',
  },
  title: { fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: '400' },
  sub: { fontSize: '13px', color: 'var(--text-soft)', marginTop: '2px' },
  closeBtn: {
    background: 'none', border: 'none', fontSize: '18px',
    color: 'var(--text-soft)', cursor: 'pointer', padding: '4px', lineHeight: 1,
  },
  body: { flex: 1, overflowY: 'auto', padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: '16px' },
  empty: { textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
  emptyText: { fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: 'var(--text-mid)' },
  emptySub: { fontSize: '13px', color: 'var(--text-soft)' },
  list: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' },
  item: {
    display: 'flex', alignItems: 'center', gap: '14px',
    padding: '12px', background: 'var(--cream)',
    borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)',
  },
  thumb: { width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 },
  itemInfo: { flex: 1, minWidth: 0 },
  itemName: { fontSize: '14px', fontWeight: '500', color: 'var(--text-dark)', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  itemPrice: { fontSize: '12px', color: 'var(--text-soft)' },
  qtyRow: { display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 },
  qtyBtn: {
    width: '28px', height: '28px', border: '1px solid var(--border)',
    background: 'var(--white)', borderRadius: '6px',
    cursor: 'pointer', fontSize: '16px', lineHeight: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--text-mid)',
  },
  qtyNum: { fontSize: '14px', fontWeight: '500', minWidth: '20px', textAlign: 'center', color: 'var(--text-dark)' },
  itemTotal: { fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: 'var(--blush)', fontWeight: '600', flexShrink: 0 },
  removeBtn: {
    background: 'none', border: 'none', color: '#ccc',
    cursor: 'pointer', fontSize: '13px', padding: '4px', flexShrink: 0,
    transition: 'color 0.15s',
  },
  totalRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 0', borderTop: '1px solid var(--border)',
  },
  totalLabel: { fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-soft)' },
  totalValue: { fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', color: 'var(--text-dark)', fontWeight: '600' },
  notice: {
    display: 'flex', gap: '12px', alignItems: 'flex-start',
    background: '#f0f7f1', border: '1px solid #c8e6c9',
    borderRadius: 'var(--radius-lg)', padding: '14px 16px',
  },
  noticeIcon: { fontSize: '20px', flexShrink: 0, marginTop: '1px' },
  noticeText: { fontSize: '13px', color: '#2e7d32', lineHeight: '1.6' },
  footer: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 28px', borderTop: '1px solid var(--border)', gap: '12px',
  },
  clearBtn: {
    background: 'none', border: '1px solid var(--border)',
    padding: '10px 16px', borderRadius: 'var(--radius)',
    fontSize: '12px', color: 'var(--text-soft)', cursor: 'pointer',
    letterSpacing: '0.04em',
  },
  finalizeBtn: {
    background: '#25D366', color: '#fff', border: 'none',
    padding: '12px 24px', borderRadius: 'var(--radius)',
    fontSize: '14px', fontWeight: '600', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '10px',
    flex: 1, justifyContent: 'center',
    letterSpacing: '0.02em',
  },
}

export default CartModal
