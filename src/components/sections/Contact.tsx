import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Contact() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <SectionTitle>Contact</SectionTitle>
      <div className="flex flex-wrap gap-3">
        <a
          href={`mailto:${cv.contact.email}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-colors shadow-sm"
        >
          ✉ {cv.contact.email}
        </a>
        <a
          href={`https://linkedin.com/in/${cv.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm hover:border-accent hover:text-accent transition-colors"
        >
          LinkedIn ↗
        </a>
        <a
          href={`https://github.com/${cv.contact.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm hover:border-accent hover:text-accent transition-colors"
        >
          GitHub ↗
        </a>
        <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-sm">
          📍 {cv.contact.location}
        </span>
      </div>
    </section>
  )
}
