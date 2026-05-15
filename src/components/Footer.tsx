import { cv } from '../data/cv'

export function Footer() {
  return (
    <footer className="bg-sidebar text-slate-400 text-center text-xs py-4 mt-8">
      © {new Date().getFullYear()} {cv.name.first} {cv.name.last}
    </footer>
  )
}
