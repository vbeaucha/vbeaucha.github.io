import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Experience() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-8">
        {cv.experiences.map((exp) => (
          <div key={exp.company} className="relative pl-5 border-l-2 border-slate-200 dark:border-slate-600">
            <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-accent" />
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-50 text-base">{exp.company}</span>
                <p className="text-accent text-sm font-semibold mt-0.5">{exp.role}</p>
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {exp.period}
              </span>
            </div>

            {exp.context && (
              <p className="text-xs text-slate-400 dark:text-slate-500 italic mt-1">{exp.context}</p>
            )}

            {exp.bullets.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2">
                    <span className="text-accent flex-shrink-0 mt-0.5">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {exp.subContexts?.map((sub) => (
              <div key={sub.label} className="mt-4 ml-2 pl-4 border-l border-accent/30 rounded-r-lg">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{sub.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    sub.type === 'internal'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                      : 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'
                  }`}>
                    {sub.type === 'internal' ? 'Internal' : 'Consulting'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 italic mb-2">{sub.description}</p>
                <ul className="space-y-1">
                  {sub.bullets.map((b, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2">
                      <span className="text-accent flex-shrink-0 mt-0.5">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
