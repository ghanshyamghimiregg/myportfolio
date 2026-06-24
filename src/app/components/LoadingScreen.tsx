import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import aiPortrait from '../../assets/ggnewpic.webp'
import musicPortrait from '../../assets/1230_2.webp'

interface Props {
  onComplete: () => void
}

const MIN_DISPLAY_MS = 2400

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

export function LoadingScreen({ onComplete }: Props) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const start = Date.now()
    const preload = Promise.all([
      preloadImage(aiPortrait),
      preloadImage(musicPortrait),
    ])
    preload.then(() => {
      const elapsed = Date.now() - start
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed)
      setTimeout(() => setVisible(false), remaining)
    })
  }, [])

  const handleExitComplete = () => {
    onComplete()
  }

  const guitarStroke = '#1A1A1A'
  const guitarAccent = '#2563EB'
  const laptopStroke = '#2C1610'
  const laptopAccent = '#B45309'

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            background: 'linear-gradient(160deg, #F7F6F3 0%, #FAF4E8 100%)',
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          {/* Icons row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '48px' }}>
            {/* Guitar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg viewBox="0 0 100 280" width="80" height="224" fill="none" aria-hidden="true">
                  <rect x="35" y="8" width="30" height="38" rx="5" stroke={guitarStroke} strokeWidth="1.6" />
                  <circle cx="31" cy="18" r="3" fill={guitarStroke} opacity="0.7" />
                  <circle cx="31" cy="27" r="3" fill={guitarStroke} opacity="0.7" />
                  <circle cx="31" cy="36" r="3" fill={guitarStroke} opacity="0.7" />
                  <circle cx="69" cy="18" r="3" fill={guitarStroke} opacity="0.7" />
                  <circle cx="69" cy="27" r="3" fill={guitarStroke} opacity="0.7" />
                  <circle cx="69" cy="36" r="3" fill={guitarStroke} opacity="0.7" />
                  <rect x="40" y="46" width="20" height="76" stroke={guitarStroke} strokeWidth="1.4" />
                  {[62, 73, 85, 97, 110].map((y, i) => (
                    <line key={i} x1="40" y1={y} x2="60" y2={y} stroke={guitarStroke} strokeWidth="0.8" opacity="0.45" />
                  ))}
                  <line x1="40" y1="48" x2="60" y2="48" stroke={guitarStroke} strokeWidth="2" />
                  <path
                    d="M 50 122 C 73 122 86 137 86 156 C 86 172 77 181 66 183 C 62 184 58 185 55 186 C 64 190 88 203 88 229 C 88 256 72 272 50 272 C 28 272 12 256 12 229 C 12 203 36 190 45 186 C 42 185 38 184 34 183 C 23 181 14 172 14 156 C 14 137 27 122 50 122 Z"
                    stroke={guitarStroke}
                    strokeWidth="1.6"
                  />
                  <circle cx="50" cy="215" r="18" stroke={guitarStroke} strokeWidth="1.4" />
                  <circle cx="50" cy="215" r="14" stroke={guitarStroke} strokeWidth="0.5" opacity="0.3" />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                    <circle
                      key={i}
                      cx={50 + 16 * Math.cos((deg * Math.PI) / 180)}
                      cy={215 + 16 * Math.sin((deg * Math.PI) / 180)}
                      r="1"
                      fill={guitarStroke}
                      opacity="0.35"
                    />
                  ))}
                  <rect x="36" y="251" width="28" height="6" rx="2" stroke={guitarStroke} strokeWidth="1.2" />
                  {/* Strings with subtle animation via CSS */}
                  {[
                    { xN: 42, xB: 37, w: 1.4 },
                    { xN: 45.5, xB: 42, w: 1.2 },
                    { xN: 49, xB: 47, w: 1.0 },
                    { xN: 52.5, xB: 53, w: 0.85 },
                    { xN: 56, xB: 58, w: 0.7 },
                    { xN: 59.5, xB: 63, w: 0.55 },
                  ].map((s, i) => (
                    <path
                      key={i}
                      d={`M ${s.xN} 48 C ${s.xN} 118 ${s.xB} 185 ${s.xB} 253`}
                      stroke={guitarAccent}
                      strokeWidth={s.w}
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.9"
                    />
                  ))}
                  <line x1="40" y1="46" x2="40" y2="122" stroke={guitarStroke} strokeWidth="1.4" />
                  <line x1="60" y1="46" x2="60" y2="122" stroke={guitarStroke} strokeWidth="1.4" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Ampersand */}
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '2rem',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#999',
                marginBottom: '60px',
              }}
            >
              &amp;
            </motion.span>

            {/* Laptop */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg viewBox="0 0 120 100" width="132" height="110" fill="none" aria-hidden="true">
                  <rect x="18" y="8" width="84" height="54" rx="6" stroke={laptopStroke} strokeWidth="1.6" />
                  <rect x="24" y="14" width="72" height="42" rx="3" fill={laptopAccent} opacity="0.12" />
                  {/* Screen lines with staggered widths */}
                  {[22, 30, 38, 46].map((y, i) => (
                    <motion.line
                      key={y}
                      x1="30"
                      y1={y}
                      x2={i % 2 === 0 ? 78 : 64}
                      y2={y}
                      stroke={laptopAccent}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                    />
                  ))}
                  <motion.circle
                    cx="86" cy="18" r="2.5"
                    fill={laptopAccent}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <rect x="16" y="62" width="88" height="4" rx="2" fill={laptopStroke} opacity="0.25" />
                  <path
                    d="M8 66 L112 66 C114 66 116 68 116 70 L116 78 C116 82 112 86 108 88 L12 88 C8 86 4 82 4 78 L4 70 C4 68 6 66 8 66 Z"
                    stroke={laptopStroke}
                    strokeWidth="1.6"
                  />
                  <rect x="46" y="74" width="28" height="10" rx="3" stroke={laptopStroke} strokeWidth="1" opacity="0.45" />
                  {[24, 34, 44, 54, 64, 74, 84].map(x => (
                    <rect key={x} x={x} y="70" width="6" height="3" rx="0.8" fill={laptopStroke} opacity="0.18" />
                  ))}
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            style={{ textAlign: 'center' }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 500,
                color: '#1A1A1A',
                letterSpacing: '-0.02em',
                margin: '0 0 12px',
                lineHeight: 1.3,
              }}
            >
              Ghanshyam Ghimire
            </h1>
            <p
              style={{
                fontSize: '0.875rem',
                color: '#6B6B6B',
                margin: 0,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              AI Engineer · Musician
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              width: '120px',
              height: '2px',
              backgroundColor: '#E8E7E4',
              borderRadius: '2px',
              overflow: 'hidden',
              marginTop: '8px',
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: MIN_DISPLAY_MS / 1000 - 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{
                height: '100%',
                background: `linear-gradient(90deg, ${guitarAccent} 0%, ${laptopAccent} 100%)`,
                borderRadius: '2px',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
