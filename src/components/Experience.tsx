import { useInView } from '../hooks/useInView'

interface TimelineEntry {
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
  tags: string[]
}

const EXPERIENCE_ENTRIES: TimelineEntry[] = [
  {
    role: 'Software Developer Intern & Product Manager',
    company: 'Novika',
    period: 'Current Coop',
    location: 'Startup Environment',
    bullets: [
      'Conducted 25 customer discovery interviews with designers and suppliers to validate Novika\'s core business hypothesis, translating findings directly into roadmap decisions.',
      'Owned end to end delivery of 6+ product systems including the Moodboard platform, Compare mode, and Document generation workflow, Novika\'s most technically complex feature areas.',
      'Architected and shipped the Moodboard + Compare experience from scratch: canvas interactions, Supabase persistence, real time comparison tooling, and an AI powered material assistant with conversation history.',
      'Performed a codebase security audit, evaluating vulnerability surface and delivering a prioritized remediation recommendation to the founding team.',
      'Operated across product and engineering simultaneously, defining requirements, making tradeoff calls, and shipping fast under early stage startup constraints.',
    ],
    tags: ['React', 'TypeScript', 'Supabase', 'Product Strategy', 'Security'],
  },
]

interface TimelineItemProps {
  entry: TimelineEntry
  index: number
}

function TimelineItem({ entry, index }: TimelineItemProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <div
      ref={ref}
      className={`flex gap-6 animate-on-scroll ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Node */}
      <div className="timeline-node mt-1">
        <div className="timeline-node-dot" />
        <div className="timeline-node-ring" style={{ animationDelay: `${index * 0.5}s` }} />
      </div>

      {/* Content */}
      <div
        className="flex-1 pb-12 pl-2 pr-6 py-5 mb-4 transition-shadow duration-300"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
          <div>
            <h3 className="font-heading font-bold text-2xl uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>
              {entry.role}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-bright)' }}>
                {entry.company}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>·</span>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {entry.location}
              </span>
            </div>
          </div>
          <span
            className="font-mono shrink-0 px-3 py-1"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              border: '1px solid var(--border)',
              background: 'var(--accent-bg)',
              color: 'var(--text-muted)',
            }}
          >
            {entry.period}
          </span>
        </div>

        {/* Bullets */}
        <ul className="space-y-2 mb-4">
          {entry.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <span className="mt-0.5 shrink-0 font-mono" style={{ color: 'var(--accent)' }}>›</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const [sectionRef, inView]   = useInView<HTMLElement>({ threshold: 0.05 })
  const [lineRef, lineInView]  = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="experience" ref={sectionRef} className="relative z-10">
      <div className="section-wrapper">

        {/* Heading */}
        <div className={`animate-on-scroll ${inView ? 'in-view' : ''}`}>
          <span className="heading-eyebrow">2.0 Application Circuits</span>
          <h2 className="section-heading">Where I've Worked</h2>
        </div>

        {/* Timeline */}
        <div className="relative" ref={lineRef}>
          <div className={`timeline-line ${lineInView ? 'in-view' : ''}`} />
          <div className="pl-16 space-y-0">
            {EXPERIENCE_ENTRIES.map((entry, i) => (
              <TimelineItem key={i} entry={entry} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
