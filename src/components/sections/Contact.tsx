import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../BrandIcons'
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'
import { LogoIcon } from '../LogoIcon'

export function Contact() {
  const items = [
    {
      icon: Mail,
      label: 'Email',
      value: cv.contact.email,
      href: `mailto:${cv.contact.email}`,
    },
    {
      icon: LinkedInIcon,
      label: 'LinkedIn',
      value: `linkedin.com/in/${cv.contact.linkedin}`,
      href: `https://linkedin.com/in/${cv.contact.linkedin}`,
    },
    {
      icon: GitHubIcon,
      label: 'GitHub',
      value: `github.com/${cv.contact.github}`,
      href: `https://github.com/${cv.contact.github}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: cv.contact.location,
      href: null,
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle subtitle="Let's connect and talk about your next project">Contact</SectionTitle>

        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto flex items-center gap-8"
        >
          {/* Logo */}
          <div className="hidden sm:flex items-center justify-center shrink-0 w-28 h-28 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
            <LogoIcon className="w-16 h-16 text-accent" />
          </div>

          {/* 2×2 grid */}
          <div className="grid grid-cols-2 gap-3 flex-1">
            {items.map((item, index) => {
              const Icon = item.icon
              const content = (
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group h-full">
                  <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg shrink-0 group-hover:bg-accent transition-colors">
                    <Icon className="w-4 h-4 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{item.label}</p>
                    <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.value}</p>
                  </div>
                </div>
              )

              return (
                <motion.div
                  key={item.label}
                  initial={{ y: 10 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="block h-full">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
