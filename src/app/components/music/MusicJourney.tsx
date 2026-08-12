import { motion } from 'motion/react'
import { MUSIC } from '../../constants/colors'

const MILESTONES = [
  {
    year: 'Childhood',
    title: 'First notes on the harmonium',
    description: 'My grandfather kept an old harmonium in our living room. I would press the keys before I understood what music was. That low drone of the bellows is still my earliest memory of sound.',
    tag: 'Beginnings',
    icon: '♩',
  },
  {
    year: '2016',
    title: 'Learning guitar',
    description: 'A family friend taught me the first three chords on a borrowed acoustic guitar. Em, G, D. I practiced until my fingertips bled, then kept going.',
    tag: 'Guitar',
    icon: '♪',
  },
  {
    year: '2019',
    title: 'First live performance',
    description: 'School cultural program. I played a cover of a Nepali folk song. My hands shook so badly I played the wrong chord in the chorus. No one noticed except me — but I noticed.',
    tag: 'Live Music',
    icon: '♫',
  },
  {
    year: '2021',
    title: 'First original song',
    description: 'I stopped covering other people\'s songs and wrote something entirely my own. It was rough, honest, and too long. But it was mine.',
    tag: 'Songwriting',
    icon: '✎',
  },
  {
    year: '2024',
    title: '"Gantabya" — debut release',
    description: 'Released my first original song "Gantabya" — a love story about finding your destination together. Then came "Sapana Ko Udaan," the story of every Nepali youth chasing dreams abroad.',
    tag: 'Debut',
    icon: '◉',
  },
  {
    year: '2025',
    title: '"Nabhaniyeka Sapana" & "Aabhaas"',
    description: 'Released "Nabhaniyeka Sapana" — about dreams left unspoken — followed by my latest release "Aabhaas," a sweet realization of love. Each song deeper and more personal than the last.',
    tag: 'Latest',
    icon: '★',
  },
  {
    year: 'Future',
    title: 'EP and new collaborations',
    description: 'Working toward an EP that weaves Nepali folk traditions with contemporary acoustic production. Music that sounds like where I\'m from and where I\'m going.',
    tag: 'Vision',
    icon: '↗',
    isFuture: true,
  },
]

export function MusicJourney() {
  return (
    <section className="section-pad section-pad-x" style={{ backgroundColor: MUSIC.subtle }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '64px', textAlign: 'center' }}
        >
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: MUSIC.accent, fontWeight: 500 }}>
            Music Journey
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 500,
              color: MUSIC.fg,
              marginTop: '12px',
              marginBottom: '0',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            From harmonium<br />
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>to original songs.</em>
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Warm vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '72px',
              top: 0,
              bottom: 0,
              width: '1px',
              background: `linear-gradient(to bottom, transparent 0%, ${MUSIC.border} 5%, ${MUSIC.border} 95%, transparent 100%)`,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 1fr',
                  gap: '28px',
                  paddingBottom: i < MILESTONES.length - 1 ? '44px' : '0',
                  opacity: m.isFuture ? 0.5 : 1,
                }}
              >
                {/* Year */}
                <div style={{ textAlign: 'right', paddingTop: '2px', position: 'relative' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: m.isFuture ? MUSIC.muted : MUSIC.accent,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {m.year}
                  </span>
                  {/* Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '-5.5px',
                      top: '6px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: m.isFuture ? MUSIC.border : MUSIC.accent,
                      border: `2px solid ${MUSIC.subtle}`,
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ paddingLeft: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '1.125rem' }}>{m.icon}</span>
                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: MUSIC.fg,
                        margin: 0,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {m.title}
                    </h3>
                    <span
                      style={{
                        padding: '2px 10px',
                        borderRadius: '100px',
                        backgroundColor: `${MUSIC.accent}18`,
                        color: MUSIC.accent,
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {m.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: MUSIC.muted, lineHeight: 1.7, margin: 0 }}>
                    {m.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
