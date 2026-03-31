import { useCallback, useEffect, useRef, useState } from 'react'

// ── Line definitions ──────────────────────────────────────────────────────────

type BootLine =
  | { type: 'title' | 'subtitle' | 'success' | 'launch' | 'indent'; text: string }
  | { type: 'blank' }
  | { type: 'progress' }
  | { type: 'ok'; label: string; suffix: 'done' | 'PASS' }

const TARGET_DOTS_WIDTH = 52

const LINES: BootLine[] = [
  { type: 'title',    text: 'WARDAK SYSTEMS \u2014 PORTFOLIO v2.1' },
  { type: 'subtitle', text: 'Performing system initialization...' },
  { type: 'blank' },
  { type: 'progress' },
  { type: 'blank' },
  { type: 'ok', label: 'Mounting filesystem',            suffix: 'done' },
  { type: 'ok', label: 'Loading EE modules',             suffix: 'done' },
  { type: 'ok', label: 'Calibrating signal processors',  suffix: 'done' },
  { type: 'ok', label: 'Linking TypeScript runtime',     suffix: 'done' },
  { type: 'ok', label: 'Verifying academic credentials', suffix: 'done' },
  { type: 'indent',  text: '         \u2514\u2500\u2500 University of Waterloo  \u00b7  Electrical Engineering' },
  { type: 'ok', label: 'Running self diagnostics',        suffix: 'PASS' },
  { type: 'ok', label: 'Starting portfolio kernel',      suffix: 'done' },
  { type: 'blank' },
  { type: 'success', text: 'All systems nominal.' },
  { type: 'launch',  text: 'Launching WARDAK OS...' },
]

const LINE_INTERVAL_MS = 150

// ── Sub-components ────────────────────────────────────────────────────────────

function OkLine({ label, suffix }: { label: string; suffix: 'done' | 'PASS' }) {
  const dots = '.'.repeat(Math.max(3, TARGET_DOTS_WIDTH - label.length))
  return (
    <>
      <span style={{ color: '#1a6fd4' }}>[ OK ]</span>
      <span style={{ color: '#4d6e96' }}>{'  '}{label}{'  '}{dots}{'  '}</span>
      <span style={{ color: suffix === 'PASS' ? '#22c55e' : '#1a6fd4' }}>{suffix}</span>
    </>
  )
}

function renderLine(line: BootLine, i: number) {
  switch (line.type) {
    case 'title':
      return (
        <div key={i} style={{ color: '#f0f4ff', fontSize: '1rem', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
          {line.text}
        </div>
      )
    case 'subtitle':
      return (
        <div key={i} style={{ color: '#7a92b8' }}>
          {line.text}
        </div>
      )
    case 'blank':
      return <div key={i} style={{ height: '0.75rem' }} aria-hidden="true" />
    case 'progress':
      return (
        <div key={i} className="boot-progress-row">
          <span style={{ color: '#2d4a66' }}>[</span>
          <div className="boot-progress-track">
            <div className="boot-progress-fill" />
          </div>
          <span style={{ color: '#2d4a66' }}>]</span>
          <span style={{ color: '#1a6fd4', marginLeft: '0.6rem' }}>100%</span>
        </div>
      )
    case 'ok':
      return (
        <div key={i} className="font-mono">
          <OkLine label={line.label} suffix={line.suffix} />
        </div>
      )
    case 'indent':
      return (
        <div key={i} style={{ color: '#3d5c7a' }}>
          {line.text}
        </div>
      )
    case 'success':
      return (
        <div key={i} style={{ color: '#1a6fd4', marginTop: '0.1rem' }}>
          {line.text}
        </div>
      )
    case 'launch':
      return (
        <div key={i} style={{ color: '#f0f4ff' }}>
          {line.text}
        </div>
      )
  }
}

// ── Main component ────────────────────────────────────────────────────────────

interface BootSequenceProps {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [exiting, setExiting] = useState(false)

  // Refs prevent stale closure issues in event listeners
  const exitingRef    = useRef(false)
  const completedRef  = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const triggerExit = useCallback(() => {
    if (!exitingRef.current) {
      exitingRef.current = true
      setExiting(true)
    }
  }, [])

  useEffect(() => {
    // Mark as booted so the parent skips this on future page loads
    try { sessionStorage.setItem('wardak-booted', '1') } catch { /* unavailable */ }

    const handleSkip = () => triggerExit()
    window.addEventListener('keydown', handleSkip)
    window.addEventListener('click', handleSkip)

    let count = 0
    const timer = setInterval(() => {
      count++
      setVisibleCount(count)
      if (count >= LINES.length) {
        clearInterval(timer)
        setTimeout(triggerExit, 900)
      }
    }, LINE_INTERVAL_MS)

    return () => {
      clearInterval(timer)
      window.removeEventListener('keydown', handleSkip)
      window.removeEventListener('click', handleSkip)
    }
    // triggerExit is stable (useCallback with empty deps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === 'boot-fade-out' && !completedRef.current) {
      completedRef.current = true
      onCompleteRef.current()
    }
  }

  return (
    <div
      className={`boot-screen${exiting ? ' exiting' : ''}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="boot-content font-mono">
        {LINES.slice(0, visibleCount).map((line, i) => renderLine(line, i))}
      </div>

      <div className="boot-skip-hint font-mono">
        Press any key or click to skip
      </div>
    </div>
  )
}

