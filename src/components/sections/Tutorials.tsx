import { motion } from 'framer-motion'
import { ArrowRight, GitBranch, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

const icons: Record<string, typeof GitBranch> = { git: GitBranch, vim: Terminal }
const gradients: Record<string, string> = {
  git: 'from-orange-500 to-red-500',
  vim: 'from-green-500 to-teal-500',
}

export function Tutorials() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle subtitle="Guides I've written to share my knowledge">Tutorials</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {cv.tutorials.map((t, index) => {
            const Icon = icons[t.id] ?? Terminal
            const gradient = gradients[t.id] ?? 'from-blue-500 to-indigo-500'
            return (
              <motion.div
                key={t.id}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Link
                  to={`/tutorials/${t.id}`}
                  className="group flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/50 hover:border-accent dark:hover:border-accent transition-all"
                >
                  <div className={`h-2 shrink-0 bg-gradient-to-r ${gradient}`} />
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 bg-gradient-to-br ${gradient} rounded-lg text-white shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                        {t.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                      {t.description}
                    </p>
                    <div className="flex items-center gap-2 text-accent text-sm font-medium">
                      Read tutorial
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
