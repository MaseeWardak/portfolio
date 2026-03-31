import { useInView } from '../hooks/useInView'

interface Hackathon {
  number: string
  name: string
  event: string
  date: string
  description: string
  award: string
  tags: string[]
}

const PLACEHOLDER_HACKATHONS: Hackathon[] = [
  {
    number: '01',
    name: 'Placeholder Project Name',
    event: 'Hackathon Event Name 20XX',
    date: 'Month 20XX',
    description: 'Brief description of what you built and the problem you were solving. Mention your team size and what role you played. Two sentences.',
    award: '1st Place — Track Name',
    tags: ['React', 'Python', 'OpenAI API'],
  },
  {
    number: '02',
    name: 'Another Build Name',
    event: 'University Hackathon 20XX',
    date: 'Month 20XX',
    description: 'Another hackathon project description. What was the theme or constraint? What did you ship in 24–48 hours? What would you improve?',
    award: '2nd Place — Overall',
    tags: ['Node.js', 'WebSockets', 'MongoDB'],
  },
  {
    number: '03',
    name: 'Third Hackathon Build',
    event: 'Corporate Sponsor Hackathon',
    date: 'Month 20XX',
    description: 'Third hackathon entry description. Even honorable mentions or strong submissions worth highlighting should go here. Judges noticed this.',
    award: 'Best Technical Implementation',
    tags: ['Rust', 'Embedded', 'IoT'],
  },
  {
    number: '04',
    name: 'Fourth Hackathon Entry',
    event: 'National / Regional Competition',
    date: 'Month 20XX',
    description: 'Fourth hackathon entry. Could be an ongoing challenge, a remote hackathon, or a sponsored category win. Include the outcome even if not a podium finish.',
    award: 'Finalist — 500+ teams',
    tags: ['ML', 'FastAPI', 'AWS Lambda'],
  },
]

interface HackathonCardProps {
  hackathon: Hackathon
  index: number
}

function HackathonCard({ hackathon, index }: HackathonCardProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`bp-card flex flex-col h-full animate-on-scroll ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${(index % 2) * 120}ms` }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--accent)' }}>
          {hackathon.number}
        </span>
        <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
          {hackathon.date}
        </span>
      </div>

      {/* Trophy icon */}
      <div className="mb-4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M10 4h12v10a6 6 0 01-12 0V4z" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M4 6h6v4a3 3 0 01-6 0V6zM22 6h6v4a3 3 0 01-6 0V6z" stroke="var(--accent-bright)" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M16 20v6M10 28h12" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        </svg>
      </div>

      {/* Project name */}
      <h3 className="font-heading font-bold uppercase tracking-wide text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
        {hackathon.name}
      </h3>

      {/* Event */}
      <div className="mb-3">
        <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--accent-bright)' }}>
          {hackathon.event}
        </span>
      </div>

      {/* Award badge */}
      <div
        className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 self-start"
        style={{
          border: '1px solid var(--border)',
          background: 'var(--accent-bg)',
        }}
      >
        <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>★</span>
        <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--accent)' }}>
          {hackathon.award}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--text-muted)' }}>
        {hackathon.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {hackathon.tags.map((tag) => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default function Hackathons() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.05 })

  return (
    <section id="hackathons" ref={sectionRef} className="relative z-10">
      <div className="section-wrapper">

        {/* Heading */}
        <div className={`animate-on-scroll ${inView ? 'in-view' : ''}`}>
          <span className="heading-eyebrow">Hackathons</span>
          <h2 className="section-heading">Competing to Build</h2>
        </div>

        {/* Intro */}
        <p
          className={`max-w-2xl mb-12 animate-on-scroll ${inView ? 'in-view' : ''}`}
          style={{ color: 'var(--text-muted)', transitionDelay: '100ms' }}
        >
          Placeholder intro — a sentence or two about your competitive mindset and what drives you to enter hackathons. Mention total events, wins, or a personal philosophy.
        </p>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PLACEHOLDER_HACKATHONS.map((h, i) => (
            <HackathonCard key={h.number} hackathon={h} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
