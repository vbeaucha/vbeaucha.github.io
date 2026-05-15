import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Experience() {
  return (
    <section className="mb-8">
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-6">
        {cv.experiences.map((exp) => (
          <div key={exp.company}>
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-sidebar dark:text-slate-50">{exp.company}</span>
              <span className="text-sm text-gray-500 dark:text-slate-400">{exp.period}</span>
            </div>
            <p className="text-accent text-sm font-semibold">{exp.role}</p>
            {exp.context && (
              <p className="text-xs text-gray-500 dark:text-slate-400 italic mb-2">{exp.context}</p>
            )}

            {exp.bullets.length > 0 && (
              <ul className="mt-2 space-y-1">
                {exp.bullets.map((b) => (
                  <li key={b} className="text-sm text-gray-700 dark:text-slate-300 flex gap-2">
                    <span className="text-accent flex-shrink-0">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {exp.subContexts?.map((sub) => (
              <div key={sub.label} className="mt-3 pl-3 border-l-2 border-accent/40">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-sidebar dark:text-slate-200">
                    {sub.label}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium">
                    {sub.type === 'internal' ? 'Internal' : 'Consulting'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 italic mb-1">
                  {sub.description}
                </p>
                <ul className="space-y-1">
                  {sub.bullets.map((b) => (
                    <li key={b} className="text-sm text-gray-700 dark:text-slate-300 flex gap-2">
                      <span className="text-accent flex-shrink-0">•</span>
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
