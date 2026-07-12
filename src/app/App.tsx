import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LoadingScreen } from './components/LoadingScreen'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { AIAbout } from './components/ai/AIAbout'
import { AIProjects } from './components/ai/AIProjects'
import { AIHackathons } from './components/ai/AIHackathons'
import { AISkills } from './components/ai/AISkills'
import { AIFreelance } from './components/ai/AIFreelance'
import { MusicStatement } from './components/music/MusicStatement'
import { MusicSongs } from './components/music/MusicSongs'
import { MusicBehindSongs } from './components/music/MusicBehindSongs'

import { MusicGallery } from './components/music/MusicGallery'
import { getColors } from './constants/colors'
import type { Mode } from './constants/colors'

export default function App() {
  const [mode, setMode] = useState<Mode>('ai')
  const [loading, setLoading] = useState(true)
  const c = getColors(mode)

  const handleToggle = () => setMode(m => m === 'ai' ? 'music' : 'ai')

  const switchToMusic = () => {
    setMode('music')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const switchToAI = () => {
    setMode('ai')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div
        style={{ 
          backgroundColor: c.bg, 
          transition: 'background-color 0.9s cubic-bezier(0.43, 0.13, 0.23, 0.96)',
          minHeight: '100vh', 
          fontFamily: "'Inter', system-ui, sans-serif" 
        }}
      >
      <Navigation mode={mode} onToggle={handleToggle} />
      <Hero mode={mode} onSwitchToMusic={switchToMusic} onSwitchToAI={switchToAI} />

      <AnimatePresence mode="sync">
        {mode === 'ai' ? (
          <motion.div
            key="ai"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <AIAbout />
            <AIProjects />
            <AIHackathons />
            <AISkills />
            <AIFreelance />
          </motion.div>
        ) : (
          <motion.div
            key="music"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <MusicStatement />
            <MusicSongs />
            <MusicBehindSongs />

            <MusicGallery />
          </motion.div>
        )}
      </AnimatePresence>

      <footer style={{ borderTop: `1px solid ${c.border}`, transition: 'border-color 0.9s ease' }}>
        <div className="footer-inner">
          <span style={{ color: c.muted, fontSize: '0.875rem', transition: 'color 0.9s ease' }}>
            © 2026 Ghanshyam Ghimire
          </span>
          <span style={{ color: c.muted, fontSize: '0.875rem', transition: 'color 0.9s ease' }}>
            {mode === 'ai' ? 'AI Engineer' : 'Musician'} · Nepal
          </span>
        </div>
      </footer>
      </div>
    </>
  )
}
