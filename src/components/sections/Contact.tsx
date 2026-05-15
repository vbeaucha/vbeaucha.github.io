import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Contact() {
  return (
    <section className="mb-8">
      <SectionTitle>Contact</SectionTitle>
      <ul className="space-y-2 text-sm">
        <li>
          <a href={`mailto:${cv.contact.email}`} className="text-accent hover:underline">
            {cv.contact.email}
          </a>
        </li>
        <li className="text-gray-700 dark:text-slate-300">{cv.contact.phone}</li>
        <li className="text-gray-700 dark:text-slate-300">{cv.contact.location}</li>
        <li>
          <a
            href={`https://linkedin.com/in/${cv.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            linkedin.com/in/{cv.contact.linkedin}
          </a>
        </li>
      </ul>
    </section>
  )
}
