import { motion } from 'motion/react'
import { MUSIC } from '../../constants/colors'

const STORIES = [
  {
    number: '01',
    song: 'Timro Yaad',
    chapter: 'The Rain Season',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    text: [
      'Some songs don\'t start with a melody — they start with a feeling. Timro Yaad started with rain. Not dramatic rain, just the quiet Kathmandu monsoon that makes everything slow down.',
      'I had been studying for exams all week. On the sixth day, I picked up my guitar for the first time and without thinking, played a chord progression I\'d never played before. The words followed almost immediately.',
      'I recorded a rough version on my phone that same night. The final recording came three months later — but that original phone voice memo is still the emotional reference I go back to.',
    ],
    emotion: 'Bittersweet nostalgia',
    writtenIn: 'One evening',
  },
  {
    number: '02',
    song: 'Mero Ghar',
    chapter: 'Leaving Home',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    text: [
      'Moving to Kathmandu for university meant leaving behind everything familiar. Not just people — the specific sound of wind through the hills, the smell of dal bhat on a cold morning, the silence of nights without city noise.',
      'I started writing Mero Ghar on my second week in the dormitory. It was partly a way of coping, partly a promise to myself not to forget where I came from.',
      'The fingerpicking pattern in the verses was inspired by Nepali classical music my grandfather used to listen to. It felt like a bridge between two worlds — which is exactly what the song needed to be.',
    ],
    emotion: 'Longing and love',
    writtenIn: 'Three weeks',
  },
]

export function MusicBehindSongs() {
  return (
    <section style={{ backgroundColor: MUSIC.bg, padding: '120px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '80px', textAlign: 'center' }}
        >
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: MUSIC.accent, fontWeight: 500 }}>
            Behind The Songs
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
            Every song has a<br />
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>chapter before it.</em>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
          {STORIES.map((story, i) => (
            <motion.article
              key={story.number}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                gap: '64px',
                alignItems: 'center',
                direction: i % 2 === 0 ? 'ltr' : 'rtl',
              }}
            >
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ direction: 'ltr', position: 'relative' }}
              >
                <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/3' }}>
                  <img
                    src={story.image}
                    alt={story.chapter}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* Chapter label */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-16px',
                    left: '24px',
                    backgroundColor: MUSIC.accent,
                    color: '#fff',
                    padding: '6px 16px',
                    borderRadius: '100px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                  }}
                >
                  Chapter {story.number}
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 32 : -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                style={{ direction: 'ltr' }}
              >
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.75rem', color: MUSIC.muted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {story.year} · {story.song}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      fontWeight: 500,
                      color: MUSIC.fg,
                      margin: '8px 0 0',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                    }}
                  >
                    {story.chapter}
                  </h3>
                </div>

                {story.text.map((para, pi) => (
                  <p
                    key={pi}
                    style={{
                      fontSize: pi === 0 ? '1.0625rem' : '1rem',
                      lineHeight: 1.8,
                      color: pi === 0 ? MUSIC.fg : MUSIC.muted,
                      margin: '0 0 18px',
                    }}
                  >
                    {para}
                  </p>
                ))}

                <div style={{ display: 'flex', gap: '24px', marginTop: '32px', paddingTop: '24px', borderTop: `1px solid ${MUSIC.border}` }}>
                  <div>
                    <span style={{ fontSize: '0.6875rem', color: MUSIC.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Emotion</span>
                    <p style={{ fontSize: '0.9375rem', color: MUSIC.accent, fontWeight: 600, margin: '4px 0 0' }}>{story.emotion}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.6875rem', color: MUSIC.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Written in</span>
                    <p style={{ fontSize: '0.9375rem', color: MUSIC.fg, fontWeight: 600, margin: '4px 0 0' }}>{story.writtenIn}</p>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
