import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function OpenSource() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle subtitle="Contributions to the open-source ecosystem">Open Source</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {cv.openSource.map((item, index) => (
            <motion.a
              key={item.project}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md dark:hover:shadow-gray-900/50 hover:border-accent dark:hover:border-accent transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                  {item.project}
                </p>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
