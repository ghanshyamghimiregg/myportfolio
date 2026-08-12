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

  return (
    <section className="section-pad section-pad-x" style={{ backgroundColor: AI.bg }} aria-label="Skills and technical expertise of Ghanshyam Ghimire">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="skills-header"
          style={{ marginBottom: '48px' }}
        >
          <div>
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
              Skills & tools.
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
              onClick={() => setActiveCluster(c => c === cluster.category ? null : cluster.category)}
              whileHover={{ y: -4 }}
              style={{
                padding: '28px',
                borderRadius: '14px',
                border: `1px solid ${activeCluster === cluster.category ? cluster.color : AI.border}`,
                backgroundColor: activeCluster === cluster.category ? `${cluster.color}12` : AI.card,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <cluster.icon size={20} color={cluster.color} strokeWidth={2} />
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: AI.fg, margin: 0, letterSpacing: '-0.01em' }}>
                  {cluster.category}
                </h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {cluster.skills.map(skill => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.04 }}
                    style={{
                      padding: '5px 11px',
                      borderRadius: '4px',
                      backgroundColor: activeCluster === cluster.category ? AI.card : AI.subtle,
                      color: activeCluster === cluster.category ? cluster.color : AI.fg,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      border: activeCluster === cluster.category ? `1px solid ${cluster.color}30` : '1px solid transparent',
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
                <div style={{ borderTop: `1px solid ${cluster.color}15`, paddingTop: '14px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {cluster.relatedProjects.map(p => (
                      <span
                        key={p}
                        style={{
                          padding: '3px 9px',
                          borderRadius: '4px',
                          backgroundColor: `${cluster.color}12`,
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
