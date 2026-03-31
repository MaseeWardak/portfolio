import { useInView } from '../hooks/useInView'

interface TimelineEntry {
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
  tags: string[]
}

const PLACEHOLDER_ENTRIES: TimelineEntry[] = [
  {
    role: 'Placeholder Role Title',
    company: 'Company Name Inc.',
    period: 'Month 20XX — Month 20XX',
    location: 'City, Country',
    bullets: [
      'Placeholder bullet one — describe a meaningful impact you made here. Use numbers and outcomes.',
      'Placeholder bullet two — another accomplishment, technical contribution, or leadership moment.',
      'Placeholder bullet three — mention scale, tools, or collaboration if relevant.',
    ],
    tags: ['React', 'TypeScript', 'Node.js'],
  },
  {
    role: 'Another Placeholder Role',
    company: 'Startup or Lab Name',
    period: 'Month 20XX — Month 20XX',
    location: 'Remote',
    bullets: [
      'Placeholder bullet one — frame the scope of the project you owned.',
      'Placeholder bullet two — highlight a technical decision you made and why.',
    ],
    tags: ['Python', 'PostgreSQL', 'Docker'],
  },
  {
    role: 'Earlier Role or Internship',
    company: 'Organization Name',
    period: 'Month 20XX — Month 20XX',
    location: 'City, Country',
    bullets: [
      'Placeholder bullet one — even early roles can showcase initiative or learning.',
      'Placeholder bullet two — mention mentorship, tools, or team size.',
    ],
    tags: ['JavaScript', 'AWS', 'REST APIs'],
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
          <span className="heading-eyebrow">Experience</span>
          <h2 className="section-heading">Where I've Worked</h2>
        </div>

        {/* Timeline */}
        <div className="relative" ref={lineRef}>
          <div className={`timeline-line ${lineInView ? 'in-view' : ''}`} />
          <div className="pl-16 space-y-0">
            {PLACEHOLDER_ENTRIES.map((entry, i) => (
              <TimelineItem key={i} entry={entry} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
