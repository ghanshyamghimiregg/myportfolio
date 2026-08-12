import { motion } from 'motion/react'
import { InstagramIcon } from 'lucide-react'
import { MUSIC } from '../../constants/colors'

const SOCIALS = [
  { name: 'Spotify', icon: 'spotify', color: '#1DB954', href: 'https://open.spotify.com/artist/1iSVIYJByt3Gp3j6BQqaEH' },
  { name: 'YouTube', icon: 'youtube', color: '#FF0000', href: 'https://youtube.com/@ghanshyamghimiremusic/' },
  { name: 'Apple Music', icon: 'apple-music', color: '#FA243C', href: 'https://music.apple.com/np/artist/ghanshyam-ghimire/1752446129' },
  { name: 'TikTok', icon: 'tiktok', color: '#000000', href: 'https://www.tiktok.com/@ghanshyamghimiremusic' },
]

function SocialIcon({ type, color }: { type: string; color: string }) {
  const size = 16
  switch (type) {
    case 'spotify':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      )
    case 'youtube':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    case 'apple-music':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill={color}
            d="M15.18 13.27c.03 3.18 2.79 4.24 2.82 4.25-.02.07-.44 1.51-1.45 2.99-.87 1.28-1.77 2.55-3.2 2.58-1.4.03-1.85-.83-3.45-.83s-2.1.8-3.42.86c-1.38.05-2.43-1.38-3.31-2.65-1.8-2.6-3.17-7.34-1.33-10.53.91-1.58 2.54-2.59 4.31-2.62 1.35-.03 2.63.91 3.45.91.81 0 2.35-1.12 3.96-.95.67.03 2.56.27 3.77 2.04-.1.06-2.25 1.31-2.23 3.95ZM12.57 6.16c.73-.89 1.23-2.13 1.09-3.36-1.05.04-2.31.7-3.06 1.58-.68.78-1.27 2.03-1.11 3.23 1.17.09 2.35-.59 3.08-1.45Z"
          />
        </svg>
      )
    case 'instagram':
      return <InstagramIcon size={size} color={color} />
    case 'tiktok':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    case 'facebook':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    default:
      return null
  }
}

export function MusicStatement() {
  return (
    <section id="about" className="section-pad section-pad-x" style={{ backgroundColor: MUSIC.bg }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="music-statement-grid">
          {/* Left: Photo */}
          <motion.div
            className="music-statement-photo-col"
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
                src="/musicphotos/465088417_18188168446306351_1229420843708503476_n.webp"
                alt="Ghanshyam Ghimire in recording studio"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Floating genre card */}
            <motion.div
              className="music-genre-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
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
                Indie · Pop Folk
                <br />
                Singer-songwriter
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Statement */}
          <motion.div
            className="music-statement-text-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.35,
                color: MUSIC.fg,
                margin: '0 0 28px',
                padding: '0 0 0 24px',
                borderLeft: `3px solid ${MUSIC.accent}`,
              }}
            >
              "Reaching new people through music, one pair of ears at a time"
            </blockquote>
            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.8,
                color: MUSIC.muted,
                margin: '0 0 40px',
                fontStyle: 'italic',
              }}
            >
              I tell stories through melodies, with sounds that have a touch of Nepali folk and indie pop influences
            </p>

            {/* Social links */}
            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: MUSIC.muted, fontWeight: 500 }}>
                Listen & Follow
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
                    <SocialIcon type={s.icon} color={s.color} />
                    {s.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
