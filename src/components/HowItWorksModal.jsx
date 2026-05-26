import { useWindowWidth } from '../hooks/useWindowWidth'

const STEPS = [
  { icon: '🌸', title: 'Escolha seus arranjos', desc: 'Navegue pelo catálogo e adicione ao carrinho os arranjos que você quer. Pode adicionar mais de um!' },
  { icon: '🛒', title: 'Revise seu pedido', desc: 'Clique no ícone do carrinho para ver o resumo completo com os itens e o valor estimado.' },
  { icon: '💬', title: 'Envie pelo WhatsApp', desc: 'Ao finalizar, a lista do seu pedido vai direto para o nosso WhatsApp — sem precisar digitar nada!' },
  { icon: '✅', title: 'Combinamos os detalhes', desc: 'Confirmamos disponibilidade, prazo de entrega ou retirada, e as formas de pagamento pelo chat.' },
]

function HowItWorksModal({ onClose }) {
  const width = useWindowWidth()
  const isMobile = width < 768

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
    maxWidth: isMobile ? '100%' : '500px',
    maxHeight: isMobile ? '90vh' : '90vh',
    overflow: 'hidden',
    display: 'flex', flexDirection: 'column',
    boxShadow: 'var(--shadow-lg)',
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>

        {isMobile && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
            <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'var(--border)' }} />
          </div>
        )}

        <div style={{ ...s.header, padding: isMobile ? '16px 20px 14px' : '28px 28px 20px' }}>
          <div>
            <p style={s.headerSub}>Simples e rápido</p>
            <h2 style={{ ...s.title, fontSize: isMobile ? '26px' : '32px' }}>Como funciona?</h2>
          </div>
          <button style={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{ ...s.body, padding: isMobile ? '16px 20px' : '24px 28px' }}>
          <p style={s.intro}>Fazer um pedido na JR Arte Floral é muito fácil. Veja como:</p>

          <div style={s.steps}>
            {STEPS.map((step, i) => (
              <div key={i} style={s.step}>
                <div style={s.stepLeft}>
                  <div style={{ ...s.iconCircle, width: isMobile ? '42px' : '48px', height: isMobile ? '42px' : '48px' }}>
                    {step.icon}
                  </div>
                  {i < STEPS.length - 1 && <div style={s.connector} />}
                </div>
                <div style={{ ...s.stepContent, paddingBottom: isMobile ? '16px' : '20px' }}>
                  <div style={s.stepNum}>Passo {i + 1}</div>
                  <h3 style={{ ...s.stepTitle, fontSize: isMobile ? '17px' : '20px' }}>{step.title}</h3>
                  <p style={s.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={s.tip}>
            <span style={{ fontSize: '18px' }}>💡</span>
            <p style={s.tipText}>
              Não tem nenhum compromisso ao montar o carrinho! O pedido só é registrado quando você clica em <strong>"Finalizar pelo WhatsApp"</strong>.
            </p>
          </div>
        </div>

        <div style={{ padding: isMobile ? '12px 20px 28px' : '16px 28px', borderTop: '1px solid var(--border)' }}>
          <button style={s.ctaBtn} onClick={onClose}>
            Entendi, quero ver o catálogo!
          </button>
        </div>
      </div>
    </div>
  )
}

const s = {
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    borderBottom: '1px solid var(--border)',
    background: 'linear-gradient(135deg, #f5f0eb, #ede4db)',
  },
  headerSub: { fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px', fontWeight: '500' },
  title: { fontFamily: 'Cormorant Garamond, serif', fontWeight: '400', color: 'var(--text-dark)' },
  closeBtn: { background: 'none', border: 'none', fontSize: '18px', color: 'var(--text-soft)', cursor: 'pointer', padding: '4px' },
  body: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' },
  intro: { fontSize: '14px', color: 'var(--text-mid)', lineHeight: '1.6' },
  steps: { display: 'flex', flexDirection: 'column' },
  step: { display: 'flex', gap: '14px' },
  stepLeft: { display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 },
  iconCircle: {
    borderRadius: '50%', background: 'var(--cream)', border: '1px solid var(--border)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0,
  },
  connector: { width: '1.5px', flex: 1, minHeight: '16px', background: 'var(--border)', margin: '4px 0' },
  stepContent: { paddingTop: '6px' },
  stepNum: { fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: '500', marginBottom: '2px' },
  stepTitle: { fontFamily: 'Cormorant Garamond, serif', fontWeight: '400', color: 'var(--text-dark)', marginBottom: '4px' },
  stepDesc: { fontSize: '13px', color: 'var(--text-soft)', lineHeight: '1.6' },
  tip: {
    display: 'flex', gap: '10px', alignItems: 'flex-start',
    background: '#fffde7', border: '1px solid #fff59d',
    borderRadius: '10px', padding: '12px 14px',
  },
  tipText: { fontSize: '12px', color: '#795548', lineHeight: '1.6' },
  ctaBtn: {
    width: '100%', background: 'var(--sage)', color: '#fff',
    border: 'none', padding: '14px', borderRadius: 'var(--radius)',
    fontSize: '14px', fontWeight: '500', cursor: 'pointer', letterSpacing: '0.04em',
  },
}

export default HowItWorksModal
