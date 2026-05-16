import { motion } from 'framer-motion'
import {
  Activity,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  Server,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

interface CategoryStyle {
  icon: LucideIcon
  bg: string
  border: string
  iconColor: string
}

const categoryStyles: Record<string, CategoryStyle> = {
  Languages:    { icon: Code2,      bg: 'bg-indigo-50 dark:bg-indigo-900/20',  border: 'border-indigo-200 dark:border-indigo-700 hover:border-indigo-400',  iconColor: 'text-indigo-600' },
  Database:     { icon: Database,   bg: 'bg-cyan-50 dark:bg-cyan-900/20',      border: 'border-cyan-200 dark:border-cyan-700 hover:border-cyan-400',        iconColor: 'text-cyan-600' },
  'Event-Driven':{ icon: Zap,       bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-700 hover:border-orange-400',  iconColor: 'text-orange-500' },
  Containers:   { icon: Layers,     bg: 'bg-blue-50 dark:bg-blue-900/20',     border: 'border-blue-200 dark:border-blue-700 hover:border-blue-400',        iconColor: 'text-blue-600' },
  IaC:          { icon: Server,     bg: 'bg-green-50 dark:bg-green-900/20',   border: 'border-green-200 dark:border-green-700 hover:border-green-400',     iconColor: 'text-green-600' },
  'CI/CD':      { icon: GitBranch,  bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-700 hover:border-purple-400',  iconColor: 'text-purple-600' },
  Cloud:        { icon: Cloud,      bg: 'bg-sky-50 dark:bg-sky-900/20',       border: 'border-sky-200 dark:border-sky-700 hover:border-sky-400',           iconColor: 'text-sky-500' },
  Observability:{ icon: Activity,   bg: 'bg-red-50 dark:bg-red-900/20',       border: 'border-red-200 dark:border-red-700 hover:border-red-400',           iconColor: 'text-red-500' },
}

const fallbackStyle: CategoryStyle = {
  icon: Code2,
  bg: 'bg-gray-50 dark:bg-gray-800',
  border: 'border-gray-200 dark:border-gray-700 hover:border-gray-400',
  iconColor: 'text-gray-600',
}

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle subtitle="Technologies and tools I work with">Skills</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cv.skills.map((cat, index) => {
            const style = categoryStyles[cat.label] ?? fallbackStyle
            const Icon = style.icon
            return (
              <motion.div
                key={cat.label}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className={`p-6 rounded-xl border-2 transition-all ${style.bg} ${style.border}`}
              >
                <Icon className={`w-8 h-8 mb-4 ${style.iconColor}`} />
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  {cat.label}
                </h3>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
