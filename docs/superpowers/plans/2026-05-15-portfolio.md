# Portfolio vbeaucha.github.io — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a TypeScript/React portfolio website on GitHub Pages at `https://vbeaucha.github.io`, incluant les sections CV et deux tutoriels interactifs fetchés depuis GitHub.

**Architecture:** Vite + React 18 SPA utilisant `HashRouter` pour la compatibilité GitHub Pages. Les données CV sont centralisées dans un fichier TypeScript typé. Les tutoriels sont fetchés depuis `raw.githubusercontent.com` et rendus avec `react-markdown`, avec un renderer de liens custom pour la navigation interne.

**Tech Stack:** Vite, React 18, TypeScript 5, Tailwind CSS v3, React Router v6, react-markdown + remark-gfm, Vitest + Testing Library, GitHub Actions.

> **Note:** Avant de commencer, vérifier que les repos GitHub des tutoriels s'appellent bien `vbeaucha/git-tuto` et `vbeaucha/simple-vim-explain`. Adapter `src/utils/tutorialUrls.ts` si nécessaire.

---

### Task 1: Project scaffold + Tailwind + Vitest

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `src/index.css`, `src/main.tsx`, `src/App.tsx`, `src/test/setup.ts`

- [ ] **Step 1: Initialiser le projet Vite**

```bash
cd /Users/seiza/perso/portfolio
npm create vite@latest . -- --template react-ts
```

Répondre `y` pour écraser les fichiers existants (seul le dossier `docs/` sera conservé).

- [ ] **Step 2: Installer les dépendances**

```bash
npm install
npm install react-router-dom@6 react-markdown@9 remark-gfm@4
npm install -D tailwindcss@3 postcss autoprefixer
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npx tailwindcss init -p --ts
```

- [ ] **Step 3: Configurer Vite + Vitest**

Remplacer le contenu de `vite.config.ts` par :

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})
```

- [ ] **Step 4: Configurer Tailwind**

Remplacer `tailwind.config.ts` par :

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#3D8EC9',
        sidebar: '#1C2A3A',
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 5: Configurer le CSS de base**

Remplacer `src/index.css` par :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-white text-sidebar dark:bg-sidebar dark:text-slate-50 transition-colors duration-200;
  }
}
```

- [ ] **Step 6: Créer le setup de test**

Créer `src/test/setup.ts` :

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 7: Ajouter le script de test dans package.json**

Dans `package.json`, dans la section `"scripts"`, ajouter :

```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 8: Vérifier que le projet démarre**

```bash
npm run dev
```

Ouvrir `http://localhost:5173`. Le template Vite par défaut doit s'afficher. Arrêter avec `Ctrl+C`.

- [ ] **Step 9: Commit**

```bash
git add -A -- ':!docs/superpowers'
git commit -m "feat: scaffold Vite + React + Tailwind + Vitest"
```

---

### Task 2: CV data — types et contenu

**Files:**
- Create: `src/data/cv.ts`

- [ ] **Step 1: Créer le fichier de données**

Créer `src/data/cv.ts` :

