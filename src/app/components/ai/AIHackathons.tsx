import { useState } from 'react'
import { motion } from 'motion/react'
import { AI } from '../../constants/colors'
import hackathonListRaw from '../../../../hackathons.txt?raw'

const hackathonSnapModules = import.meta.glob('../../../../hackathons/*.{jpg,jpeg,JPG,JPEG,webp,WEBP,png,PNG}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const HACKATHON_NAMES = hackathonListRaw
  .split(/\r?\n/)
  .map((name: string) => name.trim())
  .filter(Boolean)

const HACKATHON_SNAPS = Object.entries(hackathonSnapModules)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([path, src], index) => ({
    id: `hackathon-snap-${index + 1}`,
    src,
    alt: path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ') || `Hackathon snap ${index + 1}`,
  }))

function CollageSnap({ snap, index }: { snap: typeof HACKATHON_SNAPS[number]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ 
        cursor: 'pointer'
      }}
    >
      <motion.div
        animate={{
          scale: hovered ? 1.05 : 1,
          boxShadow: hovered
            ? '0 20px 50px rgba(15, 23, 42, 0.25)'
            : '0 4px 16px rgba(15, 23, 42, 0.1)',
          zIndex: hovered ? 20 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: AI.card,
          padding: '6px 6px 24px 6px',
          borderRadius: '4px',
          position: 'relative',
        }}
      >
        <div style={{ borderRadius: '2px', overflow: 'hidden' }}>
          <img
            src={snap.src}
            alt={snap.alt}
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function AIHackathons() {
  const marqueeItems = [...HACKATHON_NAMES, ...HACKATHON_NAMES]

  return (
    <section id="hackathons" className="section-pad section-pad-x" style={{ backgroundColor: AI.bg }}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '40px' }}
        >
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: AI.accent, fontWeight: 500 }}>
            Hackathons
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
            Building & Pitching
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hackathons-marquee"
          style={{
            marginBottom: '36px',
          }}
        >
          <div className="hackathons-marquee-border hackathons-marquee-border-top"></div>
          <div className="hackathons-marquee-inner">
            <div className="hackathons-marquee-track">
              {marqueeItems.map((name, index) => (
                <span key={`${name}-${index}`} className="hackathon-pill" style={{ color: AI.fg }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
          <div className="hackathons-marquee-border hackathons-marquee-border-bottom"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: AI.muted, margin: '0 0 18px' }}>
            Some snaps from the hackathons.
          </p>

          <div 
            className="hackathon-gallery-container"
            style={{
              columnGap: '12px',
            }}
          >
            {HACKATHON_SNAPS.map((snap, index) => (
              <div
                key={snap.id}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '12px',
                }}
              >
                <CollageSnap snap={snap} index={index} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
