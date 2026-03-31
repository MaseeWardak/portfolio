# Codebase Guide — Wardak Portfolio

Everything a developer needs to know to write code that fits cleanly into this project.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v3 + plain CSS component classes |
| Fonts | Google Fonts (Barlow Condensed, Barlow, Share Tech Mono) |
| State | React Context (theme only) |
| Animations | CSS keyframes + IntersectionObserver hook |

No external component libraries. No CSS-in-JS. No state management library.

---

## Directory structure

```
src/
  components/        One file per section — Nav, Hero, About, Experience,
                     Projects, Hackathons, Contact
                     plus BootSequence and legacy DatasheetBanner
  context/
    ThemeContext.tsx  Light/dark theme state, localStorage persistence
  hooks/
    useInView.ts      IntersectionObserver wrapper for scroll animations
  index.css           All CSS: variables, component classes, keyframes
App.tsx               Composes all sections, owns the data-theme root div
index.html            Google Fonts <link> tags live here
tailwind.config.js    Custom palette, font families, keyframe/animation registry
```

`DatasheetBanner.tsx` still exists in the codebase, but it is currently not rendered in `App.tsx`.

---

## Theme system

### How it works

The root `<div>` in `App.tsx` carries a `data-theme` attribute (`"light"` or `"dark"`). All colours are CSS custom properties defined against that selector in `src/index.css`. Every component reads colours from these variables — never from hardcoded hex values.

```tsx
// App.tsx — the attribute that drives every colour on the page
<div data-theme={theme} style={{ background: 'var(--bg)' }}>
```

### The variable set

Both themes define the same token names. Swap the attribute, every colour updates.

| Token | Light | Dark | Meaning |
|---|---|---|---|
| `--bg` | `#f4f7ff` | `#050d1a` | Page background |
| `--bg-surface` | `#ffffff` | `#0a1628` | Elevated surface |
| `--bg-card` | `#ffffff` | `#0f2040` | Card background |
| `--border` | `#dde6f5` | `rgba(0,71,171,0.22)` | Dividers, outlines |
| `--text-primary` | `#0a0f1e` | `#f0f4ff` | Headings, important text |
| `--text-secondary` | `#2c3e5a` | `#c5d3e8` | Body text |
| `--text-muted` | `#5a6e8a` | `#7a92b8` | Labels, captions |
| `--accent` | `#0047ab` cobalt | `#ffcc00` gold | **Primary accent — changes per theme** |
| `--accent-bright` | `#1a6fd4` | `#1a6fd4` | Secondary links, icons |
| `--accent-bg` | `rgba(0,71,171,0.06)` | `rgba(0,71,171,0.12)` | Tinted backgrounds |
| `--accent-text` | `#ffffff` | `#050d1a` | Text on top of `--accent` fills |
| `--shadow-card` | multi-layer blue tint | `0 0 0 1px border` | Card resting shadow |
| `--shadow-hover` | stronger blue | stronger blue | Card hover shadow |
| `--nav-bg` | semi-transparent light | semi-transparent dark | Scrolled nav backdrop |

### Rule: never hardcode a colour

```tsx
// WRONG
<div style={{ color: '#0047ab' }}>

// RIGHT
<div style={{ color: 'var(--accent)' }}>
```

The only exception is the grid background, where the colours come from `--grid-minor` and `--grid-major`, also CSS variables.

### Reading the theme in React

If a component needs to branch on theme in JavaScript (e.g. to choose an SVG stroke value):

```tsx
import { useTheme } from '../context/ThemeContext'

const { theme } = useTheme()
// theme === 'light' | 'dark'
```

---

## Typography

Three font families — controlled via Tailwind utility classes.

| Class | Font | Use for |
|---|---|---|
| `font-heading` | Barlow Condensed | All `<h1>`–`<h2>`, hero name, card titles |
| `font-body` | Barlow | Body text (default on `<body>`) |
| `font-mono` | Share Tech Mono | Labels, tags, nav links, code accents |

