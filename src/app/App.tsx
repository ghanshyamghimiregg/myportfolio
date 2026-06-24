import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LoadingScreen } from './components/LoadingScreen'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { AIAbout } from './components/ai/AIAbout'
import { AIProjects } from './components/ai/AIProjects'
import { AISkills } from './components/ai/AISkills'
import { AIFreelance } from './components/ai/AIFreelance'
import { MusicStatement } from './components/music/MusicStatement'
import { MusicSongs } from './components/music/MusicSongs'
import { MusicBehindSongs } from './components/music/MusicBehindSongs'
import { MusicJourney } from './components/music/MusicJourney'
import { MusicGallery } from './components/music/MusicGallery'
import { MusicUnderConstruction } from './components/music/MusicUnderConstruction'
import type { Mode } from './constants/colors'

export default function App() {
  const [mode, setMode] = useState<Mode>('ai')
  const [loading, setLoading] = useState(true)

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
      <motion.div
        animate={{ backgroundColor: mode === 'ai' ? '#F7F6F3' : '#FAF4E8' }}
        transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
        style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}
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
            <MusicUnderConstruction />
          </motion.div>
        )}
      </AnimatePresence>

      <footer style={{ borderTop: `1px solid ${mode === 'ai' ? '#D8D7D4' : '#D9CFBA'}` }}>
        <div className="footer-inner">
          <span style={{ color: mode === 'ai' ? '#6B6B6B' : '#7C6652', fontSize: '0.875rem' }}>
            © 2026 Ghanshyam Ghimire
          </span>
          <span style={{ color: mode === 'ai' ? '#6B6B6B' : '#7C6652', fontSize: '0.875rem' }}>
            {mode === 'ai' ? 'AI Engineer' : 'Musician'} · Nepal
          </span>
        </div>
      </footer>
      </motion.div>
    </>
  )
}
