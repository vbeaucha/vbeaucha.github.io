import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'
import { Education } from '../components/sections/Education'
import { Experience } from '../components/sections/Experience'
import { OpenSource } from '../components/sections/OpenSource'
import { Skills } from '../components/sections/Skills'
import { Tutorials } from '../components/sections/Tutorials'

export function Home() {
  return (
    <>
      <About />
      <Skills />
      <Experience />
      <Education />
      <OpenSource />
      <Tutorials />
      <Contact />
    </>
  )
}