```ts
export interface SubContext {
  label: string
  type: 'internal' | 'consulting'
  description: string
  bullets: string[]
}

export interface ExperienceEntry {
  company: string
  period: string
  role: string
  context?: string
  bullets: string[]
  subContexts?: SubContext[]
}

export interface SkillCategory {
  label: string
  items: string[]
}

export interface TutorialCard {
  id: 'git' | 'vim'
  title: string
  description: string
}

export interface CVData {
  name: { first: string; last: string }
  title: string
  contact: {
    email: string
    phone: string
    location: string
    linkedin: string
    github: string
  }
  about: string
  experiences: ExperienceEntry[]
  skills: SkillCategory[]
  education: { school: string; degree: string; specialization: string }
  openSource: { project: string; description: string }[]
  tutorials: TutorialCard[]
}

export const cv: CVData = {
  name: { first: 'Valentin', last: 'Beauchamp' },
  title: 'Lead DevOps / SRE',
  contact: {
    email: 'vbeaucha77@gmail.com',
    phone: '+33 6 47 60 15 79',
    location: 'Croix, France',
    linkedin: 'valentin-beauchamp',
    github: 'vbeaucha',
  },
  about:
    'Cloud Native architecture expert and Kubernetes/PostgreSQL technical lead with 8+ years driving reliability and scalability of critical production systems. Co-defined the DevOps platform vision alongside a CTO, building GitOps workflows and SRE culture from the ground up. Hands-on with self-managed PostgreSQL clusters, Karpenter auto-scaling and DORA-driven engineering. Writing custom Rust extensions and Go tooling to maximise team efficiency and reduce infrastructure costs.',
  experiences: [
    {
      company: 'Adzuna',
      period: 'Jan. 2024 – Present',
      role: 'Lead DevOps / Infrastructure',
      context: 'Job search platform — 18 microservices, 8M+ daily requests',
      bullets: [
        'Infra & Networking: Technical lead for Kubernetes on AWS (2 clusters, 10–20 nodes) with Karpenter auto-scaling, VPC design, AWS ALB and Traefik in-cluster routing. Scaled from 20K applications/month to 50K/day while capping costs at $4k/month.',
        'SRE & Reliability: 99.9% SLA on 18 microservices — 8M+ requests/day and 70.9M PostgreSQL queries/day on a multi-AZ setup with cross-region DRP. DORA metrics: daily deployments, <15% change failure rate, post-mortem driven incident culture.',
        'IaC & GitOps: Full automation via OpenTofu/Atlantis, ArgoCD, GitHub Actions and CircleCI.',
        'Data & Event-Driven: Self-managed PostgreSQL cluster with Patroni HA on Kubernetes; authored Rust extensions handling S3 archive reads, Elasticsearch sync indexing and parallel-safe function execution. Kafka + Debezium CDC pipelines.',
        'Security & Compliance: ISO 27001 and GDPR-compliant infrastructure. Secret management via HashiCorp Vault and Vaultwarden.',
        'Observability: Prometheus, Grafana, OpenObserve; Velero backup strategy.',
        'Internal Go SDK: Co-designed a full Go SDK covering database connection management and OpenTelemetry-native metrics, traces and log shipping.',
        'Platform & Leadership: Co-defined the DevOps platform vision with the CTO. Coached a team of 4 developers on DevOps practices.',
      ],
    },
    {
      company: 'Weaverize',
      period: '2021 – 2024',
      role: 'Embedded Engineer / DevOps',
      subContexts: [
        {
          label: 'SpreadTheLive',
          type: 'internal',
          description: 'Live streaming platform — Kubernetes / OVHCloud',
          bullets: [
            'Cloud Infrastructure: Kubernetes on OVHCloud; Terraform, Helm.',
            'Data: PostgreSQL (Aiven) & MongoDB (Atlas) administration.',
            'CI/CD: GitHub Actions, automated deployments and DevEx tooling.',
            'SRE: SLA/SLO management, Datadog monitoring, DRP strategy.',
          ],
        },
        {
          label: 'Store Management SaaS',
          type: 'consulting',
          description: 'GCP / GKE — mission de consulting',
          bullets: [
            'Cloud Infrastructure: Migration to GCP/GKE; Terraform, Helm.',
            'Mentoring: Guided 2 interns and 4 dev teams (5 each) on DevOps best practices.',
          ],
        },
      ],
      bullets: [],
    },
    {
      company: 'University of Lille',
      period: '2017 – 2021',
      role: 'Research Engineer',
      bullets: [
        'Medical Platform: Designed and deployed an embedded medical application across 10 clinics in Europe.',
        'Embedded Systems: High-performance C++ application design.',
        'XR & Real-Time: VR experience development (Unity / C#).',
        'Mentoring: Tutored 4 Master\'s AR/VR students; Git/GitLab expert.',
      ],
    },
  ],
  skills: [
    { label: 'Languages', items: ['Go', 'Rust', 'C++', 'C#'] },
    { label: 'Database', items: ['PostgreSQL', 'Debezium', 'MongoDB'] },
    { label: 'Event-Driven', items: ['Kafka', 'NATS'] },
    { label: 'Containers', items: ['Docker', 'containerd', 'Podman', 'Kubernetes', 'Helm', 'Karpenter'] },
    { label: 'IaC', items: ['Terraform', 'OpenTofu', 'ArgoCD', 'Atlantis'] },
    { label: 'CI/CD', items: ['GitHub Actions', 'CircleCI', 'ARC'] },
    { label: 'Cloud', items: ['AWS', 'GCP'] },
    { label: 'Observability', items: ['Prometheus', 'Grafana', 'OpenObserve', 'Datadog', 'OpenTelemetry', 'Telegraf'] },
  ],
  education: {
    school: "Polytech'Lille",
    degree: 'Computer Engineering',
    specialization: 'Microelectronics & Automation',
  },
  openSource: [
    { project: 'Crunchy-data', description: 'PostgreSQL Operator for Kubernetes' },
    { project: 'Kubernetes', description: 'Core project contributions' },
    { project: 'ZomboDB', description: 'PostgreSQL Archiver extension' },
  ],
  tutorials: [
    {
      id: 'git',
      title: 'Git Tutorial',
      description: 'A comprehensive guide to mastering Git, from basic concepts to advanced techniques.',
    },
    {
      id: 'vim',
      title: 'Vim Tutorial',
      description: 'A simple and practical introduction to Vim.',
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/cv.ts
git commit -m "feat: add CV data types and content"
```

