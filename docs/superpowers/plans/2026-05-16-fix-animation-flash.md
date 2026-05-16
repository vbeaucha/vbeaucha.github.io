# Fix Animation Flash Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Éliminer le flash visible au chargement des sections du portfolio en déplaçant le contrôle d'opacité des items individuels vers un wrapper de section.

**Architecture:** Chaque section reçoit un `motion.div` wrapper (sur `max-w-7xl mx-auto`) avec `initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}`. Les items enfants gardent uniquement la translation `y` (suppression de `opacity` dans leurs états initial/whileInView). About est un cas spécial : elle utilise `animate` — la section elle-même devient `motion.section`.

**Tech Stack:** React 18, framer-motion, Tailwind CSS v3, TypeScript

---

## Fichiers modifiés

| Fichier | Nature du changement |
|---|---|
| `src/components/SectionTitle.tsx` | Supprimer `opacity` des animations |
| `src/components/sections/About.tsx` | Transformer `<section>` en `<motion.section>`, supprimer opacity des panneaux |
| `src/components/sections/Skills.tsx` | Ajouter wrapper opacity, supprimer opacity des cartes |
| `src/components/sections/Experience.tsx` | Ajouter wrapper opacity, supprimer opacity des items |
| `src/components/sections/Education.tsx` | Ajouter wrapper opacity, supprimer opacity de la carte |
| `src/components/sections/OpenSource.tsx` | Ajouter wrapper opacity, supprimer opacity des items |
| `src/components/sections/Tutorials.tsx` | Ajouter wrapper opacity, supprimer opacity des items |
| `src/components/sections/Contact.tsx` | Ajouter wrapper opacity, supprimer opacity des items |

---

## Task 0 : Lancer le serveur de développement

- [ ] **Démarrer le serveur**

```bash
npm run dev
```

Ouvrir http://localhost:5173 dans le navigateur. Garder l'onglet ouvert pendant toute l'implémentation pour vérifier visuellement chaque changement.

---

## Task 1 : SectionTitle.tsx — supprimer opacity

**Files:**
- Modify: `src/components/SectionTitle.tsx`

Ce composant est utilisé dans toutes les sections. Retirer `opacity` de ses animations corrige le flash du titre dans chaque section.

- [ ] **Modifier `src/components/SectionTitle.tsx`**

Remplacer le composant entier par :

```tsx
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  subtitle?: string
}

export function SectionTitle({ children, subtitle }: Props) {
  return (
    <motion.div
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{children}</h2>
      {subtitle && <p className="text-xl text-gray-600 dark:text-gray-400">{subtitle}</p>}
    </motion.div>
  )
}
```

- [ ] **Vérifier visuellement**

Dans le navigateur, recharger la page. Les titres de sections doivent apparaître directement visibles (plus de flash transparent) et glisser depuis le bas.

- [ ] **Committer**

```bash
git add src/components/SectionTitle.tsx
git commit -m "fix: remove opacity flash from SectionTitle animation"
```

---

## Task 2 : About.tsx — section fade-in (cas spécial)

**Files:**
- Modify: `src/components/sections/About.tsx`

About utilise `animate` (pas `whileInView`) car c'est la section hero visible dès le chargement. La section elle-même devient `<motion.section>` avec un fade-in. Les panneaux intérieurs conservent leur animation `x` mais perdent `opacity`.

- [ ] **Modifier `src/components/sections/About.tsx`**

```tsx
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
```

- [ ] **Vérifier visuellement**

Recharger la page. La section hero doit apparaître avec un fondu global (pas de flash blanc), les deux panneaux glissent depuis les côtés.

- [ ] **Committer**

```bash
git add src/components/sections/About.tsx
git commit -m "fix: move opacity animation to section level in About"
```

---

## Task 3 : Skills.tsx

**Files:**
- Modify: `src/components/sections/Skills.tsx`

- [ ] **Modifier `src/components/sections/Skills.tsx`**

```tsx
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
```

- [ ] **Vérifier visuellement**

Scroller jusqu'à Skills. Le fond gris et les cartes doivent apparaître ensemble, sans fond vide visible. Les cartes glissent depuis le bas avec le stagger.

