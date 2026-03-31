/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:          '#050d1a',
        'navy-mid':    '#0a1628',
        'navy-light':  '#0f2040',
        cobalt:        '#0047ab',
        'cobalt-bright':'#1a6fd4',
        gold:          '#ffcc00',
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        body:    ['Barlow', 'sans-serif'],
        mono:    ['"Share Tech Mono"', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
        'bounce-arrow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(8px)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'grid-drift': {
          '0%':   { transform: 'translate(0, 0)' },
          '25%':  { transform: 'translate(15px, 8px)' },
          '50%':  { transform: 'translate(8px, 15px)' },
          '75%':  { transform: 'translate(-8px, 8px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'crosshair-spin': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'draw-line': {
          from: { transform: 'scaleY(0)' },
          to:   { transform: 'scaleY(1)' },
        },
        'blob-float': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':      { transform: 'translate(20px, -15px) scale(1.04)' },
          '66%':      { transform: 'translate(-15px, 10px) scale(0.97)' },
        },
      },
      animation: {
        blink:           'blink 1s step-end infinite',
        'bounce-arrow':  'bounce-arrow 1.4s ease-in-out infinite',
        'pulse-ring':    'pulse-ring 2s ease-out infinite',
        'fade-up':       'fade-up 0.6s ease forwards',
        'grid-drift':    'grid-drift 60s ease-in-out infinite',
        'crosshair-spin':'crosshair-spin 20s linear infinite',
        'draw-line':     'draw-line 1.2s ease forwards',
        'blob-float':    'blob-float 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
