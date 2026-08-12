import { motion } from 'motion/react'
import { AI } from '../../constants/colors'

const skills = ['Machine Learning', 'Computer Vision', 'OCR Systems', 'NLP', 'Python', 'TensorFlow', 'OpenCV']

export function AIAbout() {
  return (
    <section id="about" className="section-pad section-pad-x" style={{ backgroundColor: AI.bg }}>
      <div className="section-inner">
        <div className="about-grid">
          {/* Left: Label + Heading */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: AI.accent, fontWeight: 500 }}>
                About
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: AI.fg,
                  marginTop: '16px',
                  marginBottom: '0',
                }}
              >
                Building AI that<br />
                <em style={{ fontStyle: 'italic', fontWeight: 400 }}>genuinely helps people.</em>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {[
                { label: 'University', value: 'Kathmandu University' },
                { label: 'Degree', value: 'BTech Artificial Intelligence' },
                { label: 'Batch', value: '2024–2028' },
                { label: 'Location', value: 'Nepal' },
              ].map(item => (
                <div
                  key={item.label}
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${AI.border}` }}
                >
                  <span style={{ fontSize: '0.875rem', color: AI.muted }}>{item.label}</span>
                  <span style={{ fontSize: '0.875rem', color: AI.fg, fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Bio + Skills */}
          <div className="about-right-col" style={{ paddingTop: '55px' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <p
                style={{
                  fontSize: '1.125rem',
                  lineHeight: 1.8,
                  color: AI.fg,
                  marginBottom: '24px',
                  marginTop: 0,
                }}
              >
                Hi, I'm Ghanshyam Ghimire, a BTech Artificial Intelligence student at Kathmandu University.
              </p>
              <p
                style={{
                  fontSize: '1.0625rem',
                  lineHeight: 1.8,
                  color: AI.muted,
                  marginBottom: '40px',
                  marginTop: 0,
                }}
              >
                I specialize in machine learning, computer vision, OCR systems, NLP, and automation.
              </p>

              <div>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: AI.muted, fontWeight: 500 }}>
                  Specializations
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                  {skills.map(skill => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.06, backgroundColor: AI.accentLight, color: AI.accent }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '100px',
                        backgroundColor: AI.subtle,
                        color: AI.fg,
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        cursor: 'default',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
