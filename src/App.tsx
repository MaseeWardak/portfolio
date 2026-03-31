import './index.css'
import { useTheme, ThemeProvider } from './context/ThemeContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Hackathons from './components/Hackathons'
import Contact from './components/Contact'

function AppContent() {
  const { theme } = useTheme()

  return (
    <div
      data-theme={theme}
      className="relative min-h-screen"
      style={{ background: 'var(--bg)', transition: 'background-color 0.35s ease' }}
    >
      {/* ── Fixed grid background ── */}
      <div className="grid-background" aria-hidden="true">
        <div className="grid-lines" />
        <div className="grid-vignette" />
      </div>

      {/* ── Navigation ── */}
      <Nav />

      {/* ── Main content ── */}
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Hackathons />
        <div className="section-divider" />
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
