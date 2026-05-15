import { cv } from '../data/cv'

export function Footer() {
  return (
    <footer className="mt-6 py-6 text-center text-xs text-slate-400 dark:text-slate-600 border-t border-slate-200 dark:border-slate-800">
      © {new Date().getFullYear()} {cv.name.first} {cv.name.last} · Built with React & Tailwind
    </footer>
  )
}
