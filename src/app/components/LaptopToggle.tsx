import { useState } from 'react'
import { motion, useAnimation } from 'motion/react'

interface Props {
  onSwitch: () => void
}

export function LaptopToggle({ onSwitch }: Props) {
  const [isAnimating, setIsAnimating] = useState(false)
  const bodyControls = useAnimation()
  const screenControls = useAnimation()

  const strokeColor = '#2C1610'
  const accentColor = '#B45309'

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isAnimating) return

    setIsAnimating(true)

    await Promise.all([
      bodyControls.start({
        rotate: [0, -5, 5, -4, 4, -2, 2, 0],
        x: [0, 3, -3, 2, -2, 1, 0],
        y: [0, -3, 2, -2, 1, 0],
        scale: [1, 1.04, 0.98, 1.02, 1],
        transition: { duration: 0.8, ease: 'easeOut' },
      }),
      screenControls.start({
        opacity: [1, 0.25, 1, 0.4, 1, 0.7, 1],
        scale: [1, 0.96, 1.02, 0.98, 1],
        transition: { duration: 0.8, ease: 'easeOut' },
      }),
    ])

    onSwitch()
    setIsAnimating(false)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Switch to AI engineer side"
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
        style={{ transformOrigin: 'center bottom', userSelect: 'none', pointerEvents: 'none' }}
      >
        <svg
          viewBox="0 0 120 100"
          className="laptop-toggle-svg"
          width="132"
          height="110"
          fill="none"
          aria-hidden="true"
          style={{ display: 'block', pointerEvents: 'none' }}
        >
          <rect x="18" y="8" width="84" height="54" rx="6" stroke={strokeColor} strokeWidth="1.6" />
          <motion.rect
            animate={screenControls}
            x="24"
            y="14"
            width="72"
            height="42"
            rx="3"
            fill={accentColor}
            opacity="0.12"
          />
          {[22, 30, 38, 46].map((y, i) => (
            <motion.line
              key={y}
              animate={screenControls}
              x1="30"
              y1={y}
              x2={i % 2 === 0 ? 78 : 64}
              y2={y}
              stroke={accentColor}
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.55"
            />
          ))}
          <motion.circle animate={screenControls} cx="86" cy="18" r="2.5" fill={accentColor} opacity="0.7" />
          <rect x="16" y="62" width="88" height="4" rx="2" fill={strokeColor} opacity="0.25" />
          <path
            d="M8 66 L112 66 C114 66 116 68 116 70 L116 78 C116 82 112 86 108 88 L12 88 C8 86 4 82 4 78 L4 70 C4 68 6 66 8 66 Z"
            stroke={strokeColor}
            strokeWidth="1.6"
          />
          <rect x="46" y="74" width="28" height="10" rx="3" stroke={strokeColor} strokeWidth="1" opacity="0.45" />
          {[24, 34, 44, 54, 64, 74, 84].map(x => (
            <rect key={x} x={x} y="70" width="6" height="3" rx="0.8" fill={strokeColor} opacity="0.18" />
          ))}
        </svg>
      </motion.div>
    </button>
  )
}
