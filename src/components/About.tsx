import { useInView } from '../hooks/useInView'

const STATS = [
  { value: '00+', label: 'Projects Built' },
  { value: '00+', label: 'Hackathons' },
  { value: '0.0', label: 'GPA' },
  { value: '00+', label: 'Contributions' },
]

const SKILLS = [
  'TypeScript', 'React', 'Node.js', 'Python',
  'PostgreSQL', 'Docker', 'AWS', 'Figma',
]

export default function About() {
  const [sectionRef, inView]   = useInView<HTMLElement>({ threshold: 0.1 })
  const [statsRef, statsInView] = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section id="about" ref={sectionRef} className="relative z-10">
      <div className="section-wrapper">

        {/* Heading */}
        <div className={`animate-on-scroll ${inView ? 'in-view' : ''}`}>
          <span className="heading-eyebrow">About</span>
          <h2 className="section-heading">Who I Am</h2>
        </div>

        {/* Two-column layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 stagger-children ${inView ? 'in-view' : ''}`}>

          {/* Bio — left column */}
          <div className="lg:col-span-3 space-y-5">
            <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              Placeholder bio paragraph one. This is where a compelling introduction goes — a sentence or two about who you are, what drives you, and what makes you different from the crowd. Keep it sharp and personal.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Placeholder paragraph two. Expand on your background — your academic focus, the kinds of problems you love solving, and any notable context about your journey. Two to three sentences max.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Placeholder paragraph three. A closing thought — what you're currently building, learning, or looking for. Leave room to mention interests outside of engineering if relevant.
            </p>

            {/* Skills */}
            <div className="pt-4">
              <p
                className="mono-label mb-4"
                style={{ color: 'var(--accent)', letterSpacing: '0.2em' }}
              >
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span key={skill} className="tag-pill cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Photo placeholder — right column */}
          <div className="lg:col-span-2">
            <div
              className="relative w-full aspect-[4/5] max-w-xs mx-auto lg:mx-0 transition-shadow duration-300"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* Accent corner accent */}
              <div
                className="absolute top-0 left-0 w-12 h-12"
                style={{
                  background: 'var(--accent)',
                  opacity: 0.12,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="18" r="8" stroke="var(--border)" strokeWidth="1.5" />
                  <path d="M6 40c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="var(--border)" strokeWidth="1.5" />
                </svg>
                <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.2em', opacity: 0.6 }}>
                  PHOTO.JPG
                </span>
              </div>

              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: 'var(--accent)', opacity: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 stagger-children ${statsInView ? 'in-view' : ''}`}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center py-7 px-4 transition-all duration-300"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="font-heading font-black text-4xl mb-1" style={{ color: 'var(--accent)' }}>
                {stat.value}
              </div>
              <div className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