- [ ] **Committer**

```bash
git add src/components/sections/Skills.tsx
git commit -m "fix: move opacity animation to section level in Skills"
```

---

## Task 4 : Experience.tsx

**Files:**
- Modify: `src/components/sections/Experience.tsx`

- [ ] **Modifier `src/components/sections/Experience.tsx`**

```tsx
import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle subtitle="My journey in the DevOps world">Experience</SectionTitle>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 hidden md:block" />

          <div className="space-y-10">
            {cv.experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ y: 10 }}
                whileInView={{ y: 0 }}
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
      </motion.div>
    </section>
  )
}
```

- [ ] **Vérifier visuellement**

Scroller jusqu'à Experience. Les cartes d'expérience doivent apparaître avec la section (pas de fond blanc visible avant les cartes). Effet de slide léger sur chaque entrée.

- [ ] **Committer**

```bash
git add src/components/sections/Experience.tsx
git commit -m "fix: move opacity animation to section level in Experience"
```

---

## Task 5 : Education.tsx

**Files:**
- Modify: `src/components/sections/Education.tsx`

- [ ] **Modifier `src/components/sections/Education.tsx`**

```tsx
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Education() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle>Education</SectionTitle>
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
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
      </motion.div>
    </section>
  )
}
```

- [ ] **Vérifier visuellement**

Scroller jusqu'à Education. Fond gris et carte diplôme apparaissent ensemble.

- [ ] **Committer**

```bash
git add src/components/sections/Education.tsx
git commit -m "fix: move opacity animation to section level in Education"
```

---

## Task 6 : OpenSource.tsx

**Files:**
- Modify: `src/components/sections/OpenSource.tsx`

- [ ] **Modifier `src/components/sections/OpenSource.tsx`**

```tsx
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function OpenSource() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
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
```

- [ ] **Vérifier visuellement**

Scroller jusqu'à Open Source. Les cartes apparaissent avec la section sans fond vide.

- [ ] **Committer**

```bash
git add src/components/sections/OpenSource.tsx
git commit -m "fix: move opacity animation to section level in OpenSource"
```

---

## Task 7 : Tutorials.tsx

**Files:**
- Modify: `src/components/sections/Tutorials.tsx`

- [ ] **Modifier `src/components/sections/Tutorials.tsx`**

```tsx
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
```

- [ ] **Vérifier visuellement**

Scroller jusqu'à Tutorials. Les cartes de tutoriels apparaissent avec le fond gris, pas de fond vide.

- [ ] **Committer**

```bash
git add src/components/sections/Tutorials.tsx
git commit -m "fix: move opacity animation to section level in Tutorials"
```

---

## Task 8 : Contact.tsx

**Files:**
- Modify: `src/components/sections/Contact.tsx`

- [ ] **Modifier `src/components/sections/Contact.tsx`**

```tsx
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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
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
```

- [ ] **Vérifier visuellement**

Scroller jusqu'à Contact. Les items de contact et le logo apparaissent ensemble avec la section.

- [ ] **Committer**

```bash
git add src/components/sections/Contact.tsx
git commit -m "fix: move opacity animation to section level in Contact"
```

---

## Task 9 : Vérification finale et build production

- [ ] **Build de production**

```bash
npm run build
```

Résultat attendu : `dist/` généré sans erreurs TypeScript.

- [ ] **Preview production locale**

```bash
npm run preview
```

Ouvrir http://localhost:4173 et scroller lentement sur toute la page. Vérifier :
- Aucune section n'affiche son fond sans contenu
- Les animations fade-in + slide fonctionnent sur toutes les sections
- Le mode sombre et le mode clair ne flashent pas
- La navigation (clic sur les liens du header) scroll correctement vers les sections

- [ ] **Vérifier qu'il ne reste rien à committer**

```bash
git status
```

Résultat attendu : `nothing to commit, working tree clean` (chaque tâche a fait son propre commit). Si des fichiers modifiés apparaissent, les committer :

```bash
git add <fichiers listés>
git commit -m "fix: eliminate animation flash on all portfolio sections"
```
