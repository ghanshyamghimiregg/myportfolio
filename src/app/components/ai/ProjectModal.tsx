import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ExternalLink } from 'lucide-react'
import { AI } from '../../constants/colors'
import type { LocalProject } from '../../constants/projectsData'

interface Props {
  project: LocalProject | null
  onClose: () => void
}

/** Prevent the background page from scrolling while a modal is open.
 *  Strategy: block wheel + touchmove on the backdrop element itself.
 *  We never touch body.style, so the page scroll position is never altered. */
function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return

    const prevent = (e: Event) => {
      // Allow scrolling inside the modal container itself
      const modal = document.querySelector('.modal-container')
      if (modal && modal.contains(e.target as Node)) return
      e.preventDefault()
    }

    // passive: false is required for preventDefault to work on wheel/touchmove
    document.addEventListener('wheel', prevent, { passive: false })
    document.addEventListener('touchmove', prevent, { passive: false })

    return () => {
      document.removeEventListener('wheel', prevent)
      document.removeEventListener('touchmove', prevent)
    }
  }, [active])
}

export function ProjectModal({ project, onClose }: Props) {
  const isVideo = project?.demo?.type === 'video'
  const isPdf = project?.demo?.type === 'pdf'
  const isImage = project?.demo?.type === 'image'

  // Close on Escape
  useEffect(() => {
    if (!project) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [project, onClose])

  // Lock background scroll — never moves the page position
  useScrollLock(!!project)

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop — clicking it closes, scrolling on it is blocked */}
          <motion.div
            key="backdrop"
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
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="modal-container"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            // Stop click-through to backdrop for clicks inside the modal
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
                  fontSize: 'clamp(1.0625rem, 3vw, 1.375rem)',
                  fontWeight: 600,
                  margin: '0',
                  letterSpacing: '-0.02em',
                  wordBreak: 'break-word',
                }}>
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
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
                  transition: 'background-color 0.2s',
                }}
              >
                <X size={16} color={AI.fg} />
              </button>
            </div>

            {/* Body */}
            <div className="modal-body" style={{ backgroundColor: AI.card }}>

              {/* Media demo */}
              {project.demo && (
                <div
                  style={{
                    marginBottom: '28px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: `1px solid ${AI.border}`,
                    backgroundColor: '#000',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {isVideo && (
                    <video
                      src={project.demo.src}
                      controls
                      autoPlay
                      muted
                      playsInline
                      style={{ width: '100%', maxHeight: '420px', display: 'block', objectFit: 'contain' }}
                    />
                  )}

                  {isImage && (
                    <img
                      src={project.demo.src}
                      alt={project.title}
                      style={{ width: '100%', maxHeight: '420px', display: 'block', objectFit: 'contain' }}
                    />
                  )}

                  {isPdf && (
                    <div style={{ width: '100%', backgroundColor: AI.card, display: 'flex', flexDirection: 'column' }}>
                      <iframe
                        src={`${project.demo.src}#toolbar=0`}
                        style={{ width: '100%', height: '480px', border: 'none', display: 'block' }}
                        title={project.title}
                      />
                      <div
                        style={{
                          padding: '12px 16px',
                          borderTop: `1px solid ${AI.border}`,
                          display: 'flex',
                          justifyContent: 'flex-end',
                          backgroundColor: AI.card,
                        }}
                      >
                        <a
                          href={project.demo.src}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '7px 14px',
                            backgroundColor: AI.accent,
                            color: '#fff',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 500,
                            fontSize: '0.8125rem',
                          }}
                        >
                          Open PDF <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '1rem', color: AI.fg, lineHeight: 1.75, margin: 0, whiteSpace: 'pre-line' }}>
                  {project.info}
                </p>
              </div>

              {/* Skills */}
              {project.skills && project.skills.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.skills.map(skill => (
                    <span
                      key={skill}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        backgroundColor: AI.subtle,
                        color: AI.muted,
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
