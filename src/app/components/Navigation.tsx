import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Brain, Music } from 'lucide-react'
import { getColors } from '../constants/colors'
import type { Mode } from '../constants/colors'

interface Props {
  mode: Mode
  onToggle: () => void
}

export function Navigation({ mode, onToggle }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const c = getColors(mode)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
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
          style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.01em' }}
        >
          Ghanshyam Ghimire
        </motion.span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onToggle}
            style={{
              position: 'relative',
              width: '92px',
              height: '44px',
              borderRadius: '100px',
              border: `1px solid ${c.border}`,
              backgroundColor: c.card,
              cursor: 'pointer',
              padding: 0,
              fontSize: '0.8125rem',
              fontWeight: 500,
              fontFamily: 'inherit',
              overflow: 'hidden',
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

            {/* Active circle */}
            <motion.div
              style={{
                position: 'absolute',
                width: '38px',
                height: '38px',
                borderRadius: '100px',
                backgroundColor: c.accent,
                top: '3px',
              }}
              animate={{
                left: mode === 'ai' ? '3px' : '51px',
              }}
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
              }}
            >
              <Music size={18} strokeWidth={2.5} />
            </div>
          </button>
        </div>

        <div className="nav-links">
          <motion.a
            href="mailto:ghanshyamghimire@example.com"
            animate={{ color: c.muted }}
            whileHover={{ color: c.fg }}
            transition={{ duration: 0.2 }}
            className="nav-link-contact"
            style={{ fontSize: '0.875rem', textDecoration: 'none', fontFamily: 'inherit' }}
          >
            Contact
          </motion.a>
          <motion.a
            href="https://github.com/ghanshyamghimiregg"
            target="_blank"
            rel="noopener noreferrer"
            animate={{ color: c.muted }}
            whileHover={{ color: c.fg }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: '0.875rem', textDecoration: 'none', fontFamily: 'inherit' }}
          >
            GitHub
          </motion.a>
        </div>
      </div>
    </motion.nav>
  )
}
