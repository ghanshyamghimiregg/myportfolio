import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Pause, ExternalLink } from 'lucide-react'
import { MUSIC } from '../../constants/colors'

const SONGS = [
  {
    id: 'gantabya',
    title: 'Gantabya',
    year: '2024',
    cover: '/songs/gantabya/cover.png',
    preview: '/songs/gantabya/preview.wav',
    description: 'A love story about finding someone to journey through life with. The word "Gantabya" means destination — because the journey matters more when someone walks it with you.',
    streaming: {
      spotify: 'https://open.spotify.com/track/7xvQhOe2owHBQhyQXfhIOS',
      youtube: 'https://youtu.be/yd7lsKnmB-Q',
      apple: 'https://music.apple.com/np/song/gantabya/1752446130',
    },
    isLatest: false,
  },
  {
    id: 'sapana-ko-udaan',
    title: 'Sapana Ko Udaan',
    year: '2025',
    cover: '/songs/sapana-ko-udaan/cover.jpg',
    preview: '/songs/sapana-ko-udaan/preview.wav',
    description: 'The story of every Nepali youth torn between staying home and seeking opportunities abroad — the weight of dreams against the pull of belonging.',
    streaming: {
      spotify: 'https://open.spotify.com/track/2JZnTfQlMtOJHAdY4PccsL',
      youtube: 'https://youtu.be/sUzGfuGjWQw',
      apple: 'https://music.apple.com/np/album/sapana-ko-udaan-single/1789733839',
    },
    isLatest: false,
  },
  {
    id: 'nabhaniyeka-sapana',
    title: 'Nabhaniyeka Sapana',
    year: '2025',
    cover: '/songs/nabhaniyeka-sapana/cover.jpg',
    preview: '/songs/nabhaniyeka-sapana/preview.wav',
    description: 'A tribute to unspoken love — a father\'s quiet sacrifices for his child\'s dreams. Sometimes love finds its purest form not in words, but in silence.',
    streaming: {
      spotify: 'https://open.spotify.com/track/0Xk6qjuLqJxymXosbJZVh0',
      youtube: 'https://youtu.be/_cucMicv2jg',
      apple: 'https://music.apple.com/np/song/nabhaniyeka-sapana/1834930989',
    },
    isLatest: false,
  },
  {
    id: 'aabhaas',
    title: 'Aabhaas',
    year: '2026',
    cover: '/songs/aabhaas/cover.png',
    preview: '/songs/aabhaas/preview.wav',
    description: 'That gentle realization when you return from a date and find yourself lost in their thoughts — the sweet आभास of falling in love, soft and deeply personal.',
    streaming: {
      spotify: 'https://open.spotify.com/track/79d2eT2COXsv9ThkO6ZGBT',
      youtube: 'https://youtu.be/_Vc8b-n6-Xw',
      apple: 'https://music.apple.com/np/song/aabhaas/6769536549',
    },
    isLatest: true,
  },
]

/* Animated equalizer bars for playing state */
function WaveformIcon({ playing, color }: { playing: boolean; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5px', height: '14px' }}>
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          animate={playing
            ? { height: ['3px', '14px', '5px', '10px', '3px'] }
            : { height: '6px' }
          }
          transition={playing ? {
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          } : { duration: 0.2 }}
          style={{
            width: '2px',
            backgroundColor: color,
            borderRadius: '1px',
          }}
        />
      ))}
    </div>
  )
}

function SongCard({ song, currentlyPlaying, onPlay, onPause }: {
  song: typeof SONGS[0]
  currentlyPlaying: string | null
  onPlay: (id: string) => void
  onPause: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const isPlaying = currentlyPlaying === song.id

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isPlaying) {
      onPause()
    } else {
      onPlay(song.id)
    }
  }

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, boxShadow: isPlaying
        ? `0 16px 40px ${MUSIC.accent}30, 0 0 0 1px ${MUSIC.accent}40`
        : '0 16px 40px rgba(44, 22, 16, 0.12)' }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: MUSIC.card,
        border: `1px solid ${isPlaying ? MUSIC.accent : MUSIC.border}`,
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: isPlaying
          ? `0 8px 32px ${MUSIC.accent}25, 0 0 0 1px ${MUSIC.accent}40`
          : '0 4px 16px rgba(44, 22, 16, 0.06)',
      }}
    >
      {/* Latest Release Badge — on left side */}
      {song.isLatest && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 10,
            padding: '5px 12px',
            borderRadius: '100px',
            background: 'linear-gradient(135deg, #B45309 0%, #D97706 50%, #F59E0B 100%)',
            color: '#fff',
            fontSize: '0.625rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            boxShadow: '0 4px 12px rgba(180, 83, 9, 0.4)',
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✦ Latest Release
          </motion.span>
        </motion.div>
      )}

      {/* Cover — clean, no play overlay on art */}
      <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
        <motion.img
          src={song.cover}
          alt={`${song.title} album art`}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: MUSIC.fg, margin: '0 0 3px', letterSpacing: '-0.01em' }}>
              {song.title}
            </h3>
            <span style={{ fontSize: '0.8125rem', color: MUSIC.muted }}>{song.year}</span>
          </div>

          {/* Minimal preview play button */}
          <motion.button
            onClick={handlePreviewClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: `1.5px solid ${isPlaying ? MUSIC.accent : MUSIC.border}`,
              backgroundColor: isPlaying ? `${MUSIC.accent}12` : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'border-color 0.2s, background-color 0.2s',
            }}
          >
            {isPlaying ? (
              <WaveformIcon playing={true} color={MUSIC.accent} />
            ) : (
              <Play size={14} fill={MUSIC.accent} color={MUSIC.accent} />
            )}
          </motion.button>
        </div>

        {/* Hover reveal: description */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ borderTop: `1px solid ${MUSIC.border}`, paddingTop: '12px', marginBottom: '12px' }}>
                <p style={{ fontSize: '0.8125rem', color: MUSIC.muted, lineHeight: 1.7, margin: 0 }}>
                  {song.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Streaming Links */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { name: 'Spotify', color: '#1DB954', href: song.streaming.spotify },
            { name: 'YouTube', color: '#FF0000', href: song.streaming.youtube },
            { name: 'Apple', color: '#FA243C', href: song.streaming.apple },
          ].map(s => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '100px',
                backgroundColor: MUSIC.subtle,
                color: MUSIC.muted,
                fontSize: '0.75rem',
                fontWeight: 500,
                textDecoration: 'none',
                fontFamily: 'inherit',
                transition: 'background-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = s.color + '20'; e.currentTarget.style.color = s.color }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = MUSIC.subtle; e.currentTarget.style.color = MUSIC.muted }}
            >
              {s.name}
              <ExternalLink size={10} />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function MusicSongs() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handlePlay = (songId: string) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const song = SONGS.find(s => s.id === songId)
    if (!song) return

    const audio = new Audio(song.preview)
    audio.volume = 0.7
    audio.play()
    audio.onended = () => {
      setCurrentlyPlaying(null)
      audioRef.current = null
    }
    audioRef.current = audio
    setCurrentlyPlaying(songId)
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setCurrentlyPlaying(null)
  }

  return (
    <section id="songs" className="section-pad section-pad-x" style={{ backgroundColor: MUSIC.subtle }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px' }}
        >
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
            Original songs,<br />
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>straight from the heart.</em>
          </h2>
        </motion.div>

        <div className="music-songs-grid">
          {SONGS.map((song, i) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SongCard
                song={song}
                currentlyPlaying={currentlyPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
