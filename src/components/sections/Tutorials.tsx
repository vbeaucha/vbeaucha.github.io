import { Link } from 'react-router-dom'
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Tutorials() {
  return (
    <section className="mb-8">
      <SectionTitle>Tutorials</SectionTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cv.tutorials.map((t) => (
          <Link
            key={t.id}
            to={`/tutorials/${t.id}`}
            className="block border border-accent/30 rounded-lg p-4 hover:border-accent hover:bg-accent/5 transition-all"
          >
            <h3 className="font-bold text-accent">{t.title}</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">{t.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
