import { cv } from '../data/cv'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="relative overflow-hidden bg-sidebar">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #3D8EC9 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 py-14">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Lead DevOps / SRE · Portfolio
            </p>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight leading-none">
              {cv.name.first}{' '}
              <span className="text-accent">{cv.name.last.toUpperCase()}</span>
            </h1>
            <p className="mt-3 text-lg text-slate-400 font-light">{cv.title}</p>

            <div className="flex flex-wrap gap-2 mt-6">
              <a
                href={`mailto:${cv.contact.email}`}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-sm transition-all"
              >
                ✉ {cv.contact.email}
              </a>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-sm">
                📍 {cv.contact.location}
              </span>
              <a
                href={`https://linkedin.com/in/${cv.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-sm transition-all"
              >
                LinkedIn ↗
              </a>
              <a
                href={`https://github.com/${cv.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-sm transition-all"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
