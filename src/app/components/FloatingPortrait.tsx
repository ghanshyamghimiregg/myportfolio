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

export function FloatingPortrait({ mode, src, alt }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const c = getColors(mode)
  const isAI = mode === 'ai'
  const r = isAI ? AI_BG_RADIUS : MUSIC_BG_RADIUS
  const subjectHeight = BG_HEIGHT * (1 + SUBJECT_OVERFLOW)
  const containerHeight = BG_BOTTOM + subjectHeight + 24
  const curveY = subjectHeight - r
  const clipPathStr = `path('M -100 0 L ${BG_WIDTH + 100} 0 L ${BG_WIDTH + 100} ${subjectHeight} L ${r} ${subjectHeight} A ${r} ${r} 0 0 1 0 ${curveY} L -100 ${curveY} Z')`

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
          bottom: BG_BOTTOM,
          left: BG_LEFT,
          width: BG_WIDTH,
          height: BG_HEIGHT,
          borderRadius: isAI ? AI_BG_RADIUS : MUSIC_BG_RADIUS,
          background: isAI
            ? `linear-gradient(145deg, ${c.accentLight} 0%, #DBEAFE 50%, ${c.subtle} 100%)`
            : 'linear-gradient(165deg, #3D2518 0%, #5C3A22 38%, #8B5A2B 72%, #C4843A 100%)',
          border: isAI ? `1px solid ${c.border}` : '1px solid rgba(217, 207, 186, 0.45)',
          boxShadow: isAI
            ? hovered
              ? '0 28px 56px rgba(37, 99, 235, 0.14)'
              : '0 20px 50px rgba(37, 99, 235, 0.08)'
            : hovered
              ? '0 28px 64px rgba(44, 22, 16, 0.22), inset 0 1px 0 rgba(255, 248, 238, 0.15)'
              : '0 24px 60px rgba(44, 22, 16, 0.18), inset 0 1px 0 rgba(255, 248, 238, 0.15)',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {!isAI && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 90% 80% at 72% 18%, rgba(251, 191, 36, 0.55) 0%, rgba(217, 119, 6, 0.2) 35%, transparent 68%)',
            }}
          />
        )}
      </motion.div>

      {/* Subject — bottom flush with bg, ~12% taller for top pop-out */}
      <div
        style={{
          position: 'absolute',
          bottom: BG_BOTTOM,
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
            justifyContent: isAI ? 'center' : 'flex-start',
          }}
        >
          {isAI ? (
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
                  left: '50%',
                  transform: 'translateX(-50%)',
                  height: '100%',
                  width: 'auto',
                  maxWidth: 'none',
                  aspectRatio: '2942 / 3328',
                  display: 'block',
                }}
              />
            </div>
          ) : (
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
                  left: 0,
                  height: '155%',
                  width: 'auto',
                  maxWidth: 'none',
                  aspectRatio: '2160 / 3840',
                  display: 'block',
                }}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
