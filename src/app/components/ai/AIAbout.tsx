import { motion } from 'motion/react'
import { AI } from '../../constants/colors'

const INFO_ROWS = [
  { label: 'University', value: 'Kathmandu University' },
  { label: 'Degree', value: 'BTech Artificial Intelligence' },
  { label: 'Batch', value: '2024–2028' },
  { label: 'Location', value: 'Nepal' },
]

export function AIAbout() {
  return (
    <section id="about" className="section-pad section-pad-x" style={{ backgroundColor: AI.bg }}>
      <div className="section-inner">
        <div className="about-grid">
          {/* Left: Heading + info table */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  color: AI.fg,
                  margin: '0',
                }}
              >
                Building AI that genuinely helps people.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{ marginTop: '40px' }}
            >
              {INFO_ROWS.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '11px 0',
                    borderBottom: `1px solid ${AI.border}`,
                    gap: '16px',
                  }}
                >
                  <span style={{ fontSize: '0.8125rem', color: AI.muted, flexShrink: 0 }}>{item.label}</span>
                  <span style={{ fontSize: '0.9375rem', color: AI.fg, fontWeight: 500, textAlign: 'right' }}>{item.value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Bio */}
          <motion.div
            className="about-right-col"
            style={{ paddingTop: '8px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          >
            <p
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.75,
                color: AI.fg,
                margin: '0 0 20px',
              }}
            >
              I'm a BTech Artificial Intelligence student at Kathmandu University, working on machine learning systems that solve real problems.
            </p>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.8,
                color: AI.muted,
                margin: '0 0 0',
              }}
            >
              I specialize in computer vision, OCR, NLP, and automation — and when I'm not training models, I'm writing songs. Both sides of my work are about the same thing: translating something felt into something real.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
