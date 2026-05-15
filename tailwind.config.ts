import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#3D8EC9',
        sidebar: '#1C2A3A',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
