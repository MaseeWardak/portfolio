import { useCallback, useEffect, useId, useReducer, useRef, useState } from 'react'
import { useLanguage, type Language } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const HERO_COPY = {
  en: {
    typewriter: [
      'Embedded systems designer.',
      'Full stack and firmware.',
      'Circuits to cloud, and back.',
      'UW Electrical Engineering.',
    ],
    eyebrow: 'Embedded + Full stack Engineer',
    intro: 'I design reliable systems that connect low level hardware thinking with polished software execution. Focused on impactful coop opportunities for Fall 2026.',
    ctaProjects: 'View Projects',
    ctaContact: 'Contact Me',
    glanceTitle: 'At a Glance',
    facts: [
      ['Discipline', 'Electrical Engineering'],
      ['Institution', 'University of Waterloo'],
      ['Availability', 'Fall 2026 Coop'],
    ],
    scroll: 'SCROLL',
  },
  ps: {
    typewriter: [
      'د امبیډډ سیسټمونو ډیزاینر.',
      'فول سټیک او فرموییر.',
      'له سرکټه تر کلاوډه.',
      'د واټرلو برېښنايي انجنیري.',
    ],
    eyebrow: 'امبیډډ + فول سټیک انجنیر',
    intro: 'زه داسې باوري سیسټمونه جوړوم چې د ټیټې کچې هارډویر فکر د لوړ کیفیت سافټویر له پلي کېدو سره یوځای کوي. د ۲۰۲۶ د مني د کوپ اغېزمنو فرصتونو ته چمتو یم.',
    ctaProjects: 'پروژې وګورئ',
    ctaContact: 'اړیکه ونیسئ',
    glanceTitle: 'لنډ معلومات',
    facts: [
      ['رشته', 'برېښنايي انجنیري'],
      ['پوهنتون', 'واټرلو پوهنتون'],
      ['لاسرسی', 'د ۲۰۲۶ د مني کوپ'],
    ],
    scroll: 'کښته لاړ شئ',
  },
  fa: {
    typewriter: [
      'طراح سیستم های امبدد.',
      'فول استک و فرمور.',
      'از مدار تا کلاود.',
      'مهندسی برق واترلو.',
    ],
    eyebrow: 'امبدد + فول استک انجنیر',
    intro: 'من سیستم های قابل اعتماد می سازم که تفکر سخت افزار سطح پایین را با اجرای نرم افزار باکیفیت وصل می کند. آماده فرصت های کوپ پاییز ۲۰۲۶ هستم.',
    ctaProjects: 'دیدن پروژه ها',
    ctaContact: 'تماس با من',
    glanceTitle: 'نگاه سریع',
    facts: [
      ['رشته', 'مهندسی برق'],
      ['دانشگاه', 'دانشگاه واترلو'],
      ['زمان همکاری', 'کوپ پاییز ۲۰۲۶'],
    ],
    scroll: 'پایین بروید',
  },
  fr: {
    typewriter: [
      'Concepteur de systèmes embarqués.',
      'Full stack et firmware.',
      'Du circuit au cloud.',
      'Génie électrique à Waterloo.',
    ],
    eyebrow: 'Ingénieur embarqué + full stack',
    intro: 'Je conçois des systèmes fiables qui relient la pensée matérielle bas niveau à une exécution logicielle soignée. Ouvert aux stages coop pour l\'automne 2026.',
    ctaProjects: 'Voir les projets',
    ctaContact: 'Me contacter',
    glanceTitle: 'Aperçu rapide',
    facts: [
      ['Discipline', 'Génie électrique'],
      ['Université', 'University of Waterloo'],
      ['Disponibilité', 'Coop automne 2026'],
    ],
    scroll: 'DÉFILER',
  },
} satisfies Record<Language, {
  typewriter: string[]
  eyebrow: string
  intro: string
  ctaProjects: string
  ctaContact: string
  glanceTitle: string
  facts: [string, string][]
  scroll: string
}>

interface TWState {
  display: string
  strIndex: number
  charIndex: number
  deleting: boolean
}

type TWAction =
  | { type: 'TYPE'; char: string }
  | { type: 'DELETE' }
  | { type: 'START_DELETE' }
  | { type: 'NEXT_STRING'; total: number }

function twReducer(state: TWState, action: TWAction): TWState {
  switch (action.type) {
    case 'TYPE':
      return { ...state, display: state.display + action.char, charIndex: state.charIndex + 1 }
    case 'DELETE':
      return { ...state, display: state.display.slice(0, -1), charIndex: state.charIndex - 1 }
    case 'START_DELETE':
      return { ...state, deleting: true }
    case 'NEXT_STRING':
      return { display: '', strIndex: (state.strIndex + 1) % action.total, charIndex: 0, deleting: false }
    default:
      return state
  }
}

