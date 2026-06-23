import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Music, ExternalLink } from 'lucide-react'
import { MUSIC } from '../../constants/colors'

const SONGS = [
  {
    id: 's1',
    title: 'Timro Yaad',
    year: '2023',
    genre: 'Nepali Folk',
    cover: 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    story: 'Written during a quiet monsoon evening, this song is a memory of someone I haven\'t seen in years. The harmonium line in the intro was the first thing I wrote — everything else grew around it.',
    meaning: 'About the kind of nostalgia that catches you off guard. Not painful, but bittersweet — like finding an old photo.',
    lyrics: 'Timro yaad aaucha malai, ratko andheri maa...',
    streaming: { spotify: '#', youtube: '#', apple: '#' },
  },
  {
    id: 's2',
    title: 'Pharkera Aau',
    year: '2023',
    genre: 'Acoustic Pop',
    cover: 'https://images.unsplash.com/photo-1630110330918-ced8a801add8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    story: 'I wrote this song the week I left my hometown for Kathmandu. The bridge section was written in a bus — literally — and I recorded the vocals in my dormitory bathroom for the acoustic reverb.',
    meaning: 'A plea to the people and places we leave behind. The guitar pattern is intentionally simple — because leaving rarely feels complicated, just heavy.',
    lyrics: 'Pharkera aau na timi, yahi ghar ma...',
    streaming: { spotify: '#', youtube: '#', apple: '#' },
  },
  {
    id: 's3',
    title: 'Dodhara',
    year: '2024',
    genre: 'Folk · Storytelling',
    cover: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    story: 'Named after a small river valley near my home. I used a classical Nepali raag structure but placed it over fingerstyle guitar instead of sitar. It took six months to feel right.',
    meaning: 'A tribute to rural Nepal — its landscapes, its silences, its stories that never get told in cities.',
    lyrics: 'Dodhara ko bataas ma, pahad ko geet...',
    streaming: { spotify: '#', youtube: '#', apple: '#' },
  },
  {
    id: 's4',
    title: 'Ek Raat',
    year: '2024',
    genre: 'Emotional Ballad',
    cover: 'https://images.unsplash.com/photo-1531651008558-ed1740375b39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    story: 'Written in one sitting at 2am. I had just finished a coding session and picked up the guitar almost absent-mindedly. The song wrote itself in about 45 minutes.',
    meaning: 'That strange feeling when a night feels more significant than it should. Not dramatic — just quietly meaningful.',
    lyrics: 'Ek raat ko kasam, ek pal ko sapana...',
    streaming: { spotify: '#', youtube: '#', apple: '#' },
  },
  {
    id: 's5',
    title: 'Mero Ghar',
    year: '2025',
    genre: 'Nepali Folk · Acoustic',
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    story: 'My most personal song. Written after visiting home during a long semester. I tried to capture the exact smell of rain on dry soil, the sound of my mother\'s kitchen, and the weight of leaving again.',
    meaning: 'Home is never just a place. This song is a reminder to myself of where I come from, when the world of AI and ambition gets loud.',
    lyrics: 'Mero ghar, mero aakaash, mero pahilo prem...',
    streaming: { spotify: '#', youtube: '#', apple: '#' },
  },
]

function SongCard({ song }: { song: typeof SONGS[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: MUSIC.card,
        border: `1px solid ${MUSIC.border}`,
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Cover */}
      <div style={{ position: 'relative', paddingTop: '100%' }}>
        <motion.img
          src={song.cover}
          alt={song.title}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,22,16,0.7) 0%, transparent 50%)' }} />

        {/* Play button */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: MUSIC.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Play size={20} fill="#fff" color="#fff" style={{ marginLeft: '3px' }} />
        </motion.div>

        {/* Genre badge */}
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            padding: '3px 10px',
            borderRadius: '100px',
            backgroundColor: 'rgba(250,244,232,0.9)',
            color: MUSIC.accent,
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
          }}
        >
          {song.genre}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: MUSIC.fg, margin: '0 0 4px', letterSpacing: '-0.01em' }}>
              {song.title}
            </h3>
            <span style={{ fontSize: '0.8125rem', color: MUSIC.muted }}>{song.year}</span>
          </div>
          <Music size={16} color={MUSIC.accent} style={{ marginTop: '4px' }} />
        </div>

        {/* Hover reveal: story */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ borderTop: `1px solid ${MUSIC.border}`, paddingTop: '14px', marginBottom: '14px' }}>
                <p style={{ fontSize: '0.8125rem', color: MUSIC.muted, lineHeight: 1.7, margin: '0 0 10px' }}>
                  {song.meaning}
                </p>
                <p style={{ fontSize: '0.8125rem', color: MUSIC.fg, fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.6, margin: 0 }}>
                  "{song.lyrics}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Streaming */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { name: 'Spotify', color: '#1DB954', href: song.streaming.spotify },
            { name: 'YouTube', color: '#FF0000', href: song.streaming.youtube },
            { name: 'Apple', color: '#FA243C', href: song.streaming.apple },
          ].map(s => (
            <a
              key={s.name}
              href={s.href}
              style={{
                padding: '4px 10px',
                borderRadius: '100px',
                backgroundColor: MUSIC.subtle,
                color: MUSIC.muted,
                fontSize: '0.75rem',
                fontWeight: 500,
                textDecoration: 'none',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = s.color + '20'; e.currentTarget.style.color = s.color }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = MUSIC.subtle; e.currentTarget.style.color = MUSIC.muted }}
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function MusicSongs() {
  return (
    <section id="songs" style={{ backgroundColor: MUSIC.subtle, padding: '120px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: MUSIC.accent, fontWeight: 500 }}>
              Discography
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
              Songs with stories.
            </h2>
          </div>
          <span style={{ fontSize: '0.875rem', color: MUSIC.muted }}>
            Hover to reveal the story behind each song.
          </span>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          {SONGS.map((song, i) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <SongCard song={song} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
