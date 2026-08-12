import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Star, ExternalLink } from 'lucide-react'
import { AI } from '../../constants/colors'
import { ReviewModal } from './ReviewModal'
import { LOCAL_REVIEWS } from '../../constants/reviewsData'
import type { LocalReview } from '../../constants/reviewsData'

const STATS = [
  { label: 'Job Success', value: '100%' },
  { label: 'Completed', value: '2' },
  { label: 'Satisfaction', value: '4.75 ★' },
  { label: 'Earnings', value: '$110+' },
]

function ReviewCard({ review, onClick }: { review: LocalReview; onClick: () => void }) {
  const shouldTruncate = review.text.length > 160

  return (
    <motion.div
      layout
      onClick={onClick}
      whileHover={{ y: -3, borderColor: AI.accent }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: AI.card,
        border: `1px solid ${AI.border}`,
        borderRadius: '14px',
        padding: '24px',
        width: '320px',
        minWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        flexShrink: 0,
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'border-color 0.2s',
      }}
      className="review-card-width"
    >
      {/* Stars + date */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const v = i + 1
            if (review.rating >= v) return <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
            if (review.rating > v - 1) return (
              <div key={i} style={{ position: 'relative', width: 13, height: 13, display: 'inline-block' }}>
                <Star size={13} color="#F59E0B" />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
                  <Star size={13} fill="#F59E0B" color="#F59E0B" />
                </div>
              </div>
            )
            return <Star key={i} size={13} color={AI.border} />
          })}
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: AI.fg, marginLeft: '5px' }}>
            {review.rating}
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', color: AI.muted }}>{review.date}</span>
      </div>

      {/* Review text */}
      <p
        style={{
          fontSize: '0.9375rem',
          color: AI.fg,
          lineHeight: 1.7,
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        "{review.text}"
      </p>
      {shouldTruncate && (
        <span style={{ fontSize: '0.8125rem', color: AI.accent, fontWeight: 500 }}>
          Read more
        </span>
      )}

      {/* Client */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderTop: `1px solid ${AI.border}`,
          paddingTop: '14px',
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: AI.subtle,
            color: AI.muted,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8125rem',
            fontWeight: 600,
            flexShrink: 0,
            border: `1px solid ${AI.border}`,
          }}
        >
          {review.avatar}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: AI.fg, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{review.client}</div>
          <div style={{ fontSize: '0.75rem', color: AI.muted }}>{review.location}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function AIFreelance() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedReview, setSelectedReview] = useState<LocalReview | null>(null)

  return (
    <section className="section-pad" style={{ backgroundColor: AI.subtle }} aria-label="Freelance work and client reviews for Ghanshyam Ghimire">
      <div className="section-inner-padded">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: '48px' }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 500,
              color: AI.fg,
              margin: '0',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}
          >
            Trusted by clients<br />around the world.
          </h2>
        </motion.div>

        {/* Upwork profile card — clean, no gradient avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="freelance-card"
          style={{
            backgroundColor: AI.card,
            border: `1px solid ${AI.border}`,
            borderRadius: '16px',
            padding: '28px 32px',
            marginBottom: '32px',
          }}
        >
          {/* Identity */}
          <div className="freelance-card-content" style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.0625rem', fontWeight: 600, color: AI.fg, letterSpacing: '-0.01em' }}>
                Ghanshyam G.
              </span>
              <span
                style={{
                  padding: '1px 9px',
                  borderRadius: '4px',
                  backgroundColor: '#D1FAE5',
                  color: '#065F46',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  flexShrink: 0,
                }}
              >
                Top Rated
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: AI.muted, margin: 0 }}>
              AI Engineer & ML Developer · Upwork
            </p>
          </div>

          {/* Stats */}
          <div className="freelance-stats">
            {STATS.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: AI.fg, letterSpacing: '-0.025em', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: AI.muted, marginTop: '5px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="https://www.upwork.com/freelancers/~01043444993a97d448?mp_source=share"
            target="_blank"
            rel="noopener noreferrer"
            className="freelance-profile-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              borderRadius: '8px',
              backgroundColor: '#14A800',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            View Profile <ExternalLink size={13} />
          </a>
        </motion.div>
      </div>

      {/* Reviews horizontal scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.15 }}
      >
        <div ref={scrollRef} className="freelance-review-scroll">
          {LOCAL_REVIEWS.map(r => (
            <ReviewCard key={r.id} review={r} onClick={() => setSelectedReview(r)} />
          ))}
        </div>
      </motion.div>

      <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
    </section>
  )
}
