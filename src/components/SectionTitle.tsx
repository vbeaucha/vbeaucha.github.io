import type { ReactNode } from 'react'

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="w-1 h-6 rounded-full bg-accent flex-shrink-0" />
      <h2 className="text-base font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
        {children}
      </h2>
    </div>
  )
}
