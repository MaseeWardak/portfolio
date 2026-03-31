import { useInView } from '../hooks/useInView'

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    handle: '/MaseeWardak',
    href: 'https://github.com/MaseeWardak',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    handle: '/in/maseewardak',
    href: 'https://www.linkedin.com/in/maseewardak',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    label: 'Email',
    handle: 'mwardak@uwaterloo.ca',
    href: 'mailto:mwardak@uwaterloo.ca',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    handle: '437 557 4070',
    href: 'tel:4375574070',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.49 19.49 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.34 1.78.65 2.62a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.46-1.27a2 2 0 012.11-.45c.84.31 1.72.53 2.62.65A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Resume',
    handle: 'Download PDF',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section id="contact" ref={sectionRef} className="relative z-10">
      <div className="section-wrapper">

        {/* Heading */}
        <div className={`animate-on-scroll ${inView ? 'in-view' : ''}`}>
          <span className="heading-eyebrow">5.0 Output Specifications</span>
          <h2 className="section-heading">Let's Connect</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className={`animate-on-scroll ${inView ? 'in-view' : ''}`}>
            <div className="contact-callout">
              <p className="mono-label mb-4" style={{ color: 'var(--accent)' }}>Open to Opportunities</p>
              <p className="text-xl mb-4" style={{ color: 'var(--text-primary)', lineHeight: 1.45 }}>
                Building software where systems thinking and product quality both matter.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                I am currently interested in coop roles across embedded systems, platform engineering,
                and full stack product teams. Reach out directly and I will reply quickly.
              </p>
            </div>
          </div>

          <div className={`stagger-children ${inView ? 'in-view' : ''}`}>
            <div className="space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="contact-link-row"
                >
                  <span style={{ color: 'var(--accent-bright)' }}>
                    {link.icon}
                  </span>
                  <div>
                    <div className="font-mono text-sm tracking-wide" style={{ color: 'var(--text-primary)' }}>
                      {link.label}
                    </div>
                    <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {link.handle}
                    </div>
                  </div>
                  <svg className="ml-auto" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`mt-24 pt-8 text-center animate-on-scroll ${inView ? 'in-view' : ''}`}
          style={{ borderTop: '1px solid var(--border)', transitionDelay: '300ms' }}
        >
          <p className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>
            DESIGNED & BUILT BY{' '}
            <span style={{ color: 'var(--accent)' }}>MASEEHULLAH WARDAK</span>
            {' '}·{' '}
            {new Date().getFullYear()}
          </p>
          <p className="font-mono mt-2" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--text-muted)', opacity: 0.45 }}>
            WARDAK_ PORTFOLIO · v2.0.0
          </p>
        </div>

      </div>
    </section>
  )
}
