import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

function Login({ setCurrentPage }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      setCurrentPage('admin')
    } catch {
      setError('E-mail ou senha incorretos. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={s.page}>
      <div style={s.card}>
        <div style={s.top}>
          <div style={s.icon}>✦</div>
          <h1 style={s.title}>Área do Gestor</h1>
          <p style={s.sub}>Acesso restrito · Jana Artes Florais</p>
        </div>

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={s.input}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={s.input}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p style={s.error}>{error}</p>}

          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <button style={s.back} onClick={() => setCurrentPage('home')}>
          ← Voltar ao catálogo
        </button>
      </div>
    </main>
  )
}

const s = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'linear-gradient(135deg, #f5f0eb 0%, #ede4db 100%)',
  },
  card: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  top: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' },
  icon: { fontSize: '28px', color: 'var(--gold)', marginBottom: '4px' },
  title: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '32px',
    fontWeight: '400',
    color: 'var(--text-dark)',
  },
  sub: { fontSize: '13px', color: 'var(--text-soft)', letterSpacing: '0.06em' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: {
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--text-soft)',
    fontWeight: '500',
  },
  input: {
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '12px 14px',
    fontSize: '14px',
    color: 'var(--text-dark)',
    background: 'var(--cream)',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  error: {
    fontSize: '13px',
    color: '#c0392b',
    background: '#fdf0ef',
    padding: '10px 14px',
    borderRadius: 'var(--radius)',
    border: '1px solid #f5c6c2',
  },
  btn: {
    background: 'var(--sage)',
    color: '#fff',
    border: 'none',
    padding: '14px',
    borderRadius: 'var(--radius)',
    fontSize: '13px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'opacity 0.2s',
  },
  back: {
    background: 'none',
    border: 'none',
    color: 'var(--text-soft)',
    fontSize: '13px',
    cursor: 'pointer',
    textAlign: 'center',
  },
}

export default Login
