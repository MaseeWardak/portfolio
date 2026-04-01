import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage, type Language } from '../context/LanguageContext'

const NAV_LINKS = {
  en: [
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'HACKATHONS', href: '#hackathons' },
    { label: 'CONTACT', href: '#contact' },
  ],
  ps: [
    { label: 'زما په اړه', href: '#about' },
    { label: 'تجربه', href: '#experience' },
    { label: 'پروژې', href: '#projects' },
    { label: 'هیکاتونونه', href: '#hackathons' },
    { label: 'اړیکه', href: '#contact' },
  ],
  fa: [
    { label: 'درباره من', href: '#about' },
    { label: 'تجربه', href: '#experience' },
    { label: 'پروژه ها', href: '#projects' },
    { label: 'هکاتون ها', href: '#hackathons' },
    { label: 'تماس', href: '#contact' },
  ],
  fr: [
    { label: 'À PROPOS', href: '#about' },
    { label: 'EXPÉRIENCE', href: '#experience' },
    { label: 'PROJETS', href: '#projects' },
    { label: 'HACKATHONS', href: '#hackathons' },
    { label: 'CONTACT', href: '#contact' },
  ],
} satisfies Record<Language, { label: string; href: string }[]>

const SECTION_IDS = NAV_LINKS.en.map((l) => l.href.slice(1))

const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'ps', label: 'پښتو' },
  { value: 'fa', label: 'فارسی' },
  { value: 'fr', label: 'Français' },
]

const UI_COPY = {
  en: { dark: 'DARK MODE', light: 'LIGHT MODE', selectLang: 'Select language' },
  ps: { dark: 'توره بڼه', light: 'روښانه بڼه', selectLang: 'ژبه وټاکئ' },
  fa: { dark: 'حالت تیره', light: 'حالت روشن', selectLang: 'انتخاب زبان' },
  fr: { dark: 'MODE SOMBRE', light: 'MODE CLAIR', selectLang: 'Choisir la langue' },
} satisfies Record<Language, { dark: string; light: string; selectLang: string }>

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export default function Nav() {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [activeSection, setActiveSection] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const observersRef = useRef<IntersectionObserver[]>([])
  const links = NAV_LINKS[language]
  const ui = UI_COPY[language]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    observersRef.current.forEach((o) => o.disconnect())
    observersRef.current = []

    const sectionEls = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    sectionEls.forEach((el) => observer.observe(el))
    observersRef.current.push(observer)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">

          {/* Scroll to top (Sonic easter egg lives on hero “S”) */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="shrink-0 inline-flex items-center justify-center p-1 rounded-md transition-opacity duration-200 hover:opacity-85"
          >
            <span className="block h-6 w-6 shrink-0" aria-hidden />
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <label className="hidden md:block">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                aria-label={ui.selectLang}
                className="font-mono text-xs px-2 py-1 outline-none"
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-muted)',
                }}
              >
                {LANGUAGE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            {/* Theme toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch theme to dark mode' : 'Switch theme to light mode'}
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span
                className="block h-0.5 transition-all duration-300 origin-center"
                style={{
                  width: '22px',
                  background: 'var(--text-primary)',
                  transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block h-0.5 transition-all duration-300"
                style={{
                  width: '22px',
                  background: 'var(--text-primary)',
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? 'scaleX(0)' : 'scaleX(1)',
                }}
              />
              <span
                className="block h-0.5 transition-all duration-300 origin-center"
                style={{
                  width: menuOpen ? '22px' : '16px',
                  background: 'var(--text-primary)',
                  transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
        style={{
          background: 'var(--bg)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        <ul className="flex flex-col items-center gap-10">
          {links.map((link, i) => (
            <li
              key={link.href}
              style={{
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.35s ease ${i * 55}ms, opacity 0.35s ease ${i * 55}ms`,
              }}
            >
              <button
                onClick={() => handleNavClick(link.href)}
                className="font-heading font-black text-4xl uppercase tracking-widest transition-colors duration-200"
                style={{
                  color: activeSection === link.href.slice(1) ? 'var(--accent)' : 'var(--text-primary)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = activeSection === link.href.slice(1)
                    ? 'var(--accent)' : 'var(--text-primary)'
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-6">
          <label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              aria-label={ui.selectLang}
              className="font-mono text-sm px-3 py-2 outline-none"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                color: 'var(--text-muted)',
              }}
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          {/* Theme toggle inside mobile menu */}
          <button
            className="theme-toggle flex items-center gap-2"
            onClick={toggleTheme}
            style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            <span>{theme === 'light' ? ui.dark : ui.light}</span>
          </button>
        </div>
      </div>
    </>
  )
}
