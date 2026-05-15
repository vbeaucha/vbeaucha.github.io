import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cv } from '../data/cv'
import { ThemeToggle } from './ThemeToggle'

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 504 504"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(0,504) scale(0.1,-0.1)" fill="currentColor" stroke="none">
        <path fillRule="evenodd" d="M3691 3834 l46 -6 22 -112 c13 -61 23 -111 24 -111 69 -21 201 -78 260
-112 l78 -44 95 61 94 61 40 -31 c48 -38 193 -193 210 -224 11 -21 6 -32 -42
-107 -30 -46 -58 -89 -62 -96 -3 -7 11 -47 33 -90 21 -43 51 -119 67 -168 15
-50 32 -93 37 -96 5 -3 53 -16 108 -29 112 -25 103 -12 114 -160 5 -72 -7
-245 -17 -256 -3 -2 -53 -16 -110 -30 l-105 -25 -22 -77 c-13 -42 -43 -119
-67 -171 l-44 -94 61 -93 c46 -71 59 -98 54 -114 -9 -28 -221 -247 -247 -256
-14 -4 -46 12 -110 54 l-91 61 -51 -30 c-64 -38 -144 -75 -221 -103 l-60 -22
-23 -114 c-13 -63 -25 -116 -27 -118 -8 -9 -246 -14 -317 -8 l-76 7 -23 114
-23 114 -67 21 c-37 11 -108 41 -159 66 l-92 46 -96 -65 -96 -66 -40 32 c-56
44 -226 216 -226 229 0 6 23 51 52 100 35 62 49 94 42 103 -50 68 -49 59 -15
130 17 36 35 65 39 65 4 0 23 -22 42 -47 57 -76 209 -232 288 -295 88 -70 226
-139 337 -169 105 -29 316 -32 418 -6 104 26 209 73 305 137 197 131 325 306
398 545 26 85 28 101 28 275 0 173 -2 191 -27 275 -99 324 -331 566 -639 665
-225 73 -508 41 -723 -83 -242 -139 -449 -393 -697 -857 -149 -277 -158 -305
-118 -347 27 -30 56 -37 91 -23 23 10 43 38 96 139 113 215 133 252 219 394
262 435 508 626 824 644 176 10 318 -28 458 -121 309 -205 441 -589 325 -945
-77 -240 -266 -429 -511 -514 -78 -27 -100 -30 -212 -31 -141 -1 -210 14 -325
69 -131 63 -271 186 -421 372 l-75 92 30 60 c17 33 35 62 40 65 5 4 22 -11 38
-31 194 -263 351 -402 520 -459 98 -34 244 -38 338 -10 238 71 424 279 466
524 17 97 6 250 -25 340 -40 115 -75 171 -166 263 -67 68 -101 94 -160 121
-130 62 -246 78 -378 54 -259 -46 -459 -234 -707 -666 -63 -110 -395 -759
-395 -773 0 -2 -52 -112 -116 -243 -64 -131 -129 -267 -144 -301 l-29 -63
-224 0 -224 0 -98 213 c-53 116 -191 417 -305 667 -114 250 -259 568 -323 705
-330 716 -487 1061 -487 1070 0 3 116 5 258 5 l259 0 208 -457 c115 -252 232
-510 260 -573 29 -63 68 -149 87 -190 19 -41 110 -243 204 -447 93 -205 172
-373 175 -373 4 0 14 17 22 38 29 71 220 458 325 657 153 291 297 528 411 681
l30 40 -55 92 -55 92 19 28 c25 34 165 169 214 206 23 17 42 25 50 20 7 -4 49
-34 94 -65 l81 -58 84 44 c46 24 122 55 169 69 l85 27 19 98 c10 55 22 104 26
111 16 25 211 33 351 14z m-2141 -204 c231 -26 431 -118 613 -280 69 -61 228
-231 235 -250 2 -5 -14 -36 -36 -69 l-39 -61 -39 47 c-267 329 -521 473 -829
473 -62 0 -149 -7 -192 -15 -43 -8 -81 -15 -84 -15 -6 0 -59 111 -59 123 0 8
138 40 205 47 91 11 132 11 225 0z m110 -337 c84 -31 169 -76 236 -127 74 -55
203 -185 278 -280 l55 -70 -34 -60 c-19 -34 -39 -61 -44 -61 -6 0 -28 25 -51
55 -57 78 -175 207 -240 264 -139 122 -281 172 -456 163 l-102 -5 -26 61 c-14
33 -24 62 -21 65 14 15 87 21 210 18 108 -3 153 -8 195 -23z m-1105 -387 c-58
-125 -79 -229 -79 -396 0 -116 4 -162 21 -230 87 -346 327 -604 658 -709 39
-13 76 -26 83 -29 19 -10 84 -152 69 -152 -15 0 -130 24 -183 39 -64 17 -182
68 -236 101 -26 17 -53 30 -58 30 -5 0 -51 -27 -101 -59 l-93 -60 -45 39 c-55
45 -156 151 -194 201 l-28 37 56 87 c31 48 59 93 61 100 3 7 -5 30 -19 52 -30
48 -93 205 -103 256 -8 45 -11 47 -141 77 -90 22 -91 22 -98 56 -8 45 -8 273
1 318 3 20 10 38 14 41 4 2 49 14 101 25 52 12 99 26 105 33 6 7 18 41 28 76
18 68 69 185 113 261 l27 45 38 -82 37 -82 -34 -75z m3210 -17 c30 -15 62 -42
80 -68 25 -36 30 -52 30 -104 0 -75 -24 -134 -65 -162 -32 -22 -38 -35 -16
-35 23 0 93 -76 106 -115 7 -20 10 -65 8 -100 -5 -82 -39 -134 -111 -172 l-52
-28 -257 -3 -258 -3 0 411 0 411 243 -3 c238 -3 244 -4 292 -29z m-3038 -211
c37 -85 41 -103 46 -203 3 -60 13 -135 23 -165 39 -129 129 -265 222 -336 39
-29 55 -53 94 -135 26 -54 42 -99 37 -99 -21 0 -148 70 -207 115 -124 93 -232
251 -282 410 -34 110 -39 288 -11 410 13 52 26 95 30 95 4 0 25 -42 48 -92z
M3400 2685 l0 -97 131 4 c129 3 131 3 155 31 15 18 24 41 24 62 0 21
-9 44 -24 62 -24 28 -26 28 -155 31 l-131 4 0 -97z
M3400 2345 l0 -105 114 0 c137 0 168 5 201 36 28 26 33 75 14 118
-20 44 -64 56 -203 56 l-126 0 0 -105z" />
      </g>
    </svg>
  )
}

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false)
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 font-bold text-xl text-gray-900 dark:text-white hover:text-accent dark:hover:text-accent transition-colors"
          >
            <LogoIcon className="w-7 h-7 shrink-0" />
            {cv.name.first} {cv.name.last}
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="p-2 text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left py-2 px-2 text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