Heading sizes are set with `clamp()` for fluid scaling (e.g. `clamp(3rem, 10vw, 8rem)`). The section heading class handles its own size:

```css
.section-heading {
  font-size: clamp(2.4rem, 5vw, 3.5rem);
}
```

---

## Tailwind — what is and isn't in the config

Tailwind is used for **layout, spacing, and sizing**. Colours are handled with CSS variables, not Tailwind color utilities.

### Custom colors in `tailwind.config.js`

Only raw palette values — these are available as `bg-navy`, `text-cobalt`, etc., but are rarely used in components (prefer CSS vars):

```js
navy, navy-mid, navy-light, cobalt, cobalt-bright, gold
```

**Do not add CSS variable strings like `'var(--accent)'` to the Tailwind color config** — this broke utility generation in a previous refactor and has been deliberately removed.

### Custom animations

All `@keyframes` are defined in both `index.css` (for use in plain CSS classes) and `tailwind.config.js` (for use as `animate-*` utilities). The Tailwind animation utilities do not support per-element delays — use `animation` inline style for that:

```tsx
// Tailwind animation (no delay needed)
<div className="animate-blink" />

// Inline style (delay required)
<div style={{ animation: 'fade-up 0.7s ease 0.3s both' }} />
```

Available keyframes: `blink`, `bounce-arrow`, `pulse-ring`, `fade-up`, `grid-drift`, `crosshair-spin`, `draw-line`, `blob-float`.

---

## CSS layers and class system

`index.css` has three distinct areas:

### 1. CSS variables (outside any layer)

The `:root` / `[data-theme]` blocks at the top. Edit here to change colours globally.

### 2. `@layer components` — reusable component classes

These are the classes to reach for first when building new UI:

| Class | What it does |
|---|---|
| `.section-wrapper` | Centers content, max-width 72rem, padding top/bottom 4rem |
| `.premium-main` | Applies subtle auto-dividers between sibling sections |
| `.heading-eyebrow` | Small mono label above a section heading |
| `.section-heading` | Large condensed uppercase heading with animated underline |
| `.bp-card` | Standard card — white/dark bg, cobalt top border, shadow, hover lift |
| `.animate-on-scroll` | Fade+slide in when `.in-view` is added |
| `.stagger-children` | Staggers children 100ms apart when `.in-view` is added |
| `.mono-label` | Small uppercase mono text (nav-style labels) |
| `.tag-pill` | Tech tag — monospace, tinted border, hover accent |
| `.hero-btn-primary` | Filled accent CTA button |
| `.hero-btn-secondary` | Ghost CTA button |
| `.nav-link` | Nav link with sliding underline on hover/active |
| `.theme-toggle` | Icon button for the sun/moon theme switch |

### 3. Plain CSS (outside any layer) — structural classes

These are NOT in `@layer`, so they have higher cascade priority than Tailwind utilities. Don't add layout overrides here unless intentional:

`.grid-background`, `.grid-lines`, `.grid-vignette`, `.typewriter-text`, `.cursor-blink`, `.timeline-line`, `.timeline-node`, `.timeline-node-dot`, `.timeline-node-ring`, `.section-divider`

---

## Section structure pattern

Every content section follows this exact pattern:

```tsx
export default function MySection() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section id="my-section" ref={sectionRef} className="relative z-10">
      <div className="section-wrapper">

        {/* Heading */}
        <div className={`animate-on-scroll ${inView ? 'in-view' : ''}`}>
          <span className="heading-eyebrow">Section Label</span>
          <h2 className="section-heading">Heading Text</h2>
        </div>

        {/* Content */}
        <div className={`stagger-children ${inView ? 'in-view' : ''}`}>
          {/* items */}
        </div>

      </div>
    </section>
  )
}
```