---

### Task 3: useTheme hook

**Files:**
- Create: `src/hooks/useTheme.ts`, `src/hooks/useTheme.test.ts`

- [ ] **Step 1: Écrire le test**

Créer `src/hooks/useTheme.test.ts` :

```ts
import { renderHook, act } from '@testing-library/react'
import { useTheme } from './useTheme'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

test('starts with light mode when no localStorage entry', () => {
  const { result } = renderHook(() => useTheme())
  expect(result.current.isDark).toBe(false)
  expect(document.documentElement.classList.contains('dark')).toBe(false)
})

test('toggle switches to dark mode and persists to localStorage', () => {
  const { result } = renderHook(() => useTheme())
  act(() => result.current.toggle())
  expect(result.current.isDark).toBe(true)
  expect(document.documentElement.classList.contains('dark')).toBe(true)
  expect(localStorage.getItem('theme')).toBe('dark')
})

test('toggle twice returns to light mode', () => {
  const { result } = renderHook(() => useTheme())
  act(() => result.current.toggle())
  act(() => result.current.toggle())
  expect(result.current.isDark).toBe(false)
  expect(localStorage.getItem('theme')).toBe('light')
})

test('reads dark preference from localStorage on mount', () => {
  localStorage.setItem('theme', 'dark')
  const { result } = renderHook(() => useTheme())
  expect(result.current.isDark).toBe(true)
  expect(document.documentElement.classList.contains('dark')).toBe(true)
})
```

- [ ] **Step 2: Vérifier que le test échoue**

```bash
npm run test:run -- src/hooks/useTheme.test.ts
```

Résultat attendu : FAIL — `useTheme` n'existe pas.

- [ ] **Step 3: Implémenter le hook**

Créer `src/hooks/useTheme.ts` :

```ts
import { useEffect, useState } from 'react'

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return { isDark, toggle: () => setIsDark(prev => !prev) }
}
```

- [ ] **Step 4: Vérifier que les tests passent**

```bash
npm run test:run -- src/hooks/useTheme.test.ts
```

Résultat attendu : PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useTheme.ts src/hooks/useTheme.test.ts
git commit -m "feat: add useTheme hook with dark/light persistence"
```

---

### Task 4: tutorialUrls utility

**Files:**
- Create: `src/utils/tutorialUrls.ts`, `src/utils/tutorialUrls.test.ts`

- [ ] **Step 1: Écrire les tests**

Créer `src/utils/tutorialUrls.test.ts` :

```ts
import { getRawUrl, resolveMdLink } from './tutorialUrls'

