import { useInView } from '../hooks/useInView'

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    handle: '@placeholder',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    handle: 'placeholder-name',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    label: 'Email',
    handle: 'placeholder@email.com',
    href: 'mailto:placeholder@email.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
  const [sectionRef, inView]  = useInView<HTMLElement>({ threshold: 0.1 })
  const [formRef, formInView] = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section id="contact" ref={sectionRef} className="relative z-10">
      <div className="section-wrapper">

        {/* Heading */}
        <div className={`animate-on-scroll ${inView ? 'in-view' : ''}`}>
          <span className="heading-eyebrow">Contact</span>
          <h2 className="section-heading">Let's Connect</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — intro + socials */}
          <div className={`stagger-children ${inView ? 'in-view' : ''}`}>
            <p className="text-lg font-light leading-relaxed mb-3" style={{ color: 'var(--text-primary)' }}>
              Let's build something together.
            </p>
            <p className="leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}>
              Placeholder contact intro — a line or two about the kinds of opportunities you're open to: full-time roles, internships, research collaborations, or just a good conversation. Be specific about what excites you.
            </p>

            <div className="space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-4 group p-4 transition-all duration-300"
                  style={{
                    border: '1px solid var(--border)',
                    background: 'var(--bg-card)',
                    boxShadow: 'var(--shadow-card)',
                    color: 'var(--text-muted)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
                    e.currentTarget.style.color = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-card)'
                    e.currentTarget.style.color = 'var(--text-muted)'
                  }}
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

          {/* Right — contact form */}
          <div
            ref={formRef}
            className={`animate-on-scroll ${formInView ? 'in-view' : ''}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div
              className="p-8"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <p className="mono-label mb-6" style={{ color: 'var(--accent)', letterSpacing: '0.2em' }}>
                Send a Message
              </p>

              <div className="space-y-5">
                <div>
                  <label className="font-mono block mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                    NAME
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full outline-none px-4 py-3 transition-colors duration-200"
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      fontFamily: 'Barlow, sans-serif',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-bright)' }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = 'var(--border)' }}
                  />
                </div>

                <div>
                  <label className="font-mono block mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full outline-none px-4 py-3 transition-colors duration-200"
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      fontFamily: 'Barlow, sans-serif',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-bright)' }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = 'var(--border)' }}
                  />
                </div>

                <div>
                  <label className="font-mono block mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                    MESSAGE
                  </label>
                  <textarea
                    placeholder="Your message..."
                    rows={5}
                    className="w-full outline-none px-4 py-3 resize-none transition-colors duration-200"
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      fontFamily: 'Barlow, sans-serif',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-bright)' }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = 'var(--border)' }}
                  />
                </div>

                <button
                  className="w-full font-mono text-sm tracking-widest uppercase py-4 transition-all duration-300"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--accent-text)',
                    letterSpacing: '0.2em',
                    boxShadow: '0 4px 16px rgba(0,71,171,0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,71,171,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,71,171,0.2)'
                  }}
                >
                  Send Message
                </button>
              </div>
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
            <span style={{ color: 'var(--accent)' }}>PLACEHOLDER NAME</span>
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
