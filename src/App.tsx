import './index.css'
import { useState } from 'react'
import { useTheme, ThemeProvider } from './context/ThemeContext'
import BootSequence from './components/BootSequence'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Hackathons from './components/Hackathons'
import Contact from './components/Contact'

function AppContent() {
  const { theme } = useTheme()

  // Check sessionStorage synchronously so the boot screen is never shown on revisit
  const [bootDone, setBootDone] = useState(() => {
    try { return !!sessionStorage.getItem('wardak-booted') } catch { return false }
  })

  return (
    <div
      data-theme={theme}
      className="relative min-h-screen"
      style={{ background: 'var(--bg)', transition: 'background-color 0.35s ease' }}
    >
      {/* ── Boot sequence (first visit only) ── */}
      {!bootDone && <BootSequence onComplete={() => setBootDone(true)} />}

      {/* ── Fixed grid background ── */}
      <div className="grid-background" aria-hidden="true">
        <div className="grid-lines" />
        <div className="grid-vignette" />
      </div>

      {/* ── Navigation ── */}
      <Nav />

      {/* ── Main content ── */}
      <main className="premium-main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Hackathons />
        <Contact />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
