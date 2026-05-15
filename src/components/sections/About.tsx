import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function About() {
  return (
    <section className="mb-8">
      <SectionTitle>Profile</SectionTitle>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-slate-300">{cv.about}</p>
    </section>
  )
}