test('getRawUrl pour git readme', () => {
  expect(getRawUrl('git', 'readme.md')).toBe(
    'https://raw.githubusercontent.com/vbeaucha/git-tuto/main/readme.md'
  )
})

test('getRawUrl pour un chapitre git', () => {
  expect(getRawUrl('git', 'docs/01-configuring-git.md')).toBe(
    'https://raw.githubusercontent.com/vbeaucha/git-tuto/main/docs/01-configuring-git.md'
  )
})

test('getRawUrl pour vim readme', () => {
  expect(getRawUrl('vim', 'readme.md')).toBe(
    'https://raw.githubusercontent.com/vbeaucha/simple-vim-explain/main/readme.md'
  )
})

test('resolveMdLink convertit un lien relatif .md en route interne', () => {
  expect(resolveMdLink('docs/01-configuring-git.md', 'git')).toBe(
    '/tutorials/git/docs/01-configuring-git'
  )
})

test('resolveMdLink retourne null pour un lien externe', () => {
  expect(resolveMdLink('https://example.com', 'git')).toBeNull()
})

test('resolveMdLink retourne null pour un lien non-.md', () => {
  expect(resolveMdLink('some-image.png', 'git')).toBeNull()
})
```

- [ ] **Step 2: Vérifier que les tests échouent**

```bash
npm run test:run -- src/utils/tutorialUrls.test.ts
```

Résultat attendu : FAIL.

- [ ] **Step 3: Implémenter l'utilitaire**

Créer `src/utils/tutorialUrls.ts` :

```ts
const RAW = 'https://raw.githubusercontent.com'

const REPOS: Record<string, { owner: string; repo: string; branch: string }> = {
  git: { owner: 'vbeaucha', repo: 'git-tuto', branch: 'main' },
  vim: { owner: 'vbeaucha', repo: 'simple-vim-explain', branch: 'main' },
}

export function getRawUrl(tutorialId: string, path: string): string {
  const { owner, repo, branch } = REPOS[tutorialId]
  return `${RAW}/${owner}/${repo}/${branch}/${path}`
}

export function resolveMdLink(href: string, tutorialId: string): string | null {
  if (href.startsWith('http') || !href.endsWith('.md')) return null
  const path = href.replace(/\.md$/, '')
  return `/tutorials/${tutorialId}/${path}`
}
```

- [ ] **Step 4: Vérifier que les tests passent**

```bash
npm run test:run -- src/utils/tutorialUrls.test.ts
```

Résultat attendu : PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/utils/tutorialUrls.ts src/utils/tutorialUrls.test.ts
git commit -m "feat: add tutorial URL builder and link resolver"
```

---

### Task 5: Header + ThemeToggle

**Files:**
- Create: `src/components/ThemeToggle.tsx`, `src/components/Header.tsx`

- [ ] **Step 1: Créer ThemeToggle**

Créer `src/components/ThemeToggle.tsx` :

```tsx
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="rounded-full p-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
```

- [ ] **Step 2: Créer Header**

Créer `src/components/Header.tsx` :

```tsx
import { cv } from '../data/cv'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="bg-sidebar text-white py-10 px-6">
      <div className="max-w-4xl mx-auto flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-wide">
            {cv.name.last.toUpperCase()}{' '}
            <span className="font-light">{cv.name.first}</span>
          </h1>
          <p className="text-accent text-xl font-semibold mt-1">{cv.title}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-300">
            <a href={`mailto:${cv.contact.email}`} className="hover:text-accent transition-colors">
              {cv.contact.email}
            </a>
            <span>{cv.contact.phone}</span>
            <span>{cv.contact.location}</span>
            <a
              href={`https://linkedin.com/in/${cv.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://github.com/${cv.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ThemeToggle.tsx src/components/Header.tsx
