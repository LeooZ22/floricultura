function ImageLightbox({ src, alt, onClose }) {
  return (
    <div style={s.overlay} onClick={onClose}>
      <button style={s.closeBtn} onClick={onClose}>✕</button>
      <img src={src} alt={alt} style={s.image} onClick={e => e.stopPropagation()} />
    </div>
  )
}

const s = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 400, padding: '20px',
  },
  image: {
    maxWidth: '100%', maxHeight: '90vh',
    objectFit: 'contain', borderRadius: '8px',
  },
  closeBtn: {
    position: 'absolute', top: '20px', right: '20px',
    background: 'rgba(255,255,255,0.15)', border: 'none',
    color: '#fff', fontSize: '20px', width: '40px', height: '40px',
    borderRadius: '50%', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
}

export default ImageLightbox
