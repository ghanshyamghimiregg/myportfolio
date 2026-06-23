import { motion } from 'motion/react'
import { MUSIC } from '../../constants/colors'

const SOCIALS = [
  { name: 'Spotify', icon: '♫', color: '#1DB954', href: '#' },
  { name: 'YouTube', icon: '▶', color: '#FF0000', href: '#' },
  { name: 'Apple Music', icon: '♪', color: '#FA243C', href: '#' },
  { name: 'Instagram', icon: '◎', color: '#E1306C', href: '#' },
  { name: 'Facebook', icon: 'f', color: '#1877F2', href: '#' },
]

export function MusicStatement() {
  return (
    <section id="about" style={{ backgroundColor: MUSIC.bg, padding: '120px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Left: Statement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: MUSIC.accent, fontWeight: 500 }}>
              Artist Statement
            </span>
            <blockquote
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.35,
                color: MUSIC.fg,
                margin: '20px 0 32px',
                padding: '0 0 0 24px',
                borderLeft: `3px solid ${MUSIC.accent}`,
              }}
            >
              "Music has always been my way of preserving moments."
            </blockquote>
            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.8,
                color: MUSIC.muted,
                margin: '0 0 40px',
              }}
            >
              Every song is a snapshot of a feeling, memory, or lesson that words alone couldn't capture. Music is how I stay human in a world of code — and how I share what logic can't express.
            </p>

            {/* Social links */}
            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: MUSIC.muted, fontWeight: 500 }}>
                Listen on
              </span>
              <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
                {SOCIALS.map(s => (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      border: `1.5px solid ${MUSIC.border}`,
                      backgroundColor: MUSIC.card,
                      color: MUSIC.fg,
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = s.color)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = MUSIC.border)}
                  >
                    <span style={{ color: s.color, fontSize: '1rem' }}>{s.icon}</span>
                    {s.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Guitar image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '3/4',
                border: `1px solid ${MUSIC.border}`,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMHJlY29yZGluZyUyMHNlc3Npb24lMjBjcmVhdGl2ZXxlbnwxfHx8fDE3ODIxMDc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Music and guitar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                backgroundColor: MUSIC.card,
                border: `1px solid ${MUSIC.border}`,
                borderRadius: '16px',
                padding: '16px 20px',
                maxWidth: '220px',
                boxShadow: '0 8px 24px rgba(44,22,16,0.08)',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: MUSIC.accent, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Genre
              </span>
              <p style={{ fontSize: '0.9375rem', color: MUSIC.fg, fontWeight: 500, margin: '6px 0 0', lineHeight: 1.4 }}>
                Nepali Folk · Acoustic Pop · Emotional Ballads
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
