export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold uppercase tracking-wider text-sidebar dark:text-slate-50">
        {children}
      </h2>
      <div className="h-0.5 bg-accent mt-1" />
    </div>
  )
}
