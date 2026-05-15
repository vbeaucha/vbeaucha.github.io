import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function About() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <SectionTitle>Profile</SectionTitle>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{cv.about}</p>
    </section>
  )
}
