import { useInView } from '../hooks/useInView'
import { useLanguage, type Language } from '../context/LanguageContext'

const SKILLS = ['Python', 'C / C++', 'VHDL', 'MATLAB', 'TypeScript', 'React', 'Node.js', 'Git', 'KiCad', 'LTspice', 'Linux', 'Docker']

const RATINGS = [
  { param: 'Coffee Consumption',    min: '0',   max: '\u221e',    unit: 'cups / day' },
  { param: 'Hours Without Sleep',   min: '0',   max: '36',        unit: 'h'          },
  { param: 'Simultaneous PRs',      min: '0',   max: '12',        unit: '\u2014'     },
  { param: 'Browser Tabs Open',     min: '1',   max: '847',       unit: 'tabs'       },
  { param: 'Deadline Proximity',    min: '0',   max: 'T\u20130',  unit: '\u2014'     },
]

const ABOUT_COPY = {
  en: {
    eyebrow: '1.0 Description',
    heading: 'Who I Am',
    sec11: '1.1 General Description',
    p1: 'Electrical Engineering student at the University of Waterloo with a focus on embedded systems, signal processing, and full stack software. Driven by the challenge of bridging hardware and software into cohesive, reliable systems.',
    p2: 'Equal parts engineer and builder, comfortable reading datasheets at 2 AM as much as shipping production code. Obsessive about clean design, tight feedback loops, and learning in public.',
    p3: 'Currently looking for coop opportunities where I can contribute to real products, break things responsibly, and grow fast. Available starting Fall 2026.',
    sec12: '1.2 Features',
    features: [
      'Multidomain capability: analog circuits, digital logic, and web systems',
      'Proven under pressure, 3+ hackathons with shipped prototypes',
      'Fast ramp up on new tools, languages, and domains',
      'Strong written and verbal communication, thinks in diagrams',
    ],
    sec13: '1.3 Absolute Maximum Ratings',
    note: 'Exceeding maximum ratings may result in irreversible damage to project timelines and advisor relationships.',
    sec14: '1.4 Differentiators',
    differentiators: [
      'Bridges embedded systems and polished frontend experiences',
      'Strong in rapid prototyping under hard deadlines',
      'Comfortable owning projects from architecture to final demo',
    ],
  },
  ps: {
    eyebrow: '۱.۰ پېژندنه',
    heading: 'زه څوک یم',
    sec11: '۱.۱ عمومي پېژندنه',
    p1: 'زه د واټرلو پوهنتون د برېښنايي انجنیري محصل یم. تمرکز مې په امبیډډ سیسټمونو، سیګنال پروسس، او فول سټیک سافټویر دی. اصلي موخه مې دا ده چې هارډویر او سافټویر په یو باوري او همغږي سیستم بدل کړم.',
    p2: 'زه هم انجنیر یم او هم جوړوونکی. د شپې ناوخته دیتاشیټ لوستل هم راته عادي دي او د تولید کچې کوډ لېږل هم. پاک ډیزاین، چټک فیډبک، او دوامداره زده کړه زما کاري سبک دی.',
    p3: 'اوس د ۲۰۲۶ د مني د کوپ فرصتونو په لټه کې یم څو په ریښتینو محصولاتو کې اغېزمنه ونډه واخلم او چټک پرمختګ وکړم.',
    sec12: '۱.۲ ځانګړتیاوې',
    features: [
      'څو ساحه ییزه وړتیا: انالوګ سرکټونه، ډیجیټل منطق، او ویب سیسټمونه',
      'تر فشار لاندې ثابت کار، له ۳ څخه ډېر هیکاتونونه د بشپړو پروټوټایپونو سره',
      'په نوو وسیلو، ژبو، او ساحو کې چټکه زده کړه',
      'قوي لیکلې او شفاهي اړیکه، او د فکر منظمول د ډیاګرامونو له لارې',
    ],
    sec13: '۱.۳ اعظمي حدونه',
    note: 'له اعظمي حدونو پورته تلل د پروژې مهالوېش او د لارښود اړیکې ته جدي زیان رسولای شي.',
    sec14: '۱.۴ توپیر کوونکي ټکي',
    differentiators: [
      'امبیډډ سیسټمونه د ښه فرانت اینډ تجربې سره نښلوي',
      'د سختو ضرب الاجلونو لاندې چټک پروټوټایپ جوړونه',
      'له معماری څخه تر وروستي ډیمو پورې بشپړ مالکیت',
    ],
  },
  fa: {
    eyebrow: '۱.۰ معرفی',
    heading: 'من کی هستم',
    sec11: '۱.۱ توضیح عمومی',
    p1: 'من محصل مهندسی برق در University of Waterloo هستم و تمرکزم روی سیستم های امبدد، پردازش سیگنال، و نرم افزار فول استک است. انگیزه اصلی من وصل کردن سخت افزار و نرم افزار در سیستم های قابل اعتماد است.',
    p2: 'هم انجنیر هستم و هم سازنده. هم مطالعه دیتاشیت در نیمه شب برایم عادی است و هم ارسال کد تولیدی. روی طراحی تمیز، فیدبک سریع، و یادگیری مداوم تمرکز دارم.',
    p3: 'در حال حاضر برای فرصت های coop پاییز ۲۰۲۶ آماده هستم تا در محصولات واقعی تاثیرگذار باشم و سریع رشد کنم.',
    sec12: '۱.۲ ویژگی ها',
    features: [
      'توانایی چند حوزه ای: مدارهای انالوگ، منطق دیجیتال، و سیستم های وب',
      'توان اثبات شده زیر فشار، بیشتر از ۳ هکاتون با پروتوتایپ های آماده',
      'یادگیری سریع ابزارها، زبان ها، و حوزه های جدید',
      'ارتباط نوشتاری و گفتاری قوی، تفکر با دیاگرام',
    ],
    sec13: '۱.۳ حد اکثر مقادیر',
    note: 'عبور از حد اکثر مقدارها می تواند به زمان بندی پروژه و روابط حرفه ای آسیب جدی برساند.',
    sec14: '۱.۴ نقاط تمایز',
    differentiators: [
      'ترکیب سیستم های امبدد با تجربه فرانت ایند باکیفیت',
      'پروتوتایپ سریع در ضرب الاجل های سخت',
      'مالکیت کامل از معماری تا دیموی نهایی',
    ],
  },
  fr: {
    eyebrow: '1.0 Présentation',
    heading: 'Qui Je Suis',
    sec11: '1.1 Description Générale',
    p1: 'Étudiant en génie électrique à University of Waterloo, avec un focus sur les systèmes embarqués, le traitement du signal et le logiciel full stack. Je suis motivé par la création de systèmes fiables qui relient matériel et logiciel.',
    p2: 'Ingénieur et builder à la fois, je peux autant lire des datasheets tard le soir que livrer du code de production. Je privilégie un design propre, des boucles de feedback courtes et un apprentissage continu.',
    p3: 'Je recherche des opportunités de coop pour l\'automne 2026 afin de contribuer à de vrais produits et progresser rapidement.',
    sec12: '1.2 Points Clés',
    features: [
      'Compétence multidomaine: circuits analogiques, logique numérique et systèmes web',
      'Solide sous pression, 3+ hackathons avec prototypes livrés',
      'Montée en compétence rapide sur de nouveaux outils et langages',
      'Communication écrite et orale forte, pensée structurée par diagrammes',
    ],
    sec13: '1.3 Limites Maximales',
    note: 'Le dépassement des limites maximales peut causer des dégâts irréversibles aux délais projet et aux relations de travail.',
    sec14: '1.4 Différenciateurs',
    differentiators: [
      'Relie systèmes embarqués et expériences frontend soignées',
      'Très fort en prototypage rapide sous délais serrés',
      'À l\'aise avec la responsabilité de bout en bout, de l\'architecture au démo final',
    ],
  },
} satisfies Record<Language, {
  eyebrow: string
  heading: string
  sec11: string
  p1: string
  p2: string
  p3: string
  sec12: string
  features: string[]
  sec13: string
  note: string
  sec14: string
  differentiators: string[]
}>

