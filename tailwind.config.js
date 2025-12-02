/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0f1a',
        'bg-secondary': '#111827',
        'bg-card': '#1f2937',
        'bg-elevated': '#374151',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        'accent-blue': '#3b82f6',
        'accent-green': '#10b981',
        'accent-orange': '#f97316',
        'accent-red': '#ef4444',
        'accent-purple': '#8b5cf6',
        'accent-cyan': '#06b6d4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
