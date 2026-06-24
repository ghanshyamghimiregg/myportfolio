import { motion, AnimatePresence } from 'motion/react'
import { X, FileText, ExternalLink } from 'lucide-react'
import { AI } from '../../constants/colors'
import type { LocalProject } from '../../constants/projectsData'

interface Props {
  project: LocalProject | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: Props) {
  const isVideo = project?.demo?.type === 'video'
  const isPdf = project?.demo?.type === 'pdf'
  const isImage = project?.demo?.type === 'image'

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 200,
              backdropFilter: 'blur(4px)',
            }}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="modal-container"
          >
            {/* Header */}
            <div className="modal-header" style={{ borderBottom: `1px solid ${AI.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: AI.accent, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Project Demo & Info
                </span>
                <h2 style={{ color: AI.fg, fontSize: '1.5rem', fontWeight: 600, margin: '4px 0 0', letterSpacing: '-0.02em' }}>
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: '36px',
                  height: '36px',
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

            {/* Content Container */}
            <div className="modal-body">
              {/* Media Demo */}
              {project.demo && (
                <div style={{ marginBottom: '32px', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${AI.border}`, backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                    <div style={{ width: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
                      <iframe
                        src={`${project.demo.src}#toolbar=0`}
                        style={{ width: '100%', height: '450px', border: 'none' }}
                        title={project.title}
                      />
                      <div style={{ padding: '16px', borderTop: `1px solid ${AI.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: AI.card }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FileText size={20} color={AI.accent} />
                          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: AI.fg }}>
                            {project.demo.src.split('/').pop()}
                          </span>
                        </div>
                        <a
                          href={project.demo.src}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            backgroundColor: AI.accent,
                            color: '#fff',
                            borderRadius: '100px',
                            textDecoration: 'none',
                            fontWeight: 500,
                            fontSize: '0.8125rem',
                          }}
                        >
                          Open PDF in New Tab <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div style={{ marginBottom: '32px' }}>
                <SectionTitle>About the Project</SectionTitle>
                <p style={{ fontSize: '1rem', color: AI.fg, lineHeight: 1.7, marginTop: '8px', marginBottom: 0, whiteSpace: 'pre-line' }}>
                  {project.info}
                </p>
              </div>

              {/* Technologies */}
              {project.skills && project.skills.length > 0 && (
                <div>
                  <SectionTitle>Skills & Technologies</SectionTitle>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                    {project.skills.map(skill => (
                      <span
                        key={skill}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '100px',
                          backgroundColor: AI.accentLight,
                          color: AI.accent,
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: AI.muted, fontWeight: 600 }}>
      {children}
    </span>
  )
}
