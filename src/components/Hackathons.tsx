import { useInView } from '../hooks/useInView'
import { useLanguage, type Language } from '../context/LanguageContext'

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

const HACKATHONS = {
  en: [
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
        'Built an aid transparency platform that maps humanitarian coverage and highlights underserved regions. Included role based dashboard concepts for donors and organizations, with data driven planning for better aid distribution.',
      outcome: 'First hackathon attended, participation',
      tags: ['React', 'Maps', 'Data Visualization', 'Full stack'],
      link: 'https://github.com/Awais-H/Shafaf-Aid',
      linkLabel: 'VIEW ON GITHUB',
    },
  ],
  ps: [
    {
      number: '01',
      name: 'teddytalk with Arduino UNO Q',
      event: 'MakeUofT 2026',
      date: '2026',
      description:
        'موږ یو emotion aware AI companion جوړ کړ چې په بشپړ ډول standalone و. د Arduino UNO Q پر سر مو camera capture، FER+ inference، Gemini poem generation، او ElevenLabs voice output په یوه real time pipeline کې یو ځای کړل.',
      outcome: '۲ جایزې: Best Use of Arduino UNO Q (لومړی مقام) او Best Use of ElevenLabs API',
      tags: ['Arduino UNO Q', 'Edge AI', 'FER+ ONNX', 'Gemini API', 'ElevenLabs'],
    },
    {
      number: '02',
      name: 'UnClutter',
      event: 'Macathon 2026',
      date: '2026',
      description:
        'UnClutter د Gmail inbox په workflow style cards بدلوي. Google OAuth، Gmail sync، Gemini summaries، reply assistance، او natural language sorting rules مو د Supabase په مرسته د سخت وخت فشار لاندې په چټکۍ سره وړاندې کړل.',
      outcome: 'MLH Award Winner: Best Use of Gemini API and Google Cloud',
      tags: ['React + Vite', 'Node.js + Express', 'Gmail API', 'Supabase', 'Gemini API'],
      link: 'https://devpost.com/software/unclutter-ljtwq4?ref_content=my-projects-tab&ref_feature=my_projects',
      linkLabel: 'ډیمو وګورئ',
    },
    {
      number: '03',
      name: 'Shafaf Global Humanitarian Aid Platform',
      event: 'UmmaHacks',
      date: '2026',
      description:
        'د مرستو د شفافیت لپاره یو پلیټفارم چې د اړتیا وړ سیمې ښيي او د مرستندویو ادارو او تمویل کوونکو تر منځ روښانه لید وړاندې کوي.',
      outcome: 'زما لومړی هیکاتون، ګډون',
      tags: ['React', 'Maps', 'Data Visualization', 'Full stack'],
      link: 'https://github.com/Awais-H/Shafaf-Aid',
      linkLabel: 'GitHub وګورئ',
    },
  ],
  fa: [
    {
      number: '01',
      name: 'teddytalk with Arduino UNO Q',
      event: 'MakeUofT 2026',
      date: '2026',
      description:
        'یک companion هوشمند ساختیم که کاملا standalone بود. روی Arduino UNO Q مسیر کامل camera capture، FER+ inference، Gemini poem generation، و ElevenLabs voice output را به صورت real time پیاده کردیم.',
      outcome: '۲ جایزه: Best Use of Arduino UNO Q (1st Place) و Best Use of ElevenLabs API',
      tags: ['Arduino UNO Q', 'Edge AI', 'FER+ ONNX', 'Gemini API', 'ElevenLabs'],
    },
    {
      number: '02',
      name: 'UnClutter',
      event: 'Macathon 2026',
      date: '2026',
      description:
        'UnClutter inbox جیمیل را به workflow style cards تبدیل می کند. Google OAuth، Gmail sync، Gemini summaries، reply assistance، و natural language sorting rules را با Supabase در زمان محدود هکاتون پیاده کردیم.',
      outcome: 'MLH Award Winner: Best Use of Gemini API and Google Cloud',
      tags: ['React + Vite', 'Node.js + Express', 'Gmail API', 'Supabase', 'Gemini API'],
      link: 'https://devpost.com/software/unclutter-ljtwq4?ref_content=my-projects-tab&ref_feature=my_projects',
      linkLabel: 'مشاهده دیمو',
    },
    {
      number: '03',
      name: 'Shafaf Global Humanitarian Aid Platform',
      event: 'UmmaHacks',
      date: '2026',
      description:
        'پلتفرم شفافیت کمک رسانی که مناطق کم پوشش را روی نقشه مشخص می کند و تعامل بهتر بین اهداکنندگان و سازمان ها را ممکن می سازد.',
      outcome: 'اولین هکاتون، شرکت',
      tags: ['React', 'Maps', 'Data Visualization', 'Full stack'],
      link: 'https://github.com/Awais-H/Shafaf-Aid',
      linkLabel: 'مشاهده در GitHub',
    },
  ],
  fr: [
    {
      number: '01',
      name: 'teddytalk with Arduino UNO Q',
      event: 'MakeUofT 2026',
      date: '2026',
      description:
        'Nous avons construit un companion IA émotionnel entièrement standalone. Sur Arduino UNO Q, nous avons intégré camera capture, FER+ inference, Gemini poem generation et ElevenLabs voice output dans un pipeline temps réel.',
      outcome: '2 prix: Best Use of Arduino UNO Q (1st Place) et Best Use of ElevenLabs API',
      tags: ['Arduino UNO Q', 'Edge AI', 'FER+ ONNX', 'Gemini API', 'ElevenLabs'],
    },
    {
      number: '02',
      name: 'UnClutter',
      event: 'Macathon 2026',
      date: '2026',
      description:
        'UnClutter transforme Gmail en cartes de workflow. Nous avons intégré Google OAuth, Gmail sync, résumés Gemini, assistance de réponse, et règles de tri en langage naturel avec Supabase sous forte contrainte de temps.',
      outcome: 'MLH Award Winner: Best Use of Gemini API and Google Cloud',
      tags: ['React + Vite', 'Node.js + Express', 'Gmail API', 'Supabase', 'Gemini API'],
      link: 'https://devpost.com/software/unclutter-ljtwq4?ref_content=my-projects-tab&ref_feature=my_projects',
      linkLabel: 'VOIR LA DÉMO',
    },
    {
      number: '03',
      name: 'Shafaf Global Humanitarian Aid Platform',
      event: 'UmmaHacks',
      date: '2026',
      description:
        'Plateforme de transparence de l aide humanitaire qui cartographie les zones sous couvertes et améliore la visibilité pour donateurs et organisations.',
      outcome: 'Premier hackathon, participation',
      tags: ['React', 'Maps', 'Data Visualization', 'Full stack'],
      link: 'https://github.com/Awais-H/Shafaf-Aid',
      linkLabel: 'VOIR SUR GITHUB',
    },
  ],
} satisfies Record<Language, Hackathon[]>

