import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { Play } from 'lucide-react'
import { MUSIC } from '../../constants/colors'

const SONGS = [
  {
    id: 'gantabya',
    title: 'Gantabya',
    year: '2024',
    cover: '/songs/gantabya/cover.png',
    preview: '/songs/gantabya/preview.wav',
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
    streaming: {
      spotify: 'https://open.spotify.com/track/79d2eT2COXsv9ThkO6ZGBT',
      youtube: 'https://youtu.be/_Vc8b-n6-Xw',
      apple: 'https://music.apple.com/np/song/aabhaas/6769536549',
    },
    isLatest: true,
  },
]

/* Platform SVG logos — icon only, no text */
function SpotifyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="Spotify">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  )
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="YouTube">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function AppleMusicIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="Apple Music">
      <path d="M15.18 13.27c.03 3.18 2.79 4.24 2.82 4.25-.02.07-.44 1.51-1.45 2.99-.87 1.28-1.77 2.55-3.2 2.58-1.4.03-1.85-.83-3.45-.83s-2.1.8-3.42.86c-1.38.05-2.43-1.38-3.31-2.65-1.8-2.6-3.17-7.34-1.33-10.53.91-1.58 2.54-2.59 4.31-2.62 1.35-.03 2.63.91 3.45.91.81 0 2.35-1.12 3.96-.95.67.03 2.56.27 3.77 2.04-.1.06-2.25 1.31-2.23 3.95ZM12.57 6.16c.73-.89 1.23-2.13 1.09-3.36-1.05.04-2.31.7-3.06 1.58-.68.78-1.27 2.03-1.11 3.23 1.17.09 2.35-.59 3.08-1.45Z"/>
    </svg>
  )
}

const PLATFORM_ICONS = [
  { key: 'spotify', Icon: SpotifyIcon, color: '#1DB954', label: 'Spotify' },
  { key: 'youtube', Icon: YouTubeIcon, color: '#FF0000', label: 'YouTube' },
  { key: 'apple', Icon: AppleMusicIcon, color: '#FA243C', label: 'Apple Music' },
] as const

/* Animated equalizer bars for playing state */
function WaveformIcon({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5px', height: '14px' }}>
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          animate={{ height: ['3px', '14px', '5px', '10px', '3px'] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
          style={{ width: '2px', backgroundColor: color, borderRadius: '1px' }}
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

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: MUSIC.card,
        border: `1px solid ${isPlaying ? MUSIC.accent : MUSIC.border}`,
        borderRadius: '14px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color 0.2s',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* New badge */}
      {song.isLatest && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10,
            padding: '3px 8px',
            borderRadius: '4px',
            backgroundColor: MUSIC.accent,
            color: '#fff',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          New
        </div>
      )}

      {/* Cover art — square, with subtle zoom on hover */}
      <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
        <motion.img
          src={song.cover}
          alt={`${song.title} by Ghanshyam Ghimire — album cover`}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Play overlay on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.button
            onClick={e => { e.stopPropagation(); isPlaying ? onPause() : onPlay(song.id) }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            {isPlaying
              ? <WaveformIcon color={MUSIC.accent} />
              : <Play size={20} fill={MUSIC.accent} color={MUSIC.accent} style={{ marginLeft: '2px' }} />
            }
          </motion.button>
        </motion.div>
      </div>

      {/* Info row */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Title + year */}
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: MUSIC.fg,
            margin: '0 0 2px',
            letterSpacing: '-0.01em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.3,
            minHeight: '2.6em',
          }}>
            {song.title}
          </h3>
          <span style={{ fontSize: '0.8125rem', color: MUSIC.muted }}>{song.year}</span>
        </div>

        {/* Platform icon buttons */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
          {PLATFORM_ICONS.map(({ key, Icon, color, label }) => (
            <motion.a
              key={key}
              href={song.streaming[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Listen on ${label}`}
              title={label}
              onClick={e => e.stopPropagation()}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.92 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: MUSIC.subtle,
                color: MUSIC.muted,
                textDecoration: 'none',
                border: '1px solid transparent',
                transition: 'color 0.18s, background-color 0.18s, border-color 0.18s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = color
                e.currentTarget.style.backgroundColor = color + '18'
                e.currentTarget.style.borderColor = color + '35'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = MUSIC.muted
                e.currentTarget.style.backgroundColor = MUSIC.subtle
                e.currentTarget.style.borderColor = 'transparent'
              }}
            >
              <Icon size={16} />
            </motion.a>
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
    audio.onended = () => { setCurrentlyPlaying(null); audioRef.current = null }
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
    <section id="songs" className="section-pad section-pad-x" style={{ backgroundColor: MUSIC.subtle }} aria-label="Original songs by Ghanshyam Ghimire">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '48px' }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 500,
              color: MUSIC.fg,
              margin: '0',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}
          >
            Original songs.
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
              style={{ display: 'contents' }}
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
