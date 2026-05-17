import { Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'
import { cv } from '../data/cv'

export function Footer() {
  return (
    <footer className="bg-gray-50 bg-white/80 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} {cv.name.first} {cv.name.last} · Built with React & Tailwind
        </p>
        <div className="flex gap-4">
          <a
            href={`mailto:${cv.contact.email}`}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={`https://github.com/${cv.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
          <a
            href={`https://linkedin.com/in/${cv.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
