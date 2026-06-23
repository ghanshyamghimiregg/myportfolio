import { useState } from 'react'
import { motion } from 'motion/react'
import { MUSIC } from '../../constants/colors'

const PHOTOS = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    alt: 'Live acoustic performance',
    caption: 'Open mic night · Kathmandu',
    span: 'large' as const,
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    alt: 'Acoustic guitar close-up',
    caption: 'Writing session at home',
    span: 'small' as const,
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    alt: 'Studio recording session',
    caption: 'Recording "Mero Ghar"',
    span: 'small' as const,
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    alt: 'Concert stage performance',
    caption: 'University cultural program',
    span: 'medium' as const,
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    alt: 'Concert crowd atmosphere',
    caption: 'First official release night',
    span: 'medium' as const,
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1514320291840-755e4150e6c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    alt: 'Collaboration with fellow musicians',
    caption: 'Jam session with friends',
    span: 'small' as const,
  },
]

function GalleryItem({ photo }: { photo: typeof PHOTOS[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${MUSIC.border}`,
        cursor: 'pointer',
        gridColumn: photo.span === 'large' ? 'span 2' : undefined,
        gridRow: photo.span === 'large' ? 'span 2' : undefined,
      }}
    >
      <motion.img
        src={photo.src}
        alt={photo.alt}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: photo.span === 'large' ? '360px' : '180px' }}
      />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(44,22,16,0.75) 0%, transparent 60%)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '16px',
        }}
      >
        <span style={{ color: '#FFF8EE', fontSize: '0.875rem', fontWeight: 500 }}>
          {photo.caption}
        </span>
      </motion.div>
    </motion.div>
  )
}

export function MusicGallery() {
  return (
    <section id="gallery" style={{ backgroundColor: MUSIC.subtle, padding: '120px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px', textAlign: 'center' }}
        >
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: MUSIC.accent, fontWeight: 500 }}>
            Gallery
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
            Moments from<br />
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>stage and studio.</em>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            gridAutoRows: 'minmax(180px, auto)',
          }}
        >
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <GalleryItem photo={photo} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
