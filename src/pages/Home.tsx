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
