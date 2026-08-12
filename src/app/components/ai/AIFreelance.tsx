import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Star, ExternalLink } from 'lucide-react'
import { AI } from '../../constants/colors'
import { ReviewModal } from './ReviewModal'

const STATS = [
  { label: 'Job Success', value: '100%', icon: '✓' },
  { label: 'Projects Completed', value: '2', icon: '◉' },
  { label: 'Client Satisfaction', value: '4.75 ★', icon: '★' },
  { label: 'Total Earnings', value: '$110+', icon: '↑' },
]

import { LOCAL_REVIEWS } from '../../constants/reviewsData'
import type { LocalReview } from '../../constants/reviewsData'

function ReviewCard({ review, onClick }: { review: LocalReview; onClick: () => void }) {
  const shouldTruncate = review.text.length > 160

  return (
    <motion.div
      layout
      onClick={onClick}
      whileHover={{ y: -4, borderColor: AI.accent }}
      style={{
        backgroundColor: AI.card,
        border: `1px solid ${AI.border}`,
        borderRadius: '16px',
        padding: '24px',
        width: '320px',
        minWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        flexShrink: 0,
        cursor: 'pointer',
        userSelect: 'none',
      }}
      className="review-card-width"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const starValue = i + 1;
            if (review.rating >= starValue) {
              return <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />;
            } else if (review.rating > starValue - 1) {
              return (
                <div key={i} style={{ position: 'relative', width: 14, height: 14, display: 'inline-block' }}>
                  <Star size={14} color="#F59E0B" />
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                  </div>
                </div>
              );
            } else {
              return <Star key={i} size={14} color="#E2E8F0" />;
            }
          })}
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: AI.fg, marginLeft: '4px' }}>
            {review.rating}
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', color: AI.muted }}>{review.date}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
            textOverflow: 'ellipsis',
          }}
        >
          "{review.text}"
        </p>
        {shouldTruncate && (
          <span
            style={{
              fontSize: '0.75rem',
              color: AI.accent,
              fontWeight: 600,
              alignSelf: 'flex-start',
              marginTop: '4px',
            }}
          >
            Read More →
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: `1px solid ${AI.border}`, paddingTop: '16px', marginTop: 'auto' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: AI.accentLight,
            color: AI.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {review.avatar}
        </div>
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: AI.fg }}>{review.client}</div>
          <div style={{ fontSize: '0.75rem', color: AI.muted }}>
            {review.location} · {review.project} <span style={{ fontSize: '0.6875rem', color: AI.accent, fontWeight: 500 }}>({review.category})</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function AIFreelance() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedReview, setSelectedReview] = useState<LocalReview | null>(null)

  return (
    <section className="section-pad" style={{ backgroundColor: AI.subtle }}>
      <div className="section-inner-padded">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px' }}
        >
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: AI.accent, fontWeight: 500 }}>
            Freelance
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 500,
              color: AI.fg,
              marginTop: '12px',
              marginBottom: '0',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Trusted by clients<br />
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>around the world.</em>
          </h2>
        </motion.div>

        {/* Upwork profile card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: AI.card,
            border: `1px solid ${AI.border}`,
            borderRadius: '20px',
            padding: '32px',
            marginBottom: '32px',
          }}
          className="freelance-card"
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #14A800 0%, #1B7D0A 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '1.5rem',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            Up
          </div>
          <div className="freelance-card-content" style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.125rem', fontWeight: 600, color: AI.fg }}>Ghanshyam G.</span>
              <span style={{ padding: '2px 10px', borderRadius: '100px', backgroundColor: '#E8F8E2', color: '#14A800', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 }}>
                Top Rated
              </span>
            </div>
            <p style={{ fontSize: '0.9375rem', color: AI.muted, margin: 0 }}>AI Engineer & ML Developer · Upwork Freelancer</p>
          </div>
          <div className="freelance-stats">
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.375rem', fontWeight: 700, color: AI.fg, letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: AI.muted, marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <a
            href="https://www.upwork.com/freelancers/~01043444993a97d448?mp_source=share"
            target="_blank"
            rel="noopener noreferrer"
            className="freelance-profile-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '100px',
              backgroundColor: '#14A800',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            View Profile <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>

      {/* Reviews scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ position: 'relative' }}
      >
        <div
          ref={scrollRef}
          className="freelance-review-scroll"
        >
          {LOCAL_REVIEWS.map(r => (
            <ReviewCard key={r.id} review={r} onClick={() => setSelectedReview(r)} />
          ))}
        </div>
      </motion.div>

      <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
    </section>
  )
}
