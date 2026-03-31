import { useInView } from '../hooks/useInView'
import { useLanguage, type Language } from '../context/LanguageContext'

interface Project {
  number: string
  title: string
  description: string
  tags: string[]
  links: { label: string; href: string }[]
  featured?: boolean
}

const PROJECTS = {
  en: [
    {
      number: '01',
      title: 'Smart Bluetooth Rover',
      description:
        'Arduino powered rover with a laser cut plywood chassis, custom steering using an MG90S servo, Bluetooth control via HC 05, and automatic ultrasonic braking. Focused on motor control, sensor integration, and embedded systems fundamentals.',
      tags: ['Arduino', 'Embedded Systems', 'Bluetooth', 'Ultrasonic Sensors'],
      links: [{ label: 'GitHub', href: 'https://github.com/MaseeWardak/smart-bluetooth-rover' }],
      featured: true,
    },
    {
      number: '02',
      title: 'ThermaRest Thermal Regulation Device',
      description:
        'Arduino R4 prototype using Peltier modules to automatically cool patients while monitoring body temperature and GSR. Includes LCD status display and relay control, designed as a safety focused concept to improve patient sleep comfort.',
      tags: ['Arduino R4', 'Peltier Modules', 'Medical Prototype', 'Sensor Systems'],
      links: [{ label: 'GitHub', href: 'https://github.com/MaseeWardak/ThermaRest-Thermal-Regulation-Device' }],
    },
  ],
  ps: [
    {
      number: '01',
      title: 'Smart Bluetooth Rover',
      description:
        'د Arduino پر بنسټ روور چې laser cut plywood chassis لري، د MG90S servo له لارې custom steering لري، د HC 05 Bluetooth کنټرول لري، او د ultrasonic sensor په مرسته اتومات braking کوي.',
      tags: ['Arduino', 'Embedded Systems', 'Bluetooth', 'Ultrasonic Sensors'],
      links: [{ label: 'GitHub', href: 'https://github.com/MaseeWardak/smart-bluetooth-rover' }],
      featured: true,
    },
    {
      number: '02',
      title: 'ThermaRest Thermal Regulation Device',
      description:
        'د Arduino R4 پروټوټایپ چې د Peltier modules په کارولو ناروغان یخوي او body temperature او GSR څاري. LCD status display او relay control لري، د ناروغ د خوب د راحت لپاره یوه امنه مفکوره.',
      tags: ['Arduino R4', 'Peltier Modules', 'Medical Prototype', 'Sensor Systems'],
      links: [{ label: 'GitHub', href: 'https://github.com/MaseeWardak/ThermaRest-Thermal-Regulation-Device' }],
    },
  ],
  fa: [
    {
      number: '01',
      title: 'Smart Bluetooth Rover',
      description:
        'روور مبتنی بر Arduino با شاسی laser cut plywood، فرمان custom با MG90S servo، کنترل Bluetooth با HC 05، و ترمز خودکار با ultrasonic sensor. تمرکز روی motor control، sensor integration، و مبانی سیستم های امبدد.',
      tags: ['Arduino', 'Embedded Systems', 'Bluetooth', 'Ultrasonic Sensors'],
      links: [{ label: 'GitHub', href: 'https://github.com/MaseeWardak/smart-bluetooth-rover' }],
      featured: true,
    },
    {
      number: '02',
      title: 'ThermaRest Thermal Regulation Device',
      description:
        'پروتوتایپ Arduino R4 که با Peltier modules دمای بیمار را کاهش می دهد و body temperature و GSR را پایش می کند. شامل LCD status display و relay control، با تمرکز روی safety در کاربرد پزشکی.',
      tags: ['Arduino R4', 'Peltier Modules', 'Medical Prototype', 'Sensor Systems'],
      links: [{ label: 'GitHub', href: 'https://github.com/MaseeWardak/ThermaRest-Thermal-Regulation-Device' }],
    },
  ],
  fr: [
    {
      number: '01',
      title: 'Smart Bluetooth Rover',
      description:
        'Rover basé sur Arduino avec châssis en plywood découpé au laser, direction personnalisée via servo MG90S, contrôle Bluetooth via HC 05 et freinage automatique par capteur ultrasonique. Projet centré sur le contrôle moteur et l intégration capteurs.',
      tags: ['Arduino', 'Embedded Systems', 'Bluetooth', 'Ultrasonic Sensors'],
      links: [{ label: 'GitHub', href: 'https://github.com/MaseeWardak/smart-bluetooth-rover' }],
      featured: true,
    },
    {
      number: '02',
      title: 'ThermaRest Thermal Regulation Device',
      description:
        'Prototype Arduino R4 utilisant des modules Peltier pour refroidir automatiquement les patients tout en surveillant la température corporelle et le GSR. Inclut un LCD status display et un relay control avec un focus sécurité.',
      tags: ['Arduino R4', 'Peltier Modules', 'Medical Prototype', 'Sensor Systems'],
      links: [{ label: 'GitHub', href: 'https://github.com/MaseeWardak/ThermaRest-Thermal-Regulation-Device' }],
    },
  ],
} satisfies Record<Language, Project[]>

const PROJECT_COPY = {
  en: { eyebrow: '3.0 Reference Designs', heading: "What I've Built", featured: 'FEATURED', allGithub: 'VIEW ALL ON GITHUB' },
  ps: { eyebrow: '۳.۰ پروژې', heading: 'ما څه جوړ کړي دي', featured: 'ځانګړې', allGithub: 'ټولې پروژې په GitHub کې وګورئ' },
  fa: { eyebrow: '۳.۰ پروژه ها', heading: 'چه ساخته ام', featured: 'ویژه', allGithub: 'همه را در GitHub ببینید' },
  fr: { eyebrow: '3.0 Réalisations', heading: 'Ce Que J Ai Construit', featured: 'VEDETTE', allGithub: 'VOIR TOUT SUR GITHUB' },
} satisfies Record<Language, { eyebrow: string; heading: string; featured: string; allGithub: string }>

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const { language } = useLanguage()
  const copy = PROJECT_COPY[language]

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
            {copy.featured}
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
  const { language } = useLanguage()
  const copy = PROJECT_COPY[language]
  const projects = PROJECTS[language]
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.05 })

  return (
    <section id="projects" ref={sectionRef} className="relative z-10">
      <div className="section-wrapper">

        {/* Heading */}
        <div className={`animate-on-scroll ${inView ? 'in-view' : ''}`}>
          <span className="heading-eyebrow">{copy.eyebrow}</span>
          <h2 className="section-heading">{copy.heading}</h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.number} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-12 text-center animate-on-scroll ${inView ? 'in-view' : ''}`}
          style={{ transitionDelay: '400ms' }}
        >
          <a
            href="https://github.com/MaseeWardak"
            target="_blank"
            rel="noreferrer"
            className="font-mono inline-flex items-center gap-2 transition-colors duration-200"
            style={{ fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--text-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            {copy.allGithub}
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
