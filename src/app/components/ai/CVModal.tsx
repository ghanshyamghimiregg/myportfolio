import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Download } from 'lucide-react'
import { AI } from '../../constants/colors'

const CV_PATH = '/Ghanshyam_Ghimire_Resume.pdf'

interface Props {
  open: boolean
  onClose: () => void
}

function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const prevent = (e: Event) => {
      const modal = document.querySelector('.cv-modal-container')
      if (modal && modal.contains(e.target as Node)) return
      e.preventDefault()
    }
    document.addEventListener('wheel', prevent, { passive: false })
    document.addEventListener('touchmove', prevent, { passive: false })
    return () => {
      document.removeEventListener('wheel', prevent)
      document.removeEventListener('touchmove', prevent)
    }
  }, [active])
}

export function CVModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  useScrollLock(open)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cv-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.55)',
              zIndex: 200,
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          {/* Modal */}
          <motion.div
            key="cv-modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="cv-modal-container modal-container"
            role="dialog"
            aria-modal="true"
            aria-label="Ghanshyam Ghimire — CV / Resume"
            onClick={e => e.stopPropagation()}
          >
            {/* Sticky header */}
            <div
              className="modal-header"
              style={{
                borderBottom: `1px solid ${AI.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                backgroundColor: AI.card,
                borderRadius: '20px 20px 0 0',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <h2 style={{
                  color: AI.fg,
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}>
                  Curriculum Vitae
                </h2>
                <p style={{ color: AI.muted, fontSize: '0.8125rem', margin: '3px 0 0' }}>
                  Ghanshyam Ghimire
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <motion.a
                  href={CV_PATH}
                  download="Ghanshyam_Ghimire_Resume.pdf"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: AI.accent,
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Download size={14} strokeWidth={2.5} />
                  Download
                </motion.a>

                <button
                  onClick={onClose}
                  aria-label="Close CV preview"
                  style={{
                    width: '36px',
                    height: '36px',
                    minWidth: '36px',
                    borderRadius: '50%',
                    backgroundColor: AI.subtle,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} color={AI.fg} />
                </button>
              </div>
            </div>

            {/* PDF iframe */}
            <div style={{ backgroundColor: AI.card, borderRadius: '0 0 20px 20px' }}>
              <iframe
                src={`${CV_PATH}#toolbar=0&view=FitH`}
                title="Ghanshyam Ghimire Resume"
                style={{
                  width: '100%',
                  height: 'min(75vh, 900px)',
                  border: 'none',
                  display: 'block',
                  borderRadius: '0 0 20px 20px',
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
