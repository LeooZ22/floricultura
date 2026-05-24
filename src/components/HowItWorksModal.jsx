const STEPS = [
  {
    icon: '🌸',
    title: 'Escolha seus arranjos',
    desc: 'Navegue pelo catálogo e adicione ao carrinho os arranjos que você quer. Pode adicionar mais de um!',
  },
  {
    icon: '🛒',
    title: 'Revise seu pedido',
    desc: 'Clique no ícone do carrinho para ver o resumo completo com os itens e o valor estimado.',
  },
  {
    icon: '💬',
    title: 'Envie pelo WhatsApp',
    desc: 'Ao finalizar, a lista do seu pedido vai diretamente para o nosso WhatsApp — sem precisar digitar nada!',
  },
  {
    icon: '✅',
    title: 'Combinamos os detalhes',
    desc: 'Confirmamos disponibilidade, prazo de entrega ou retirada, e as formas de pagamento — tudo pelo chat.',
  },
]

function HowItWorksModal({ onClose }) {
  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>

        <div style={s.header}>
          <div style={s.headerText}>
            <p style={s.headerSub}>Simples e rápido</p>
            <h2 style={s.title}>Como funciona?</h2>
          </div>
          <button style={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={s.body}>
          <p style={s.intro}>
            Fazer um pedido na JR Arte Floral é muito fácil. Veja como:
          </p>

          <div style={s.steps}>
            {STEPS.map((step, i) => (
              <div key={i} style={s.step}>
                <div style={s.stepLeft}>
                  <div style={s.iconCircle}>{step.icon}</div>
                  {i < STEPS.length - 1 && <div style={s.connector} />}
                </div>
                <div style={s.stepContent}>
                  <div style={s.stepNum}>Passo {i + 1}</div>
                  <h3 style={s.stepTitle}>{step.title}</h3>
                  <p style={s.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={s.tip}>
            <span style={{ fontSize: '20px' }}>💡</span>
            <p style={s.tipText}>
              Não tem nenhum compromisso ao montar o carrinho! O pedido só é registrado quando você clica em <strong>"Finalizar pelo WhatsApp"</strong>.
            </p>
          </div>
        </div>

        <div style={s.footer}>
          <button style={s.ctaBtn} onClick={onClose}>
            Entendi, quero ver o catálogo!
          </button>
        </div>
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
    width: '100%', maxWidth: '500px',
    maxHeight: '90vh', overflow: 'hidden',
    display: 'flex', flexDirection: 'column',
    boxShadow: 'var(--shadow-lg)',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: '28px 28px 20px',
    borderBottom: '1px solid var(--border)',
    background: 'linear-gradient(135deg, #f5f0eb, #ede4db)',
  },
  headerText: {},
  headerSub: {
    fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
    color: 'var(--gold)', marginBottom: '6px', fontWeight: '500',
  },
  title: { fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: '400', color: 'var(--text-dark)' },
  closeBtn: {
    background: 'none', border: 'none', fontSize: '18px',
    color: 'var(--text-soft)', cursor: 'pointer', padding: '4px',
  },
  body: { flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' },
  intro: { fontSize: '14px', color: 'var(--text-mid)', lineHeight: '1.6' },
  steps: { display: 'flex', flexDirection: 'column' },
  step: { display: 'flex', gap: '16px', paddingBottom: '4px' },
  stepLeft: { display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 },
  iconCircle: {
    width: '48px', height: '48px', borderRadius: '50%',
    background: 'var(--cream)', border: '1px solid var(--border)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '22px', flexShrink: 0,
  },
  connector: {
    width: '1.5px', flex: 1, minHeight: '20px',
    background: 'var(--border)', margin: '6px 0',
  },
  stepContent: { paddingBottom: '20px', paddingTop: '8px' },
  stepNum: { fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: '500', marginBottom: '4px' },
  stepTitle: { fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: '400', color: 'var(--text-dark)', marginBottom: '6px' },
  stepDesc: { fontSize: '13px', color: 'var(--text-soft)', lineHeight: '1.6' },
  tip: {
    display: 'flex', gap: '12px', alignItems: 'flex-start',
    background: '#fffde7', border: '1px solid #fff59d',
    borderRadius: 'var(--radius-lg)', padding: '14px 16px',
  },
  tipText: { fontSize: '13px', color: '#795548', lineHeight: '1.6' },
  footer: { padding: '16px 28px', borderTop: '1px solid var(--border)' },
  ctaBtn: {
    width: '100%', background: 'var(--sage)', color: '#fff',
    border: 'none', padding: '14px',
    borderRadius: 'var(--radius)', fontSize: '14px',
    fontWeight: '500', cursor: 'pointer', letterSpacing: '0.04em',
  },
}

export default HowItWorksModal
