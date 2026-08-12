import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { getColors } from '../constants/colors'
import type { Mode } from '../constants/colors'

interface Props {
  mode: Mode
  src: string
  alt: string
}

const CONTAINER_WIDTH = 320
const BG_BOTTOM = 36
const BG_HEIGHT = 360
const BG_WIDTH = 280
const BG_LEFT = (CONTAINER_WIDTH - BG_WIDTH) / 2
const SUBJECT_OVERFLOW = 0.12
const AI_BG_RADIUS = 28
const MUSIC_BG_RADIUS = 24

const PORTRAIT_CONFIG = {
  ai: {
    justifyContent: 'center' as const,
    bottomOffset: 0,
    height: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    aspectRatio: '2942 / 3328',
  },
  music: {
    justifyContent: 'flex-start' as const,
    bottomOffset: 8,
    height: '170.5%',
    left: '-14px',
    transform: 'none',
    aspectRatio: '2160 / 3840',
  },
}

export function FloatingPortrait({ mode, src, alt }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const c = getColors(mode)
  const isAI = mode === 'ai'
  const portraitConfig = isAI ? PORTRAIT_CONFIG.ai : PORTRAIT_CONFIG.music
  const portraitBottom = BG_BOTTOM - portraitConfig.bottomOffset
  const r = isAI ? AI_BG_RADIUS : MUSIC_BG_RADIUS
  const subjectHeight = BG_HEIGHT * (1 + SUBJECT_OVERFLOW)
  const containerHeight = BG_BOTTOM + subjectHeight + 24
  const curveY = subjectHeight - r
  const clipPathStr = isAI
    ? `path('M -100 0 L ${BG_WIDTH + 100} 0 L ${BG_WIDTH + 100} ${subjectHeight} L ${r} ${subjectHeight} A ${r} ${r} 0 0 1 0 ${curveY} L -100 ${curveY} Z')`
    : `path('M 0 0 L 92 0 L 92 -284 L ${BG_WIDTH + 100} -284 L ${BG_WIDTH + 100} ${subjectHeight} L ${r} ${subjectHeight} A ${r} ${r} 0 0 1 0 ${curveY} L 0 ${curveY} Z')`

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 8, y: y * -6 })
  }

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  const hoverMotion = {
    rotateY: hovered ? tilt.x * 0.5 : tilt.x * 0.25,
    rotateX: hovered ? tilt.y * 0.35 : tilt.y * 0.15,
    y: hovered ? -3 : 0,
    x: tilt.x * (hovered ? 1.2 : 0.6),
    scale: hovered ? 1.02 : 1,
  }

  return (
    <div className="portrait-wrapper">
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        position: 'relative',
        width: CONTAINER_WIDTH,
        height: containerHeight,
        perspective: '900px',
        flexShrink: 0,
      }}
    >
      {/* Background */}
      <motion.div
        animate={{ x: tilt.x * (isAI ? 0.25 : 0.2), y: tilt.y * (isAI ? 0.2 : 0.15) }}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
        style={{
          position: 'absolute',
          bottom: portraitBottom,
          left: BG_LEFT,
          width: BG_WIDTH,
          height: BG_HEIGHT,
          borderRadius: isAI ? AI_BG_RADIUS : MUSIC_BG_RADIUS,
          background: isAI
            ? `linear-gradient(150deg, ${c.accentLight} 0%, #EFF6FF 60%, ${c.subtle} 100%)`
            : 'linear-gradient(160deg, #3D2518 0%, #5C3A22 45%, #8B5A2B 100%)',
          border: isAI ? `1px solid ${c.border}` : '1px solid rgba(217, 207, 186, 0.35)',
          boxShadow: isAI
            ? hovered
              ? '0 24px 48px rgba(37, 99, 235, 0.12)'
              : '0 16px 40px rgba(37, 99, 235, 0.07)'
            : hovered
              ? '0 24px 56px rgba(44, 22, 16, 0.20)'
              : '0 20px 48px rgba(44, 22, 16, 0.15)',
          zIndex: 1,
          overflow: 'hidden',
        }}
      />

      {/* Subject */}
      <div
        style={{
          position: 'absolute',
          bottom: portraitBottom,
          left: BG_LEFT,
          width: BG_WIDTH,
          height: subjectHeight,
          zIndex: 2,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      >
        <motion.div
          animate={hoverMotion}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            transformStyle: 'preserve-3d',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: portraitConfig.justifyContent,
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '0px',
              left: 0,
              right: 0,
              height: '100%',
              clipPath: clipPathStr,
            }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                position: 'absolute',
                bottom: 0,
                left: portraitConfig.left,
                transform: portraitConfig.transform,
                height: portraitConfig.height,
                width: 'auto',
                maxWidth: 'none',
                aspectRatio: portraitConfig.aspectRatio,
                display: 'block',
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
    </div>
  )
}
