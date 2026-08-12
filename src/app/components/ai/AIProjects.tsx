import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { AI } from '../../constants/colors'
import { ProjectModal } from './ProjectModal'
import { LOCAL_PROJECTS } from '../../constants/projectsData'
import type { LocalProject } from '../../constants/projectsData'

function ProjectCard({ project, featured, onClick }: { project: LocalProject; featured?: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  const isVideo = project.thumbnail.endsWith('.mov') || project.thumbnail.endsWith('.mp4') || project.thumbnail.endsWith('.webm')

  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -3, borderColor: AI.accent }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: AI.card,
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${AI.border}`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{
        position: 'relative',
        height: featured ? '220px' : '160px',
        overflow: 'hidden',
        flexShrink: 0,
        backgroundColor: project.id.includes('agrivaani')
          ? '#F0F5F5'
          : project.thumbnail.toLowerCase().includes('logo')
            ? '#fff'
            : '#000'
      }}>
        {isVideo ? (
          <video
            src={project.thumbnail}
            muted
            loop
            playsInline
            autoPlay
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (() => {
          const isVerifAI = project.id.includes('verifai')
          const isAgriVaani = project.id.includes('agrivaani')
          const baseScale = isVerifAI ? 1.15 : isAgriVaani ? 1.12 : 1.0
          const hoverScale = baseScale * 1.05

          return (
            <motion.img
              src={project.thumbnail}
              alt={project.title}
              animate={{ scale: hovered ? hoverScale : baseScale }}
              transition={{ duration: 0.5 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: (project.thumbnail.toLowerCase().includes('logo') || project.id.includes('agrivaani') || project.id.includes('sign-language')) ? 'contain' : 'cover',
                objectPosition: project.id.includes('sign-language') ? 'top' : 'center',
                padding: isVerifAI
                  ? '0px'
                  : isAgriVaani
                    ? '8px'
                    : project.thumbnail.toLowerCase().includes('logo')
                      ? '24px'
                      : '0',
              }}
            />
          )
        })()}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)' }} />
      </div>

      <div style={{ padding: featured ? '24px' : '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3
              style={{
                fontSize: featured ? '1.375rem' : '1rem',
                fontWeight: 600,
                color: AI.fg,
                letterSpacing: '-0.02em',
                margin: '0 0 8px',
              }}
            >
              {project.title}
            </h3>
            <p style={{ fontSize: '0.875rem', color: AI.muted, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
              {project.id.includes('agrivaani')
                ? (() => {
                    const sentences = project.info.split('. ').filter(s => s.trim().length > 0)
                    return sentences.length > 1
                      ? sentences.slice(0, -1).join('. ').replace(/\.$/, '') + '.'
                      : project.info
                  })()
                : featured
                ? project.info.split('Key Features:')[0].trim()
                : project.info.slice(0, 150) + '...'}
            </p>
          </div>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
            style={{ marginLeft: '12px', flexShrink: 0 }}
          >
            <ArrowUpRight size={18} color={AI.accent} />
          </motion.div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
          {project.skills.slice(0, featured ? 4 : 3).map(t => (
            <span
              key={t}
              style={{
                padding: '3px 9px',
                borderRadius: '4px',
                backgroundColor: AI.subtle,
                color: AI.muted,
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function AIProjects() {
  const [activeProject, setActiveProject] = useState<LocalProject | null>(null)
  const verifAI = LOCAL_PROJECTS.find(p => p.id.includes('verifai')) || LOCAL_PROJECTS[0]
  const others = LOCAL_PROJECTS.filter(p => p.id !== verifAI.id)

  return (
    <section id="projects" className="section-pad section-pad-x" style={{ backgroundColor: AI.subtle }}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '48px' }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 500,
              color: AI.fg,
              margin: '0',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}
          >
            Projects that matter.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            display: 'grid',
          }}
          className="projects-bento"
        >
          {/* VerifAI — featured, spans 2 columns */}
          <div className="projects-featured-card">
            <ProjectCard project={verifAI} featured onClick={() => setActiveProject(verifAI)} />
          </div>

          {/* Others */}
          {others.map(p => (
            <ProjectCard key={p.id} project={p} onClick={() => setActiveProject(p)} />
          ))}
        </motion.div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
