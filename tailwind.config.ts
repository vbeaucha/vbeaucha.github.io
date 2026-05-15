import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#2563EB',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
