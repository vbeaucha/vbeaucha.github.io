import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function OpenSource() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <SectionTitle>Open Source</SectionTitle>
      <div className="flex flex-wrap gap-3">
        {cv.openSource.map((item) => (
          <div
            key={item.project}
            className="flex-1 min-w-[200px] p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
          >
            <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">{item.project}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
