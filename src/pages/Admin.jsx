import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useAuth } from '../contexts/AuthContext'

const EMPTY = { name: '', description: '', price: '', category: '', available: true, imageUrl: '' }
const CATEGORIES = ['Buquês', 'Arranjos', 'Cestas', 'Presentes']

function Admin({ setCurrentPage }) {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts()
  const { user } = useAuth()
  const [modal, setModal] = useState(null) // null | 'add' | 'edit'
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  function openAdd() {
    setForm(EMPTY)
    setEditId(null)
    setImageFile(null)
    setImagePreview('')
    setModal('add')
  }

  function openEdit(product) {
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || '',
      available: product.available !== false,
      imageUrl: product.imageUrl || '',
    })
    setEditId(product.id)
    setImageFile(null)
    setImagePreview(product.imageUrl || '')
    setModal('edit')
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function handleSave() {
    if (!form.name || !form.price) return
    setSaving(true)
    try {
      if (modal === 'add') {
        await addProduct(form, imageFile)
      } else {
        await updateProduct(editId, form, imageFile)
      }
      setModal(null)
    } catch (err) {
      alert('Erro ao salvar: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(product) {
    setDeletingId(product.id)
    try {
      await deleteProduct(product.id, product.imageUrl)
      setConfirmDelete(null)
    } catch (err) {
      alert('Erro ao excluir: ' + err.message)
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const available = products.filter(p => p.available !== false).length
  const unavailable = products.length - available

  return (
    <main style={s.page}>
      <div style={s.inner}>

        {/* Header */}
        <div style={s.header}>
          <div>
            <h1 style={s.title}>Painel de Gestão</h1>
            <p style={s.sub}>{user?.email}</p>
          </div>
          <button style={s.addBtn} onClick={openAdd}>+ Novo Arranjo</button>
        </div>

        {/* Stats */}
        <div style={s.stats}>
          {[
            { label: 'Total no catálogo', value: products.length },
            { label: 'Disponíveis', value: available },
            { label: 'Indisponíveis', value: unavailable },
          ].map(stat => (
            <div key={stat.label} style={s.statCard}>
              <span style={s.statValue}>{stat.value}</span>
              <span style={s.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={s.searchWrap}>
          <input
            style={s.search}
            placeholder="Buscar arranjo..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        {loading ? (
          <div style={s.loading}>Carregando...</div>
        ) : filtered.length === 0 ? (
          <div style={s.empty}>Nenhum produto encontrado</div>
        ) : (
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>
                  {['Foto', 'Nome', 'Categoria', 'Preço', 'Status', 'Ações'].map(h => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(product => (
                  <tr key={product.id} style={s.tr}>
                    <td style={s.td}>
                      <img
                        src={product.imageUrl || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=80'}
                        alt={product.name}
                        style={s.thumb}
                      />
                    </td>
                    <td style={s.td}>
                      <span style={s.productName}>{product.name}</span>
                      {product.description && (
                        <span style={s.productDesc}>{product.description.slice(0, 60)}{product.description.length > 60 ? '...' : ''}</span>
                      )}
                    </td>
                    <td style={s.td}>
                      <span style={s.categoryTag}>{product.category || '—'}</span>
                    </td>
                    <td style={s.td}>
                      <span style={s.priceText}>
                        R$ {Number(product.price).toFixed(2).replace('.', ',')}
                      </span>
                    </td>
                    <td style={s.td}>
                      <span style={{
                        ...s.statusBadge,
                        background: product.available !== false ? '#e8f5e9' : '#fce4ec',
                        color: product.available !== false ? '#388e3c' : '#c62828',
                      }}>
                        {product.available !== false ? 'Disponível' : 'Indisponível'}
                      </span>
                    </td>
                    <td style={s.td}>
                      <div style={s.actions}>
                        <button style={s.editBtn} onClick={() => openEdit(product)}>Editar</button>
                        <button
                          style={s.deleteBtn}
                          onClick={() => setConfirmDelete(product)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div style={s.overlay} onClick={() => setModal(null)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <h2 style={s.modalTitle}>
                {modal === 'add' ? 'Novo Arranjo' : 'Editar Arranjo'}
              </h2>
              <button style={s.closeBtn} onClick={() => setModal(null)}>✕</button>
            </div>

            <div style={s.modalBody}>
              {/* Image upload */}
              <div style={s.imageUpload}>
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" style={s.preview} />
                ) : (
                  <div style={s.imagePlaceholder}>
                    <span style={{ fontSize: '32px' }}>🌸</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-soft)' }}>Sem imagem</span>
                  </div>
                )}
                <label style={s.uploadLabel}>
                  {imagePreview ? 'Trocar foto' : 'Adicionar foto'}
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                </label>
              </div>

              <div style={s.fields}>
                <Field label="Nome do Arranjo *">
                  <input
                    style={s.input}
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Ex: Buquê de Rosas Vermelhas"
                  />
                </Field>

                <Field label="Descrição">
                  <textarea
                    style={{ ...s.input, height: '80px', resize: 'vertical' }}
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Descreva o arranjo, flores utilizadas, ocasião..."
                  />
                </Field>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <Field label="Preço (R$) *">
                    <input
                      style={s.input}
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.price}
                      onChange={e => setForm({ ...form, price: e.target.value })}
                      placeholder="0,00"
                    />
                  </Field>

                  <Field label="Categoria">
                    <select
                      style={s.input}
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="">Selecione</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Disponibilidade">
                  <div style={s.toggleRow}>
                    <span style={{ fontSize: '14px', color: 'var(--text-mid)' }}>
                      {form.available ? 'Disponível para encomenda' : 'Indisponível no momento'}
                    </span>
                    <button
                      style={{ ...s.toggle, background: form.available ? 'var(--sage)' : 'var(--border)' }}
                      onClick={() => setForm({ ...form, available: !form.available })}
                    >
                      <span style={{
                        ...s.toggleThumb,
                        transform: form.available ? 'translateX(22px)' : 'translateX(2px)',
                      }} />
                    </button>
                  </div>
                </Field>

                <Field label="URL da Imagem (alternativa)">
                  <input
                    style={s.input}
                    value={form.imageUrl}
                    onChange={e => { setForm({ ...form, imageUrl: e.target.value }); setImagePreview(e.target.value); setImageFile(null) }}
                    placeholder="https://..."
                  />
                </Field>
              </div>
            </div>

            <div style={s.modalFooter}>
              <button style={s.cancelBtn} onClick={() => setModal(null)}>Cancelar</button>
              <button style={s.saveBtn} onClick={handleSave} disabled={saving || !form.name || !form.price}>
                {saving ? 'Salvando...' : modal === 'add' ? 'Adicionar' : 'Salvar alterações'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div style={s.overlay} onClick={() => setConfirmDelete(null)}>
          <div style={{ ...s.modal, maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <h2 style={s.modalTitle}>Confirmar exclusão</h2>
              <button style={s.closeBtn} onClick={() => setConfirmDelete(null)}>✕</button>
            </div>
            <div style={{ padding: '24px 28px' }}>
              <p style={{ color: 'var(--text-mid)', lineHeight: '1.6' }}>
                Tem certeza que deseja excluir <strong>"{confirmDelete.name}"</strong>?<br />
                Essa ação não pode ser desfeita.
              </p>
            </div>
            <div style={s.modalFooter}>
              <button style={s.cancelBtn} onClick={() => setConfirmDelete(null)}>Cancelar</button>
              <button
                style={{ ...s.saveBtn, background: '#c62828' }}
                onClick={() => handleDelete(confirmDelete)}
                disabled={deletingId === confirmDelete.id}
              >
                {deletingId === confirmDelete.id ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-soft)',
        fontWeight: '500',
      }}>{label}</label>
      {children}
    </div>
  )
  
}

const s = {
  page: { minHeight: '100vh', padding: '40px 24px' },
  inner: { maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: '16px',
  },
  title: { fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: '400' },
  sub: { fontSize: '13px', color: 'var(--text-soft)', marginTop: '4px' },
  addBtn: {
    background: 'var(--sage)',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: 'var(--radius)',
    fontSize: '13px',
    letterSpacing: '0.06em',
    cursor: 'pointer',
    fontWeight: '500',
  },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' },
  statCard: {
    background: 'var(--white)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statValue: { fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: '400', color: 'var(--text-dark)', lineHeight: 1 },
  statLabel: { fontSize: '12px', color: 'var(--text-soft)', letterSpacing: '0.06em' },
  searchWrap: {},
  search: {
    width: '100%',
    maxWidth: '360px',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '11px 16px',
    fontSize: '14px',
    background: 'var(--white)',
    outline: 'none',
    color: 'var(--text-dark)',
  },
  tableWrap: {
    background: 'var(--white)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    overflowX: 'auto',   // já tem, mas confirme
    WebkitOverflowScrolling: 'touch', // scroll suave no iOS
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--text-soft)',
    fontWeight: '500',
    background: 'var(--cream)',
    borderBottom: '1px solid var(--border)',
  },
  tr: { borderBottom: '1px solid var(--border)', transition: 'background 0.15s' },
  td: { padding: '14px 16px', verticalAlign: 'middle' },
  thumb: { width: '52px', height: '52px', objectFit: 'cover', borderRadius: '8px' },
  productName: { display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--text-dark)' },
  productDesc: { display: 'block', fontSize: '12px', color: 'var(--text-soft)', marginTop: '2px' },
  categoryTag: {
    background: 'var(--cream)',
    border: '1px solid var(--border)',
    color: 'var(--gold)',
    fontSize: '11px',
    padding: '3px 10px',
    borderRadius: '20px',
    letterSpacing: '0.06em',
  },
  priceText: { fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: 'var(--blush)', fontWeight: '600' },
  statusBadge: { fontSize: '11px', padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.06em', fontWeight: '500' },
  actions: { display: 'flex', gap: '8px' },
  editBtn: {
    background: 'none',
    border: '1px solid var(--sage)',
    color: 'var(--sage)',
    padding: '6px 14px',
    borderRadius: 'var(--radius)',
    fontSize: '12px',
    cursor: 'pointer',
    letterSpacing: '0.04em',
  },
  deleteBtn: {
    background: 'none',
    border: '1px solid #e0c0be',
    color: '#c0392b',
    padding: '6px 14px',
    borderRadius: 'var(--radius)',
    fontSize: '12px',
    cursor: 'pointer',
    letterSpacing: '0.04em',
  },
  loading: { textAlign: 'center', padding: '60px', color: 'var(--text-soft)', fontFamily: 'Cormorant Garamond, serif', fontSize: '22px' },
  empty: { textAlign: 'center', padding: '60px', color: 'var(--text-soft)', fontFamily: 'Cormorant Garamond, serif', fontSize: '22px' },
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 200, padding: '16px',
  },
  modal: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--shadow-lg)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 28px',
    borderBottom: '1px solid var(--border)',
  },
  modalTitle: { fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontWeight: '400' },
  closeBtn: { background: 'none', border: 'none', fontSize: '18px', color: 'var(--text-soft)', cursor: 'pointer', padding: '4px' },
  modalBody: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  imageUpload: { display: 'flex', alignItems: 'center', gap: '20px' },
  preview: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' },
  imagePlaceholder: {
    width: '80px', height: '80px',
    border: '2px dashed var(--border)',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
  },
  uploadLabel: {
    border: '1px solid var(--border)',
    padding: '8px 16px',
    borderRadius: 'var(--radius)',
    fontSize: '12px',
    color: 'var(--text-mid)',
    cursor: 'pointer',
    letterSpacing: '0.06em',
  },
  fields: { display: 'flex', flexDirection: 'column', gap: '14px' },
  input: {
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '10px 12px',
    fontSize: '14px',
    color: 'var(--text-dark)',
    background: 'var(--cream)',
    outline: 'none',
    width: '100%',
  },
  toggleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  toggle: {
    width: '46px',
    height: '26px',
    border: 'none',
    borderRadius: '13px',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background 0.2s',
    flexShrink: 0,
  },
  toggleThumb: {
    position: 'absolute',
    top: '3px',
    width: '20px',
    height: '20px',
    background: '#fff',
    borderRadius: '50%',
    transition: 'transform 0.2s',
    display: 'block',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '16px 28px',
    borderTop: '1px solid var(--border)',
  },
  cancelBtn: {
    background: 'none',
    border: '1px solid var(--border)',
    padding: '10px 20px',
    borderRadius: 'var(--radius)',
    fontSize: '13px',
    color: 'var(--text-soft)',
    cursor: 'pointer',
  },
  saveBtn: {
    background: 'var(--sage)',
    color: '#fff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: 'var(--radius)',
    fontSize: '13px',
    letterSpacing: '0.06em',
    cursor: 'pointer',
    fontWeight: '500',
  },
}

export default Admin
