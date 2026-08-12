import { useState } from 'react'
import { motion } from 'motion/react'
import { MUSIC } from '../../constants/colors'
import { ImageWithFallback } from '../figma/ImageWithFallback'

/* 
 * Photos grouped by orientation for better layout:
 * - landscape: wider than tall
 * - portrait: taller than wide  
 * - square: roughly equal
 */
const PHOTOS = [
  // Row 1: landscape, portrait, portrait, square
  { id: 'g1', src: '/musicphotos/0524.jpg', alt: 'Live performance' },
  { id: 'g2', src: '/musicphotos/0625 (1)(1).jpg', alt: 'Performance moment' },
  { id: 'g3', src: '/musicphotos/621380075_18079924583211383_6665212664267307199_n.jpg', alt: 'Music moment' },
  { id: 'g4', src: '/musicphotos/633865744_18378865819080876_5430391603270443274_n.jpg', alt: 'Live music' },
  // Row 2
  { id: 'g5', src: '/musicphotos/0625 (1)(2).jpg', alt: 'Stage performance' },
  { id: 'g6', src: '/musicphotos/0613.jpg', alt: 'On stage' },
  { id: 'g7', src: '/musicphotos/0625 (1).jpg', alt: 'Acoustic session' },
  { id: 'g8', src: '/musicphotos/648994522_18069324248268344_7263154056669889858_n.jpg', alt: 'Concert' },
  // Row 3
  { id: 'g9', src: '/musicphotos/650917621_18093282259860295_8909871446461575516_n.jpg', alt: 'Performance' },
  { id: 'g10', src: '/musicphotos/724072731_1360426932738710_3054117027992186017_n.jpg', alt: 'Stage moment' },
  { id: 'g11', src: '/musicphotos/625038055_18170918398391095_6324780337854495417_n (1).jpg', alt: 'Music session' },
  { id: 'g12', src: '/musicphotos/SCR-20260625-eolv.jpeg', alt: 'Behind the scenes' },
]

function CollagePhoto({ photo, index, rotation }: { photo: typeof PHOTOS[0]; index: number; rotation: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: rotation * 1.5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <motion.div
        animate={{
          scale: hovered ? 1.05 : 1,
          rotate: hovered ? 0 : 0,
          boxShadow: hovered
            ? '0 20px 50px rgba(44, 22, 16, 0.25)'
            : '0 4px 16px rgba(44, 22, 16, 0.1)',
          zIndex: hovered ? 20 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: '#fff',
          padding: '6px 6px 24px 6px',
          borderRadius: '4px',
          position: 'relative',
        }}
      >
        <div style={{ borderRadius: '2px', overflow: 'hidden' }}>
          <ImageWithFallback
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function MusicGallery() {
  // Pre-assigned rotations for visual variety
  const rotations = [-3, 2, -2, 4, 3, -4, 2, -3, -2, 3, -4, 2]

  return (
    <section id="gallery" className="section-pad section-pad-x" style={{ backgroundColor: MUSIC.subtle }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px', textAlign: 'center' }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 500,
              color: MUSIC.fg,
              marginTop: '0',
              marginBottom: '12px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            On Stage<br />
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>since 2015.</em>
          </h2>
        </motion.div>

        {/* Masonry-like collage with CSS columns */}
        <div className="music-gallery-grid">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.id}
              style={{
                breakInside: 'avoid',
                marginBottom: '12px',
                transform: `rotate(${rotations[i]}deg)`,
              }}
            >
              <CollagePhoto photo={photo} index={i} rotation={rotations[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
