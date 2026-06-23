import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
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
      animate={{ backgroundColor: scrolled ? c.bg : 'transparent', borderColor: scrolled ? c.border : 'transparent' }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottom: `1px solid ${scrolled ? c.border : 'transparent'}`,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.span
          animate={{ color: c.fg }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.01em' }}
        >
          Ghanshyam Ghimire
        </motion.span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <motion.button
            onClick={onToggle}
            animate={{ backgroundColor: mode === 'ai' ? c.accent : c.accentLight, color: mode === 'ai' ? '#fff' : c.accent }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '100px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8125rem',
              fontWeight: 500,
              fontFamily: 'inherit',
            }}
          >
            <span style={{ fontSize: '0.75rem' }}>{mode === 'ai' ? '⚙' : '♪'}</span>
            {mode === 'ai' ? 'AI Engineer' : 'Musician'}
          </motion.button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <motion.a
            href="mailto:ghanshyamghimire@example.com"
            animate={{ color: c.muted }}
            whileHover={{ color: c.fg }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: '0.875rem', textDecoration: 'none', fontFamily: 'inherit' }}
          >
            Contact
          </motion.a>
          <motion.a
            href="https://github.com"
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
