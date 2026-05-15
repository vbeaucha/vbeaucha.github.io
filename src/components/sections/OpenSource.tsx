import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function OpenSource() {
  return (
    <section className="mb-8">
      <SectionTitle>Open Source Contributions</SectionTitle>
      <ul className="space-y-1">
        {cv.openSource.map((item) => (
          <li key={item.project} className="text-sm flex gap-2">
            <span className="text-accent flex-shrink-0">•</span>
            <span>
              <span className="font-semibold text-sidebar dark:text-slate-50">{item.project}</span>
              {' — '}
              <span className="text-gray-700 dark:text-slate-300">{item.description}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
