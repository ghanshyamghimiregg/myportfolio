import { motion, AnimatePresence } from 'motion/react'
import { X, Star } from 'lucide-react'
import { AI } from '../../constants/colors'
import type { LocalReview } from '../../constants/reviewsData'

interface Props {
  review: LocalReview | null
  onClose: () => void
}

export function ReviewModal({ review, onClose }: Props) {
  return (
    <AnimatePresence>
      {review && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 200,
              backdropFilter: 'blur(4px)',
            }}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="review-modal-container"
          >
            {/* Header */}
            <div className="modal-header" style={{ borderBottom: `1px solid ${AI.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: AI.accent, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Client Feedback
                </span>
                <h2 style={{ color: AI.fg, fontSize: '1.5rem', fontWeight: 600, margin: '4px 0 0', letterSpacing: '-0.02em' }}>
                  {review.client}
                </h2>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: AI.subtle,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                }}
              >
                <X size={16} color={AI.fg} />
              </button>
            </div>

            {/* Content */}
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Rating and Date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starValue = i + 1;
                    if (review.rating >= starValue) {
                      return <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />;
                    } else if (review.rating > starValue - 1) {
                      return (
                        <div key={i} style={{ position: 'relative', width: 18, height: 18, display: 'inline-block' }}>
                          <Star size={18} color="#F59E0B" />
                          <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
                            <Star size={18} fill="#F59E0B" color="#F59E0B" />
                          </div>
                        </div>
                      );
                    } else {
                      return <Star key={i} size={18} color="#E2E8F0" />;
                    }
                  })}
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: AI.fg, marginLeft: '6px' }}>
                    {review.rating} / 5
                  </span>
                </div>
                <span style={{ fontSize: '0.875rem', color: AI.muted }}>{review.date}</span>
              </div>

              {/* Review Text */}
              <div>
                <p style={{ fontSize: '1.125rem', color: AI.fg, lineHeight: 1.8, fontStyle: 'italic', margin: 0 }}>
                  "{review.text}"
                </p>
              </div>

              {/* Client Info & Project Details */}
              <div style={{ borderTop: `1px solid ${AI.border}`, paddingTop: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: AI.accentLight,
                    color: AI.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 700,
                  }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: AI.fg }}>{review.client}</div>
                  <div style={{ fontSize: '0.875rem', color: AI.muted, marginTop: '2px' }}>
                    {review.location} · {review.project}
                  </div>
                  <span style={{ display: 'inline-block', marginTop: '6px', padding: '2px 8px', borderRadius: '4px', backgroundColor: AI.subtle, color: AI.accent, fontSize: '0.75rem', fontWeight: 500 }}>
                    {review.category} Platform Review
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
