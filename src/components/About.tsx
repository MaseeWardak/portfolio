import { useInView } from '../hooks/useInView'

const SKILLS = [
  'Python', 'C / C++', 'VHDL', 'MATLAB',
  'TypeScript', 'React', 'Node.js', 'Git',
  'KiCad', 'LTspice', 'Linux', 'Docker',
]

const RATINGS = [
  { param: 'Coffee Consumption',    min: '0',   max: '\u221e',    unit: 'cups / day' },
  { param: 'Hours Without Sleep',   min: '0',   max: '36',        unit: 'h'          },
  { param: 'Simultaneous PRs',      min: '0',   max: '12',        unit: '\u2014'     },
  { param: 'Browser Tabs Open',     min: '1',   max: '847',       unit: 'tabs'       },
  { param: 'Deadline Proximity',    min: '0',   max: 'T\u20130',  unit: '\u2014'     },
]

const DIFFERENTIATORS = [
  'Bridges embedded systems and polished frontend experiences',
  'Strong in rapid prototyping under hard deadlines',
  'Comfortable owning projects from architecture to final demo',
]

export default function About() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.08 })

  return (
    <section id="about" ref={sectionRef} className="relative z-10">
      <div className="section-wrapper">

        {/* ── Heading ── */}
        <div className={`animate-on-scroll ${inView ? 'in-view' : ''}`}>
          <span className="heading-eyebrow">1.0 Description</span>
          <h2 className="section-heading">Who I Am</h2>
        </div>

        {/* ── Two-column body ── */}
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-10 stagger-children ${inView ? 'in-view' : ''}`}>

          {/* ── Left column — 1.1 + 1.2 ── */}
          <div className="lg:col-span-3 space-y-8">

            {/* 1.1 General Description */}
            <div>
              <div className="ds-section-label">1.1 General Description</div>
              <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                Electrical Engineering student at the University of Waterloo
                with a focus on embedded systems, signal processing, and full stack software.
                Driven by the challenge of bridging hardware and software into cohesive,
                reliable systems.
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Equal parts engineer and builder, comfortable reading datasheets at 2 AM as
                much as shipping production code. Obsessive about clean design, tight feedback
                loops, and learning in public.
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Currently looking for coop opportunities where I can contribute to real
                products, break things responsibly, and grow fast. Available starting
                Fall 2026.
              </p>
            </div>

            {/* 1.2 Features */}
            <div>
              <div className="ds-section-label">1.2 Features</div>
              <ul className="space-y-1 mb-4" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.8' }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--accent)', fontFamily: 'Share Tech Mono, monospace' }}>+</span>
                  Multidomain capability: analog circuits, digital logic, and web systems
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--accent)', fontFamily: 'Share Tech Mono, monospace' }}>+</span>
                  Proven under pressure, 3+ hackathons with shipped prototypes
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--accent)', fontFamily: 'Share Tech Mono, monospace' }}>+</span>
                  Fast ramp up on new tools, languages, and domains
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--accent)', fontFamily: 'Share Tech Mono, monospace' }}>+</span>
                  Strong written and verbal communication, thinks in diagrams
                </li>
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
              <div className="ds-section-label">1.3 Absolute Maximum Ratings</div>
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
                <strong style={{ color: 'var(--accent)' }}>Note&nbsp;1:</strong> Exceeding maximum ratings may result in
                irreversible damage to project timelines and advisor relationships.
              </div>
            </div>

            {/* 1.4 What makes me different */}
            <div>
              <div className="ds-section-label">1.4 Differentiators</div>
              <div className="space-y-3">
                {DIFFERENTIATORS.map((point, index) => (
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
