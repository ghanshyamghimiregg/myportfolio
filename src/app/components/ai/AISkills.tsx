import { useState } from 'react'
import { motion } from 'motion/react'
import { Brain, Eye, Code2, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AI } from '../../constants/colors'

const SKILL_CLUSTERS: {
  category: string
  color: string
  bg: string
  skills: string[]
  relatedProjects: string[]
  icon: LucideIcon
}[] = [
  {
    category: 'Machine Learning',
    color: '#2563EB',
    bg: '#EFF6FF',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'Keras'],
    relatedProjects: ['AgriVaani', 'VerifAi', 'Student Behavior Analysis'],
    icon: Brain,
  },
  {
    category: 'Computer Vision',
    color: '#7C3AED',
    bg: '#F5F3FF',
    skills: ['OpenCV', 'YOLO', 'Data Annotation', 'Image Annotation', 'MediaPipe'],
    relatedProjects: ['Student Behavior Analysis', 'Sign Language Translation', 'OCR System', 'VerifAi'],
    icon: Eye,
  },
  {
    category: 'Programming',
    color: '#059669',
    bg: '#ECFDF5',
    skills: ['Python', 'C++', 'FastAPI', 'NumPy'],
    relatedProjects: ['All Projects'],
    icon: Code2,
  },
  {
    category: 'Other',
    color: '#D97706',
    bg: '#FFFBEB',
    skills: ['Classification', 'Dataset Creation', 'SEO Content', 'Technical Writing'],
    relatedProjects: ['AgriVaani', 'Freelance Work'],
    icon: Sparkles,
  },
]

export function AISkills() {
  const [activeCluster, setActiveCluster] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const active = SKILL_CLUSTERS.find(c => c.category === activeCluster)

  return (
    <section className="section-pad section-pad-x" style={{ backgroundColor: AI.bg, padding: '120px 24px' }}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="skills-header"
          style={{ marginBottom: '56px' }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: AI.accent, fontWeight: 50 }}>
              Skills
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 500,
                color: AI.fg,
                marginTop: '12px',
                marginBottom: '0',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              Hover to explore.
            </h2>
          </div>
        </motion.div>

        <div className="skills-grid">
          {SKILL_CLUSTERS.map((cluster, i) => (
            <motion.div
              key={cluster.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onHoverStart={() => setActiveCluster(cluster.category)}
              onHoverEnd={() => setActiveCluster(null)}
              whileHover={{ y: -4 }}
              style={{
                padding: '28px',
                borderRadius: '16px',
                border: `1px solid ${activeCluster === cluster.category ? cluster.color : AI.border}`,
                backgroundColor: activeCluster === cluster.category ? cluster.bg : AI.card,
                cursor: 'default',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <cluster.icon size={20} color={cluster.color} strokeWidth={2} />
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: AI.fg, margin: 0, letterSpacing: '-0.01em' }}>
                  {cluster.category}
                </h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {cluster.skills.map(skill => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.08 }}
                    onHoverStart={() => setHoveredSkill(skill)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '100px',
                      backgroundColor: activeCluster === cluster.category ? '#fff' : AI.subtle,
                      color: activeCluster === cluster.category ? cluster.color : AI.fg,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      border: activeCluster === cluster.category ? `1px solid ${cluster.color}30` : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              <motion.div
                animate={{ opacity: activeCluster === cluster.category ? 1 : 0, height: activeCluster === cluster.category ? 'auto' : 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ borderTop: `1px solid ${cluster.color}20`, paddingTop: '16px' }}>
                  <span style={{ fontSize: '0.75rem', color: cluster.color, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Used in
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                    {cluster.relatedProjects.map(p => (
                      <span
                        key={p}
                        style={{
                          padding: '3px 10px',
                          borderRadius: '100px',
                          backgroundColor: `${cluster.color}15`,
                          color: cluster.color,
                          fontSize: '0.8125rem',
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
