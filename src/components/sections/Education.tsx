import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Education() {
  return (
    <section className="mb-8">
      <SectionTitle>Education</SectionTitle>
      <p className="font-bold text-sidebar dark:text-slate-50">{cv.education.school}</p>
      <p className="text-sm text-gray-700 dark:text-slate-300">{cv.education.degree}</p>
      <p className="text-sm text-gray-500 dark:text-slate-400">{cv.education.specialization}</p>
    </section>
  )
}
