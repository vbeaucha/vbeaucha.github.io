import { cv } from '../data/cv'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="bg-sidebar text-white py-10 px-6">
      <div className="max-w-4xl mx-auto flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-wide">
            {cv.name.last.toUpperCase()}{' '}
            <span className="font-light">{cv.name.first}</span>
          </h1>
          <p className="text-accent text-xl font-semibold mt-1">{cv.title}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-300">
            <a href={`mailto:${cv.contact.email}`} className="hover:text-accent transition-colors">
              {cv.contact.email}
            </a>
            <span>{cv.contact.phone}</span>
            <span>{cv.contact.location}</span>
            <a
              href={`https://linkedin.com/in/${cv.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://github.com/${cv.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
