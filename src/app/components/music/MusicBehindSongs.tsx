import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MUSIC } from '../../constants/colors'

const STORIES = [
  {
    number: '01',
    song: 'Gantabya',
    chapter: 'The Journey Together',
    year: '2024',
    image: '/songs/gantabya/cover.png',
    text: [
      '"Gantabya" — my debut original — is a love story unlike any other. It\'s not just about the initial spark, but about finding a partner to conquer life\'s challenges with.',
      'Someone to grow beside, hand-in-hand, as you reach for your dreams. The word "Gantabya" means destination in Nepali, and this song captures that feeling of knowing your journey matters more when someone walks it with you.',
      'As my very first release, Gantabya holds a special place. It was the song that proved to me I could translate the feelings inside my heart into melodies that others could feel too.',
    ],
    emotion: 'Love and companionship',
    writtenIn: 'Debut Release',
  },
  {
    number: '02',
    song: 'Sapana Ko Udaan',
    chapter: 'Dreams Taking Flight',
    year: '2025',
    image: '/songs/sapana-ko-udaan/cover.jpg',
    text: [
      '"Sapana Ko Udaan" is more than just a song — it is the story of every Nepali youth torn between staying in their homeland and seeking opportunities abroad.',
      'This heartfelt composition reflects the emotions, dreams, and struggles of those who leave, as well as those who choose to stay. The title translates to "Flight of Dreams."',
      'Writing this song, I wanted to capture the weight of that moment — when you\'re at the airport, looking back one last time. The melody carries both the excitement of the unknown and the ache of what you\'re leaving behind.',
    ],
    emotion: 'Longing and hope',
    writtenIn: 'Second release',
  },
  {
    number: '03',
    song: 'Nabhaniyeka Sapana',
    chapter: 'Unspoken Dreams',
    year: '2025',
    image: '/songs/nabhaniyeka-sapana/cover.jpg',
    text: [
      '"Nabhaniyeka Sapana" is a song born from the quiet corners of the heart — where words often remain unspoken but dreams live on.',
      'It\'s about those silent emotions we carry, the feelings we never manage to say out loud, yet they shape our lives in the deepest ways. The title means "Dreams Left Unsaid."',
      'This was perhaps the most emotionally vulnerable song I\'ve written. Some feelings are too delicate for words — and that\'s exactly what this song tries to capture through its melody.',
    ],
    emotion: 'Silent vulnerability',
    writtenIn: 'Third release',
  },
  {
    number: '04',
    song: 'Aabhaas',
    chapter: 'A Sweet Realization',
    year: '2026',
    image: '/songs/aabhaas/cover.png',
    text: [
      '"Aabhaas" tells the story of when you return from a date and find yourself lost in their thoughts. It\'s about the realization (आभास) that maybe you are in love.',
      'You pen your thoughts, turn those into a melody where every note carries a piece of that moment. In simple words, Aabhaas is a sweet realization of love.',
      'As my latest release, this song represents where I am now as an artist — more confident in expressing the tender, intimate moments that define our emotional lives.',
    ],
    emotion: 'Sweet realization of love',
    writtenIn: 'Latest release',
    isLatest: true,
  },
]

export function MusicBehindSongs() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const story = STORIES[currentIndex]

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goNext = () => {
    if (currentIndex < STORIES.length - 1) {
      setDirection(1)
      setCurrentIndex(currentIndex + 1)
    }
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
    }),
  }

  return (
    <section style={{ backgroundColor: MUSIC.bg, padding: '120px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header with navigation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}
        >
          <div>
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
          </div>

          {/* Arrow controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Song dots / indicators */}
            <div style={{ display: 'flex', gap: '8px', marginRight: '8px' }}>
              {STORIES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === currentIndex ? '32px' : '10px',
                    height: '10px',
                    borderRadius: '100px',
                    border: 'none',
                    backgroundColor: i === currentIndex ? MUSIC.accent : MUSIC.border,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                  aria-label={`Go to ${s.song}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={goPrev}
              disabled={currentIndex === 0}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: `1.5px solid ${MUSIC.border}`,
                backgroundColor: MUSIC.card,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: currentIndex === 0 ? 0.35 : 1,
                transition: 'opacity 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { if (currentIndex > 0) e.currentTarget.style.borderColor = MUSIC.accent }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = MUSIC.border }}
            >
              <ChevronLeft size={20} color={MUSIC.fg} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={goNext}
              disabled={currentIndex === STORIES.length - 1}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: `1.5px solid ${MUSIC.border}`,
                backgroundColor: MUSIC.card,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentIndex === STORIES.length - 1 ? 'not-allowed' : 'pointer',
                opacity: currentIndex === STORIES.length - 1 ? 0.35 : 1,
                transition: 'opacity 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { if (currentIndex < STORIES.length - 1) e.currentTarget.style.borderColor = MUSIC.accent }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = MUSIC.border }}
            >
              <ChevronRight size={20} color={MUSIC.fg} />
            </motion.button>
          </div>
        </motion.div>

        {/* Song content with animation */}
        <div style={{ position: 'relative', minHeight: '480px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={story.number}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '64px',
                alignItems: 'center',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', paddingTop: '20px' }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '1/1', boxShadow: '0 16px 48px rgba(44,22,16,0.15)' }}>
                  <img
                    src={story.image}
                    alt={`${story.song} album art`}
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
                {/* Latest badge for Aabhaas */}
                {story.isLatest && (
                  <motion.div
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      bottom: '-12px',
                      right: '24px',
                      background: 'linear-gradient(135deg, #B45309 0%, #D97706 50%, #F59E0B 100%)',
                      color: '#fff',
                      padding: '6px 16px',
                      borderRadius: '100px',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 12px rgba(180, 83, 9, 0.35)',
                    }}
                  >
                    ✦ Latest Release
                  </motion.div>
                )}
              </div>

              {/* Text */}
              <div>
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
                    <span style={{ fontSize: '0.6875rem', color: MUSIC.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Release</span>
                    <p style={{ fontSize: '0.9375rem', color: MUSIC.fg, fontWeight: 600, margin: '4px 0 0' }}>{story.writtenIn}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
