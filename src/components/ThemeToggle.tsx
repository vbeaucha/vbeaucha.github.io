import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="rounded-full p-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