git commit -m "feat: add Header and ThemeToggle components"
```

---

### Task 6: Composants de sections (About, Experience, Skills)

**Files:**
- Create: `src/components/sections/About.tsx`, `src/components/sections/Experience.tsx`, `src/components/sections/Skills.tsx`

- [ ] **Step 1: Créer le composant SectionTitle réutilisable**

Créer `src/components/SectionTitle.tsx` :

```tsx
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
```

- [ ] **Step 2: Créer About**

Créer `src/components/sections/About.tsx` :

```tsx
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function About() {
  return (
    <section className="mb-8">
      <SectionTitle>Profile</SectionTitle>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-slate-300">{cv.about}</p>
    </section>
  )
}
```

- [ ] **Step 3: Créer Experience**

Créer `src/components/sections/Experience.tsx` :

```tsx
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Experience() {
  return (
    <section className="mb-8">
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-6">
        {cv.experiences.map((exp) => (
          <div key={exp.company}>
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-sidebar dark:text-slate-50">{exp.company}</span>
              <span className="text-sm text-gray-500 dark:text-slate-400">{exp.period}</span>
            </div>
            <p className="text-accent text-sm font-semibold">{exp.role}</p>
            {exp.context && (
              <p className="text-xs text-gray-500 dark:text-slate-400 italic mb-2">{exp.context}</p>
            )}

            {exp.bullets.length > 0 && (
              <ul className="mt-2 space-y-1">
                {exp.bullets.map((b) => (
                  <li key={b} className="text-sm text-gray-700 dark:text-slate-300 flex gap-2">
                    <span className="text-accent flex-shrink-0">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {exp.subContexts?.map((sub) => (
              <div key={sub.label} className="mt-3 pl-3 border-l-2 border-accent/40">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-sidebar dark:text-slate-200">
                    {sub.label}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium">
                    {sub.type === 'internal' ? 'Internal' : 'Consulting'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 italic mb-1">
                  {sub.description}
                </p>
                <ul className="space-y-1">
                  {sub.bullets.map((b) => (
                    <li key={b} className="text-sm text-gray-700 dark:text-slate-300 flex gap-2">
                      <span className="text-accent flex-shrink-0">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Créer Skills**

Créer `src/components/sections/Skills.tsx` :

```tsx
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Skills() {
  return (
    <section className="mb-8">
      <SectionTitle>Skills</SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {cv.skills.map((cat) => (
          <div key={cat.label}>
            <p className="text-xs font-bold uppercase text-accent mb-1">{cat.label}</p>
            <p className="text-sm text-gray-700 dark:text-slate-300">{cat.items.join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/SectionTitle.tsx src/components/sections/About.tsx src/components/sections/Experience.tsx src/components/sections/Skills.tsx
git commit -m "feat: add About, Experience, Skills sections"
```

---

### Task 7: Composants de sections (Education, OpenSource, Tutorials, Contact) + Footer

**Files:**
- Create: `src/components/sections/Education.tsx`, `src/components/sections/OpenSource.tsx`, `src/components/sections/Tutorials.tsx`, `src/components/sections/Contact.tsx`, `src/components/Footer.tsx`

- [ ] **Step 1: Créer Education**

Créer `src/components/sections/Education.tsx` :

```tsx
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Education() {
  return (
    <section className="mb-8">
      <SectionTitle>Education</SectionTitle>
      <p className="font-bold text-sidebar dark:text-slate-50">{cv.education.school}</p>
      <p className="text-sm text-gray-700 dark:text-slate-300">{cv.education.degree}</p>
      <p className="text-sm text-gray-500 dark:text-slate-400">{cv.education.specialization}</p>
    </section>
  )
}
```

- [ ] **Step 2: Créer OpenSource**

Créer `src/components/sections/OpenSource.tsx` :

```tsx
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function OpenSource() {
  return (
    <section className="mb-8">
      <SectionTitle>Open Source Contributions</SectionTitle>
      <ul className="space-y-1">
        {cv.openSource.map((item) => (
          <li key={item.project} className="text-sm flex gap-2">
            <span className="text-accent flex-shrink-0">•</span>
            <span>
              <span className="font-semibold text-sidebar dark:text-slate-50">{item.project}</span>
              {' — '}
              <span className="text-gray-700 dark:text-slate-300">{item.description}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

- [ ] **Step 3: Créer Tutorials**

Créer `src/components/sections/Tutorials.tsx` :

```tsx
import { Link } from 'react-router-dom'
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Tutorials() {
  return (
    <section className="mb-8">
      <SectionTitle>Tutorials</SectionTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cv.tutorials.map((t) => (
          <Link
            key={t.id}
            to={`/tutorials/${t.id}`}
            className="block border border-accent/30 rounded-lg p-4 hover:border-accent hover:bg-accent/5 transition-all"
          >
            <h3 className="font-bold text-accent">{t.title}</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">{t.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Créer Contact**

Créer `src/components/sections/Contact.tsx` :

```tsx
import { cv } from '../../data/cv'
import { SectionTitle } from '../SectionTitle'

export function Contact() {
  return (
    <section className="mb-8">
      <SectionTitle>Contact</SectionTitle>
      <ul className="space-y-2 text-sm">
        <li>
          <a href={`mailto:${cv.contact.email}`} className="text-accent hover:underline">
            {cv.contact.email}
          </a>
        </li>
        <li className="text-gray-700 dark:text-slate-300">{cv.contact.phone}</li>
        <li className="text-gray-700 dark:text-slate-300">{cv.contact.location}</li>
        <li>
          <a
            href={`https://linkedin.com/in/${cv.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            linkedin.com/in/{cv.contact.linkedin}
          </a>
        </li>
      </ul>
    </section>
  )
}
```

- [ ] **Step 5: Créer Footer**

Créer `src/components/Footer.tsx` :

```tsx
export function Footer() {
  return (
    <footer className="bg-sidebar text-slate-400 text-center text-xs py-4 mt-8">
      © {new Date().getFullYear()} Valentin Beauchamp
    </footer>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/Education.tsx src/components/sections/OpenSource.tsx src/components/sections/Tutorials.tsx src/components/sections/Contact.tsx src/components/Footer.tsx
git commit -m "feat: add Education, OpenSource, Tutorials, Contact sections and Footer"
```

---

### Task 8: TutorialPage — fetch + rendu Markdown

**Files:**
- Create: `src/pages/TutorialPage.tsx`

- [ ] **Step 1: Créer TutorialPage**

Créer `src/pages/TutorialPage.tsx` :

```tsx
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getRawUrl, resolveMdLink } from '../utils/tutorialUrls'

type Status = 'loading' | 'success' | 'error'

export function TutorialPage() {
  const { tutorialId = '', '*': splat = '' } = useParams()
  const filePath = splat || 'readme.md'
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    setStatus('loading')
    const url = getRawUrl(tutorialId, filePath.endsWith('.md') ? filePath : filePath + '.md')
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((text) => {
        setContent(text)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [tutorialId, filePath])

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link
        to="/"
        className="text-accent hover:underline text-sm mb-6 inline-block"
      >
        ← Back to portfolio
      </Link>

      {status === 'loading' && (
        <p className="text-gray-500 dark:text-slate-400">Loading…</p>
      )}

      {status === 'error' && (
        <p className="text-red-500">Failed to load tutorial. Please try again later.</p>
      )}

      {status === 'success' && (
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a({ href = '', children, ...props }) {
                const internal = resolveMdLink(href, tutorialId)
                if (internal) {
                  return (
                    <Link to={internal} className="text-accent hover:underline">
                      {children}
                    </Link>
                  )
                }
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                    {children}
                  </a>
                )
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Installer le plugin Tailwind Typography** (pour les styles `prose`)

```bash
npm install -D @tailwindcss/typography
```

Dans `tailwind.config.ts`, ajouter le plugin :

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#3D8EC9',
        sidebar: '#1C2A3A',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/TutorialPage.tsx tailwind.config.ts package.json package-lock.json
git commit -m "feat: add TutorialPage with GitHub markdown fetch and internal link routing"
```

---

### Task 9: Home page + App.tsx routing

**Files:**
- Create: `src/pages/Home.tsx`
- Modify: `src/App.tsx`, `src/main.tsx`

- [ ] **Step 1: Créer la page Home**

Créer `src/pages/Home.tsx` :

```tsx
import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'
import { Education } from '../components/sections/Education'
import { Experience } from '../components/sections/Experience'
import { OpenSource } from '../components/sections/OpenSource'
import { Skills } from '../components/sections/Skills'
import { Tutorials } from '../components/sections/Tutorials'

export function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <About />
      <Experience />
      <Skills />
      <Education />
      <OpenSource />
      <Tutorials />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 2: Configurer App.tsx avec le routing**

Remplacer `src/App.tsx` par :

```tsx
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { TutorialPage } from './pages/TutorialPage'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutorials/:tutorialId/*" element={<TutorialPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  )
}
```

- [ ] **Step 3: Nettoyer main.tsx**

Remplacer `src/main.tsx` par :

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 4: Vérifier visuellement**

```bash
npm run dev
```

Ouvrir `http://localhost:5173`. Vérifier :
- Le header s'affiche avec nom, titre, liens
- Le toggle dark/light fonctionne et persiste au rechargement
- Les sections CV sont visibles
- Les cards tutoriels sont cliquables et chargent le contenu depuis GitHub
- La navigation entre chapitres Git fonctionne sans rechargement de page

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.tsx src/App.tsx src/main.tsx
git commit -m "feat: wire up Home page and HashRouter routing"
```

---

### Task 10: GitHub Actions — déploiement automatique

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Créer le workflow**

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

- [ ] **Step 2: Vérifier le build local**

```bash
npm run build
```

Résultat attendu : un dossier `dist/` est créé sans erreur.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions deploy workflow to GitHub Pages"
```

---

### Task 11: Créer le repo GitHub et pousser

- [ ] **Step 1: Créer le repo sur GitHub**

Sur `https://github.com/new` :
- Nom : `vbeaucha.github.io`
- Visibilité : **Public** (requis pour GitHub Pages gratuit)
- Ne pas initialiser avec README

- [ ] **Step 2: Connecter le remote et pousser**

```bash
git remote add origin https://github.com/vbeaucha/vbeaucha.github.io.git
git push -u origin main
```

- [ ] **Step 3: Activer GitHub Pages**

Dans les Settings du repo → Pages :
- Source : **Deploy from a branch**
- Branch : `gh-pages` / `/ (root)`
- Sauvegarder

- [ ] **Step 4: Vérifier le déploiement**

Attendre ~2 minutes, puis ouvrir `https://vbeaucha.github.io`. Le portfolio doit s'afficher.

Si GitHub Actions échoue : aller dans l'onglet **Actions** du repo pour voir les logs.

---

## Checklist de validation finale

- [ ] `https://vbeaucha.github.io` répond avec le portfolio
- [ ] Dark/light mode fonctionne et persiste après rechargement
- [ ] Toutes les sections CV sont affichées (About, Experience, Skills, Education, OpenSource, Tutorials, Contact)
- [ ] L'expérience Weaverize affiche bien les deux sous-contextes (SpreadTheLive internal + consulting)
- [ ] `https://vbeaucha.github.io/#/tutorials/git` charge le readme du tutoriel Git depuis GitHub
- [ ] La navigation entre chapitres Git fonctionne (liens internes → pas de rechargement GitHub)
- [ ] `https://vbeaucha.github.io/#/tutorials/vim` charge le tutoriel Vim
- [ ] Le portfolio est lisible sur mobile (responsive)
- [ ] Tous les tests passent : `npm run test:run`
