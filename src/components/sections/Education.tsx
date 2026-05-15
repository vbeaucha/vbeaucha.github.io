import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Education() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <SectionTitle>Education</SectionTitle>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex items-start gap-5"
        >
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
            <GraduationCap className="w-7 h-7 text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {cv.education.school}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-1">{cv.education.degree}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {cv.education.specialization}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
