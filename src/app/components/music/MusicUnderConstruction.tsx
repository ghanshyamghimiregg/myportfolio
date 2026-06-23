import { motion } from 'motion/react'
import { MUSIC } from '../../constants/colors'

export function MusicUnderConstruction() {
  return (
    <section
      style={{
        backgroundColor: MUSIC.subtle,
        padding: '120px 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: '600px',
          textAlign: 'center',
          backgroundColor: MUSIC.card,
          border: `1px solid ${MUSIC.border}`,
          borderRadius: '24px',
          padding: '48px 32px',
          boxShadow: '0 24px 60px rgba(44, 22, 16, 0.08), inset 0 1px 0 rgba(255, 248, 238, 0.15)',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: MUSIC.accent,
            fontWeight: 600,
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Music Space
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 500,
            color: MUSIC.fg,
            marginTop: 0,
            marginBottom: '16px',
            lineHeight: 1.25,
          }}
        >
          Under Construction
        </h2>
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontSize: '2.5rem',
            color: MUSIC.accent,
            margin: '24px 0',
          }}
        >
          ♪
        </motion.div>
        <p
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.7,
            color: MUSIC.muted,
            margin: 0,
          }}
        >
          Crafting original melodies, acoustic stories, and soundscapes.
          <br />
          This section is currently being tuned and will launch soon.
        </p>
      </motion.div>
    </section>
  )
}
