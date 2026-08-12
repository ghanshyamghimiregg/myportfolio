import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Brain, Music, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { getColors } from '../constants/colors'
import type { Mode } from '../constants/colors'

interface Props {
  mode: Mode
  onToggle: () => void
}

export function Navigation({ mode, onToggle }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const c = getColors(mode)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Top nav bar ─────────────────────────────────────────── */}
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        animate={{
          backgroundColor: c.bg,
          borderColor: scrolled ? c.border : 'transparent',
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: `1px solid ${scrolled ? c.border : 'transparent'}`,
          boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="nav-inner">
          <motion.span
            animate={{ color: c.fg }}
            transition={{ duration: 0.6 }}
            className="nav-name"
            style={{ fontWeight: 500, letterSpacing: '-0.01em' }}
          >
            Ghanshyam Ghimire
          </motion.span>

          <div className="nav-links">
            <motion.a
              href="mailto:ghanshyamghimiregg@gmail.com"
              animate={{ color: c.muted }}
              whileHover={{ color: c.fg }}
              transition={{ duration: 0.15 }}
              className="nav-link-contact"
              style={{ fontSize: '0.875rem', textDecoration: 'none', fontFamily: 'inherit', letterSpacing: '-0.01em' }}
            >
              Contact
            </motion.a>
            <motion.a
              href="https://github.com/ghanshyamghimiregg"
              target="_blank"
              rel="noopener noreferrer"
              animate={{ color: c.muted }}
              whileHover={{ color: c.fg }}
              transition={{ duration: 0.15 }}
              style={{ fontSize: '0.875rem', textDecoration: 'none', fontFamily: 'inherit', letterSpacing: '-0.01em' }}
            >
              GitHub
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* ── Floating dark/light toggle — bottom left ────────────── */}
      {mounted && (
        <motion.button
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="theme-toggle-btn"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            borderRadius: '100px',
            border: `1px solid ${c.border}`,
            backgroundColor: c.card,
            color: c.fg,
            cursor: 'pointer',
            padding: 0,
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          }}
          title="Toggle theme"
          aria-label="Toggle dark/light mode"
        >
          {resolvedTheme === 'dark' ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
        </motion.button>
      )}

      {/* ── Floating mode toggle pill — bottom right ────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mode-toggle-fab"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 100,
        }}
      >
        <button
          onClick={onToggle}
          aria-label={`Switch to ${mode === 'ai' ? 'music' : 'AI'} mode`}
          style={{
            position: 'relative',
            width: '92px',
            height: '44px',
            borderRadius: '100px',
            border: `1px solid ${c.border}`,
            backgroundColor: c.card,
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'inherit',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}
        >
          {/* Divider */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '8px',
              bottom: '8px',
              width: '1px',
              backgroundColor: c.border,
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
          />

          {/* Sliding active circle */}
          <motion.div
            style={{
              position: 'absolute',
              width: '38px',
              height: '38px',
              borderRadius: '100px',
              backgroundColor: c.accent,
              top: '3px',
            }}
            animate={{ left: mode === 'ai' ? '3px' : '51px' }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 500, damping: 30 }}
          />

          {/* AI icon */}
          <div
            style={{
              position: 'absolute',
              left: '3px',
              top: '3px',
              width: '38px',
              height: '38px',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: mode === 'ai' ? '#fff' : c.muted,
              zIndex: 2,
              transition: 'color 0.3s',
            }}
          >
            <Brain size={18} strokeWidth={2.5} />
          </div>

          {/* Music icon */}
          <div
            style={{
              position: 'absolute',
              right: '3px',
              top: '3px',
              width: '38px',
              height: '38px',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: mode === 'music' ? '#fff' : c.muted,
              zIndex: 2,
              transition: 'color 0.3s',
            }}
          >
            <Music size={18} strokeWidth={2.5} />
          </div>
        </button>
      </motion.div>
    </>
  )
}
