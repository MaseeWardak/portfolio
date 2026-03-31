import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage, type Language } from '../context/LanguageContext'

// ── Line definitions ──────────────────────────────────────────────────────────

type BootLine =
  | { type: 'title' | 'subtitle' | 'success' | 'launch' | 'indent'; text: string }
  | { type: 'blank' }
  | { type: 'progress' }
  | { type: 'ok'; label: string; suffix: 'done' | 'PASS' }

const TARGET_DOTS_WIDTH = 52

const BOOT_COPY = {
  en: {
    subtitle: 'Performing system initialization...',
    lines: ['Mounting filesystem', 'Loading EE modules', 'Calibrating signal processors', 'Linking TypeScript runtime', 'Verifying academic credentials', 'Running self diagnostics', 'Starting portfolio kernel'],
    indent: '         \u2514\u2500\u2500 University of Waterloo  \u00b7  برېښنايي انجنیري',
    success: 'All systems nominal.',
    launch: 'Launching WARDAK OS...',
    skip: 'Press any key or click to skip',
  },
  ps: {
    subtitle: 'سیسټم فعالېږي...',
    lines: ['د فایل سیسټم لګول', 'د EE ماډیولونو لود کول', 'د سیګنال پروسس کالیبرېشن', 'د TypeScript runtime نښلول', 'اکادمیک سندونه تاییدول', 'ځان تشخیص', 'د portfolio kernel پیل'],
    indent: '         \u2514\u2500\u2500 University of Waterloo  \u00b7  Electrical Engineering',
    success: 'ټول سیستمونه عادي حالت کې دي.',
    launch: 'WARDAK OS پیل کېږي...',
    skip: 'د تېرېدو لپاره هره کیلي ووهئ',
  },
  fa: {
    subtitle: 'در حال راه اندازی سیستم...',
    lines: ['مونت کردن فایل سیستم', 'بارگذاری ماژول های EE', 'کالیبراسیون پردازش سیگنال', 'لینک کردن TypeScript runtime', 'بررسی مدارک تحصیلی', 'خودتشخیصی سیستم', 'شروع kernel پورتفولیو'],
    indent: '         \u2514\u2500\u2500 University of Waterloo  \u00b7  Electrical Engineering',
    success: 'همه سیستم ها پایدار است.',
    launch: 'در حال اجرای WARDAK OS...',
    skip: 'برای رد شدن کلید بزنید یا کلیک کنید',
  },
  fr: {
    subtitle: 'Initialisation du système...',
    lines: ['Montage du système de fichiers', 'Chargement des modules EE', 'Calibration du traitement du signal', 'Liaison du runtime TypeScript', 'Vérification des références académiques', 'Auto diagnostic', 'Démarrage du noyau du portfolio'],
    indent: '         \u2514\u2500\u2500 University of Waterloo  \u00b7  Electrical Engineering',
    success: 'Tous les systèmes sont stables.',
    launch: 'Lancement de WARDAK OS...',
    skip: 'Appuyez sur une touche ou cliquez pour passer',
  },
} satisfies Record<Language, { subtitle: string; lines: string[]; indent: string; success: string; launch: string; skip: string }>

function getBootLines(language: Language): BootLine[] {
  const copy = BOOT_COPY[language]
  return [
    { type: 'title', text: 'WARDAK SYSTEMS \u2014 PORTFOLIO v2.1' },
    { type: 'subtitle', text: copy.subtitle },
    { type: 'blank' },
    { type: 'progress' },
    { type: 'blank' },
    { type: 'ok', label: copy.lines[0], suffix: 'done' },
    { type: 'ok', label: copy.lines[1], suffix: 'done' },
    { type: 'ok', label: copy.lines[2], suffix: 'done' },
    { type: 'ok', label: copy.lines[3], suffix: 'done' },
    { type: 'ok', label: copy.lines[4], suffix: 'done' },
    { type: 'indent', text: copy.indent },
    { type: 'ok', label: copy.lines[5], suffix: 'PASS' },
    { type: 'ok', label: copy.lines[6], suffix: 'done' },
    { type: 'blank' },
    { type: 'success', text: copy.success },
    { type: 'launch', text: copy.launch },
  ]
}

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
  const { language } = useLanguage()
  const lines = getBootLines(language)
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
      if (count >= lines.length) {
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
        {lines.slice(0, visibleCount).map((line, i) => renderLine(line, i))}
      </div>

      <div className="boot-skip-hint font-mono">
        {BOOT_COPY[language].skip}
      </div>
    </div>
  )
}