const HACKATHON_COPY = {
  en: {
    eyebrow: '4.0 Prototype Builds',
    heading: 'Competing to Build',
    intro: 'Hackathon builds where I collaborate under pressure and ship complete, demo ready systems. My strongest project is teddytalk at MakeUofT 2026: a fully standalone edge AI build on UNO Q that won two awards.',
  },
  ps: {
    eyebrow: '۴.۰ هیکاتون پروټوټایپونه',
    heading: 'د جوړولو سیالي',
    intro: 'هغه هیکاتون پروژې چېرې زه تر فشار لاندې ټیمي کار کوم او بشپړ demo ready سیسټمونه وړاندې کوم.',
  },
  fa: {
    eyebrow: '۴.۰ پروژه های هکاتون',
    heading: 'رقابت برای ساختن',
    intro: 'پروژه های هکاتون که در آنها زیر فشار تیمی کار می کنم و سیستم های demo ready تحویل می دهم.',
  },
  fr: {
    eyebrow: '4.0 Prototypes de Hackathon',
    heading: 'Construire en Compétition',
    intro: 'Des projets de hackathon où je collabore sous pression et livre des systèmes complets prêts pour la démo.',
  },
} satisfies Record<Language, { eyebrow: string; heading: string; intro: string }>

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
  const { language } = useLanguage()
  const copy = HACKATHON_COPY[language]
  const hackathons = HACKATHONS[language]
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.05 })

  return (
    <section id="hackathons" ref={sectionRef} className="relative z-10">
      <div className="section-wrapper">

        {/* Heading */}
        <div className={`animate-on-scroll ${inView ? 'in-view' : ''}`}>
          <span className="heading-eyebrow">{copy.eyebrow}</span>
          <h2 className="section-heading">{copy.heading}</h2>
        </div>

        {/* Intro */}
        <p
          className={`max-w-2xl mb-12 animate-on-scroll ${inView ? 'in-view' : ''}`}
          style={{ color: 'var(--text-muted)', transitionDelay: '100ms' }}
        >
          {copy.intro}
        </p>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hackathons.map((h, i) => (
            <HackathonCard key={h.number} hackathon={h} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
