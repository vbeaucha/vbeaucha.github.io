import { Link } from 'react-router-dom'
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

const icons: Record<string, string> = { git: '⎇', vim: '⌨' }

export function Tutorials() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <SectionTitle>Tutorials</SectionTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cv.tutorials.map((t) => (
          <Link
            key={t.id}
            to={`/tutorials/${t.id}`}
            className="group relative overflow-hidden flex items-start gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-accent/50 bg-slate-50 dark:bg-slate-700/50 hover:bg-accent/5 dark:hover:bg-accent/10 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-accent/10 dark:bg-accent/20 flex items-center justify-center flex-shrink-0 text-xl">
              {icons[t.id] ?? '📄'}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-accent transition-colors">
                {t.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{t.description}</p>
            </div>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 group-hover:text-accent transition-colors text-lg">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
