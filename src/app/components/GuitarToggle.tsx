import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'motion/react'

interface Props {
  onSwitch: () => void
}

const STRING_DATA = [
  { xNut: 42, xBridge: 37, amp: 5, width: 1.4, delay: 0.00 },
  { xNut: 45.5, xBridge: 42, amp: 4.5, width: 1.2, delay: 0.03 },
  { xNut: 49, xBridge: 47, amp: 4, width: 1.0, delay: 0.05 },
  { xNut: 52.5, xBridge: 53, amp: 4, width: 0.85, delay: 0.07 },
  { xNut: 56, xBridge: 58, amp: 4.5, width: 0.7, delay: 0.05 },
  { xNut: 59.5, xBridge: 63, amp: 5, width: 0.55, delay: 0.03 },
]

function normalPath(s: typeof STRING_DATA[0]) {
  return `M ${s.xNut} 48 C ${s.xNut} 118 ${s.xBridge} 185 ${s.xBridge} 253`
}

function wavyPath(s: typeof STRING_DATA[0], sign: number) {
  const c1x = s.xNut + s.amp * sign
  const c2x = s.xBridge - s.amp * sign
  return `M ${s.xNut} 48 C ${c1x} 118 ${c2x} 185 ${s.xBridge} 253`
}

export function GuitarToggle({ onSwitch }: Props) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [vibrate, setVibrate] = useState(false)
  const bodyControls = useAnimation()
  const stringControls = useAnimation()

  const strokeColor = '#1A1A1A'
  const accentColor = '#2563EB'

  useEffect(() => {
    if (vibrate) {
      stringControls.start(i => ({
        d: [
          normalPath(STRING_DATA[i]),
          wavyPath(STRING_DATA[i], 1),
          wavyPath(STRING_DATA[i], -1),
          wavyPath(STRING_DATA[i], 0.85),
          wavyPath(STRING_DATA[i], -0.65),
          wavyPath(STRING_DATA[i], 0.45),
          wavyPath(STRING_DATA[i], -0.25),
          normalPath(STRING_DATA[i]),
        ],
        transition: {
          duration: 0.85,
          ease: 'easeOut',
          delay: STRING_DATA[i].delay,
        },
      }))
    } else {
      stringControls.start(i => ({
        d: normalPath(STRING_DATA[i]),
        transition: { duration: 0.2 },
      }))
    }
  }, [vibrate, stringControls])

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isAnimating) return

    setIsAnimating(true)
    setVibrate(true)

    await bodyControls.start({
      rotate: [0, -14, 14, -10, 10, -6, 6, -3, 0],
      x: [0, -4, 4, -3, 3, -1, 0],
      y: [0, 2, -2, 1, -1, 0],
      scale: [1, 1.06, 1.04, 1.02, 1],
      transition: { duration: 0.85, ease: 'easeOut' },
    })

    setVibrate(false)
    onSwitch()
    setIsAnimating(false)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Switch to musician side"
      style={{
        cursor: isAnimating ? 'default' : 'pointer',
        background: 'none',
        border: 'none',
        padding: '16px',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 30,
        touchAction: 'manipulation',
      }}
    >
      <motion.div
        animate={bodyControls}
        whileHover={isAnimating ? {} : { scale: 1.05, y: -4 }}
        style={{ transformOrigin: 'center', userSelect: 'none', pointerEvents: 'none' }}
      >
        <svg
          viewBox="0 0 100 280"
          width="110"
          height="308"
          fill="none"
          aria-hidden="true"
          style={{ display: 'block', pointerEvents: 'none' }}
        >
          <rect x="35" y="8" width="30" height="38" rx="5" stroke={strokeColor} strokeWidth="1.6" />
          <circle cx="31" cy="18" r="3" fill={strokeColor} opacity="0.7" />
          <circle cx="31" cy="27" r="3" fill={strokeColor} opacity="0.7" />
          <circle cx="31" cy="36" r="3" fill={strokeColor} opacity="0.7" />
          <circle cx="69" cy="18" r="3" fill={strokeColor} opacity="0.7" />
          <circle cx="69" cy="27" r="3" fill={strokeColor} opacity="0.7" />
          <circle cx="69" cy="36" r="3" fill={strokeColor} opacity="0.7" />
          <rect x="40" y="46" width="20" height="76" stroke={strokeColor} strokeWidth="1.4" />
          {[62, 73, 85, 97, 110].map((y, i) => (
            <line key={i} x1="40" y1={y} x2="60" y2={y} stroke={strokeColor} strokeWidth="0.8" opacity="0.45" />
          ))}
          <line x1="40" y1="48" x2="60" y2="48" stroke={strokeColor} strokeWidth="2" />
          <path
            d="M 50 122 C 73 122 86 137 86 156 C 86 172 77 181 66 183 C 62 184 58 185 55 186 C 64 190 88 203 88 229 C 88 256 72 272 50 272 C 28 272 12 256 12 229 C 12 203 36 190 45 186 C 42 185 38 184 34 183 C 23 181 14 172 14 156 C 14 137 27 122 50 122 Z"
            stroke={strokeColor}
            strokeWidth="1.6"
          />
          <circle cx="50" cy="215" r="18" stroke={strokeColor} strokeWidth="1.4" />
          <circle cx="50" cy="215" r="14" stroke={strokeColor} strokeWidth="0.5" opacity="0.3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <circle
              key={i}
              cx={50 + 16 * Math.cos((deg * Math.PI) / 180)}
              cy={215 + 16 * Math.sin((deg * Math.PI) / 180)}
              r="1"
              fill={strokeColor}
              opacity="0.35"
            />
          ))}
          <rect x="36" y="251" width="28" height="6" rx="2" stroke={strokeColor} strokeWidth="1.2" />
          <rect x="39" y="253" width="22" height="2" rx="1" fill={strokeColor} opacity="0.25" />
          {STRING_DATA.map((s, i) => (
            <motion.path
              key={i}
              custom={i}
              animate={stringControls}
              d={normalPath(s)}
              stroke={accentColor}
              strokeWidth={s.width}
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
          ))}
          <line x1="40" y1="46" x2="40" y2="122" stroke={strokeColor} strokeWidth="1.4" />
          <line x1="60" y1="46" x2="60" y2="122" stroke={strokeColor} strokeWidth="1.4" />
        </svg>
      </motion.div>
    </button>
  )
}
