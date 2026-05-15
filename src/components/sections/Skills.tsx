import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Skills() {
  return (
    <section className="mb-8">
      <SectionTitle>Skills</SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {cv.skills.map((cat) => (
          <div key={cat.label}>
            <p className="text-xs font-bold uppercase text-accent mb-1">{cat.label}</p>
            <p className="text-sm text-gray-700 dark:text-slate-300">{cat.items.join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
