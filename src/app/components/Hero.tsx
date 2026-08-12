import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LinkedinIcon, InstagramIcon, FacebookIcon, GithubIcon, type LucideIcon } from 'lucide-react'
import { GuitarToggle } from './GuitarToggle'
import { LaptopToggle } from './LaptopToggle'
import { FloatingPortrait } from './FloatingPortrait'
import { getColors } from '../constants/colors'
import type { Mode } from '../constants/colors'
import aiPortrait from '../../assets/ggnewpic.webp'
import musicPortrait from '../../assets/ggpotraight.png'

interface Props {
  mode: Mode
  onSwitchToMusic: () => void
  onSwitchToAI: () => void
}

interface MagneticPos { x: number; y: number }

const AI_SOCIALS = [
  { name: 'GitHub', color: 'var(--ai-fg)', href: 'https://github.com/ghanshyamghimiregg', icon: GithubIcon },
  { name: 'Instagram', color: '#E1306C', href: 'https://www.instagram.com/ghanshyamghimiremusic/', icon: InstagramIcon },
  { name: 'Facebook', color: '#1877F2', href: 'https://www.facebook.com/ghanshyamghimiregg', icon: FacebookIcon },
  { name: 'LinkedIn', color: '#0A66C2', href: 'https://www.linkedin.com/in/ghanshyam-ghimire-441854213/', icon: LinkedinIcon },
]

function SocialIconButton({
  social,
  borderColor,
  backgroundColor,
}: {
  social: { name: string; color: string; href: string; icon: LucideIcon }
  borderColor: string
  backgroundColor: string
}) {
  const Icon = social.icon

  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name}
      title={social.name}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.96 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '42px',
        height: '42px',
        borderRadius: '999px',
        border: `1.5px solid ${borderColor}`,
        backgroundColor,
        color: social.color,
        textDecoration: 'none',
        transition: 'border-color 0.18s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = social.color
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = borderColor
      }}
    >
      <Icon size={18} strokeWidth={1.9} />
    </motion.a>
  )
}

function MagneticButton({ children, href, primary, mode }: { children: React.ReactNode; href: string; primary?: boolean; mode: Mode }) {
  const [pos, setPos] = useState<MagneticPos>({ x: 0, y: 0 })
  const c = getColors(mode)

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.10,
      y: (e.clientY - rect.top - rect.height / 2) * 0.10,
    })
  }

  return (
    <motion.a
      href={href}
      animate={{ x: pos.x, y: pos.y }}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '13px 28px',
        borderRadius: '100px',
        textDecoration: 'none',
        fontFamily: 'inherit',
        fontSize: '0.9375rem',
        fontWeight: 500,
        cursor: 'pointer',
        backgroundColor: primary ? c.fg : 'transparent',
        color: primary ? c.bg : c.fg,
        border: primary ? 'none' : `1.5px solid ${c.border}`,
        letterSpacing: '-0.01em',
        minHeight: '48px',
      }}
    >
      {children}
    </motion.a>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

export function Hero({ mode, onSwitchToMusic, onSwitchToAI }: Props) {
  const c = getColors(mode)
  const isAI = mode === 'ai'

  return (
    <section className="hero-section" aria-label="Introduction — Ghanshyam Ghimire">
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div className="hero-grid">
          {/* Left: Text content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', minWidth: 0 }}>
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: c.accent,
                  marginBottom: '16px',
                }}
              >
                <span style={{ width: '24px', height: '1px', backgroundColor: c.accent, display: 'inline-block' }} />
                {isAI ? 'AI Engineer & Musician' : 'Musician & AI Engineer'}
              </span>
              <motion.h1
                animate={{ color: c.fg }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 600,
                  lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                  margin: 0,
                }}
              >
                {isAI ? (
                  <>
                    AI Engineer<br />
                    <em style={{ fontStyle: 'italic', fontWeight: 400 }}>by Logic.</em>
                  </>
                ) : (
                  <>
                    Musician<br />
                    <em style={{ fontStyle: 'italic', fontWeight: 400 }}>by Heart.</em>
                  </>
                )}
              </motion.h1>
            </motion.div>

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: c.muted,
                maxWidth: '42ch',
                margin: 0,
              }}
            >
              {isAI
                ? 'Building practical AI systems that solve real-world problems while creating music that captures memories and emotions.'
                : 'Sharing stories through music, one song at a time.'}
            </motion.p>

            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="hero-cta-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <MagneticButton href={isAI ? '#projects' : '#songs'} primary mode={mode}>
                {isAI ? 'View Projects' : 'Listen to Music'}
                <span style={{ opacity: 0.7 }}>↓</span>
              </MagneticButton>
              <MagneticButton href="#about" mode={mode}>
                {isAI ? 'About Me' : 'My Story'}
              </MagneticButton>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="hero-stats"
              style={{ display: 'flex', gap: '28px', paddingTop: '4px', flexWrap: 'wrap' }}
            >
              {isAI ? (
                <>
                  <Stat value="5+" label="AI Projects" color={c} />
                  <Stat value="BTech AI" label="Kathmandu University" color={c} />
                </>
              ) : (
                <>
                  <Stat value="4" label="Songs Released" color={c} />
                  <Stat value="Pop Folk" label="Primary Genre" color={c} />
                  <Stat value="2013" label="Started Music" color={c} />
                </>
              )}
            </motion.div>

            {/* Social links — below stats, AI mode only */}
            {isAI && (
              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="hero-social-icons"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', paddingTop: '2px' }}
              >
                {AI_SOCIALS.map(s => (
                  <SocialIconButton
                    key={s.name}
                    social={s}
                    borderColor={c.border}
                    backgroundColor={c.card}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Center: Mode toggle */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hero-toggle-col"
            style={{
              position: 'relative',
              zIndex: 30,
              pointerEvents: 'auto',
            }}
          >
            {isAI ? (
              <GuitarToggle onSwitch={onSwitchToMusic} />
            ) : (
              <LaptopToggle onSwitch={onSwitchToAI} />
            )}
          </motion.div>

          {/* Portrait column */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hero-portrait-col"
            style={{
              position: 'relative',
              zIndex: 1,
            }}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={mode}
                layout
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'center bottom' }}
              >
                <FloatingPortrait
                  mode={mode}
                  src={isAI ? aiPortrait : musicPortrait}
                  alt={isAI ? "Ghanshyam Ghimire — AI engineering student, Nepal" : "Ghanshyam Ghimire — singer-songwriter, Nepal"}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}
          className="hero-scroll-indicator"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: c.muted }}>
              Scroll
            </span>
            <div style={{ width: '1px', height: '40px', backgroundColor: c.border }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ value, label, color }: { value: string; label: string; color: ReturnType<typeof getColors> }) {
  return (
    <div>
      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: color.fg, letterSpacing: '-0.02em' }}>{value}</div>
      <div style={{ fontSize: '0.75rem', color: color.muted, letterSpacing: '0.02em', marginTop: '2px' }}>{label}</div>
    </div>
  )
}
