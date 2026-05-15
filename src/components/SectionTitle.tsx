import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  subtitle?: string
}

export function SectionTitle({ children, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{children}</h2>
      {subtitle && <p className="text-xl text-gray-600 dark:text-gray-400">{subtitle}</p>}
    </motion.div>
  )
}
