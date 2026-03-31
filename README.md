# Wardak Portfolio

Personal portfolio site for Maseehullah Wardak, built with React, TypeScript, and Vite.

## Tech stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v3 (layout utilities) + custom CSS system in `src/index.css`

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

## Scripts

- `npm run dev` start dev server
- `npm run build` type-check and create production build
- `npm run preview` preview production build locally
- `npm run lint` run ESLint

## Project structure

```text
src/
  components/
    Nav.tsx
    Hero.tsx
    About.tsx
    Experience.tsx
    Projects.tsx
    Hackathons.tsx
    Contact.tsx
    BootSequence.tsx
  context/
    ThemeContext.tsx
  hooks/
    useInView.ts
  App.tsx
  index.css
```

## Content model

The main content is maintained directly in component-level arrays:

- `Experience.tsx` -> `EXPERIENCE_ENTRIES`
- `Projects.tsx` -> `PROJECTS`
- `Hackathons.tsx` -> `HACKATHONS`

Update these arrays to refresh portfolio content without changing render logic.

## Design notes

- Theme is driven by `data-theme` on the root app container and CSS variables in `src/index.css`.
- Section separators are automatically handled by `.premium-main > section + section::before`.
- The first-load terminal-style intro uses `sessionStorage` key `wardak-booted` to skip on revisits.

## Current positioning

- Availability: Fall 2026 coop
- Core focus: embedded systems + full stack software
- Current experience: Novika coop (software development + product management)
