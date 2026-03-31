import { useInView } from '../hooks/useInView'

interface Project {
  number: string
  title: string
  description: string
  tags: string[]
  links: { label: string; href: string }[]
  featured?: boolean
}

const PLACEHOLDER_PROJECTS: Project[] = [
  {
    number: '01',
    title: 'Placeholder Project Alpha',
    description: 'A short, punchy description of what this project does and why it matters. Mention the core problem it solves and the tech stack you reached for. Two to three sentences.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    links: [{ label: 'GitHub', href: '#' }, { label: 'Live', href: '#' }],
    featured: true,
  },
  {
    number: '02',
    title: 'Placeholder Project Beta',
    description: 'Another project description goes here. Lead with impact — how many users, what performance gains, or what novel approach you took. Keep it scannable.',
    tags: ['Python', 'FastAPI', 'Docker', 'AWS'],
    links: [{ label: 'GitHub', href: '#' }],
  },
  {
    number: '03',
    title: 'Placeholder Project Gamma',
    description: 'Third project. Could be an open-source tool, a side experiment, or a collaborative build. What did you learn from it?',
    tags: ['Next.js', 'Tailwind', 'Supabase'],
    links: [{ label: 'GitHub', href: '#' }, { label: 'Demo', href: '#' }],
  },
  {
    number: '04',
    title: 'Placeholder Project Delta',
    description: 'Fourth project description. Consider mentioning team size, timeline, or the most interesting technical challenge you had to overcome.',
    tags: ['Go', 'gRPC', 'Redis', 'Kubernetes'],
    links: [{ label: 'GitHub', href: '#' }],
  },
  {
    number: '05',
    title: 'Placeholder Project Epsilon',
    description: 'Fifth entry. Useful for showing breadth — perhaps a lower-level systems project, a data-heavy pipeline, or a hardware integration.',
    tags: ['C++', 'Raspberry Pi', 'MQTT', 'InfluxDB'],
    links: [{ label: 'GitHub', href: '#' }],
  },
  {
    number: '06',
    title: 'Placeholder Project Zeta',
    description: 'Sixth project slot. Even a small but polished utility project demonstrates taste. What would you build just because you wanted it to exist?',
    tags: ['Rust', 'WebAssembly', 'TypeScript'],
    links: [{ label: 'GitHub', href: '#' }, { label: 'Article', href: '#' }],
  },
]

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`bp-card flex flex-col h-full animate-on-scroll ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      {/* Card top row */}
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--accent)' }}>
          {project.number}
        </span>
        {project.featured && (
          <span
            className="font-mono px-2 py-0.5"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              background: 'var(--accent)',
              color: 'var(--accent-text)',
            }}
          >
            FEATURED
          </span>
        )}
      </div>

      {/* Folder icon */}
      <svg className="mb-4" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M3 8a2 2 0 012-2h8l3 4h15a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
          stroke="var(--accent-bright)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </svg>

      {/* Title */}
      <h3 className="font-heading font-bold uppercase tracking-wide text-xl mb-3" style={{ color: 'var(--text-primary)' }}>
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--text-muted)' }}>
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-5 mt-auto">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-mono flex items-center gap-1.5 transition-colors duration-200"
            style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.05 })

  return (
    <section id="projects" ref={sectionRef} className="relative z-10">
      <div className="section-wrapper">

        {/* Heading */}
        <div className={`animate-on-scroll ${inView ? 'in-view' : ''}`}>
          <span className="heading-eyebrow">Projects</span>
          <h2 className="section-heading">What I've Built</h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_PROJECTS.map((project, i) => (
            <ProjectCard key={project.number} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-12 text-center animate-on-scroll ${inView ? 'in-view' : ''}`}
          style={{ transitionDelay: '400ms' }}
        >
          <a
            href="#"
            className="font-mono inline-flex items-center gap-2 transition-colors duration-200"
            style={{ fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--text-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            VIEW ALL ON GITHUB
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
