import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Skills() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <SectionTitle>Skills</SectionTitle>
      <div className="space-y-4">
        {cv.skills.map((cat) => (
          <div key={cat.label}>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">{cat.label}</p>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent dark:bg-accent/20 border border-accent/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