function useTypewriter(strings: string[], speed = 60, pause = 1800) {
  const [state, dispatch] = useReducer(twReducer, {
    display: '', strIndex: 0, charIndex: 0, deleting: false,
  })

  useEffect(() => {
    const { strIndex, charIndex, deleting, display } = state
    const current = strings[strIndex] ?? ''

    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => dispatch({ type: 'TYPE', char: current[charIndex] }), speed)
      return () => clearTimeout(t)
    }
    if (!deleting && charIndex >= current.length) {
      const t = setTimeout(() => dispatch({ type: 'START_DELETE' }), pause)
      return () => clearTimeout(t)
    }
    if (deleting && display.length > 0) {
      const t = setTimeout(() => dispatch({ type: 'DELETE' }), speed / 2)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => dispatch({ type: 'NEXT_STRING', total: strings.length }), speed)
    return () => clearTimeout(t)
  }, [state, strings, speed, pause])

  return state.display
}

const HERO_SONIC_STATIC = ['/characters/sonic.svg', '/characters/sonic.png'] as const

/** GIF → MP4 → static; above first “A” in light mode only (caller gates). */
function HeroEmbeddedSonic() {
  type Stage = 'gif' | 'mp4' | 'static'
  const [stage, setStage] = useState<Stage>('gif')
  const [staticIdx, setStaticIdx] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const tryPlay = useCallback(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  useEffect(() => {
    if (stage === 'mp4') tryPlay()
  }, [stage, tryPlay])

  if (stage === 'gif') {
    return (
      <img
        key="hero-sonic-gif"
        src="/characters/sonic.gif"
        alt=""
        aria-hidden="true"
        draggable={false}
        loading="eager"
        decoding="async"
        className="hero-first-a-sonic pointer-events-none nav-logo-sprite"
        onError={() => setStage('mp4')}
      />
    )
  }

  if (stage === 'mp4') {
    return (
      <video
        ref={videoRef}
        key="hero-sonic-mp4"
        className="hero-first-a-sonic pointer-events-none nav-logo-sprite"
        src="/characters/sonic.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onError={() => setStage('static')}
        onLoadedData={tryPlay}
      />
    )
  }

  const src = HERO_SONIC_STATIC[staticIdx] ?? HERO_SONIC_STATIC[HERO_SONIC_STATIC.length - 1]

  return (
    <img
      key={`hero-sonic-static-${staticIdx}`}
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      loading="eager"
      decoding="async"
      className="hero-first-a-sonic pointer-events-none nav-logo-sprite"
      onError={() => {
        setStaticIdx((i) => (i + 1 < HERO_SONIC_STATIC.length ? i + 1 : i))
      }}
    />
  )
}

function HeroBoltMark() {
  const gradId = `hero-bolt-grad-${useId().replace(/:/g, '')}`
  return (
    <span className="hero-bolt" aria-hidden="true">
      <svg className="hero-bolt-svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <defs>
          <linearGradient id={gradId} x1="16" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffe870" />
            <stop offset="45%" stopColor="#ffcc00" />
            <stop offset="100%" stopColor="#f0a400" />
          </linearGradient>
        </defs>
        <path
          d="M36.5 6L18.5 33h13l-5 25 19-30H33.5l3-22z"
          fill={`url(#${gradId})`}
          stroke="#fff5b3"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M36.5 6L18.5 33h13l-5 25 19-30H33.5l3-22z"
          stroke="var(--accent)"
          strokeWidth="2.6"
          strokeOpacity="0.3"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export default function Hero() {
  const { language } = useLanguage()
  const { theme } = useTheme()
  const copy = HERO_COPY[language]
  const typed = useTypewriter(copy.typewriter)
  const heroRef = useRef<HTMLElement | null>(null)

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[60vh] md:min-h-[66vh] flex flex-col items-center justify-start overflow-hidden z-10"
      style={{ paddingTop: '3.75rem' }}
    >
      {/* ── Abstract blob — top right ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{
          top: '8%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '62% 38% 46% 54% / 60% 44% 56% 40%',
          background: 'var(--accent)',
          opacity: 0.055,
          filter: 'blur(60px)',
          animation: 'blob-float 14s ease-in-out infinite',
        }}
      />

      {/* ── Abstract blob — bottom left ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{
          bottom: '12%',
          left: '-8%',
          width: '380px',
          height: '380px',
          borderRadius: '44% 56% 66% 34% / 56% 44% 56% 44%',
          background: 'var(--accent-bright)',
          opacity: 0.04,
          filter: 'blur(50px)',
          animation: 'blob-float 18s ease-in-out infinite reverse',
        }}
      />

      {/* ── Decorative crosshair ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ top: '18%', right: '7%', opacity: 0.1 }}
      >
        <svg
          width="180" height="180" viewBox="0 0 180 180" fill="none"
          style={{ animation: 'crosshair-spin 40s linear infinite' }}
        >
          <circle cx="90" cy="90" r="72" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="4 8" />
          <circle cx="90" cy="90" r="48" stroke="var(--accent)" strokeWidth="0.5" />
          <circle cx="90" cy="90" r="5" fill="var(--accent)" />
          <line x1="0" y1="90" x2="180" y2="90" stroke="var(--accent)" strokeWidth="0.5" />
          <line x1="90" y1="0" x2="90" y2="180" stroke="var(--accent)" strokeWidth="0.5" />
          <rect x="86" y="86" width="8" height="8" stroke="var(--accent)" strokeWidth="0.8" fill="none" transform="rotate(45 90 90)" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-4 pb-4 md:pt-6 md:pb-6">
        <div className="hero-panel">
          <div>
            <div
              className="mono-label mb-5"
              style={{ color: 'var(--accent)', animation: 'fade-up 0.6s ease 0.1s both' }}
            >
              <span style={{ opacity: 0.6 }}>{'>'}</span> {copy.eyebrow}
            </div>

            <h1
              className="font-heading font-black uppercase leading-none mb-6"
              style={{
                fontSize: 'clamp(2.8rem, 8.5vw, 6.8rem)',
                letterSpacing: '0.04em',
                color: 'var(--text-primary)',
                animation: 'fade-up 0.7s ease 0.2s both',
              }}
            >
              <span className="hero-name-line" dir="ltr">
                <span>M</span>
                <span className="hero-first-a-char">
                  <span className="hero-first-a-letter">a</span>
                  {theme === 'light' && <HeroEmbeddedSonic />}
                </span>
                <span>s</span>
                <span>eehulla</span>
                <span className="hero-last-h-char">
                  <span className="hero-last-h-letter">h</span>
                  {theme === 'dark' && (
                    <img
                      src="/characters/tails.gif"
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      loading="eager"
                      decoding="async"
                      className="hero-last-h-tails nav-logo-sprite--opaque"
                    />
                  )}
                </span>
              </span>
              <br />
              <span style={{ color: 'var(--accent)' }}>Wardak</span>
            </h1>

            <p
              className="max-w-xl mb-7"
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.02rem',
                lineHeight: 1.8,
                animation: 'fade-up 0.7s ease 0.35s both',
              }}
            >
              {copy.intro}
            </p>

            <div
              className="flex items-center h-8 text-lg mb-9"
              style={{ animation: 'fade-up 0.7s ease 0.5s both' }}
            >
              <span className="typewriter-text">{typed}</span>
              <span className="cursor-blink" />
            </div>

            <div
              className="flex flex-wrap items-center gap-4"
              style={{ animation: 'fade-up 0.7s ease 0.65s both' }}
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-btn-primary"
              >
                {copy.ctaProjects}
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-btn-secondary"
              >
                {copy.ctaContact}
              </button>
            </div>
          </div>

          <aside
            className="hero-facts"
            style={{ animation: 'fade-up 0.7s ease 0.45s both' }}
          >
            <p className="hero-facts-title">{copy.glanceTitle}</p>
            {copy.facts.map(([label, value], i) => (
              <div key={label} className="hero-fact-row">
                <span>{label}</span>
                {i === 0 ? (
                  <span className="hero-fact-value-with-bolt">
                    <span>{value}</span>
                    <HeroBoltMark />
                  </span>
                ) : (
                  <span>{value}</span>
                )}
              </div>
            ))}
          </aside>
        </div>
      </div>

      {/* Scroll arrow — bottom center */}
      <div className="w-full flex justify-center pb-4">
        <div
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 cursor-pointer opacity-40 hover:opacity-80 transition-opacity duration-200"
          style={{ animation: 'fade-up 0.7s ease 1s both' }}
        >
          <span
            className="font-mono"
            style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}
          >
            {copy.scroll}
          </span>
          <svg
            width="18" height="18" viewBox="0 0 18 18" fill="none"
            style={{ animation: 'bounce-arrow 1.4s ease-in-out infinite', color: 'var(--text-muted)' }}
          >
            <path d="M9 2v14M9 16L3 10M9 16l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}
