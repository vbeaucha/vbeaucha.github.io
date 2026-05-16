import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../BrandIcons'
import { cv } from '../../data/cv'

export function About() {
  return (
    <motion.section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">
              {cv.title}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              {cv.name.first}{' '}
              <span className="text-accent">{cv.name.last}</span>
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">{cv.about}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <a
                href={`mailto:${cv.contact.email}`}
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 font-medium"
              >
                <Mail className="w-4 h-4" />
                Contact
              </a>
              <a
                href={`https://github.com/${cv.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors inline-flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200"
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={`https://linkedin.com/in/${cv.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors inline-flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200"
              >
                <LinkedInIcon className="w-4 h-4" />
                LinkedIn
              </a>
            </div>

            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <MapPin className="w-4 h-4" />
              {cv.contact.location}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur-3xl opacity-20" />
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="font-medium">Infrastructure Active</span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm font-mono">
                    <p className="text-sm mb-2 opacity-80">$ kubectl get nodes</p>
                    <p className="text-xs">✓ prod-eu-1 &nbsp;&nbsp;Ready</p>
                    <p className="text-xs">✓ prod-eu-2 &nbsp;&nbsp;Ready</p>
                    <p className="text-xs">✓ prod-eu-3 &nbsp;&nbsp;Ready</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-sm mb-2 opacity-80">Pipeline Status</p>
                    <p className="text-xs">✓ Build: Success</p>
                    <p className="text-xs">✓ Tests: 342 passed</p>
                    <p className="text-xs">✓ Deploy: Complete</p>
                    <p className="text-xs">✓ SLA: 99.9% ↑</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