export default function About() {
  const { language } = useLanguage()
  const copy = ABOUT_COPY[language]
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.08 })

  return (
    <section id="about" ref={sectionRef} className="relative z-10">
      <div className="section-wrapper">

        {/* ── Heading ── */}
        <div className={`animate-on-scroll ${inView ? 'in-view' : ''}`}>
          <span className="heading-eyebrow">{copy.eyebrow}</span>
          <h2 className="section-heading">{copy.heading}</h2>
        </div>

        {/* ── Two-column body ── */}
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-10 stagger-children ${inView ? 'in-view' : ''}`}>

          {/* ── Left column — 1.1 + 1.2 ── */}
          <div className="lg:col-span-3 space-y-8">

            {/* 1.1 General Description */}
            <div>
              <div className="ds-section-label">{copy.sec11}</div>
              <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {copy.p1}
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {copy.p2}
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {copy.p3}
              </p>
            </div>

            {/* 1.2 Features */}
            <div>
              <div className="ds-section-label">{copy.sec12}</div>
              <ul className="space-y-1 mb-4" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.8' }}>
                {copy.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span style={{ color: 'var(--accent)', fontFamily: 'Share Tech Mono, monospace' }}>+</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-3">
                {SKILLS.map((skill) => (
                  <span key={skill} className="tag-pill cursor-default">{skill}</span>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right column — 1.3 + 1.4 ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* 1.3 Absolute Maximum Ratings */}
            <div>
              <div className="ds-section-label">{copy.sec13}</div>
              <div style={{ overflowX: 'auto' }}>
                <table className="ds-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Min</th>
                      <th>Max</th>
                      <th>Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RATINGS.map((row) => (
                      <tr key={row.param}>
                        <td>{row.param}</td>
                        <td>{row.min}</td>
                        <td>{row.max}</td>
                        <td>{row.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="ds-note">
                <strong style={{ color: 'var(--accent)' }}>Note&nbsp;1:</strong> {copy.note}
              </div>
            </div>

            {/* 1.4 What makes me different */}
            <div>
              <div className="ds-section-label">{copy.sec14}</div>
              <div className="space-y-3">
                {copy.differentiators.map((point, index) => (
                  <div key={point} className="about-highlight-row">
                    <span className="about-highlight-index">0{index + 1}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
