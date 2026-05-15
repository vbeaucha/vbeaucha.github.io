import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle="My journey in the DevOps world">Experience</SectionTitle>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 hidden md:block" />

          <div className="space-y-10">
            {cv.experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="md:ml-20">
                  <div className="absolute left-8 w-4 h-4 bg-accent rounded-full border-4 border-white dark:border-gray-900 hidden md:block -ml-20 mt-1.5" />

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {exp.company}
                        </h3>
                        <p className="text-accent font-medium flex items-center gap-2 mt-0.5">
                          <Briefcase className="w-4 h-4" />
                          {exp.role}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm flex items-center gap-2 whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                    </div>

                    {exp.context && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-3">
                        {exp.context}
                      </p>
                    )}

                    {exp.bullets.length > 0 && (
                      <ul className="space-y-1.5 mb-4">
                        {exp.bullets.map((b, i) => (
                          <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2 text-sm">
                            <span className="text-accent mt-1 flex-shrink-0">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.subContexts?.map((sub) => (
                      <div
                        key={sub.label}
                        className="mt-4 pl-4 border-l-2 border-blue-200 dark:border-blue-700"
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                            {sub.label}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              sub.type === 'internal'
                                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                                : 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300'
                            }`}
                          >
                            {sub.type === 'internal' ? 'Internal' : 'Consulting'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-2">
                          {sub.description}
                        </p>
                        {sub.bullets.length > 0 && (
                          <ul className="space-y-1">
                            {sub.bullets.map((b, i) => (
                              <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2 text-sm">
                                <span className="text-accent mt-1 flex-shrink-0">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
