import { useEffect, useReducer, useRef } from 'react'

const TYPEWRITER_STRINGS = [
  'Building things that matter.',
  'Full-stack engineer.',
  'Hackathon competitor.',
  'Problem solver at heart.',
]

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
  const stringsRef = useRef(strings)

  useEffect(() => {
    const { strIndex, charIndex, deleting, display } = state
    const current = stringsRef.current[strIndex]

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
    const t = setTimeout(() => dispatch({ type: 'NEXT_STRING', total: stringsRef.current.length }), speed)
    return () => clearTimeout(t)
  }, [state, speed, pause])

  return state.display
}

export default function Hero() {
  const typed = useTypewriter(TYPEWRITER_STRINGS)
  const heroRef = useRef<HTMLElement | null>(null)

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden z-10"
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
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-20 pb-28 text-center">

        {/* Eyebrow */}
        <div
          className="mono-label mb-5"
          style={{ color: 'var(--accent)', animation: 'fade-up 0.6s ease 0.1s both' }}
        >
          <span style={{ opacity: 0.6 }}>{'>'}</span> Portfolio — Available for Work
        </div>

        {/* Giant name */}
        <h1
          className="font-heading font-black uppercase leading-none mb-4"
          style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            letterSpacing: '0.05em',
            color: 'var(--text-primary)',
            animation: 'fade-up 0.7s ease 0.2s both',
          }}
        >
          Maseehullah
          <br />
          <span style={{ color: 'var(--accent)' }}>Wardak</span>
        </h1>

        {/* Role / University */}
        <div
          className="font-mono uppercase mb-8"
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            letterSpacing: '0.22em',
            animation: 'fade-up 0.7s ease 0.35s both',
          }}
        >
          Electrical Engineering &nbsp;·&nbsp; University of Waterloo &nbsp;·&nbsp; Class of 2030
        </div>

        {/* Typewriter */}
        <div
          className="flex items-center justify-center h-8 text-lg mb-10"
          style={{ animation: 'fade-up 0.7s ease 0.5s both' }}
        >
          <span className="typewriter-text">{typed}</span>
          <span className="cursor-blink" />
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-4"
          style={{ animation: 'fade-up 0.7s ease 0.65s both' }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-btn-primary"
          >
            View Projects
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-btn-secondary"
          >
            Get in Touch
          </button>
        </div>

        {/* Quick stats strip */}
        <div
          className="flex flex-wrap items-center justify-center gap-12 mt-16 pt-8"
          style={{ borderTop: '1px solid var(--border)', animation: 'fade-up 0.7s ease 0.8s both' }}
        >
          {[['5+', 'Projects'], ['3+', 'Hackathons'], ['1', 'Internship']].map(([val, label]) => (
            <div key={label} className="text-center">
              <div
                className="font-heading font-black leading-none"
                style={{ fontSize: '1.75rem', color: 'var(--accent)' }}
              >
                {val}
              </div>
              <div
                className="font-mono mt-1"
                style={{ fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--text-muted)' }}
              >
                {label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coordinate label — bottom right */}
      <div
        className="absolute bottom-10 right-6 font-mono opacity-50"
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.62rem',
          letterSpacing: '0.1em',
          animation: 'fade-up 0.7s ease 0.9s both',
        }}
      >
        [ 00.0000° N, 00.0000° W ]
      </div>

      {/* Scroll arrow — bottom center */}
      <div
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer opacity-40 hover:opacity-80 transition-opacity duration-200"
        style={{ animation: 'fade-up 0.7s ease 1s both' }}
      >
        <span
          className="font-mono"
          style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}
        >
          SCROLL
        </span>
        <svg
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{ animation: 'bounce-arrow 1.4s ease-in-out infinite', color: 'var(--text-muted)' }}
        >
          <path d="M9 2v14M9 16L3 10M9 16l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
