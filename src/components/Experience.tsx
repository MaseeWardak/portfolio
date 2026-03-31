import { useInView } from '../hooks/useInView'
import { useLanguage, type Language } from '../context/LanguageContext'

interface TimelineEntry {
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
  tags: string[]
}

const EXPERIENCE_ENTRIES = {
  en: [
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
  ],
  ps: [
    {
      role: 'سافټویر ډیویلپر انټرن او پروډکټ منیجر',
      company: 'Novika',
      period: 'اوسنی Coop',
      location: 'سټارټ اپ چاپیریال',
      bullets: [
        'له ډیزاینرانو او عرضه کوونکو سره مې 25 د مشتری موندنې مرکې وکړې څو د Novika اصلي سوداګریزه مفکوره تایید شي او پایلې مستقیم د روډمېپ پرېکړو ته واوړي.',
        'له پیل تر پای مې د 6+ کلیدي سیسټمونو مالکیت درلود؛ Moodboard platform، Compare mode، او Document generation workflow پکې شامل دي.',
        'Moodboard + Compare مې له صفره طرحه او تطبیق کړل؛ د canvas تعاملات، Supabase persistence، real time comparison tooling، او AI material assistant د conversation history سره.',
        'د کوډبیس امنیتي ارزونه مې ترسره کړه، د خطر ساحې مې روښانه کړې، او بنسټ ایښودونکي ټیم ته مې د اصلاح لومړیتوب لرونکې سپارښتنې وسپارلې.',
        'په یو وخت کې مې د محصول او انجینرۍ دواړه رولونه مخته یووړل؛ اړتیاوې مې تعریف کړې، tradeoff پرېکړې مې وکړې، او په چټک ډول مې پایلې ورسولې.',
      ],
      tags: ['React', 'TypeScript', 'Supabase', 'Product Strategy', 'Security'],
    },
  ],
  fa: [
    {
      role: 'کارآموز توسعه نرم افزار و مدیر محصول',
      company: 'Novika',
      period: 'کوپ فعلی',
      location: 'محیط استارتاپی',
      bullets: [
        '۲۵ مصاحبه کشف مشتری با طراحان و تامین کننده ها انجام دادم تا فرضیه اصلی کسب و کار Novika را اعتبارسنجی کنم و یافته ها را مستقیم به تصمیم های roadmap وصل کنم.',
        'مالکیت کامل تحویل ۶+ سیستم کلیدی محصول را بر عهده داشتم، از جمله Moodboard platform، Compare mode، و Document generation workflow.',
        'تجربه Moodboard + Compare را از صفر معماری و پیاده سازی کردم، شامل تعاملات canvas، Supabase persistence، real time comparison tooling، و AI material assistant با conversation history.',
        'ممیزی امنیتی کدبیس را انجام دادم، سطح آسیب پذیری را ارزیابی کردم، و پیشنهادهای اولویت بندی شده برای رفع مشکل به تیم موسس ارائه کردم.',
        'همزمان در نقش محصول و انجنیری کار کردم، نیازمندی ها را تعریف کردم، تصمیم tradeoff گرفتم، و با سرعت مناسب استارتاپی تحویل دادم.',
      ],
      tags: ['React', 'TypeScript', 'Supabase', 'Product Strategy', 'Security'],
    },
  ],
  fr: [
    {
      role: 'Stagiaire développeur logiciel et product manager',
      company: 'Novika',
      period: 'Coop actuel',
      location: 'Environnement startup',
      bullets: [
        'J\'ai mené 25 entretiens de découverte client avec des designers et fournisseurs pour valider l\'hypothèse business principale de Novika et traduire les résultats en décisions roadmap.',
        'J\'ai piloté la livraison de bout en bout de 6+ systèmes produit, dont la plateforme Moodboard, le mode Compare et le workflow de génération de documents.',
        'J\'ai conçu et livré l\'expérience Moodboard + Compare depuis zéro: interactions canvas, persistence Supabase, outils de comparaison en temps réel et assistant IA avec historique de conversation.',
        'J\'ai réalisé un audit de sécurité du codebase, évalué la surface de vulnérabilité et fourni au founding team un plan de remédiation priorisé.',
        'J\'ai opéré entre produit et ingénierie en parallèle, défini les exigences, pris les décisions de compromis et livré rapidement dans un contexte early stage.',
      ],
      tags: ['React', 'TypeScript', 'Supabase', 'Product Strategy', 'Security'],
    },
  ],
} satisfies Record<Language, TimelineEntry[]>

const EXPERIENCE_HEADINGS = {
  en: { eyebrow: '2.0 Application Circuits', heading: "Where I've Worked" },
  ps: { eyebrow: '۲.۰ کاري تجربه', heading: 'چېرته مې کار کړی' },
  fa: { eyebrow: '۲.۰ تجربه کاری', heading: 'جاهایی که کار کردم' },
  fr: { eyebrow: '2.0 Expérience Professionnelle', heading: 'Où J\'ai Travaillé' },
} satisfies Record<Language, { eyebrow: string; heading: string }>

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
  const { language } = useLanguage()
  const headings = EXPERIENCE_HEADINGS[language]
  const entries = EXPERIENCE_ENTRIES[language]
  const [sectionRef, inView]   = useInView<HTMLElement>({ threshold: 0.05 })
  const [lineRef, lineInView]  = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="experience" ref={sectionRef} className="relative z-10">
      <div className="section-wrapper">

        {/* Heading */}
        <div className={`animate-on-scroll ${inView ? 'in-view' : ''}`}>
          <span className="heading-eyebrow">{headings.eyebrow}</span>
          <h2 className="section-heading">{headings.heading}</h2>
        </div>

        {/* Timeline */}
        <div className="relative" ref={lineRef}>
          <div className={`timeline-line ${lineInView ? 'in-view' : ''}`} />
          <div className="pl-16 space-y-0">
            {entries.map((entry, i) => (
              <TimelineItem key={i} entry={entry} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
