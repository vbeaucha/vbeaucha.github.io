import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Education() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <SectionTitle>Education</SectionTitle>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent text-lg font-bold">
          🎓
        </div>
        <div>
          <p className="font-bold text-slate-800 dark:text-slate-50">{cv.education.school}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{cv.education.degree}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{cv.education.specialization}</p>
        </div>
      </div>
    </section>
  )
}