Key points:
- The `id` must match the entry in `NAV_LINKS` inside `Nav.tsx` for active link tracking to work.
- `useInView` defaults to `triggerOnce: true` — animations fire once and stay visible.
- `stagger-children` supports up to 6 children with built-in CSS delays (100ms each). For more, add additional `nth-child` rules to `index.css`.

---

## `useInView` hook

```ts
const [ref, inView] = useInView<HTMLElement>({
  threshold: 0.1,   // 0–1, fraction of element visible before triggering
  rootMargin: '0px', // CSS margin around root
  triggerOnce: true  // default true — set false for re-triggering on scroll up
})
```

Attach `ref` to the element to observe. `inView` becomes `true` when the threshold is crossed. Add the `in-view` class conditionally to drive CSS transitions.

---

## Card pattern

Use the `.bp-card` class for any new card component:

```tsx
<div className="bp-card">
  {/* Card content */}
</div>
```

`.bp-card` gives: `background: var(--bg-card)`, `border-top: 3px solid var(--accent)`, `padding: 1.75rem`, `box-shadow: var(--shadow-card)`, lift on hover. The top border colour automatically switches between cobalt (light) and gold (dark).

---

## Data shape conventions

Section data lives as a const array at the top of the component file — not in a separate data file. This keeps the shape co-located with the JSX that renders it.

```tsx
// Top of Experience.tsx
const EXPERIENCE_ENTRIES: TimelineEntry[] = [ ... ]

// Top of Projects.tsx
const PROJECTS: Project[] = [ ... ]

// Top of Hackathons.tsx
const HACKATHONS: Hackathon[] = [ ... ]
```

When filling in real content, edit these arrays. The shape is typed — TypeScript will error if a required field is missing.

### Project shape

```ts
interface Project {
  number: string        // '01', '02' … display only
  title: string
  description: string
  tags: string[]        // rendered as .tag-pill
  links: { label: string; href: string }[]
  featured?: boolean    // shows a 'FEATURED' badge
}
```

### Hackathon shape

```ts
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
```

### Experience shape

```ts
interface TimelineEntry {
  role: string
  company: string
  period: string        // e.g. 'May 2024 — Aug 2024'
  location: string
  bullets: string[]     // rendered as › bullet list
  tags: string[]        // rendered as .tag-pill
}
```

---

## Navigation

`Nav.tsx` owns the list of sections:

```ts
const NAV_LINKS = [
  { label: 'ABOUT',      href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS',   href: '#projects' },
  { label: 'HACKATHONS', href: '#hackathons' },
  { label: 'CONTACT',    href: '#contact' },
]
```

To add a new section: add its `id` here and add the component to `App.tsx` with a matching `id` on its `<section>` tag.  
You do not need to add manual divider elements between sections because `premium-main` handles section separators.

Active section tracking uses an `IntersectionObserver` with `rootMargin: '-40% 0px -55% 0px'`, which fires when a section occupies the middle 5% of the viewport.

---

## Adding a new section — checklist

1. Create `src/components/NewSection.tsx` following the section structure pattern above.
2. Give the `<section>` a unique `id` (e.g. `id="new-section"`).
3. Add a `NAV_LINKS` entry in `Nav.tsx` with matching `href`.
4. Add the component in `App.tsx` inside `<main className="premium-main">`.
5. Use `var(--...)` for all colours. Use `.bp-card` for cards. Use `.tag-pill` for tech tags.

---

## Things to avoid

- **Do not hardcode hex colours** in components. Use CSS variables.
- **Do not add CSS variable strings to `tailwind.config.js` colors**. It silently breaks Tailwind's utility generation. Keep the config to static hex values only.
- **Do not use `@apply` for multi-property component classes** in `index.css`. Write them as plain CSS properties — it's more predictable and the Tailwind docs recommend this pattern.
- **Do not put layout-critical styles only in Tailwind utilities** without a plain CSS fallback, especially for anything structural. This was the source of a previous left-alignment bug.
- **Do not add new sections without a matching nav entry** — the active section tracker will miss it.
