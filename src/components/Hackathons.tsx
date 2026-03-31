import { useInView } from '../hooks/useInView'

interface Hackathon {
  number: string
  name: string
  event: string
  date: string
  description: string
  outcome: string
  tags: string[]
  link?: string
  linkLabel?: string
}

const HACKATHONS: Hackathon[] = [
  {
    number: '01',
    name: 'teddytalk with Arduino UNO Q',
    event: 'MakeUofT 2026',
    date: '2026',
    description:
      'Built an emotion aware AI companion fully standalone on Arduino UNO Q: camera capture, on device FER+ emotion inference, Gemini poem generation, and ElevenLabs speech output in one real time pipeline. The technical edge was mastering UNO Q\'s split architecture under hackathon pressure, using the Dragonwing MPU for inference and API orchestration and the STM32 MCU for responsive hardware I O through a custom Python RPC bridge.',
    outcome: '2x Award Winner, Best Use of Arduino UNO Q (1st Place) plus Best Use of ElevenLabs API',
    tags: ['Arduino UNO Q', 'Edge AI', 'FER+ ONNX', 'Gemini API', 'ElevenLabs'],
  },
  {
    number: '02',
    name: 'UnClutter',
    event: 'Macathon 2026',
    date: '2026',
    description:
      'Built under intense weekend pressure, UnClutter turns Gmail into workflow style cards instead of endless inbox rows. Integrated Google OAuth plus Gmail sync, Gemini powered summaries and reply assistance, and natural language sorting rules backed by Supabase while preserving core email workflows on real user data.',
    outcome: 'MLH Award Winner, Best Use of Gemini API and Google Cloud',
    tags: ['React + Vite', 'Node.js + Express', 'Gmail API', 'Supabase', 'Gemini API'],
    link: 'https://devpost.com/software/unclutter-ljtwq4?ref_content=my-projects-tab&ref_feature=my_projects',
    linkLabel: 'VIEW DEMO',
  },
  {
    number: '03',
    name: 'Shafaf Global Humanitarian Aid Platform',
    event: 'UmmaHacks',
    date: '2026',
    description:
      'Built an aid transparency platform that maps humanitarian coverage and highlights underserved regions. ' +
      'Included role based dashboard concepts for donors and organizations, with data driven planning for better aid distribution.',
    outcome: 'First hackathon attended, participation',
    tags: ['React', 'Maps', 'Data Visualization', 'Full stack'],
    link: 'https://github.com/Awais-H/Shafaf-Aid',
    linkLabel: 'VIEW ON GITHUB',
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

      {/* Outcome badge */}
      <div
        className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 self-start"
        style={{
          border: '1px solid var(--border)',
          background: 'var(--accent-bg)',
        }}
      >
        <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>★</span>
        <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--accent)' }}>
          {hackathon.outcome}
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

      {hackathon.link && (
        <a
          href={hackathon.link}
          target="_blank"
          rel="noreferrer"
          className="font-mono mt-5 inline-flex items-center gap-1.5 transition-colors duration-200"
          style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
        >
          {hackathon.linkLabel ?? 'VIEW PROJECT'}
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </a>
      )}
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
          <span className="heading-eyebrow">4.0 Prototype Builds</span>
          <h2 className="section-heading">Competing to Build</h2>
        </div>

        {/* Intro */}
        <p
          className={`max-w-2xl mb-12 animate-on-scroll ${inView ? 'in-view' : ''}`}
          style={{ color: 'var(--text-muted)', transitionDelay: '100ms' }}
        >
          Hackathon builds where I collaborate under pressure and ship complete, demo ready systems. My strongest project is teddytalk at MakeUofT 2026: a fully standalone edge AI build on UNO Q that won two awards.
        </p>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HACKATHONS.map((h, i) => (
            <HackathonCard key={h.number} hackathon={h} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
